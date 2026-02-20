"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useLenis } from "@/components/SmoothScrolling";

const navLinks = [
    { name: "About", href: "#hero" },
    { name: "Services", href: "#services" },
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
        setScrolled(latest > 50);
    });

    useEffect(() => {
        const allSectionIds = ["hero", "skills", "services", "work", "experience", "certifications", "testimonials", "contact"];
        const sectionToTab: Record<string, string> = {
            hero: "#hero",
            skills: "#hero",
            services: "#services",
            work: "#work",
            experience: "#experience",
            certifications: "#experience",
            testimonials: "#experience",
            contact: "#contact",
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const mappedTab = sectionToTab[entry.target.id];
                    if (mappedTab) setActiveTab(mappedTab);
                }
            });
        }, { root: null, rootMargin: "-45% 0px -45% 0px", threshold: 0 });

        allSectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    }, [isMobileMenuOpen]);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        if (lenis) { lenis.scrollTo(href, { duration: 1.5 }); setActiveTab(href); }
    };

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (lenis) { lenis.scrollTo(0, { duration: 1.5 }); setActiveTab("#hero"); }
    };

    const handleMobileLinkClick = (href: string) => {
        setIsMobileMenuOpen(false);
        if (lenis) { lenis.scrollTo(href, { duration: 1.5 }); setActiveTab(href); }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                aria-label="Main Navigation"
                className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
            >
                {/* Outer glow effect when scrolled */}
                <div
                    className={`flex items-center gap-1 rounded-full border px-2 py-1.5 transition-all duration-500 ${scrolled
                            ? "bg-black/75 border-white/15 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)]"
                            : "bg-black/40 border-white/8 backdrop-blur-xl"
                        }`}
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={handleLogoClick}
                        className="group mr-3 flex items-center justify-center rounded-full px-4 py-2 text-sm font-black text-white font-heading transition-all duration-300 relative overflow-hidden"
                    >
                        {/* Background fill */}
                        <span className="absolute inset-0 rounded-full bg-white/10 group-hover:bg-orange-500 transition-colors duration-300" />
                        {/* Glow */}
                        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md bg-orange-500/40" />
                        <span className="relative z-10 tracking-wider">BK</span>
                    </Link>

                    {/* Desktop Links */}
                    <ul className="hidden md:flex items-center gap-0.5">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    onClick={(e) => handleScroll(e, link.href)}
                                    className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeTab === link.href ? "text-white" : "text-zinc-400 hover:text-zinc-100"
                                        }`}
                                >
                                    {activeTab === link.href && (
                                        <motion.span
                                            layoutId="nav-bubble"
                                            className="absolute inset-0 z-[-1] rounded-full bg-white/10"
                                            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                        />
                                    )}
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden ml-1 w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Toggle Menu"
                    >
                        <motion.span
                            animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className="block h-0.5 w-5 bg-white rounded-full origin-center"
                        />
                        <motion.span
                            animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.2 }}
                            className="block h-0.5 w-5 bg-white rounded-full"
                        />
                        <motion.span
                            animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className="block h-0.5 w-5 bg-white rounded-full origin-center"
                        />
                    </button>

                    {/* CTA */}
                    <Link
                        href="#contact"
                        onClick={(e) => handleScroll(e, "#contact")}
                        className="hidden sm:inline-flex ml-3 items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition-all duration-300 hover:bg-orange-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,107,53,0.4)]"
                    >
                        Let&apos;s Talk
                    </Link>
                </div>
            </motion.nav>

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "inset(0 0 100% 0 round 0)" }}
                        animate={{ opacity: 1, clipPath: "inset(0 0 0% 0 round 0)" }}
                        exit={{ opacity: 0, clipPath: "inset(0 100% 0 0 round 0)" }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-40 bg-zinc-950/97 backdrop-blur-2xl flex flex-col items-center justify-center"
                    >
                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

                        <ul className="flex flex-col items-center gap-6">
                            {navLinks.map((link, i) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08 + 0.1, duration: 0.4, ease: "easeOut" }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => handleMobileLinkClick(link.href)}
                                        className={`text-4xl font-heading font-black tracking-tight transition-colors duration-200 ${activeTab === link.href ? "text-white" : "text-zinc-500 hover:text-white"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                    {activeTab === link.href && (
                                        <motion.div
                                            layoutId="mobile-indicator"
                                            className="h-0.5 bg-orange-500 mt-1 rounded-full"
                                        />
                                    )}
                                </motion.li>
                            ))}
                        </ul>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                        >
                            <Link
                                href="#contact"
                                onClick={() => handleMobileLinkClick("#contact")}
                                className="mt-14 inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-lg font-bold text-black transition-all hover:bg-orange-400 hover:shadow-[0_0_30px_rgba(255,107,53,0.5)]"
                            >
                                Let&apos;s Talk
                            </Link>
                        </motion.div>

                        {/* Bottom accent line */}
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
