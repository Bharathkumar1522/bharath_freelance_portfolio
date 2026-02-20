"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useLenis } from "@/components/SmoothScrolling";
import { usePreloader } from "@/context/PreloaderContext";
import { ScrambleText } from "@/components/ui/TextScramble";
import dynamic from "next/dynamic";

import { portfolioData } from "@/data/portfolio";

const SpaceBackground = dynamic(() => import("@/components/SpaceBackground"), {
    ssr: false,
});

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

    const isInView = useInView(container, { margin: "-100px" });

    useEffect(() => {
        if (isLoading || !isInView) return; // Wait for loader and visibility

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
    }, [displayedRole, isDeleting, roleIndex, isLoading, isInView]);


    const lenis = useLenis();

    const handleScrollToWork = () => {
        lenis?.scrollTo("#work", { duration: 1.5 });
    };

    return (
        <section id="hero" ref={container} className="relative h-[100dvh] w-full overflow-hidden bg-[#020208] text-white perspective-1000">

            {/* ─── Immersive Space Background ─── */}
            <SpaceBackground />

            {/* --- Tech Accents Layer --- */}
            {/* --- Tech Accents Layer --- */}
            <div className="absolute inset-x-4 top-24 bottom-10 border-x border-white/[0.07] pointer-events-none select-none z-10 md:inset-x-12">
                {/* Corners - High Visibility */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-[3px] border-l-[3px] border-orange-500/70 rounded-tl-sm shadow-[0_0_8px_rgba(255,107,53,0.3)]" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-[3px] border-r-[3px] border-orange-500/70 rounded-tr-sm shadow-[0_0_8px_rgba(255,107,53,0.3)]" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[3px] border-l-[3px] border-orange-500/70 rounded-bl-sm shadow-[0_0_8px_rgba(255,107,53,0.3)]" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[3px] border-r-[3px] border-orange-500/70 rounded-br-sm shadow-[0_0_8px_rgba(255,107,53,0.3)]" />

                {/* Side Markers */}
                <div className="absolute top-1/4 -left-[2px] w-1 h-12 bg-orange-500/40 shadow-[0_0_12px_rgba(255,107,53,0.4)]" />
                <div className="absolute top-3/4 -right-[2px] w-1 h-12 bg-orange-500/40 shadow-[0_0_12px_rgba(255,107,53,0.4)]" />
            </div>


            {/* --- Content Layer --- */}
            <div className="relative z-20 flex h-full w-full flex-col items-center justify-center pointer-events-none px-4">
                <div className="flex flex-col items-center justify-center max-w-5xl w-full">

                    {/* Status Pill */}
                    {/* Status Pill REMOVED */}


                    {/* Main Typography — all in one scroll-linked block */}
                    <motion.div style={{ y: yText, opacity }} className="flex flex-col items-center w-full">

                        {/* Name */}
                        <h1
                            className="text-6xl sm:text-7xl md:text-[9vw] leading-[0.85] font-black font-heading tracking-tighter text-white select-none pointer-events-auto text-center mb-6 md:mb-8"
                            style={{ textShadow: "0 0 60px rgba(255,107,53,0.15), 0 4px 20px rgba(0,0,0,0.5)" }}
                        >
                            <ScrambleText
                                text="BHARATH"
                                className="block relative z-10"
                                trigger={!isLoading}
                            />
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-300 to-amber-400"
                                style={{ textShadow: "none" }}
                            >
                                KUMAR
                            </motion.span>
                        </h1>

                        {/* Tagline + Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="text-center max-w-3xl px-4 mb-8 flex flex-col items-center gap-3"
                        >
                            <h2
                                className="text-base md:text-xl font-light text-white/80 tracking-wide font-heading uppercase"
                                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
                            >
                                {portfolioData.personal.tagline}
                            </h2>

                            {/* Description REMOVED */}
                        </motion.div>

                        {/* CTA Button — in flow, not absolute */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 1.5, duration: 0.7 }}
                            className="mb-5 pointer-events-auto"
                        >
                            <MagneticButton onClick={handleScrollToWork}>
                                <div className="group relative flex items-center gap-3 px-7 py-3.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full hover:from-orange-400 hover:to-amber-300 transition-all duration-300 shadow-[0_0_20px_rgba(255,107,53,0.3)] hover:shadow-[0_0_30px_rgba(255,107,53,0.5)]">
                                    <span className="text-sm font-bold font-heading uppercase tracking-widest text-black">
                                        Explore Works
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                                </div>
                            </MagneticButton>
                        </motion.div>

                        {/* System Status Typewriter */}
                        {/* System Status REMOVED */}

                    </motion.div>

                </div>

                {/* Scroll hint — at the very bottom */}
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="absolute bottom-6 md:bottom-10 text-[10px] font-mono text-orange-500/30 uppercase tracking-[0.3em] animate-pulse pointer-events-none"
                >
                    Scroll
                </motion.span>
            </div>

        </section>
    );
}
