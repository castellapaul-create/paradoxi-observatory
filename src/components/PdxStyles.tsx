// Shared design system for the light PARADOXI redesign (home, abonnement, merci).
// Kept as a single injected stylesheet so every page renders pixel-identical
// without duplicating ~700 lines of CSS per route.

export function PdxStyles() {
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
.pdx2 .nav-inner{ position:relative; max-width:1200px; margin:0 auto; padding:18px 32px; display:flex; align-items:center; justify-content:space-between; gap:16px; }
.pdx2 .logo{ height:34px; width:auto; }
.pdx2 .nav-links{ display:flex; align-items:center; gap:32px; font-size:14.5px; font-weight:500; color:var(--text-muted); }
.pdx2 .nav-links a:hover{ color:var(--text); }
.pdx2 .nav-app-link{ display:inline-flex; align-items:center; gap:7px; font:inherit; color:inherit; background:none; border:none; padding:0; cursor:pointer; }
.pdx2 .nav-app-badge{ font-size:9.5px; font-weight:800; letter-spacing:.05em; text-transform:uppercase; color:var(--accent); background:var(--accent-soft); border:1px solid color-mix(in oklab, var(--accent) 30%, transparent); padding:2px 7px; border-radius:999px; }
.pdx2 .nav-cta{ display:inline-flex; align-items:center; gap:8px; background:var(--accent); color:#fff; font-size:14px; font-weight:600; padding:11px 22px; border-radius:999px; box-shadow:0 8px 20px -8px rgba(10,99,214,.55); transition:background .15s ease, transform .15s ease; }
.pdx2 .nav-cta:hover{ background:var(--accent-hover); transform:translateY(-1px); }
.pdx2 .nav-burger{ display:none; align-items:center; justify-content:center; width:38px; height:38px; border-radius:10px; border:1px solid var(--border); background:#fff; color:var(--text); cursor:pointer; flex-shrink:0; }
.pdx2 .mobile-menu{ position:absolute; top:calc(100% + 8px); right:20px; left:auto; width:240px; background:#fff; border:1px solid var(--border); border-radius:16px; box-shadow:0 24px 48px -20px rgba(16,17,20,.3); padding:8px 16px; display:flex; flex-direction:column; }
.pdx2 .mobile-menu a, .pdx2 .mobile-menu button.nav-app-link{ padding:14px 4px; font-size:15.5px; font-weight:600; color:var(--text); border-bottom:1px solid var(--border); text-align:left; width:100%; justify-content:space-between; }
.pdx2 .mobile-menu a:last-of-type{ border-bottom:none; }
.pdx2 .mobile-menu .btn-primary{ justify-content:center; margin-top:16px; }

.pdx2 .hero{ padding:88px 0 0; }
.pdx2 .hero-grid{
  display:grid;
  grid-template-columns:1fr 1.15fr;
  grid-template-areas:
    "title visual"
    "lede visual"
    "actions visual"
    "meta visual";
  column-gap:44px; row-gap:0;
  align-items:center;
}
.pdx2 .hero-grid > h1{ grid-area:title; font-size:clamp(2.6rem, 4.6vw, 4.4rem); font-weight:800; line-height:1.05; letter-spacing:-0.02em; margin:0 0 24px; text-wrap:balance; }
.pdx2 .hero h1 em{ font-style:normal; color:var(--accent); }
.pdx2 .hero-grid > .lede{ grid-area:lede; font-size:18px; line-height:1.65; color:var(--text-muted); max-width:46ch; margin:0 0 32px; }
.pdx2 .hero-grid > .hero-actions{ grid-area:actions; display:flex; flex-wrap:wrap; align-items:center; gap:16px; margin-bottom:20px; }
.pdx2 .btn-primary{ display:inline-flex; align-items:center; gap:8px; background:var(--accent); color:#fff; font-size:15.5px; font-weight:700; padding:16px 30px; border-radius:999px; box-shadow:0 12px 28px -10px rgba(10,99,214,.5); transition:background .15s ease, transform .15s ease; }
.pdx2 .btn-primary:hover{ background:var(--accent-hover); transform:translateY(-1px); }
.pdx2 .btn-ghost{ display:inline-flex; align-items:center; gap:8px; background:#fff; color:var(--text); font-size:15.5px; font-weight:600; padding:15px 28px; border-radius:999px; border:1.5px solid var(--border); transition:border-color .15s ease, background .15s ease; }
.pdx2 .btn-ghost:hover{ border-color:var(--text); }
.pdx2 .hero-grid > .hero-meta{ grid-area:meta; display:flex; align-items:center; gap:10px; font-size:13.5px; color:var(--text-muted); }
.pdx2 .hero-meta .dot{ color:var(--border); }
.pdx2 .hero-meta .stars{ color:#f5a623; letter-spacing:1px; }
.pdx2 .hero-visual{ grid-area:visual; position:relative; margin-right:-14%; }
.pdx2 .hero-visual img{ width:132%; max-width:132%; height:auto; display:block; -webkit-mask-image: radial-gradient(ellipse closest-side at 50% 46%, black 48%, transparent 100%); mask-image: radial-gradient(ellipse closest-side at 50% 46%, black 48%, transparent 100%); }

.pdx2 .trust-bar{ background:var(--bg-dark); color:#fff; margin-top:64px; }
.pdx2 .trust-viewport{ overflow:hidden; }
.pdx2 .trust-track{ display:flex; max-width:1200px; margin:0 auto; padding:20px 32px; gap:clamp(16px,3vw,40px); justify-content:center; }
.pdx2 .trust-set{ display:flex; flex-shrink:0; gap:clamp(16px,3vw,40px); }
.pdx2 .trust-set[aria-hidden]{ display:none; }
.pdx2 .trust-item{ display:flex; align-items:center; gap:9px; font-size:clamp(11.5px,1.35vw,14px); color:#c7c9d1; white-space:nowrap; }
.pdx2 .trust-item strong{ color:#fff; font-weight:700; }
.pdx2 .trust-item svg{ flex-shrink:0; opacity:.8; }
@media (max-width: 600px){
  .pdx2 .trust-track{ width:max-content; justify-content:flex-start; padding-left:0; padding-right:0; animation:pdx-trust-scroll 16s linear infinite; }
  .pdx2 .trust-set[aria-hidden]{ display:flex; }
}
@keyframes pdx-trust-scroll{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }
@media (prefers-reduced-motion: reduce){ .pdx2 .trust-track{ animation:none !important; } }

.pdx2 .section{ padding:96px 0; }
.pdx2 .section.soft{ background:var(--bg-soft); }
.pdx2 .section-head{ max-width:640px; margin:0 0 56px; }
.pdx2 .eyebrow{ font-size:12.5px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--accent); margin:0 0 12px; }
.pdx2 .section-head h2{ font-size:clamp(1.9rem, 3vw, 2.7rem); font-weight:800; letter-spacing:-0.01em; line-height:1.15; margin:0 0 16px; text-wrap:balance; }
.pdx2 .section-head p{ font-size:16.5px; line-height:1.65; color:var(--text-muted); margin:0; }
.pdx2 .section-head.center{ text-align:center; }

.pdx2 .timeline{ position:relative; display:flex; gap:8px; padding-top:8px; }
.pdx2 .timeline::before{ content:""; position:absolute; top:28px; left:5%; right:5%; height:2px; background:var(--border); }
.pdx2 .timeline-step{ position:relative; flex:1; display:flex; flex-direction:column; align-items:center; text-align:center; }
.pdx2 .timeline-dot{ position:relative; z-index:1; flex-shrink:0; width:40px; height:40px; border-radius:50%; background:var(--accent); color:#fff; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:800; box-shadow:0 0 0 6px #fff; margin-bottom:20px; }
.pdx2 .timeline-content .tag{ font-size:11px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; color:var(--text-faint); margin-bottom:6px; }
.pdx2 .timeline-content h3{ font-size:16.5px; font-weight:700; margin:0 0 8px; }
.pdx2 .timeline-content p{ font-size:14px; line-height:1.6; color:var(--text-muted); margin:0; max-width:220px; }

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

.pdx2 .page-header{ text-align:center; max-width:640px; margin:0 auto 44px; }
.pdx2 .page-header h1{ font-size:clamp(2rem,3.6vw,2.8rem); font-weight:800; letter-spacing:-0.015em; line-height:1.15; margin:0 0 16px; text-wrap:balance; }
.pdx2 .page-header p{ font-size:16.5px; line-height:1.6; color:var(--text-muted); margin:0; }
.pdx2 .checkout-form{ display:flex; flex-direction:column; gap:12px; }
.pdx2 .checkout-row{ display:flex; align-items:center; gap:8px; padding:6px; border:1.5px solid var(--border); border-radius:999px; background:#fff; }
.pdx2 .checkout-row input{ flex:1; border:none; outline:none; background:transparent; padding:12px 14px; font-size:14.5px; font-family:inherit; color:var(--text); }
.pdx2 .checkout-row input::placeholder{ color:var(--text-faint); }
.pdx2 .checkout-row button{ background:var(--accent); color:#fff; border:none; border-radius:999px; padding:13px 26px; font-size:14.5px; font-weight:700; font-family:inherit; cursor:pointer; white-space:nowrap; transition:background .15s ease; }
.pdx2 .checkout-row button:hover{ background:var(--accent-hover); }
.pdx2 .checkout-row button:disabled{ opacity:.7; cursor:default; }
.pdx2 .checkout-error{ font-size:13px; color:#c0392b; text-align:center; margin:0; }
.pdx2 .checkout-note{ font-size:12.5px; color:var(--text-faint); text-align:center; margin:0; }
.pdx2 .checkout-note a{ color:var(--accent); text-decoration:underline; text-underline-offset:2px; }
.pdx2 .legal-page{ max-width:720px; margin:0 auto; padding:64px 32px 96px; }
.pdx2 .legal-page h1{ font-size:clamp(1.9rem,3vw,2.5rem); font-weight:800; letter-spacing:-0.01em; margin:0 0 8px; }
.pdx2 .legal-page .updated{ font-size:13px; color:var(--text-faint); margin:0 0 40px; }
.pdx2 .legal-page section{ margin-bottom:36px; }
.pdx2 .legal-page h2{ font-size:16px; font-weight:700; margin:0 0 12px; }
.pdx2 .legal-page p{ font-size:14.5px; line-height:1.7; color:var(--text-muted); margin:0 0 12px; }
.pdx2 .legal-page a{ color:var(--accent); text-decoration:underline; text-underline-offset:2px; }
.pdx2 .legal-page ul{ list-style:disc; padding-left:20px; }
.pdx2 .legal-page ul li{ font-size:14.5px; line-height:1.7; color:var(--text-muted); margin:0 0 6px; }
.pdx2 .legal-page strong{ color:var(--text); }

@media (max-width: 860px){
  .pdx2 .app-modal-features{ grid-template-columns:1fr; }
  .pdx2 .founder{ grid-template-columns:1fr; }
  .pdx2 .trades-grid{ grid-template-columns:1fr; }
  .pdx2 .testimonial{ width:82vw; }
  .pdx2 .faq-layout{ grid-template-columns:1fr; }
  .pdx2 .faq-phone{ position:static; max-width:320px; margin:0 auto 40px; }
  .pdx2 .hero-grid{
    grid-template-columns:1fr;
    grid-template-areas:
      "title"
      "lede"
      "actions"
      "meta";
    row-gap:20px;
    position:relative;
  }
  .pdx2 .hero-grid > h1{ margin-bottom:0; text-align:left; position:relative; z-index:auto; display:block; }
  .pdx2 .hero-lead{ display:block; position:relative; z-index:0; }
  .pdx2 .hero-lead-line{ display:block; font-size:clamp(2.3rem, 10.5vw, 3.1rem); font-weight:800; line-height:1.02; letter-spacing:-0.02em; color:#d6d8dc; }
  .pdx2 .hero-main{ display:block; position:relative; z-index:2; font-size:clamp(1.7rem, 7.4vw, 2.2rem); font-weight:800; line-height:1.12; letter-spacing:-0.015em; color:var(--text); margin-top:6px; }
  .pdx2 .hero-grid > .lede{ font-size:15px; margin-bottom:0; margin-top:14px; max-width:none; text-align:center; margin-left:auto; margin-right:auto; }
  .pdx2 .hero-grid > .hero-actions{ flex-direction:column; align-items:stretch; gap:10px; margin-bottom:0; }
  .pdx2 .hero-actions a{ justify-content:center; }
  .pdx2 .hero-grid > .hero-meta{ font-size:12.5px; flex-wrap:wrap; row-gap:4px; justify-content:center; }
  .pdx2 .hero-visual{ position:absolute; top:-40px; right:-14%; width:98%; z-index:1; pointer-events:none; }
  .pdx2 .hero-visual img{
    width:100%; max-width:100%;
    opacity:.65;
    -webkit-mask-image: radial-gradient(ellipse closest-side at 52% 42%, black 68%, transparent 100%);
    mask-image: radial-gradient(ellipse closest-side at 52% 42%, black 68%, transparent 100%);
  }
  .pdx2 .features, .pdx2 .pricing-grid{ grid-template-columns:1fr 1fr; }
  .pdx2 .footer-grid{ grid-template-columns:1fr 1fr; }
  .pdx2 .timeline{ flex-direction:column; gap:0; padding-top:0; }
  .pdx2 .timeline::before{ top:0; bottom:0; left:20px; right:auto; width:2px; height:auto; }
  .pdx2 .timeline-step{ flex-direction:row; align-items:flex-start; text-align:left; padding-bottom:28px; }
  .pdx2 .timeline-step:last-child{ padding-bottom:0; }
  .pdx2 .timeline-dot{ margin-bottom:0; margin-right:16px; }
  .pdx2 .timeline-content{ padding-top:6px; }
  .pdx2 .timeline-content p{ max-width:none; }
}
@media (max-width: 600px){
  .pdx2 .wrap, .pdx2 .nav-inner{ padding-left:20px; padding-right:20px; }
  .pdx2 .nav-links{ display:none; }
  .pdx2 .nav-cta{ display:none; }
  .pdx2 .nav-inner{ justify-content:space-between; }
  .pdx2 .nav-burger{ display:flex; margin-left:auto; }
  .pdx2 .features, .pdx2 .pricing-grid{ grid-template-columns:1fr; }
  .pdx2 .footer-grid{ grid-template-columns:1fr; }
  .pdx2 .hero{ padding-top:64px; }
  .pdx2 .section{ padding:64px 0; }
  .pdx2 .legal-page{ padding:48px 20px 72px; }
}
`}</style>
  );
}
