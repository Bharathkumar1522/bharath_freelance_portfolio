import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const SkillsSection = dynamic(() => import("@/components/SkillsSection"));
const ServicesSection = dynamic(() => import("@/components/ServicesSection"));
const ProjectsSection = dynamic(() => import("@/components/ProjectsSection"));
const JourneySection = dynamic(() => import("@/components/JourneySection"));
const CertificationsSection = dynamic(() => import("@/components/CertificationsSection"));
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"));
const ContactSection = dynamic(() => import("@/components/ContactSection"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <main className="relative w-full">
      <Hero />
      <ServicesSection />
      <SkillsSection />
      <ProjectsSection />
      <JourneySection />
      <CertificationsSection />
      <TestimonialsSection />
      <ContactSection />

      <Footer />
    </main>
  );
}
