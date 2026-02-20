"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { usePreloader } from "@/context/PreloaderContext";

const LOADING_STAGES = [
    { label: "INITIALIZING SYSTEM...", threshold: 0 },
    { label: "LOADING FONTS...", threshold: 15 },
    { label: "PREPARING GRAPHICS ENGINE...", threshold: 35 },
    { label: "COMPILING SHADERS...", threshold: 55 },
    { label: "CALIBRATING VIEWPORT...", threshold: 75 },
    { label: "SYSTEM READY.", threshold: 95 },
];

const MIN_DISPLAY_MS = 1400;

export default function Preloader() {
    const { setProgress, markComplete, progress } = usePreloader();
    const containerRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const [logs, setLogs] = useState<string[]>([LOADING_STAGES[0].label]);
    const startTimeRef = useRef<number>(Date.now());
    const hasExitedRef = useRef(false);

    // Update terminal logs based on progress
    useEffect(() => {
        const currentStage = LOADING_STAGES.filter(s => progress >= s.threshold);
        setLogs(currentStage.map(s => s.label));
    }, [progress]);

    // Update counter display via direct DOM (no re-render)
    useEffect(() => {
        if (counterRef.current) {
            counterRef.current.innerText =
                Math.floor(progress).toString().padStart(3, "0") + "%";
        }
    }, [progress]);

    // Real resource loading
    const loadResources = useCallback(async () => {
        try {
            setProgress(10);

            // Wait for fonts
            if (typeof document !== "undefined" && document.fonts) {
                await document.fonts.ready;
            }
            setProgress(30);

            // Let the GPU warmup the LaserFlow WebGL shader (it's rendering behind us)
            await new Promise(r => setTimeout(r, 100));
            setProgress(50);

            // Preload any visible images
            const images = document.querySelectorAll<HTMLImageElement>("img[src]");
            if (images.length > 0) {
                const promises = Array.from(images).slice(0, 5).map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise<void>(resolve => {
                        img.addEventListener("load", () => resolve(), { once: true });
                        img.addEventListener("error", () => resolve(), { once: true });
                    });
                });
                await Promise.race([
                    Promise.all(promises),
                    new Promise(r => setTimeout(r, 1200)),
                ]);
            }
            setProgress(75);

            // Let browser finish layout
            await new Promise(r => requestAnimationFrame(() =>
                requestAnimationFrame(() => r(undefined))
            ));
            setProgress(90);

            // Enforce minimum display so it doesn't flash
            const elapsed = Date.now() - startTimeRef.current;
            const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
            if (remaining > 0) {
                await new Promise(r => setTimeout(r, remaining));
            }
            setProgress(100);
        } catch {
            setProgress(100);
        }
    }, [setProgress]);

    useEffect(() => {
        loadResources().then(() => {
            if (hasExitedRef.current) return;
            hasExitedRef.current = true;

            const container = containerRef.current;
            if (!container) return;

            // STEP 1: Mark loading complete FIRST so Hero animations start immediately
            // while the preloader is still visible. This gives animations a head start.
            markComplete();

            // STEP 2: After a brief moment (let animations begin), smoothly fade out preloader
            // The user sees: preloader fades → reveals already-animating hero content
            gsap.to(container, {
                yPercent: -100,
                duration: 0.8,
                ease: "power3.inOut",
                delay: 0.15, // Brief pause so Hero animations get a head start
                onComplete: () => {
                    container.style.display = "none";
                },
            });
        });
    }, [loadResources, markComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white font-mono overflow-hidden will-change-transform"
        >
            {/* Center Counter */}
            <div className="relative z-10 flex flex-col items-center">
                <span
                    ref={counterRef}
                    className="text-[15vw] md:text-[10vw] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mix-blend-difference select-none"
                >
                    000%
                </span>
                <div className="w-full h-[1px] bg-white/20 mt-4 relative overflow-hidden">
                    <div
                        className="absolute inset-y-0 left-0 bg-orange-500 transition-[width] duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Terminal Logs */}
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex flex-col gap-1 items-start">
                {logs.slice(-4).map((log, idx) => (
                    <span
                        key={idx}
                        className="text-xs md:text-sm text-white/50 uppercase tracking-widest"
                    >
                        {">"} {log}
                    </span>
                ))}
                <span className="text-orange-500 animate-pulse">_</span>
            </div>

            {/* CRT Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[0] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
        </div>
    );
}
