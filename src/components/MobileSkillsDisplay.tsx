"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Globe, Palette, ChevronDown } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function MobileSkillsDisplay() {
    const [openCategory, setOpenCategory] = useState<string | null>("core");

    const categories = [
        {
            id: "core",
            label: "Core Stack",
            icon: Cpu,
            skills: portfolioData.skills.core,
            color: "#FF6B35", // Orange
        },
        {
            id: "services",
            label: "Freelance",
            icon: Globe,
            skills: portfolioData.skills.services,
            color: "#E4E4E7", // Zinc-200
        },
        {
            id: "design",
            label: "Design + AI",
            icon: Palette,
            skills: portfolioData.skills.design,
            color: "#71717A", // Zinc-500
        }
    ];

    return (
        <div className="w-full max-w-md mx-auto px-4 pb-24 pt-8">
            <div className="space-y-4">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openCategory === category.id
                                ? "bg-zinc-900/80 border-orange-500/30 shadow-[0_0_30px_-10px_rgba(255,107,53,0.15)]"
                                : "bg-zinc-900/30 border-white/5"
                            }`}
                    >
                        <button
                            onClick={() => setOpenCategory(openCategory === category.id ? null : category.id)}
                            className="w-full flex items-center justify-between p-5"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2.5 rounded-xl border ${openCategory === category.id ? 'bg-orange-500/20 border-orange-500/30' : 'bg-white/5 border-white/10'}`}>
                                    <category.icon
                                        size={20}
                                        className={openCategory === category.id ? "text-orange-500" : "text-zinc-400"}
                                    />
                                </div>
                                <span className={`text-lg font-bold font-heading uppercase tracking-wider ${openCategory === category.id ? "text-white" : "text-zinc-400"}`}>
                                    {category.label}
                                </span>
                            </div>
                            <ChevronDown
                                className={`text-zinc-500 transition-transform duration-300 ${openCategory === category.id ? "rotate-180 text-orange-500" : ""}`}
                            />
                        </button>

                        <AnimatePresence initial={false}>
                            {openCategory === category.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-5 pb-6 pt-0 space-y-3 border-t border-white/5 mt-2">
                                        <div className="grid grid-cols-1 gap-3 pt-4">
                                            {category.skills.map((skill, idx) => (
                                                <div key={idx} className="bg-black/40 rounded-lg p-3 border border-white/5 flex items-center justify-between group">
                                                    <span className="text-zinc-300 font-medium text-sm tracking-wide group-hover:text-white transition-colors">
                                                        {skill.name}
                                                    </span>

                                                    {/* Skill Bar */}
                                                    <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${skill.level}%` }}
                                                            transition={{ duration: 1, delay: 0.1 }}
                                                            className="h-full rounded-full"
                                                            style={{ backgroundColor: category.color }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {/* Mobile Footer Deco */}
            <div className="mt-12 flex justify-center opacity-30">
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full" />
            </div>
        </div>
    );
}
