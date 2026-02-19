"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const touchCheck = window.matchMedia("(pointer: coarse)");
        setIsTouchDevice(touchCheck.matches);
        if (touchCheck.matches) return;

        const cursor = cursorRef.current;
        const path = pathRef.current;
        if (!cursor || !path) return;

        // Create and inject global style to HIDE normal cursor everywhere
        const style = document.createElement('style');
        style.innerHTML = `
            * { cursor: none !important; }
            a, button, [role='button'], .project-card { cursor: none !important; }
        `;
        document.head.appendChild(style);

        // Setup direct quickSetters for absolute zero latency (mimics OS cursor)
        const xSetter = gsap.quickSetter(cursor, "x", "px");
        const ySetter = gsap.quickSetter(cursor, "y", "px");

        // Initial state
        gsap.set(cursor, {
            opacity: 0,
            xPercent: -23, // Tip alignment: 5.5 / 24
            yPercent: -13, // Tip alignment: 3.21 / 24
            force3D: true
        });

        const onMouseMove = (e: MouseEvent) => {
            // Direct set with zero lag - no duration, no tweening
            xSetter(e.clientX);
            ySetter(e.clientY);
            if (cursor.style.opacity === "0") {
                gsap.set(cursor, { opacity: 1 });
            }
        };

        const onMouseEnterLink = () => {
            gsap.to(cursor, {
                scale: 1.25,
                duration: 0.15, // Snappy transition for interaction
                ease: "power2.out"
            });
            gsap.to(path, {
                fill: "#FFF",
                stroke: "#f97316",
                strokeWidth: 1.5,
                duration: 0.15
            });
        };

        const onMouseLeaveLink = () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.15,
                ease: "power2.out"
            });
            gsap.to(path, {
                fill: "#f97316",
                stroke: "#FFF",
                strokeWidth: 1,
                duration: 0.15
            });
        };

        const onMouseDown = () => {
            gsap.to(cursor, { scale: 0.9, duration: 0.05 });
        };

        const onMouseUp = () => {
            gsap.to(cursor, { scale: 1, duration: 0.1 });
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);

        const refreshInteractivity = () => {
            const elements = document.querySelectorAll("a, button, [role='button'], .project-card");
            elements.forEach((el) => {
                el.addEventListener("mouseenter", onMouseEnterLink);
                el.addEventListener("mouseleave", onMouseLeaveLink);
            });
        };

        refreshInteractivity();
        const observer = new MutationObserver(refreshInteractivity);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            observer.disconnect();
        };
    }, []);

    if (isTouchDevice) return null;

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[99999] w-12 h-12 flex items-start justify-start opacity-0"
        >
            <svg
                viewBox="0 0 24 24"
                className="w-full h-full drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    ref={pathRef}
                    d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z"
                    fill="#f97316"
                    stroke="#FFF"
                    strokeWidth="1"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}
