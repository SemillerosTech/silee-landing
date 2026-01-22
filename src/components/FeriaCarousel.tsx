import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    title: "Feria del Libro Colofón",
    content: `La Feria del Libro Colofón es un espacio de encuentro para lectores, 
    escritores y pensadores que buscan más que entretenimiento en la lectura. 
    Un evento donde el libro se celebra como herramienta de transformación personal 
    y reflexión profunda.`,
    background: "/assets/book-fair-1.jpg",
  },
  {
    title: "SILEE en la Feria",
    content: `Este año, SILEE participa con un espacio dedicado a la logoterapia 
    y la educación existencial. Presentaremos obras fundamentales de Viktor Frankl, 
    ofreceremos conversatorios sobre el sentido de vida, y abriremos un espacio 
    de diálogo para quienes desean explorar estas ideas.`,
    background: "/assets/book-fair-2.jpg",
  },
  {
    title: "Una invitación a la reflexión",
    content: `Te invitamos a detenerte. A preguntarte qué sentido tiene lo que haces, 
    lo que lees, lo que buscas. La logoterapia no ofrece respuestas fáciles, 
    pero sí un camino honesto hacia la comprensión de ti mismo y tu lugar en el mundo.`,
    background: "/assets/book-fair-3.jpg",
  },
];

const FeriaCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="feria" className="relative overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.background}
            alt=""
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/75 to-primary/90" />

      <div className="relative z-10 section-padding text-primary-foreground">
        <div className="content-container">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium tracking-widest text-silee-teal uppercase mb-4 block">
              Evento
            </span>

            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  <div className="flex">
                    {slides.map((slide, index) => (
                      <div key={index} className="w-full flex-shrink-0 px-4">
                        <h2 className="text-2xl md:text-3xl font-semibold mb-8 leading-tight">
                          {slide.title}
                        </h2>
                        <p className="text-lg md:text-xl font-light leading-relaxed opacity-90">
                          {slide.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12">
                <div className="flex gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-silee-teal w-8"
                          : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
                      }`}
                      aria-label={`Ir a diapositiva ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={prevSlide}
                    className="p-2 border border-primary-foreground/30 hover:border-primary-foreground transition-colors"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2 border border-primary-foreground/30 hover:border-primary-foreground transition-colors"
                    aria-label="Siguiente"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeriaCarousel;
