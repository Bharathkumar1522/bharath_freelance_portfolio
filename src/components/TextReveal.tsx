"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function TextReveal({
    children,
    className = "",
    delay = 0,
}: {
    children: string;
    className?: string;
    delay?: number;
}) {
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const text = textRef.current;
        if (!text) return;

        // Split text logic manually to avoid external dependency (SplitType)
        const chars = children.split("");
        text.innerHTML = "";
        chars.forEach((char) => {
            const span = document.createElement("span");
            span.innerText = char;
            span.style.display = "inline-block";
            span.style.opacity = "0";
            span.style.transform = "translateY(100px) rotate(10deg)";
            text.appendChild(span);
        });

        const spans = text.querySelectorAll("span");

        gsap.to(spans, {
            y: 0,
            rotate: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.05,
            ease: "power4.out",
            delay: delay,
            scrollTrigger: {
                trigger: text,
                start: "top 80%",
            }
        });
    }, [children, delay]);

    return (
        <h1 ref={textRef} className={`overflow-hidden ${className}`}>
            {children}
        </h1>
    );
}
