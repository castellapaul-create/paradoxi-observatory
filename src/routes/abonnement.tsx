import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PdxStyles } from "@/components/PdxStyles";
import paradoxiLogoLight from "@/assets/paradoxi-logo-light.png";
import { createCheckoutSession } from "@/lib/api/checkout.functions";

export const Route = createFileRoute("/abonnement")({
  head: () => ({
    meta: [
      { title: "PARADOXI Observatory — Abonnement Premium" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AbonnementPage,
});

const FEATURES = [
  "Rapport Macro Hebdomadaire (chaque dimanche, en PDF)",
  "FX Scorecard — force relative des devises",
  "Central Bank Watch — BCE, Fed, BoE, BoJ...",
  "Weekly Bias par devise (PCI-driven)",
  "Watchlist Forex — paires sous surveillance",
  "Décisions de Trades documentées & argumentées",
];

type Status = "idle" | "loading" | "error";

function CheckIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>;
}

function CheckoutForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;
    setStatus("loading");
    setError("");
    try {
      const { url } = await createCheckoutSession({ data: { email: email.trim() } });
      window.location.href = url;
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="checkout-form">
      <div className="checkout-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre adresse email"
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Chargement…" : "Souscrire"}
        </button>
      </div>
      {status === "error" && error && <p className="checkout-error">{error}</p>}
      <p className="checkout-note">Résiliation en un clic · Paiement sécurisé via Stripe</p>
      <p className="checkout-note">
        En vous abonnant, vous acceptez nos <Link to="/cgv">CGV</Link> et notre{" "}
        <Link to="/confidentialite">politique de confidentialité</Link>.
      </p>
    </form>
  );
}

function AbonnementPage() {
  return (
    <div className="pdx2">
      <PdxStyles />
      <header className="nav">
        <div className="nav-inner">
          <Link to="/"><img className="logo" src={paradoxiLogoLight} alt="PARADOXI Observatory" /></Link>
          <Link to="/" className="btn-ghost" style={{ padding: "9px 18px", fontSize: "14px" }}>← Retour</Link>
        </div>
      </header>

      <main className="wrap" style={{ paddingTop: 64, paddingBottom: 96, maxWidth: 640 }}>
        <div className="page-header">
          <p className="eyebrow" style={{ textAlign: "center" }}>Accès Premium</p>
          <h1>Rejoindre l'Observatory. Comprendre les marchés.</h1>
          <p>L'intégralité du cadre analytique PARADOXI — rapports, scorecard, watchlist et décisions documentées.</p>
        </div>

        <div className="price-card featured">
          <span className="price-badge">Disponible maintenant</span>
          <p className="price-amount">69,99&nbsp;€<span>/mois</span></p>
          <p className="price-desc">Sans engagement. Tarif préférentiel automatiquement reconnu pour les membres inscrits avant l'ouverture.</p>
          <ul className="price-list" style={{ marginBottom: 28 }}>
            {FEATURES.map((label) => <li key={label}><CheckIcon />{label}</li>)}
          </ul>
          <CheckoutForm />
        </div>

        <p style={{ marginTop: 32, textAlign: "center", fontSize: 12.5, lineHeight: 1.6, color: "var(--text-faint)" }}>
          Contenu éducatif et informatif uniquement · Ne constitue pas un conseil en investissement · Le trading implique un risque de perte en capital
        </p>
      </main>
    </div>
  );
}
