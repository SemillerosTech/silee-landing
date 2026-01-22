import Image from "next/image";
const logo = "/assets/simply-logo-silee.svg";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="content-container py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <Image
            src={logo}
            alt="SILEE"
            width={112}
            height={48}
            className="h-12 w-auto"
          />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#que-es"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            ¿Qué es SILEE?
          </a>
          <a
            href="#rosa-adelaida"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Rosa Adelaida
          </a>
          <a
            href="#feria"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Feria Colofón
          </a>
          <a
            href="#contacto"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
