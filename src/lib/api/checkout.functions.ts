import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { isOnWaitlist } from "@/lib/waitlist";

export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator(z.object({ email: z.string().email("Adresse email invalide"), src: z.string().max(100).optional() }))
  .handler(async ({ data }) => {
    const ip = getRequest().headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    const { allowed, retryAfterSec } = checkRateLimit(ip, { max: 5, windowMs: 60_000 });
    if (!allowed) throw new Error(`Trop de tentatives. Réessayez dans ${retryAfterSec}s.`);

    const secretKey = process.env.STRIPE_SECRET_KEY;
    const priceId = isOnWaitlist(data.email)
      ? process.env.STRIPE_PRICE_ID_WAITLIST
      : process.env.STRIPE_PRICE_ID_STANDARD;
    const baseUrl = process.env.PUBLIC_URL ?? "https://paradoxi.vercel.app";

    if (!secretKey || !priceId) {
      throw new Error("Le paiement n'est pas encore ouvert — rejoignez la liste d'attente gratuite.");
    }

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "line_items[0][price]": priceId,
        "line_items[0][quantity]": "1",
        "payment_method_types[0]": "card",
        mode: "subscription",
        customer_email: data.email,
        // Conserve la source (?src=) jusque dans le tableau de bord Stripe.
        client_reference_id: data.src || "direct",
        success_url: `${baseUrl}/merci?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/#pricing`,
        locale: "fr",
      }),
    });

    if (!res.ok) {
      const err = await res.json() as { error?: { message?: string } };
      throw new Error(err.error?.message ?? "Erreur lors de la création de la session de paiement.");
    }

    const session = await res.json() as { url?: string };
    if (!session.url) throw new Error("Session Stripe invalide");
    return { url: session.url };
  });
