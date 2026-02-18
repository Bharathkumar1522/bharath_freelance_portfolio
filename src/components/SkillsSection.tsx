"use client";

import { portfolioData } from "@/data/portfolio";
import { Cpu, Globe, Palette } from "lucide-react";
import ThreeOrbitalSystem from "./ThreeOrbitalSystem";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SkillsSection() {

    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.1 });

    const categories = [
        {
            id: "core",
            label: "Core Stack",
            icon: Cpu,
            skills: portfolioData.skills.core,
            color: "#FF6B35", // Signature Orange
            radius: 120,
            speed: 30
        },
        {
            id: "services",
            label: "Freelance",
            icon: Globe,
            skills: portfolioData.skills.services,
            color: "#E4E4E7", // Zinc-200 (White/Silver)
            radius: 200,
            speed: 45
        },
        {
            id: "design",
            label: "Design + AI",
            icon: Palette,
            skills: portfolioData.skills.design,
            color: "#71717A", // Zinc-500 (Deep Metallic)
            radius: 280,
            speed: 60
        }
    ];

    return (
        <div className="relative h-[250vh] w-full bg-black">
            <section
                id="skills"
                ref={containerRef}
                className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-0 z-0"
            >

                {/* Deep Space Background */}
                <div className="absolute inset-0 bg-[#030303] z-0" />

                {/* Ambient Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

                {/* The Solar System */}
                <div className="absolute inset-0 z-10">
                    <ThreeOrbitalSystem categories={categories} isVisible={true} />
                </div>

                <div className="container mx-auto relative z-20 flex flex-col items-center h-full justify-start pt-4 md:pt-8 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-center pointer-events-auto"
                    >
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter font-heading text-white uppercase mb-4">
                            Skills & Expertise
                        </h2>
                        <div className="inline-block px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
                            <p className="text-white font-mono text-xs md:text-sm tracking-[0.2em] uppercase animate-pulse">
                                Interactive System • Click Planets to Explore
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
