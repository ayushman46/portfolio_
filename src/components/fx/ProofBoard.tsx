import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import { useReducedMotion } from "motion/react";
import { ProjectData } from "../../data/projects";
import "./proof-board.css";

type Status = "LIVE" | "MERGED" | "SHIPPED" | "IN PROG";

interface Row {
  code: string;
  item: string;
  detail: string;
  status: Status;
  href?: string;
  external?: boolean;
}

const HAS_MANDATEGRAPH = ProjectData.some((p) => p.slug === "mandategraph");

const ROWS: readonly Row[] = [
  { code: "WIP", item: "WIPRO AUTOBLOG", detail: "FRAMES −75% · ~40% FASTER", status: "SHIPPED", href: "/work" },
  { code: "CGL", item: "CODEGLYPH", detail: "30+ USERS · 10,000-FILE REPOS", status: "LIVE", href: "/projects/codeglyph" },
  { code: "PRV", item: "PREPVIA", detail: "100+ USERS · 50+ INTERVIEWS", status: "LIVE", href: "/projects/prepvia" },
  { code: "STL", item: "SETTLE", detail: "5,081 TESTS · 364 E2E JOURNEYS", status: "LIVE", href: "/projects/settle" },
  {
    code: "BAU",
    item: "BETTER AUTH",
    detail: "PR #10388 · 29K+ ★",
    status: "MERGED",
    href: "https://github.com/better-auth/better-auth/pull/10388",
    external: true,
  },
  {
    code: "CRS",
    item: "CORSAIR (YC W25)",
    detail: "PR #491 · 10 ENDPOINT GROUPS",
    status: "MERGED",
    href: "https://github.com/corsairdev/corsair/pull/491",
    external: true,
  },
  {
    code: "TGN",
    item: "TRAININGENIE",
    detail: "SOLE DEV · NEXT.JS · SEO + GEO",
    status: "SHIPPED",
    href: "/projects/trainingenie",
  },
  {
    code: "RLS",
    item: "RELEASELENS",
    detail: "360K+ CI BUILDS · PR-AUC 0.811",
    status: "IN PROG",
    href: "/projects/releaselens",
  },
  {
    code: "MGR",
    item: "MANDATEGRAPH",
    detail: "10-SCENARIO INJECTION HARNESS",
    status: "IN PROG",
    href: HAS_MANDATEGRAPH ? "/projects/mandategraph" : undefined,
  },
];

const GLYPHS = "!<>-_\\/[]{}=+*^?#%@$&ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const TICK = 45; // ms between flips of an unsettled cell
const HOVER_MS = 380;

const STATUS_CLASS: Record<Status, string> = {
  LIVE: "pb-status--live",
  MERGED: "pb-status--merged",
  SHIPPED: "pb-status--shipped",
  "IN PROG": "pb-status--prog",
};

const rand = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

/** Characters as code points, so multi-unit glyphs (★) stay one flap. */
const chars = (s: string) => Array.from(s);

function Flaps({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="pb-flaps">
        {chars(text).map((c, i) => (
          <i key={i} className="pb-flap" data-c={c} data-i={i}>
            {c === " " ? "" : c}
          </i>
        ))}
      </span>
    </>
  );
}

interface Cell {
  node: HTMLElement;
  char: string;
  settleAt: number;
  next: number;
  done: boolean;
}

/**
 * Drives a set of flap cells with one rAF loop. data-f is removed when a glyph
 * is written and re-added on the following frame so the CSS flip retriggers.
 */
function runFlips(cells: Cell[], onDone: () => void): () => void {
  let raf = 0;
  let start = -1;
  let pending: HTMLElement[] = [];

  const frame = (now: number) => {
    if (start < 0) start = now;
    const t = now - start;

    for (const n of pending) n.setAttribute("data-f", "");
    const nextPending: HTMLElement[] = [];
    let remaining = 0;

    for (const c of cells) {
      if (c.done) continue;
      if (t >= c.settleAt) {
        c.node.textContent = c.char === " " ? "" : c.char;
        c.node.removeAttribute("data-f");
        nextPending.push(c.node);
        c.done = true;
        continue;
      }
      remaining++;
      if (t >= c.next) {
        c.node.textContent = rand();
        c.node.removeAttribute("data-f");
        nextPending.push(c.node);
        c.next = t + TICK;
      }
    }

    pending = nextPending;
    if (remaining > 0 || pending.length) {
      raf = requestAnimationFrame(frame);
    } else {
      onDone();
    }
  };

  raf = requestAnimationFrame(frame);
  return () => {
    cancelAnimationFrame(raf);
    // Never leave a half-scrambled board behind.
    for (const c of cells) {
      c.node.textContent = c.char === " " ? "" : c.char;
      c.node.removeAttribute("data-f");
    }
  };
}

