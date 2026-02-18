"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Globe, Palette, Code, Terminal, Zap } from "lucide-react";

interface SkillNode {
    name: string;
    level: number;
}

interface OrbitCategory {
    id: string;
    label: string;
    icon: any;
    skills: SkillNode[];
    color: string;
    radius: number; // Distance from center
    speed: number; // Duration of one orbit
}

interface OrbitalSystemProps {
    categories: OrbitCategory[];
}

export default function OrbitalSystem({ categories }: OrbitalSystemProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(categories[0]?.id || null);
    const [isLocked, setIsLocked] = useState(false);

    const handleCategoryClick = (id: string) => {
        if (activeCategory === id && isLocked) {
            setIsLocked(false);
            setActiveCategory(null);
        } else {
            setActiveCategory(id);
            setIsLocked(true);
        }
    };

    const handleContainerLeave = () => {
        if (!isLocked) {
            setActiveCategory(categories[0].id);
        }
    };

    return (
        <div
            className="relative w-full h-[800px] flex items-center justify-center overflow-visible group"
            onMouseLeave={handleContainerLeave}
            style={{ perspective: '1000px' }}
        >

            {/* Central Star (You) - 3D Core */}
            <div className="absolute z-10" style={{ transformStyle: 'preserve-3d' }}>
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 rounded-full bg-orange-500 blur-[60px] opacity-60 animate-pulse" />
                    {/* The Sun Sphere */}
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff,#ff8a4c,#ff4500)] shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5),0_0_30px_#ff4500] border border-white/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-heading font-bold text-xl tracking-widest drop-shadow-md">ME</span>
                    </div>
                </div>
            </div>

            {/* Orbital Plane - Tilted */}
            <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: 'rotateX(60deg)'
                }}
            >
                {categories.map((cat) => (
                    <OrbitRing
                        key={cat.id}
                        category={cat}
                        activeId={activeCategory}
                        isLocked={isLocked && activeCategory === cat.id}
                        onHover={(id) => !isLocked && setActiveCategory(id)}
                        onClick={() => handleCategoryClick(cat.id)}
                    />
                ))}
            </div>

            {/* Info Panel (Hologram) - Keeps 2D Overlay */}
            <AnimatePresence>
                {activeCategory && (
                    <InfoPanel
                        category={categories.find(c => c.id === activeCategory)!}
                        isLocked={isLocked}
                        onClose={() => { setIsLocked(false); setActiveCategory(categories[0].id); }}
                    />
                )}
            </AnimatePresence>

        </div>
    );
}

function OrbitRing({ category, activeId, isLocked, onHover, onClick }: {
    category: OrbitCategory,
    activeId: string | null,
    isLocked: boolean,
    onHover: (id: string | null) => void,
    onClick: () => void
}) {
    const isActive = activeId === category.id;
    const isDimmed = activeId !== null && !isActive;

    return (
        <div
            className="absolute rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 pointer-events-none"
            style={{
                width: category.radius * 2,
                height: category.radius * 2,
                opacity: isDimmed ? 0.3 : 0.8,
                borderColor: isActive ? category.color : 'rgba(255,255,255,0.05)',
                boxShadow: isActive ? `0 0 20px ${category.color}20, inset 0 0 20px ${category.color}10` : 'none',
                transformStyle: 'preserve-3d'
            }}
        >
            {/* Rotating Container */}
            <div
                className="absolute w-full h-full animate-spin-slow group-hover:[animation-play-state:paused] pointer-events-none"
                style={{
                    animationDuration: `${category.speed}s`,
                    animationPlayState: isLocked ? 'paused' : undefined,
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* Connector Line (Along the plane) - Remains flat on tilted plane */}
                <div
                    className={`absolute top-1/2 left-1/2 h-[1px] origin-left transition-opacity duration-300 pointer-events-none`}
                    style={{
                        width: category.radius,
                        background: `linear-gradient(90deg, transparent, ${category.color})`,
                        opacity: isActive ? 1 : 0,
                        transform: 'translateY(-50%)'
                    }}
                />

                {/* The Planet Container */}
                <div
                    className="absolute top-1/2 -right-6 -mt-6 w-12 h-12 flex items-center justify-center cursor-pointer pointer-events-auto z-50"
                    style={{ transformStyle: 'preserve-3d' }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${category.label} skills`}
                    onMouseEnter={() => onHover(category.id)}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick();
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            e.stopPropagation();
                            onClick();
                        }
                    }}
                >
                    {/* Planet Body - Counter Rotated to face camera */}
                    <div
                        className="relative w-12 h-12 animate-spin-slow-reverse transition-transform duration-300 hover:scale-125"
                        style={{
                            animationDuration: `${category.speed}s`,
                            animationPlayState: isLocked ? 'paused' : undefined,
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        {/* The Sphere Itself - Counter Tilt X to stand up */}
                        <div
                            className="w-full h-full relative"
                            style={{ transform: 'rotateX(-60deg)', transformStyle: 'preserve-3d' }}
                        >

                            {/* Glow */}
                            <div
                                className="absolute inset-0 rounded-full blur-md transition-opacity duration-300 pointer-events-none"
                                style={{
                                    backgroundColor: category.color,
                                    opacity: isActive ? 0.8 : 0.4
                                }}
                            />

                            {/* Realistic Sphere Gradient */}
                            <div
                                className="absolute inset-0 rounded-full shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.8),0_0_10px_rgba(255,255,255,0.2)]"
                                style={{
                                    background: `radial-gradient(circle at 30% 30%, #fff, ${category.color}, #000)`
                                }}
                            />

                            {/* Icon Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-90">
                                <category.icon className="w-5 h-5 text-white drop-shadow-md mix-blend-overlay" />
                            </div>

                            {/* Label - Floating Above */}
                            <div
                                className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <div className="hidden group-hover:block md:block px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-xl transition-all duration-300">
                                    <span
                                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-white block"
                                        style={{
                                            color: isActive ? category.color : 'white',
                                            textShadow: `0 0 10px ${category.color}`
                                        }}
                                    >
                                        {category.label}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoPanel({ category, isLocked, onClose }: { category: OrbitCategory, isLocked: boolean, onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-80 p-6 rounded-xl border z-30 backdrop-blur-xl shadow-2xl"
            style={{
                borderColor: category.color,
                background: `linear-gradient(135deg, rgba(0,0,0,0.9), ${category.color}15)`,
                boxShadow: `0 0 50px -20px ${category.color}40`
            }}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                        <category.icon className="w-6 h-6" style={{ color: category.color }} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold font-heading text-white uppercase tracking-wider glow-text">{category.label}</h3>
                        {isLocked && <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">System Locked</span>}
                    </div>
                </div>
                {isLocked && (
                    <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors p-1 hover:bg-white/10 rounded">
                        ✕
                    </button>
                )}
            </div>

            <div className="space-y-3">
                {category.skills.map((skill, idx) => (
                    <div key={idx} className="bg-black/40 p-3 rounded-lg border border-white/5 flex justify-between items-center group hover:border-white/20 transition-all duration-300">
                        <span className="text-zinc-300 font-mono text-sm group-hover:text-white transition-colors tracking-wide">{skill.name}</span>
                        <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: idx * 0.1 }}
                                className="h-full rounded-full shadow-[0_0_10px_currentColor]"
                                style={{ backgroundColor: category.color, color: category.color }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Holographic scanner line */}
            <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden opacity-30">
                <div className="w-full h-[2px] bg-white/50 blur-[1px] absolute top-0 animate-scan" style={{ boxShadow: `0 0 10px ${category.color}` }} />
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50" />
        </motion.div>
    );
}
