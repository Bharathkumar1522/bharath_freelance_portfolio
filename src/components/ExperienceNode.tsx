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
            className={`relative mb-16 md:mb-24 flex w-full flex-col md:flex-row items-start md:items-center justify-between ${align === "left" ? "md:flex-row" : "md:flex-row-reverse"}`}
        >
            {/* Center Node (Visual anchor) */}
            {/* Mobile: Left aligned at 19px (half of 40px grid or similar). Desktop: Center */}
            <div className="absolute left-[1.1rem] md:left-1/2 md:-translate-x-1/2 top-0 md:top-auto flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8)] z-20">
                <div className="h-full w-full rounded-full bg-white animate-ping opacity-20" />
            </div>

            {/* Content Side */}
            <div className={`w-full md:w-[40%] pl-12 md:pl-0 ${align === "left" ? "md:text-right md:items-end" : "md:text-left md:items-start"}`}>
                <div className={`flex flex-col items-start ${align === "left" ? "md:items-end" : "md:items-start"}`}>
                    <h3 className="text-2xl md:text-3xl font-bold text-white font-heading">{title}</h3>
                    <p className="text-lg md:text-xl text-orange-400 font-sans font-medium">{company}</p>
                    <span className="text-xs md:text-sm text-zinc-400 mb-2 font-mono">{date}</span>
                    <p className="text-zinc-300 font-sans text-sm md:text-base font-medium leading-relaxed">{description}</p>
                </div>
            </div>

            {/* Empty Side for balance on Desktop */}
            <div className="hidden md:block w-[40%]" />
        </div>
    );
}
