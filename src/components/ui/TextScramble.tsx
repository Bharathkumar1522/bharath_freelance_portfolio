"use client";

import { useState, useEffect } from "react";

interface ScrambleTextProps {
    text: string;
    className?: string;
    trigger?: boolean;
    speed?: number;
}

export function ScrambleText({ text, className, trigger = true, speed = 30 }: ScrambleTextProps) {
    const [display, setDisplay] = useState("");

    // Reset/Clear if trigger is false (or keep blank)
    useEffect(() => {
        if (!trigger) {
            setDisplay("");
            return;
        }

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let iteration = 0;

        const interval = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 2; // Resolve slower for drama
        }, speed);

        return () => clearInterval(interval);
    }, [text, trigger, speed]);

    return <span className={className}>{display}</span>;
}
