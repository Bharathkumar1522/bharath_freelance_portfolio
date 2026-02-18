"use client";

import { motion } from "framer-motion";
import {
    Code2,
    Cpu,
    Globe,
    Zap,
    Layout,
    FileType,
    Box,
    Terminal,
    Smartphone,
    CheckCircle2,
    Search
} from "lucide-react";

const stack = [
    { name: "React", icon: <Code2 size={40} />, color: "#61DAFB" },
    { name: "Next.js", icon: <Cpu size={40} />, color: "#FFFFFF" },
    { name: "Tailwind", icon: <Layout size={40} />, color: "#38B2AC" },
    { name: "TypeScript", icon: <FileType size={40} />, color: "#3178C6" },
    { name: "Framer", icon: <Zap size={40} />, color: "#0055FF" },
    { name: "Three.js", icon: <Box size={40} />, color: "#FFFFFF" },
    { name: "GSAP", icon: <Terminal size={40} />, color: "#88CE02" },
    { name: "Figma", icon: <Smartphone size={40} />, color: "#F24E1E" },
];

const badges = [
    { text: "Pixel Perfect", icon: <CheckCircle2 size={16} />, color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10" },
    { text: "SEO Optimized", icon: <Search size={16} />, color: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/10" },
    { text: "100% Performance", icon: <Zap size={16} />, color: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10" },
    { text: "Clean Code", icon: <Code2 size={16} />, color: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/10" },
];

export default function TechStackLogos() {
    return (
        <section className="relative w-full h-[600px] overflow-hidden flex flex-col items-center justify-center py-20 select-none">

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 via-transparent to-transparent pointer-events-none" />

            {/* TRUST BADGES ROW */}
            <div className="flex flex-wrap justify-center gap-6 mb-16 relative z-10">
                {badges.map((badge, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border ${badge.border} ${badge.bg} backdrop-blur-md`}
                    >
                        <span className={badge.color}>{badge.icon}</span>
                        <span className={`text-sm font-bold tracking-wide uppercase ${badge.color}`}>{badge.text}</span>
                    </motion.div>
                ))}
            </div>

            {/* FLOATING LOGOS GRID */}
            <div className="relative w-full max-w-7xl mx-auto h-[300px]">
                {stack.map((item, i) => (
                    <motion.div
                        key={i}
                        className="absolute flex flex-col items-center gap-3 group cursor-pointer"
                        style={{
                            left: `${(i / stack.length) * 100}%`,
                            top: `${Math.random() * 60 + 20}%`, // Random spread
                        }}
                        animate={{
                            y: [0, -20, 0],
                            x: [0, Math.random() * 20 - 10, 0],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5,
                        }}
                        whileHover={{ scale: 1.2, zIndex: 50 }}
                    >
                        {/* Icon Container */}
                        <div className="relative p-5 rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-sm group-hover:border-white/30 group-hover:bg-zinc-800 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(255,165,0,0.2)]">
                            <div className="text-zinc-400 group-hover:text-white transition-colors duration-300">
                                {item.icon}
                            </div>
                        </div>

                        {/* Label */}
                        <span className="text-zinc-500 text-xs font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0">
                            {item.name}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
