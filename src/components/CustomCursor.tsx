"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor({
    size = 20,
}: {
    size?: number;
}) {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;

        // Initial hide
        gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });

        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            // Animate with overwrite to prevent stacking
            gsap.to(cursor, {
                x: clientX,
                y: clientY,
                opacity: 1,
                duration: 0.15, // Slightly smoother
                ease: "power2.out",
                overwrite: "auto", // Critical for performance
            });
        };

        const onMouseLeave = () => {
            gsap.to(cursor, { opacity: 0, duration: 0.2, overwrite: "auto" });
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseleave", onMouseLeave);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseleave", onMouseLeave);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: "white",
                    borderRadius: "50%",
                }}
            />
        </>
    );
}
