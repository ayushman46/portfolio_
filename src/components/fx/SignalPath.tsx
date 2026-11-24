import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { useReducedMotion } from "motion/react";
import "./signal-path.css";

/* ------------------------------------------------------------------ data */

interface PNode {
  id: string;
  /** label lines on the wide (left→right) plate */
  lines: string[];
  /** label lines on the narrow (top→bottom) plate, when they differ */
  narrow?: string[];
  /** a metric node: permanently lit in emerald */
  metric?: boolean;
  /** emerald metric chip hung under the node */
  chip?: string[];
}

interface Pipeline {
  key: string;
  tab: string;
  href: string;
  summary: string;
  /** stages in order; a stage with several nodes runs them in parallel */
  stages: PNode[][];
  /** off-axis branch hung under the last stage */
  branch?: PNode;
  chips: { label: string; accent?: boolean }[];
}

// Every label is checked against the project's own code and docs (re-verified 2026-11-05) or, for Wipro, the resume.
const PIPELINES: Pipeline[] = [
  {
    key: "codeglyph",
    tab: "codeglyph",
    href: "/projects/codeglyph",
    summary: "Hybrid retrieval over a whole repo, answered with file and line citations checked against the index.",
    stages: [
      [{ id: "N01", lines: ["repo ingest", "≤10,000 files"] }],
      [{ id: "N02", lines: ["incremental", "re-index"] }],
      [
        { id: "N03a", lines: ["vector"] },
        { id: "N03b", lines: ["keyword"] },
        { id: "N03c", lines: ["path-aware rank"], narrow: ["path-aware", "rank"] },
        { id: "N03d", lines: ["dependency graph"], narrow: ["dependency", "graph"] },
      ],
      [{ id: "N04", lines: ["NVIDIA", "Nemotron"] }],
      [{ id: "N05", lines: ["answer · checked", "file + line", "citations"], narrow: ["answer · checked file", "+ line citations"] }],
      [{ id: "N06", lines: ["agent opens", "multi-file PR"] }],
    ],
    chips: [
      { label: "production" },
      { label: "30+ users", accent: true },
      { label: "131/133 citations correct" },
      { label: "FastAPI · React · Turso" },
    ],
  },
  {
    key: "autoblog",
    tab: "autoblog",
    href: "/work",
    summary: "Technical videos in, documentation out: audio and on-screen code read in parallel.",
    stages: [
      [{ id: "N01", lines: ["technical videos", "30+ sources"] }],
      [
        { id: "N02a", lines: ["Whisper", "transcription"] },
        { id: "N02b", lines: ["computer vision", "on-screen code"] },
      ],
      [{ id: "N03", lines: ["frame dedupe"], chip: ["−75% frames", "~40% faster"] }],
      [{ id: "N04", lines: ["Azure OpenAI", "GPT-4o"] }],
      [{ id: "N05", lines: ["auto-eval +", "regression tests"] }],
      [{ id: "N06", lines: ["Streamlit ·", "Docker"] }],
    ],
    chips: [{ label: "Wipro · SWE & GenAI intern" }],
  },
  {
    key: "releaselens",
    tab: "releaselens",
    href: "/projects/releaselens",
    summary: "CI history to live build-failure risk scores, with traces naming a regression's probable origin.",
    stages: [
      [{ id: "N01", lines: ["360K+ CI builds"], metric: true }],
      [{ id: "N02", lines: ["Airflow ETL"] }],
      [{ id: "N03", lines: ["validated dbt", "marts · MinIO"] }],
      [
        {
          id: "N04",
          lines: ["XGBoost ·", "time-based", "validation"],
          narrow: ["XGBoost · time-", "based validation"],
          chip: ["PR-AUC 0.811", "ROC-AUC 0.881"],
        },
      ],
      [{ id: "N05", lines: ["MLflow"] }],
      [{ id: "N06", lines: ["FastAPI live", "risk scoring"] }],
    ],
    branch: {
      id: "N07",
      lines: ["OTel traces →", "probable origin", "+ blast radius"],
      narrow: ["OpenTelemetry → Kafka →", "probable origin + blast radius"],
    },
    chips: [{ label: "built locally · not deployed" }, { label: "p95 40 ms risk API", accent: true }],
  },
];

/* ---------------------------------------------------------------- layout */

