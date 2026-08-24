import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { appendToSheet } from "@/lib/google-sheets";
import { createConfirmToken, verifyConfirmToken } from "@/lib/report-token";
import { REPORT } from "@/config/report";

// ─── Emails ────────────────────────────────────────────────────────────────

function buildConfirmEmailHtml(confirmUrl: string): string {
  return `<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <title>Confirmez votre email — PARADOXI Observatory</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0 !important; padding: 0 !important; background-color: #07070b !important; }
    table { border-collapse: collapse; }
    @media only screen and (max-width: 600px) { .email-container { width: 100% !important; } }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#07070b;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    Confirmez votre email pour recevoir l'édition d'exemple du Rapport Fondamental Hebdomadaire.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#07070b">
    <tr>
      <td align="center" style="padding:48px 16px 60px;background-color:#07070b;">
        <table role="presentation" class="email-container" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
          <tr>
            <td align="center" style="padding-bottom:40px;">
              <span style="font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#f0f0f5;">PARADOXI OBSERVATORY</span>
            </td>
          </tr>
          <tr>
            <td style="background-color:#0c0c14;border:1px solid #1e1e2c;border-radius:20px;overflow:hidden;padding:40px;">
              <h1 style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;line-height:1.3;color:#f0f0f5;letter-spacing:-0.01em;">
                Confirmez votre email pour recevoir l'édition d'exemple.
              </h1>
              <p style="margin:0 0 28px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#7878a0;">
                Un clic, et le rapport arrive dans la même minute.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#50dc96;border-radius:50px;">
                    <a href="${confirmUrl}" style="display:inline-block;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;color:#07070b;text-decoration:none;padding:14px 32px;">
                      Confirmer et recevoir le rapport →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:11px;color:#3a3a52;line-height:1.6;">
                Ce lien expire dans 48h. Contenu éducatif uniquement · Pas un conseil en investissement.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildReportDeliveryHtml(): string {
  return `<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <title>Votre rapport — PARADOXI Observatory</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0 !important; padding: 0 !important; background-color: #07070b !important; }
    table { border-collapse: collapse; }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#07070b;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    Votre édition d'exemple du Rapport Fondamental Hebdomadaire est en pièce jointe.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#07070b">
    <tr>
      <td align="center" style="padding:48px 16px 60px;background-color:#07070b;">
        <table role="presentation" class="email-container" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
          <tr>
            <td align="center" style="padding-bottom:40px;">
              <span style="font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#f0f0f5;">PARADOXI OBSERVATORY</span>
            </td>
          </tr>
          <tr>
            <td style="background-color:#0c0c14;border:1px solid #1e1e2c;border-radius:20px;overflow:hidden;padding:40px;">
              <h1 style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;line-height:1.3;color:#f0f0f5;letter-spacing:-0.01em;">
                Votre rapport est en pièce jointe.
              </h1>
              <p style="margin:0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#7878a0;">
                8 devises, biais directionnels, anticipations de banques centrales et paires sous surveillance —
                comme chaque dimanche.
              </p>
              <p style="margin:24px 0 0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:11px;color:#3a3a52;line-height:1.6;">
                Contenu éducatif uniquement · Pas un conseil en investissement.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Étape 1 : demande d'accès ────────────────────────────────────────────────

export const requestReportAccess = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().email("Adresse email invalide"),
      src: z.string().max(100).optional(),
      // Honeypot — un humain laisse ce champ vide. Un bot le remplit souvent.
      // Pas de contrainte de longueur ici : on veut ACCEPTER une valeur remplie
      // pour pouvoir la détecter dans le handler, pas la rejeter à la validation.
      website: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    // Honeypot rempli → on répond succès sans rien envoyer, silencieusement.
    if (data.website) {
      return { success: true };
    }

    const ip = getRequest().headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    const { allowed, retryAfterSec } = checkRateLimit(ip, { max: 5, windowMs: 60_000 });
    if (!allowed) throw new Error(`Trop de tentatives. Réessayez dans ${retryAfterSec}s.`);

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL ?? "PARADOXI Observatory <onboarding@resend.dev>";
    const baseUrl = process.env.PUBLIC_URL ?? "https://paradoxi.vercel.app";
    const src = data.src || "direct";

    const token = await createConfirmToken(data.email, src);
    const confirmUrl = `${baseUrl}/rapport/confirmer?token=${encodeURIComponent(token)}`;

    if (!apiKey) {
      if (process.env.NODE_ENV !== "production") {
        console.log(`[report] Dev mode — no RESEND_API_KEY. Confirm URL: ${confirmUrl}`);
        return { success: true };
      }
      throw new Error("Configuration email manquante");
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: fromEmail,
        to: [data.email],
        subject: "Confirmez votre email — votre rapport PARADOXI Observatory",
        html: buildConfirmEmailHtml(confirmUrl),
      }),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as Record<string, string>;
      throw new Error(body["message"] ?? "Envoi de la confirmation échoué, veuillez réessayer.");
    }

    appendToSheet("Evenements", [new Date().toISOString(), "rapport_submit", src]).catch(() => {});

    return { success: true };
  });

// ─── Étape 2 : confirmation (double opt-in) + livraison automatique ──────────

export const confirmReportAccess = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    const { email, src } = await verifyConfirmToken(data.token);

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL ?? "PARADOXI Observatory <onboarding@resend.dev>";
    const audienceId = process.env.RESEND_AUDIENCE_ID_RAPPORT;

    // Liste Resend dédiée à ce flux, distincte de la newsletter générale.
    if (audienceId && apiKey) {
      const r = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ email, unsubscribed: false }),
      });
      if (!r.ok && r.status !== 409) {
        console.error("[report] audience add failed:", r.status, await r.text().catch(() => ""));
      }
    }

    // Resend ne permet pas d'attribut personnalisé (ex. source) sur un contact —
    // on la journalise donc dans Google Sheets, comme le reste du suivi des leads.
    appendToSheet("RapportLeads", [new Date().toISOString(), email, src, "confirmed"]).catch(() => {});
    appendToSheet("Evenements", [new Date().toISOString(), "rapport_confirmed", src]).catch(() => {});

    if (!apiKey) {
      if (process.env.NODE_ENV !== "production") {
        console.log(`[report] Dev mode — no RESEND_API_KEY, skipping PDF send for: ${email}`);
        return { success: true, email };
      }
      throw new Error("Configuration email manquante");
    }

    const pdfPath = path.join(process.cwd(), "public", REPORT.pdfPublicPath.replace(/^\//, ""));
    const pdfBuffer = await readFile(pdfPath);
    const pdfBase64 = pdfBuffer.toString("base64");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        subject: "Votre rapport PARADOXI Observatory (édition d'exemple)",
        html: buildReportDeliveryHtml(),
        attachments: [{ filename: REPORT.pdfFilename, content: pdfBase64 }],
      }),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as Record<string, string>;
      throw new Error(body["message"] ?? "Envoi du rapport échoué, veuillez réessayer.");
    }

    return { success: true, email };
  });
