import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { PdxLogo } from "@/components/PdxLogo";

export const Route = createFileRoute("/merci")({
  head: () => ({
    meta: [
      { title: "PARADOXI Observatory — Bienvenue !" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MerciPage,
});

function MerciPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <PdxLogo />
        </div>
      </header>

      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="relative mx-auto max-w-lg">
          {/* Glow */}
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.78 0.18 150 / 0.12), transparent)" }}
          />

          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
            <Check className="h-7 w-7 text-primary" />
          </div>

          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.07] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" style={{ boxShadow: "0 0 6px 2px oklch(0.78 0.18 150 / 0.7)" }} />
            Abonnement confirmé
          </div>

          <h1 className="font-black text-4xl leading-tight">
            Bienvenue dans l'Observatory.
          </h1>

          <p className="mx-auto mt-5 max-w-md text-lg text-muted-foreground">
            Votre abonnement est actif. Vous recevrez la prochaine édition du
            <strong className="text-foreground"> Rapport Fondamental Hebdomadaire</strong> dès dimanche soir.
          </p>

          <div className="mt-10 rounded-xl border border-border/50 bg-card/30 p-6 text-left">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-primary">Ce qui vous attend</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "Rapport Macro complet chaque dimanche soir",
                "Briefing quotidien les jours ouvrés",
                "Décisions de Trades argumentées et documentées",
                "Accès immédiat aux archives des éditions précédentes",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[9px] text-primary font-black">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_-4px] hover:shadow-primary/60"
          >
            Retour à l'Observatory
            <ArrowRight className="h-4 w-4" />
          </Link>

          <p className="mt-6 text-xs text-muted-foreground/40">
            Un email de confirmation vous a été envoyé. Résiliation possible à tout moment depuis votre espace Stripe.
          </p>
        </div>
      </main>
    </div>
  );
}
