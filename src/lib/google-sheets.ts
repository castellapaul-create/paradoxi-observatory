// Helper Google Sheets partagé — journalisation des abonnés, des leads
// /rapport et des événements de suivi (voir src/lib/api/track.functions.ts).
// Web Crypto (Edge Runtime compatible), pas de dépendance ajoutée.

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
  const der = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

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
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) throw new Error("Google OAuth échoué");
  return json.access_token;
}

/**
 * Ajoute une ligne à l'onglet `sheetTab` du Google Sheet configuré via env.
 * Ne lève jamais — best-effort, silencieux si la config manque ou si l'appel échoue
 * (la journalisation ne doit jamais bloquer un flux utilisateur).
 */
export async function appendToSheet(sheetTab: string, values: (string | number)[]): Promise<void> {
  const saEmail = process.env.GOOGLE_SA_EMAIL;
  const privateKey = process.env.GOOGLE_SA_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!saEmail || !privateKey || !sheetId) return;

  try {
    const token = await getGoogleToken(saEmail, privateKey);
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetTab)}!A:Z:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [values] }),
      },
    );
  } catch (err) {
    console.error(`[sheets:${sheetTab}] logging failed:`, err);
  }
}
