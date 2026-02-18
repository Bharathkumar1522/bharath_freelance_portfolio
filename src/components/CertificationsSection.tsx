"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";

export default function CertificationsSection() {
    const containerRef = useRef(null);

    return (
        <section id="certifications" className="relative w-full bg-zinc-950 py-32 overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-7xl font-black font-heading text-white uppercase tracking-tighter mb-6">
                            Credentials
                        </h2>
                        <div className="flex items-center justify-center gap-4 text-zinc-500 font-mono text-xs md:text-sm tracking-[0.2em] uppercase">
                            <span className="w-12 h-[1px] bg-orange-500/50" />
                            <span>Verified Skills & Awards</span>
                            <span className="w-12 h-[1px] bg-orange-500/50" />
                        </div>
                    </motion.div>
                </div>

                <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {portfolioData.certifications.map((cert, index) => (
                        <Card key={index} cert={cert} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function Card({ cert, index }: { cert: any; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group relative h-full"
        >
            {/* Holographic Card Container */}
            <div className="relative h-full bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-colors duration-500">

                {/* Scanner Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-scan" />
                    <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent" />
                </div>

                <div className="p-8 flex flex-col h-full relative z-10">
                    {/* Header: Icon & Link */}
                    <div className="flex items-start justify-between mb-8">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center shadow-lg group-hover:shadow-orange-500/20 group-hover:border-orange-500/30 transition-all duration-300">
                            <ShieldCheck className="w-7 h-7 text-zinc-400 group-hover:text-orange-400 transition-colors" />
                        </div>

                        {cert.url && (
                            <a
                                href={cert.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-orange-500 transition-all duration-300"
                                aria-label="View Credential"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>

                    {/* Content */}
                    <div className="mt-auto">
                        <h3 className="text-2xl font-bold text-white font-heading tracking-wide mb-2 leading-tight group-hover:text-orange-100 transition-colors">
                            {cert.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="h-1 w-1 rounded-full bg-orange-500" />
                            <p className="text-zinc-400 font-mono text-xs uppercase tracking-wider">
                                {cert.issuer}
                            </p>
                        </div>
                    </div>

                    {/* Decorative Circuit Lines */}
                    <div className="absolute bottom-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 100H50V50H0" stroke="currentColor" strokeWidth="2" className="text-orange-500" />
                            <circle cx="50" cy="50" r="3" fill="currentColor" className="text-orange-500" />
                        </svg>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
