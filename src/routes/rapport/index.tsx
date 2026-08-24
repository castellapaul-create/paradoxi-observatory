import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { PdxStyles } from "@/components/PdxStyles";
import paradoxiLogoLight from "@/assets/paradoxi-logo-light.png";
import sectionRapport from "@/assets/section-rapport.png";
import { requestReportAccess } from "@/lib/api/report.functions";

export const Route = createFileRoute("/rapport/")({
  validateSearch: z.object({ src: z.string().max(100).optional() }),
  head: () => ({
    meta: [
      { title: "Rapport Fondamental Hebdomadaire — édition d'exemple | PARADOXI Observatory" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RapportPage,
});

const CONTENT_ITEMS = [
  "8 devises — biais directionnel construit sur le positionnement institutionnel (COT), le contexte macro et les banques centrales",
  "Anticipations de taux par banque centrale — Fed, BCE, BoE, BoJ...",
  "Paires sous surveillance, avec les niveaux techniques qui invalident chaque thèse",
];

type Status = "idle" | "loading" | "sent" | "error";

function CheckIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>;
}

function ReportForm({ src }: { src: string }) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;
    setStatus("loading");
    setError("");
    try {
      await requestReportAccess({ data: { email: email.trim(), src, website } });
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  if (status === "sent") {
    return (
      <div className="price-card" style={{ textAlign: "center" }}>
        <span className="price-badge" style={{ margin: "0 auto 16px" }}>Email envoyé</span>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-muted)", margin: 0 }}>
          Vérifiez votre boîte mail (et les spams) : cliquez sur le lien de confirmation pour recevoir le rapport dans la minute.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="checkout-form">
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <div className="checkout-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre adresse email"
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Envoi…" : "Recevoir le rapport"}
        </button>
      </div>
      {status === "error" && error && <p className="checkout-error">{error}</p>}
      <p className="checkout-note">
        Contenu éducatif uniquement · Pas un conseil en investissement · Voir notre{" "}
        <Link to="/confidentialite">politique de confidentialité</Link>.
      </p>
    </form>
  );
}

function RapportPage() {
  const { src } = Route.useSearch();

  return (
    <div className="pdx2">
      <PdxStyles />
      <header className="nav">
        <div className="nav-inner">
          <img className="logo" src={paradoxiLogoLight} alt="PARADOXI Observatory" />
        </div>
      </header>

      <main className="wrap" style={{ paddingTop: 64, paddingBottom: 96, maxWidth: 640 }}>
        <div className="page-header">
          <p className="eyebrow" style={{ textAlign: "center" }}>Édition d'exemple</p>
          <h1>Une semaine de marchés, lue comme un desk institutionnel.</h1>
          <p>Recevez une édition complète du Rapport Fondamental Hebdomadaire — gratuite, sans engagement.</p>
        </div>

        <div className="showcase-card" style={{ marginBottom: 40 }}>
          <img src={sectionRapport} alt="Aperçu du Rapport Fondamental Hebdomadaire PARADOXI Observatory" />
        </div>

        <div className="price-card featured">
          <span className="price-badge">Ce que contient cette édition</span>
          <ul className="price-list" style={{ marginTop: 20, marginBottom: 28 }}>
            {CONTENT_ITEMS.map((label) => <li key={label}><CheckIcon />{label}</li>)}
          </ul>
          <ReportForm src={src ?? "direct"} />
        </div>
      </main>
    </div>
  );
}
