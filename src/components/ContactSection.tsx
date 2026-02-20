"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { Mail, MapPin, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
    const formRef = useRef<HTMLFormElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    // animations handled by whileInView on each panel

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            setSubmitStatus("error");
            setIsSubmitting(false);
            return;
        }

        try {
            emailjs.init(publicKey);
            await emailjs.send(serviceId, templateId, {
                from_name: formState.name,
                from_email: formState.email,
                message: formState.message,
                reply_to: formState.email,
            }, publicKey);
            setSubmitStatus("success");
            setFormState({ name: "", email: "", message: "" });
            setTimeout(() => setSubmitStatus("idle"), 5000);
        } catch (error: any) {
            console.error("EmailJS Error:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const sendViaGmail = () => {
        const subject = encodeURIComponent(`Project Inquiry from ${formState.name}`);
        const body = encodeURIComponent(
            `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
        );
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.personal.email}&su=${subject}&body=${body}`, "_blank");
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative w-full bg-black py-24 md:py-32 overflow-hidden border-t border-white/5"
        >
            {/* ── Neon perspective grid floor ── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Electric orange glow BEHIND the grid — the key new element */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-[55vh]"
                    style={{
                        background: "radial-gradient(ellipse at center bottom, rgba(255,107,53,0.18) 0%, rgba(255,107,53,0.06) 40%, transparent 70%)",
                    }}
                />
                {/* The perspective grid itself */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-[55vh] opacity-30"
                    style={{
                        backgroundImage: "linear-gradient(to right, #ff6b3530 1px, transparent 1px), linear-gradient(to bottom, #ff6b3530 1px, transparent 1px)",
                        backgroundSize: "50px 50px",
                        maskImage: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8) 20%, black)",
                        transform: "perspective(600px) rotateX(55deg) translateY(80px) scale(2.2)",
                    }}
                />
            </div>

            {/* Animated neon pulse ring — signal beacon */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none">
                <div className="relative w-3 h-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-60" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500" />
                    {/* Ripple rings */}
                    <div className="absolute inset-0 rounded-full border border-orange-500/30 animate-neon-pulse scale-[3]"
                        style={{ "--dur": "2s" } as React.CSSProperties} />
                    <div className="absolute inset-0 rounded-full border border-orange-500/20 animate-neon-pulse scale-[6]"
                        style={{ "--dur": "2s", animationDelay: "0.5s" } as React.CSSProperties} />
                </div>
            </div>

            {/* Top hairline */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

            {/* HUD-style coordinate labels */}
            <div className="absolute top-6 left-6 font-mono text-[9px] text-orange-500/30 tracking-[0.3em] uppercase pointer-events-none select-none hidden md:block">
                SYS::CONTACT_MODULE
            </div>
            <div className="absolute top-6 right-6 font-mono text-[9px] text-orange-500/30 tracking-[0.3em] uppercase pointer-events-none select-none hidden md:block">
                STATUS::ONLINE
            </div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-20">

                {/* Left Panel: Status & Info */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    className="w-full lg:w-1/2 flex flex-col justify-between"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                            </span>
                            <span className="text-green-500 font-mono text-[10px] tracking-[0.2em] uppercase font-bold">Accepting New Projects</span>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <a href={`mailto:${portfolioData.personal.email}`}
                            className="group relative flex flex-col p-6 border border-zinc-800 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] hover:border-orange-500/50 transition-all duration-300 rounded-2xl overflow-hidden"
                        >
                            <div className="absolute top-4 right-4 text-zinc-800 group-hover:text-orange-500/50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                                <ArrowRight size={16} className="-rotate-45" />
                            </div>
                            <Mail className="text-zinc-500 group-hover:text-orange-500 mb-4 transition-colors" size={24} />
                            <span className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Email Me</span>
                            <span className="text-white font-mono text-sm">{portfolioData.personal.email}</span>
                        </a>

                        <a href="https://maps.google.com/?q=India" target="_blank" rel="noopener noreferrer"
                            className="group relative flex flex-col p-6 border border-zinc-800 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] hover:border-orange-500/50 transition-all duration-300 rounded-2xl overflow-hidden"
                        >
                            <div className="absolute top-4 right-4 text-zinc-800 group-hover:text-orange-500/50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                                <ArrowRight size={16} className="-rotate-45" />
                            </div>
                            <MapPin className="text-zinc-500 group-hover:text-orange-500 mb-4 transition-colors" size={24} />
                            <span className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Location</span>
                            <span className="text-white font-mono text-sm">India (Available Remote)</span>
                        </a>
                    </div>
                </motion.div>

                {/* Right Panel: The Premium Form */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    className="w-full lg:w-1/2"
                >
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                        <div className="group">
                            <label htmlFor="name" className="block text-zinc-400 text-sm font-medium mb-2 pl-1">Your Name</label>
                            <div className="relative flex items-center bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden focus-within:border-orange-500/50 focus-within:bg-zinc-900 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all duration-300">
                                <input type="text" name="name" id="name" placeholder="John Doe" required
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    className="w-full bg-transparent p-4 text-white placeholder-zinc-600 outline-none" />
                                <div className="pr-4 text-orange-500 opacity-0 group-focus-within:opacity-100 transition-opacity">
                                    <CheckCircle2 size={18} />
                                </div>
                            </div>
                        </div>

                        <div className="group">
                            <label htmlFor="email" className="block text-zinc-400 text-sm font-medium mb-2 pl-1">Email Address</label>
                            <div className="relative flex items-center bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden focus-within:border-orange-500/50 focus-within:bg-zinc-900 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all duration-300">
                                <input type="email" name="email" id="email" placeholder="john@example.com" required
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    className="w-full bg-transparent p-4 text-white placeholder-zinc-600 outline-none" />
                                <div className="pr-4 text-orange-500 opacity-0 group-focus-within:opacity-100 transition-opacity">
                                    <CheckCircle2 size={18} />
                                </div>
                            </div>
                        </div>

                        <div className="group">
                            <label htmlFor="message" className="block text-zinc-400 text-sm font-medium mb-2 pl-1">Project Details</label>
                            <div className="relative bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden focus-within:border-orange-500/50 focus-within:bg-zinc-900 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all duration-300">
                                <textarea name="message" id="message" rows={5}
                                    placeholder="Tell me about your goals, timeline, and budget..."
                                    required value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    className="w-full bg-transparent p-4 text-white placeholder-zinc-600 outline-none resize-none" />
                            </div>
                        </div>



                        <div className="pt-4">
                            <button type="submit" disabled={isSubmitting}
                                className="w-full group bg-white text-black hover:text-white font-bold font-heading uppercase text-lg py-5 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-400 hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                                <span>{isSubmitting ? "Sending Message..." : "Send Message"}</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </div>

                        {submitStatus === "success" && (
                            <div className="flex items-center gap-2 text-green-500 bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                                <CheckCircle2 size={20} />
                                <span className="font-mono text-sm">Message transmitted successfully. I'll respond shortly.</span>
                            </div>
                        )}
                        {submitStatus === "error" && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                                    <AlertCircle size={20} />
                                    <span className="font-mono text-sm">Transmission failed. Please use the Gmail fallback.</span>
                                </div>
                                <button type="button" onClick={sendViaGmail}
                                    className="w-full py-3 px-4 bg-zinc-900 border border-zinc-800 text-white rounded-xl font-mono text-xs uppercase tracking-widest hover:bg-zinc-800 hover:border-orange-500/50 transition-all flex items-center justify-center gap-2">
                                    <Mail size={14} className="text-orange-500" />
                                    <span>Send via Gmail Instead</span>
                                </button>
                            </div>
                        )}
                    </form>

                    {/* DPDP Notice REMOVED */}
                </motion.div>
            </div>
        </section>
    );
}
