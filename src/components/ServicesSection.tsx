"use client";

import { portfolioData } from "@/data/portfolio";
import { Layout, User, Globe, Palette, Monitor, ShoppingBag, Figma } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, any> = {
    layout: Layout,
    user: User,
    globe: Globe,
    palette: Palette,
    monitor: Monitor,
    "shopping-bag": ShoppingBag,
    figma: Figma
};

export default function ServicesSection() {
    return (
        <section id="services" className="relative w-full py-24 bg-black text-white overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-50" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black font-heading tracking-tighter uppercase text-center mb-4"
                    >
                        What I Do
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="h-1 bg-orange-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {portfolioData.services.map((service, index) => {
                        const Icon = iconMap[service.icon] || Globe;
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group p-8 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-orange-500/30 hover:bg-zinc-900/50 transition-all duration-300 relative overflow-hidden"
                            >
                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative z-10 flex flex-col items-start gap-4">
                                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 group-hover:border-orange-500/30 group-hover:text-orange-500 transition-all duration-300">
                                        <Icon size={24} />
                                    </div>

                                    <h3 className="text-xl font-bold font-heading uppercase tracking-wide">
                                        {service.title}
                                    </h3>

                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
