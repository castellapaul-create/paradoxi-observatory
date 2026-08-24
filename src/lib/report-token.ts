// Jeton de confirmation (double opt-in) pour /rapport — sans base de données.
// Le jeton encode email + source + expiration, signé en HMAC-SHA256.
// Web Crypto (crypto.subtle) plutôt que le module "crypto" de Node, pour
// rester compatible Edge Runtime — même choix que dans subscribe.functions.ts.

import { REPORT } from "@/config/report";

function toBase64Url(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function fromBase64Url(str: string): Uint8Array {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const withPad = padded + "===".slice((padded.length + 3) % 4);
  return Uint8Array.from(atob(withPad), (c) => c.charCodeAt(0));
}

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function getSecret(): string {
  const secret = process.env.REPORT_TOKEN_SECRET;
  if (!secret) throw new Error("REPORT_TOKEN_SECRET manquant — configurez la variable d'environnement.");
  return secret;
}

export type ConfirmTokenPayload = { email: string; src: string; exp: number };

export async function createConfirmToken(email: string, src: string): Promise<string> {
  const payload: ConfirmTokenPayload = {
    email: email.trim().toLowerCase(),
    src: src || "direct",
    exp: Date.now() + REPORT.confirmTokenTtlMs,
  };
  const payloadB64 = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const key = await getKey(getSecret());
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payloadB64));
  return `${payloadB64}.${toBase64Url(sig)}`;
}

export async function verifyConfirmToken(token: string): Promise<ConfirmTokenPayload> {
  const [payloadB64, sigB64] = token.split(".");
  if (!payloadB64 || !sigB64) throw new Error("Lien invalide.");

  const key = await getKey(getSecret());
  const sigBytes = fromBase64Url(sigB64);
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    sigBytes.buffer.slice(sigBytes.byteOffset, sigBytes.byteOffset + sigBytes.byteLength) as ArrayBuffer,
    new TextEncoder().encode(payloadB64),
  );
  if (!valid) throw new Error("Lien invalide.");

  const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(payloadB64))) as ConfirmTokenPayload;
  if (Date.now() > payload.exp) throw new Error("Ce lien a expiré — refaites la demande.");

  return payload;
}
