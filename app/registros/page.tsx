import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const res = await fetch(
    "https://semilleros-lazox-newsletter.vercel.app/form",
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
    <main className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">Registros</h1>
          <form action={logout}>
            <Button type="submit" variant="outline">
              Cerrar sesión
            </Button>
          </form>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Correo</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Mensaje</TableHead>
                  <TableHead>Origen</TableHead>
                  <TableHead>Cómo te describes</TableHead>
                  <TableHead>Creado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registros.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="whitespace-nowrap">{r.id}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {r.nombre}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {r.correo}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {r.telefono ?? "—"}
                    </TableCell>
                    <TableCell className="min-w-[220px]">
                      {r.mensaje ?? "—"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {r.origen ?? "—"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {r.como_te_describes ?? "—"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {new Date(r.creado_en).toLocaleString("es-MX")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {registros.length === 0 ? (
              <p className="text-sm text-muted-foreground mt-4">
                No hay registros para mostrar.
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
