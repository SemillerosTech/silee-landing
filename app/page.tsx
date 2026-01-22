"use client";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import RosaAdelaidaSection from "@/components/RosaAdelaidaSection";
import FeriaCarousel from "@/components/FeriaCarousel";
import EducationalOfferSection from "@/components/EducationalOfferSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <HeroSection />
      <AboutSection />
      <RosaAdelaidaSection />
      <FeriaCarousel />
      <EducationalOfferSection />
      <ContactForm />
      <Footer />
    </main>
  );
}
