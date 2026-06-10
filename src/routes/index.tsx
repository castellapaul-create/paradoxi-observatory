import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect, type FormEvent } from "react";
import {
  Layers,
  BarChart3,
  Landmark,
  Droplets,
  Compass,
  TrendingUp,
  ShieldAlert,
  Eye,
  Plus,
  ArrowRight,
  ArrowUpRight,
  Check,
  Loader2,
} from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { PdxLogo } from "@/components/PdxLogo";
import { subscribeEmail } from "@/lib/api/subscribe.functions";
import paradoxiLogo from "@/assets/paradoxi-logo.png";
import reportFx from "@/assets/report-fx-overview.png";
import reportUsd from "@/assets/report-usd-rates.png";
import reportGbp from "@/assets/report-gbpusd.png";
import reportCover from "@/assets/report-cover.png";
import sectionTrades from "@/assets/section-trades.png";
import sectionBriefing from "@/assets/section-briefing.png";
import sectionRapport from "@/assets/section-rapport.png";
import sectionShowcase from "@/assets/9D653234-1959-4A48-B0BA-DB75F32CF634.jpeg";
import heroHands from "@/assets/hero-hands.png";
import sectionMobile from "@/assets/A4806527-511C-47B8-B8C7-FFA71690663C.png";
import founderBg from "@/assets/8E9213F7-50FE-44F1-B634-A8988C0BB773.png";
import analyseChart from "@/assets/CE981A19-CB33-4A71-A1E6-62F9AC31E1C1.jpeg";
import tradeEurnzd from "@/assets/trade-eurnzd.png";
import tradeNzdjpy from "@/assets/trade-nzdjpy.png";
import tradeUsdcad from "@/assets/trade-usdcad.png";

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
          "Recevez gratuitement chaque semaine la lettre privée PARADOXI Observatory : fondamentaux FX, anticipations de taux et lecture macro institutionnelle.",
      },
      { property: "og:title", content: "PARADOXI Observatory" },
      {
        property: "og:description",
        content: "La synthèse macro FX hebdomadaire — fondamentaux, taux et régimes de marché. Gratuit par email.",
      },
      { property: "og:type", content: "website" },
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

const TESTIMONIALS = [
  { quote: "Depuis que je lis PARADOXI, j'aborde chaque semaine avec une vision structurée que je n'avais pas avant. Ce n'est pas un rapport — c'est un cadre de pensée.", name: "Julien M.", role: "Trader indépendant FX" },
  { quote: "La rigueur est institutionnelle, le ton est humain. C'est exactement le niveau que j'attendais depuis des années.", name: "Sarah L.", role: "Gérante de portefeuille" },
  { quote: "Pour la première fois, je comprends pourquoi les marchés bougent. Pas par chance. Par méthode.", name: "Antoine R.", role: "Analyste macro" },
  { quote: "J'ai arrêté trois abonnements pour ne garder que PARADOXI. La différence, c'est la profondeur analytique.", name: "Mehdi B.", role: "Trader prop firm" },
  { quote: "Ce que j'apprécie, c'est que personne ne me dit quoi faire. On me donne les éléments pour décider moi-même.", name: "Claire D.", role: "Day trader" },
  { quote: "PARADOXI m'a aidé à construire un regard sur les marchés. Pas un système — un regard.", name: "Thomas V.", role: "Investisseur particulier" },
];

const EDITION_ITEMS = [
  { icon: Layers, title: "Macro Framework", desc: "Le régime de marché, la hiérarchie des catalyseurs et le biais directionnel de la semaine." },
  { icon: BarChart3, title: "FX Scorecard", desc: "La force relative des devises en un coup d'œil — pour savoir qui mène le marché et pourquoi." },
  { icon: Landmark, title: "Central Bank Watch", desc: "Positionnement des grandes banques centrales, anticipations de taux et calendrier décisionnel." },
  { icon: Droplets, title: "Liquidity Map", desc: "L'état des conditions de liquidité et de l'appétit pour le risque à travers l'ensemble des actifs." },
  { icon: Compass, title: "Weekly Bias", desc: "Le biais directionnel par devise — fondamentaux, technique et catalyseurs convergents." },
  { icon: TrendingUp, title: "Institutional Flows", desc: "Où se positionnent les mains fortes — et ce que leur positionnement révèle sur le marché." },
  { icon: ShieldAlert, title: "Risk Regime", desc: "Risk-on, risk-off ou transition — et ce que chaque régime implique pour votre lecture de marché." },
  { icon: Eye, title: "Watchlist Forex", desc: "Les paires sous surveillance avec thèse directionnelle, contexte macro et niveaux structurants." },
];

const FAQ = [
  { q: "Qu'est-ce que PARADOXI Observatory exactement ?", a: "Un observatoire de recherche financière indépendant. Chaque semaine, nous produisons une analyse macro approfondie des marchés des changes : fondamentaux, banques centrales, positionnement institutionnel, régimes de risque. Pas des signaux à copier — une compréhension à construire." },
  { q: "Combien coûte l'accès ?", a: "L'accès est entièrement gratuit pendant la période de lancement. Une formule premium à 69 €/mois sera proposée prochainement, sur liste d'attente. Les lecteurs inscrits aujourd'hui bénéficieront d'un tarif préférentiel à l'ouverture." },
  { q: "À quelle fréquence le rapport est-il publié ?", a: "Une édition complète chaque dimanche soir — pour préparer votre semaine de marché avec méthode. Accompagnée d'un briefing quotidien les jours d'ouverture, pour suivre l'évolution du contexte macro en temps réel." },
  { q: "Est-ce un conseil en investissement ?", a: "Non. PARADOXI Observatory est un contenu strictement éducatif et informatif. Il ne constitue en aucun cas une recommandation personnalisée d'achat ou de vente d'instruments financiers. Vous restez seul décideur de vos choix — c'est précisément l'objectif." },
];

