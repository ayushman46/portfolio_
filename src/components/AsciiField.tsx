import React, { useEffect, useRef } from "react";

const RAMP = " .·:-=+*#%";
const CELL_W = 10;
const CELL_H = 16;
const FPS = 24;
// touch devices: fewer frames and a lower backing-store resolution
const FPS_COARSE = 16;
const DPR_CAP = 2;
const DPR_CAP_COARSE = 1.5;
// The .hero-ascii-wrap mask (styles/hero.css) is fully transparent below 54% of the canvas height,
// so rows past this fraction are never seen — skip them instead of drawing them every frame.
const VISIBLE_FRACTION = 0.55;
// Matches Hero.tsx's useTransform(scrollY, [0, 360], [1, 0]): past this offset the wrapper is fully faded.
const MAX_SCROLL = 360;

/**
 * Slow-moving ASCII plasma drawn on a canvas behind the hero, always in the
 * neutral ink (no accent: emerald is reserved for live/proof signals).
 * Characters brighten around the cursor. The rAF loop fully stops (no idle
 * wake-ups) off-screen, in background tabs and once the page has scrolled past
 * the field's fade; 16fps at 1.5x DPR on touch devices; renders a single still
 * frame for reduced-motion users.
 */
export const AsciiField: React.FC<{ className?: string }> = ({ className = "hero-ascii" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const fps = coarse ? FPS_COARSE : FPS;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let color = "237,237,237";
    let alphaMax = 0.5;
    let frame = 0;
    let last = 0;
    let visible = true;
    let running = false;
    const pointer = { x: -9999, y: -9999, strength: 0 };

    const readTheme = () => {
      const dark = document.documentElement.classList.contains("dark");
      color = dark ? "237,237,237" : "9,9,11";
      alphaMax = dark ? 0.44 : 0.32;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, coarse ? DPR_CAP_COARSE : DPR_CAP);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `12px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";
      cols = Math.ceil(width / CELL_W);
      rows = Math.ceil((height * VISIBLE_FRACTION) / CELL_H);
      // resizing clears the canvas; the animated loop repaints itself, the still frame needs a redraw
      if (reduced) draw(0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const time = t / 1000;
      const cx = cols * 0.5;
      const cy = rows * 0.35;
      // ease the cursor glow in/out
      pointer.strength += ((pointer.x > -999 ? 1 : 0) - pointer.strength) * 0.12;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const dx = x - cx;
          const dy = (y - cy) * 1.6;
          let v =
            Math.sin(x * 0.11 + time * 0.6) +
            Math.sin(y * 0.23 - time * 0.45) +
            Math.sin((x + y) * 0.06 + time * 0.35) +
            Math.sin(Math.sqrt(dx * dx + dy * dy) * 0.18 - time * 0.9);
          v = (v + 4) / 8; // 0..1
          v = (v - 0.3) / 0.42; // stretch the mid-range so the full ramp shows

          // cursor glow: characters near the pointer brighten (brightness only, same ink)
          let glow = 0;
          if (pointer.strength > 0.01) {
            const px = (x * CELL_W - pointer.x) / 130;
            const py = (y * CELL_H - pointer.y) / 130;
            glow = Math.exp(-(px * px + py * py)) * pointer.strength;
            v += glow * 0.85;
          }

          v = Math.pow(Math.min(1, Math.max(0, v)), 1.3);
          const idx = Math.floor(v * (RAMP.length - 1));
          if (idx === 0) continue;
          const alpha = Math.min(0.9, alphaMax * (0.3 + v * 0.7) + glow * 0.35);
          ctx.fillStyle = `rgba(${color},${alpha.toFixed(3)})`;
          ctx.fillText(RAMP[idx], x * CELL_W, y * CELL_H);
        }
      }
    };

    const shouldRun = () => visible && !document.hidden && window.scrollY <= MAX_SCROLL;

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frame);
      // drop the stale pointer so the glow doesn't reappear where the cursor used to be
      pointer.x = -9999;
      pointer.y = -9999;
      pointer.strength = 0;
    };

    const loop = (t: number) => {
      if (!shouldRun()) {
        stop();
        return;
      }
      frame = requestAnimationFrame(loop);
      if (t - last < 1000 / fps) return;
      last = t;
      draw(t);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    // Only toggles the loop on/off; no drawing or layout reads happen here.
    const sync = () => (shouldRun() ? start() : stop());

    const onPointer = (e: PointerEvent) => {
      // a finger scrolling the page shouldn't drag the glow around (or leave it stuck where it lifted)
      if (e.pointerType === "touch" || !running) return;
      const rect = canvas.getBoundingClientRect();
      const inside = e.clientY >= rect.top && e.clientY <= rect.bottom;
      pointer.x = inside ? e.clientX - rect.left : -9999;
      pointer.y = inside ? e.clientY - rect.top : -9999;
    };

    readTheme();
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const themeObserver = new MutationObserver(() => {
      readTheme();
      if (reduced) draw(0);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!reduced) sync();
    });
    io.observe(canvas);

    if (reduced) {
      draw(0);
    } else {
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("scroll", sync, { passive: true });
      document.addEventListener("visibilitychange", sync);
      sync();
    }

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
};

export default AsciiField;
