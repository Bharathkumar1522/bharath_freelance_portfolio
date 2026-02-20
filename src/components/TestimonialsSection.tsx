"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import TestimonialCard from "./TestimonialCard";
import { portfolioData } from "@/data/portfolio";

export default function TestimonialsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    const trackRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollOffset = useRef(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const testimonials = portfolioData.testimonials;

    // ── Drag handlers ──────────────────────────────────────────────────────────
    const onPointerDown = useCallback((e: React.PointerEvent) => {
        isDragging.current = true;
        startX.current = e.clientX - scrollOffset.current;
        setIsPaused(true);
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }, []);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        if (!isDragging.current) return;
        const newOffset = e.clientX - startX.current;
        scrollOffset.current = newOffset;
        setDragOffset(newOffset);
    }, []);

    const onPointerUp = useCallback(() => {
        isDragging.current = false;
        // Snap back auto-scroll from where we left off by resetting offset
        setIsPaused(false);
        // Gradually reset the manual offset
        scrollOffset.current = 0;
        setDragOffset(0);
    }, []);

    return (
        <section
            id="testimonials"
            ref={sectionRef}
            className="relative w-full bg-zinc-950 py-24 md:py-32 overflow-hidden"
        >
            {/* ─── Spotlight Background ─── */}

            {/* Top warm spotlight */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none opacity-40 mix-blend-screen"
                style={{ background: "radial-gradient(ellipse at top, #ff6b35 0%, rgba(255,107,53,0.1) 50%, transparent 80%)" }}
            />

            {/* Bottom cool glow */}
            <div
                className="absolute bottom-[-20%] left-0 right-0 h-[400px] pointer-events-none opacity-20"
                style={{ background: "radial-gradient(ellipse at bottom, #4f46e5 0%, transparent 70%)" }}
            />

            {/* Subtle grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_100%)] pointer-events-none" />

            {/* Scan line */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent animate-beam-scan"
                    style={{ "--dur": "8s", animationDelay: "2s" } as React.CSSProperties}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                        </span>
                        <span className="text-orange-500 font-mono text-[10px] uppercase tracking-widest font-bold">Social Proof</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black text-white font-heading tracking-tighter mb-6 uppercase">
                        Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-200">Words</span>
                    </h2>

                    <p className="text-zinc-400 max-w-md mx-auto text-sm md:text-base font-medium leading-relaxed">
                        Real feedback from real clients. Unfiltered.
                    </p>
                    <p className="text-zinc-600 text-xs font-mono mt-2 tracking-wider">
                        ← Drag to explore →
                    </p>
                </motion.div>

                {/* ── Marquee track ── */}
                {/* Fade edges */}
                <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                    <div
                        ref={trackRef}
                        className="flex gap-6 py-8 cursor-grab active:cursor-grabbing select-none"
                        style={{
                            width: "max-content",
                            animationName: "marquee",
                            animationDuration: "35s",
                            animationTimingFunction: "linear",
                            animationIterationCount: "infinite",
                            animationPlayState: isPaused ? "paused" : "running",
                            transform: dragOffset !== 0 ? `translateX(${dragOffset}px)` : undefined,
                            willChange: "transform",
                        }}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerLeave={onPointerUp}
                    >
                        {/* Double the array so the loop is seamless */}
                        {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                            <TestimonialCard
                                key={i}
                                quote={t.quote}
                                name={t.name}
                                role={t.role}
                                company={t.company}
                                image={t.image}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
