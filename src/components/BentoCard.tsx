"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent } from "react";

export default function BentoCard({
    children,
    className = "",
    title,
    description,
    variant = "default",
}: {
    children?: React.ReactNode;
    className?: string;
    title: string;
    description: string;
    variant?: "default" | "blob" | "pixel";
}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-800/20 backdrop-blur-md transition-colors hover:bg-zinc-800/30 hover:border-white/20 ${className}`}
        >
            <div
                style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
                className="absolute inset-0 grid place-content-center opacity-30"
            >
                {variant === "blob" && <div className="h-64 w-64 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 blur-[80px] animate-pulse" />}
                {variant === "pixel" && <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />}
            </div>

            <div
                style={{ transform: "translateZ(50px)" }}
                className="relative z-10 flex h-full flex-col justify-end"
            >
                <div className="mb-2 text-3xl font-bold tracking-tight text-white font-heading">{title}</div>
                <div className="text-sm font-medium text-zinc-300 font-sans">{description}</div>
                {children}
            </div>
        </motion.div>
    );
}