// ─── Email form ──────────────────────────────────────────────────────────────

type FormStatus = "idle" | "loading" | "done" | "error";

function EmailForm({ large }: { large?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;
    setStatus("loading");
    setErrorMsg("");
    try {
      await subscribeEmail({ data: { email: email.trim() } });
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Une erreur est survenue, veuillez réessayer.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  if (status === "done") {
    return (
      <div className={`mx-auto flex items-center justify-center gap-2 rounded-2xl border border-primary/40 bg-primary/10 px-6 py-4 text-primary ${large ? "max-w-xl text-base" : "max-w-md text-sm"}`}>
        <Check className="h-5 w-5 shrink-0" />
        Merci — votre prochaine édition arrive dimanche.
      </div>
    );
  }

  return (
    <div className="mx-auto w-full">
      <form
        onSubmit={onSubmit}
        className={`mx-auto flex flex-col gap-2 rounded-2xl border border-border bg-card/80 p-3 backdrop-blur sm:flex-row sm:items-center sm:rounded-full sm:p-2 sm:pl-5 ${large ? "max-w-xl" : "max-w-md"}`}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre adresse email"
          className="w-full bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none sm:h-full sm:flex-1 sm:px-0 sm:py-0"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03] disabled:opacity-70 disabled:hover:scale-100 sm:w-auto sm:rounded-full sm:py-0 sm:h-11"
        >
          {status === "loading" ? (
            <><Loader2 className="h-4 w-4 animate-spin" />Inscription…</>
          ) : "Recevoir le rapport"}
        </button>
      </form>
      {status === "error" && errorMsg && (
        <p className={`mx-auto mt-3 text-center text-xs text-destructive ${large ? "max-w-xl" : "max-w-md"}`}>{errorMsg}</p>
      )}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

// ─── Cursor glow ─────────────────────────────────────────────────────────────

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -1000, y: -1000 });
  const target = useRef({ x: -1000, y: -1000 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.10);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.10);
      el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{
        width: "750px",
        height: "750px",
        background: "radial-gradient(circle, oklch(0.78 0.18 150 / 0.05) 0%, transparent 58%)",
        willChange: "transform",
      }}
    />
  );
}

