// Suivi d'événements minimal — journalise dans Google Sheets (déjà utilisé
// pour les abonnés), pas de nouvel outil, pas de cookie, donc pas de bandeau
// de consentement nécessaire : aucune identification persistante côté client,
// juste des événements ponctuels envoyés au serveur.

import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { appendToSheet } from "@/lib/google-sheets";

export const trackEvent = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      event: z.enum([
        "rapport_view",
        "rapport_submit",
        "rapport_confirmed",
        "abonnement_view",
        "checkout_start",
      ]),
      src: z.string().max(100).optional(),
    }),
  )
  .handler(async ({ data }) => {
    // Rate-limit large — un événement de navigation normal, pas une action
    // sensible, mais on évite qu'un abus ne remplisse la feuille.
    const ip = getRequest().headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    const { allowed } = checkRateLimit(`track:${ip}`, { max: 30, windowMs: 60_000 });
    if (!allowed) return { success: false };

    appendToSheet("Evenements", [new Date().toISOString(), data.event, data.src || "direct"]).catch(() => {});
    return { success: true };
  });
