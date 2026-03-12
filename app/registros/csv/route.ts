import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "silee_registros_auth";
const SIGNING_SECRET =
  process.env.REGISTROS_COOKIE_SECRET ?? "SILEE_REGISTROS_COOKIE_SECRET_2026";
const MAX_AGE_SECONDS = 60 * 60 * 8;

function sign(payload: string) {
  return crypto.createHmac("sha256", SIGNING_SECRET).update(payload).digest("hex");
}

function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

function isAuthedFromCookie(): boolean {
  const value = cookies().get(COOKIE_NAME)?.value;
  if (!value) return false;

  const [issuedAtStr, signature] = value.split(".");
  if (!issuedAtStr || !signature) return false;

  const issuedAt = Number(issuedAtStr);
  if (!Number.isFinite(issuedAt)) return false;

  const now = Date.now();
  if (now - issuedAt > MAX_AGE_SECONDS * 1000) return false;

  const expectedSig = sign(issuedAtStr);
  return safeEqual(signature, expectedSig);
}

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

function csvEscape(value: unknown) {
  const s = String(value ?? "");
  const mustQuote = /[\n\r,\"]/g.test(s);
  const escaped = s.replace(/\"/g, '""');
  return mustQuote ? `"${escaped}"` : escaped;
}

function toCsv(rows: Registro[]) {
  const headers = [
    "id",
    "nombre",
    "correo",
    "telefono",
    "mensaje",
    "origen",
    "como_te_describes",
    "creado_en",
  ];

  const lines = [headers.join(",")];

  for (const r of rows) {
    lines.push(
      [
        r.id,
        r.nombre,
        r.correo,
        r.telefono ?? "",
        r.mensaje ?? "",
        r.origen ?? "",
        r.como_te_describes ?? "",
        r.creado_en,
      ]
        .map(csvEscape)
        .join(",")
    );
  }

  return lines.join("\n") + "\n";
}

export async function GET() {
  if (!isAuthedFromCookie()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const apiUrl = process.env.REGISTROS_API_URL;
  if (!apiUrl) {
    return new Response("REGISTROS_API_URL not defined", { status: 500 });
  }

  const res = await fetch(apiUrl, {
    cache: "no-store",
  });

  if (!res.ok) {
    return new Response("Failed to fetch registros", { status: 502 });
  }

  const data = (await res.json()) as unknown;
  const rows = Array.isArray(data) ? (data as Registro[]) : [];

  const csv = toCsv(rows);

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=registros.csv",
      "Cache-Control": "no-store",
    },
  });
}
