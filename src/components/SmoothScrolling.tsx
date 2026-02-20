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
    // Initialize Lenis with lighter, responsive feel
    const lenisInstance = new Lenis({
      duration: 1.3, // Reduced from 1.7 for less "float", more "butter"
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2.5, // Further increased for responsiveness
      wheelMultiplier: 0.9, // Slightly faster precise scrolling
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

    // Store current GSAP lagSmoothing to restore later (best effort, as getter support varies)
    // 500ms/33ms are GSAP defaults if we can't retrieve current
    const previousLag = (gsap.ticker.lagSmoothing as any)() || false;

    // Disable GSAP lag smoothing to prevent visual stuttering during heavy frames
    // This is critical for keeping scroll and animation in sync with Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);

      // Restore previous lag smoothing state or default
      if (previousLag) {
        (gsap.ticker.lagSmoothing as any)(previousLag);
      } else {
        gsap.ticker.lagSmoothing(500, 33);
      }

      lenisInstance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
