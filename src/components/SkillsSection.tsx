"use client";

import { portfolioData } from "@/data/portfolio";
import { Cpu, Globe, Palette } from "lucide-react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import DesktopSkillsList from "./DesktopSkillsList";

const ThreeOrbitalSystem = dynamic(() => import("./ThreeOrbitalSystem"), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-white/20 font-mono text-xs tracking-widest animate-pulse">INITIALIZING ORBITAL SYSTEM...</div>
});

const categories = [
    {
        id: "core",
        label: "Core Stack",
        icon: Cpu,
        skills: portfolioData.skills.core,
        color: "#FF6B35",
        radius: 120,
        speed: 8
    },
    {
        id: "services",
        label: "Freelance",
        icon: Globe,
        skills: portfolioData.skills.services,
        color: "#E4E4E7",
        radius: 200,
        speed: 14
    },
    {
        id: "design",
        label: "Design + AI",
        icon: Palette,
        skills: portfolioData.skills.design,
        color: "#71717A",
        radius: 280,
        speed: 20
    }
];

const MobileSkillsDisplay = dynamic(() => import("./MobileSkillsDisplay"), {
    ssr: false,
});

export default function SkillsSection() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.1 });

    // Lifted state — shared between DesktopSkillsList and ThreeOrbitalSystem
    const [activeCategory, setActiveCategory] = useState<string | null>(categories[0].id);

    return (
        <div className="relative min-h-screen md:h-[250vh] w-full bg-black">
            <section
                id="skills"
                ref={containerRef}
                className="relative md:sticky top-0 w-full min-h-screen md:h-screen flex flex-col items-center justify-start overflow-x-hidden overflow-y-visible md:overflow-hidden pt-24 md:pt-0 pb-12 md:pb-0 z-0"
            >
                {/* Deep Space Background */}
                <div className="absolute inset-0 bg-[#030303] z-0" />

                {/* Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

                {/* Desktop: 3D Solar System (full background) */}
                <div className="hidden md:block absolute inset-0 z-10 transition-transform duration-500">
                    <ThreeOrbitalSystem
                        categories={categories}
                        isVisible={true}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />
                </div>

                {/* Title */}
                <div className="container mx-auto relative z-20 flex flex-col items-center justify-start pt-4 md:pt-24 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-center pointer-events-auto mb-8 md:mb-0"
                    >
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter font-heading text-white uppercase mb-4">
                            Skills &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-300 to-amber-400">Expertise</span>
                        </h2>
                        {/* Desktop hint */}
                        <div className="hidden md:inline-block px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
                            <p className="text-white font-mono text-xs tracking-[0.2em] uppercase animate-pulse">
                                Interactive System • Click to Explore
                            </p>
                        </div>
                    </motion.div>

                    {/* Mobile: Accordion list */}
                    <div className="w-full md:hidden pointer-events-auto">
                        <MobileSkillsDisplay />
                    </div>
                </div>

                {/* Desktop: Skills List Panel (absolute, left side, over the 3D system) */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2 z-20 w-72 pointer-events-auto"
                >
                    {/* Panel header */}
                    <div className="mb-3 flex items-center gap-2">
                        <div className="h-[1px] w-6 bg-orange-500/60" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-500/80">
                            Expertise
                        </span>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-3 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
                        <DesktopSkillsList
                            categories={categories}
                            activeId={activeCategory}
                            onCategoryChange={setActiveCategory}
                        />
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
