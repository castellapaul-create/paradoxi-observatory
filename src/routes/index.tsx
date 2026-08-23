import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import paradoxiLogoLight from "@/assets/paradoxi-logo-light.png";
import heroGlass from "@/assets/hero-glass-figure.jpg";
import sectionRapport from "@/assets/section-rapport.png";
import sectionTrades from "@/assets/section-trades.png";
import tradeEurnzd from "@/assets/trade-eurnzd-clean.png";
import tradeNzdjpy from "@/assets/trade-nzdjpy-clean.png";
import tradeUsdcad from "@/assets/trade-usdcad-clean.png";
import portraitFounder from "@/assets/portrait-linkedin.jpg";
import mobileMockup from "@/assets/mobile-mockup.jpg";
import appIcon from "@/assets/app-icon-web.jpg";
import appNotification from "@/assets/app-notification.jpg";

import logoTradingView from "@/assets/logos/tradingview.png";
import logoForexFactory from "@/assets/logos/forexfactory.png";
import logoCme from "@/assets/logos/cme.png";
import logoInvesting from "@/assets/logos/investing.png";
import logoTradingEconomics from "@/assets/logos/tradingeconomics.png";
import logoCnn from "@/assets/logos/cnn.png";
import logoPolymarket from "@/assets/logos/polymarket.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PARADOXI Observatory — La lettre macro FX hebdomadaire" },
      {
        name: "description",
        content:
          "Chaque dimanche, une analyse macroéconomique complète et les biais directionnels des principales devises — construits avec la rigueur d'un desk institutionnel.",
      },
      { property: "og:title", content: "PARADOXI Observatory" },
      {
        property: "og:description",
        content: "La synthèse macro FX hebdomadaire — fondamentaux, taux et régimes de marché.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap",
      },
    ],
  }),
  component: Index,
});

const LOGOS = [
  { src: logoTradingView, alt: "TradingView" },
  { src: logoForexFactory, alt: "Forex Factory" },
  { src: logoCme, alt: "CME Group" },
  { src: logoInvesting, alt: "Investing.com" },
  { src: logoTradingEconomics, alt: "Trading Economics" },
  { src: logoCnn, alt: "CNN" },
  { src: logoPolymarket, alt: "Polymarket" },
];

const STEPS = [
  { num: "01", tag: "COT", title: "COT Report", desc: "Positionnement des grands spéculateurs sur les futures — identifier qui porte le marché." },
  { num: "02", tag: "Macro", title: "Macro Framework", desc: "Cycles économiques, inflation, emploi, croissance — l'environnement fondamental de chaque devise." },
  { num: "03", tag: "Banques centrales", title: "Central Bank Watch", desc: "Anticipations de taux et calendrier décisionnel des grandes banques centrales." },
  { num: "04", tag: "Synthèse", title: "Weekly Bias", desc: "La convergence des trois signaux, hiérarchisée et publiée chaque dimanche." },
];

