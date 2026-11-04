import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import "./led-board.css";

type Credential = {
  /** sentence case, for the readable list */
  label: string;
  /** uppercase, for the LED message */
  led: string;
  kind: "award" | "cert";
  href?: string;
};

const CREDENTIALS: readonly Credential[] = [
  {
    label: "Top 5 · Bosch BGSW Hackathon — Governing AI Agents",
    led: "TOP 5 · BOSCH BGSW HACKATHON — GOVERNING AI AGENTS",
    kind: "award",
  },
  {
    label: "Top 5 of 50 · Hackverse (IBM & AWS)",
    led: "TOP 5 OF 50 · HACKVERSE (IBM & AWS)",
    kind: "award",
  },
  { label: "Model Context Protocol — Anthropic", led: "MODEL CONTEXT PROTOCOL — ANTHROPIC", kind: "cert" },
  {
    label: "MLOps, Deployment & Model Life Cycling — DataCamp",
    led: "MLOPS, DEPLOYMENT & MODEL LIFE CYCLING — DATACAMP",
    kind: "cert",
  },
  {
    label: "Make Agentic AI Work for You — IBM SkillsBuild",
    led: "MAKE AGENTIC AI WORK FOR YOU — IBM SKILLSBUILD",
    kind: "cert",
    href: "https://www.credly.com/go/WPcLDSmS",
  },
  { label: "Computer Vision — Kaggle", led: "COMPUTER VISION — KAGGLE", kind: "cert" },
  { label: "Intro to Deep Learning — Kaggle", led: "INTRO TO DEEP LEARNING — KAGGLE", kind: "cert" },
];

const SEP = "  ◆  ";
// trailing separator so the tail of the loop runs into the head with a diamond between them
const MESSAGE = CREDENTIALS.map((c) => c.led).join(SEP) + SEP;
const STATIC_MESSAGE = "TOP 5 · BOSCH BGSW";

/* 5×7 bitmap font: 7 row masks, 5 bits each, MSB = leftmost column */
const FONT: Record<string, number[]> = {
  A: [14, 17, 17, 31, 17, 17, 17], B: [30, 17, 17, 30, 17, 17, 30], C: [14, 17, 16, 16, 16, 17, 14],
  D: [28, 18, 17, 17, 17, 18, 28], E: [31, 16, 16, 30, 16, 16, 31], F: [31, 16, 16, 30, 16, 16, 16],
  G: [14, 17, 16, 23, 17, 17, 15], H: [17, 17, 17, 31, 17, 17, 17], I: [14, 4, 4, 4, 4, 4, 14],
  J: [7, 2, 2, 2, 2, 18, 12], K: [17, 18, 20, 24, 20, 18, 17], L: [16, 16, 16, 16, 16, 16, 31],
  M: [17, 27, 21, 21, 17, 17, 17], N: [17, 17, 25, 21, 19, 17, 17], O: [14, 17, 17, 17, 17, 17, 14],
  P: [30, 17, 17, 30, 16, 16, 16], Q: [14, 17, 17, 17, 21, 18, 13], R: [30, 17, 17, 30, 20, 18, 17],
  S: [15, 16, 16, 14, 1, 1, 30], T: [31, 4, 4, 4, 4, 4, 4], U: [17, 17, 17, 17, 17, 17, 14],
  V: [17, 17, 17, 17, 17, 10, 4], W: [17, 17, 17, 21, 21, 21, 10], X: [17, 17, 10, 4, 10, 17, 17],
  Y: [17, 17, 10, 4, 4, 4, 4], Z: [31, 1, 2, 4, 8, 16, 31],
  "0": [14, 17, 19, 21, 25, 17, 14], "1": [4, 12, 4, 4, 4, 4, 14], "2": [14, 17, 1, 2, 4, 8, 31],
  "3": [31, 2, 4, 2, 1, 17, 14], "4": [2, 6, 10, 18, 31, 2, 2], "5": [31, 16, 30, 1, 1, 17, 14],
  "6": [6, 8, 16, 30, 17, 17, 14], "7": [31, 1, 2, 4, 8, 8, 8], "8": [14, 17, 17, 14, 17, 17, 14],
  "9": [14, 17, 17, 15, 1, 2, 12],
  " ": [0, 0, 0, 0, 0, 0, 0], "·": [0, 0, 0, 4, 0, 0, 0], "—": [0, 0, 0, 31, 0, 0, 0],
  "-": [0, 0, 0, 14, 0, 0, 0], "&": [12, 18, 20, 8, 21, 18, 13], "(": [2, 4, 8, 8, 8, 4, 2],
  ")": [8, 4, 2, 2, 2, 4, 8], ",": [0, 0, 0, 0, 12, 4, 8], ".": [0, 0, 0, 0, 0, 12, 12],
  "◆": [0, 4, 14, 31, 14, 4, 0],
};

