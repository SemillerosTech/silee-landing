import Link from "next/link";

const RosaAdelaidaSection = () => {
  return (
    <section id="rosa-adelaida" className="section-padding bg-silee-cream">
      <div className="content-container">
        <div className="max-w-3xl mx-auto">
          <span className="text-sm font-medium tracking-widest text-silee-teal uppercase mb-4 block">
            Fundadora
          </span>

          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8 leading-tight">
            Rosa Adelaida
            <Link
              href={
                "https://www.semillerosdesentido.org/rosa-adelaida/curriculum"
              }
              className="text-fg-brand-strong text-sm font-medium px-2 py-1 rounded"
            >
              Ver perfil completo {">>"}
            </Link>
          </h2>

          <div className="space-y-6 text-reflective text-muted-foreground">
            <p>
              Logoterapeuta certificada y educadora con más de dos décadas de
              experiencia en el acompañamiento de personas en búsqueda de
              sentido.
            </p>

            <p>
              Su formación en logoterapia —la escuela psicoterapéutica fundada
              por
              <strong className="text-foreground font-medium">
                {" "}
                Viktor E. Frankl
              </strong>
              — le ha permitido desarrollar un enfoque único que integra la
              reflexión existencial con herramientas prácticas para la vida
              cotidiana.
            </p>

            <p>
              Rosa Adelaida no imparte cursos motivacionales. Su trabajo está
              centrado en la
              <em> comprensión profunda del ser humano</em>, en las preguntas
              fundamentales sobre el propósito, el sufrimiento y la libertad
              interior.
            </p>

            <p>
              A través de SILEE, comparte su conocimiento con quienes están
              dispuestos a hacer el trabajo interior necesario para vivir con
              mayor autenticidad y dirección.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <span className="block text-3xl font-semibold text-primary mb-2">
                20+
              </span>
              <span className="text-sm text-muted-foreground">
                Años de experiencia
              </span>
            </div>
            <div className="p-6">
              <span className="block text-3xl font-semibold text-primary mb-2">
                Viktor Frankl
              </span>
              <span className="text-sm text-muted-foreground">
                Escuela logoterapéutica
              </span>
            </div>
            <div className="p-6">
              <span className="block text-3xl font-semibold text-primary mb-2">
                SILEE
              </span>
              <span className="text-sm text-muted-foreground">
                Fundadora y directora
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RosaAdelaidaSection;
