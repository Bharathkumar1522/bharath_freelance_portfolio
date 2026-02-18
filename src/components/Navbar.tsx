"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useLenis } from "@/components/SmoothScrolling";

const navLinks = [
    { name: "About", href: "#hero" },
    { name: "Services", href: "#services" }, // Added
    { name: "Work", href: "#work" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const lenis = useLenis();
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState("#hero");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });
    useEffect(() => {
        // Sections to observe (including those not in nav)
        const allSectionIds = ["hero", "skills", "services", "work", "experience", "certifications", "testimonials", "contact"];

        // Map Section IDs to Nav Tab Hrefs
        const sectionToTab: Record<string, string> = {
            hero: "#hero",
            skills: "#hero",
            services: "#services", // Added
            work: "#work",
            experience: "#experience",
            certifications: "#experience",
            testimonials: "#experience",
            contact: "#contact",
        };

        const observerOptions = {
            root: null,
            rootMargin: "-45% 0px -45% 0px", // Trigger when the section cuts through the middle 10% of viewport
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const mappedTab = sectionToTab[entry.target.id];
                    if (mappedTab) {
                        setActiveTab(mappedTab);
                    }
                }
            });
        }, observerOptions);

        allSectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMobileMenuOpen]);

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

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleMobileLinkClick = (href: string) => {
        setIsMobileMenuOpen(false);
        if (lenis) {
            lenis.scrollTo(href, { duration: 1.5 });
            setActiveTab(href);
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                aria-label="Main Navigation"
                className={`fixed top-0 left-0 right-0 z-50 flex justify-center py-4 transition-all duration-300 ${scrolled ? "py-4" : "py-6"}`}
            >
                <div className={`flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-xl transition-all duration-300 ${scrolled ? "bg-black/80 shadow-lg shadow-white/5" : ""}`}>

                    {/* Home / Logo */}
                    <Link
                        href="/"
                        onClick={handleLogoClick}
                        className="mr-4 flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white/20 font-heading"
                    >
                        BK
                    </Link>

                    {/* Desktop Links */}
                    <ul className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeTab === link.href ? "text-white" : "text-zinc-400 hover:text-white"}`}
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

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 text-white hover:text-orange-500 transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? (
                            <div className="w-6 h-6 flex flex-col justify-center items-center relative">
                                <span className={`absolute h-0.5 w-6 bg-white transition-transform ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-1'}`} />
                                <span className={`absolute h-0.5 w-6 bg-white transition-opacity ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                                <span className={`absolute h-0.5 w-6 bg-white transition-transform ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-1'}`} />
                            </div>
                        ) : (
                            <div className="w-6 h-6 flex flex-col justify-between items-center py-1">
                                <span className="h-0.5 w-6 bg-white" />
                                <span className="h-0.5 w-6 bg-white" />
                                <span className="h-0.5 w-6 bg-white" />
                            </div>
                        )}
                    </button>

                    {/* CTA (Hidden on very small screens if needed, or kept) */}
                    <Link
                        href="#contact"
                        onClick={(e) => handleScroll(e, "#contact")}
                        className="hidden sm:inline-block ml-4 rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition-transform hover:scale-105 hover:bg-orange-50"
                    >
                        Let's Talk
                    </Link>
                </div>
            </motion.nav>

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20"
                    >
                        <ul className="flex flex-col items-center gap-8">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        onClick={() => handleMobileLinkClick(link.href)}
                                        className={`text-3xl font-heading font-bold tracking-tight ${activeTab === link.href ? "text-white" : "text-zinc-500 hover:text-white"}`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="#contact"
                            onClick={() => handleMobileLinkClick("#contact")}
                            className="mt-12 rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-transform hover:scale-105 hover:bg-orange-50"
                        >
                            Let's Talk
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