interface Box {
  node: PNode;
  lines: string[];
  stage: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Wire {
  d: string;
  /** stage the packet leaves from: its slot in the cascade */
  i: number;
}

interface Geometry {
  vw: number;
  vh: number;
  font: number;
  boxes: Box[];
  wires: Wire[];
  chips: { x: number; y: number; w: number; h: number; lines: string[] }[];
}

const r = (n: number) => Math.round(n * 10) / 10;

/** Wide plate: 960 × 300, left → right, parallel lanes stacked vertically. */
function wideGeometry(p: Pipeline): Geometry {
  const VW = 960;
  const VH = p.branch ? 300 : 250;
  const FONT = 12;
  const LH = 15;
  const W = 132;
  const pad = 8;
  const pitch = (VW - pad * 2) / p.stages.length;
  const mid = p.branch ? 112 : 125;
  const boxes: Box[][] = [];
  const chips: Geometry["chips"] = [];

  p.stages.forEach((stage, s) => {
    const cx = pad + pitch * (s + 0.5);
    const hs = stage.map((n) => n.lines.length * LH + 16);
    const gap = 14;
    const total = hs.reduce((a, b) => a + b, 0) + gap * (stage.length - 1);
    let y = mid - total / 2;
    boxes.push(
      stage.map((node, k) => {
        const b = { node, lines: node.lines, stage: s, x: r(cx - W / 2), y: r(y), w: W, h: hs[k] };
        y += hs[k] + gap;
        if (node.chip) {
          chips.push({ x: b.x + 10, y: r(b.y + b.h + 22), w: W - 20, h: node.chip.length * LH + 10, lines: node.chip });
        }
        return b;
      }),
    );
  });

  const wires: Wire[] = [];
  for (let s = 0; s < boxes.length - 1; s++) {
    for (const a of boxes[s]) {
      for (const b of boxes[s + 1]) {
        const x1 = a.x + a.w;
        const y1 = r(a.y + a.h / 2);
        const x2 = b.x;
        const y2 = r(b.y + b.h / 2);
        const xm = r((x1 + x2) / 2);
        wires.push({ d: y1 === y2 ? `M${x1} ${y1}H${x2}` : `M${x1} ${y1}H${xm}V${y2}H${x2}`, i: s });
      }
    }
  }

  const flat = boxes.flat();
  if (p.branch) {
    const last = boxes[boxes.length - 1][0];
    const h = p.branch.lines.length * LH + 16;
    const b: Box = { node: p.branch, lines: p.branch.lines, stage: boxes.length, x: last.x, y: VH - h - 14, w: W, h };
    flat.push(b);
    const x = r(last.x + last.w / 2);
    wires.push({ d: `M${x} ${r(last.y + last.h)}V${b.y}`, i: boxes.length - 1 });
  }

  return { vw: VW, vh: VH, font: FONT, boxes: flat, wires, chips };
}

/** Narrow plate: 340 wide, top → bottom, parallel lanes side by side. */
function narrowGeometry(p: Pipeline): Geometry {
  const VW = 340;
  const FONT = 11.5;
  const LH = 14;
  const GAP = 34;
  const boxes: Box[][] = [];
  const chips: Geometry["chips"] = [];
  let y = 18;

  p.stages.forEach((stage, s) => {
    const n = stage.length;
    const inner = 6;
    const w = n === 1 ? 236 : (VW - 8 - inner * (n - 1)) / n;
    const lines = stage.map((node) => node.narrow ?? node.lines);
    const h = Math.max(...lines.map((l) => l.length)) * LH + 16;
    boxes.push(
      stage.map((node, k) => ({
        node,
        lines: lines[k],
        stage: s,
        x: r(n === 1 ? (VW - w) / 2 : 4 + k * (w + inner)),
        y,
        w: r(w),
        h,
      })),
    );
    y += h;
    const chipNode = stage.find((node) => node.chip);
    if (chipNode?.chip) {
      const ch = chipNode.chip.length * LH + 10;
      chips.push({ x: VW / 2 + 12, y: y + 12, w: 112, h: ch, lines: chipNode.chip });
      y += ch + 16;
    }
    y += GAP;
  });

  const wires: Wire[] = [];
  for (let s = 0; s < boxes.length - 1; s++) {
    for (const a of boxes[s]) {
      for (const b of boxes[s + 1]) {
        const x1 = r(a.x + a.w / 2);
        const y1 = a.y + a.h;
        const x2 = r(b.x + b.w / 2);
        const y2 = b.y;
        // fan-out / merge happens just above the receiving stage, clear of any chip
        const ym = y2 - 22;
        wires.push({ d: x1 === x2 ? `M${x1} ${y1}V${y2}` : `M${x1} ${y1}V${ym}H${x2}V${y2}`, i: s });
      }
    }
  }

  const flat = boxes.flat();
  if (p.branch) {
    const last = boxes[boxes.length - 1][0];
    const lines = p.branch.narrow ?? p.branch.lines;
    const h = lines.length * LH + 16;
    const b: Box = { node: p.branch, lines, stage: boxes.length, x: last.x, y: y - GAP + 34, w: last.w, h };
    flat.push(b);
    const x = r(last.x + last.w / 2);
    wires.push({ d: `M${x} ${last.y + last.h}V${b.y}`, i: boxes.length - 1 });
    y = b.y + h + GAP;
  }

  return { vw: VW, vh: y - GAP + 14, font: FONT, boxes: flat, wires, chips };
}

/** Screen-reader order of the pipeline, parallel lanes collapsed into one step. */
const stepsFor = (p: Pipeline) => {
  const t = (n: PNode) => n.lines.join(" ").replace(/\s+/g, " ");
  const out = p.stages.map((stage) =>
    stage.length > 1 ? `in parallel: ${stage.map(t).join(", ")}` : t(stage[0]) + (stage[0].chip ? ` (${stage[0].chip.join(", ")})` : ""),
  );
  if (p.branch) out.push(`branch: ${t(p.branch)}`);
  return out;
};

/* ----------------------------------------------------------------- hooks */

function useMediaQuery(query: string) {
  const [match, setMatch] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

const SUPPORTS_OFFSET =
  typeof CSS !== "undefined" && typeof CSS.supports === "function" && CSS.supports("offset-path", 'path("M0 0")');

const STEP_S = 0.6;

/* ------------------------------------------------------------- component */

const SignalPath: React.FC = () => {
  const reduced = !!useReducedMotion();
  // the wide plate keeps 12px labels at >= 11 CSS px only once the column is ~900px wide
  const wide = useMediaQuery("(min-width: 1024px)");
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const figRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const seen = useRef(false);
  const visible = useRef(false);
  const drawTimer = useRef<number | undefined>(undefined);

  const pipe = PIPELINES[active];
  const geo = useMemo(() => (wide ? wideGeometry(pipe) : narrowGeometry(pipe)), [pipe, wide]);
  const steps = useMemo(() => stepsFor(pipe), [pipe]);
  const slots = pipe.stages.length + (pipe.branch ? 1 : 0);
  const cycle = +(slots * STEP_S).toFixed(2);

  const draw = () => {
    const fig = figRef.current;
    if (!fig || reduced) return;
    fig.removeAttribute("data-draw");
    void fig.getBoundingClientRect(); // restart the keyframes
    fig.setAttribute("data-draw", "");
    window.clearTimeout(drawTimer.current);
    drawTimer.current = window.setTimeout(() => fig.removeAttribute("data-draw"), 700);
  };

  // measure every wire once per plate so the draw-on knows its length
  useLayoutEffect(() => {
    svgRef.current?.querySelectorAll<SVGPathElement>(".sp-wire").forEach((p) => {
      p.style.setProperty("--len", String(Math.ceil(p.getTotalLength())));
    });
    if (seen.current && visible.current) draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, wide]);

  useEffect(() => () => window.clearTimeout(drawTimer.current), []);

  // run the plate only while it is on screen. The panel is keyed by pipeline, so a tab switch mounts a
  // new <figure>: re-observe it, or the new plate would stay paused.
  useEffect(() => {
    const fig = figRef.current;
    if (!fig || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
        if (e.isIntersecting) {
          fig.setAttribute("data-run", "");
          if (!seen.current) {
            seen.current = true;
            draw();
          }
        } else fig.removeAttribute("data-run");
      },
      { threshold: 0.2 },
    );
    io.observe(fig);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, active]);

  const onKey = (e: React.KeyboardEvent) => {
    const n = PIPELINES.length;
    let next = -1;
    if (e.key === "ArrowRight") next = (active + 1) % n;
    else if (e.key === "ArrowLeft") next = (active - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="sec-signal" className="sp">
      <header className="sec-head">
        <span className="sec-index" aria-hidden>
          §06
        </span>
        <h2 id="sec-signal" className="sec-title">
          <span className="sec-title-muted">How it</span> runs
        </h2>
        <span className="leader" aria-hidden />
        <span className="sec-aside" aria-hidden>
          ~/schematics
        </span>
      </header>

      <div role="tablist" aria-label="Pipelines" className="sp-tabs" onKeyDown={onKey}>
        {PIPELINES.map((p, i) => (
          <button
            key={p.key}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`sp-tab-${p.key}`}
            aria-selected={i === active}
            aria-controls={`sp-panel-${p.key}`}
            tabIndex={i === active ? 0 : -1}
            className="jetbrains-mono sp-tab"
            onClick={() => setActive(i)}
          >
            <span className="sp-tab-n">[{i + 1}]</span> {p.tab}
          </button>
        ))}
      </div>

      <div
        key={pipe.key}
        role="tabpanel"
        id={`sp-panel-${pipe.key}`}
        aria-labelledby={`sp-tab-${pipe.key}`}
        className="sp-panel"
      >
        <figure
          ref={figRef}
          className="frame-dashed sp-plate"
          data-wide={wide ? "" : undefined}
          data-slots={slots}
          data-still={reduced ? "" : undefined}
          data-nopkt={SUPPORTS_OFFSET ? undefined : ""}
          style={{ "--cycle": `${cycle}s` } as React.CSSProperties}
        >
          <span className="xhair" aria-hidden />
          <svg
            ref={svgRef}
            aria-hidden
            focusable="false"
            width="100%"
            viewBox={`0 0 ${geo.vw} ${geo.vh}`}
            className="sp-svg"
            style={{ fontSize: geo.font }}
          >
            <defs>
              <pattern id={`sp-dots-${wide ? "w" : "n"}`} width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="8" cy="8" r="1" className="sp-dot" />
              </pattern>
            </defs>
            <g className="sp-grid">
              <rect width={geo.vw} height={geo.vh} fill={`url(#sp-dots-${wide ? "w" : "n"})`} />
            </g>

            <g className="sp-wires">
              {geo.wires.map((w, k) => (
                <path key={k} className="sp-wire" d={w.d} />
              ))}
            </g>

            {geo.boxes.map((b) => {
              const cx = b.x + b.w / 2;
              const lh = geo.font * 1.25;
              const top = b.y + b.h / 2 - ((b.lines.length - 1) * lh) / 2;
              return (
                <g
                  key={b.node.id}
                  className={`sp-node${b.node.metric ? " sp-node--metric" : ""}`}
                  style={{ "--i": b.stage } as React.CSSProperties}
                >
                  <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={3} />
                  <text className="sp-id" x={b.x + 1} y={b.y - 5}>
                    {b.node.id}
                  </text>
                  <text className="sp-label" x={cx} y={top} textAnchor="middle" dominantBaseline="central">
                    {b.lines.map((l, j) => (
                      <tspan key={j} x={cx} dy={j === 0 ? 0 : lh}>
                        {l}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })}

            {geo.chips.map((c, k) => (
              <g key={`chip-${k}`} className="sp-chip">
                <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={3} />
                {c.lines.map((l, j) => (
                  <text
                    key={j}
                    x={c.x + c.w / 2}
                    y={c.y + 5 + geo.font * 1.25 * (j + 0.5)}
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {l}
                  </text>
                ))}
              </g>
            ))}

            <g className="sp-pkts">
              {geo.wires.map((w, k) => (
                <circle
                  key={k}
                  className="sp-pkt"
                  r={3}
                  style={{ offsetPath: `path("${w.d}")`, "--i": w.i } as React.CSSProperties}
                />
              ))}
            </g>
          </svg>

          <figcaption className="sp-cap">
            <div className="sp-chips">
              {pipe.chips.map((c) => (
                <span key={c.label} className={c.accent ? "chip chip--accent" : "chip"}>
                  {c.label}
                </span>
              ))}
            </div>
            <p className="sp-summary">
              <span className="rail sp-summary-text">{pipe.summary}</span>
              <Link to={pipe.href} className="jetbrains-mono sp-open">
                open <span aria-hidden>↗</span>
                <span className="sr-only"> {pipe.tab}</span>
              </Link>
            </p>
          </figcaption>

          <ol className="sr-only">
            {steps.map((s, k) => (
              <li key={k}>{s}</li>
            ))}
          </ol>
        </figure>
      </div>
    </section>
  );
};

export default SignalPath;
