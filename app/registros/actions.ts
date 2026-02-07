"use server";

import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "silee_registros_auth";
const PASSWORD = process.env.REGISTROS_PASSWORD ?? "SILEE_REGISTROS_2026";
const SIGNING_SECRET =
  process.env.REGISTROS_COOKIE_SECRET ?? "SILEE_REGISTROS_COOKIE_SECRET_2026";
const MAX_AGE_SECONDS = 60 * 60 * 8;

function sign(payload: string) {
  return crypto
    .createHmac("sha256", SIGNING_SECRET)
    .update(payload)
    .digest("hex");
}

function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

export async function isRegistrosAuthed(): Promise<boolean> {
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

export async function login(formData: FormData) {
  const provided = String(formData.get("password") ?? "");

  if (!safeEqual(provided, PASSWORD)) {
    redirect("/registros?error=1");
  }

  const issuedAtStr = String(Date.now());
  const signature = sign(issuedAtStr);

  cookies().set({
    name: COOKIE_NAME,
    value: `${issuedAtStr}.${signature}`,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/registros",
    maxAge: MAX_AGE_SECONDS,
  });

  redirect("/registros");
}

export async function logout() {
  cookies().set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/registros",
    maxAge: 0,
  });

  redirect("/registros");
}
