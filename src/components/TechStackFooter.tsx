"use client";

import { motion } from "framer-motion";

const techs = [
    "GIT", "VERCEL", "REACT", "TAILWIND", "FRAMER MOTION", "GSAP", "PYTHON",
    "NEXT.JS", "TYPESCRIPT", "THREE.JS", "FIGMA"
];

export default function TechStackFooter() {
    return (
        <section className="relative w-full overflow-hidden py-24 select-none">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex gap-20"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 40,
                    }}
                >
                    {[...techs, ...techs, ...techs, ...techs].map((tech, i) => (
                        <div key={i} className="flex items-center gap-8 group">
                            <span className="text-7xl md:text-9xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 stroke-text tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity duration-500" style={{ filter: "drop-shadow(0 0 10px rgba(255,165,0,0.3))" }}>
                                {tech}
                            </span>
                            <span className="text-orange-500 text-4xl animate-pulse">●</span>
                        </div>
                    ))}
                </motion.div>
                <motion.div
                    className="flex gap-20 absolute top-24 left-[101%]" // Match top padding+gap
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 40,
                    }}
                >
                    {[...techs, ...techs, ...techs, ...techs].map((tech, i) => (
                        <div key={i} className="flex items-center gap-8 group">
                            <span className="text-7xl md:text-9xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 stroke-text tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity duration-500" style={{ filter: "drop-shadow(0 0 10px rgba(255,165,0,0.3))" }}>
                                {tech}
                            </span>
                            <span className="text-orange-500 text-4xl animate-pulse">●</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            <style jsx global>{`
                .stroke-text {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25);
                }
            `}</style>
        </section>
    );
}
