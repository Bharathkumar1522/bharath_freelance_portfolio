"use client";

import FlipCard from "./FlipCard";

import { portfolioData } from "@/data/portfolio";

const educationData = [
    ...portfolioData.education.map((edu) => ({
        degree: edu.degree,
        institution: edu.institution,
        year: edu.period,
        description: edu.description,
        courses: [], // Optional: Add if available in future
    })),
    ...portfolioData.certifications.map((cert) => ({
        degree: cert.title,
        institution: cert.issuer,
        year: "Certification",
        description: "Professional Certification",
        courses: [],
    }))
];

export default function EducationSection() {
    return (
        <section className="min-h-screen w-full bg-transparent py-24 px-4">
            <div className="container mx-auto">
                <h2 className="mb-16 text-center text-4xl font-bold tracking-tighter text-white sm:text-6xl">
                    Academic Arc
                </h2>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {educationData.map((edu, index) => (
                        <FlipCard key={index} {...edu} />
                    ))}
                </div>
            </div>
        </section>
    );
}
