import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Link } from "react-router";
import "./verify-log.css";

type Stage = "open-source" | "shipped" | "certifications" | "competitions";

interface Check {
  stage: Stage;
  label: string;
  meta: string;
  href?: string;
  external?: boolean;
  status: "pass" | "pending";
}

const STAGES: Stage[] = ["open-source", "shipped", "certifications", "competitions"];

/**
 * The ledger of proof. Every line is a verified fact: project figures are checked against each repo's code and
 * docs (re-verified 2026-11-05); user counts, awards and certifications come from the resume.
 * Open-source rows are the MERGED pull requests listed in src/components/OpenSource.tsx, same URLs.
 */
const CHECKS: Check[] = [
  // open-source
  {
    stage: "open-source",
    label: "better-auth",
    meta: "PR #10388 merged · SAML SSO redirect fix · 29k+★",
    href: "https://github.com/better-auth/better-auth/pull/10388",
    external: true,
    status: "pass",
  },
  {
    stage: "open-source",
    label: "corsair",
    meta: "PR #491 merged · YC W25 · Hashnode GraphQL, 10 endpoint groups",
    href: "https://github.com/corsairdev/corsair/pull/491",
    external: true,
    status: "pass",
  },
  // shipped
  {
    stage: "shipped",
    label: "codeglyph",
    meta: "production · 30+ users · 131/133 citations correct",
    href: "/projects/codeglyph",
    status: "pass",
  },
  {
    stage: "shipped",
    label: "prepvia",
    meta: "live · 100+ users · 50+ completed interviews",
    href: "/projects/prepvia",
    status: "pass",
  },
  {
    stage: "shipped",
    label: "settle",
    meta: "live · 5,081 tests · 364 E2E journeys",
    href: "/projects/settle",
    status: "pass",
  },
  { stage: "shipped", label: "wipro autoblog", meta: "−75% frames · ~40% faster", href: "/work", status: "pass" },
  {
    stage: "shipped",
    label: "trainingenie",
    meta: "production site · sole developer · SEO + GEO",
    href: "/projects/trainingenie",
    status: "pass",
  },
  // in flight
  {
    stage: "shipped",
    label: "releaselens",
    meta: "built and verified locally · PR-AUC 0.811 · not yet deployed",
    href: "/projects/releaselens",
    status: "pending",
  },
  // no public repo yet, so the row links only to its own project page
  {
    stage: "shipped",
    label: "mandategraph",
    meta: "agent authorization harness · in progress",
    href: "/projects/mandategraph",
    status: "pending",
  },
  // certifications
  { stage: "certifications", label: "Model Context Protocol", meta: "Anthropic", status: "pass" },
  { stage: "certifications", label: "MLOps, Deployment & Model Life Cycling", meta: "DataCamp", status: "pass" },
  {
    stage: "certifications",
    label: "Make Agentic AI Work for You",
    meta: "IBM SkillsBuild · 27 Oct 2026",
    href: "https://www.credly.com/go/WPcLDSmS",
    external: true,
    status: "pass",
  },
  { stage: "certifications", label: "Computer Vision", meta: "Kaggle Learn · 1 Nov 2026", status: "pass" },
  { stage: "certifications", label: "Intro to Deep Learning", meta: "Kaggle Learn · 1 Nov 2026", status: "pass" },
  // competitions
  {
    stage: "competitions",
    label: "Top 5 teams",
    meta: "Bosch (BGSW) Hackathon on Governing AI Agents · ChaosAI",
    href: "/projects/chaosai",
    status: "pass",
  },
  { stage: "competitions", label: "Top 5 of 50 teams", meta: "Hackverse Hackathon (IBM & AWS)", status: "pass" },
];

type Line =
  | { kind: "cmd" }
  | { kind: "stage"; stage: Stage; n: number; pass: number; pending: number }
  | { kind: "check"; check: Check }
  | { kind: "rule" }
  | { kind: "summary" };

// Built once: the exact order lines print in.
const LINES: Line[] = (() => {
  const out: Line[] = [{ kind: "cmd" }];
  STAGES.forEach((stage, i) => {
    const rows = CHECKS.filter((c) => c.stage === stage);
    if (!rows.length) return;
    out.push({
      kind: "stage",
      stage,
      n: i + 1,
      pass: rows.filter((c) => c.status === "pass").length,
      pending: rows.filter((c) => c.status === "pending").length,
    });
    rows.forEach((check) => out.push({ kind: "check", check }));
  });
  out.push({ kind: "rule" }, { kind: "summary" });
  return out;
})();

const TOTAL = LINES.length;
const PASS_COUNT = CHECKS.filter((c) => c.status === "pass").length;
const PENDING_COUNT = CHECKS.filter((c) => c.status === "pending").length;
const STEP_MS = 90;
const SPIN_MS = 120;

