import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PdxLogo } from "@/components/PdxLogo";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [{ title: "PARADOXI Observatory — Mentions légales" }],
  }),
  component: MentionsLegalesPage,
});

function MentionsLegalesPage() {
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
        <h1 className="font-black text-3xl md:text-4xl">Mentions légales</h1>
        <p className="mt-2 text-sm text-muted-foreground">Dernière mise à jour : 23 août 2026</p>

        <div className="mt-10 space-y-9 text-sm leading-relaxed text-muted-foreground [&_h2]:mb-3 [&_h2]:font-bold [&_h2]:text-base [&_h2]:text-foreground [&_strong]:text-foreground/90">
          <section>
            <h2>1. Éditeur du site</h2>
            <p>
              Le site PARADOXI Observatory (<strong>paradoxi-observatory.com</strong>) est édité par :<br />
              <strong>PAMILYS INVEST</strong>, société immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro SIREN 990 151 037, au capital social de 1 000 €.<br />
              Siège social : 60 rue François 1er, 75008 Paris, France.<br />
              Directeur de la publication : Paul Castella.<br />
              Contact : <a href="mailto:pamilys-invest@outlook.com" className="text-primary hover:underline">pamilys-invest@outlook.com</a>
            </p>
          </section>

          <section>
            <h2>2. Hébergement</h2>
            <p>
              Le site est hébergé par :<br />
              <strong>Vercel Inc.</strong><br />
              340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis<br />
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">vercel.com</a>
            </p>
          </section>

          <section>
            <h2>3. Nature du contenu</h2>
            <p>
              PARADOXI Observatory publie des analyses macroéconomiques et des contenus relatifs aux marchés des changes (FX) à titre strictement <strong>éducatif et informatif</strong>.
            </p>
            <p className="mt-3">
              PAMILYS INVEST n'est ni Conseiller en Investissements Financiers (CIF), ni Prestataire de Services d'Investissement (PSI) au sens du Code monétaire et financier, et n'est pas immatriculée à ce titre auprès de l'Autorité des Marchés Financiers (AMF) ou de l'ORIAS. Les contenus diffusés ne constituent en aucun cas une recommandation personnalisée d'investissement, une incitation à l'achat ou à la vente d'instruments financiers, ni un conseil en investissement au sens de la réglementation applicable.
            </p>
            <p className="mt-3">
              Le trading sur les marchés financiers comporte un risque élevé de perte en capital. Les performances passées ne préjugent pas des performances futures. Chaque lecteur reste seul responsable de ses décisions d'investissement.
            </p>
          </section>

          <section>
            <h2>4. Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus présents sur le site (textes, analyses, mises en page, graphismes, logo) est la propriété exclusive de PAMILYS INVEST, sauf mention contraire. Toute reproduction, représentation, modification ou diffusion, totale ou partielle, sans autorisation écrite préalable, est interdite et constitutive de contrefaçon.
            </p>
          </section>

          <section>
            <h2>5. Données personnelles</h2>
            <p>
              Le traitement des données personnelles collectées via le site est détaillé dans notre{" "}
              <Link to="/confidentialite" className="text-primary hover:underline">politique de confidentialité</Link>.
            </p>
          </section>

          <section>
            <h2>6. Contact</h2>
            <p>
              Pour toute question relative au site ou à son contenu : <a href="mailto:pamilys-invest@outlook.com" className="text-primary hover:underline">pamilys-invest@outlook.com</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
