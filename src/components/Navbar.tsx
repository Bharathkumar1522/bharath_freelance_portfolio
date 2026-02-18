"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useLenis } from "@/components/SmoothScrolling";

const navLinks = [
    { name: "About", href: "#hero" }, // Changed to #hero to link to top
    { name: "Work", href: "#work" },
    { name: "Experience", href: "#experience" }, // Ensure ExperienceSection has id="experience"
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const lenis = useLenis();
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState("#hero");

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    useEffect(() => {
        const sections = navLinks.map(link => document.querySelector(link.href));

        const observerOptions = {
            root: null,
            rootMargin: "-45% 0px -45% 0px", // Trigger when the section is in the middle of the screen
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveTab(`#${entry.target.id}`);
                }
            });
        }, observerOptions);

        sections.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        if (lenis) {
            lenis.scrollTo(href, { duration: 1.5 });
            setActiveTab(href);
        }
    };

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (lenis) {
            lenis.scrollTo(0, { duration: 1.5 }); // Scroll to top
            setActiveTab("#hero");
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            aria-label="Main Navigation"
            className={`fixed top-0 left-0 right-0 z-50 flex justify-center py-4 transition-all duration-300 ${scrolled ? "py-4" : "py-6"
                }`}
        >
            <div className={`flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-xl transition-all duration-300 ${scrolled ? "bg-black/80 shadow-lg shadow-white/5" : ""
                }`}>

                {/* Home / Logo */}
                <Link
                    href="/"
                    onClick={handleLogoClick}
                    className="mr-4 flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white/20 font-heading"
                >
                    BK
                </Link>

                {/* Links */}
                <ul className="flex items-center gap-1">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeTab === link.href ? "text-white" : "text-zinc-400 hover:text-white"
                                    }`}
                                onClick={(e) => handleScroll(e, link.href)}
                            >
                                {activeTab === link.href && (
                                    <motion.span
                                        layoutId="bubble"
                                        className="absolute inset-0 z-[-1] rounded-full bg-white/10 mix-blend-difference"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <Link
                    href="#contact"
                    onClick={(e) => handleScroll(e, "#contact")}
                    className="ml-4 rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition-transform hover:scale-105 hover:bg-orange-50"
                >
                    Let's Talk
                </Link>
            </div>
        </motion.nav>
    );
}
