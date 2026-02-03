import { useState } from "react";
import { toast } from "sonner";

type VisitorType = "" | "student" | "direct-buyer";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    visitorType: "" as VisitorType,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.visitorType
    ) {
      toast.error("Por favor completa todos los campos obligatorios.");
      return;
    }

    if (formData.name.length > 100) {
      toast.error("El nombre no puede exceder los 100 caracteres.");
      return;
    }

    if (formData.email.length > 255) {
      toast.error("El correo electrónico no puede exceder los 255 caracteres.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Por favor ingresa un correo electrónico válido.");
      return;
    }

    if (formData.message.length > 1000) {
      toast.error("El mensaje no puede exceder los 1000 caracteres.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        nombre: formData.name,
        correo: formData.email,
        comoTeDescribes:
          formData.visitorType === "student"
            ? "estudiante"
            : formData.visitorType === "direct-buyer"
              ? "comprador directo"
              : "",
        mensaje: formData.message,
        origen: "Landing SILEE",
      };

      const res = await fetch(
        "https://semilleros-lazox-newsletter.vercel.app/register/form",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al enviar el formulario");
      }

      toast.success(
        "Gracias por tu interés. Nos pondremos en contacto contigo pronto.",
      );
      setFormData({ name: "", email: "", visitorType: "", message: "" });
    } catch (error) {
      toast.error("No se pudo enviar tu registro. Inténtalo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="section-padding bg-silee-cream">
      <div className="content-container">
        <div className="max-w-2xl mx-auto">
          <span className="text-sm font-medium tracking-widest text-silee-teal uppercase mb-4 block">
            Contacto
          </span>

          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4 leading-tight">
            Conversemos
          </h2>

          <p className="text-reflective text-muted-foreground mb-10">
            Cada proceso es distinto. Queremos saber desde dónde te acercas.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-primary mb-2"
              >
                Nombre <span className="text-silee-teal">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="silee-input"
                placeholder="Tu nombre completo"
                maxLength={100}
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary mb-2"
              >
                Correo electrónico <span className="text-silee-teal">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="silee-input"
                placeholder="tu@correo.com"
                maxLength={255}
                required
              />
            </div>

            <div>
              <label
                htmlFor="visitorType"
                className="block text-sm font-medium text-primary mb-2"
              >
                ¿Cómo te describes? <span className="text-silee-teal">*</span>
              </label>
              <div className="relative">
                <select
                  id="visitorType"
                  value={formData.visitorType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      visitorType: e.target.value as VisitorType,
                    }))
                  }
                  className="silee-select"
                  required
                >
                  <option value="">Selecciona una opción</option>
                  <option value="student">
                    Estudiante — Interesado/a en formación
                  </option>
                  <option value="direct-buyer">
                    Comprador directo — Interesado/a en obras de Viktor Frankl
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg
                    className="h-4 w-4 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-primary mb-2"
              >
                Mensaje{" "}
                <span className="text-muted-foreground font-normal">
                  (opcional)
                </span>
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                className="silee-input min-h-[120px] resize-none"
                placeholder="¿Hay algo específico que quieras compartir o preguntar?"
                maxLength={1000}
                rows={4}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                {formData.message.length}/1000 caracteres
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-primary text-primary-foreground font-medium tracking-wide 
                       hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
