"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Category {
    id: string;
    label: string;
    icon: LucideIcon;
    skills: { name: string; level: number }[];
    color: string;
}

interface DesktopSkillsListProps {
    categories: Category[];
    activeId: string | null;
    onCategoryChange: (id: string) => void;
}

export default function DesktopSkillsList({ categories, activeId, onCategoryChange }: DesktopSkillsListProps) {
    const activeData = categories.find(c => c.id === activeId);

    return (
        <div className="flex flex-col gap-3 w-full">
            {categories.map((category) => {
                const isOpen = activeId === category.id;
                return (
                    <div
                        key={category.id}
                        className={`rounded-xl border overflow-hidden transition-all duration-300 ${isOpen
                            ? "border-orange-500/30 bg-black/70 shadow-[0_0_24px_-8px_rgba(255,107,53,0.2)]"
                            : "border-white/8 bg-black/40 hover:border-white/15"
                            }`}
                    >
                        <button
                            onClick={() => onCategoryChange(category.id)}
                            className="w-full flex items-center justify-between px-4 py-3 group"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg border transition-all duration-300 ${isOpen
                                    ? "bg-orange-500/20 border-orange-500/40"
                                    : "bg-white/5 border-white/8 group-hover:bg-white/10"
                                    }`}>
                                    <category.icon
                                        size={15}
                                        className={isOpen ? "text-orange-400" : "text-zinc-400"}
                                    />
                                </div>
                                <span className={`text-sm font-bold font-heading uppercase tracking-widest transition-colors duration-200 ${isOpen ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                                    }`}>
                                    {category.label}
                                </span>
                            </div>
                            <ChevronDown
                                size={14}
                                className={`transition-all duration-300 ${isOpen ? "rotate-180 text-orange-400" : "text-zinc-600"
                                    }`}
                            />
                        </button>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.28, ease: "easeInOut" }}
                                >
                                    <div className="px-4 pb-4 pt-1 space-y-2.5 border-t border-white/5">
                                        {category.skills.map((skill, idx) => (
                                            <div key={idx} className="flex items-center justify-between gap-3 group/skill">
                                                <span className="text-zinc-300 text-xs uppercase tracking-widest font-mono flex-shrink-0 group-hover/skill:text-white transition-colors">
                                                    {skill.name}
                                                </span>
                                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                                    <div className="flex-1 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${skill.level}%` }}
                                                            transition={{ duration: 0.8, delay: idx * 0.05, ease: "easeOut" }}
                                                            className="h-full rounded-full"
                                                            style={{ backgroundColor: category.color }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] text-zinc-600 font-mono w-8 text-right flex-shrink-0">
                                                        {skill.level}%
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}

            {/* Accent Dot */}
            <div className="mt-2 flex items-center gap-2 px-1">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-orange-500/30 to-transparent" />
                <div className="w-1 h-1 rounded-full bg-orange-500/60" />
            </div>
        </div>
    );
}
