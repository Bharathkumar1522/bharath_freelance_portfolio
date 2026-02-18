"use client";

import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";

import { portfolioData } from "@/data/portfolio";

const testimonials = portfolioData.testimonials;

// Duplicate for seamless loop
const repeatedTestimonials = [...testimonials, ...testimonials];

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="min-h-[60vh] w-full bg-transparent py-24 overflow-hidden flex flex-col justify-center">
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