const FEATURES = [
  { title: "Rapport Hebdomadaire", desc: "Macro Framework complet, livré chaque dimanche en PDF dans votre boîte mail.", icon: <path d="M3 4h18v16H3zM3 9h18M8 4v5" /> },
  { title: "FX Scorecard", desc: "Force relative des devises en un coup d'œil.", icon: <path d="M3 20V10M10 20V4M17 20v-7" /> },
  { title: "Central Bank Watch", desc: "Positionnement et anticipations des banques centrales.", icon: <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" /> },
  { title: "Weekly Bias", desc: "Biais directionnel par devise, contextualisé par le PCI.", icon: <path d="M12 3v3m0 12v3M3 12h3m12 0h3M6 6l2 2m8 8l2 2M18 6l-2 2M8 16l-2 2" /> },
  { title: "Watchlist Forex", desc: "Les paires sous surveillance, thèse directionnelle et niveaux structurants.", icon: <path d="M9 18l3-3 3 3M12 15V4M4 15v3a2 2 0 002 2h12a2 2 0 002-2v-3" /> },
  { title: "Décisions de Trades", desc: "Analyse des setups fondamentaux en cours, documentée.", icon: <path d="M3 17l6-6 4 4 8-8M21 7v6h-6" /> },
];

const TRADES = [
  { symbol: "EUR/NZD", direction: "long" as const, image: tradeEurnzd, result: "PCI Convergent", desc: "COT institutionnel EUR haussier + divergence macro NZD. Biais validé par la CB Watch." },
  { symbol: "NZD/JPY", direction: "short" as const, image: tradeNzdjpy, result: "Convergence ×3", desc: "Positionnement COT JPY haussier + macro NZD affaiblie + confirmation banque centrale." },
  { symbol: "USD/CAD", direction: "long" as const, image: tradeUsdcad, result: "PCI Haussier", desc: "Biais USD soutenu par la Fed + fragilité macro CAD. Convergence positionnement institutionnel." },
];

const PLAN_CHECKLIST = [
  "Rapport Macro Hebdomadaire",
  "FX Scorecard",
  "Central Bank Watch",
  "Weekly Bias",
];

const TESTIMONIALS = [
  { quote: "Depuis que je lis PARADOXI, j'aborde chaque semaine avec une vision structurée que je n'avais pas avant. Ce n'est pas un rapport — c'est un cadre de pensée.", name: "Julien M.", role: "Trader indépendant FX", initials: "JM" },
  { quote: "La rigueur est institutionnelle, le ton est humain. C'est exactement le niveau que j'attendais depuis des années.", name: "Sarah L.", role: "Gérante de portefeuille", initials: "SL" },
  { quote: "Pour la première fois, je comprends pourquoi les marchés bougent. Pas par chance. Par méthode.", name: "Antoine R.", role: "Analyste macro", initials: "AR" },
  { quote: "J'ai arrêté trois abonnements pour ne garder que PARADOXI. La différence, c'est la profondeur analytique.", name: "Mehdi B.", role: "Trader prop firm", initials: "MB" },
  { quote: "Ce que j'apprécie, c'est que personne ne me dit quoi faire. On me donne les éléments pour décider moi-même.", name: "Claire D.", role: "Day trader", initials: "CD" },
  { quote: "PARADOXI m'a aidé à construire un regard sur les marchés. Pas un système — un regard.", name: "Thomas V.", role: "Investisseur particulier", initials: "TV" },
];

const FAQ = [
  { q: "Qu'est-ce que PARADOXI Observatory exactement ?", a: "Un observatoire de recherche financière indépendant. Chaque semaine, nous produisons une analyse macro approfondie des marchés des changes — pas des signaux à copier, une compréhension à construire." },
  { q: "Combien coûte l'accès ?", a: "69,99 €/mois, sans engagement. Un tarif préférentiel de 49,99 €/mois est réservé aux membres déjà inscrits avant l'ouverture." },
  { q: "Est-ce un conseil en investissement ?", a: "Non. Contenu strictement éducatif et informatif, qui ne constitue en aucun cas une recommandation personnalisée. Vous restez seul décideur de vos choix." },
];

// ─── Page ────────────────────────────────────────────────────────────────────

function Index() {
  const [appModalOpen, setAppModalOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = appModalOpen ? "hidden" : "";
    if (!appModalOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setAppModalOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [appModalOpen]);

  return (
    <div className="pdx2">
      <PdxStyles />
      <Nav onOpenApp={() => setAppModalOpen(true)} />
      <Hero />
      <TrustBar />
      <LogoMarquee />
      <RapportShowcase />
      <Methode />
      <FeaturesGrid />
      <TradesShowcase />
      <Founder />
      <Testimonials />
      <Pricing />
      <Faq />
      <Footer />
      {appModalOpen && <AppModal onClose={() => setAppModalOpen(false)} />}
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav({ onOpenApp }: { onOpenApp: () => void }) {
  return (
    <header className="nav">
      <div className="nav-inner">
        <img className="logo" src={paradoxiLogoLight} alt="PARADOXI Observatory" />
        <nav className="nav-links">
          <a href="#rapport">Rapport</a>
          <a href="#methode">Méthode</a>
          <a href="#pricing">Tarifs</a>
          <button type="button" className="nav-app-link" onClick={onOpenApp}>
            App <span className="nav-app-badge">Bientôt</span>
          </button>
          <a href="#faq">FAQ</a>
        </nav>
        <a href="#pricing" className="nav-cta">S'abonner</a>
      </div>
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <h1>Vous analysez les marchés avec les outils du retail. Les desks institutionnels lisent <em>autre chose.</em></h1>
          <p className="lede">Chaque dimanche, une analyse macroéconomique complète et les biais directionnels des principales devises — construits avec la même rigueur qu'un desk institutionnel.</p>
          <div className="hero-actions">
            <a href="#pricing" className="btn-primary">Voir les tarifs →</a>
            <a href="#methode" className="btn-ghost">Comment ça marche</a>
          </div>
          <div className="hero-meta">
            <span className="stars">★★★★★</span>
            <span>52 dimanches consécutifs</span>
            <span className="dot">·</span>
            <span>~300 lecteurs confidentiel</span>
          </div>
        </div>
        <div className="hero-visual">
          <img src={heroGlass} alt="Figure abstraite en verre — représentation de l'analyse des données de marché" />
        </div>
      </div>
    </section>
  );
}

// ─── Trust bar ───────────────────────────────────────────────────────────────

function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="trust-inner">
        <div className="trust-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" /></svg>
          <span><strong>100% éducatif</strong> — jamais un conseil en investissement</span>
        </div>
        <div className="trust-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 6v6l4 2" /><circle cx="12" cy="12" r="9" /></svg>
          <span><strong>Chaque dimanche</strong> — sans exception depuis 52 semaines</span>
        </div>
        <div className="trust-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
          <span><strong>Sans engagement</strong> — résiliable en un clic</span>
        </div>
      </div>
    </div>
  );
}

// ─── Logo marquee ────────────────────────────────────────────────────────────

function LogoMarquee() {
  const items = [...LOGOS, ...LOGOS];
  return (
    <div className="marquee-section">
      <div className="wrap">
        <p className="marquee-label">Sources &amp; données utilisées dans la recherche</p>
        <div className="marquee-viewport">
          <div className="marquee-logos">
            {items.map((logo, i) => (
              <img key={i} src={logo.src} alt={logo.alt} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Showcases ───────────────────────────────────────────────────────────────

function RapportShowcase() {
  return (
    <section className="showcase" id="rapport">
      <div className="wrap">
        <div className="showcase-frame">
          <div className="showcase-card">
            <img src={sectionRapport} alt="Rapport Fondamental Hebdomadaire PARADOXI Observatory" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TradesShowcase() {
  return (
    <section className="showcase">
      <div className="wrap">
        <div className="showcase-frame">
          <div className="showcase-card">
            <img src={sectionTrades} alt="Mes Recherches et Décisions de Trades PARADOXI Observatory" />
          </div>
        </div>
        <div className="trades-grid">
          {TRADES.map((t) => (
            <div key={t.symbol} className="trade-card">
              <div className="chart-wrap">
                <img src={t.image} alt={`Trade ${t.symbol}`} />
                <div className="badges">
                  <span className="symbol">{t.symbol}</span>
                  <span className={`direction ${t.direction}`}>{t.direction === "long" ? "Long" : "Short"}</span>
                </div>
              </div>
              <div className="body">
                <p className="result">{t.result}</p>
                <p className="desc">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Méthode ─────────────────────────────────────────────────────────────────

function Methode() {
  return (
    <section className="section" id="methode">
      <div className="wrap">
        <div className="section-head center" style={{ marginLeft: "auto", marginRight: "auto" }}>
          <p className="eyebrow">Architecture analytique</p>
          <h2>Un processus rigoureux, pas une opinion</h2>
          <p>Consolidé chaque semaine dans un index propriétaire : le <strong>PCI</strong> (Paradoxi Confluence Index).</p>
        </div>
        <div className="steps">
          {STEPS.map((s) => (
            <div key={s.num} className="step">
              <div className="num">{s.num}</div>
              <p className="tag">{s.tag}</p>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ────────────────────────────────────────────────────────────────

function FeaturesGrid() {
  return (
    <section className="section soft" id="rapport-features">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Conditions d'accès</p>
          <h2>Tout ce que vous recevrez, dès maintenant.</h2>
          <p>L'intégralité du contenu, sans friction. La confiance se gagne par la qualité — pas par les contrats.</p>
        </div>
        <div className="features">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature">
              <div className="icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{f.icon}</svg></div>
              <div><h3>{f.title}</h3><p>{f.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Founder ─────────────────────────────────────────────────────────────────

function Founder() {
  return (
    <section className="section">
      <div className="wrap founder">
        <div className="founder-portrait">
          <img src={portraitFounder} alt="Paul Castella, fondateur de PARADOXI Observatory" />
        </div>
        <div className="founder-body">
          <p className="eyebrow">La conviction derrière l'Observatoire</p>
          <h2 style={{ fontSize: "clamp(1.7rem,2.6vw,2.3rem)", fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1.2, margin: "0 0 20px" }}>
            PARADOXI Observatory existe parce qu'un accès sérieux aux marchés ne devrait pas être réservé aux professionnels.
          </h2>
          <p>La majorité des traders particuliers ne manquent pas d'ambition. Ils manquent d'un cadre. PARADOXI a été construit en réponse à ce manque : un processus analytique rigoureux — COT, macro, banques centrales, flux institutionnels — synthétisé pour être lisible, décisionnel et exploitable, sans expérience institutionnelle préalable.</p>
          <p>Nous n'avons pas vocation à vous dire quoi faire. Nous avons vocation à vous donner les éléments pour décider vous-même — avec plus de clarté et plus de confiance dans votre propre jugement.</p>
          <div className="founder-proof">
            <div className="founder-proof-item">
              <span className="icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 17l6-6 4 4 8-8M21 7v6h-6" /></svg></span>
              <div><h4>Un processus reproductible, pas une opinion</h4><p>Le même pipeline, la même rigueur, chaque semaine — sans improvisation.</p></div>
            </div>
            <div className="founder-proof-item">
              <span className="icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" /></svg></span>
              <div><h4>Indépendant par construction</h4><p>Aucun affilié, aucun sponsor — seule la qualité de la recherche compte.</p></div>
            </div>
            <div className="founder-proof-item">
              <span className="icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg></span>
              <div><h4>Conçu pour des décideurs, pas des suiveurs</h4><p>Les éléments pour un jugement informé — jamais un signal à copier.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────

function Testimonials() {
  const items = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section className="section soft">
      <div className="wrap">
        <div className="section-head center" style={{ marginLeft: "auto", marginRight: "auto" }}>
          <p className="eyebrow">Ils lisent PARADOXI</p>
          <h2>Ce qu'en disent nos lecteurs</h2>
        </div>
        <div className="testimonials-viewport">
          <div className="testimonials-grid">
            {items.map((t, i) => (
              <div key={i} className="testimonial">
                <span className="stars">★★★★★</span>
                <p className="quote">{t.quote}</p>
                <div className="author">
                  <span className="avatar">{t.initials}</span>
                  <div>
                    <p className="name">{t.name}</p>
                    <p className="role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────

function CheckIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>;
}

function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <div className="section-head center" style={{ marginLeft: "auto", marginRight: "auto" }}>
          <p className="eyebrow">Abonnement</p>
          <h2>Un tarif simple, sans surprise.</h2>
        </div>
        <div className="pricing-grid">
          <div className="price-card">
            <span className="price-badge">Période de lancement · Terminée</span>
            <p className="price-amount" style={{ textDecoration: "line-through", color: "var(--text-faint)" }}>Gratuit</p>
            <p className="price-desc">L'accès complet était offert sans condition pendant la période de lancement.</p>
            <ul className="price-list">
              {PLAN_CHECKLIST.slice(0, 3).map((item) => <li key={item}><CheckIcon />{item}</li>)}
            </ul>
            <span className="price-cta">Offre expirée</span>
          </div>
          <div className="price-card">
            <span className="price-badge">Membre</span>
            <p className="price-amount">49,99&nbsp;€<span>/mois</span></p>
            <p className="price-desc">Tarif préférentiel réservé aux membres déjà inscrits avant l'ouverture.</p>
            <ul className="price-list">
              {PLAN_CHECKLIST.map((item) => <li key={item}><CheckIcon />{item}</li>)}
            </ul>
            <Link to="/abonnement" className="price-cta">Souscrire</Link>
          </div>
          <div className="price-card featured">
            <span className="price-badge">Disponible maintenant</span>
            <p className="price-amount">69,99&nbsp;€<span>/mois</span></p>
            <p className="price-desc">L'accès complet — rapports, scorecard, watchlist, décisions de trades. Sans engagement.</p>
            <ul className="price-list">
              <li><CheckIcon />Rapport Macro Hebdomadaire</li>
              <li><CheckIcon />FX Scorecard</li>
              <li><CheckIcon />Central Bank Watch</li>
              <li><CheckIcon />Weekly Bias &amp; Décisions de Trades</li>
            </ul>
            <Link to="/abonnement" className="price-cta">Souscrire</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function Faq() {
  return (
    <section className="section soft" id="faq">
      <div className="wrap">
        <div className="faq-layout">
          <div className="faq-phone">
            <img src={mobileMockup} alt="PARADOXI Observatory sur mobile — profil du fondateur" />
          </div>
          <div>
            <div className="section-head">
              <p className="eyebrow">Questions fréquentes</p>
              <h2>Tout ce qu'il faut savoir</h2>
            </div>
            <div className="faq-list">
              {FAQ.map((f, i) => (
                <details key={f.q} className="faq-item" open={i === 0}>
                  <summary>{f.q}<span className="plus">+</span></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <img className="footer-logo" src={paradoxiLogoLight} alt="PARADOXI Observatory" />
            <p className="blurb">L'observatoire de recherche pour ceux qui ont décidé de comprendre les marchés — pas de les subir.</p>
          </div>
          <div>
            <h4>Navigation</h4>
            <ul><li><a href="#rapport">Rapport</a></li><li><a href="#methode">Méthode</a></li><li><a href="#faq">FAQ</a></li></ul>
          </div>
          <div>
            <h4>Abonnement</h4>
            <ul><li><a href="#pricing">Tarifs</a></li><li><a href="#pricing">S'abonner</a></li></ul>
          </div>
          <div>
            <h4>Légal</h4>
            <ul>
              <li><Link to="/mentions-legales">Mentions légales</Link></li>
              <li><Link to="/cgv">CGV</Link></li>
              <li><Link to="/confidentialite">Confidentialité</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          CONFIDENTIEL · Contenu éducatif et informatif uniquement. PARADOXI Observatory ne constitue en aucun cas un conseil en investissement. Le trading comporte un risque élevé de perte en capital.<br />
          © {new Date().getFullYear()} PAMILYS INVEST — PARADOXI Observatory. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

// ─── App modal ───────────────────────────────────────────────────────────────

function AppModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="app-modal is-open" id="app-modal">
      <div className="app-modal-backdrop" onClick={onClose} />
      <div className="app-modal-panel">
        <button type="button" className="app-modal-close" aria-label="Fermer" onClick={onClose}>✕</button>
        <div className="app-modal-hero">
          <img className="app-modal-icon" src={appIcon} alt="Icône de l'application PARADOXI Observatory" />
          <h3>La recherche macro de PARADOXI, toujours à portée de main.</h3>
          <p>Rapports, biais directionnels et alertes reçus en notification, lus hors-ligne, archivés automatiquement.</p>
          <div className="app-modal-notif">
            <img src={appNotification} alt="Aperçu d'une notification PARADOXI Observatory" />
          </div>
        </div>
        <div className="app-modal-features">
          <div className="app-modal-feature">
            <span className="icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></svg></span>
            <div><h4>Rapports en notification</h4><p>Votre édition arrive sur l'écran verrouillé, chaque dimanche.</p></div>
          </div>
          <div className="app-modal-feature">
            <span className="icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19V6a2 2 0 012-2h12a2 2 0 012 2v13M4 19a2 2 0 002 2h12a2 2 0 002-2M4 19h16M9 9h6m-6 4h6" /></svg></span>
            <div><h4>Lecture hors-ligne</h4><p>Tous vos rapports disponibles sans connexion.</p></div>
          </div>
          <div className="app-modal-feature">
            <span className="icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18M7 15l4-6 3 4 5-8" /></svg></span>
            <div><h4>Watchlist synchronisée</h4><p>Le FX Scorecard mis à jour en continu.</p></div>
          </div>
          <div className="app-modal-feature">
            <span className="icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4.5 8-11V5l-8-3-8 3v6c0 6.5 8 11 8 11z" /></svg></span>
            <div><h4>Archives illimitées</h4><p>Chaque édition passée, cherchable et classée.</p></div>
          </div>
        </div>
        <div className="app-modal-roadmap">
          <div><span className="dot active">✓</span><span>Conception</span></div>
          <div><span className="dot active">✓</span><span>Architecture</span></div>
          <div><span className="dot future">3</span><span>Bêta fermée</span></div>
          <div><span className="dot future">4</span><span>Lancement</span></div>
        </div>
      </div>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

function PdxStyles() {
  return (
    <style>{`
.pdx2{
  --bg:#ffffff; --bg-soft:#f4f5f7; --bg-dark:#111214;
  --text:#101114; --text-muted:#63656d; --text-faint:#9a9ca3;
  --border:#e6e7eb; --accent:#0a63d6; --accent-hover:#084fac; --accent-soft:#eaf1fc;
  --shadow: 0 1px 2px rgba(16,17,20,.03), 0 16px 40px -20px rgba(16,17,20,.12);
  background:var(--bg); color:var(--text);
  font-family:"Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing:antialiased; overflow-x:hidden;
}
.pdx2 *{ box-sizing:border-box; }
.pdx2 img{ max-width:100%; display:block; }
.pdx2 a{ text-decoration:none; color:inherit; }
.pdx2 ul{ margin:0; padding:0; list-style:none; }
.pdx2 section{ position:relative; }
.pdx2 .wrap{ max-width:1200px; margin:0 auto; padding:0 32px; }

.pdx2 .nav{ position:sticky; top:0; z-index:40; background:rgba(255,255,255,.92); backdrop-filter:blur(10px); border-bottom:1px solid var(--border); }
.pdx2 .nav-inner{ max-width:1200px; margin:0 auto; padding:18px 32px; display:flex; align-items:center; justify-content:space-between; }
.pdx2 .logo{ height:34px; width:auto; }
.pdx2 .nav-links{ display:flex; align-items:center; gap:32px; font-size:14.5px; font-weight:500; color:var(--text-muted); }
.pdx2 .nav-links a:hover{ color:var(--text); }
.pdx2 .nav-app-link{ display:inline-flex; align-items:center; gap:7px; font:inherit; color:inherit; background:none; border:none; padding:0; cursor:pointer; }
.pdx2 .nav-app-badge{ font-size:9.5px; font-weight:800; letter-spacing:.05em; text-transform:uppercase; color:var(--accent); background:var(--accent-soft); border:1px solid color-mix(in oklab, var(--accent) 30%, transparent); padding:2px 7px; border-radius:999px; }
.pdx2 .nav-cta{ display:inline-flex; align-items:center; gap:8px; background:var(--accent); color:#fff; font-size:14px; font-weight:600; padding:11px 22px; border-radius:999px; box-shadow:0 8px 20px -8px rgba(10,99,214,.55); transition:background .15s ease, transform .15s ease; }
.pdx2 .nav-cta:hover{ background:var(--accent-hover); transform:translateY(-1px); }

.pdx2 .hero{ padding:88px 0 0; }
.pdx2 .hero-grid{ display:grid; grid-template-columns:1fr 1.15fr; gap:44px; align-items:center; }
.pdx2 .hero h1{ font-size:clamp(2.6rem, 4.6vw, 4.4rem); font-weight:800; line-height:1.05; letter-spacing:-0.02em; margin:0 0 24px; text-wrap:balance; }
.pdx2 .hero h1 em{ font-style:normal; color:var(--accent); }
.pdx2 .hero .lede{ font-size:18px; line-height:1.65; color:var(--text-muted); max-width:46ch; margin:0 0 32px; }
.pdx2 .hero-actions{ display:flex; flex-wrap:wrap; align-items:center; gap:16px; margin-bottom:20px; }
.pdx2 .btn-primary{ display:inline-flex; align-items:center; gap:8px; background:var(--accent); color:#fff; font-size:15.5px; font-weight:700; padding:16px 30px; border-radius:999px; box-shadow:0 12px 28px -10px rgba(10,99,214,.5); transition:background .15s ease, transform .15s ease; }
.pdx2 .btn-primary:hover{ background:var(--accent-hover); transform:translateY(-1px); }
.pdx2 .btn-ghost{ display:inline-flex; align-items:center; gap:8px; background:#fff; color:var(--text); font-size:15.5px; font-weight:600; padding:15px 28px; border-radius:999px; border:1.5px solid var(--border); transition:border-color .15s ease, background .15s ease; }
.pdx2 .btn-ghost:hover{ border-color:var(--text); }
.pdx2 .hero-meta{ display:flex; align-items:center; gap:10px; font-size:13.5px; color:var(--text-muted); }
.pdx2 .hero-meta .dot{ color:var(--border); }
.pdx2 .hero-meta .stars{ color:#f5a623; letter-spacing:1px; }
.pdx2 .hero-visual{ position:relative; margin-right:-4%; }
.pdx2 .hero-visual img{ width:112%; max-width:112%; height:auto; display:block; -webkit-mask-image: radial-gradient(ellipse closest-side at 50% 46%, black 48%, transparent 100%); mask-image: radial-gradient(ellipse closest-side at 50% 46%, black 48%, transparent 100%); }

.pdx2 .trust-bar{ background:var(--bg-dark); color:#fff; margin-top:64px; }
.pdx2 .trust-inner{ max-width:1200px; margin:0 auto; padding:20px 32px; display:flex; flex-wrap:nowrap; gap:clamp(16px,3vw,40px); justify-content:center; overflow-x:auto; }
.pdx2 .trust-item{ display:flex; align-items:center; gap:9px; font-size:clamp(11.5px,1.35vw,14px); color:#c7c9d1; white-space:nowrap; }
.pdx2 .trust-item strong{ color:#fff; font-weight:700; }
.pdx2 .trust-item svg{ flex-shrink:0; opacity:.8; }

.pdx2 .section{ padding:96px 0; }
.pdx2 .section.soft{ background:var(--bg-soft); }
.pdx2 .section-head{ max-width:640px; margin:0 0 56px; }
.pdx2 .eyebrow{ font-size:12.5px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--accent); margin:0 0 12px; }
.pdx2 .section-head h2{ font-size:clamp(1.9rem, 3vw, 2.7rem); font-weight:800; letter-spacing:-0.01em; line-height:1.15; margin:0 0 16px; text-wrap:balance; }
.pdx2 .section-head p{ font-size:16.5px; line-height:1.65; color:var(--text-muted); margin:0; }
.pdx2 .section-head.center{ text-align:center; }

.pdx2 .steps{ display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
.pdx2 .step{ background:#fff; border:1px solid var(--border); border-radius:20px; padding:28px 22px; }
.pdx2 .step .num{ display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:50%; background:var(--accent-soft); color:var(--accent); font-size:13px; font-weight:800; margin-bottom:18px; }
.pdx2 .step .tag{ font-size:11px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; color:var(--text-faint); margin-bottom:6px; }
.pdx2 .step h3{ font-size:16.5px; font-weight:700; margin:0 0 8px; }
.pdx2 .step p{ font-size:14px; line-height:1.6; color:var(--text-muted); margin:0; }

.pdx2 .features{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
.pdx2 .feature{ background:#fff; border:1px solid var(--border); border-radius:20px; padding:26px; display:flex; gap:16px; align-items:flex-start; }
.pdx2 .feature .icon{ flex-shrink:0; width:42px; height:42px; border-radius:12px; background:var(--accent-soft); color:var(--accent); display:flex; align-items:center; justify-content:center; }
.pdx2 .feature h3{ font-size:15px; font-weight:700; margin:0 0 4px; }
.pdx2 .feature p{ font-size:13.5px; line-height:1.55; color:var(--text-muted); margin:0; }

.pdx2 .pricing-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
.pdx2 .price-card{ background:#fff; border:1.5px solid var(--border); border-radius:24px; padding:34px 28px; display:flex; flex-direction:column; }
.pdx2 .price-card.featured{ border-color:var(--accent); box-shadow:0 20px 44px -20px rgba(10,99,214,.35); }
.pdx2 .price-badge{ display:inline-flex; align-items:center; gap:6px; align-self:flex-start; font-size:11px; font-weight:800; letter-spacing:.06em; text-transform:uppercase; padding:6px 12px; border-radius:999px; background:var(--bg-soft); color:var(--text-muted); margin-bottom:20px; }
.pdx2 .price-card.featured .price-badge{ background:var(--accent-soft); color:var(--accent); }
.pdx2 .price-amount{ font-size:2.6rem; font-weight:800; letter-spacing:-0.02em; margin:0 0 6px; }
.pdx2 .price-amount span{ font-size:14px; font-weight:500; color:var(--text-muted); }
.pdx2 .price-desc{ font-size:13.5px; color:var(--text-muted); margin:0 0 24px; line-height:1.55; }
.pdx2 .price-list{ display:flex; flex-direction:column; gap:11px; margin:0 0 28px; padding-top:20px; border-top:1px solid var(--border); }
.pdx2 .price-list li{ display:flex; gap:10px; align-items:flex-start; font-size:13.5px; color:var(--text); }
.pdx2 .price-list li svg{ flex-shrink:0; margin-top:2px; color:var(--accent); }
.pdx2 .price-cta{ margin-top:auto; text-align:center; padding:14px; border-radius:999px; font-size:14.5px; font-weight:700; border:1.5px solid var(--border); color:var(--text); display:block; }
.pdx2 .price-card.featured .price-cta{ background:var(--accent); color:#fff; border-color:var(--accent); }

.pdx2 .faq-list{ max-width:760px; margin:0 auto; display:flex; flex-direction:column; }
.pdx2 .faq-item{ border-bottom:1px solid var(--border); padding:26px 0; }
.pdx2 .faq-item summary{ display:flex; align-items:center; justify-content:space-between; gap:16px; font-size:16px; font-weight:600; cursor:pointer; list-style:none; }
.pdx2 .faq-item summary::-webkit-details-marker{ display:none; }
.pdx2 .faq-item summary .plus{ color:var(--accent); font-size:20px; font-weight:400; transition:transform .2s ease; }
.pdx2 .faq-item[open] summary .plus{ transform:rotate(45deg); }
.pdx2 .faq-item p{ margin:14px 0 0; font-size:14.5px; line-height:1.7; color:var(--text-muted); max-width:64ch; }

.pdx2 .footer{ background:var(--bg-dark); color:#c7c9d1; padding:72px 0 40px; }
.pdx2 .footer-grid{ display:grid; grid-template-columns:1.3fr 1fr 1fr 1fr; gap:40px; margin-bottom:56px; }
.pdx2 .footer-logo{ height:20px; width:auto; margin-bottom:18px; filter:invert(1) brightness(2); }
.pdx2 .footer p.blurb{ font-size:14px; line-height:1.6; color:#8d8f99; max-width:32ch; }
.pdx2 .footer h4{ font-size:12.5px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:#fff; margin:0 0 18px; }
.pdx2 .footer ul{ display:flex; flex-direction:column; gap:12px; }
.pdx2 .footer a{ font-size:14px; color:#a9abb4; transition:color .15s ease; }
.pdx2 .footer a:hover{ color:#fff; }
.pdx2 .footer-bottom{ border-top:1px solid #26272c; padding-top:28px; font-size:12.5px; color:#71737c; line-height:1.7; }

.pdx2 .marquee-section{ padding:44px 0; border-bottom:1px solid var(--border); }
.pdx2 .marquee-label{ text-align:center; font-size:11px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--text-faint); margin:0 0 28px; }
.pdx2 .marquee-viewport{ overflow:hidden; -webkit-mask-image:linear-gradient(to right, transparent, black 10%, black 90%, transparent); mask-image:linear-gradient(to right, transparent, black 10%, black 90%, transparent); }
.pdx2 .marquee-logos{ display:flex; align-items:center; gap:64px; width:max-content; animation:pdx-marquee-scroll 28s linear infinite; }
.pdx2 .marquee-logos img{ height:22px; width:auto; flex-shrink:0; opacity:.55; filter:grayscale(1); transition:opacity .15s ease; }
.pdx2 .marquee-logos img:hover{ opacity:.9; }
@keyframes pdx-marquee-scroll{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }
@media (prefers-reduced-motion: reduce){ .pdx2 .marquee-logos{ animation:none; flex-wrap:wrap; justify-content:center; } }

.pdx2 .showcase{ padding:40px 0; }
.pdx2 .showcase-frame{ position:relative; border-radius:32px; padding:28px; background:radial-gradient(120% 140% at 50% 0%, color-mix(in oklab, var(--accent) 7%, transparent), transparent 60%), var(--bg-soft); }
.pdx2 .showcase-card{ position:relative; border-radius:22px; overflow:hidden; box-shadow:0 2px 6px rgba(16,17,20,.05), 0 30px 60px -24px rgba(16,17,20,.22); }
.pdx2 .showcase-card img{ width:100%; display:block; }

.pdx2 .trades-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:48px; }
.pdx2 .trade-card{ border:1px solid var(--border); border-radius:20px; overflow:hidden; background:#fff; transition:border-color .15s ease, box-shadow .15s ease; }
.pdx2 .trade-card:hover{ border-color:#d5d7dc; box-shadow:var(--shadow); }
.pdx2 .trade-card .chart-wrap{ position:relative; }
.pdx2 .trade-card img{ width:100%; display:block; }
.pdx2 .trade-card .badges{ position:absolute; top:12px; left:12px; right:12px; display:flex; justify-content:space-between; }
.pdx2 .trade-card .symbol{ background:rgba(255,255,255,.92); border:1px solid var(--border); font-size:12px; font-weight:800; padding:5px 11px; border-radius:999px; backdrop-filter:blur(4px); }
.pdx2 .trade-card .direction{ font-size:11.5px; font-weight:800; padding:5px 11px; border-radius:999px; backdrop-filter:blur(4px); }
.pdx2 .trade-card .direction.long{ background:rgba(234,251,242,.95); color:#1b9e5c; border:1px solid #b9ecd2; }
.pdx2 .trade-card .direction.short{ background:rgba(254,238,238,.95); color:#c0392b; border:1px solid #f3c6c6; }
.pdx2 .trade-card .body{ padding:16px 18px 20px; }
.pdx2 .trade-card .result{ font-size:11.5px; font-weight:700; letter-spacing:.04em; text-transform:uppercase; color:var(--accent); margin:0 0 6px; }
.pdx2 .trade-card p.desc{ font-size:13.5px; line-height:1.55; color:var(--text-muted); margin:0; }

.pdx2 .faq-layout{ display:grid; grid-template-columns:.85fr 1.15fr; gap:56px; align-items:start; }
.pdx2 .faq-phone{ border-radius:32px; overflow:hidden; box-shadow:var(--shadow); position:sticky; top:100px; }
.pdx2 .faq-phone img{ width:100%; display:block; }

.pdx2 .testimonials-viewport{ overflow:hidden; -webkit-mask-image:linear-gradient(to right, transparent, black 6%, black 94%, transparent); mask-image:linear-gradient(to right, transparent, black 6%, black 94%, transparent); }
.pdx2 .testimonials-grid{ display:flex; gap:20px; width:max-content; animation:pdx-testimonials-scroll 42s linear infinite; }
.pdx2 .testimonials-viewport:hover .testimonials-grid{ animation-play-state:paused; }
@keyframes pdx-testimonials-scroll{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }
@media (prefers-reduced-motion: reduce){ .pdx2 .testimonials-grid{ animation:none; flex-wrap:wrap; width:auto; } }
.pdx2 .testimonial{ background:#fff; border:1px solid var(--border); border-radius:20px; padding:26px; display:flex; flex-direction:column; gap:16px; width:360px; flex-shrink:0; }
.pdx2 .testimonial .stars{ color:#f5a623; font-size:13px; letter-spacing:2px; }
.pdx2 .testimonial p.quote{ font-size:14.5px; line-height:1.65; color:var(--text); margin:0; flex:1; }
.pdx2 .testimonial .author{ display:flex; align-items:center; gap:10px; }
.pdx2 .testimonial .avatar{ width:36px; height:36px; border-radius:50%; flex-shrink:0; background:var(--accent-soft); color:var(--accent); display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:800; }
.pdx2 .testimonial .name{ font-size:13.5px; font-weight:700; color:var(--text); }
.pdx2 .testimonial .role{ font-size:12px; color:var(--text-muted); }

.pdx2 .founder{ display:grid; grid-template-columns:.8fr 1.2fr; gap:56px; align-items:center; }
.pdx2 .founder-portrait{ border-radius:28px; overflow:hidden; box-shadow:0 2px 6px rgba(16,17,20,.05), 0 30px 60px -24px rgba(16,17,20,.25); }
.pdx2 .founder-portrait img{ width:100%; display:block; }
.pdx2 .founder-body p{ font-size:15px; line-height:1.7; color:var(--text-muted); margin:0 0 16px; }
.pdx2 .founder-proof{ display:flex; flex-direction:column; gap:12px; margin-top:28px; }
.pdx2 .founder-proof-item{ display:flex; gap:14px; padding:16px 18px; border:1px solid var(--border); border-radius:14px; background:#fff; }
.pdx2 .founder-proof-item .icon{ flex-shrink:0; width:36px; height:36px; border-radius:10px; background:var(--accent-soft); color:var(--accent); display:flex; align-items:center; justify-content:center; }
.pdx2 .founder-proof-item h4{ font-size:14px; font-weight:700; margin:0 0 3px; }
.pdx2 .founder-proof-item p{ font-size:13px; line-height:1.5; color:var(--text-muted); margin:0; }

.pdx2 .app-modal{ position:fixed; inset:0; z-index:100; display:flex; align-items:flex-start; justify-content:center; padding:5vh 20px; overflow-y:auto; }
.pdx2 .app-modal-backdrop{ position:fixed; inset:0; background:rgba(13,14,17,.55); backdrop-filter:blur(3px); }
.pdx2 .app-modal-panel{ position:relative; background:#fff; border-radius:28px; max-width:720px; width:100%; box-shadow:0 40px 100px -20px rgba(10,20,40,.4); overflow:hidden; }
.pdx2 .app-modal-close{ position:absolute; top:18px; right:18px; z-index:2; width:36px; height:36px; border-radius:50%; border:1px solid var(--border); background:#fff; color:var(--text-muted); font-size:16px; line-height:1; display:flex; align-items:center; justify-content:center; cursor:pointer; }
.pdx2 .app-modal-close:hover{ color:var(--text); border-color:#d5d7dc; }
.pdx2 .app-modal-hero{ text-align:center; padding:56px 40px 8px; background:radial-gradient(70% 100% at 50% 0%, color-mix(in oklab, var(--accent) 9%, transparent), transparent 70%); }
.pdx2 .app-modal-icon{ width:96px; height:96px; margin:0 auto 24px; border-radius:22px; box-shadow:0 20px 40px -14px rgba(10,20,40,.35); }
.pdx2 .app-modal-hero h3{ font-size:clamp(1.5rem,3vw,2rem); font-weight:800; letter-spacing:-0.01em; margin:0 auto; max-width:440px; text-wrap:balance; }
.pdx2 .app-modal-hero p{ font-size:14.5px; color:var(--text-muted); max-width:420px; margin:14px auto 0; line-height:1.6; }
.pdx2 .app-modal-notif{ max-width:340px; margin:32px auto 0; border-radius:18px; overflow:hidden; box-shadow:0 30px 60px -20px rgba(10,20,40,.3); }
.pdx2 .app-modal-notif img{ width:100%; display:block; }
.pdx2 .app-modal-features{ display:grid; grid-template-columns:1fr 1fr; gap:14px; padding:36px 40px 8px; }
.pdx2 .app-modal-feature{ display:flex; gap:12px; }
.pdx2 .app-modal-feature .icon{ flex-shrink:0; width:34px; height:34px; border-radius:10px; background:var(--accent-soft); color:var(--accent); display:flex; align-items:center; justify-content:center; }
.pdx2 .app-modal-feature h4{ font-size:13.5px; font-weight:700; margin:0 0 3px; }
.pdx2 .app-modal-feature p{ font-size:12.5px; color:var(--text-muted); margin:0; line-height:1.5; }
.pdx2 .app-modal-roadmap{ display:flex; justify-content:space-between; gap:8px; padding:28px 40px 40px; border-top:1px solid var(--border); margin-top:20px; }
.pdx2 .app-modal-roadmap div{ flex:1; text-align:center; }
.pdx2 .app-modal-roadmap .dot{ width:22px; height:22px; margin:0 auto 8px; border-radius:50%; font-size:10px; font-weight:800; display:flex; align-items:center; justify-content:center; color:#fff; background:var(--text); }
.pdx2 .app-modal-roadmap .dot.active{ background:var(--accent); }
.pdx2 .app-modal-roadmap .dot.future{ background:#fff; color:var(--text-faint); border:2px solid var(--border); }
.pdx2 .app-modal-roadmap span{ font-size:11px; font-weight:600; color:var(--text-muted); }

@media (max-width: 860px){
  .pdx2 .app-modal-features{ grid-template-columns:1fr; }
  .pdx2 .founder{ grid-template-columns:1fr; }
  .pdx2 .trades-grid{ grid-template-columns:1fr; }
  .pdx2 .testimonial{ width:82vw; }
  .pdx2 .faq-layout{ grid-template-columns:1fr; }
  .pdx2 .faq-phone{ position:static; max-width:320px; margin:0 auto 40px; }
  .pdx2 .hero-grid{ grid-template-columns:1fr; }
  .pdx2 .hero-visual{ aspect-ratio:16/10; order:-1; margin-right:0; }
  .pdx2 .hero-visual img{ width:100%; max-width:100%; }
  .pdx2 .steps, .pdx2 .features, .pdx2 .pricing-grid{ grid-template-columns:1fr 1fr; }
  .pdx2 .footer-grid{ grid-template-columns:1fr 1fr; }
}
@media (max-width: 600px){
  .pdx2 .wrap, .pdx2 .nav-inner, .pdx2 .trust-inner{ padding-left:20px; padding-right:20px; }
  .pdx2 .nav-links{ display:none; }
  .pdx2 .steps, .pdx2 .features, .pdx2 .pricing-grid{ grid-template-columns:1fr; }
  .pdx2 .footer-grid{ grid-template-columns:1fr; }
  .pdx2 .hero{ padding-top:64px; }
  .pdx2 .section{ padding:64px 0; }
}
`}</style>
  );
}