function Index() {
  useReveal();
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground antialiased">
      <CursorGlow />
      <Nav />
      <Hero />
      <LogoMarquee />
      <MethodeSection />
      <WeeklyReport />
      <Editions />
      <RecentTradesSection />
      <AnalyseCard />
      <WhoAmI />
      <Testimonials />
      <PourQuiSection />
      <PricingSection />
      <PrivateLetter />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <PdxLogo />
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#rapport" className="transition-colors hover:text-foreground">Rapport</a>
          <a href="#methode" className="transition-colors hover:text-foreground">Méthode</a>
          <a href="#pour-qui" className="transition-colors hover:text-foreground">Pour qui</a>
          <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/paul-c-977b70153"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center justify-center text-muted-foreground transition-colors hover:text-foreground md:flex"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/paradoxi.observatory?utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center justify-center text-muted-foreground transition-colors hover:text-foreground md:flex"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
          <a href="#subscribe" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03] hover:shadow-[0_0_20px_-4px] hover:shadow-primary/50">
            Recevoir le rapport
          </a>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-6 pt-24 pb-20">
      {/* Hero background — desktop only */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <img
          src={sectionShowcase}
          alt=""
          className="h-full w-full object-cover"
          style={{ opacity: 0.20, objectPosition: "center 10%", maskImage: "radial-gradient(ellipse 62% 90% at 50% 25%, transparent 22%, black 68%)" }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 pdx-grid opacity-[0.14] [mask-image:radial-gradient(75%_80%_at_50%_30%,black,transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[900px] pdx-glow opacity-45" />
      {/* Hands — desktop (opacity 0.55) */}
      <div className="pointer-events-none absolute inset-0 hidden items-center justify-center overflow-hidden md:flex">
        <img
          src={heroHands}
          alt=""
          className="w-full max-w-5xl object-contain"
          style={{
            opacity: 0.55,
            mixBlendMode: "screen",
            maskImage: "radial-gradient(ellipse 82% 58% at 50% 50%, black 10%, transparent 68%)",
          }}
        />
      </div>
      {/* Hands — mobile (opacity 0.80, plus grande visibilité) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden md:hidden">
        <img
          src={heroHands}
          alt=""
          className="w-full object-contain"
          style={{
            opacity: 0.80,
            mixBlendMode: "screen",
            maskImage: "radial-gradient(ellipse 90% 55% at 50% 50%, black 10%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl text-center">
        {/* Badge */}
        <div className="reveal mb-9 inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/[0.07] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" style={{ boxShadow: "0 0 6px 2px oklch(0.78 0.18 150 / 0.7)" }} />
          OBSERVATOIRE DE RECHERCHE FX
        </div>

        {/* Title */}
        <h1
          className="reveal font-black tracking-tight"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 4.8rem)", lineHeight: "1.08", overflowWrap: "break-word" }}
        >
          Vous analysez les marchés
          <br />
          <span className="text-primary">avec les outils du retail.</span>
          <br />
          Les desks institutionnels<br className="sm:hidden" /> lisent autre chose.
        </h1>

        {/* Subtitle */}
        <p className="reveal mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Chaque dimanche, recevez gratuitement une analyse macroéconomique et les biais directionnels des principales devises.
        </p>

        {/* Stats row */}
        <div className="reveal mx-auto mt-10 grid w-full max-w-sm grid-cols-3 divide-x divide-border/50 rounded-2xl border border-border/40 bg-card/30 backdrop-blur sm:max-w-none sm:w-auto sm:inline-flex sm:flex-nowrap">
          {[
            { value: "+1000h", label: "de recherche cumulées" },
            { value: "52", label: "dimanches consécutifs" },
            { value: "~300", label: "lecteurs · confidentiel", dot: true },
          ].map((s) => (
            <div key={s.value} className="flex flex-col items-center gap-1 px-4 py-4 text-center sm:flex-row sm:items-center sm:gap-3 sm:px-7 sm:text-left">
              <span className="text-xl font-black text-foreground sm:text-[1.75rem]">{s.value}</span>
              <span className="flex items-center gap-1.5 text-[11px] leading-snug text-muted-foreground sm:text-xs">
                {s.dot && <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-primary sm:block" />}
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Pricing narrative */}
        <div className="reveal mx-auto mt-8 max-w-lg rounded-xl border border-primary/20 bg-primary/[0.05] px-5 py-3 text-center text-sm">
          <span className="font-semibold text-foreground">Gratuit pendant le lancement.</span>
          {" "}<span className="text-muted-foreground">À l'ouverture : <strong className="font-semibold text-foreground/80">69 €/mois</strong> — tarif préférentiel garanti aux inscrits d'aujourd'hui.</span>
        </div>

        {/* Email capture */}
        <div className="reveal mt-6 mx-auto max-w-lg">
          <EmailForm large />
        </div>

        <p className="reveal mt-4 text-xs text-muted-foreground/35">
          Contenu éducatif et informatif · Jamais un conseil en investissement · Données RGPD protégées
        </p>
      </div>
    </section>
  );
}

// ─── Logo strip ───────────────────────────────────────────────────────────────

function LogoMarquee() {
  const items = [...LOGOS, ...LOGOS, ...LOGOS];
  return (
    <div className="border-y border-border/40 py-10">
      <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/35">
        Sources &amp; données utilisées dans la recherche
      </p>
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="pdx-marquee-track flex w-max items-center gap-16">
          {items.map((logo, i) => (
            <img key={i} src={logo.src} alt={logo.alt} className="h-7 w-auto shrink-0 opacity-35 transition-opacity hover:opacity-65 md:h-8" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Weekly Report ────────────────────────────────────────────────────────────

function WeeklyReport() {
  return (
    <section id="rapport" className="mx-auto max-w-7xl px-6 pb-12 md:pb-28">
      <div className="reveal relative">
        <div className="pointer-events-none absolute -inset-6 pdx-glow opacity-15" />
        <div className="relative z-10 overflow-hidden rounded-2xl border border-border/60 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.95)]">
          <img src={sectionRapport} alt="Rapport Fondamental Hebdomadaire" className="w-full" />
        </div>
      </div>
    </section>
  );
}

// ─── Briefing ─────────────────────────────────────────────────────────────────

function BriefingSection() {
  return (
    <section id="briefing" className="mx-auto max-w-7xl px-6 pb-12 md:pb-28">
      <div className="reveal relative">
        <div className="pointer-events-none absolute -inset-6 pdx-glow opacity-15" />
        <div className="relative z-10 overflow-hidden rounded-2xl border border-border/60 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.95)]">
          <img src={sectionBriefing} alt="Briefing Macro Quotidien" className="w-full" />
        </div>
      </div>
    </section>
  );
}

// ─── Trades ───────────────────────────────────────────────────────────────────

function _TvCandlestickMock_unused() {
  const candles: Array<[number, number, number, number, number]> = [
    [8, 88, 76, 92, 73], [18, 80, 70, 84, 67], [28, 74, 82, 86, 71],
    [38, 80, 70, 84, 67], [48, 72, 62, 76, 59], [58, 65, 55, 69, 52],
    [68, 60, 68, 72, 56], [78, 65, 55, 70, 52], [88, 57, 47, 62, 44],
    [98, 50, 42, 56, 39], [108, 45, 55, 58, 41], [118, 50, 40, 54, 37],
    [128, 43, 35, 48, 32], [138, 40, 48, 52, 36], [148, 44, 36, 48, 33],
    [158, 38, 30, 42, 27], [168, 32, 24, 37, 21], [178, 28, 36, 40, 24],
    [188, 32, 24, 36, 21], [198, 28, 20, 33, 17], [208, 24, 16, 29, 13],
    [218, 20, 28, 32, 16], [228, 24, 16, 28, 13], [238, 18, 10, 23, 7],
    [248, 14, 8, 19, 5], [258, 16, 8, 21, 5], [268, 12, 6, 17, 3],
  ];
  return (
    <div className="bg-[#f0f3fa] p-3">
      <div className="flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-700">EUR/USD</span>
          <span className="text-gray-400">·</span>
          <span className="font-medium text-gray-500">1D</span>
          <span className="ml-1 text-[9px] text-gray-400">OANDA</span>
        </div>
        <div className="flex items-center gap-1.5 text-[9px] text-gray-400">
          {["1h","4h","1D","1W"].map(t => (
            <span key={t} className={t === "1D" ? "font-bold text-blue-600" : ""}>{t}</span>
          ))}
        </div>
      </div>
      <div className="mt-0.5 flex items-baseline gap-2 text-[10px]">
        <span className="font-bold text-[#26a69a]">1.0847</span>
        <span className="text-[9px] text-[#26a69a]">+0.0012 (+0.11%)</span>
      </div>
      <svg viewBox="0 0 280 80" className="mt-1 w-full" fill="none">
        {[15, 35, 55, 75].map(y => (
          <line key={y} x1="0" x2="280" y1={y} y2={y} stroke="#dde2ee" strokeWidth="0.5" />
        ))}
        <path d="M0,76 C15,74 30,70 50,62 C70,54 90,46 110,36 C130,27 150,20 170,15 C190,10 210,7 230,5 C250,3 265,2 280,1" stroke="#2196f3" strokeWidth="1" opacity="0.7" />
        {candles.map(([x, o, c, h, l], i) => {
          const up = c < o;
          const col = up ? "#26a69a" : "#ef5350";
          return (
            <g key={i}>
              <line x1={x} x2={x} y1={h} y2={l} stroke={col} strokeWidth="0.8" />
              <rect x={x - 2.5} y={Math.min(o, c)} width="5" height={Math.max(Math.abs(o - c), 1)} fill={col} />
            </g>
          );
        })}
        <text x="272" y="12" fontSize="6" fill="#999" textAnchor="end">1.090</text>
        <text x="272" y="40" fontSize="6" fill="#999" textAnchor="end">1.082</text>
        <text x="272" y="72" fontSize="6" fill="#999" textAnchor="end">1.074</text>
      </svg>
      <div className="flex justify-between text-[8px] text-gray-400">
        <span>Jan</span><span>Fév</span><span>Mar</span><span>Avr</span><span>Mai</span><span>Jun</span>
      </div>
    </div>
  );
}

function _SP500Mock_unused() {
  const lines = [
    { color: "#50dc96", path: "M0,55 C20,52 40,46 60,38 C80,30 100,22 120,16 C140,10 160,6 180,3" },
    { color: "#2196f3", path: "M0,62 C20,60 40,55 60,48 C80,41 100,35 120,28 C140,22 160,17 180,13" },
    { color: "#ff9800", path: "M0,68 C20,66 40,63 60,57 C80,51 100,46 120,40 C140,34 160,30 180,25" },
    { color: "#ef5350", path: "M0,72 C20,71 40,69 60,65 C80,61 100,58 120,54 C140,50 160,48 180,43" },
  ];
  return (
    <div className="bg-card p-3">
      <p className="text-[10px] font-semibold text-foreground/80">S&amp;P 500 · Performance</p>
      <p className="text-[9px] text-muted-foreground">YTD comparatif secteurs</p>
      <svg viewBox="0 0 180 70" className="mt-2 w-full" fill="none">
        {[15, 35, 55].map(y => (
          <line key={y} x1="0" x2="180" y1={y} y2={y} stroke="currentColor" strokeWidth="0.3" opacity="0.12" />
        ))}
        {lines.map((l, i) => (
          <path key={i} d={l.path} stroke={l.color} strokeWidth="1.4" opacity="0.85" />
        ))}
      </svg>
      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
        {[
          { c: "#50dc96", l: "Tech" }, { c: "#2196f3", l: "Fin." },
          { c: "#ff9800", l: "Énergie" }, { c: "#ef5350", l: "Santé" },
        ].map(({ c, l }) => (
          <div key={l} className="flex items-center gap-1">
            <span className="h-1.5 w-3 rounded-full" style={{ backgroundColor: c }} />
            <span className="text-[9px] text-muted-foreground">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TradesSection() {
  return (
    <section id="trades" className="mx-auto max-w-7xl px-6 pb-12 md:pb-28">
      <div className="reveal relative">
        <div className="pointer-events-none absolute -inset-6 pdx-glow opacity-15" />
        <div className="relative z-10 overflow-hidden rounded-2xl border border-border/60 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.95)]">
          <img src={sectionTrades} alt="Recherches & Décisions de Trades" className="w-full" />
        </div>
      </div>
    </section>
  );
}

// ─── Recent Trades ───────────────────────────────────────────────────────────

const RECENT_TRADES = [
  {
    symbol: "EUR/NZD",
    direction: "Long" as const,
    result: "PCI Convergent",
    desc: "COT institutionnel EUR haussier + divergence macro NZD. Biais validé par la CB Watch.",
    image: tradeEurnzd,
  },
  {
    symbol: "NZD/JPY",
    direction: "Short" as const,
    result: "Convergence ×3",
    desc: "Positionnement COT JPY haussier + macro NZD affaiblie + confirmation banque centrale.",
    image: tradeNzdjpy,
  },
  {
    symbol: "USD/CAD",
    direction: "Long" as const,
    result: "PCI Haussier",
    desc: "Biais USD soutenu par la Fed + fragilité macro CAD. Convergence positionnement institutionnel.",
    image: tradeUsdcad,
  },
];

function RecentTradesSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-12 md:pb-28">

      {/* Header */}
      <div className="reveal mb-8 text-center md:mb-14">
        <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/[0.07] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" style={{ boxShadow: "0 0 6px 2px oklch(0.78 0.18 150 / 0.7)" }} />
          Décisions documentées
        </div>
        <h2 className="font-black text-3xl leading-tight md:text-5xl">Des convictions argumentées, pas des signaux</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          Chaque position naît d'une thèse fondamentale construite. Rien n'est masqué — la conviction, le raisonnement et le résultat sont exposés avec la même rigueur.
        </p>
      </div>

      {/* Trade cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {RECENT_TRADES.map((trade) => (
          <div
            key={trade.symbol}
            className="reveal group relative overflow-hidden rounded-2xl border border-border/60 bg-card/30 transition-all duration-300 hover:border-border hover:bg-card/50"
          >
            {/* Chart image */}
            <div className="relative overflow-hidden">
              <img
                src={trade.image}
                alt={`Trade ${trade.symbol}`}
                className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Top badges */}
              <div className="absolute left-3 top-3 flex items-center gap-1.5">
                <span className="rounded-full border border-border/60 bg-background/85 px-2.5 py-1 text-xs font-black backdrop-blur-md">
                  {trade.symbol}
                </span>
              </div>
              <div className="absolute right-3 top-3">
                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-bold backdrop-blur-md ${
                    trade.direction === "Long"
                      ? "border-primary/35 bg-primary/15 text-primary"
                      : "border-red-500/35 bg-red-500/15 text-red-400"
                  }`}
                >
                  {trade.direction}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 px-4 py-3.5">
              <p className="text-xs leading-snug text-muted-foreground">{trade.desc}</p>
              <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-black text-primary">
                {trade.result}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Editions marquee ─────────────────────────────────────────────────────────

function EditionPill({ item }: { item: (typeof EDITION_ITEMS)[number] }) {
  const Icon = item.icon;
  return (
    <div
      title={item.desc}
      className="group flex shrink-0 items-center gap-3 rounded-full border border-border bg-card/60 px-7 py-4 transition-colors duration-300 hover:border-primary/40 hover:bg-card"
    >
      <Icon className="h-5 w-5 shrink-0 text-primary" />
      <span className="whitespace-nowrap text-lg font-medium text-foreground/80 transition-colors group-hover:text-foreground">
        {item.title}
      </span>
    </div>
  );
}

function Editions() {
  const firstRow = EDITION_ITEMS.slice(0, 4);
  const secondRow = EDITION_ITEMS.slice(4);
  const rowA = [...firstRow, ...firstRow, ...firstRow];
  const rowB = [...secondRow, ...secondRow, ...secondRow];
  return (
    <section id="editions" className="py-28">
      <div className="reveal mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-black text-3xl leading-tight md:text-5xl">Ce que vous lirez chaque dimanche soir</h2>
        <p className="mt-4 text-lg text-muted-foreground">Huit modules conçus pour transformer le bruit des marchés en une lecture claire, structurée et décisionnelle.</p>
      </div>
      <div className="reveal mt-8 space-y-5 md:mt-14">
        <div className="pdx-marquee-pause overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="pdx-marquee-track flex w-max items-center gap-5">
            {rowA.map((item, i) => <EditionPill key={`a-${i}`} item={item} />)}
          </div>
        </div>
        <div className="pdx-marquee-pause overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="pdx-marquee-reverse flex w-max items-center gap-5">
            {rowB.map((item, i) => <EditionPill key={`b-${i}`} item={item} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Report showcase ──────────────────────────────────────────────────────────

function ReportShowcase() {
  const cards = [
    { img: reportFx, title: "L'état du marché des changes", tag: "Overview" },
    { img: reportUsd, title: "Le dollar soutenu par les taux", tag: "Forex" },
    { img: reportGbp, title: "Setup GBPUSD", tag: "Watchlist" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:py-28">
      <div className="reveal mx-auto max-w-2xl text-center">
        <h2 className="font-black text-3xl leading-tight md:text-5xl">La rigueur, visible à chaque page</h2>
        <p className="mt-4 text-lg text-muted-foreground">Conçu comme une note de recherche institutionnelle. Dense, mesuré, lisible — même pour celui qui n'a que dix minutes.</p>
      </div>
      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {cards.map((c, i) => (
          <article
            key={c.title}
            className="reveal pdx-hover-glow group overflow-hidden rounded-2xl border border-border/80 bg-card"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 pdx-glow opacity-30" />
              <img src={c.img} alt={c.title} className="w-full transition-transform duration-700 group-hover:scale-[1.04]" />
            </div>
            <div className="flex items-center justify-between p-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-primary">{c.tag}</p>
                <h3 className="mt-1 text-base font-semibold">{c.title}</h3>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── Qui suis-je ─────────────────────────────────────────────────────────────

function WhoAmI() {

  const proofCards = [
    {
      icon: TrendingUp,
      title: "Un processus reproductible, pas une opinion",
      desc: "Chaque édition suit le même pipeline : COT, macro, banques centrales, biais par devise. La même rigueur toutes les semaines — sans improvisation.",
    },
    {
      icon: ShieldAlert,
      title: "Indépendant par construction",
      desc: "Aucun affilié, aucun sponsor, aucune pression commerciale. PARADOXI ne dépend que de la qualité de sa recherche — c'est notre seule ligne de défense.",
    },
    {
      icon: Eye,
      title: "Conçu pour des décideurs, pas des suiveurs",
      desc: "Nous ne vous donnons pas quoi trader. Nous vous donnons les éléments pour que votre propre jugement soit informé, structuré et indépendant.",
    },
  ];


  return (
    <section id="about" className="py-28">
      <div className="mx-auto max-w-7xl px-6">

        {/* Narrative + insight capsules */}
        <div className="grid items-start gap-8 lg:gap-16 lg:grid-cols-2">

          {/* Left: narrative */}
          <div className="reveal">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">La conviction derrière l'Observatoire</p>
            <h2
              className="mt-5 font-black leading-tight tracking-tight"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)" }}
            >
              PARADOXI Observatory existe parce qu'un accès sérieux aux marchés ne devrait pas être réservé aux professionnels.
            </h2>
            <p className="mt-6 border-l-2 border-primary/40 pl-5 text-base italic leading-relaxed text-muted-foreground">
              Nous ne vendons pas une promesse de performance. Nous construisons un observatoire de recherche pour partager la lecture que la plupart des particuliers ambitieux n'ont jamais eu accès.
            </p>
            <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                PARADOXI Observatory est une publication indépendante fondée sur une conviction simple : la compréhension des marchés est une compétence — et comme toutes les compétences, elle s'acquiert par la méthode, la constance et la profondeur analytique.
              </p>
              <p>
                La majorité des traders particuliers ne manquent pas d'ambition. Ils manquent d'un cadre. Ils cherchent des entrées là où ils devraient chercher une <em className="not-italic text-foreground/80">compréhension</em>. Ils veulent des résultats immédiats là où ce qui compte, c'est la progression sur le temps long.
              </p>
              <p>
                PARADOXI a été construit en réponse à ce manque. Chaque édition est le produit d'un processus analytique rigoureux — COT, macro, banques centrales, flux institutionnels — synthétisé pour être lisible, décisionnel et exploitable par un trader sérieux, sans expérience institutionnelle préalable.
              </p>
              <p>
                Nous n'avons pas vocation à vous dire quoi faire. Nous avons vocation à vous donner les éléments pour décider vous-même — avec plus de clarté, plus de structure et plus de confiance dans votre propre jugement.
              </p>
            </div>
          </div>

          {/* Right: 3 insight capsules + founder image */}
          <div className="reveal space-y-4">
            {proofCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="flex gap-4 rounded-xl border border-border/60 bg-card/50 px-5 py-4 transition-colors hover:border-primary/25 hover:bg-card"
                >
                  <span className="mt-0.5 shrink-0 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{card.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
                  </div>
                </div>
              );
            })}
            <div className="hidden justify-center pt-4 md:flex">
              <img
                src={founderBg}
                alt=""
                className="w-3/4"
                style={{ opacity: 0.22, maskImage: "radial-gradient(65% 65% at 50% 50%, black, transparent)" }}
              />
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}

// ─── Méthode ─────────────────────────────────────────────────────────────────

const PIPELINE = [
  {
    id: "COT",
    label: "COT Report",
    desc: "Positionnement des grands spéculateurs et commerciaux sur les futures — identifier qui porte le marché.",
  },
  {
    id: "MACRO",
    label: "Macro Framework",
    desc: "Cycles économiques, données d'inflation, emploi, croissance — lire l'environnement fondamental de chaque devise.",
  },
  {
    id: "CB",
    label: "CB Synthesis",
    desc: "Synthèse des banques centrales : rhétorique, anticipations de taux implicites, calendrier décisionnel.",
  },
  {
    id: "BIAS",
    label: "Bias par devise",
    desc: "Conviction directionnelle pour chaque devise majeure, pondérée par la convergence des trois lectures précédentes.",
  },
];

function MethodeSection() {
  return (
    <section id="methode" className="mx-auto max-w-7xl px-6 py-12 md:py-28">
      <div className="reveal mb-16 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Architecture analytique</p>
        <h2 className="mt-4 font-black text-3xl leading-tight md:text-5xl">
          Un processus rigoureux, pas une opinion
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          Chaque semaine, la même rigueur. Le même processus. La même exigence — pour que votre lecture de marché repose sur de la structure, pas sur l'intuition. Consolidé dans un index propriétaire : le <strong className="font-semibold text-foreground">PCI</strong> (Paradoxi Confluence Index).
        </p>
      </div>

      {/* Pipeline steps */}
      <div className="reveal relative">
        {/* Connector line — desktop */}
        <div className="pointer-events-none absolute left-0 right-0 top-[2.75rem] hidden h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent lg:block" />

        <div className="grid gap-6 lg:grid-cols-4">
          {PIPELINE.map((step, i) => (
            <div key={step.id} className="relative flex flex-col items-center text-center">
              {/* Step number + connector dot */}
              <div className="relative z-10 mb-5 flex h-[44px] w-[44px] items-center justify-center rounded-full border border-primary/35 bg-background">
                <span className="text-xs font-black text-primary">{String(i + 1).padStart(2, "0")}</span>
                <div className="pointer-events-none absolute inset-0 rounded-full" style={{ boxShadow: "0 0 16px 4px rgba(80,220,150,0.18)" }} />
              </div>
              <span className="mb-2 text-[11px] font-black tracking-[0.18em] text-primary/70 uppercase">{step.id}</span>
              <h3 className="text-base font-black tracking-tight">{step.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* PCI output */}
        <div className="reveal mt-12 flex justify-center">
          <div
            className="relative max-w-lg overflow-hidden rounded-2xl border border-primary/30 px-10 py-8 text-center"
            style={{ background: "radial-gradient(ellipse 80% 80% at 50% 100%, oklch(0.78 0.18 150 / 0.08), transparent)" }}
          >
            <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Signal de convergence</p>
            <h3 className="mt-2 text-2xl font-black tracking-tight">PCI — Paradoxi Confluence Index</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              COT, macro, banques centrales — chacune est lisible gratuitement. La convergence des trois, mesurée et hiérarchisée, ne l'est pas. C'est le PCI.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Quand les trois convergent dans la même direction, ce n'est plus une opinion — c'est une thèse. Le PCI mesure cette convergence et oriente le Weekly Bias publié chaque dimanche.
            </p>
            <p className="mt-4 text-xs text-muted-foreground/45 italic">
              Analyse entièrement humaine — ce rapport n'est pas généré par une IA.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pour qui / Pour qui pas ──────────────────────────────────────────────────

function PourQuiSection() {
  const oui = [
    { title: "Vous voulez comprendre, pas juste suivre", sub: "Un signal sans contexte ne vous intéresse plus — vous voulez le raisonnement derrière le mouvement" },
    { title: "Vous cherchez à construire une compétence durable", sub: "Pas un raccourci — une progression méthodique qui vous appartient" },
    { title: "Vous êtes prêts à investir 15 minutes par semaine", sub: "Pour développer un regard que peu de particuliers possèdent" },
    { title: "Vous voulez reprendre le contrôle de vos décisions", sub: "Décider avec votre propre analyse — pas sous l'influence d'une alerte ou d'un groupe" },
    { title: "Vous visez l'excellence sur le long terme", sub: "Discipline, constance, profondeur — pas de résultats immédiats promis" },
  ];
  return (
    <section id="pour-qui" className="mx-auto max-w-7xl px-6 pb-12 md:pb-28">
      <div className="reveal mb-14 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Un choix délibéré</p>
        <h2 className="mt-4 font-black text-3xl leading-tight md:text-5xl">Ce n'est pas pour tout le monde. Et c'est voulu.</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          PARADOXI Observatory s'adresse à ceux qui ont décidé de progresser sérieusement — pas à ceux qui cherchent encore le raccourci qui n'existe pas.
        </p>
      </div>
      <div className="reveal mx-auto max-w-2xl">

        {/* Pour toi */}
        <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-primary/[0.04] p-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="mb-7 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-xs font-black text-primary">✓</span>
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-primary">C'est pour vous si</p>
          </div>
          <ul className="space-y-5">
            {oui.map((item) => (
              <li key={item.title} className="flex items-start gap-3.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-black text-primary">✓</span>
                <div>
                  <p className="text-sm font-semibold text-foreground/90">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.sub}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t border-primary/15 pt-6">
            <a href="#subscribe" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4">
              Je reconnais ce profil — recevoir le rapport <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Analyse Card (Clairvoyant style) ────────────────────────────────────────

function AnalyseCard() {
  return (
    <section className="mx-auto hidden max-w-7xl px-6 pb-12 md:block md:pb-28">
      <div className="reveal relative overflow-hidden rounded-2xl border border-border/60 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.95)]">
        <img src={sectionTrades} alt="Nos recherches & décisions de trades" className="w-full" />
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

const PRICING_FEATURES = [
  { icon: Layers, title: "Rapport Hebdomadaire", desc: "Macro Framework complet livré chaque dimanche." },
  { icon: BarChart3, title: "FX Scorecard", desc: "Force relative des devises en un coup d'œil." },
  { icon: Landmark, title: "Central Bank Watch", desc: "Positionnement et anticipations de taux des banques centrales." },
  { icon: Compass, title: "Weekly Bias", desc: "Biais directionnel par devise, contextualisé par le PCI." },
  { icon: Eye, title: "Briefing Quotidien", desc: "Lecture macro overnight, 5 minutes chaque matin." },
  { icon: TrendingUp, title: "Décisions de Trades", desc: "Analyse des setups fondamentaux en cours, documentée." },
];

const PLAN_CHECKLIST = [
  "Rapport Macro Hebdomadaire (chaque dimanche)",
  "FX Scorecard — force relative des devises",
  "Central Bank Watch — BCE, Fed, BoE, BoJ...",
  "Weekly Bias par devise (PCI-driven)",
  "Décisions de Trades documentées & argumentées",
];

function PricingSection() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 pb-12 md:pb-28">

      {/* Header */}
      <div className="reveal mb-16 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Conditions d'accès</p>
        <h2 className="mt-4 font-black leading-tight" style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)" }}>
          Tout ce que vous recevrez, dès maintenant.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          L'intégralité du contenu, sans friction, sans engagement. La confiance se gagne par la qualité — pas par les contrats.
        </p>
      </div>

      {/* Feature grid */}
      <div className="reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRICING_FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="flex gap-4 rounded-2xl border border-border/50 bg-card/30 p-6 transition-colors hover:border-primary/20 hover:bg-card/50"
            >
              <span className="mt-0.5 shrink-0 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-foreground">{f.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Price cards */}
      <div className="reveal mt-10 grid gap-5 md:grid-cols-2">

        {/* Free — current */}
        <div
          className="relative overflow-hidden rounded-2xl border border-primary/30 p-8"
          style={{ background: "radial-gradient(ellipse 80% 120% at 50% 110%, oklch(0.78 0.18 150 / 0.10), transparent)" }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" style={{ boxShadow: "0 0 6px 2px oklch(0.78 0.18 150 / 0.7)" }} />
            Disponible maintenant · Période de lancement
          </div>

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="text-5xl font-black text-foreground">Gratuit</span>
            <span className="mb-1.5 text-sm text-muted-foreground">pendant le lancement</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">L'accès complet — rapports, scorecard, watchlist, décisions de trades. Sans engagement, sans condition. Le temps de vous forger votre propre conviction.</p>

          {/* Checklist */}
          <ul className="mt-6 space-y-3 border-t border-primary/10 pt-6">
            {PLAN_CHECKLIST.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/80">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[9px] font-black text-primary">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <a
            href="#subscribe"
            className="mt-8 flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_-4px] hover:shadow-primary/60"
          >
            Recevoir le rapport
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Premium — coming soon */}
        <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-card/20 p-8">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-3 py-1 text-xs font-bold text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
            Liste d'attente · Ouverture prévue
          </div>

          {/* Price */}
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black text-foreground">69 €</span>
            <span className="mb-1.5 text-sm text-muted-foreground">/mois</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Le tarif préférentiel est réservé aux inscrits actuels. Rejoindre aujourd'hui, c'est sécuriser les meilleures conditions avant l'ouverture officielle.</p>

          {/* Checklist */}
          <ul className="mt-6 space-y-3 border-t border-border/30 pt-6">
            {PLAN_CHECKLIST.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground/60">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-border/50 text-[9px] text-muted-foreground/40">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-2.5">
            <Link
              to="/abonnement"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-border/40 bg-card/50 py-3.5 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/30 hover:bg-card hover:text-foreground"
            >
              Rejoindre la liste d'attente
            </Link>
            <p className="text-center text-xs text-muted-foreground/50">
              Les inscrits actuels bénéficient d'un tarif préférentiel garanti à l'ouverture.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  const row = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section className="relative py-12 md:py-28">
      <div className="reveal mx-auto mb-14 max-w-2xl px-6 text-center">
        <span className="text-sm font-semibold text-primary">Ils ont pris la décision</span>
        <h2 className="mt-3 font-black text-3xl leading-tight md:text-5xl">Ce que ça change, concrètement</h2>
        <p className="mt-4 text-lg text-muted-foreground">Des lecteurs de profils différents, unis par un même choix : lire le marché avec plus de rigueur et de profondeur.</p>
      </div>
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="pdx-marquee-track flex w-max items-stretch gap-6">
          {row.map((t, i) => (
            <figure key={i} className="pdx-card flex w-[340px] shrink-0 flex-col justify-between rounded-2xl p-7 md:w-[400px]">
              <blockquote className="text-base leading-relaxed text-foreground/90">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Private letter / Subscribe ───────────────────────────────────────────────

function PrivateLetter() {
  return (
    <section id="subscribe" className="mx-auto max-w-7xl px-6 py-12 md:py-28">
      <div className="reveal pdx-card relative overflow-hidden rounded-[2rem] p-8 md:p-14">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 pdx-glow opacity-50" />
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold text-primary">Publication privée</span>
            <h2 className="mt-3 font-black text-3xl leading-tight md:text-5xl">
              Ce n'est pas un email de plus. C'est votre rendez-vous hebdomadaire avec la clarté.
            </h2>
            <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-primary/25 bg-primary/[0.06] px-4 py-2 text-xs">
              <span className="font-bold text-primary">Gratuit maintenant</span>
              <span className="h-px w-4 bg-border/60" />
              <span className="text-muted-foreground">69 €/mois dès l'ouverture · accès prioritaire aux inscrits</span>
            </div>
            <p className="mt-5 text-lg text-muted-foreground">
              Chaque dimanche soir, un rapport arrive dans votre boîte mail. Dense, structuré, lisible. Il ne vous dit pas quoi trader. Il vous aide à comprendre dans quel environnement vous évoluez — et pourquoi les marchés se comportent comme ils se comportent. C'est la différence entre réagir et décider.
            </p>
            <div className="mt-8">
              <EmailForm />
            </div>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 pdx-glow opacity-50" />
            <div className="pdx-float overflow-hidden rounded-2xl border border-border shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
              <img src={reportCover} alt="Rapport PARADOXI" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-7xl px-6 py-12 md:py-28">
      <div className="grid gap-12 lg:grid-cols-2">

        {/* Left: mobile mockup */}
        <div className="reveal lg:sticky lg:top-28 lg:self-start">
          <div className="relative overflow-hidden rounded-[2rem] border border-border/40 bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
            <div className="pointer-events-none absolute inset-0 pdx-glow opacity-15" />
            <img src={sectionMobile} alt="PARADOXI Observatory sur mobile" className="relative w-full" />
          </div>
        </div>

        {/* FAQ accordion */}
        <div>
          <h2 className="reveal font-black text-3xl leading-tight md:text-5xl">Questions fréquentes</h2>
          <div className="mt-8 divide-y divide-border/60 border-t border-border/60">
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <button
                  key={f.q}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="reveal flex w-full flex-col py-6 text-left"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="text-lg font-semibold">{f.q}</span>
                    <Plus className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-45 text-primary" : ""}`} />
                  </span>
                  <span className={`grid transition-all duration-300 ${isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <span className="overflow-hidden text-muted-foreground">{f.a}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-12 md:pb-28">
      <div
        className="reveal relative overflow-hidden rounded-[2.5rem] border border-primary/20 px-8 py-20 text-center md:px-20"
        style={{ background: "radial-gradient(ellipse 85% 85% at 50% 60%, oklch(0.78 0.18 150 / 0.1), oklch(0.78 0.18 150 / 0.03) 55%, transparent)" }}
      >
        <div className="pointer-events-none absolute inset-0 pdx-grid opacity-[0.07]" />
        <div className="pointer-events-none absolute inset-x-0 -top-20 h-64 pdx-glow opacity-30" />

        <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-primary">Prochain rapport · Dimanche soir</p>

        <h2 className="relative mx-auto mt-6 max-w-3xl font-black text-3xl leading-tight md:text-6xl">
          Le prochain rapport arrive{" "}
          <em className="not-italic text-primary">dimanche soir.</em>
          <br />Les marchés ouvrent lundi matin.
        </h2>

        <p className="relative mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Vous pouvez le lire — ou le reconstruire vous-même. L'intégralité du cadre PARADOXI, gratuit, sans engagement.
        </p>

        <div className="relative mt-10">
          <a
            href="#subscribe"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 text-base font-bold text-primary-foreground transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_-8px] hover:shadow-primary/60"
          >
            Recevoir le rapport de dimanche
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/20">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <PdxLogo />
            <p className="mt-5 max-w-sm text-sm text-muted-foreground">
              L'observatoire de recherche pour ceux qui ont décidé de comprendre les marchés — pas de les subir.
            </p>
            <div className="mt-6 max-w-md">
              <EmailForm />
            </div>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/paul-c-977b70153"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-card/50 text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/paradoxi.observatory?utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-card/50 text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm lg:justify-items-end">
            <div className="space-y-3">
              <p className="font-semibold">Navigation</p>
              <a href="#rapport" className="block text-muted-foreground transition-colors hover:text-foreground">Rapport hebdomadaire</a>
              <a href="#briefing" className="block text-muted-foreground transition-colors hover:text-foreground">Briefing quotidien</a>
              <a href="#trades" className="block text-muted-foreground transition-colors hover:text-foreground">Recherches &amp; Trades</a>
              <a href="#faq" className="block text-muted-foreground transition-colors hover:text-foreground">FAQ</a>
            </div>
            <div className="space-y-3">
              <p className="font-semibold">Lettre</p>
              <a href="#subscribe" className="block text-muted-foreground transition-colors hover:text-foreground">S'abonner</a>
              <span className="block text-muted-foreground">Hebdomadaire</span>
              <span className="block text-muted-foreground">Gratuit</span>
            </div>
          </div>
        </div>
        <div className="mt-14 border-t border-border/40 pt-8">
          <p className="text-xs leading-relaxed text-muted-foreground/50">
            CONFIDENTIEL · Contenu éducatif et informatif uniquement. PARADOXI Observatory ne constitue en aucun cas un conseil en investissement. Le trading sur les marchés financiers comporte un risque élevé de perte en capital. Les performances passées ne préjugent pas des performances futures.
          </p>
          <p className="mt-5 text-xs text-muted-foreground/35">
            © {new Date().getFullYear()} PARADOXI Observatory. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
