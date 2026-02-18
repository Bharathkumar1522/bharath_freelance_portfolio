"use client";

import { motion } from "framer-motion";
import { Brain, Palette, Component, Terminal } from "lucide-react";

export function AiPulse() {
    return (
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="relative h-32 w-32">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl"
                />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-orange-500/30 border-t-transparent"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full border border-amber-500/30 border-b-transparent"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="h-12 w-12 text-orange-400" />
                </div>
            </div>
        </div>
    );
}

export function DesignGrid() {
    return (
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <div className="grid grid-cols-2 gap-2 transform -rotate-12 translate-x-4">
                <motion.div
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(249, 115, 22, 0.4)" }}
                    className="h-16 w-16 rounded-lg border border-orange-500/30 bg-orange-500/10 backdrop-blur-sm flex items-center justify-center"
                >
                    <Palette className="h-6 w-6 text-orange-400" />
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(234, 88, 12, 0.4)" }}
                    className="h-16 w-16 rounded-lg border border-red-500/30 bg-red-500/10 backdrop-blur-sm flex items-center justify-center"
                >
                    <Component className="h-6 w-6 text-red-400" />
                </motion.div>
                <div className="col-span-2 h-16 w-full rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                    <span className="text-xs font-mono text-zinc-500">UI SYSTEM</span>
                </div>
            </div>
        </div>
    );
}

export function CodeBlock() {
    return (
        <div className="absolute inset-0 flex items-center justify-center px-6 opacity-60 overflow-hidden pointer-events-none">
            <div className="w-full space-y-2 font-mono text-xs text-zinc-500">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-2 w-3/4 rounded bg-orange-900/40"
                />
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-2 w-1/2 rounded bg-amber-900/40"
                />
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-2 w-5/6 rounded bg-zinc-800"
                />
                <div className="flex gap-2 pt-2">
                    <Terminal className="h-4 w-4 text-yellow-500" />
                    <span className="text-yellow-500">npm run deploy</span>
                </div>
            </div>
        </div>
    );
}
