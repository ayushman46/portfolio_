import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";

const loadPalette = () => import("./JumpPalette");
const JumpPalette = lazy(loadPalette);

/** Warm the palette chunk on intent (modifier down, chip hover/focus) so the first open has no lag. */
let warmed = false;
const warm = () => {
  if (warmed) return;
  warmed = true;
  loadPalette().catch(() => {
    warmed = false;
  });
};

const busy = () => {
  const a = document.activeElement as HTMLElement | null;
  if (a && (/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) || a.isContentEditable)) return true;
  return !!document.querySelector('[role="dialog"][aria-modal="true"]');
};

/** Always-loaded: Cmd/Ctrl+K listener + open state. The palette itself is a lazy chunk. */
const JumpTrigger = () => {
  const [open, setOpen] = useState(false);
  const prev = useRef<HTMLElement | null>(null);

  const show = useCallback(() => {
    prev.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Meta" || e.key === "Control") warm();
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== "k" || busy()) return;
      e.preventDefault();
      show();
    };
    const onOpen = () => !document.querySelector(".jp-panel") && show();
    window.addEventListener("keydown", onKey);
    window.addEventListener("jump:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("jump:open", onOpen);
    };
  }, [show]);

  const close = useCallback((restore = true) => {
    setOpen(false);
    const el = prev.current;
    prev.current = null;
    if (restore && el && el.isConnected) requestAnimationFrame(() => el.focus({ preventScroll: true }));
  }, []);

  return open ? (
    <Suspense fallback={null}>
      <JumpPalette onClose={close} />
    </Suspense>
  ) : null;
};

const isMac = () => {
  if (typeof navigator === "undefined") return false;
  const n = navigator as Navigator & { userAgentData?: { platform?: string } };
  return /mac/i.test(n.userAgentData?.platform || n.platform || "");
};

/** Masthead chip: the touch (and discoverable) way in. */
export const JumpChip = () => {
  const [mac, setMac] = useState(false);
  useEffect(() => setMac(isMac()), []);
  return (
    <button
      type="button"
      className="rail jump-chip group -mx-1 inline-flex h-10 min-w-10 shrink-0 cursor-pointer items-center justify-center px-1 focus-visible:outline-none"
      aria-label="Open quick jump (Command or Control K)"
      aria-keyshortcuts="Meta+K Control+K"
      onPointerEnter={warm}
      onFocus={warm}
      onClick={() => window.dispatchEvent(new CustomEvent("jump:open"))}
    >
      <span className="rounded-[3px] border border-dashed border-[var(--border-dashed)] px-[6px] py-[3px] tracking-[0.08em] transition-colors duration-200 group-hover:border-[var(--text-subtle)] group-hover:text-[var(--text-primary)] group-focus-visible:border-[var(--accent)] group-focus-visible:text-[var(--text-primary)]">
        {mac ? "⌘K" : "Ctrl K"}
      </span>
    </button>
  );
};

export default JumpTrigger;
