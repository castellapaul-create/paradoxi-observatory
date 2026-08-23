import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { PdxStyles } from "@/components/PdxStyles";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

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
        <button
          type="button"
          className="nav-burger"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          )}
        </button>
        <a href="#pricing" className="nav-cta">S'abonner</a>
        {menuOpen && (
          <div className="mobile-menu">
            <a href="#rapport" onClick={close}>Rapport</a>
            <a href="#methode" onClick={close}>Méthode</a>
            <a href="#pricing" onClick={close}>Tarifs</a>
            <button
              type="button"
              className="nav-app-link"
              onClick={() => {
                close();
                onOpenApp();
              }}
            >
              App <span className="nav-app-badge">Bientôt</span>
            </button>
            <a href="#faq" onClick={close}>FAQ</a>
            <a href="#pricing" className="btn-primary" onClick={close}>S'abonner</a>
          </div>
        )}
      </div>
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
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

const TRUST_ITEMS = (
  <>
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
  </>
);

function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="trust-viewport">
        <div className="trust-track">
          <div className="trust-set">{TRUST_ITEMS}</div>
          <div className="trust-set" aria-hidden="true">{TRUST_ITEMS}</div>
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

