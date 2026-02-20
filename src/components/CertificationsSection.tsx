"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, ShieldCheck } from "lucide-react";

export default function CertificationsSection() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.1 });

    return (
        <section id="certifications" className="relative w-full bg-[#050505] py-24 overflow-hidden">
            {/* ─── Continuous Space Background (Matches Journey Section) ─── */}

            {/* Same dense starfield pattern for seamless transition */}
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none"
                style={{
                    backgroundImage: `
                        radial-gradient(1px 1px at 10% 10%, white, transparent),
                        radial-gradient(1px 1px at 20% 40%, white, transparent),
                        radial-gradient(2px 2px at 30% 70%, white, transparent),
                        radial-gradient(1px 1px at 40% 20%, white, transparent),
                        radial-gradient(1px 1px at 50% 90%, white, transparent),
                        radial-gradient(2px 2px at 60% 30%, white, transparent),
                        radial-gradient(1px 1px at 70% 60%, white, transparent),
                        radial-gradient(1px 1px at 80% 10%, white, transparent),
                        radial-gradient(2px 2px at 90% 80%, white, transparent)
                    `,
                    backgroundSize: "400px 400px"
                }}
            />

            {/* Deep nebula wash — extended from above but localized */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-indigo-950/20 to-[#050505] opacity-50 pointer-events-none" />

            {/* Local ambient glows (softened to blend) */}
            <div className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full"
                style={{ background: "radial-gradient(circle at top right, rgba(99,60,200,0.15), transparent 70%)" }} />
            <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full"
                style={{ background: "radial-gradient(circle at bottom left, rgba(255,107,53,0.1), transparent 70%)" }} />


            <div className="container mx-auto px-4 relative z-10">
                {/* Unified section header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                        </span>
                        <span className="text-orange-500 font-mono text-[11px] tracking-[0.3em] uppercase">Credentials</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black font-heading tracking-tighter uppercase leading-none">
                        Certifications
                    </h2>
                    <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase mt-3">
                        Verified Skills &amp; Awards
                    </p>
                </motion.div>

                <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {portfolioData.certifications.map((cert, index) => (
                        <CertCard key={index} cert={cert} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CertCard({ cert, index }: { cert: any; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative h-full"
        >
            <div className="relative h-full bg-white/[0.03] backdrop-blur-xl border border-white/8 rounded-2xl overflow-hidden hover:border-orange-500/40 hover:bg-white/[0.05] transition-all duration-500">

                {/* Hover corner glow */}
                <div className="absolute top-0 right-0 w-28 h-28 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(circle at top right, rgba(99,60,200,0.2), transparent 70%)" }} />

                {/* Scan sweep on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-2xl">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-beam-scan"
                        style={{ "--dur": "2s" } as React.CSSProperties} />
                </div>

                <div className="p-7 flex flex-col h-full relative z-10">
                    <div className="flex items-start justify-between mb-7">
                        <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-white/8 to-white/2 border border-white/10 flex items-center justify-center shadow-lg group-hover:border-orange-500/30 transition-all duration-300 p-3">
                            <ShieldCheck className="w-6 h-6 text-zinc-400 group-hover:text-orange-400 transition-colors" />
                        </div>
                        {cert.url && (
                            <a href={cert.url} target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-orange-500 transition-all duration-300"
                                aria-label="View Credential">
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        )}
                    </div>

                    <div className="mt-auto">
                        <h3 className="text-xl font-bold text-white font-heading tracking-wide mb-2 leading-tight group-hover:text-orange-100 transition-colors">
                            {cert.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="h-1 w-1 rounded-full bg-orange-500" />
                            <p className="text-zinc-400 font-mono text-xs uppercase tracking-wider">{cert.issuer}</p>
                        </div>
                    </div>

                    {/* Decorative corner circuit */}
                    <div className="absolute bottom-0 right-0 p-3 opacity-15 group-hover:opacity-40 transition-opacity">
                        <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
                            <path d="M100 100H50V50H0" stroke="currentColor" strokeWidth="2" className="text-indigo-400" />
                            <circle cx="50" cy="50" r="3" fill="currentColor" className="text-indigo-400" />
                        </svg>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
