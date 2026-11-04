import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import DP from "../../assets/ayushman-profile.webp";
import { useBoot } from "../../context/BootContext";
import { useMediaQuery } from "./useMediaQuery";
import { clamp01 } from "./clamp";

const EASE = [0.16, 1, 0.3, 1] as const;
const ALT = "Portrait of Ayushman Chakraborty";
/** Source is 480×640 (3:4); the box never exceeds 240 CSS px, so it is never upscaled on 2x screens. */
const SRC_W = 480;
const SRC_H = 640;
/** Below this scroll offset the print stays pin-sharp. */
const SHARP_UNTIL = 16;
/** Cells in the ASCII FOCUS bar. */
const BAR = 10;
/** Max outward travel of the registration crosshairs, in px, at zero focus. */
const SPREAD = 6;
/** Desktop drift over the scroll range, in px. */
const DRIFT = 48;

const FILL = "absolute inset-0 h-full w-full object-contain";

const CORNERS = [
  { pos: "-top-px -left-px border-t border-l", sx: -1, sy: -1 },
  { pos: "-top-px -right-px border-t border-r", sx: 1, sy: -1 },
  { pos: "-bottom-px -left-px border-b border-l", sx: -1, sy: 1 },
  { pos: "-bottom-px -right-px border-b border-r", sx: 1, sy: 1 },
] as const;

/** One caption row: dt above dd on phones (dashed rule between rows), dt beside dd from 640px. */
const ROW =
  "min-w-0 sm:grid sm:grid-cols-[4rem_minmax(0,1fr)] sm:items-baseline sm:gap-x-3";
const ROW_RULED = `${ROW} border-t border-dashed border-[var(--border-color)] pt-2 sm:border-0 sm:pt-0`;
const DT = "rail uppercase";
const DD = "mt-1 min-w-0 sm:mt-0";

/**
 * Plate 01 — the full, uncropped 3:4 portrait in a dashed frame with registration crosshairs and a
 * museum-label caption. One `focus` value (0–100) drives both the load "develop" and the scroll-linked
 * focus pull: the print blurs, recedes to a 0.4 opacity floor and (from 1024px) drifts, while the
 * caption type stays sharp and a live ASCII FOCUS bar reports the defocus. No React state on scroll.
 */
