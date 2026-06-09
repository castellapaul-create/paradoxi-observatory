import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// ─── Google Sheets helpers (Web Crypto — compatible Edge Runtime) ─────────────

function toBase64Url(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

async function createGoogleJwt(saEmail: string, privateKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = toBase64Url(new TextEncoder().encode(JSON.stringify({ alg: "RS256", typ: "JWT" })));
  const payload = toBase64Url(new TextEncoder().encode(JSON.stringify({
    iss: saEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  })));

  const signingInput = `${header}.${payload}`;

  // PEM → DER (handles both PKCS8 and RSA PRIVATE KEY headers)
  const pemBody = privateKey
    .replace(/-----[^-]+-----/g, "")
    .replace(/\s/g, "");
  const der = Uint8Array.from(atob(pemBody), c => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    der,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const sig = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(signingInput),
  );

  return `${signingInput}.${toBase64Url(sig)}`;
}

async function getGoogleToken(saEmail: string, privateKey: string): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: await createGoogleJwt(saEmail, privateKey),
    }),
  });
  const json = await res.json() as { access_token?: string };
  if (!json.access_token) throw new Error("Google OAuth échoué");
  return json.access_token;
}

async function logToGoogleSheets(email: string): Promise<void> {
  const saEmail = process.env.GOOGLE_SA_EMAIL;
  const privateKey = process.env.GOOGLE_SA_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!saEmail || !privateKey || !sheetId) return;

  try {
    const token = await getGoogleToken(saEmail, privateKey);
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Abonnés!A:D:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [[new Date().toISOString(), email, "website", "active"]],
        }),
      }
    );
  } catch (err) {
    console.error("[sheets] logging failed:", err);
  }
}

