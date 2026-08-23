#!/usr/bin/env bun
// Envoie le rapport PDF hebdomadaire à tous les abonnés.
// Usage : ~/.bun/bin/bun run send-report.ts <rapport.pdf>
// Les emails sont lus depuis abonnes.txt (un email par ligne)

import { readFileSync, existsSync } from "fs";
import { basename, resolve } from "path";

const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.FROM_EMAIL ?? "PARADOXI Observatory <newsletter@paradoxi.io>";
const siteUrl = process.env.PUBLIC_URL ?? "https://paradoxi-observatory.com";

if (!apiKey) { console.error("Erreur : RESEND_API_KEY manquant dans .env"); process.exit(1); }

// ─── Lecture emails ───────────────────────────────────────────────────────────

function fetchContacts(): string[] {
  const emailsFile = resolve(process.cwd(), "abonnes.txt");
  if (!existsSync(emailsFile)) {
    console.error(`Fichier abonnes.txt introuvable.`);
    console.error(`Crée le fichier : ${emailsFile}`);
    console.error(`Contenu : un email par ligne.`);
    process.exit(1);
  }
  const lines = readFileSync(emailsFile, "utf-8").split("\n");
  return lines
    .map(l => l.trim())
    .filter(l => l && l.includes("@") && !l.startsWith("#"));
}

// ─── PDF ──────────────────────────────────────────────────────────────────────

const pdfPath = process.argv[2];
if (!pdfPath) {
  console.error("Usage : bun run send-report.ts <chemin-vers-rapport.pdf>");
  process.exit(1);
}

let pdfBuffer: Buffer;
try {
  pdfBuffer = readFileSync(pdfPath);
} catch {
  console.error(`Fichier introuvable : ${pdfPath}`);
  process.exit(1);
}

const pdfBase64 = pdfBuffer.toString("base64");
const pdfFilename = basename(pdfPath);

// ─── Envoi email ──────────────────────────────────────────────────────────────

async function sendTo(email: string, week: number, year: number): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [email],
      subject: `PARADOXI Observatory — Rapport Fondamental Hebdomadaire S${week}/${year}`,
      html: buildEmailHtml(week, year),
      attachments: [{ filename: pdfFilename, content: pdfBase64 }],
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { message?: string };
    throw new Error(err.message ?? `Erreur ${res.status}`);
  }
}

// ─── Email HTML ───────────────────────────────────────────────────────────────

function buildEmailHtml(week: number, year: number): string {
  return `<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <title>Rapport Fondamental Hebdomadaire S${week}</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0 !important; padding: 0 !important; background-color: #07070b !important; }
    table { border-collapse: collapse; }
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .headline { font-size: 32px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#07070b;">

  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    Votre Rapport Fondamental Hebdomadaire Semaine ${week} est disponible en pièce jointe.&nbsp;&#847;&nbsp;&#847;&nbsp;&#847;&nbsp;&#847;&nbsp;&#847;&nbsp;
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#07070b">
    <tr>
      <td align="center" style="padding:72px 24px 64px;background-color:#07070b;">
        <table role="presentation" class="email-container" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:48px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right:10px;vertical-align:middle;">
                    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="24" cy="24" r="21" stroke="#ffffff" stroke-width="2"/>
                      <circle cx="24" cy="24" r="13" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2 3"/>
                      <path d="M24 10 C30 14 32 22 28 30 C24 27 21 24 22 18 C22.5 14 23 11 24 10Z" fill="#ffffff"/>
                    </svg>
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#ffffff;">PARADOXI<br>OBSERVATORY</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Surtitre vert -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <span style="font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#50dc96;">
                L&rsquo;OBSERVATOIRE DES MARCH&Eacute;S
              </span>
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <h1 class="headline" style="margin:0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:42px;font-weight:900;line-height:1.1;color:#ffffff;letter-spacing:-0.01em;text-transform:uppercase;text-align:center;">
                SUIVEZ CHAQUE<br>EX&Eacute;CUTION,<br>CHAQUE SEMAINE.
              </h1>
            </td>
          </tr>

          <!-- Sous-titre -->
          <tr>
            <td align="center" style="padding-bottom:40px;">
              <p style="margin:0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#888899;text-align:center;max-width:420px;">
                Analyses d&eacute;taill&eacute;es, setups en direct et journal de trading transparent.<br>
                Votre rapport <strong style="color:#c0c0d0;">Semaine ${week}/${year}</strong> est disponible en pi&egrave;ce jointe.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#50dc96;border-radius:50px;">
                    <a href="${siteUrl}" style="display:inline-block;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;color:#07070b;text-decoration:none;padding:16px 40px;letter-spacing:0.02em;">
                      S&rsquo;inscrire gratuitement &nbsp;&rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- URL -->
          <tr>
            <td align="center" style="padding-bottom:56px;">
              <a href="${siteUrl}" style="font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:12px;color:#444455;text-decoration:none;letter-spacing:0.08em;">
                paradoxi-observatory.com
              </a>
            </td>
          </tr>

          <!-- Disclaimer -->
          <tr>
            <td align="center">
              <p style="margin:0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:10px;color:#2a2a3a;line-height:1.8;text-align:center;">
                Le trading comporte un risque de perte en capital. Les performances pass&eacute;es ne pr&eacute;jugent pas des r&eacute;sultats futurs.<br>
                Contenu &eacute;ducatif uniquement &middot; Pas un conseil en investissement &middot; &copy; ${year} PARADOXI Observatory
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

// ─── Main ─────────────────────────────────────────────────────────────────────

function getWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

async function main() {
  const now = new Date();
  const week = getWeekNumber(now);
  const year = now.getFullYear();

  console.log(`\nPARADOXI Observatory — Envoi du rapport`);
  console.log(`PDF     : ${pdfFilename} (${(pdfBuffer.length / 1024).toFixed(0)} KB)`);
  console.log(`Edition : Semaine ${week}/${year}\n`);

  const contacts = fetchContacts();

  if (contacts.length === 0) {
    console.log("Aucun email trouvé dans abonnes.txt.");
    process.exit(0);
  }

  console.log(`${contacts.length} abonné(s)\n`);

  let sent = 0;
  let failed = 0;

  for (const email of contacts) {
    try {
      await sendTo(email, week, year);
      console.log(`  ok  ${email}`);
      sent++;
      await new Promise(r => setTimeout(r, 150));
    } catch (err) {
      console.error(`  err ${email} — ${err instanceof Error ? err.message : err}`);
      failed++;
    }
  }

  console.log(`\nTerminé : ${sent} envoyé(s)${failed > 0 ? `, ${failed} erreur(s)` : ""}\n`);
}

main();
