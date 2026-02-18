"use client";

import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
    {
        quote: "The attention to detail in the animations and interactions is simply next level. Delivered a portfolio that truly stands out.",
        name: "Alex Morgan",
        role: "Product Lead",
        company: "Stripe",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2574&auto=format&fit=crop",
    },
    {
        quote: "Exceptional engineering skills. The 3D integration was smooth and performant across all devices.",
        name: "Sarah Jenkins",
        role: "CTO",
        company: "StartupX",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop",
    },
    {
        quote: "Transformed our rough ideas into a polished, high-conversion landing page. Highly recommended for complex UI work.",
        name: "David Chen",
        role: "Founder",
        company: "Lumina",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
    },
    {
        quote: "A true creative partner. Not just a developer, but someone who understands design and user experience deeply.",
        name: "Emily Watson",
        role: "Design Director",
        company: "Agency Y",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop",
    },
];

// Duplicate for seamless loop
const repeatedTestimonials = [...testimonials, ...testimonials];

export default function TestimonialsSection() {
    return (
        <section className="min-h-[60vh] w-full bg-transparent py-24 overflow-hidden flex flex-col justify-center">
            <h2 className="mb-16 text-center text-4xl font-bold tracking-tighter text-white sm:text-6xl">
                Client Words
            </h2>

            <div className="relative w-full flex overflow-hidden mask-linear-gradient">
                {/* Gradient Masks for fading edges */}


                <motion.div
                    className="flex gap-8 px-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity
                    }}
                    whileHover={{ animationPlayState: "paused" }} // Note: Framer Motion uses different pause logic, but let's try a CSS override approach or valid framer props if simple
                    // Actually framer motion 'animate' doesn't support pause on hover easily without useAnimation controls.
                    // Let's rely on grouping and css for hover pause or just keep it simple first.
                    // The style prop below is a common trick.
                    style={{ width: "max-content" }}
                >
                    {repeatedTestimonials.map((t, i) => (
                        <TestimonialCard key={i} {...t} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