function buildWelcomeHtml(): string {
  const year = new Date().getFullYear();
  const siteUrl = process.env.PUBLIC_URL ?? "https://paradoxi.vercel.app";
  return `<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>Bienvenue dans PARADOXI Observatory</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    body { margin: 0 !important; padding: 0 !important; background-color: #07070b !important; }
    table { border-collapse: collapse; }
    img { border: 0; display: block; }
    .email-body { background-color: #07070b !important; }
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .stack-on-mobile { display: block !important; width: 100% !important; }
      .pad-mobile { padding-left: 20px !important; padding-right: 20px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#07070b;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

  <!-- Preview text (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    Votre accès à la lecture macro institutionnelle hebdomadaire est confirmé — première édition dimanche soir.&nbsp;&#847;&nbsp;&#847;&nbsp;&#847;&nbsp;&#847;&nbsp;&#847;&nbsp;&#847;&nbsp;&#847;&nbsp;&#847;&nbsp;&#847;&nbsp;
  </div>

  <table role="presentation" class="email-body" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#07070b">
    <tr>
      <td align="center" style="padding:48px 16px 60px;background-color:#07070b;">
        <table role="presentation" class="email-container" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

          <!-- ═══ LOGO ═══ -->
          <tr>
            <td align="center" style="padding-bottom:40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right:10px;vertical-align:middle;">
                    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="24" cy="24" r="21" stroke="#50dc96" stroke-width="2.5"/>
                      <path d="M24 12c7 4 9 11 6 18-4-3-7-5-9-9-1.5-3-1-6 3-9Z" fill="#50dc96"/>
                    </svg>
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#f0f0f5;">PARADOXI OBSERVATORY</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══ MAIN CARD ═══ -->
          <tr>
            <td style="background-color:#0c0c14;border:1px solid #1e1e2c;border-radius:20px;overflow:hidden;">

              <!-- Top accent line -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td height="2" style="background:linear-gradient(90deg,transparent 0%,#50dc96 35%,#50dc96 65%,transparent 100%);font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>

              <!-- Header section -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="pad-mobile" style="padding:40px 40px 32px;background:linear-gradient(180deg,rgba(80,220,150,0.07) 0%,transparent 100%);">

                    <!-- Badge -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                      <tr>
                        <td style="background-color:rgba(80,220,150,0.1);border:1px solid rgba(80,220,150,0.25);border-radius:50px;padding:5px 14px;">
                          <span style="font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#50dc96;">
                            &#9679;&nbsp; Inscription confirmée
                          </span>
                        </td>
                      </tr>
                    </table>

                    <h1 style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:700;line-height:1.2;color:#f0f0f5;letter-spacing:-0.02em;">
                      Bienvenue dans<br>l'Observatory.
                    </h1>
                    <p style="margin:0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#7878a0;">
                      Votre accès est confirmé. Chaque dimanche soir, vous recevrez le
                      <strong style="color:#c8c8e0;font-weight:600;">Rapport Fondamental Hebdomadaire</strong> —
                      la même lecture analytique que celle des desks institutionnels.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Separator -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:0 40px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr><td height="1" style="background-color:#1a1a26;font-size:0;line-height:0;">&nbsp;</td></tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Features -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="pad-mobile" style="padding:28px 40px 8px;">
                    <p style="margin:0 0 20px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#50dc96;">
                      Ce que vous recevez chaque semaine
                    </p>
                  </td>
                </tr>
              </table>

              ${[
                ["Macro Framework & FX Scorecard", "Régime de marché, hiérarchie des catalyseurs et biais directionnels de la semaine."],
                ["Central Bank Watch", "Positionnement des banques centrales et anticipations de taux implicites."],
                ["Weekly Bias par devise", "Conviction directionnelle pour USD, EUR, GBP, JPY — validée par le PCI."],
                ["Watchlist Forex", "Paires sous surveillance avec thèse directionnelle et niveaux structurants."],
              ].map(([title, desc], i, arr) => `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="pad-mobile" style="padding:0 40px ${i === arr.length - 1 ? "28" : "0"}px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom:1px solid #14141e;">
                      <tr>
                        <td width="28" style="vertical-align:top;padding:14px 0 14px;color:#50dc96;font-family:monospace;font-size:14px;font-weight:700;">→</td>
                        <td style="padding:14px 0;">
                          <strong style="display:block;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;color:#dcdcf0;margin-bottom:3px;">${title}</strong>
                          <span style="font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:12px;color:#5a5a7a;line-height:1.55;">${desc}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>`).join("")}

              <!-- Separator -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:0 40px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr><td height="1" style="background-color:#1a1a26;font-size:0;line-height:0;">&nbsp;</td></tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="pad-mobile" align="center" style="padding:32px 40px 40px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background-color:#50dc96;border-radius:50px;">
                          <a href="${siteUrl}" style="display:inline-block;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;color:#07070b;text-decoration:none;padding:14px 32px;letter-spacing:0.02em;">
                            Découvrir l'Observatory →
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:16px 0 0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:11px;color:#3a3a52;line-height:1.6;">
                      Contenu éducatif uniquement · Pas un conseil en investissement · Désabonnement en un clic
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ═══ FOOTER ═══ -->
          <tr>
            <td align="center" style="padding-top:40px;">

              <!-- Social links -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:0 8px;">
                    <a href="https://www.linkedin.com/in/paul-c-977b70153" style="font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;color:#3a3a58;text-decoration:none;letter-spacing:0.06em;">LINKEDIN</a>
                  </td>
                  <td style="padding:0 8px;color:#1e1e2e;">·</td>
                  <td style="padding:0 8px;">
                    <a href="https://www.instagram.com/paradoxi.observatory" style="font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;color:#3a3a58;text-decoration:none;letter-spacing:0.06em;">INSTAGRAM</a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:11px;color:#28283c;line-height:2;">
                &copy; ${year} PARADOXI Observatory &middot; Tous droits réservés
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

export const subscribeEmail = createServerFn({ method: "POST" })
  .inputValidator(z.object({ email: z.string().email("Adresse email invalide") }))
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    const fromEmail = process.env.FROM_EMAIL ?? "PARADOXI Observatory <onboarding@resend.dev>";

    if (!apiKey) {
      if (process.env.NODE_ENV !== "production") {
        console.log(`[subscribe] Dev mode — no RESEND_API_KEY, skipping send for: ${data.email}`);
        return { success: true };
      }
      throw new Error("Configuration email manquante");
    }

    // Add to Resend audience/contacts list (optional)
    if (audienceId) {
      const r = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, unsubscribed: false }),
      });
      // 409 = contact already exists, that's fine
      if (!r.ok && r.status !== 409) {
        console.error("[subscribe] audience add failed:", r.status, await r.text().catch(() => ""));
      }
    }

    // Log to Google Sheets (non-blocking)
    logToGoogleSheets(data.email).catch(() => {});

    // Send welcome email
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [data.email],
        subject: "Bienvenue dans PARADOXI Observatory — votre prochaine édition arrive dimanche.",
        html: buildWelcomeHtml(),
      }),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as Record<string, string>;
      throw new Error(body["message"] ?? "Envoi de la confirmation échoué, veuillez réessayer.");
    }

    return { success: true };
  });