/** Rasterise a string into a column buffer: one 7-bit value per column (bit r = row r lit). */
function rasterise(text: string): Uint8Array {
  const chars = Array.from(text);
  const buf = new Uint8Array(chars.length * 6);
  let x = 0;
  for (const ch of chars) {
    const rows = FONT[ch] ?? FONT[" "];
    for (let c = 0; c < 5; c++) {
      let col = 0;
      for (let r = 0; r < 7; r++) if (rows[r] & (16 >> c)) col |= 1 << r;
      buf[x++] = col;
    }
    x++; // 1-column gap
  }
  return buf;
}

const ROWS = 9; // 7 glyph rows + 1 padding row top and bottom
const SPEED = 18; // columns per second
const FPS = 30;

const LedBoard: React.FC = () => {
  const reduced = !!useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const syncRef = useRef<() => void>(() => {});

  // open the accessible list by default on phones and for reduced motion; set once, user can toggle
  useEffect(() => {
    const d = detailsRef.current;
    if (d) d.open = reduced || !window.matchMedia("(min-width: 640px)").matches;
  }, [reduced]);

  useEffect(() => {
    pausedRef.current = paused;
    syncRef.current();
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const wide = window.matchMedia("(min-width: 640px)");
    const hoverFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const buf = rasterise(reduced ? STATIC_MESSAGE : MESSAGE);

    let dpr = 1;
    let P = 4;
    let width = 0;
    let cols = 0;
    let ox = 0; // left inset that centres the dot grid in the canvas
    let dark = true;
    let lit = "#10b981";
    let unlit = "rgba(237,237,237,.07)";
    let litSprite: HTMLCanvasElement | null = null;
    let panel: HTMLCanvasElement | null = null; // every dot unlit, pre-rendered once
    let pos = 0; // scroll position in columns (float)
    let drawn = -1; // last integer column drawn
    let frame = 0;
    let last = 0;
    let running = false;
    let visible = false;
    let hovering = false;

    const readTheme = () => {
      dark = document.documentElement.classList.contains("dark");
      const cs = getComputedStyle(document.documentElement);
      lit = cs.getPropertyValue("--accent-strong").trim() || (dark ? "#10b981" : "#059669");
      unlit = dark ? "rgba(237,237,237,.07)" : "rgba(9,9,11,.07)";
    };

    const dot = (fill: string, highlight: boolean) => {
      const s = Math.max(1, Math.round(P * dpr));
      const c = document.createElement("canvas");
      c.width = c.height = s;
      const g = c.getContext("2d")!;
      g.fillStyle = fill;
      g.beginPath();
      g.arc(s / 2, s / 2, s * 0.4, 0, Math.PI * 2);
      g.fill();
      if (highlight) {
        // small specular hot-spot: reads as a real diode rather than a flat disc
        g.fillStyle = dark ? "rgba(255,255,255,.35)" : "rgba(255,255,255,.28)";
        g.beginPath();
        g.arc(s * 0.42, s * 0.4, s * 0.13, 0, Math.PI * 2);
        g.fill();
      }
      return c;
    };

    const buildSprites = () => {
      litSprite = dot(lit, P >= 6 || dpr > 1);
      const off = dot(unlit, false);
      panel = document.createElement("canvas");
      panel.width = Math.max(1, Math.round(width * dpr));
      panel.height = Math.round(ROWS * P * dpr);
      const g = panel.getContext("2d")!;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (let x = 0; x < cols; x++) for (let y = 0; y < ROWS; y++) g.drawImage(off, ox + x * P, y * P, P, P);
    };

    /** first buffer column shown at screen column 0 */
    const startFor = (p: number) => (reduced ? Math.floor((buf.length - 1 - cols) / 2) : Math.floor(p) - cols);

    const draw = (start: number) => {
      if (!panel || !litSprite) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(panel, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const from = Math.max(0, -start);
      const to = Math.min(cols, buf.length - start);
      if (dark) {
        // faint bloom behind each lit diode (dark mode only)
        const g = P * 1.8;
        const d = (g - P) / 2;
        ctx.globalAlpha = 0.12;
        for (let x = from; x < to; x++) {
          const col = buf[start + x];
          if (!col) continue;
          for (let r = 0; r < 7; r++)
            if (col & (1 << r)) ctx.drawImage(litSprite, ox + x * P - d, (r + 1) * P - d, g, g);
        }
        ctx.globalAlpha = 1;
      }
      for (let x = from; x < to; x++) {
        const col = buf[start + x];
        if (!col) continue;
        for (let r = 0; r < 7; r++) if (col & (1 << r)) ctx.drawImage(litSprite, ox + x * P, (r + 1) * P, P, P);
      }
      drawn = start;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
      P = wide.matches ? 6 : 4;
      width = canvas.getBoundingClientRect().width;
      const height = ROWS * P;
      canvas.style.height = `${height}px`;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.round(height * dpr);
      cols = Math.max(0, Math.floor(width / P));
      ox = (width - cols * P) / 2;
      buildSprites();
      draw(startFor(pos));
    };

    const shouldRun = () => !reduced && visible && !document.hidden && !pausedRef.current && !hovering;

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frame);
    };

    const loop = (t: number) => {
      if (!shouldRun()) {
        stop();
        return;
      }
      frame = requestAnimationFrame(loop);
      if (last === 0) last = t;
      const dt = t - last;
      if (dt < 1000 / FPS - 1) return;
      last = t;
      // cap dt so a long frame gap never jumps the text
      pos = (pos + Math.min(dt, 100) * (SPEED / 1000)) % (buf.length + cols);
      const start = startFor(pos);
      if (start !== drawn) draw(start); // real signs step a whole column; skip identical frames
    };

    const start = () => {
      if (running) return;
      running = true;
      last = 0;
      frame = requestAnimationFrame(loop);
    };

    const sync = () => (shouldRun() ? start() : stop());
    syncRef.current = sync;

    const onEnter = () => {
      hovering = true;
      sync();
    };
    const onLeave = () => {
      hovering = false;
      sync();
    };

    readTheme();
    resize();
    // animated: start with item 1 flush left so the very first view already reads
    if (!reduced) {
      pos = cols;
      draw(startFor(pos));
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const themeObserver = new MutationObserver(() => {
      readTheme();
      buildSprites();
      draw(startFor(pos));
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    if (hoverFine && !reduced) {
      canvas.addEventListener("mouseenter", onEnter);
      canvas.addEventListener("mouseleave", onLeave);
    }

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      syncRef.current = () => {};
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      canvas.removeEventListener("mouseenter", onEnter);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return (
    <section aria-labelledby="led-title" className="led">
      <div className="led-head">
        <span id="led-title" className="rail">
          credentials.log
        </span>
        <span className="leader" aria-hidden />
        {!reduced && (
          <button
            type="button"
            className="jetbrains-mono led-toggle"
            aria-pressed={paused}
            aria-label={paused ? "Play credentials ticker" : "Pause credentials ticker"}
            onClick={() => setPaused((p) => !p)}
          >
            {paused ? "[ play ]" : "[ pause ]"}
          </button>
        )}
      </div>

      <div className="frame-dashed led-frame">
        <span className="xhair" aria-hidden />
        <canvas ref={canvasRef} aria-hidden className="led-canvas" />
      </div>

      <details ref={detailsRef} className="led-list">
        <summary className="rail">All credentials ({CREDENTIALS.length})</summary>
        <ul>
          {CREDENTIALS.map((c) => (
            <li key={c.led}>
              <span className={c.kind === "award" ? "chip chip--accent" : "chip"}>{c.kind}</span>
              <span className="led-label">{c.label}</span>
              {c.href && (
                <a className="led-verify jetbrains-mono" href={c.href} target="_blank" rel="noopener noreferrer">
                  verify <span aria-hidden>↗</span>
                  <span className="sr-only"> {c.label} (opens in a new tab)</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
};

export default LedBoard;
