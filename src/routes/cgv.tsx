import { createFileRoute, Link } from "@tanstack/react-router";
import { PdxStyles } from "@/components/PdxStyles";
import paradoxiLogoLight from "@/assets/paradoxi-logo-light.png";

export const Route = createFileRoute("/cgv")({
  head: () => ({
    meta: [
      { title: "PARADOXI Observatory — Conditions Générales de Vente" },
      { name: "description", content: "Conditions Générales de Vente de l'abonnement PARADOXI Observatory, édité par PAMILYS INVEST." },
    ],
    links: [{ rel: "canonical", href: "https://www.paradoxi-observatory.com/cgv" }],
  }),
  component: CgvPage,
});

function CgvPage() {
  return (
    <div className="pdx2">
      <PdxStyles />
      <header className="nav">
        <div className="nav-inner">
          <Link to="/"><img className="logo" src={paradoxiLogoLight} alt="PARADOXI Observatory" /></Link>
          <Link to="/" className="btn-ghost" style={{ padding: "9px 18px", fontSize: "14px" }}>← Retour</Link>
        </div>
      </header>

      <main className="legal-page">
        <h1>Conditions Générales de Vente</h1>
        <p className="updated">Dernière mise à jour : 23 août 2026</p>

        <section>
          <h2>1. Objet</h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent la vente de l'abonnement PARADOXI Observatory par <strong>PAMILYS INVEST</strong> (SIREN 990 151 037, 60 rue François 1er, 75008 Paris) à tout consommateur ou professionnel souhaitant y souscrire depuis le site paradoxi-observatory.com. Toute souscription implique l'acceptation pleine et entière des présentes CGV.
          </p>
        </section>

        <section>
          <h2>2. Description du service</h2>
          <p>
            L'abonnement PARADOXI Observatory donne accès à des publications hebdomadaires portant sur l'analyse macroéconomique des marchés des changes (FX), à titre <strong>strictement éducatif et informatif</strong> — notamment un rapport macro hebdomadaire, un scorecard de force relative des devises et des synthèses argumentées de décisions de trading. Ce service ne constitue en aucun cas un conseil en investissement personnalisé (voir nos <Link to="/mentions-legales">mentions légales</Link>).
          </p>
        </section>

        <section>
          <h2>3. Tarifs et paiement</h2>
          <p>
            L'abonnement est proposé au tarif de <strong>69,99 € TTC / mois</strong>, ou <strong>49,99 € TTC / mois</strong> pour les personnes ayant rejoint la liste d'attente avant l'ouverture officielle (tarif reconnu automatiquement via l'adresse email utilisée au paiement). Ces tarifs sont indiqués en euros, toutes taxes comprises.
          </p>
          <p>
            Le paiement s'effectue par carte bancaire via notre prestataire de paiement <strong>Stripe</strong>, qui traite directement les données bancaires du client — PAMILYS INVEST n'a à aucun moment accès à ces données. L'abonnement est prélevé mensuellement, par avance, à la date anniversaire de la souscription, jusqu'à résiliation.
          </p>
        </section>

        <section>
          <h2>4. Durée, résiliation</h2>
          <p>
            L'abonnement est <strong>sans engagement de durée</strong> et se renouvelle automatiquement chaque mois. Le client peut résilier à tout moment, avec effet à la fin de la période mensuelle en cours, depuis son espace de gestion Stripe (lien transmis par email lors de la souscription) ou en écrivant à <a href="mailto:pamilys-invest@outlook.com">pamilys-invest@outlook.com</a>. Aucun remboursement au prorata n'est effectué pour la période déjà entamée.
          </p>
        </section>

        <section>
          <h2>5. Droit de rétractation</h2>
          <p>
            Conformément à l'article L221-18 du Code de la consommation, le client consommateur dispose d'un délai de 14 jours à compter de la souscription pour exercer son droit de rétractation, sans avoir à justifier de motif.
          </p>
          <p>
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
            Pour toute réclamation, le client peut contacter PAMILYS INVEST à <a href="mailto:pamilys-invest@outlook.com">pamilys-invest@outlook.com</a>. Conformément à l'article L616-1 du Code de la consommation, à défaut de résolution amiable, le client consommateur a la possibilité de recourir gratuitement à un médiateur de la consommation.
          </p>
        </section>

        <section>
          <h2>8. Droit applicable</h2>
          <p>
            Les présentes CGV sont soumises au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents, sous réserve des règles impératives applicables aux consommateurs.
          </p>
        </section>
      </main>
    </div>
  );
}
