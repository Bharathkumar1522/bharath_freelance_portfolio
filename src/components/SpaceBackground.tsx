"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── Configuration ──────────────────────────────────────────────────────────

// Warp-speed star streaks radiating from center
const WARP_STAR_COUNT = 280;
const WARP_SPEED_BASE = 0.4;        // normal cruise
const WARP_SPEED_BOOST = 2.8;       // periodic hyper-burst
const BURST_DURATION = 2200;         // ms
const BURST_INTERVAL = 9000;         // ms between bursts

// Ambient floating stars (background layer)
const AMBIENT_STAR_COUNT = 100;

// Shooting stars
const SHOOTING_INTERVAL = 4000;

// ─── Types ──────────────────────────────────────────────────────────────────

interface WarpStar {
    angle: number;
    dist: number;       // distance from center (0 → maxRadius)
    speed: number;       // individual speed multiplier
    size: number;
    hue: number;         // 0=white, 25=orange, 200=blue
}

interface AmbientStar {
    x: number; y: number;
    size: number;
    opacity: number;
    twinklePhase: number;
}

interface ShootingStar {
    x: number; y: number;
    vx: number; vy: number;
    life: number; maxLife: number;
    size: number;
}

// Spaceship state
interface Spaceship {
    x: number; y: number;
    targetX: number; targetY: number;
    angle: number;
    scale: number;
    phase: "cruising" | "entering" | "exiting";
    timer: number;
    engineGlow: number;
}

