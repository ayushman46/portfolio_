import React, { useEffect, useRef, useState } from "react";
import "../styles/home-b.css";
import { Link } from "react-router";
import { allSkills, type SkillItem } from "../data/skills";
import AsciiScramble from "./AsciiScramble";

const half = Math.ceil(allSkills.length / 2);
const rows: SkillItem[][] = [allSkills.slice(0, half), allSkills.slice(half)];

// Phones get a static row of the core stack (the Skills page sentence) instead of the marquee.
const CORE_STACK = ["Python", "SQL", "TypeScript", "FastAPI", "RAG", "React", "PostgreSQL", "Supabase"];
const coreSkills = CORE_STACK.map((name) => allSkills.find((s) => s.name === name)).filter(
  (s): s is SkillItem => Boolean(s),
);

// Brand icons rest in greyscale (some data icons are emerald, which the one-accent rule keeps off decoration)
// and take their colour only while the chip itself is hovered. A named group, so no ancestor .group can trigger it.
const Chip: React.FC<{ skill: SkillItem; hidden?: boolean; phone?: boolean }> = ({ skill, hidden, phone }) => (
  <span
    aria-hidden={hidden}
    className={`group/chip inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md border border-[var(--border-color)] bg-[var(--card-bg)] px-2.5 font-medium text-[var(--text-primary)] transition-colors duration-200 hover:border-[var(--text-muted)] hover:bg-[var(--card-hover)] ${
      phone ? "h-9 text-[13px]" : "h-8 text-[12.5px]"
    }`}
  >
    <span
      aria-hidden
      className="inline-flex text-[14px] opacity-80 grayscale transition-[filter,opacity] duration-200 group-hover/chip:opacity-100 group-hover/chip:grayscale-0"
    >
      {skill.icon}
    </span>
    {skill.name}
  </span>
);

export const StackMarquee: React.FC = () => {
  // Pause each marquee row while it is off-screen (the global .marquee[data-offscreen] rule stops the track).
  // A row hidden on phones never intersects, so it stays paused there too.
  const marqueesRef = useRef<HTMLDivElement>(null);
  // Keyboard and switch users can't hover to pause, and the chips can't take focus: an explicit toggle (WCAG 2.2.2).
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const root = marqueesRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) delete el.dataset.offscreen;
          else el.dataset.offscreen = "";
        }
      },
      { rootMargin: "64px 0px" },
    );
    root.querySelectorAll<HTMLElement>(".marquee").forEach((row) => io.observe(row));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="sec-stack">
      <header className="sec-head">
        <span className="sec-index" aria-hidden>
          §07
        </span>
        <h2 id="sec-stack" className="sec-title">
          <span className="sec-title-muted">Tech</span> Stack
        </h2>
        <span className="leader" aria-hidden />
        <Link to="/skills" className="sec-action">
          <AsciiScramble text={`All skills (${allSkills.length}) →`} />
        </Link>
      </header>

      {/* Phones: readable, static, nothing clipped */}
      <div className="flex flex-wrap gap-1.5 sm:hidden">
        {coreSkills.map((skill) => (
          <Chip key={skill.name} skill={skill} phone />
        ))}
      </div>

      <div ref={marqueesRef} data-paused={paused || undefined} className="pc-marquees hidden sm:flex sm:flex-col sm:gap-2">
        {rows.map((row, r) => (
          <div key={r} className="marquee">
            <div
              className={`marquee__track ${r === 1 ? "marquee__track--reverse" : ""}`}
              style={{ "--marquee-duration": `${44 + r * 8}s` } as React.CSSProperties}
            >
              {/* duplicated once so the loop is seamless */}
              {[...row, ...row].map((skill, i) => (
                <Chip key={`${skill.name}-${i}`} skill={skill} hidden={i >= row.length} />
              ))}
            </div>
          </div>
        ))}
        {/* The name changes with the state ("pause/play tech stack scrolling") and contains the visible word.
            Hidden under reduced motion, where the rows are already a static list. */}
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="pc-marquee-toggle jetbrains-mono -mb-2 inline-flex min-h-10 cursor-pointer items-center self-end text-xs text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text-primary)]"
        >
          <span aria-hidden>[&nbsp;</span>
          {paused ? "play" : "pause"}
          <span className="sr-only"> tech stack scrolling</span>
          <span aria-hidden>&nbsp;]</span>
        </button>
      </div>
    </section>
  );
};

export default StackMarquee;
