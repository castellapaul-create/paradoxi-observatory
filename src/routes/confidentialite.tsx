import { createFileRoute, Link } from "@tanstack/react-router";
import { PdxStyles } from "@/components/PdxStyles";
import paradoxiLogoLight from "@/assets/paradoxi-logo-light.png";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "PARADOXI Observatory — Politique de confidentialité" },
      { name: "description", content: "Politique de confidentialité et traitement des données personnelles sur PARADOXI Observatory, édité par PAMILYS INVEST." },
    ],
    links: [{ rel: "canonical", href: "https://www.paradoxi-observatory.com/confidentialite" }],
  }),
  component: ConfidentialitePage,
});

function ConfidentialitePage() {
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
        <h1>Politique de confidentialité</h1>
        <p className="updated">Dernière mise à jour : 23 août 2026</p>

        <section>
          <h2>1. Responsable de traitement</h2>
          <p>
            <strong>PAMILYS INVEST</strong>, SIREN 990 151 037, 60 rue François 1er, 75008 Paris, France, est responsable du traitement des données personnelles collectées sur le site paradoxi-observatory.com.<br />
            Contact : <a href="mailto:pamilys-invest@outlook.com">pamilys-invest@outlook.com</a>
          </p>
        </section>

        <section>
          <h2>2. Données collectées</h2>
          <p>Nous collectons les données suivantes :</p>
          <ul>
            <li><strong>Adresse email</strong>, lors de l'inscription à la lettre gratuite ou de la souscription à l'abonnement payant.</li>
            <li><strong>Données de paiement</strong> (carte bancaire), saisies et traitées directement par notre prestataire Stripe — jamais stockées par nos soins.</li>
            <li><strong>Adresse IP</strong>, de façon temporaire, à des fins de limitation du nombre de requêtes (protection anti-abus).</li>
          </ul>
        </section>

        <section>
          <h2>3. Finalités et bases légales</h2>
          <ul>
            <li>Envoi des rapports et gestion de l'abonnement — <strong>exécution du contrat</strong>.</li>
            <li>Envoi de la lettre gratuite — <strong>consentement</strong> de la personne concernée.</li>
            <li>Prévention des abus et de la fraude (limitation de requêtes) — <strong>intérêt légitime</strong>.</li>
          </ul>
        </section>

        <section>
          <h2>4. Destinataires des données</h2>
          <p>Les données sont partagées avec les sous-traitants suivants, dans la stricte limite nécessaire à l'exécution du service :</p>
          <ul>
            <li><strong>Stripe</strong> (traitement des paiements) — Stripe Payments Europe Ltd, Irlande.</li>
            <li><strong>Resend</strong> (envoi des emails transactionnels et de la lettre).</li>
            <li><strong>Google</strong> (Google Sheets, pour le suivi interne de la liste d'abonnés).</li>
            <li><strong>Vercel Inc.</strong> (hébergement du site).</li>
          </ul>
          <p>
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
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité sur vos données personnelles. Vous pouvez exercer ces droits en écrivant à <a href="mailto:pamilys-invest@outlook.com">pamilys-invest@outlook.com</a>.
          </p>
          <p>
            Vous disposez également du droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) — <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>.
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
      </main>
    </div>
  );
}
