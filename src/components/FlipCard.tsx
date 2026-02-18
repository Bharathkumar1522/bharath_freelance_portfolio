"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FlipCardProps {
    degree: string;
    institution: string;
    year: string;
    description: string;
    courses: string[];
}

export default function FlipCard({ degree, institution, year, description, courses }: FlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    function handleFlip() {
        if (!isAnimating) {
            setIsFlipped(!isFlipped);
            setIsAnimating(true);
        }
    }

    return (
        <div
            className="h-[300px] w-full cursor-pointer perspective-1000"
            onClick={handleFlip}
            onMouseEnter={() => !isFlipped && setIsFlipped(true)}
            onMouseLeave={() => isFlipped && setIsFlipped(false)}
        >
            <motion.div
                className="relative h-full w-full preserve-3d"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                onAnimationComplete={() => setIsAnimating(false)}
                style={{ transformStyle: "preserve-3d" }} // Explicit inline style for safety
            >
                {/* Front Face */}
                <div className="absolute h-full w-full backface-hidden rounded-xl border border-cyan-500/20 bg-zinc-900/80 p-6 shadow-xl backdrop-blur-sm flex flex-col justify-between">
                    <div>
                        <div className="mb-2 text-sm font-bold text-cyan-400 uppercase tracking-widest">{year}</div>
                        <h3 className="text-2xl font-bold text-white mb-1">{degree}</h3>
                        <p className="text-zinc-400">{institution}</p>
                    </div>
                    <div className="self-end">
                        <div className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400">
                            Hover to reveal
                        </div>
                    </div>
                </div>

                {/* Back Face */}
                <div
                    className="absolute h-full w-full backface-hidden rounded-xl border border-purple-500/20 bg-zinc-800/90 p-6 shadow-xl backdrop-blur-sm [transform:rotateY(180deg)] flex flex-col justify-start"
                    style={{ transform: "rotateY(180deg)" }}
                >
                    <p className="text-sm text-zinc-300 mb-4 leading-relaxed">
                        {description}
                    </p>
                    <div>
                        <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block mb-2">Key Focus</span>
                        <div className="flex flex-wrap gap-2">
                            {courses.map((course, i) => (
                                <span key={i} className="rounded-md bg-purple-500/10 px-2 py-1 text-xs text-purple-300 border border-purple-500/20">
                                    {course}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
