"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import WorkModal from "./WorkModal";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";

const works = portfolioData.projects.slice(4).map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    image: p.image,
    description: p.description,
    stack: ["React", "Tailwind"],
    link: p.link,
}));

export default function MyWorksSection() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
    const selectedWork = works.find((w) => w.id === selectedId);

    return (
        <section
            id="more-work"
            ref={sectionRef}
            className="relative w-full bg-black py-24 overflow-hidden"
        >
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:50px_50px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

            {/* Orange glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Top hairline */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/25 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                            </span>
                            <span className="text-orange-500 font-mono text-[11px] tracking-[0.3em] uppercase">Selected Works</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black font-heading tracking-tighter uppercase leading-none">
                            More Projects
                        </h2>
                    </div>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-[260px] md:text-right">
                        A further selection of client and personal work across domains.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {works.map((work, index) => (
                        <motion.div
                            layoutId={`work-card-${work.id}`}
                            key={work.id}
                            onClick={() => setSelectedId(work.id)}
                            initial={{ opacity: 0, y: 36 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 + index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl bg-zinc-950 border border-white/8 hover:border-orange-500/30 transition-colors duration-500"
                        >
                            <motion.div layoutId={`work-image-${work.id}`} className="h-full w-full relative">
                                <Image
                                    src={work.image}
                                    alt={work.title}
                                    fill
                                    className="object-cover transition-all duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
                            </motion.div>

                            {/* Card info */}
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                <span className="text-orange-500 text-[10px] font-mono uppercase tracking-[0.3em] mb-1 block">
                                    {work.category}
                                </span>
                                <h3 className="text-xl font-black font-heading uppercase tracking-tight text-white">
                                    {work.title}
                                </h3>
                            </div>

                            {/* Corner hover glow */}
                            <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: "radial-gradient(circle at top right,rgba(255,107,53,0.15),transparent 70%)" }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedId && selectedWork && (
                    <WorkModal work={selectedWork} onClose={() => setSelectedId(null)} />
                )}
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </section>
    );
}
