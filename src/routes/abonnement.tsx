import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, Check, Loader2, Layers, BarChart3, Landmark, Compass, Eye, TrendingUp } from "lucide-react";
import { PdxLogo } from "@/components/PdxLogo";
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
  { icon: Layers, label: "Rapport Macro Hebdomadaire (chaque dimanche)" },
  { icon: BarChart3, label: "FX Scorecard — force relative des devises" },
  { icon: Landmark, label: "Central Bank Watch — BCE, Fed, BoE, BoJ..." },
  { icon: Compass, label: "Weekly Bias par devise (PCI-driven)" },
  { icon: Eye, label: "Briefing Quotidien — lecture macro overnight" },
  { icon: TrendingUp, label: "Décisions de Trades documentées & argumentées" },
];

type Status = "idle" | "loading" | "error";

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
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="flex h-14 items-center gap-2 rounded-full border border-border bg-card/80 px-2 pl-5">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre adresse email"
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground transition-all hover:scale-[1.03] disabled:opacity-70"
        >
          {status === "loading" ? (
            <><Loader2 className="h-4 w-4 animate-spin" />Chargement…</>
          ) : "Souscrire — 69 €/mois"}
        </button>
      </div>
      {status === "error" && error && (
        <p className="text-center text-xs text-destructive">{error}</p>
      )}
      <p className="text-center text-xs text-muted-foreground/50">
        7 jours d'essai gratuit · Résiliation en un clic · Paiement sécurisé via Stripe
      </p>
    </form>
  );
}

function AbonnementPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <PdxLogo />
          <Link to="/" className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 pb-24 pt-32">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.07] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" style={{ boxShadow: "0 0 6px 2px oklch(0.78 0.18 150 / 0.7)" }} />
            Accès Premium
          </div>
          <h1 className="font-black text-4xl leading-tight">
            Rejoindre l'Observatory.<br />
            <span className="text-primary">Comprendre les marchés.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
            L'intégralité du cadre analytique PARADOXI — rapports, scorecard, watchlist et décisions documentées.
          </p>
        </div>

        {/* Plan card */}
        <div
          className="relative overflow-hidden rounded-2xl border border-primary/30 p-8"
          style={{ background: "radial-gradient(ellipse 80% 120% at 50% 110%, oklch(0.78 0.18 150 / 0.08), transparent)" }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {/* Price */}
          <div className="mb-6 flex items-end gap-2">
            <span className="text-5xl font-black">69 €</span>
            <span className="mb-1.5 text-sm text-muted-foreground">/mois · sans engagement</span>
          </div>

          {/* Features */}
          <ul className="mb-8 space-y-3 border-t border-primary/10 pt-6">
            {FEATURES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-foreground/80">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-3 w-3" />
                </span>
                {label}
              </li>
            ))}
          </ul>

          {/* Checkout form */}
          <CheckoutForm />
        </div>

        {/* Trust footer */}
        <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground/40">
          Contenu éducatif et informatif uniquement · Ne constitue pas un conseil en investissement ·
          Le trading implique un risque de perte en capital
        </p>
      </main>
    </div>
  );
}
