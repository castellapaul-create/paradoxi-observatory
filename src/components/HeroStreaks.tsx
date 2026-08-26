import { useEffect, useRef } from "react";

type Streak = {
  y: number;
  x: number;
  length: number;
  speed: number;
  opacity: number;
  hue: "accent" | "neutral";
};

const STREAK_COUNT = 22;
const ACCENT_RGB = "10,99,214";
const NEUTRAL_RGB = "16,17,20";

function makeStreak(width: number, height: number, spawnAtEdge = false): Streak {
  return {
    y: Math.random() * height,
    x: spawnAtEdge ? -Math.random() * 200 : Math.random() * width,
    length: 60 + Math.random() * 160,
    speed: 0.4 + Math.random() * 1.3,
    opacity: 0.04 + Math.random() * 0.1,
    hue: Math.random() < 0.35 ? "accent" : "neutral",
  };
}

/**
 * Filaments abstraits qui traversent le Hero de gauche à droite — évoque un
 * flux de données de marché sans jamais afficher de vrais chiffres.
 */
export function HeroStreaks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let streaks: Streak[] = [];
    let rafId = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent!.clientWidth;
      height = parent!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      streaks = Array.from({ length: STREAK_COUNT }, () => makeStreak(width, height));
    }

    function tick() {
      ctx!.clearRect(0, 0, width, height);
      for (const s of streaks) {
        const rgb = s.hue === "accent" ? ACCENT_RGB : NEUTRAL_RGB;
        const gradient = ctx!.createLinearGradient(s.x, s.y, s.x + s.length, s.y);
        gradient.addColorStop(0, `rgba(${rgb},0)`);
        gradient.addColorStop(0.85, `rgba(${rgb},${s.opacity})`);
        gradient.addColorStop(1, `rgba(${rgb},0)`);
        ctx!.strokeStyle = gradient;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(s.x, s.y);
        ctx!.lineTo(s.x + s.length, s.y);
        ctx!.stroke();

        s.x += s.speed;
        if (s.x > width + s.length) Object.assign(s, makeStreak(width, height, true));
      }
      rafId = requestAnimationFrame(tick);
    }

    resize();
    tick();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-streaks" aria-hidden="true" />;
}
