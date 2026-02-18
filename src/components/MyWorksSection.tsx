"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WorkModal from "./WorkModal";
import Image from "next/image";

import { portfolioData } from "@/data/portfolio";

// Use remaining projects for this section (e.g., id 5 onwards)
const works = portfolioData.projects.slice(4).map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    image: p.image,
    description: p.description,
    stack: ["React", "Tailwind"], // Default or add to data if available
    link: p.link,
    // github: p.github, // Add if available
}));

export default function MyWorksSection() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const selectedWork = works.find(w => w.id === selectedId);

    return (
        <section className="min-h-screen w-full bg-transparent py-32 px-4">
            <div className="container mx-auto">
                <h2 className="mb-24 text-center text-4xl font-bold tracking-tighter text-white sm:text-6xl">
                    Selected Works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {works.map((work) => (
                        <motion.div
                            layoutId={`work-card-${work.id}`}
                            key={work.id}
                            onClick={() => setSelectedId(work.id)}
                            className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800"
                            whileHover={{ scale: 1.02 }}
                        >
                            <motion.div layoutId={`work-image-${work.id}`} className="h-full w-full relative">
                                <Image
                                    src={work.image}
                                    alt={work.title}
                                    fill
                                    className="object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-500" />
                            </motion.div>

                            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent">
                                <span className="text-cyan-400 text-sm font-bold uppercase tracking-wider mb-2 block">
                                    {work.category}
                                </span>
                                <h3 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                    {work.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedId && selectedWork && (
                        <WorkModal work={selectedWork} onClose={() => setSelectedId(null)} />
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}
