import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PdxLogo } from "@/components/PdxLogo";

export const Route = createFileRoute("/cgv")({
  head: () => ({
    meta: [{ title: "PARADOXI Observatory — Conditions Générales de Vente" }],
  }),
  component: CgvPage,
});

function CgvPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <PdxLogo />
          <Link to="/" className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <h1 className="font-black text-3xl md:text-4xl">Conditions Générales de Vente</h1>
        <p className="mt-2 text-sm text-muted-foreground">Dernière mise à jour : 23 août 2026</p>

        <div className="mt-10 space-y-9 text-sm leading-relaxed text-muted-foreground [&_h2]:mb-3 [&_h2]:font-bold [&_h2]:text-base [&_h2]:text-foreground [&_strong]:text-foreground/90">
          <section>
            <h2>1. Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent la vente de l'abonnement PARADOXI Observatory par <strong>PAMILYS INVEST</strong> (SIREN 990 151 037, 60 rue François 1er, 75008 Paris) à tout consommateur ou professionnel souhaitant y souscrire depuis le site paradoxi-observatory.com. Toute souscription implique l'acceptation pleine et entière des présentes CGV.
            </p>
          </section>

          <section>
            <h2>2. Description du service</h2>
            <p>
              L'abonnement PARADOXI Observatory donne accès à des publications hebdomadaires et quotidiennes portant sur l'analyse macroéconomique des marchés des changes (FX), à titre <strong>strictement éducatif et informatif</strong> — notamment un rapport macro hebdomadaire, un briefing quotidien, un scorecard de force relative des devises et des synthèses argumentées de décisions de trading. Ce service ne constitue en aucun cas un conseil en investissement personnalisé (voir nos <Link to="/mentions-legales" className="text-primary hover:underline">mentions légales</Link>).
            </p>
          </section>

          <section>
            <h2>3. Tarifs et paiement</h2>
            <p>
              L'abonnement est proposé au tarif de <strong>69,99 € TTC / mois</strong>, ou <strong>49,99 € TTC / mois</strong> pour les personnes ayant rejoint la liste d'attente avant l'ouverture officielle (tarif reconnu automatiquement via l'adresse email utilisée au paiement). Ces tarifs sont indiqués en euros, toutes taxes comprises.
            </p>
            <p className="mt-3">
              Le paiement s'effectue par carte bancaire via notre prestataire de paiement <strong>Stripe</strong>, qui traite directement les données bancaires du client — PAMILYS INVEST n'a à aucun moment accès à ces données. L'abonnement est prélevé mensuellement, par avance, à la date anniversaire de la souscription, jusqu'à résiliation.
            </p>
          </section>

          <section>
            <h2>4. Durée, résiliation</h2>
            <p>
              L'abonnement est <strong>sans engagement de durée</strong> et se renouvelle automatiquement chaque mois. Le client peut résilier à tout moment, avec effet à la fin de la période mensuelle en cours, depuis son espace de gestion Stripe (lien transmis par email lors de la souscription) ou en écrivant à <a href="mailto:pamilys-invest@outlook.com" className="text-primary hover:underline">pamilys-invest@outlook.com</a>. Aucun remboursement au prorata n'est effectué pour la période déjà entamée.
            </p>
          </section>

          <section>
            <h2>5. Droit de rétractation</h2>
            <p>
              Conformément à l'article L221-18 du Code de la consommation, le client consommateur dispose d'un délai de 14 jours à compter de la souscription pour exercer son droit de rétractation, sans avoir à justifier de motif.
            </p>
            <p className="mt-3">
              Toutefois, conformément à l'article L221-28 13° du Code de la consommation, en cliquant sur « Souscrire » le client demande expressément à bénéficier d'un accès immédiat au contenu numérique et reconnaît renoncer à son droit de rétractation dès lors que l'exécution du service a commencé avec son accord préalable, exprès, avant la fin du délai de 14 jours.
            </p>
          </section>

          <section>
            <h2>6. Responsabilité</h2>
            <p>
              PAMILYS INVEST s'engage à mettre en œuvre les moyens raisonnables pour assurer la disponibilité et la qualité du contenu publié, sans obligation de résultat. Le contenu étant à portée générale et non personnalisée, PAMILYS INVEST ne saurait être tenue responsable des décisions de trading ou d'investissement prises par le client sur la base des contenus publiés. Le client reste seul décisionnaire et responsable de ses choix.
            </p>
          </section>

          <section>
            <h2>7. Réclamation et médiation</h2>
            <p>
              Pour toute réclamation, le client peut contacter PAMILYS INVEST à <a href="mailto:pamilys-invest@outlook.com" className="text-primary hover:underline">pamilys-invest@outlook.com</a>. Conformément à l'article L616-1 du Code de la consommation, à défaut de résolution amiable, le client consommateur a la possibilité de recourir gratuitement à un médiateur de la consommation.
            </p>
          </section>

          <section>
            <h2>8. Droit applicable</h2>
            <p>
              Les présentes CGV sont soumises au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents, sous réserve des règles impératives applicables aux consommateurs.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