const ProofBoard: React.FC = () => {
  const reduced = useReducedMotion();
  const tableRef = useRef<HTMLTableElement>(null);
  const introRunning = useRef(false);
  const rowRuns = useRef(new Map<number, () => void>());
  const canHover = useRef(false);

  // Intro scramble, started once when the board scrolls into view.
  useEffect(() => {
    const table = tableRef.current;
    if (!table || reduced) return;
    canHover.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (typeof IntersectionObserver === "undefined") return;

    let stop: (() => void) | null = null;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const cells: Cell[] = [];
        table.querySelectorAll<HTMLElement>("tbody tr").forEach((tr, r) => {
          tr.querySelectorAll<HTMLElement>(".pb-flap").forEach((node) => {
            const i = Number(node.dataset.i) || 0;
            const char = node.dataset.c ?? "";
            node.textContent = rand();
            cells.push({ node, char, settleAt: r * 90 + i * 18 + Math.random() * 120, next: 0, done: false });
          });
        });
        // Cancel any hover runs so two loops never write the same cells.
        rowRuns.current.forEach((s) => s());
        rowRuns.current.clear();
        introRunning.current = true;
        stop = runFlips(cells, () => {
          introRunning.current = false;
          stop = null;
        });
      },
      { threshold: 0.35 }
    );
    io.observe(table);

    const runs = rowRuns.current;
    return () => {
      io.disconnect();
      stop?.();
      introRunning.current = false;
      runs.forEach((s) => s());
      runs.clear();
    };
  }, [reduced]);

  const reflip = (rowIndex: number, tr: HTMLTableRowElement) => {
    if (reduced || !canHover.current || introRunning.current) return;
    if (rowRuns.current.has(rowIndex)) return;
    const cells: Cell[] = [];
    tr.querySelectorAll<HTMLElement>(".pb-flap").forEach((node) => {
      const char = node.dataset.c ?? "";
      if (char === " ") return;
      const i = Number(node.dataset.i) || 0;
      const settleAt = Math.min(HOVER_MS, 90 + i * 14 + Math.random() * 90);
      cells.push({ node, char, settleAt, next: 0, done: false });
    });
    const stop = runFlips(cells, () => rowRuns.current.delete(rowIndex));
    rowRuns.current.set(rowIndex, stop);
  };

  return (
    <section aria-labelledby="sec-board" className="pb">
      <header className="sec-head">
        <span className="sec-index" aria-hidden>
          §03
        </span>
        <h2 id="sec-board" className="sec-title">
          <span className="sec-title-muted">Shipped</span> board
        </h2>
        <span className="leader" aria-hidden />
        <span className="sec-aside" aria-hidden>
          ~/departures
        </span>
      </header>

      <p className="rail pb-caption">Things shipped, merged and in flight</p>

      <div className="frame-dashed pb-board">
        <span className="xhair" aria-hidden />
        <table ref={tableRef} className="pb-table">
          <caption className="sr-only">Shipped work and merged pull requests</caption>
          <thead className="rail">
            <tr>
              <th scope="col" className="pb-col-code">
                Code
              </th>
              <th scope="col" className="pb-col-item">
                Item
              </th>
              <th scope="col" className="pb-col-detail">
                Detail
              </th>
              <th scope="col" className="pb-col-status">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, r) => {
              const label = `${row.item}, ${row.status}`;
              const itemInner = (
                <>
                  <span className="sr-only">{row.href ? label : row.item}</span>
                  <span aria-hidden="true" className="pb-flaps">
                    {chars(row.item).map((c, i) => (
                      <i key={i} className="pb-flap" data-c={c} data-i={i}>
                        {c === " " ? "" : c}
                      </i>
                    ))}
                  </span>
                </>
              );
              return (
                <tr
                  key={row.code}
                  className={STATUS_CLASS[row.status]}
                  onMouseEnter={(e) => reflip(r, e.currentTarget)}
                  onFocus={(e) => reflip(r, e.currentTarget)}
                >
                  <td className="pb-col-code">
                    <Flaps text={row.code} />
                  </td>
                  <td className="pb-col-item">
                    {row.href ? (
                      row.external ? (
                        <a className="pb-link" href={row.href} target="_blank" rel="noopener noreferrer">
                          {itemInner}
                        </a>
                      ) : (
                        <Link className="pb-link" to={row.href}>
                          {itemInner}
                        </Link>
                      )
                    ) : (
                      itemInner
                    )}
                  </td>
                  <td className="pb-col-detail">
                    <Flaps text={row.detail} />
                  </td>
                  <td className="pb-col-status">
                    <span className="pb-status">
                      {row.status === "IN PROG" && (
                        <span className={reduced ? "pb-breathe pb-breathe--still" : "pb-breathe"} aria-hidden>
                          ◌
                        </span>
                      )}
                      <Flaps text={row.status} />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProofBoard;
