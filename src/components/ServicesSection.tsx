"use client";

import { portfolioData } from "@/data/portfolio";
import { Layout, User, Globe, Palette, Monitor, ShoppingBag, Figma, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const iconMap: Record<string, LucideIcon> = {
    layout: Layout,
    user: User,
    globe: Globe,
    palette: Palette,
    monitor: Monitor,
    "shopping-bag": ShoppingBag,
    figma: Figma,
};

const CARD_CONFIG = [
    { accent: "#FF6B35", glow: "rgba(255,107,53,0.12)", label: "Core Service", tags: ["Conversion-Focused", "Mobile-First", "Fast Delivery"] },
    { accent: "#818CF8", glow: "rgba(129,140,248,0.10)", label: "Identity", tags: ["Brand Storytelling", "Scroll Effects", "Portfolio CMS"] },
    { accent: "#34D399", glow: "rgba(52,211,153,0.10)", label: "Growth", tags: ["Animations", "WebGL", "Storytelling"] },
    { accent: "#F472B6", glow: "rgba(244,114,182,0.10)", label: "Creative", tags: ["Figma to Code", "Design Systems", "Prototyping"] },
];

function ServiceCard({
    service,
    index,
}: {
    service: { id: string | number; title: string; description: string; icon: string };
    index: number;
}) {
    const Icon = iconMap[service.icon] || Globe;
    const cfg = CARD_CONFIG[index % CARD_CONFIG.length];

    return (
        <motion.div
            initial={{ opacity: 0, y: 55 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: index * 0.13, duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="group relative rounded-2xl overflow-hidden flex flex-col"
            style={{
                background: "linear-gradient(145deg, rgba(10,10,10,1) 0%, rgba(20,18,18,1) 100%)",
                border: `1px solid ${cfg.accent}22`,
                boxShadow: `0 2px 40px ${cfg.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
                minHeight: "360px",
            }}
        >
            {/* Animated scanline sweep on top border */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] z-20"
                style={{ background: `linear-gradient(90deg, transparent, ${cfg.accent}, transparent)` }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3 + index * 1.1, ease: "easeInOut" }}
            />

            {/* Static top accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: `linear-gradient(90deg, transparent, ${cfg.accent}50, transparent)` }} />

            {/* Corner glow top-right */}
            <div className="absolute top-0 right-0 w-52 h-52 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${cfg.glow}, transparent 65%)` }} />

            {/* Corner glow bottom-left — revealed on hover */}
            <div className="absolute bottom-0 left-0 w-40 h-40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at bottom left, ${cfg.glow}, transparent 70%)` }} />

            {/* Big watermark number */}
            <div
                className="absolute -bottom-2 -right-1 font-black font-heading leading-none select-none pointer-events-none text-[110px]"
                style={{ color: `${cfg.accent}08` }}
            >
                {String(index + 1).padStart(2, "0")}
            </div>

            {/* Card content */}
            <div className="relative z-10 flex flex-col justify-between flex-1 p-8 md:p-10">

                {/* Top section */}
                <div className="flex-1">
                    {/* Label + index */}
                    <div className="inline-flex items-center gap-2 mb-6">
                        <div className="h-[2px] w-5 rounded-full" style={{ background: cfg.accent }} />
                        <span className="font-mono text-[10px] tracking-[0.25em] uppercase font-bold"
                            style={{ color: cfg.accent }}>
                            {cfg.label} · [{String(index + 1).padStart(2, "0")}]
                        </span>
                    </div>

                    {/* Icon */}
                    <div className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-7"
                        style={{ background: cfg.glow, border: `1px solid ${cfg.accent}30` }}>
                        <Icon size={24} style={{ color: cfg.accent }} />
                        <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full animate-pulse"
                            style={{ background: cfg.accent, boxShadow: `0 0 8px ${cfg.accent}` }} />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-black font-heading uppercase tracking-tight leading-tight text-white mb-4 group-hover:text-opacity-90 transition-all">
                        {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 text-sm md:text-[15px] leading-relaxed">
                        {service.description}
                    </p>
                </div>

                {/* Bottom section: tags + arrow */}
                <div className="mt-8 flex items-end justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        {cfg.tags.map((tag, i) => (
                            <span key={i}
                                className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-full"
                                style={{
                                    color: `${cfg.accent}cc`,
                                    border: `1px solid ${cfg.accent}22`,
                                    background: cfg.glow,
                                }}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Animated arrow on hover */}
                    <motion.div
                        whileHover={{ x: 3, y: -3 }}
                        className="flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        style={{ borderColor: `${cfg.accent}40`, color: cfg.accent }}
                    >
                        <ArrowUpRight size={16} />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(headerRef, { once: true, amount: 0.3 });

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const glowY1 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
    const glowY2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative w-full py-28 md:py-40 bg-black text-white overflow-hidden"
        >
            {/* Subtle grid bg */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.016)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.016)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Parallax ambient glows */}
            <motion.div style={{ y: glowY1 }}
                className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />
            <motion.div style={{ y: glowY2 }}
                className="absolute -bottom-40 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none" />

            {/* Top hairline */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">

                {/* ── Header ── */}
                <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">

                    {/* Left: Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                            </span>
                            <span className="text-orange-500 font-mono text-[11px] tracking-[0.3em] uppercase">What I Build</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-heading tracking-tighter uppercase leading-[0.88]">
                            My<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-300 to-amber-400">
                                Services
                            </span>
                        </h2>
                    </motion.div>

                    {/* Right: description + stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-6 md:items-end"
                    >
                        <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xs md:text-right">
                            Precision-crafted digital experiences that convert visitors into loyal clients.
                        </p>
                        <div className="flex items-center gap-5">
                            {[["10+", "Projects"], ["4", "Services"], ["2+", "Years"]].map(([num, label]) => (
                                <div key={label} className="text-center">
                                    <div className="text-2xl md:text-3xl font-black font-heading text-white">{num}</div>
                                    <div className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider">{label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ── Cards — uniform 2-col grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    {portfolioData.services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>

                {/* ── Bottom CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-5 pt-8 border-t border-white/[0.06]"
                >
                    <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">
                        Every project is custom — no templates, no shortcuts.
                    </p>
                    <a
                        href="#contact"
                        className="group inline-flex items-center gap-2 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-bold text-sm px-7 py-3 transition-all duration-300 hover:shadow-[0_0_28px_rgba(255,107,53,0.4)] active:scale-95"
                    >
                        Start a Project
                        <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </a>
                </motion.div>
            </div>

            {/* Bottom hairline */}
            <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </section>
    );
}
