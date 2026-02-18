"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import { useLenis } from "./SmoothScrolling";
import MagneticButton from "./MagneticButton";
import Image from "next/image";

interface Work {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    stack: string[];
    link?: string;
    github?: string;
}

interface WorkModalProps {
    work: Work;
    onClose: () => void;
}

export default function WorkModal({ work, onClose }: WorkModalProps) {
    const lenis = useLenis();

    useEffect(() => {
        if (lenis) {
            lenis.stop();
        }

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);

        return () => {
            if (lenis) {
                lenis.start();
            }
            window.removeEventListener("keydown", handleEsc);
        };
    }, [lenis, onClose]);

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 pointer-events-none">
                <motion.div
                    layoutId={`work-card-${work.id}`}
                    className="relative w-full max-w-5xl h-[85vh] overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 pointer-events-auto flex flex-col md:flex-row shadow-2xl"
                >
                    <button
                        onClick={onClose}
                        className="absolute right-6 top-6 z-20 rounded-full bg-black/50 p-2 text-white hover:bg-white/20 transition-colors"
                    >
                        <X size={24} />
                    </button>

                    {/* Image Section */}
                    <motion.div
                        layoutId={`work-image-${work.id}`}
                        className="relative h-1/2 w-full md:h-full md:w-3/5"
                    >
                        <Image
                            src={work.image}
                            alt={work.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 md:bg-gradient-to-r md:from-transparent md:to-zinc-900" />
                    </motion.div>

                    {/* Content Section */}
                    <div className="flex h-1/2 w-full flex-col p-8 md:h-full md:w-2/5 md:p-12 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="text-sm font-bold uppercase tracking-widest text-cyan-400 mb-2 block">
                                {work.category}
                            </span>
                            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                                {work.title}
                            </h2>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {work.stack.map((tech) => (
                                    <span key={tech} className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300 border border-zinc-700">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                                {work.description}
                            </p>

                            <div className="mt-auto flex gap-4">
                                {work.link && (
                                    <MagneticButton variant="primary" className="flex-1 py-4 font-bold justify-center">
                                        Live Demo <ExternalLink size={18} className="ml-2 inline" />
                                    </MagneticButton>
                                )}
                                {work.github && (
                                    <MagneticButton variant="secondary" className="flex-1 py-4 font-bold justify-center">
                                        Source <Github size={18} className="ml-2 inline" />
                                    </MagneticButton>
                                )}
                            </div>
                        </motion.div>
                    </div>

                </motion.div>
            </div>
        </>
    );
}
