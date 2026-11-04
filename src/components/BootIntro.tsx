import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useBoot } from "../context/BootContext";
import { ProjectData } from "../data/projects";

const STEPS = [
  "mounting ascii field",
  `loading ${ProjectData.length} projects`,
  "linking 5 upstream pull requests",
  "warming up the terminal",
];
const BAR = 24;
const DURATION = 600; // ms until the progress bar completes
const HOLD = 80; // ms the full bar stays before the wipe

/** Arrived from a link on another site (LinkedIn, an email client, an ATS, X…) rather than typing the URL. */
const arrivedFromLink = () => {
  try {
    return document.referrer !== "" && new URL(document.referrer).origin !== window.location.origin;
  } catch {
    return false;
  }
};

/**
 * One-time (per session) terminal boot sequence shown on the home page.
 * Skipped for visitors arriving from a link elsewhere; any click, tap, key or scroll skips it.
 */
export const BootIntro: React.FC = () => {
  const { showIntro, finish } = useBoot();
  // decided once on mount, so a skipped intro never renders (and never plays its exit wipe)
  const [play] = useState(() => showIntro && !arrivedFromLink());
  const [visible, setVisible] = useState(play);
  const [progress, setProgress] = useState(0);
  const [coarse] = useState(() => window.matchMedia("(pointer: coarse)").matches);

  const exit = useCallback(() => {
    finish();
    setVisible(false);
  }, [finish]);
  const exitRef = useRef(exit);
  exitRef.current = exit;

  // link arrivals: hand over to the hero before the first paint
  useLayoutEffect(() => {
    if (showIntro && !play) exitRef.current();
  }, [showIntro, play]);

  // runs once while the intro is on screen; listeners and the scroll lock go as soon as it exits
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    let frame = 0;
    let hold = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      setProgress(p);
      if (p < 1) frame = requestAnimationFrame(tick);
      else hold = window.setTimeout(() => exitRef.current(), HOLD);
    };
    frame = requestAnimationFrame(tick);

    const skip = () => exitRef.current();
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("pointerdown", skip, { passive: true });
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(hold);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("pointerdown", skip);
      document.body.style.overflow = "";
    };
  }, [visible]);

  const filled = Math.round(progress * BAR);
  const stepsShown = Math.min(STEPS.length, Math.floor(progress * (STEPS.length + 0.6)));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[3000] flex cursor-pointer items-center justify-center bg-[var(--bg-page)]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          {/* bright edge that trails the wipe */}
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-strong)]/70 to-transparent" />

          <div className="jetbrains-mono w-[min(440px,86vw)] text-[11px] leading-[1.9] sm:text-xs">
            <div className="text-[var(--text-primary)]">
              <span className="text-[var(--accent)]">ayushman@portfolio</span>
              <span className="text-[var(--text-subtle)]">:~$ </span>
              ./boot.sh
            </div>

            <div className="mt-2 min-h-[7.6em]">
              {STEPS.slice(0, stepsShown).map((step) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[var(--text-primary)]/80"
                >
                  <span className="text-[var(--text-muted)]">[</span>
                  <span className="text-[var(--accent)]"> ok </span>
                  <span className="text-[var(--text-muted)]">]</span> {step}
                </motion.div>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-3 text-[var(--text-primary)]">
              <span className="whitespace-pre">
                [<span className="text-[var(--accent)]">{"#".repeat(filled)}</span>
                <span className="text-[var(--text-subtle)]">{".".repeat(BAR - filled)}</span>]
              </span>
              <span className="w-[4ch] text-right tabular-nums">{Math.round(progress * 100)}%</span>
            </div>

            <div className="mt-6 text-[11px] text-[var(--text-muted)]">
              {coarse ? "tap to skip" : "click or press any key to skip"}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootIntro;
