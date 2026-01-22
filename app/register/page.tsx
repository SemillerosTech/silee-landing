"use client";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function RegisterPage() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <section className="pb-16">
        <ContactForm />
      </section>
      <Footer />
    </main>
  );
}
