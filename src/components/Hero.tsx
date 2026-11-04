import React, { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { PiHandWavingDuotone } from "react-icons/pi";
import { useBoot } from "../context/BootContext";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import AsciiField from "./AsciiField";
import PortraitPlate from "./hero/PortraitPlate";
import "../styles/hero.css";
import { EMAIL } from "../data/contact";

const EASE = [0.16, 1, 0.3, 1] as const;

const NAME_WORDS = "AYUSHMAN CHAKRABORTY".split(" ").map((word, w, all) => ({
  word,
  // index of the word's first letter across the whole name, for stagger timing
  offset: all.slice(0, w).reduce((n, prev) => n + prev.length, 0),
}));

/** Two-line name lockup that resolves letter by letter from a soft blur, once on load. */
const RevealName: React.FC = () => {
  const { ready } = useBoot();
  const reduced = useReducedMotion();
  return (
    <span aria-hidden className="inline-flex flex-col items-start">
      {NAME_WORDS.map(({ word, offset }) => (
        <span key={word} className="inline-flex whitespace-nowrap">
          {word.split("").map((char, c) => (
            <motion.span
              key={c}
              initial={reduced ? false : { opacity: 0, y: 6, filter: "blur(8px)" }}
              animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              transition={{ delay: 0.25 + (offset + c) * 0.035, duration: 0.5, ease: EASE }}
              className="inline-block transition-transform duration-200 hover:-translate-y-[2px]"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
};

const ROLE = "AI & Backend Engineer";
const TYPE_START = 950; // ms after boot, once the name has mostly resolved
const TYPE_STEP = 45; // ms per character

/** Terminal-style role line, typed once after the name reveal; the caret keeps blinking. */
const TypedRole: React.FC = () => {
  const reduced = useReducedMotion();
  const { ready } = useBoot();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced || !ready || count >= ROLE.length) return;
    const id = window.setTimeout(() => setCount((n) => n + 1), count === 0 ? TYPE_START : TYPE_STEP);
    return () => window.clearTimeout(id);
  }, [count, reduced, ready]);

  return (
    <p className="jetbrains-mono mt-2 flex min-h-5 items-center text-[13px] text-[var(--text-primary)]/85 sm:mt-3 sm:text-sm">
      <span className="sr-only">{ROLE}</span>
      <span aria-hidden className="mr-1.5 text-[var(--accent)]">
        &gt;
      </span>
      {/* the invisible full role reserves the line's width so nothing shifts while typing */}
      <span aria-hidden className="relative inline-flex items-center whitespace-nowrap pr-[9px]">
        <span className="invisible">{ROLE}</span>
        <span className="absolute inset-y-0 left-0 inline-flex items-center">
          {reduced ? ROLE : ROLE.slice(0, count)}
          <span className="terminal-caret ml-0.5 !w-[7px] opacity-70" />
        </span>
      </span>
    </p>
  );
};

/** Live ASCII field behind the name lockup; fades out over the first 360px of scroll. */
const HeroField: React.FC = () => {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const fieldOpacity = useTransform(scrollY, [0, 360], [1, 0]);
  return (
    <motion.div aria-hidden className="hero-ascii-wrap" style={reduced ? undefined : { opacity: fieldOpacity }}>
      <AsciiField className="hero-ascii" />
    </motion.div>
  );
};

/* Phones: three equal 44px buttons in one row (icons drop below 360px); natural widths from 640px.
   `!` because .btn-pill-3d is unlayered CSS and would otherwise win over utilities. */
const CTA = "btn-pill-3d w-full min-w-0 max-sm:gap-1.5! max-[359px]:px-2! min-[360px]:max-sm:px-3! sm:w-auto";
const CTA_ICON = "text-sm max-[359px]:hidden";

export const Hero: React.FC = () => {
  const { ready } = useBoot();
  const reduced = useReducedMotion();
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative grid grid-cols-1 gap-y-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-8 sm:gap-y-5 lg:gap-x-12"
    >
      <HeroField />

      {/* A — eyebrow, name lockup, typed role */}
      <div className="relative z-[1] min-w-0 sm:col-start-1 sm:row-start-1">
        <div className="ibm-plex-mono group/wave mb-2 flex items-center gap-1.5 text-xs font-normal tracking-tighter text-[var(--text-muted)] sm:mb-3">
          <motion.span
            aria-hidden
            className="inline-flex origin-[70%_80%] text-sm text-[var(--text-primary)]"
            initial={{ rotate: 0 }}
            animate={ready && !reduced ? { rotate: [0, 16, -8, 16, -4, 10, 0] } : undefined}
            transition={{ delay: 0.9, duration: 1.4, ease: "easeInOut" }}
            whileHover={reduced ? undefined : { rotate: [0, 16, -8, 16, 0], transition: { duration: 0.9 } }}
          >
            <PiHandWavingDuotone />
          </motion.span>
          <span>Hey, it's me</span>
        </div>

        <h1
          aria-label="Ayushman Chakraborty"
          className="ibm-plex-mono text-[length:var(--fs-display)] leading-[0.95] font-medium tracking-[-0.025em] text-[var(--text-primary)] uppercase"
        >
          <RevealName />
        </h1>

        <TypedRole />
      </div>

      {/* P — Plate 01: beside the caption on phones, its own column from 640px */}
      <div className="relative z-[1] sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:mt-1 sm:self-start">
        <PortraitPlate />
      </div>

      {/* B — availability, bio, actions. Phones show the CTAs right under the pill so they clear the
          floating dock on short (toolbar-reduced) viewports; from 640px the order is pill, bio, CTAs.
          DOM order stays pill → bio → CTAs (the desktop reading/focus order). */}
      <div className="relative z-[1] flex min-w-0 flex-col sm:col-start-1 sm:row-start-2">
        <div className="ibm-plex-mono inline-flex w-fit max-w-full flex-nowrap items-center gap-1.5 rounded-full border border-[var(--accent-line)] bg-[var(--accent-soft)] p-1 whitespace-nowrap sm:gap-2">
          <span className="flex items-center gap-1.5 pl-1.5 text-[11px] text-[var(--text-muted)] sm:text-xs">
            <span aria-hidden className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-strong)] opacity-60 [animation-duration:2.4s]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent-strong)]" />
            </span>
            Open to
          </span>

          <span className="rounded-full bg-[var(--card-bg)] px-2.5 py-1 text-[11px] font-medium text-[var(--accent)] sm:px-3 sm:text-xs">
            <span className="sm:hidden">SWE · AI &amp; Backend roles</span>
            <span className="hidden sm:inline">Software Engineering · AI &amp; Backend Roles</span>
          </span>
        </div>

        <p className="order-3 mt-4 max-w-[34rem] text-[length:var(--fs-body)] leading-[1.7] text-[var(--text-muted)] sm:order-2 sm:mt-5">
          I'm an <span className="font-medium text-[var(--text-primary)]">AI &amp; backend engineer</span> shipping LLM
          applications, RAG systems, agentic AI and data pipelines. I built a multimodal GenAI pipeline at Wipro,
          launched <span className="font-medium text-[var(--text-primary)]">two live AI products with 130+ users</span>,
          and have merged fixes in{" "}
          <a
            href="https://github.com/better-auth/better-auth/pull/10388"
            target="_blank"
            rel="noopener noreferrer"
            className="bio-link"
          >
            Better Auth
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/corsairdev/corsair/pull/491"
            target="_blank"
            rel="noopener noreferrer"
            className="bio-link"
          >
            Corsair
          </a>{" "}
          (YC W25). Final-year B.Tech CSE (Data Science) at Manipal Institute of Technology, Bengaluru,{" "}
          <span className="font-medium text-[var(--text-primary)]">graduating May 2027</span>, and a professional
          cricketer alongside the degree.
        </p>

        <div className="order-2 mt-4 grid grid-cols-2 gap-2 sm:order-3 sm:mt-6 sm:flex sm:flex-wrap sm:gap-2">
          <a href={`mailto:${EMAIL}`} data-variant="primary" className={CTA}>
            <FiMail aria-hidden className={CTA_ICON} />
            <span>Email me</span>
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="/Ayushman-Chakraborty-Resume.pdf"
            aria-label="Open Ayushman Chakraborty's resume (PDF, opens in a new tab)"
            className={CTA}
          >
            <HiOutlineDocumentText aria-hidden className={CTA_ICON} />
            <span>Resume</span>
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ayushman46"
            aria-label="GitHub profile (opens in a new tab)"
            className={CTA}
          >
            <FaGithub aria-hidden className={CTA_ICON} />
            <span>GitHub</span>
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/ayushmanchakraborty"
            className={CTA}
          >
            <FaLinkedinIn aria-hidden className={CTA_ICON} />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
