import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator(z.object({ email: z.string().email("Adresse email invalide") }))
  .handler(async ({ data }) => {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const priceId = process.env.STRIPE_PRICE_ID;
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
        mode: "subscription",
        customer_email: data.email,
        success_url: `${baseUrl}/merci?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/#pricing`,
        "subscription_data[trial_period_days]": "7",
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
