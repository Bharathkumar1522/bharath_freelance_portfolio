"use client";

import Image from "next/image";
import { Quote } from "lucide-react"; // Import Quote icon for better visual

interface TestimonialProps {
    quote: string;
    name: string;
    role: string;
    company: string;
    image: string;
}

export default function TestimonialCard({ quote, name, role, company, image }: TestimonialProps) {
    return (
        <div className="group relative h-[320px] w-[350px] flex-shrink-0 cursor-default overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:bg-white/10 hover:shadow-[0_10px_30px_-10px_rgba(255,107,53,0.15)]">

            {/* Top orange accent line */}
            <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Quote Icon Overlay - Big and subtle */}
            <div className="absolute -top-2 -right-2 text-white/5 transition-colors group-hover:text-orange-500/10">
                <Quote size={120} strokeWidth={1} />
            </div>

            <div className="flex h-full flex-col justify-between relative z-10">
                <p className="text-lg leading-relaxed text-zinc-300 font-medium whitespace-pre-line">
                    &quot;{quote}&quot;
                </p>

                <div className="flex items-center gap-4 mt-6">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/10 group-hover:border-orange-500/50 transition-colors">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white group-hover:text-orange-100 transition-colors">{name}</h4>
                        <p className="text-xs font-bold text-orange-500/80 uppercase tracking-wide group-hover:text-orange-400">
                            {role}
                        </p>
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">
                            {company}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
