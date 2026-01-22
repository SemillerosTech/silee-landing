import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "SILEE — Sistema Integral de Logoterapia y Educación Existencial",
  description:
    "SILEE es un proyecto educativo que integra la logoterapia de Viktor Frankl con la educación existencial. Un espacio para la reflexión, el sentido y el crecimiento interior.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
