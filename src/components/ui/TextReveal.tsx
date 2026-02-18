"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
    duration?: number;
}

export default function TextReveal({
    children,
    className = "",
    delay = 0,
    duration = 0.5,
}: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.03, // Faster stagger for premium feel
                delayChildren: delay,
            },
        },
    };

    const childVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(4px)",
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: duration,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.h1
            ref={ref}
            className={`flex flex-wrap ${className}`} // flex-wrap to handle words wrapping
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
        >
            {children.split(" ").map((word, i) => (
                <span key={i} className="inline-block whitespace-nowrap mr-[0.25em]">
                    {word.split("").map((char, j) => (
                        <motion.span
                            key={`${i}-${j}`}
                            className="inline-block"
                            variants={childVariants}
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.h1>
    );
}
