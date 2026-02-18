import Hero from "@/components/Hero";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import JourneySection from "@/components/JourneySection";
import CertificationsSection from "@/components/CertificationsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full">
      <Hero />
      <SkillsSection />
      <ProjectsSection />
      <JourneySection />
      <CertificationsSection />
      <TestimonialsSection />
      <section id="contact">
        <ContactSection />
      </section>

      <Footer />
    </main>
  );
}
