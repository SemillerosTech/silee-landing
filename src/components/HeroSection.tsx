import Image from "next/image";
const logo = "/assets/logo-white-silee.svg";
const heroBackground = "/assets/calm-background.jpg";

const HeroSection = () => {
  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden text-primary-foreground">
      {/* Background Image */}
      <Image
        src={heroBackground}
        alt=""
        fill
        priority
        className="object-cover"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />

      <div className="content-container text-center py-20 relative z-10">
        <div className="animate-fade-in">
          <img
            src={logo}
            alt="SILEE - Sistema Integral de Logoterapia y Educación Existencial"
            className="h-32 md:h-40 lg:h-48 w-auto mx-auto mb-12"
          />

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight mb-6 max-w-3xl mx-auto">
            Lo que buscas no está afuera.
            <br />
            <span className="font-medium">Está en el sentido que le das.</span>
          </h1>

          <p className="text-lg md:text-xl font-light opacity-90 max-w-2xl mx-auto mb-12 leading-relaxed">
            Un espacio para detenerse, reflexionar y reencontrar el propósito a
            través de la logoterapia y la educación existencial.
          </p>

          <button
            onClick={scrollToContact}
            className="inline-block px-8 py-3 border border-primary-foreground/40 text-sm font-medium tracking-wide 
                     hover:bg-primary-foreground hover:text-primary transition-all duration-300"
          >
            Quiero más información
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
