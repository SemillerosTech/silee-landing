import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RegistrosClient } from "./RegistrosClient";

import { isRegistrosAuthed, login, logout } from "./actions";

type Registro = {
  id: number;
  nombre: string;
  correo: string;
  telefono: string | null;
  mensaje: string | null;
  origen: string | null;
  como_te_describes: string | null;
  creado_en: string;
};

async function getRegistros(): Promise<Registro[]> {
  const apiUrl = process.env.REGISTROS_API_URL;
  
  if (!apiUrl) {
    throw new Error("REGISTROS_API_URL is not defined in environment variables");
  }

  const res = await fetch(
    apiUrl,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(`Error fetching registros: ${res.status}`);
  }

  const data = (await res.json()) as unknown;
  if (!Array.isArray(data)) return [];

  return data as Registro[];
}

export default async function RegistrosPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const authed = await isRegistrosAuthed();

  if (!authed) {
    const hasError = searchParams?.error === "1";
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Registros</CardTitle>
            <CardDescription>
              Ingresa la contraseña para acceder al módulo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={login} className="space-y-4">
              <Input
                name="password"
                type="password"
                placeholder="Contraseña"
                autoComplete="current-password"
                required
              />
              {hasError ? (
                <p className="text-sm text-destructive">
                  Contraseña incorrecta.
                </p>
              ) : null}
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    );
  }

  const registros = await getRegistros();

  return (
    <main className="min-h-screen p-6 bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src="/assets/simply-logo-silee.svg"
              alt="SILEE Logo"
              className="h-10 sm:h-14 w-auto object-contain shrink-0"
            />
            <div className="space-y-0.5 sm:space-y-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Panel de Registros
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground line-clamp-2 sm:line-clamp-none">
                Gestiona y filtra los prospectos capturados a través del formulario.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex items-center gap-2 sm:gap-3">
            <Button asChild variant="outline" className="shadow-sm w-full lg:w-auto h-11 sm:h-10">
              <a href="/registros/csv" className="flex items-center justify-center">
                Descargar CSV
              </a>
            </Button>
            <form action={logout} className="w-full lg:w-auto">
              <Button
                type="submit"
                variant="ghost"
                className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 h-11 sm:h-10"
              >
                Cerrar sesión
              </Button>
            </form>
          </div>
        </div>

        <RegistrosClient initialRegistros={registros} />
      </div>
    </main>
  );
}
