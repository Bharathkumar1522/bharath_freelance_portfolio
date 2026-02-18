"use client";

import { motion } from "framer-motion";
import {
    SiOpenai,
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiTypescript,
    SiFramer,
    SiGreensock,
    SiFigma,
    SiPython,
    SiVercel,
    SiGit,
    SiGoogle
} from "react-icons/si";
import { Sparkles } from "lucide-react"; // Fallback for Gemini if SiGooglegemini is tricky

const logos = [
    {
        name: "OpenAI",
        color: "#10A37F",
        Component: SiOpenai,
    },
    {
        name: "React",
        color: "#61DAFB",
        Component: SiReact,
    },
    {
        name: "Tailwind CSS",
        color: "#38B2AC",
        Component: SiTailwindcss,
    },
    {
        name: "Next.js",
        color: "#FFFFFF",
        Component: SiNextdotjs,
    },
    {
        name: "TypeScript",
        color: "#3178C6",
        Component: SiTypescript,
    },
    {
        name: "Framer Motion",
        color: "#0055FF",
        Component: SiFramer,
    },
    {
        name: "GSAP",
        color: "#88CE02",
        Component: SiGreensock,
    },
    {
        name: "Python",
        color: "#3776AB",
        Component: SiPython,
    },
    {
        name: "Vercel",
        color: "#FFFFFF",
        Component: SiVercel,
    },
    {
        name: "Figma",
        color: "#F24E1E",
        Component: SiFigma,
    },
    {
        name: "Git",
        color: "#F05032",
        Component: SiGit,
    },
    {
        name: "Gemini",
        color: "#4E8CF7",
        Component: Sparkles, // Using Sparkles as a safe semantic proxy for "GenAI/Magic"
    }
];

export default function TechStackMarquee() {
    return (
        <section className="w-full py-0 flex flex-col items-center justify-center overflow-hidden bg-transparent select-none border-t border-white/5 relative">

            {/* Cosmic Orange Glow Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-50" />

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-orange-500/5 blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 pt-10 text-center relative z-20">
                <p className="text-zinc-500 text-xs font-mono uppercase tracking-[0.2em]">
                    Powering Next-Gen Experiences With
                </p>
            </div>

            {/* Marquee Container */}
            <div className="flex w-full overflow-hidden mask-gradient py-12 relative z-10">
                <motion.div
                    className="flex gap-20 md:gap-32 pr-20 md:pr-32"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 40,
                    }}
                    style={{
                        width: "fit-content",
                    }}
                >
                    {/* Double the array for seamless loop */}
                    {[...logos, ...logos, ...logos].map((logo, i) => (
                        <div
                            key={i}
                            className="group relative flex items-center justify-center cursor-pointer"
                        >
                            {/* Icon Component */}
                            <logo.Component
                                className="w-12 h-12 md:w-16 md:h-16 text-zinc-600 transition-all duration-500 group-hover:text-[var(--hover-color)] group-hover:drop-shadow-[0_0_20px_var(--hover-color)] group-hover:scale-110"
                                style={{ "--hover-color": logo.color } as React.CSSProperties}
                            />

                            {/* Label on Hover */}
                            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity text-white whitespace-nowrap pointer-events-none bg-zinc-950/80 px-2 py-1 rounded border border-white/10 backdrop-blur-sm">
                                {logo.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            <style jsx global>{`
                .mask-gradient {
                    mask-image: linear-gradient(
                        to right,
                        transparent,
                        black 15%,
                        black 85%,
                        transparent
                    );
                    -webkit-mask-image: linear-gradient(
                        to right,
                        transparent,
                        black 15%,
                        black 85%,
                        transparent
                    );
                }
            `}</style>
        </section>
    );
}
