import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  accent: boolean;
};

type Pulse = {
  from: number;
  to: number;
  t: number;
  duration: number;
};

const NODE_COUNT = 30;
const LINK_DIST = 150;
const ACCENT_RGB = "10,99,214";
const NEUTRAL_RGB = "16,17,20";

function makeNode(width: number, height: number): Node {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    r: Math.random() < 0.22 ? 2.6 + Math.random() * 1.4 : 1.6 + Math.random() * 1,
    accent: Math.random() < 0.22,
  };
}

/**
 * Réseau de "neurones" en fond du Hero : nœuds reliés par de fines synapses,
 * traversés par des influx lumineux — écho visuel de la figure en verre du
 * Hero, sans jamais afficher de vraie donnée.
 */
export function HeroNeurons() {
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
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let rafId = 0;
    let lastPulseAt = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent!.clientWidth;
      height = parent!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = Array.from({ length: NODE_COUNT }, () => makeNode(width, height));
      pulses = [];
    }

    function spawnPulse(now: number) {
      if (now - lastPulseAt < 260) return;
      const candidates: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < LINK_DIST) candidates.push([i, j]);
        }
      }
      if (!candidates.length) return;
      const [a, b] = candidates[Math.floor(Math.random() * candidates.length)];
      pulses.push({
        from: Math.random() < 0.5 ? a : b,
        to: Math.random() < 0.5 ? a : b,
        t: 0,
        duration: 700 + Math.random() * 500,
      });
      lastPulseAt = now;
    }

    let prevTime = performance.now();

    function tick(now: number) {
      const dt = Math.min(now - prevTime, 48);
      prevTime = now;
      ctx!.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx * (dt / 16);
        n.y += n.vy * (dt / 16);
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.x = Math.max(0, Math.min(width, n.x));
        n.y = Math.max(0, Math.min(height, n.y));
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= LINK_DIST) continue;
          const alpha = (1 - dist / LINK_DIST) * 0.12;
          ctx!.strokeStyle = `rgba(${NEUTRAL_RGB},${alpha})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }

      for (const n of nodes) {
        const rgb = n.accent ? ACCENT_RGB : NEUTRAL_RGB;
        ctx!.fillStyle = `rgba(${rgb},${n.accent ? 0.3 : 0.22})`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      spawnPulse(now);
      pulses = pulses.filter((p) => {
        p.t += dt / p.duration;
        if (p.t >= 1) return false;
        const a = nodes[p.from];
        const b = nodes[p.to];
        if (!a || !b) return false;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const fade = Math.sin(Math.PI * p.t);
        ctx!.fillStyle = `rgba(${ACCENT_RGB},${0.75 * fade})`;
        ctx!.beginPath();
        ctx!.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx!.fill();
        return true;
      });

      rafId = requestAnimationFrame(tick);
    }

    resize();
    rafId = requestAnimationFrame(tick);

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-neurons" aria-hidden="true" />;
}
