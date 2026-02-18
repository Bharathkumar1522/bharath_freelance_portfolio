"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export default function SmoothScrolling({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with heavier, fluid feel
    const lenisInstance = new Lenis({
      duration: 2.5, // Super heavy/tight
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      wheelMultiplier: 0.3, // Very slow/cinematic
    });

    setLenis(lenisInstance);

    // Synchronize Lenis scroll event with GSAP ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    // Add Lenis's RAF to GSAP's ticker for perfect synchronization
    // The time argument from GSAP is in seconds, Lenis needs ms
    const update = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(update);

    // Disable GSAP lag smoothing to prevent visual stuttering during heavy frames
    // This is critical for keeping scroll and animation in sync
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenisInstance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
