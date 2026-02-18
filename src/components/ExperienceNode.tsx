"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ExperienceNodeProps {
    title: string;
    company: string;
    description: string;
    date: string;
    align: "left" | "right";
}

export default function ExperienceNode({ title, company, description, date, align }: ExperienceNodeProps) {
    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = nodeRef.current;
        if (!el) return;

        gsap.fromTo(
            el,
            { opacity: 0, scale: 0.8, y: 50 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, []);

    return (
        <div
            ref={nodeRef}
            className={`relative mb-24 flex w-full items-center justify-between ${align === "left" ? "flex-row" : "flex-row-reverse"
                }`}
        >
            {/* Content Side */}
            <div className="w-[40%]">
                <div className={`flex flex-col ${align === "left" ? "items-end text-right" : "items-start text-left"}`}>
                    <h3 className="text-3xl font-bold text-white font-heading">{title}</h3>
                    <p className="text-xl text-orange-400 font-sans font-medium">{company}</p>
                    <span className="text-sm text-zinc-400 mb-2 font-mono">{date}</span>
                    <p className="text-zinc-300 font-sans font-medium leading-relaxed">{description}</p>
                </div>
            </div>

            {/* Center Node (Visual anchor on the timeline) */}
            <div className="absolute left-1/2 -translate-x-1/2 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8)]">
                <div className="h-full w-full rounded-full bg-white animate-ping opacity-20" />
            </div>

            {/* Empty Side for balance */}
            <div className="w-[40%]" />
        </div>
    );
}
