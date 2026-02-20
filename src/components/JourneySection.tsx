"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ExperienceNode from "./ExperienceNode";
import { portfolioData } from "@/data/portfolio";

const journeyItems = [
    ...portfolioData.experience.map((exp) => ({
        type: "work",
        title: exp.role,
        subtitle: exp.company,
        date: exp.duration,
        description: exp.description,
    })),
    ...portfolioData.education.map((edu) => ({
        type: "edu",
        title: edu.degree,
        subtitle: edu.institution,
        date: edu.period,
        description: edu.description,
    })),
].map((item, index) => ({
    ...item,
    align: (index % 2 === 0 ? "left" : "right") as "left" | "right",
}));

// Space dust particles
const PARTICLES = [
    { left: "8%", delay: "0s", dur: "7s", size: 2, drift: "15px" },
    { left: "22%", delay: "1.4s", dur: "9s", size: 1, drift: "-10px" },
    { left: "38%", delay: "0.7s", dur: "6s", size: 2, drift: "20px" },
    { left: "54%", delay: "2.1s", dur: "8s", size: 1, drift: "-18px" },
    { left: "67%", delay: "0.3s", dur: "10s", size: 2, drift: "12px" },
    { left: "80%", delay: "1.8s", dur: "7s", size: 1, drift: "-8px" },
    { left: "91%", delay: "0.9s", dur: "9s", size: 2, drift: "22px" },
    { left: "15%", delay: "3.2s", dur: "6s", size: 1, drift: "16px" },
];

export default function JourneySection() {
    const sectionRef = useRef<HTMLElement>(null);
    // header animation is now handled by whileInView directly on the element

    // Timeline draw
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 60%", "end 90%"],
    });

    const scaleY = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 1]),
        { stiffness: 80, damping: 20, restDelta: 0.001 }
    );

    // Parallax
    const { scrollYProgress: parallaxProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Background layers move at different speeds for deep parallax
    const bgY = useTransform(parallaxProgress, [0, 1], [-150, 150]); // Nebula
    const planet1Y = useTransform(parallaxProgress, [0, 1], [-50, 100]); // Small fast planet
    const planet2Y = useTransform(parallaxProgress, [0, 1], [-20, 40]); // Distance planet

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="relative min-h-screen w-full bg-[#050505] py-28 md:py-32 overflow-hidden"
        >
            {/* ─── Rich Space Background ─── */}

            {/* 1. Base Starfield (CSS radial gradients for performance) */}
            <div className="absolute inset-0 z-0 opacity-80"
                style={{
                    backgroundImage: `
                        radial-gradient(1px 1px at 10% 10%, white, transparent),
                        radial-gradient(1px 1px at 20% 40%, white, transparent),
                        radial-gradient(2px 2px at 30% 70%, white, transparent),
                        radial-gradient(1px 1px at 40% 20%, white, transparent),
                        radial-gradient(1px 1px at 50% 90%, white, transparent),
                        radial-gradient(2px 2px at 60% 30%, white, transparent),
                        radial-gradient(1px 1px at 70% 60%, white, transparent),
                        radial-gradient(1px 1px at 80% 10%, white, transparent),
                        radial-gradient(2px 2px at 90% 80%, white, transparent)
                    `,
                    backgroundSize: "400px 400px"
                }}
            />

            {/* 2. Milky Way Cloud (Diagonal Swirl) */}
            <motion.div
                className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] z-0 pointer-events-none opacity-30"
                style={{
                    y: bgY,
                    background: "radial-gradient(ellipse at center, rgba(100,50,255,0.08) 0%, rgba(255,107,53,0.05) 40%, transparent 70%)",
                    transform: "rotate(-15deg)"
                }}
            />

            {/* 3. Planets Composition */}

            {/* Planet 1: Ringed Ice Giant (Top Left) */}
            <motion.div
                className="absolute top-[15%] -left-[5%] md:left-[5%] w-32 h-32 md:w-48 md:h-48 rounded-full z-0 opacity-40 blur-[1px]"
                style={{
                    y: planet2Y,
                    background: "conic-gradient(from 220deg at 50% 50%, rgba(0,0,0,1) 0%, rgba(100,100,255,0.5) 20%, rgba(200,200,255,0.8) 40%, rgba(0,0,0,1) 100%)",
                    boxShadow: "inset -10px -10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(100,100,255,0.1)"
                }}
            >
                {/* Ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[20%] border border-white/10 rounded-full rotate-[-25deg] shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
            </motion.div>

            {/* Planet 2: Red Dwarf (Bottom Right) */}
            <motion.div
                className="absolute bottom-[20%] -right-[10%] md:right-[5%] w-64 h-64 md:w-96 md:h-96 rounded-full z-0 opacity-30 blur-[2px]"
                style={{
                    y: planet1Y,
                    background: "radial-gradient(circle at 30% 30%, rgba(255,107,53,0.5), #0f0500 70%)",
                    boxShadow: "inset -20px -20px 60px rgba(0,0,0,0.9)"
                }}
            />

            {/* Planet 3: Small Moon (Top Right distant) */}
            <div className="absolute top-[30%] right-[15%] w-8 h-8 rounded-full bg-zinc-600/30 blur-[0.5px] z-0 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]" />


            {/* Floating foreground particles */}
            {PARTICLES.map((p, i) => (
                <span
                    key={i}
                    className="animate-float-particle absolute bottom-0 rounded-full bg-orange-400/80 pointer-events-none z-0"
                    style={{
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        animationDelay: p.delay,
                        "--dur": p.dur,
                        "--drift-x": p.drift,
                    } as React.CSSProperties}
                />
            ))}

            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent z-10" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-24"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                        </span>
                        <span className="text-orange-500 font-mono text-[11px] tracking-[0.3em] uppercase">Timeline</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black font-heading tracking-tighter uppercase leading-none">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-300 to-amber-400">Voyage</span>
                    </h2>
                    <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase mt-3">
                        Experience &amp; Education
                    </p>
                </motion.div>

                {/* Central spine */}
                <div className="absolute left-[2rem] md:left-1/2 top-48 bottom-0 w-[2px] md:-translate-x-1/2 bg-white/5">
                    <motion.div
                        style={{
                            scaleY,
                            originY: 0,
                            background: "linear-gradient(to bottom, #FF6B35, #F59E0B, transparent)",
                            boxShadow: "0 0 12px rgba(255,107,53,0.6)",
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                    />
                </div>

                <div className="relative z-10 space-y-24">
                    {journeyItems.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row w-full ${item.align === "right" ? "md:flex-row-reverse" : ""} relative`}
                        >
                            <ExperienceNode
                                title={item.title}
                                company={item.subtitle}
                                date={item.date}
                                description={item.description}
                                align={item.align}
                                index={index}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
