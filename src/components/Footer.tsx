"use client";

import MagneticButton from "./MagneticButton";
import { Twitter, Linkedin, Github, Instagram, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import TechStackMarquee from "./TechStackMarquee";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative w-full bg-zinc-950 pt-0 pb-8 flex flex-col overflow-hidden border-t border-white/5">

            {/* Background Grid - Floor Perspective (Matching Contact Section) */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute bottom-0 left-0 right-0 h-full bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"
                />
            </div>

            {/* Tech Stack Marquee - Seamless Integration */}
            <div className="relative z-10 w-full mb-12">
                <TechStackMarquee />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between gap-12 border-t border-white/5 pt-12">

                    {/* Brand / Signature */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-[12vw] md:text-[8vw] font-black font-heading text-white/5 leading-[0.8] tracking-tighter select-none pointer-events-none absolute bottom-0 left-0 -z-10 translate-y-1/3 blur-sm">
                            BHARATH
                        </h2>

                        <div className="flex flex-col gap-1">
                            <h3 className="text-2xl font-bold font-heading text-white uppercase tracking-widest">
                                Bharath Kumar
                            </h3>
                            <p className="text-zinc-500 font-mono text-xs tracking-wider">
                                Frontend Developer & UI Engineer
                            </p>
                        </div>
                    </div>

                    {/* Links & Copyright */}
                    <div className="flex flex-col items-end gap-8">

                        {/* Social Links */}
                        <div className="flex gap-4">
                            {[
                                { icon: Linkedin, href: portfolioData.personal.social.linkedin },
                                { icon: Github, href: portfolioData.personal.social.github },
                                { icon: Instagram, href: portfolioData.personal.social.instagram }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <MagneticButton variant="secondary" className="p-4 rounded-full bg-zinc-900/50 border border-white/5 hover:bg-orange-500 hover:border-orange-500 hover:text-black transition-all duration-300 group">
                                        <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                                    </MagneticButton>
                                </a>
                            ))}
                        </div>

                        <div className="text-right flex flex-col items-end gap-2">
                            <a
                                href="#hero"
                                className="text-zinc-400 hover:text-orange-500 transition-colors text-sm font-mono uppercase tracking-widest flex items-center gap-2 group"
                            >
                                Back to Top
                                <ArrowUpRight size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <p className="text-zinc-600 text-xs font-mono tracking-tight">
                                © {currentYear} Crafted with Next.js, Tailwind & GSAP.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cosmic Glow at bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[200px] bg-orange-500/10 blur-[100px] pointer-events-none" />

        </footer>
    );
}