// ─── Spaceship drawing (X-wing style silhouette) ────────────────────────────
function drawSpaceship(ctx: CanvasRenderingContext2D, ship: Spaceship, time: number) {
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.angle);
    const s = ship.scale;

    // Engine exhaust trail
    // Engine exhaust trail
    const exhaustFlicker = 0.7 + 0.3 * Math.sin(time * 0.015);
    const trailLen = 25 * s + (ship.engineGlow * 20 * s);

    // Main exhaust
    const exGrad = ctx.createLinearGradient(- trailLen, 0, 0, 0);
    exGrad.addColorStop(0, `rgba(255, 107, 53, 0)`);
    exGrad.addColorStop(0.3, `rgba(255, 140, 50, ${0.15 * exhaustFlicker * ship.engineGlow})`);
    exGrad.addColorStop(0.7, `rgba(255, 200, 100, ${0.5 * exhaustFlicker * ship.engineGlow})`);
    exGrad.addColorStop(1, `rgba(255, 255, 200, ${0.8 * exhaustFlicker * ship.engineGlow})`);
    ctx.beginPath();
    ctx.moveTo(0, -2.5 * s);
    ctx.lineTo(-trailLen, 0);
    ctx.lineTo(0, 2.5 * s);
    ctx.closePath();
    ctx.fillStyle = exGrad;
    ctx.fill();

    // Upper wing exhaust
    const wingExGrad = ctx.createLinearGradient(-trailLen * 0.7, 0, 0, 0);
    wingExGrad.addColorStop(0, `rgba(255, 107, 53, 0)`);
    wingExGrad.addColorStop(0.5, `rgba(255, 160, 60, ${0.2 * exhaustFlicker * ship.engineGlow})`);
    wingExGrad.addColorStop(1, `rgba(255, 220, 150, ${0.4 * exhaustFlicker * ship.engineGlow})`);
    ctx.beginPath();
    ctx.moveTo(5 * s, -10 * s);
    ctx.lineTo(-trailLen * 0.7, -10 * s);
    ctx.lineTo(5 * s, -8 * s);
    ctx.closePath();
    ctx.fillStyle = wingExGrad;
    ctx.fill();

    // Lower wing exhaust
    ctx.beginPath();
    ctx.moveTo(5 * s, 10 * s);
    ctx.lineTo(-trailLen * 0.7, 10 * s);
    ctx.lineTo(5 * s, 8 * s);
    ctx.closePath();
    ctx.fillStyle = wingExGrad;
    ctx.fill();

    // ── Ship body (fuselage) ──
    ctx.beginPath();
    ctx.moveTo(22 * s, 0);          // nose
    ctx.lineTo(8 * s, -3 * s);
    ctx.lineTo(-8 * s, -3 * s);
    ctx.lineTo(-12 * s, -2 * s);
    ctx.lineTo(-12 * s, 2 * s);
    ctx.lineTo(-8 * s, 3 * s);
    ctx.lineTo(8 * s, 3 * s);
    ctx.closePath();
    ctx.fillStyle = "#4a4a5a";
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 200, 150, 0.3)";
    ctx.lineWidth = 0.5 * s;
    ctx.stroke();

    // ── Cockpit ──
    ctx.beginPath();
    ctx.ellipse(12 * s, 0, 3 * s, 1.5 * s, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(150, 200, 255, 0.5)";
    ctx.fill();

    // ── Upper wing ──
    ctx.beginPath();
    ctx.moveTo(8 * s, -3 * s);
    ctx.lineTo(12 * s, -6 * s);
    ctx.lineTo(4 * s, -13 * s);
    ctx.lineTo(-6 * s, -13 * s);
    ctx.lineTo(-8 * s, -3 * s);
    ctx.closePath();
    ctx.fillStyle = "#3a3a48";
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 200, 150, 0.2)";
    ctx.lineWidth = 0.4 * s;
    ctx.stroke();

    // ── Lower wing ──
    ctx.beginPath();
    ctx.moveTo(8 * s, 3 * s);
    ctx.lineTo(12 * s, 6 * s);
    ctx.lineTo(4 * s, 13 * s);
    ctx.lineTo(-6 * s, 13 * s);
    ctx.lineTo(-8 * s, 3 * s);
    ctx.closePath();
    ctx.fillStyle = "#3a3a48";
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 200, 150, 0.2)";
    ctx.lineWidth = 0.4 * s;
    ctx.stroke();

    // ── Wing-tip cannons ──
    ctx.fillStyle = "#5a5a6a";
    // Top cannon
    ctx.fillRect(-7 * s, -14 * s, 14 * s, 1.2 * s);
    // Bottom cannon
    ctx.fillRect(-7 * s, 12.8 * s, 14 * s, 1.2 * s);

    // Nose highlight
    ctx.beginPath();
    ctx.moveTo(22 * s, 0);
    ctx.lineTo(16 * s, -1 * s);
    ctx.lineTo(16 * s, 1 * s);
    ctx.closePath();
    ctx.fillStyle = "rgba(255, 180, 120, 0.3)";
    ctx.fill();

    // Engine glow halo (orange)
    const glowRadius = (8 + ship.engineGlow * 12) * s;
    const haloGrad = ctx.createRadialGradient(-5 * s, 0, 0, -5 * s, 0, glowRadius);
    haloGrad.addColorStop(0, `rgba(255, 140, 50, ${0.2 * ship.engineGlow * exhaustFlicker})`);
    haloGrad.addColorStop(1, "rgba(255, 107, 53, 0)");
    ctx.beginPath();
    ctx.arc(-5 * s, 0, glowRadius, 0, Math.PI * 2);
    ctx.fillStyle = haloGrad;
    ctx.fill();

    ctx.restore();
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function SpaceBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const warpStarsRef = useRef<WarpStar[]>([]);
    const ambientRef = useRef<AmbientStar[]>([]);
    const shootingRef = useRef<ShootingStar[]>([]);
    const shipRef = useRef<Spaceship>({
        x: -100, y: 0, targetX: 0, targetY: 0,
        angle: 0, scale: 1.2, phase: "entering", timer: 0, engineGlow: 1,
    });
    const lastShootRef = useRef(0);
    const burstStartRef = useRef(0);

    // Visibility refs for performance
    const isInViewport = useRef(true);
    const isDocVisible = useRef(true);
    const shouldAnimate = useRef(true);

    const initWarpStars = useCallback(() => {
        const stars: WarpStar[] = [];
        for (let i = 0; i < WARP_STAR_COUNT; i++) {
            stars.push({
                angle: Math.random() * Math.PI * 2,
                dist: Math.random() * 1.2,  // 0→1.2 (some start beyond maxRadius for stagger)
                speed: 0.8 + Math.random() * 0.4,
                size: 0.3 + Math.random() * 1.2,
                hue: Math.random() < 0.12 ? 25 : (Math.random() < 0.06 ? 210 : 0),
            });
        }
        warpStarsRef.current = stars;
    }, []);

    const initAmbientStars = useCallback((w: number, h: number) => {
        const stars: AmbientStar[] = [];
        for (let i = 0; i < AMBIENT_STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                size: 0.3 + Math.random() * 0.8,
                opacity: 0.2 + Math.random() * 0.4,
                twinklePhase: Math.random() * Math.PI * 2,
            });
        }
        ambientRef.current = stars;
    }, []);

    const initShip = useCallback((w: number, h: number) => {
        const ship = shipRef.current;
        ship.x = -60;
        ship.y = h * 0.35 + Math.random() * h * 0.3;
        ship.targetX = w + 80;
        ship.targetY = h * 0.25 + Math.random() * h * 0.4;
        ship.angle = Math.atan2(ship.targetY - ship.y, ship.targetX - ship.x);
        ship.scale = 0.9 + Math.random() * 0.6;
        ship.phase = "entering";
        ship.timer = 0;
        ship.engineGlow = 1;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let dpr = window.devicePixelRatio || 1;

        const resize = () => {
            dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            initAmbientStars(rect.width, rect.height);
        };

        resize();
        initWarpStars();
        initShip(canvas.width / dpr, canvas.height / dpr);
        window.addEventListener("resize", resize);

        const draw = (timestamp: number) => {
            if (!shouldAnimate.current) {
                // Throttle RAF when hidden - request but don't draw
                animRef.current = requestAnimationFrame(draw);
                return;
            }

            const w = canvas.width / dpr;
            const h = canvas.height / dpr;
            const cx = w / 2;
            const cy = h / 2;
            const maxRadius = Math.hypot(cx, cy) * 1.1;

            ctx.clearRect(0, 0, w, h);

            // ── Warp speed calculation ──
            const burstAge = timestamp - burstStartRef.current;
            const inBurst = burstAge < BURST_DURATION;
            if (!inBurst && timestamp - burstStartRef.current > BURST_INTERVAL) {
                burstStartRef.current = timestamp;
            }
            const burstT = inBurst ? Math.sin((burstAge / BURST_DURATION) * Math.PI) : 0;
            const warpSpeed = WARP_SPEED_BASE + burstT * WARP_SPEED_BOOST;

            // ── Ambient background stars ──
            for (const star of ambientRef.current) {
                const twinkle = Math.sin(timestamp * 0.001 + star.twinklePhase);
                const opacity = star.opacity * (0.6 + 0.4 * twinkle);
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.fill();
            }

            // ── Warp star streaks ──
            for (const star of warpStarsRef.current) {
                star.dist += (0.003 * warpSpeed * star.speed);

                if (star.dist > 1.0) {
                    star.dist = 0.01 + Math.random() * 0.05;
                    star.angle = Math.random() * Math.PI * 2;
                    star.hue = Math.random() < 0.12 ? 25 : (Math.random() < 0.06 ? 210 : 0);
                }

                const r = star.dist * maxRadius;
                const x = cx + Math.cos(star.angle) * r;
                const y = cy + Math.sin(star.angle) * r;

                // Streak length — longer when further out + during warp burst
                const streakLen = star.dist * (4 + burstT * 22) * star.speed;
                const x2 = cx + Math.cos(star.angle) * (r - streakLen);
                const y2 = cy + Math.sin(star.angle) * (r - streakLen);

                const alpha = Math.min(star.dist * 2, 1) * (0.3 + burstT * 0.5);

                // Color based on hue
                let color: string;
                if (star.hue === 25) {
                    color = `rgba(255, 160, 60, ${alpha})`;   // orange
                } else if (star.hue === 210) {
                    color = `rgba(120, 160, 255, ${alpha})`;  // cool blue
                } else {
                    color = `rgba(255, 255, 255, ${alpha})`;  // white
                }

                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = color;
                ctx.lineWidth = star.size * (0.5 + star.dist * 1.5 + burstT * 1);
                ctx.lineCap = "round";
                ctx.stroke();

                // Head glow for close stars
                if (star.dist > 0.6) {
                    ctx.beginPath();
                    ctx.arc(x, y, star.size * 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 240, 220, ${alpha * 0.3})`;
                    ctx.fill();
                }
            }

            // ── Center warp glow (orange during burst) ──
            if (burstT > 0.05) {
                const glowR = 60 + burstT * 150;
                const cGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
                cGrad.addColorStop(0, `rgba(255, 140, 50, ${burstT * 0.12})`);
                cGrad.addColorStop(0.4, `rgba(255, 107, 53, ${burstT * 0.05})`);
                cGrad.addColorStop(1, "rgba(255, 107, 53, 0)");
                ctx.beginPath();
                ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
                ctx.fillStyle = cGrad;
                ctx.fill();
            }

            // ── Shooting stars ──
            if (timestamp - lastShootRef.current > SHOOTING_INTERVAL) {
                const angle = (Math.PI / 6) + Math.random() * (Math.PI / 3);
                const speed = 7 + Math.random() * 6;
                shootingRef.current.push({
                    x: Math.random() * w * 0.7,
                    y: Math.random() * h * 0.25,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 0,
                    maxLife: 35 + Math.random() * 25,
                    size: 1.2 + Math.random() * 1.2,
                });
                lastShootRef.current = timestamp;
            }

            for (let i = shootingRef.current.length - 1; i >= 0; i--) {
                const s = shootingRef.current[i];
                s.x += s.vx;
                s.y += s.vy;
                s.life++;
                const progress = s.life / s.maxLife;
                const alpha = progress < 0.5 ? progress * 2 : (1 - progress) * 2;

                const tailLen = 35;
                const norm = Math.hypot(s.vx, s.vy);
                const grad = ctx.createLinearGradient(
                    s.x, s.y,
                    s.x - s.vx * (tailLen / norm),
                    s.y - s.vy * (tailLen / norm)
                );
                grad.addColorStop(0, `rgba(255, 200, 130, ${alpha * 0.9})`);
                grad.addColorStop(0.5, `rgba(255, 130, 50, ${alpha * 0.3})`);
                grad.addColorStop(1, `rgba(255, 107, 53, 0)`);
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x - s.vx * (tailLen / norm), s.y - s.vy * (tailLen / norm));
                ctx.strokeStyle = grad;
                ctx.lineWidth = s.size;
                ctx.lineCap = "round";
                ctx.stroke();

                if (s.life >= s.maxLife) shootingRef.current.splice(i, 1);
            }

            // ── Spaceship ──
            const ship = shipRef.current;
            ship.timer++;

            if (ship.phase === "entering" || ship.phase === "cruising") {
                // Move toward target with subtle sine-wave drift
                const dx = ship.targetX - ship.x;
                const dy = ship.targetY - ship.y;
                const dist = Math.hypot(dx, dy);

                const moveSpeed = ship.phase === "entering" ? 1.2 : 0.8;
                ship.x += (dx / dist) * moveSpeed;
                ship.y += (dy / dist) * moveSpeed + Math.sin(timestamp * 0.002) * 0.3;

                // Smooth angle toward direction
                const targetAngle = Math.atan2(dy + Math.sin(timestamp * 0.002) * 30, dx);
                ship.angle += (targetAngle - ship.angle) * 0.03;

                // Engine glow pulsates
                ship.engineGlow = 0.7 + 0.3 * Math.sin(timestamp * 0.005);

                // Boost engine during warp burst
                if (inBurst) {
                    ship.engineGlow = 1.0 + burstT * 0.5;
                }

                // Check if reached target → reset
                if (dist < 5 || ship.x > w + 70 || ship.x < -70) {
                    initShip(w, h);
                }
            }

            drawSpaceship(ctx, ship, timestamp);

            animRef.current = requestAnimationFrame(draw);
        };

        // Initialize Visibility Observers
        const updateVisibility = () => {
            shouldAnimate.current = isInViewport.current && isDocVisible.current;
        };

        const observer = new IntersectionObserver(([entry]) => {
            isInViewport.current = entry.isIntersecting;
            updateVisibility();
        }, { threshold: 0 });

        if (canvas) observer.observe(canvas);

        const onVisChange = () => {
            isDocVisible.current = !document.hidden;
            updateVisibility();
        };
        document.addEventListener("visibilitychange", onVisChange);

        // Stagger first burst
        burstStartRef.current = performance.now() + 3000;
        animRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
            document.removeEventListener("visibilitychange", onVisChange);
            observer.disconnect();
        };
    }, [initWarpStars, initAmbientStars, initShip]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            {/* ── Layer 1: Video background ── */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "brightness(0.6) saturate(1.2)" }}
                poster=""
            >
                <source src="/videos/hero-space.mp4" type="video/mp4" />
            </video>

            {/* ── Layer 2: Dark overlay for text readability ── */}
            <div className="absolute inset-0 bg-black/40" />

            {/* ── Layer 3: Orange accent overlays ── */}
            {/* Bottom orange horizon glow */}
            <div
                className="absolute -bottom-[10%] left-[0%] w-[100%] h-[40%] opacity-40 blur-[100px] pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(255, 107, 53, 0.4), rgba(200, 60, 20, 0.15), transparent 60%)",
                }}
            />
            {/* Right edge orange accent */}
            <div
                className="absolute top-[10%] -right-[5%] w-[40%] h-[45%] opacity-25 blur-[90px] pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(255, 120, 40, 0.4), rgba(200, 80, 20, 0.12), transparent 65%)",
                }}
            />
            {/* Top-left subtle orange nebula */}
            <div
                className="absolute -top-[5%] -left-[5%] w-[35%] h-[35%] opacity-15 blur-[80px] pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(255, 140, 50, 0.35), rgba(200, 80, 20, 0.1), transparent 65%)",
                }}
            />

            {/* ── Layer 4: Canvas — warp streaks, spaceship, shooting stars ── */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ mixBlendMode: "screen" }}
            />

            {/* ── Layer 5: Vignette ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 65% 55% at 50% 50%, transparent 25%, rgba(0,0,0,0.6) 100%)",
                }}
            />
        </div>
    );
}
