"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExperienceNode from "./ExperienceNode";
import { portfolioData } from "@/data/portfolio";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Transform Data
// Transform Data
const journeyItems = [
    ...portfolioData.experience.map((exp) => ({
        type: "work",
        title: exp.role,
        subtitle: exp.company,
        date: exp.duration,
        description: exp.description,
    })),
    ...portfolioData.education.map((edu) => ({
        type: "edu",
        title: edu.degree,
        subtitle: edu.institution,
        date: edu.period,
        description: edu.description,
    }))
].map((item, index) => ({
    ...item,
    align: (index % 2 === 0 ? "left" : "right") as "left" | "right"
}));

export default function JourneySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const line = lineRef.current;

        if (!container || !line) return;

        gsap.to(line, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top 60%",
                end: "bottom 90%",
                scrub: 1,
            },
            transformOrigin: "top",
        });

    }, []);

    return (
        <section id="experience" ref={containerRef} className="relative min-h-screen w-full bg-transparent py-32 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative">
                <div className="text-center mb-32">
                    <h2 className="text-4xl md:text-7xl font-black font-heading text-white uppercase tracking-tighter mb-4">
                        My Journey
                    </h2>
                    <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase">
                        Experience & Education
                    </p>
                </div>

                {/* Central Spine */}
                <div className="absolute left-4 md:left-1/2 top-48 bottom-0 w-[2px] md:-translate-x-1/2 bg-white/5">
                    <div ref={lineRef} className="absolute top-0 left-0 w-full bg-gradient-to-b from-orange-500 via-amber-500 to-transparent h-full scale-y-0 origin-top" />
                </div>

                <div className="relative z-10 space-y-24">
                    {journeyItems.map((item, index) => (
                        <div key={index} className={`flex flex-col md:flex-row w-full ${item.align === 'right' ? 'md:flex-row-reverse' : ''} relative`}>

                            {/* Mobile Line Fix: On mobile, everything is left-aligned, line is on left. 
                                On Desktop, we use the central spine logic from ExperienceNode, 
                                but here we reconstruct the wrapper to ensure correct spacing.
                            */}

                            {/* Note: ExperienceNode has built-in layout logic. 
                                 Let's use it directly but monitor the 'align' prop. 
                             */}
                            <ExperienceNode
                                title={item.title}
                                company={item.subtitle}
                                date={item.date}
                                description={item.description}
                                align={item.align}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
