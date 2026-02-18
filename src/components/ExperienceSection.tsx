"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExperienceNode from "./ExperienceNode";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

import { portfolioData } from "@/data/portfolio";

const milestones = portfolioData.experience.map((exp, index) => ({
    title: exp.role,
    company: exp.company,
    date: exp.duration,
    description: exp.description,
}));

export default function ExperienceSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const line = lineRef.current;

        if (!container || !line) return;

        // Animate scaleY linked to scroll
        gsap.to(line, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top 60%", // Start drawing when section is somewhat visible
                end: "bottom 80%", // Finish drawing near the bottom
                scrub: 1, // Smooth scrubbing linked to scroll speed
            },
            transformOrigin: "top", // Ensure it grows from top to bottom
        });

    }, []);

    return (
        <section ref={containerRef} className="relative min-h-[150vh] w-full bg-transparent py-24 overflow-hidden">
            {/* Ambient Glows */}
            <div className="absolute top-1/4 left-0 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

            <h2 className="mb-24 text-center text-4xl font-bold tracking-tighter text-white sm:text-6xl">
                Journey & Milestones
            </h2>

            <div className="container mx-auto relative px-4">

                {/* Timeline Line */}
                <div className="absolute left-1/2 top-32 bottom-0 w-[2px] -translate-x-1/2 bg-zinc-800">
                    {/* Animated Fill */}
                    <div ref={lineRef} className="absolute top-0 left-0 w-full bg-gradient-to-b from-orange-500 to-amber-500 h-full scale-y-0 origin-top" />
                </div>

                {/* Milestones */}
                <div className="relative z-10 flex flex-col space-y-32 pt-10">
                    {milestones.map((item, index) => (
                        <ExperienceNode
                            key={index}
                            {...item}
                            align={index % 2 === 0 ? "left" : "right"}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
