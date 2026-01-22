const EducationalOfferSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="content-container">
        <div className="max-w-3xl mx-auto">
          <span className="text-sm font-medium tracking-widest text-silee-teal uppercase mb-4 block">
            Formación
          </span>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8 leading-tight">
            Oferta Educativa
          </h2>
          
          <div className="space-y-6 text-reflective text-muted-foreground mb-12">
            <p>
              La formación en SILEE no busca acumular información, sino 
              <em> despertar comprensión</em>. Cada programa está diseñado para 
              acompañar un proceso de reflexión genuina sobre el sentido de vida.
            </p>
            
            <p>
              Nuestros cursos y talleres están basados en los principios de la 
              logoterapia y la educación existencial, ofreciendo herramientas 
              conceptuales y prácticas para quienes desean profundizar en su 
              autoconocimiento.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="border-l-2 border-silee-teal pl-6 py-2">
              <h3 className="text-lg font-medium text-primary mb-2">
                Introducción a la Logoterapia
              </h3>
              <p className="text-muted-foreground">
                Un acercamiento a los fundamentos de la tercera escuela vienesa 
                de psicoterapia. Ideal para quienes inician su exploración del sentido.
              </p>
            </div>
            
            <div className="border-l-2 border-silee-teal pl-6 py-2">
              <h3 className="text-lg font-medium text-primary mb-2">
                Seminarios de Sentido
              </h3>
              <p className="text-muted-foreground">
                Espacios de diálogo y reflexión grupal sobre temas existenciales 
                fundamentales: libertad, responsabilidad, sufrimiento y trascendencia.
              </p>
            </div>
            
            <div className="border-l-2 border-silee-teal pl-6 py-2">
              <h3 className="text-lg font-medium text-primary mb-2">
                Acompañamiento Individual
              </h3>
              <p className="text-muted-foreground">
                Procesos personalizados de orientación logoterapéutica para 
                momentos de búsqueda, crisis de sentido o transición vital.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationalOfferSection;