export const PortraitPlate: React.FC = () => {
  const reduced = !!useReducedMotion();
  const { ready } = useBoot();
  const coarse = useMediaQuery("(pointer: coarse)");
  const lg = useMediaQuery("(min-width: 1024px)");

  const slotRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const emptyRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const shown = useRef({ n: -1, pct: -1 });

  const { scrollY } = useScroll();
  // the untransformed slot's bottom edge in document px: the scroll distance the focus pull plays over
  const H = useMotionValue(600);

  const measure = useCallback(() => {
    const slot = slotRef.current;
    if (!slot) return;
    const r = slot.getBoundingClientRect();
    H.set(Math.max(240, r.bottom + window.scrollY));
  }, [H]);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (slotRef.current) ro.observe(slotRef.current);
    ro.observe(document.documentElement);
    let alive = true;
    document.fonts?.ready.then(() => {
      if (alive) measure();
    });
    return () => {
      alive = false;
      ro.disconnect();
    };
  }, [measure]);

  useEffect(() => {
    if (!ready) return;
    // the boot body-lock and the home entrance can shift layout around the hand-off
    measure();
    const t = window.setTimeout(measure, 900);
    return () => window.clearTimeout(t);
  }, [ready, measure]);

  // load: develop from 0 → 100 once the boot intro hands over
  const intro = useMotionValue(reduced ? 100 : 0);
  useEffect(() => {
    if (reduced) {
      intro.set(100);
      return;
    }
    if (!ready) return;
    const controls = animate(intro, 100, { delay: 0.35, duration: 1.1, ease: EASE });
    return () => controls.stop();
  }, [intro, ready, reduced]);

  // scroll: pin-sharp until 16px, fully defocused by 0.9·H
  const scrollFocus = useTransform(
    () => 100 - 100 * clamp01((scrollY.get() - SHARP_UNTIL) / Math.max(1, H.get() * 0.9 - SHARP_UNTIL)),
  );
  const focus = useTransform(() => Math.min(intro.get(), scrollFocus.get()));

  // ≤10px, quantised to 0.5px steps; the literal "none" whenever it would round to zero
  const filter = useTransform(focus, (f) => {
    const px = Math.round((100 - f) * 0.2) / 2;
    return px === 0 ? "none" : `blur(${px}px)`;
  });
  const sharpOpacity = useTransform(focus, [0, 100], [0, 1]);
  const printOpacity = useTransform(() => {
    const h = H.get();
    return 1 - 0.6 * clamp01((scrollY.get() - 0.3 * h) / (0.7 * h));
  });
  const introOpacity = useTransform(intro, [0, 40], [0, 1]);
  const drift = useTransform(() => DRIFT * clamp01(scrollY.get() / H.get()));
  const spread = useTransform(focus, [0, 100], [SPREAD, 0]);
  const spreadNeg = useTransform(spread, (s) => -s);

  // ASCII readout, written straight to the DOM (and only when a glyph actually changes)
  const paint = useCallback((f: number) => {
    const n = Math.max(0, Math.min(BAR, Math.round(f / 10)));
    const pct = Math.round(f);
    if (n !== shown.current.n) {
      if (fillRef.current) fillRef.current.textContent = "#".repeat(n);
      if (emptyRef.current) emptyRef.current.textContent = ".".repeat(BAR - n);
    }
    if (pct !== shown.current.pct && pctRef.current) pctRef.current.textContent = `${pct}%`;
    shown.current = { n, pct };
  }, []);

  useMotionValueEvent(focus, "change", (f) => {
    if (!reduced) paint(f);
  });
  useLayoutEffect(() => paint(reduced ? 100 : focus.get()), [paint, reduced, focus]);

  const sharedImg = { src: DP, width: SRC_W, height: SRC_H } as const;

  return (
    <div ref={slotRef}>
      <motion.figure
        style={{ y: lg && !reduced ? drift : 0, opacity: reduced ? 1 : introOpacity }}
        className="group relative grid grid-cols-[auto_minmax(0,1fr)] items-stretch gap-4 sm:grid-cols-1 sm:gap-0"
      >
        {/* Frame — 210px outer at sm, 262px at lg (px padding so the 17px root never scales it) */}
        <div className="relative self-start rounded-[6px] border border-dashed border-[var(--border-dashed)] bg-[var(--card-bg)] p-[8px] shadow-[var(--plate-shadow)] lg:p-[10px]">
          {CORNERS.map(({ pos, sx, sy }) => (
            <motion.span
              key={pos}
              aria-hidden
              style={reduced ? undefined : { x: sx > 0 ? spread : spreadNeg, y: sy > 0 ? spread : spreadNeg }}
              className={`pointer-events-none absolute h-2.5 w-2.5 border-[var(--text-subtle)] transition-colors duration-200 group-hover:border-[var(--text-primary)] ${pos}`}
            />
          ))}

          {/* Image box — exactly 3:4, the whole photo, object-contain */}
          <motion.div
            style={{ opacity: reduced ? 1 : printOpacity }}
            className="relative aspect-[3/4] w-[120px] overflow-hidden rounded-[4px] bg-[var(--pill-bg)] [transform:translateZ(0)] min-[360px]:w-[132px] sm:w-[192px] lg:w-[240px]"
          >
            {reduced ? (
              <img
                {...sharedImg}
                alt={ALT}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className={FILL}
              />
            ) : coarse ? (
              <>
                {/* touch: compositor-only crossfade — only the sharp print's opacity changes per frame */}
                <motion.img
                  {...sharedImg}
                  alt={ALT}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  style={{ opacity: sharpOpacity }}
                  className={`${FILL} z-[1] will-change-[opacity]`}
                />
                <img
                  {...sharedImg}
                  alt=""
                  aria-hidden
                  decoding="async"
                  className={`${FILL} [filter:blur(10px)] [transform:translateZ(0)]`}
                />
              </>
            ) : (
              <motion.img
                {...sharedImg}
                alt={ALT}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                style={{ filter }}
                className={`${FILL} will-change-[filter]`}
              />
            )}
          </motion.div>
        </div>

        {/* Museum label — never blurs or fades with the print */}
        <figcaption className="flex min-w-0 flex-col sm:block sm:w-[210px] lg:w-[262px]">
          <dl className="flex flex-1 flex-col justify-between py-0.5 sm:mt-3 sm:flex-none sm:justify-start sm:gap-y-2 sm:py-0">
            <div className={ROW}>
              <dt className={DT}>Plate 01</dt>
              <dd className={DD}>
                <span className="block text-[13px] leading-snug text-[var(--text-primary)] italic">
                  Ayushman Chakraborty
                </span>
              </dd>
            </div>
            <div className={ROW_RULED}>
              <dt className={DT}>Based in</dt>
              <dd className={DD}>
                <span className="block text-[13px] leading-snug text-[var(--text-muted)]">Bengaluru, IN</span>
                <span className="jetbrains-mono block text-[11px] leading-normal text-[var(--text-subtle)] tabular-nums">
                  12.97°N 77.59°E
                </span>
              </dd>
            </div>
            {/* decorative readout of the scroll-linked defocus */}
            <div aria-hidden className={ROW_RULED}>
              <dt className={DT}>Focus</dt>
              <dd className={DD}>
                <span className="jetbrains-mono text-[11px] leading-normal whitespace-nowrap">
                  [<span ref={fillRef} className="text-[var(--accent)]" />
                  <span ref={emptyRef} className="text-[var(--text-subtle)]" />]{" "}
                  <span ref={pctRef} className="inline-block w-[4ch] text-right text-[var(--text-muted)] tabular-nums" />
                </span>
              </dd>
            </div>
          </dl>
        </figcaption>
      </motion.figure>
    </div>
  );
};

export default PortraitPlate;
