"use client";

import Image from "next/image";

interface TestimonialProps {
    quote: string;
    name: string;
    role: string;
    company: string;
    image: string;
}

export default function TestimonialCard({ quote, name, role, company, image }: TestimonialProps) {
    return (
        <div className="relative h-[300px] w-[350px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10">

            <div className="absolute top-4 right-6 text-6xl font-serif text-white/10">
                &quot;
            </div>

            <div className="flex h-full flex-col justify-between">
                <p className="relative z-10 text-lg leading-relaxed text-zinc-300">
                    {quote}
                </p>

                <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/20">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white">{name}</h4>
                        <p className="text-xs font-medium text-orange-400 uppercase tracking-wide">
                            {role}, {company}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}
