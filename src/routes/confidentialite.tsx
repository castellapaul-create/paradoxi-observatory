import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PdxLogo } from "@/components/PdxLogo";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [{ title: "PARADOXI Observatory — Politique de confidentialité" }],
  }),
  component: ConfidentialitePage,
});

function ConfidentialitePage() {
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
        <h1 className="font-black text-3xl md:text-4xl">Politique de confidentialité</h1>
        <p className="mt-2 text-sm text-muted-foreground">Dernière mise à jour : 23 août 2026</p>

        <div className="mt-10 space-y-9 text-sm leading-relaxed text-muted-foreground [&_h2]:mb-3 [&_h2]:font-bold [&_h2]:text-base [&_h2]:text-foreground [&_strong]:text-foreground/90">
          <section>
            <h2>1. Responsable de traitement</h2>
            <p>
              <strong>PAMILYS INVEST</strong>, SIREN 990 151 037, 60 rue François 1er, 75008 Paris, France, est responsable du traitement des données personnelles collectées sur le site paradoxi-observatory.com.<br />
              Contact : <a href="mailto:pamilys-invest@outlook.com" className="text-primary hover:underline">pamilys-invest@outlook.com</a>
            </p>
          </section>

          <section>
            <h2>2. Données collectées</h2>
            <p>Nous collectons les données suivantes :</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li><strong>Adresse email</strong>, lors de l'inscription à la lettre gratuite ou de la souscription à l'abonnement payant.</li>
              <li><strong>Données de paiement</strong> (carte bancaire), saisies et traitées directement par notre prestataire Stripe — jamais stockées par nos soins.</li>
              <li><strong>Adresse IP</strong>, de façon temporaire, à des fins de limitation du nombre de requêtes (protection anti-abus).</li>
            </ul>
          </section>

          <section>
            <h2>3. Finalités et bases légales</h2>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Envoi des rapports et gestion de l'abonnement — <strong>exécution du contrat</strong>.</li>
              <li>Envoi de la lettre gratuite — <strong>consentement</strong> de la personne concernée.</li>
              <li>Prévention des abus et de la fraude (limitation de requêtes) — <strong>intérêt légitime</strong>.</li>
            </ul>
          </section>

          <section>
            <h2>4. Destinataires des données</h2>
            <p>Les données sont partagées avec les sous-traitants suivants, dans la stricte limite nécessaire à l'exécution du service :</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li><strong>Stripe</strong> (traitement des paiements) — Stripe Payments Europe Ltd, Irlande.</li>
              <li><strong>Resend</strong> (envoi des emails transactionnels et de la lettre).</li>
              <li><strong>Google</strong> (Google Sheets, pour le suivi interne de la liste d'abonnés).</li>
              <li><strong>Vercel Inc.</strong> (hébergement du site).</li>
            </ul>
            <p className="mt-3">
              Certains de ces prestataires sont situés hors de l'Union européenne (notamment aux États-Unis). Le cas échéant, ces transferts sont encadrés par les clauses contractuelles types de la Commission européenne ou un mécanisme équivalent garanti par le prestataire.
            </p>
          </section>

          <section>
            <h2>5. Durée de conservation</h2>
            <p>
              Les données liées à l'abonnement payant sont conservées pendant toute la durée de l'abonnement, puis archivées le temps requis par nos obligations légales et comptables. Les emails collectés pour la lettre gratuite sont conservés jusqu'à désinscription de la personne concernée.
            </p>
          </section>

          <section>
            <h2>6. Vos droits</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité sur vos données personnelles. Vous pouvez exercer ces droits en écrivant à <a href="mailto:pamilys-invest@outlook.com" className="text-primary hover:underline">pamilys-invest@outlook.com</a>.
            </p>
            <p className="mt-3">
              Vous disposez également du droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) — <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.cnil.fr</a>.
            </p>
          </section>

          <section>
            <h2>7. Cookies</h2>
            <p>
              Le site n'utilise à ce jour aucun cookie de mesure d'audience ou de publicité. Seuls les cookies techniques strictement nécessaires au bon fonctionnement du site et de la page de paiement Stripe peuvent être déposés. Si des cookies non essentiels venaient à être ajoutés à l'avenir, un bandeau de consentement conforme à la réglementation serait mis en place.
            </p>
          </section>

          <section>
            <h2>8. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques raisonnables (connexion chiffrée HTTPS, limitation du nombre de requêtes, absence de stockage des données bancaires) pour protéger vos données contre tout accès, altération ou divulgation non autorisés.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
