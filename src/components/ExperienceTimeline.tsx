import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import AsciiScramble from "./AsciiScramble";

interface TimelineNode {
  title: string;
  company: string;
  period: string;
  badge: string;
  isCurrent?: boolean;
}

const timelineNodes: TimelineNode[] = [
  {
    title: "SWE & GenAI Intern",
    company: "Wipro",
    period: "Jun – Jul 2025",
    badge: "01",
  },
  {
    title: "Full-Stack Intern",
    company: "TraininGenie",
    period: "May – Jul 2026",
    badge: "02",
  },
  {
    title: "Open Source",
    company: "Better Auth · Corsair",
    period: "Jul 2026 – Now",
    badge: "03",
    isCurrent: true,
  },
];

const positions = ["5%", "50%", "95%"];
// Timing for the draw-in: each node appears, then the line to the next one draws.
const NODE_DELAY = (idx: number) => 0.15 + idx * 0.35;
const EASE = [0.16, 1, 0.3, 1] as const;
const GAP_OFFSET = 10;

// One trigger per layout: the strip / stepper enters view and its children follow by index.
const VIEWPORT = { once: true, margin: "-60px" } as const;

const nodeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (idx: number) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: NODE_DELAY(idx), type: "spring" as const, stiffness: 420, damping: 18 },
  }),
};

const contentVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: (idx: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: NODE_DELAY(idx) + 0.05, duration: 0.45, ease: EASE },
  }),
};

const lineTransition = (idx: number) => ({ delay: NODE_DELAY(idx) + 0.12, duration: 0.5, ease: EASE });

const lineXVariants = {
  hidden: { scaleX: 0 },
  visible: (idx: number) => ({ scaleX: 1, transition: lineTransition(idx) }),
};

const lineYVariants = {
  hidden: { scaleY: 0 },
  visible: (idx: number) => ({ scaleY: 1, transition: lineTransition(idx) }),
};

// Line segments between nodes; the ones touching the current node are lit.
const segments = timelineNodes.slice(0, -1).map((_, idx) => ({
  startPct: parseFloat(positions[idx]),
  endPct: parseFloat(positions[idx + 1]),
  isHighlighted: Boolean(timelineNodes[idx].isCurrent || timelineNodes[idx + 1].isCurrent),
}));

const highlightedIndices = segments
  .map((segment, index) => (segment.isHighlighted ? index : -1))
  .filter((index) => index >= 0);

const firstHighlighted = highlightedIndices[0];
const lastHighlighted = highlightedIndices[highlightedIndices.length - 1];

/** Lit-segment fill, shared by the desktop strip ("to right") and the phone stepper ("to bottom"). */
const highlightBackground = (idx: number, direction: "to right" | "to bottom") => {
  const isFirst = idx === firstHighlighted;
  const isLast = idx === lastHighlighted;

  if (isFirst && isLast) {
    return `linear-gradient(${direction}, transparent, var(--text-primary) 20%, var(--text-primary) 80%, transparent)`;
  }
  if (isFirst) return `linear-gradient(${direction}, transparent, var(--text-primary) 20%)`;
  if (isLast) return `linear-gradient(${direction}, var(--text-primary) 80%, transparent)`;
  return "var(--text-primary)";
};

const badgeClass = (current?: boolean) =>
  `chip ${current ? "chip--accent" : ""} shrink-0 text-[11px] font-semibold tabular-nums`;

const periodClass = (current?: boolean) =>
  `jetbrains-mono whitespace-nowrap text-[11px] leading-tight tabular-nums ${
    current ? "text-[var(--accent)]" : "text-[var(--text-subtle)]"
  }`;

const Dot: React.FC<{ current?: boolean }> = ({ current }) =>
  current ? (
    <span className="block h-2.5 w-2.5 rounded-full bg-[var(--accent-strong)] ring-[3px] ring-[var(--bg-page)]" />
  ) : (
    <span className="block h-2 w-2 rounded-full bg-[var(--text-subtle)] ring-[3px] ring-[var(--bg-page)]" />
  );

/**
 * Phones: the same nodes as a vertical stepper (dot, line, badge, title, leader, period),
 * so nothing has to shrink to fit three columns.
 */
