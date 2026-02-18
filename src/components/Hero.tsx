"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePreloader } from "@/context/PreloaderContext";
import { ScrambleText } from "@/components/ui/TextScramble";

const ROLES = ["Frontend Specialist", "Creative Developer", "UI/UX Engineer", "React Ecosystem Expert"];

export default function Hero() {
    const { isLoading } = usePreloader();
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end start"],
    });

    const yText = useTransform(scrollYProgress, [0, 1], [0, 400]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Typewriter State
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayedRole, setDisplayedRole] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (isLoading) return; // Wait for loader

        const currentRole = ROLES[roleIndex];
        const typeSpeed = isDeleting ? 50 : 100;

        const timer = setTimeout(() => {
            if (!isDeleting && displayedRole === currentRole) {
                setTimeout(() => setIsDeleting(true), 2000); // Pause at end
            } else if (isDeleting && displayedRole === "") {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % ROLES.length);
            } else {
                setDisplayedRole((prev) =>
                    isDeleting ? currentRole.substring(0, prev.length - 1) : currentRole.substring(0, prev.length + 1)
                );
            }
        }, typeSpeed);

        return () => clearTimeout(timer);
    }, [displayedRole, isDeleting, roleIndex]);


    return (
        <section id="hero" ref={container} className="relative h-screen w-full overflow-hidden bg-transparent text-white perspective-1000">

            {/* --- Tech Accents Layer --- */}
            <div className="absolute inset-x-4 top-24 bottom-10 border-x border-white/10 pointer-events-none select-none z-10 md:inset-x-12">
                {/* Corners - High Visibility */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-[3px] border-l-[3px] border-orange-500 rounded-tl-sm" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-[3px] border-r-[3px] border-orange-500 rounded-tr-sm" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[3px] border-l-[3px] border-orange-500 rounded-bl-sm" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[3px] border-r-[3px] border-orange-500 rounded-br-sm" />

                {/* Side Markers */}
                <div className="absolute top-1/4 -left-[2px] w-1 h-12 bg-orange-500/50 shadow-[0_0_10px_rgba(255,107,53,0.5)]" />
                <div className="absolute top-3/4 -right-[2px] w-1 h-12 bg-orange-500/50 shadow-[0_0_10px_rgba(255,107,53,0.5)]" />
            </div>


            {/* --- Content Layer --- */}
            <div className="relative z-20 flex h-full w-full flex-col items-center justify-center pointer-events-none">
                <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full">

                    {/* Status Pill */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="mb-8 pointer-events-auto"
                    >
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)] hover:bg-white/10 transition-colors cursor-default group">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-xs font-mono tracking-widest uppercase text-zinc-400 group-hover:text-white transition-colors">Available for Work</span>
                        </div>
                    </motion.div>


                    {/* Main Typography */}
                    <motion.div style={{ y: yText, opacity }} className="flex flex-col items-center w-full z-20">

                        {/* 1. Name - Massive & Tight */}
                        <div className="relative mb-2">
                            <h1 className="text-[13vw] leading-[0.8] font-black font-heading tracking-tighter text-white select-none pointer-events-auto mix-blend-difference">
                                <ScrambleText
                                    text="BHARATH"
                                    className="block relative z-10"
                                    trigger={!isLoading}
                                />
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={!isLoading ? { opacity: 1 } : {}}
                                    transition={{ delay: 1.5, duration: 1 }}
                                    className="block absolute top-0 left-0 z-0 text-transparent blur-sm opacity-50"
                                    style={{ WebkitTextStroke: "1px rgba(255,107,53,0.5)" }}
                                >
                                    BHARATH
                                </motion.span>
                            </h1>
                        </div>

                        {/* 2. Value Proposition - Improved Contrast */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="text-center max-w-2xl px-4 mb-8"
                        >
                            <span className="block text-lg md:text-2xl font-light text-zinc-100 tracking-wide font-sans drop-shadow-lg">
                                Crafting High-Performance Digital Experiences
                            </span>
                            <span className="block text-sm md:text-base text-orange-300 font-mono mt-2 tracking-widest uppercase drop-shadow-md">
                                for Discerning Brands & Startups
                            </span>
                        </motion.h2>

                        {/* 3. System Status - Cyber Typewriter */}
                        <div className="h-8 flex items-center justify-center overflow-hidden bg-black/60 backdrop-blur-sm px-4 rounded-full border border-white/10">
                            <p className="font-mono text-xs md:text-sm text-zinc-400 tracking-[0.2em] uppercase">
                                SYSTEM_STATUS :: <span className="text-white font-bold">{displayedRole}</span>
                                <span className="animate-pulse ml-1 text-orange-400">_</span>
                            </p>
                        </div>

                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        style={{ y: yText }}
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        animate={!isLoading ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                        transition={{ delay: 1.8, duration: 0.5 }}
                        className="mt-12 pointer-events-auto"
                    >
                        <MagneticButton variant="ethereal" className="group relative px-10 py-5 bg-white text-black text-xl font-bold tracking-tight overflow-hidden hover:bg-orange-500 transition-colors duration-300 will-change-transform">
                            <span className="relative z-10 flex items-center gap-2">
                                Explore Works
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </span>
                        </MagneticButton>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator - Mouse Animation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-20"
            >
                <div className="w-[2px] h-16 bg-white/20 relative overflow-hidden rounded-full">
                    <motion.div
                        initial={{ top: "-50%" }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute w-full h-1/2 bg-gradient-to-b from-transparent via-orange-500 to-transparent"
                    />
                </div>
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/90 drop-shadow-md animate-pulse">Scroll</span>
            </motion.div>

        </section>
    );
}
