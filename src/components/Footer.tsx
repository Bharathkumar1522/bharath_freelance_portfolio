"use client";

import { useLenis } from "@/components/SmoothScrolling";
import MagneticButton from "./MagneticButton";
import { Twitter, Linkedin, Github, Instagram, ArrowUpRight, Mail } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import TechStackMarquee from "./TechStackMarquee";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const lenis = useLenis();

    const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        lenis?.scrollTo("#hero", { duration: 1.5 });
    };

    return (
        <footer className="relative w-full bg-black pt-0 pb-8 flex flex-col overflow-hidden border-t border-white/5">

            {/* Background Grid - Floor Perspective */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute bottom-0 left-0 right-0 h-full bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"
                />
            </div>

            {/* Tech Stack Marquee */}
            <div className="relative z-10 w-full mb-12 sm:mb-20">
                <TechStackMarquee />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/5 pt-12">

                    {/* Brand Section (Col 1-5) */}
                    <div className="md:col-span-5 flex flex-col gap-6">
                        <div className="relative">
                            <h2 className="text-[15vw] md:text-[6vw] font-black font-heading text-white/5 leading-[0.8] tracking-tighter select-none pointer-events-none absolute top-1/2 left-0 -z-10 -translate-y-1/2 blur-sm">
                                BHARATH
                            </h2>
                            <h3 className="text-3xl md:text-4xl font-bold font-heading text-white uppercase tracking-widest mix-blend-overlay">
                                Bharath Kumar
                            </h3>
                        </div>
                        <p className="text-zinc-500 font-sans text-sm md:text-base max-w-sm leading-relaxed">
                            Crafting digital experiences where design meets precision engineering. Available for freelance projects and collaborations.
                        </p>
                        <div className="flex gap-4 mt-2">
                            {[
                                { icon: Linkedin, href: portfolioData.personal.social.linkedin },
                                { icon: Github, href: portfolioData.personal.social.github },
                                { icon: Instagram, href: portfolioData.personal.social.instagram },
                                { icon: Mail, href: `mailto:${portfolioData.personal.email}` }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-400 hover:text-orange-500 transition-colors duration-300"
                                >
                                    <social.icon size={24} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links (Col 6-8) */}
                    <div className="md:col-span-3 flex flex-col gap-4">
                        <h4 className="text-white font-heading font-bold uppercase tracking-wider mb-2">Explore</h4>
                        <nav className="flex flex-col gap-3">
                            {['About', 'Work', 'Experience', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        lenis?.scrollTo(`#${item.toLowerCase()}`);
                                    }}
                                    className="text-zinc-500 hover:text-white transition-colors font-mono text-sm uppercase tracking-wide w-fit"
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Services / Extra (Col 9-12) */}
                    <div className="md:col-span-4 flex flex-col items-start md:items-end gap-4 text-left md:text-right">
                        <h4 className="text-white font-heading font-bold uppercase tracking-wider mb-2">Services</h4>
                        <ul className="flex flex-col gap-3 md:items-end">
                            <li className="text-zinc-500 font-mono text-sm uppercase tracking-wide">Frontend Development</li>
                            <li className="text-zinc-500 font-mono text-sm uppercase tracking-wide">UI/UX Engineering</li>
                            <li className="text-zinc-500 font-mono text-sm uppercase tracking-wide">Interactive 3D Web</li>
                            <li className="text-zinc-500 font-mono text-sm uppercase tracking-wide">Performance Optimization</li>
                        </ul>

                        <a
                            href="#hero"
                            onClick={handleScrollToTop}
                            className="mt-8 text-orange-500 hover:text-orange-400 transition-colors text-sm font-mono uppercase tracking-widest flex items-center gap-2 group"
                        >
                            Back to Top
                            <ArrowUpRight size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-zinc-600 text-xs font-mono tracking-tight text-center md:text-left">
                        © {currentYear} Bharath Kumar. All rights reserved.
                    </p>
                    <p className="text-zinc-700 text-[10px] font-mono tracking-tight uppercase">
                        Locally Crafted • Globally Connected
                    </p>
                </div>
            </div>

            {/* Cosmic Glow at bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-orange-600/10 blur-[120px] pointer-events-none" />

        </footer>
    );
}
