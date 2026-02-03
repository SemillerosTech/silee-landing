import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "SILEE — Sistema Integral de Logoterapia y Educación Existencial",
  description:
    "SILEE es un proyecto educativo que integra la logoterapia de Viktor Frankl con la educación existencial. Un espacio para la reflexión, el sentido y el crecimiento interior.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return; n=f.fbq=function(){ n.callMethod ?
              n.callMethod.apply(n,arguments) : n.queue.push(arguments) };
              if(!f._fbq) f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0';
              n.queue=[]; t=b.createElement(e); t.async=!0;
              t.src=v; s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
            fbq('init', '1206742474883525');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1206742474883525&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
