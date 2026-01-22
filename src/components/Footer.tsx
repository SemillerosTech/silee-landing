const logo = "/assets/logo-white-silee.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-primary text-primary-foreground">
      <div className="content-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <img src={logo} alt="SILEE" className="h-14 w-auto" />
            <div>
              <span className="block text-xs opacity-70 ">
                Sistema Integral de Logoterapia y Educación Existencial
              </span>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm opacity-70">
              © {currentYear} SILEE. Todos los derechos reservados.
            </p>
            <p className="text-xs opacity-50 mt-1">Semilleros de Sentido</p>
            <p className="text-xs opacity-50">
              Powered by{" "}
              <a
                href="https://hypernetics.com.mx/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
              >
                Hypernetics
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