const CheckLabel: React.FC<{ check: Check }> = ({ check }) => {
  if (!check.href) return <span className="vl-label">{check.label}</span>;
  if (check.external) {
    return (
      <a className="vl-label mono-link vl-link" href={check.href} target="_blank" rel="noopener noreferrer">
        {check.label}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link className="vl-label mono-link vl-link" to={check.href}>
      {check.label}
    </Link>
  );
};

/** The trailing ↗ repeats the label's link for pointer users; it is skipped by keyboard and screen readers. */
const Arrow: React.FC<{ check: Check }> = ({ check }) => {
  if (!check.href) return null;
  const common = { className: "vl-arrow", "aria-hidden": true as const, tabIndex: -1 };
  return check.external ? (
    <a {...common} href={check.href} target="_blank" rel="noopener noreferrer">
      ↗
    </a>
  ) : (
    <Link {...common} to={check.href}>
      ↗
    </Link>
  );
};

export const VerifyLog: React.FC = () => {
  const reduce = useReducedMotion();
  const [revealed, setRevealed] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const glyphs = useRef<Map<number, HTMLSpanElement>>(new Map());
  const timeouts = useRef<Set<number>>(new Set());
  const shown = reduce ? TOTAL : revealed;

  // Print once the terminal is a quarter in view: one short-lived interval, then nothing runs.
  useEffect(() => {
    if (reduce) return;
    const el = rootRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(TOTAL);
      return;
    }
    let timer: number | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        timer = window.setInterval(() => {
          setRevealed((r) => {
            const next = Math.min(r + 1, TOTAL);
            if (next >= TOTAL && timer !== undefined) {
              window.clearInterval(timer);
              timer = undefined;
            }
            return next;
          });
        }, STEP_MS);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, [reduce]);

  // A freshly printed check spins (⠋⠙⠹⠸) for 120ms before its glyph settles. Set on the DOM node directly,
  // so it costs no extra React renders; every timeout is tracked and cleared on unmount.
  useEffect(() => {
    if (reduce || revealed === 0) return;
    const idx = revealed - 1;
    const g = glyphs.current.get(idx);
    if (!g) return;
    g.setAttribute("data-spin", "");
    const set = timeouts.current;
    const id = window.setTimeout(() => {
      g.removeAttribute("data-spin");
      set.delete(id);
    }, SPIN_MS);
    set.add(id);
  }, [revealed, reduce]);

  useEffect(() => {
    const set = timeouts.current;
    return () => {
      set.forEach((id) => window.clearTimeout(id));
      set.clear();
    };
  }, []);

  const done = shown >= TOTAL;

  return (
    <section aria-labelledby="verify-title" className="vl">
      <header className="sec-head">
        <span className="sec-index" aria-hidden>
          §
        </span>
        <h2 id="verify-title" className="sec-title">
          <span className="sec-title-muted">Proof,</span> verified
        </h2>
        <span className="leader" aria-hidden />
        <span className="sec-aside" aria-hidden>
          $ ./verify --credentials
        </span>
      </header>

      <div ref={rootRef} className="frame-dashed vl-term group" data-reduce={reduce ? "" : undefined}>
        <span className="xhair" aria-hidden />

        {/* Window chrome, matched to NowTerminal */}
        <div className="vl-bar flex h-9 items-center gap-3 border-b border-[var(--border-color)] bg-[var(--pill-bg)] px-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-dashed)] transition-colors duration-300 group-hover:bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-dashed)] transition-colors delay-75 duration-300 group-hover:bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-dashed)] transition-colors delay-150 duration-300 group-hover:bg-[#28c840]" />
          </div>
          <span className="jetbrains-mono flex-1 text-center text-[10px] text-[var(--text-subtle)]">ci: verify.yml</span>
          <div
            className="vl-progress"
            role="progressbar"
            aria-label="Verification progress"
            aria-valuemin={0}
            aria-valuemax={TOTAL}
            aria-valuenow={shown}
          >
            <span className="vl-progress-fill" style={{ transform: `scaleX(${shown / TOTAL})` }} />
          </div>
        </div>

        <ol className="vl-log jetbrains-mono" data-done={done ? "" : undefined}>
          {LINES.map((line, i) => {
            const on = i < shown;
            const cls = `vl-line${on ? " is-on" : ""}`;

            if (line.kind === "cmd") {
              return (
                <li key="cmd" className={`${cls} vl-cmd`}>
                  <span className="vl-prompt" aria-hidden>
                    ~ ${" "}
                  </span>
                  <span className="vl-label">./verify --credentials</span>
                </li>
              );
            }

            if (line.kind === "stage") {
              return (
                <li key={`stage-${line.stage}`} className={`${cls} vl-stage`}>
                  <span>
                    [stage {line.n}/{STAGES.length}] {line.stage}
                  </span>
                  <span className="vl-stage-count">
                    {line.pass}/{line.pass + line.pending}
                    {line.pending > 0 && ` · ${line.pending} pending`}
                  </span>
                </li>
              );
            }

            if (line.kind === "check") {
              const { check } = line;
              const pass = check.status === "pass";
              return (
                <li key={`check-${check.stage}-${check.label}`} className={`${cls} vl-check`} data-status={check.status}>
                  <span
                    className="vl-glyph"
                    aria-hidden
                    ref={(el) => {
                      if (el) glyphs.current.set(i, el);
                      else glyphs.current.delete(i);
                    }}
                  >
                    <span className="vl-g">{pass ? "✓" : "◌"}</span>
                  </span>
                  <CheckLabel check={check} />
                  <span className="sr-only">{pass ? " passed" : " in progress"}</span>
                  <span className="leader vl-leader" aria-hidden />
                  <span className="vl-meta">{check.meta}</span>
                  <Arrow check={check} />
                </li>
              );
            }

            if (line.kind === "rule") {
              return (
                <li key="rule" className={`${cls} vl-rule`} aria-hidden>
                  ────────────────────────────────────────────────────────────────────────────────
                </li>
              );
            }

            return (
              <li key="summary" className={`${cls} vl-summary`}>
                <span className="vl-pass">PASS</span> {PASS_COUNT} checks · 0 failed · {PENDING_COUNT} pending
                {done && <span className="terminal-caret vl-caret" aria-hidden />}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default VerifyLog;
