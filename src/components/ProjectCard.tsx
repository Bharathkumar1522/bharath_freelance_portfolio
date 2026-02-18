"use client";



import MagneticButton from "./MagneticButton";
import { ArrowUpRight } from "lucide-react";

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    year: string;
    image: string;
}

export default function ProjectCard({ project }: { project: Project }) {


    return (
        <div className="flex h-screen w-screen flex-shrink-0 flex-col items-center justify-center bg-transparent p-4 font-sans text-white md:flex-row md:p-16 overflow-hidden">

            {/* Text Section - 40% Width */}
            <div className="flex h-1/2 w-full flex-col justify-center space-y-6 md:h-full md:w-[40%] z-10">
                <div className="text-sm font-medium uppercase tracking-widest text-orange-400/80 font-mono">
                    {project.category} — {project.year}
                </div>
                <h2 className="text-5xl font-bold leading-none tracking-tighter sm:text-7xl md:text-8xl font-heading text-white mix-blend-difference">
                    {project.title}
                </h2>
                <p className="max-w-md text-lg text-zinc-300 font-sans">
                    {project.description}
                </p>
                <div className="pt-4">
                    <MagneticButton variant="glass" className="px-6 py-3 font-semibold">
                        View Case Study <ArrowUpRight className="ml-2 inline-block h-5 w-5" />
                    </MagneticButton>
                </div>
            </div>

            {/* Central Gap - 20% */}
            <div className="hidden md:block md:w-[20%]" />

            {/* Image Section - 40% Width */}
            <div className="relative h-1/2 w-full md:h-full md:w-[40%] px-4 md:px-0 flex items-center">
                <div className="relative h-[60vh] w-full overflow-hidden rounded-2xl border border-white/10 group bg-black/20 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-transparent transition-transform duration-700 group-hover:scale-105">
                        <div
                            className="h-full w-full bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url(${project.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );
}
