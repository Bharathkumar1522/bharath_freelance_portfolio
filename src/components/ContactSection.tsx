"use client";

import { useState } from "react";
import MagneticButton from "./MagneticButton";
import { Send, Mail, MapPin, Terminal, ArrowRight, CheckCircle2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function ContactSection() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate network request
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        alert("Message sent successfully! I'll get back to you soon.");
        setFormState({ name: "", email: "", message: "" });
    };

    return (
        <section id="contact" className="relative w-full bg-zinc-950 py-32 overflow-hidden border-t border-zinc-900">
            {/* Background Grid - Floor Perspective */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,transparent,black)] opacity-20" style={{ transform: "perspective(500px) rotateX(60deg) translateY(100px) scale(2)" }} />
            </div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row gap-20">

                {/* Left Panel: Status & Info */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-8">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-green-500 font-mono text-xs tracking-[0.2em] uppercase">Accepting New Projects</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-black font-heading text-white uppercase tracking-tighter mb-8 leading-[0.9]">
                            Let's Build<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                                Something Real.
                            </span>
                        </h2>

                        <p className="text-zinc-400 font-sans text-lg max-w-md leading-relaxed mb-12 border-l-2 border-orange-500/20 pl-6">
                            I help ambitious brands and founders turn their vision into high-performing digital experiences. No fluff, just pixel-perfect code and designs that convert.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <a href={`mailto:${portfolioData.personal.email}`} className="group flex flex-col p-6 border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/50 hover:border-orange-500/50 transition-all duration-300 rounded-2xl">
                            <Mail className="text-zinc-500 group-hover:text-orange-500 mb-4 transition-colors" size={24} />
                            <span className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Email Me</span>
                            <span className="text-white font-mono text-sm">{portfolioData.personal.email}</span>
                        </a>

                        <div className="flex flex-col p-6 border border-zinc-800 bg-zinc-900/20 rounded-2xl">
                            <MapPin className="text-zinc-500 mb-4" size={24} />
                            <span className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Location</span>
                            <span className="text-white font-mono text-sm">India (Available Remote)</span>
                        </div>
                    </div>
                </div>

                {/* Right Panel: The Premium Form */}
                <div className="w-full lg:w-1/2">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Name Field */}
                        <div className="group">
                            <label htmlFor="name" className="block text-zinc-400 text-sm font-medium mb-2 pl-1">Your Name</label>
                            <div className={`relative flex items-center bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden focus-within:border-orange-500/50 focus-within:bg-zinc-900 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all duration-300`}>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="John Doe"
                                    required
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    className="w-full bg-transparent p-4 text-white placeholder-zinc-600 outline-none"
                                />
                                <div className="pr-4 text-orange-500 opacity-0 group-focus-within:opacity-100 transition-opacity">
                                    <CheckCircle2 size={18} />
                                </div>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="group">
                            <label htmlFor="email" className="block text-zinc-400 text-sm font-medium mb-2 pl-1">Email Address</label>
                            <div className={`relative flex items-center bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden focus-within:border-orange-500/50 focus-within:bg-zinc-900 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all duration-300`}>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="john@example.com"
                                    required
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    className="w-full bg-transparent p-4 text-white placeholder-zinc-600 outline-none"
                                />
                                <div className="pr-4 text-orange-500 opacity-0 group-focus-within:opacity-100 transition-opacity">
                                    <CheckCircle2 size={18} />
                                </div>
                            </div>
                        </div>

                        {/* Message Field */}
                        <div className="group">
                            <label htmlFor="message" className="block text-zinc-400 text-sm font-medium mb-2 pl-1">Project Details</label>
                            <div className={`relative bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden focus-within:border-orange-500/50 focus-within:bg-zinc-900 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all duration-300`}>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={5}
                                    placeholder="Tell me about your goals, timeline, and budget..."
                                    required
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    className="w-full bg-transparent p-4 text-white placeholder-zinc-600 outline-none resize-none"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full group bg-white hover:bg-orange-500 text-black font-bold font-heading uppercase text-lg py-5 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]"
                            >
                                <span>{isSubmitting ? "Sending Message..." : "Send Message"}</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </section>
    );
}