const MobileStepper: React.FC = () => (
  <motion.ol
    aria-label="Experience"
    className="flex flex-col sm:hidden"
    initial="hidden"
    whileInView="visible"
    viewport={VIEWPORT}
  >
    {timelineNodes.map((item, idx) => {
      const segment = segments[idx];

      return (
        <li key={`${item.title}-${item.period}`} className="relative flex gap-3 pb-4 last:pb-0">
          {/* line to the next node, with the same small gaps around each dot as desktop */}
          {segment && (
            <>
              <motion.span
                aria-hidden
                custom={idx}
                variants={lineYVariants}
                className="absolute left-[3.25px] top-[21px] -bottom-[1px] w-[1.5px] origin-top bg-[var(--border-color)]"
              />
              {segment.isHighlighted && (
                <motion.span
                  aria-hidden
                  custom={idx}
                  variants={lineYVariants}
                  className="absolute left-[3.25px] top-[21px] -bottom-[1px] w-[1.5px] origin-top"
                  style={{ background: highlightBackground(idx, "to bottom") }}
                />
              )}
            </>
          )}

          <motion.span
            custom={idx}
            variants={nodeVariants}
            className="relative z-10 mt-[7px] flex h-2 w-2 shrink-0 items-center justify-center"
          >
            <Dot current={item.isCurrent} />
          </motion.span>

          <motion.div custom={idx} variants={contentVariants} className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className={badgeClass(item.isCurrent)}>{item.badge}</span>
              <span className="min-w-0 text-[13px] font-semibold leading-tight text-[var(--text-primary)]">
                {item.title}
              </span>
              {/* below 360px the leader steps aside so titles stay on one line */}
              <span className="leader !mx-1 max-[359px]:!hidden" aria-hidden />
              <span className={`ml-auto shrink-0 ${periodClass(item.isCurrent)}`}>{item.period}</span>
            </div>
            <span className="text-xs leading-snug text-[var(--text-muted)]">{item.company}</span>
          </motion.div>
        </li>
      );
    })}
  </motion.ol>
);

export const ExperienceTimeline: React.FC = () => {
  return (
    <section aria-labelledby="sec-experience">
      <header className="sec-head">
        <span className="sec-index" aria-hidden>
          §02
        </span>
        <h2 id="sec-experience" className="sec-title">
          <span className="sec-title-muted">Work</span> Experience
        </h2>
        <span className="leader" aria-hidden />
        <Link className="sec-action" to="/work">
          <AsciiScramble text="Full timeline →" />
        </Link>
      </header>

      <MobileStepper />

      {/* 640px+: the horizontal strip */}
      <motion.div
        className="relative hidden h-[92px] w-full sm:block"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        {/* Timeline Lines */}
        {segments.map((segment, idx) => {
          const width = `calc(${segment.endPct - segment.startPct}% - ${GAP_OFFSET * 2}px)`;
          const left = `calc(${segment.startPct}% + ${GAP_OFFSET}px)`;

          return (
            <React.Fragment key={idx}>
              {/* Base timeline */}
              <motion.div
                aria-hidden
                custom={idx}
                variants={lineXVariants}
                className="absolute top-[7px] h-[1.5px] origin-left bg-[var(--border-color)]"
                style={{ left, width }}
              />

              {/* Highlighted current path */}
              {segment.isHighlighted && (
                <motion.div
                  aria-hidden
                  custom={idx}
                  variants={lineXVariants}
                  className="absolute top-[7px] h-[1.5px] origin-left"
                  style={{ left, width, background: highlightBackground(idx, "to right") }}
                />
              )}
            </React.Fragment>
          );
        })}

        {/* Timeline Nodes */}
        {timelineNodes.map((item, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === timelineNodes.length - 1;
          const dotPos = positions[idx];

          return (
            <React.Fragment key={`${item.title}-${item.period}`}>
              {/* Timeline Dot */}
              <motion.div
                aria-hidden
                custom={idx}
                variants={nodeVariants}
                className="absolute top-[7px] z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: dotPos }}
              >
                <Dot current={item.isCurrent} />
              </motion.div>

              {/* Timeline Content */}
              <motion.div
                custom={idx}
                variants={contentVariants}
                className={`absolute top-[22px] flex flex-col gap-1 ${
                  isFirst
                    ? "left-0 items-start text-left"
                    : isLast
                      ? "right-0 items-end text-right"
                      : "-translate-x-1/2 items-center text-center"
                }`}
                style={!isFirst && !isLast ? { left: dotPos } : undefined}
              >
                {/* Badge + Role */}
                <div className={`flex items-center gap-2 ${isLast ? "flex-row-reverse" : "flex-row"}`}>
                  <span className={badgeClass(item.isCurrent)}>{item.badge}</span>
                  <span className="whitespace-nowrap text-[13px] font-semibold leading-tight text-[var(--text-primary)]">
                    {item.title}
                  </span>
                </div>

                {/* Company */}
                <span className="whitespace-nowrap text-xs leading-tight text-[var(--text-muted)]">
                  {item.company}
                </span>

                {/* Period */}
                <span className={periodClass(item.isCurrent)}>{item.period}</span>
              </motion.div>
            </React.Fragment>
          );
        })}
      </motion.div>
    </section>
  );
};

export default ExperienceTimeline;
