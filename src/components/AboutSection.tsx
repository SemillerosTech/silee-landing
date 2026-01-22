const AboutSection = () => {
  return (
    <section id="que-es" className="section-padding bg-background">
      <div className="content-container">
        <div className="max-w-3xl mx-auto">
          <span className="text-sm font-medium tracking-widest text-silee-teal uppercase mb-4 block">
            Sobre nosotros
          </span>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8 leading-tight">
            ¿Qué es SILEE?
          </h2>
          
          <div className="space-y-6 text-reflective text-muted-foreground">
            <p>
              <strong className="text-foreground font-medium">SILEE</strong> — Sistema Integral de Logoterapia 
              y Educación Existencial — es un proyecto educativo que nace de la convicción de que 
              <em> aprender con sentido transforma</em>.
            </p>
            
            <p>
              No ofrecemos fórmulas rápidas ni promesas vacías. Proponemos un espacio de reflexión 
              profunda, donde el conocimiento de uno mismo y la búsqueda de significado se convierten 
              en el eje de toda formación.
            </p>
            
            <p>
              Inspirados en la logoterapia de Viktor Frankl, creemos que el ser humano puede 
              encontrar sentido incluso en las circunstancias más difíciles. Esta visión guía 
              cada uno de nuestros programas, talleres y acompañamientos.
            </p>
            
            <p>
              SILEE es para quienes buscan algo más que información: para quienes desean 
              <em> comprensión, dirección y profundidad</em>.
            </p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border">
            <blockquote className="text-lg md:text-xl italic text-primary font-light">
              "Quien tiene un porqué para vivir, encontrará casi siempre el cómo."
            </blockquote>
            <cite className="block mt-3 text-sm text-muted-foreground not-italic">
              — Viktor Frankl
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
