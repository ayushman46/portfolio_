import { useEffect } from "react";

/**
 * One delegated pointer listener for every `.spotlight` / `.signature` element: writes the
 * cursor position into --mx / --my so the CSS radial glow can follow it.
 */
export const SpotlightTracker = () => {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    let frame = 0;
    let lastEvent: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      const e = lastEvent;
      if (!e) return;
      const el = (e.target as Element | null)?.closest?.<HTMLElement>(".spotlight, .signature");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    const onMove = (e: PointerEvent) => {
      lastEvent = e;
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
};

export default SpotlightTracker;
