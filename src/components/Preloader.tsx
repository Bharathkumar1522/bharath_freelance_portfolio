"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { usePreloader } from "@/context/PreloaderContext";

const TERMINAL_LOGS = [
    "INITIALIZING KERNEL...",
    "LOADING ASSETS...",
    "DECRYPTING SECURE_DATA...",
    "ESTABLISHING UPLINK...",
    "CALIBRATING VIEWPORT...",
    "SYSTEM READY."
];

export default function Preloader() {
    const { setIsLoading } = usePreloader();
    const containerRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const [logIndex, setLogIndex] = useState(0);

    useEffect(() => {
        const tl = gsap.timeline();
        const counter = { value: 0 };

        // 1. Counter Animation 0 -> 100
        tl.to(counter, {
            value: 100,
            duration: 2.5,
            ease: "power2.inOut",
            onUpdate: () => {
                if (counterRef.current) {
                    counterRef.current.innerText = Math.floor(counter.value).toString().padStart(3, "0") + "%";
                }
            },
        });

        // 2. Terminal Logs (Sync with counter roughly)
        const logInterval = setInterval(() => {
            setLogIndex(prev => Math.min(prev + 1, TERMINAL_LOGS.length - 1));
        }, 400);

        // 3. Exit Sequence
        tl.to(containerRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "power2.inOut",
            delay: 0.5,
            onStart: () => {
                clearInterval(logInterval);
                setLogIndex(TERMINAL_LOGS.length - 1); // Ensure final log
            },
            onComplete: () => {
                setIsLoading(false); // Signal App to Start
                if (containerRef.current) {
                    containerRef.current.style.display = "none";
                }
            }
        });

        return () => clearInterval(logInterval);
    }, [setIsLoading]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white font-mono overflow-hidden"
        >
            {/* Center Counter */}
            <div className="relative z-10 flex flex-col items-center">
                <span ref={counterRef} className="text-[15vw] md:text-[10vw] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mix-blend-difference select-none">
                    000%
                </span>
                <div className="w-full h-[1px] bg-white/20 mt-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-orange-500 animate-progress-bar" />
                </div>
            </div>

            {/* Terminal Logs - Bottom Left */}
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex flex-col gap-1 items-start">
                {TERMINAL_LOGS.slice(0, logIndex + 1).slice(-4).map((log, idx) => (
                    <span key={idx} className="text-xs md:text-sm text-white/50 uppercase tracking-widest">
                        {">"} {log}
                    </span>
                ))}
                <span className="text-orange-500 animate-pulse">_</span>
            </div>

            {/* Background Grid/Noise (Optional) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[0] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
        </div>
    );
}
