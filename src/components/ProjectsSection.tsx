"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const projects = portfolioData.projects.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    description: p.description,
    year: p.year,
    image: p.image,
    link: p.link,
}));

function ProjectCard({
    project,
    index,
    range,
    targetScale,
    progress,
}: {
    project: (typeof projects)[0];
    index: number;
    range: [number, number];
    targetScale: number;
    progress: MotionValue<number>;
}) {
    const container = useRef(null);

    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div
            ref={container}
            className="h-screen flex items-center justify-center sticky top-0"
        >
            <motion.div
                style={{
                    scale,
                    top: `calc(2vh + ${index * 20}px)`,
                }}
                className="relative flex flex-col md:flex-row w-full max-w-7xl h-[75vh] md:h-[650px] bg-[#121212] border border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] backdrop-blur-md origin-top"
            >
                {/* Left Content */}
                <div className="flex flex-col justify-between p-8 md:p-12 md:w-2/5 h-full relative z-20">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 text-xs font-mono border border-orange-500/30 text-orange-400 rounded-full bg-orange-500/10 uppercase tracking-widest">
                                {project.category}
                            </span>
                            <span className="text-zinc-500 text-xs font-mono">{project.year}</span>
                        </div>

                        <h3 className="text-4xl md:text-5xl font-black font-heading text-white mb-6 uppercase tracking-tight leading-[0.9]">
                            {project.title}
                        </h3>

                        <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-sans max-w-md">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mt-8 md:mt-0">
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold font-heading uppercase tracking-wider hover:bg-orange-500 hover:text-white transition-all duration-300"
                        >
                            <span>Visit Site</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative w-full md:w-3/5 h-full overflow-hidden bg-zinc-900 group">
                    {/* Removed heavy gradient to improve image visibility */}
                    {/* <div className="absolute inset-0 bg-gradient-to-l from-transparent to-zinc-900/90 z-10" /> */}

                    <motion.div
                        className="w-full h-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image
                            fill
                            src={project.image}
                            alt={project.title}
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 60vw"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default function ProjectsSection() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    return (
        <section id="work" className="relative w-full bg-black pt-32 pb-24 z-10 rounded-t-[2rem] md:rounded-t-[3rem] mt-0 md:mt-[-100vh]">
            {/* Event Horizon Transition */}
            <div className="absolute top-0 left-0 w-full transform -translate-y-[98%] overflow-hidden pointer-events-none z-20">
                <div className="relative w-full h-[10vh] md:h-[25vh]">
                    <svg className="absolute bottom-0 w-full h-full fill-black drop-shadow-[0_-20px_40px_rgba(255,107,53,0.4)]" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path d="M0,320 L1440,320 L1440,160 C1000,320 440,320 0,160 Z" />
                    </svg>
                    {/* Horizon Glow Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-[10px] bg-orange-500/0 blur-xl md:blur-2xl" />
                </div>
            </div>

            {/* Deep Space Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-black to-black pointer-events-none z-0" />

            <div className="container mx-auto px-4 mb-24 text-center relative z-10">
                <h2 className="text-[12vw] md:text-8xl font-black font-heading text-white/5 uppercase tracking-tighter select-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
                    Projects
                </h2>
                <h2 className="text-4xl md:text-6xl font-black font-heading text-white uppercase tracking-tighter relative z-10">
                    Featured Work
                </h2>
                <p className="text-zinc-400 font-mono tracking-widest uppercase text-xs md:text-sm mt-4 relative z-10">
                    Selected Freelance & Production
                </p>
            </div>

            <div ref={container} className="w-full px-4 md:px-0 relative z-10 flex flex-col gap-0 items-center">
                {projects.map((project, i) => {
                    // Gradual scaling: last card shouldn't scale, previous cards scale down slightly more
                    const targetScale = 1 - (projects.length - 1 - i) * 0.05;
                    return (
                        <ProjectCard
                            key={project.id}
                            index={i}
                            project={project}
                            range={[i * 0.15, 1]}
                            targetScale={targetScale}
                            progress={scrollYProgress}
                        />
                    );
                })}
            </div>

            {/* Bottom Fade Transition */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
        </section>
    );
}
