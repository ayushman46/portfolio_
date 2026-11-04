import React, { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#%@$&";

/**
 * Monospace label that briefly scrambles through ASCII glyphs on hover,
 * then resolves left to right. Screen readers always get the real text.
 */
export const AsciiScramble: React.FC<{ text: string; duration?: number }> = ({ text, duration = 380 }) => {
  const [output, setOutput] = useState(text);
  const frame = useRef(0);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const revealed = Math.floor(progress * text.length);
      setOutput(
        text
          .split("")
          .map((ch, i) => (ch === " " || i < revealed ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(""),
      );
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [text, duration]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <span onMouseEnter={run} onFocus={run}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{output}</span>
    </span>
  );
};

export default AsciiScramble;
