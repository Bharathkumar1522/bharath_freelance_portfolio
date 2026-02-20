"use client";

import { motion } from "framer-motion";

interface ExperienceNodeProps {
    title: string;
    company: string;
    description: string;
    date: string;
    align: "left" | "right";
    index?: number;
}

export default function ExperienceNode({ title, company, description, date, align, index = 0 }: ExperienceNodeProps) {
    const isLeft = align === "left";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.18,
                delayChildren: 0.05,
            },
        },
    };

    const dotVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { type: "spring" as const, stiffness: 260, damping: 18 },
        },
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 30 }, // vertical-only — avoids horizontal clipping on mobile
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: false,   // ← replays every time section enters view
                amount: 0.25,  // ← triggers when 25% of element is visible (reliable on mobile)
            }}
            variants={containerVariants}
            className={`relative mb-16 md:mb-24 flex w-full flex-col md:flex-row items-start md:items-center justify-between ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
        >
            {/* Orange pulse node on the spine */}
            <motion.div
                variants={dotVariants}
                className="absolute left-[1.1rem] md:left-1/2 md:-translate-x-1/2 top-0 md:top-auto flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8)] z-20"
            >
                <div className="h-full w-full rounded-full bg-white animate-ping opacity-20" />
            </motion.div>

            {/* Content */}
            <motion.div
                variants={contentVariants}
                className={`w-full md:w-[40%] pl-12 md:pl-0 ${isLeft ? "md:text-right md:items-end" : "md:text-left md:items-start"}`}
            >
                <div className={`flex flex-col items-start ${isLeft ? "md:items-end" : "md:items-start"}`}>
                    <h3 className="text-2xl md:text-3xl font-bold text-white font-heading">{title}</h3>
                    <p className="text-lg md:text-xl text-orange-400 font-sans font-medium">{company}</p>
                    <span className="text-xs md:text-sm text-zinc-400 mb-2 font-mono">{date}</span>
                    <p className="text-zinc-300 font-sans text-sm md:text-base font-medium leading-relaxed">{description}</p>
                </div>
            </motion.div>

            {/* Empty side for balance on desktop */}
            <div className="hidden md:block w-[40%]" />
        </motion.div>
    );
}
