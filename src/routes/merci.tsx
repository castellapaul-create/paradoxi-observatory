import { createFileRoute, Link } from "@tanstack/react-router";
import { PdxStyles } from "@/components/PdxStyles";
import paradoxiLogoLight from "@/assets/paradoxi-logo-light.png";

export const Route = createFileRoute("/merci")({
  head: () => ({
    meta: [
      { title: "PARADOXI Observatory — Bienvenue !" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://www.paradoxi-observatory.com/merci" }],
  }),
  component: MerciPage,
});

const NEXT_STEPS = [
  "Rapport Macro complet chaque dimanche soir, en PDF",
  "FX Scorecard & Weekly Bias par devise",
  "Décisions de Trades argumentées et documentées",
  "Accès immédiat aux archives des éditions précédentes",
];

function CheckIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>;
}

function MerciPage() {
  return (
    <div className="pdx2">
      <PdxStyles />
      <header className="nav">
        <div className="nav-inner">
          <Link to="/"><img className="logo" src={paradoxiLogoLight} alt="PARADOXI Observatory" /></Link>
        </div>
      </header>

      <main className="wrap" style={{ paddingTop: 96, paddingBottom: 96, maxWidth: 560, textAlign: "center" }}>
        <div
          style={{
            width: 64, height: 64, margin: "0 auto 24px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "var(--accent-soft)", color: "var(--accent)",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
        </div>

        <span className="price-badge" style={{ margin: "0 auto 16px" }}>Abonnement confirmé</span>

        <h1 style={{ fontSize: "clamp(2rem,3.6vw,2.6rem)", fontWeight: 800, letterSpacing: "-0.015em", margin: "0 0 16px" }}>
          Bienvenue dans l'Observatory.
        </h1>

        <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--text-muted)", maxWidth: 440, margin: "0 auto" }}>
          Votre abonnement est actif. Vous recevrez la prochaine édition du <strong style={{ color: "var(--text)" }}>Rapport Fondamental Hebdomadaire</strong> dès dimanche soir.
        </p>

        <div className="price-card" style={{ marginTop: 40, textAlign: "left" }}>
          <p className="eyebrow">Ce qui vous attend</p>
          <ul className="price-list" style={{ marginBottom: 0, borderTop: "none", paddingTop: 0 }}>
            {NEXT_STEPS.map((item) => <li key={item}><CheckIcon />{item}</li>)}
          </ul>
        </div>

        <Link to="/" className="btn-primary" style={{ marginTop: 32, justifyContent: "center" }}>
          Retour à l'Observatory →
        </Link>

        <p className="checkout-note" style={{ marginTop: 24 }}>
          Un email de confirmation vous a été envoyé. Résiliation possible à tout moment depuis votre espace Stripe.
        </p>
      </main>
    </div>
  );
}
