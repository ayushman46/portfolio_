import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useReducedMotion } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import AsciiScramble from "./AsciiScramble";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type CalendarProps = React.ComponentProps<typeof GitHubCalendar>;
type Layout = { mode: "year" | "weeks"; blockSize: number; weeks: number };

const USERNAME = "ayushman46";
const ERROR_MESSAGE = "Could not load contributions right now.";
const LOAD_TIMEOUT_MS = 10_000;

// Geometry shared by the live graph and its skeleton, so loading → loaded never shifts layout.
const M = 3; // blockMargin
const FONT = 11; // month labels + footer
const SCROLL_PAD = Math.ceil(0.1 * FONT); // the library pads its scroller so <text> isn't clipped
const LABEL_H = FONT + 8; // month-label row inside the svg (fontSize + the library's 8px label margin)
const FOOTER_GAP = 8; // the library's gap between graph and footer
const FOOTER_H = 18; // footer line-height, pinned in home-a.css
const FOOTER_COL_GAP = 16; // the library's footer column gap; the key keeps at least this from the count
const MONO_ADVANCE = 0.6; // JetBrains Mono advance width, in em

const graphHeight = (blockSize: number) =>
  SCROLL_PAD + LABEL_H + 7 * (blockSize + M) - M + FOOTER_GAP + FOOTER_H;

/**
 * Full year (53 columns) whenever a cell can be at least 9px; otherwise whole recent weeks
 * at 11px. Either way the graph is sized to the card, so it never scrolls sideways.
 */
const layoutFor = (width: number): Layout => {
  const fullBlock = Math.floor((width + M) / 53) - M;
  if (fullBlock >= 9) return { mode: "year", blockSize: Math.min(13, fullBlock), weeks: 53 };
  return {
    mode: "weeks",
    blockSize: 11,
    weeks: Math.min(52, Math.max(12, Math.floor((width + M) / (11 + M)))),
  };
};

/**
 * Re-bucket intensity by quartiles of active days so one burst of commits
 * doesn't flatten the rest of the year. Counts are left untouched.
 */
const byQuartile = (data: Day[]): Day[] => {
  const active = data.map((d) => d.count).filter((c) => c > 0).sort((a, b) => a - b);
  if (active.length < 4) return data;
  const q = (p: number) => active[Math.min(active.length - 1, Math.floor(p * active.length))];
  const [q1, q2, q3] = [q(0.25), q(0.5), q(0.75)];
  return data.map((d) => ({
    ...d,
    level: d.count === 0 ? 0 : d.count <= q1 ? 1 : d.count <= q2 ? 2 : d.count <= q3 ? 3 : 4,
  }));
};

// Last N weeks, starting on a Sunday (the calendar's first row) so there's no stray half column.
const lastN = (data: Day[], weeks: number): Day[] => {
  const recent = data.slice(-weeks * 7);
  const firstSunday = recent.findIndex((d) => new Date(d.date).getUTCDay() === 0);
  return recent.slice(Math.max(0, firstSunday));
};

// Columns a contiguous run of days occupies once left-padded to Sunday.
const spanWeeks = (data: Day[]) => Math.ceil((new Date(data[0].date).getUTCDay() + data.length) / 7);

// Quiet monochrome ramp: reads as texture next to the name, not a block of white.
const PALETTE = {
  dark: ["#1C1D1F", "#2E3033", "#4B4D52", "#7A7D83", "#B4B6BB"],
  light: ["#EBEDF0", "#CDCFD4", "#9EA0A6", "#6E7076", "#3F4146"],
};
// The library's hairline on every cell, repeated on the key swatches so they match the graph.
const CELL_STROKE = { dark: "rgba(255, 255, 255, 0.04)", light: "rgba(0, 0, 0, 0.08)" };

// Neutral cell strengths (0.08–0.5 of the ramp), mapped onto a border-colour mix.
const SKELETON_MIX = [0.08, 0.15, 0.25, 0.35, 0.5].map((o) => Math.round(40 + o * 120));
const WEEKS_PER_MONTH = 4.35;

/** Same mode, week count and block size as the graph that will replace it. */
const CalendarSkeleton: React.FC<Layout & { still: boolean }> = ({ blockSize, weeks, still }) => {
  const width = weeks * (blockSize + M) - M;
  return (
    <div aria-hidden className="flex w-full justify-center">
      <div style={{ width, paddingTop: SCROLL_PAD }}>
        {/* month labels: one placeholder roughly every 4⅓ weeks, where the real ones will land */}
        <div className="relative" style={{ height: LABEL_H }}>
          {Array.from({ length: Math.max(1, Math.floor(weeks / WEEKS_PER_MONTH)) }).map((_, i) => (
            <span
              key={i}
              className="absolute top-[2px] h-2 w-4 rounded-[2px] bg-[var(--border-color)] opacity-60"
              style={{ left: Math.round(i * WEEKS_PER_MONTH) * (blockSize + M) }}
            />
          ))}
        </div>
        <div className="flex" style={{ gap: M }}>
          {Array.from({ length: weeks }).map((_, weekIdx) => (
            <div key={weekIdx} className="flex flex-col" style={{ gap: M }}>
              {Array.from({ length: 7 }).map((_, dayIdx) => (
                <span
                  key={dayIdx}
                  className={`block rounded-[2px] ${still ? "" : "animate-pulse"}`}
                  style={{
                    width: blockSize,
                    height: blockSize,
                    // texture lives in the colour, so the pulse (which animates opacity) can't flatten it
                    backgroundColor: `color-mix(in srgb, var(--border-color) ${SKELETON_MIX[(weekIdx + dayIdx) % 5]}%, var(--card-bg))`,
                    animationDelay: still ? undefined : `${(weekIdx * 7 + dayIdx) * 15}ms`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center" style={{ marginTop: FOOTER_GAP, height: FOOTER_H }}>
          <span className="h-2 w-40 max-w-full rounded-[2px] bg-[var(--border-color)] opacity-60" />
        </div>
      </div>
    </div>
  );
};

export const ActivityCalendar: React.FC = () => {
  const { theme } = useTheme();
  const still = Boolean(useReducedMotion());
  const boxRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const keyRef = useRef<HTMLSpanElement>(null);
  const lastDateRef = useRef("");
  const [width, setWidth] = useState(0);
  const [keyFits, setKeyFits] = useState(false);
  // loading → data | error; "timeout" reveals the container after 10s but keeps watching for data.
  const [status, setStatus] = useState<"loading" | "timeout" | "data" | "error">("loading");
  const [waving, setWaving] = useState(false);
  const calendarLoaded = status !== "loading";
  const hasData = status === "data";

  // Measure once before paint, then follow resizes (debounced; data is never re-fetched).
  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    setWidth(Math.floor(box.getBoundingClientRect().width));

    let timer = 0;
    const observer = new ResizeObserver((entries) => {
      window.clearTimeout(timer);
      const next = Math.floor(entries[0].contentRect.width);
      timer = window.setTimeout(() => setWidth(next), 150);
    });
    observer.observe(box);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const layout = layoutFor(width);
  const { mode, blockSize, weeks } = layout;
  const gridWidth = weeks * (blockSize + M) - M;
  const scheme = theme === "light" ? "light" : "dark";

  const transformData = useMemo<NonNullable<CalendarProps["transformData"]>>(
    () => (data) => {
      if (!data.length) return data;
      const shaped =
        mode === "year" ? (spanWeeks(data) > 53 ? lastN(data, 53) : data) : lastN(data, weeks);
      lastDateRef.current = shaped[shaped.length - 1]?.date ?? "";
      return byQuartile(shaped);
    },
    [mode, weeks],
  );

  const labels = useMemo(
    () => ({
      totalCount:
        mode === "year"
          ? "{{count}} contributions in the last year"
          : `{{count}} contributions in the last ${weeks} weeks`,
    }),
    [mode, weeks],
  );

  // Today's cell: inset by half the ring so the 1.5px stroke stays inside the graph's edge.
  const renderBlock = useMemo<NonNullable<CalendarProps["renderBlock"]>>(
    () => (block, activity) => {
      if (activity.date !== lastDateRef.current) return block;
      const size = Number(block.props.width ?? blockSize);
      return React.cloneElement(block, {
        "data-today": "",
        x: 0.75,
        y: Number(block.props.y ?? 0) + 0.75,
        width: size - 1.5,
        height: size - 1.5,
      } as Record<string, string | number>);
    },
    [blockSize],
  );

  // Reveal once real blocks (or the error message) replace the library's loading state.
  useEffect(() => {
    const container = calendarRef.current;
    if (!container || status === "data" || status === "error") return;

    const check = () => {
      if (container.textContent?.includes(ERROR_MESSAGE)) {
        setStatus("error");
        return true;
      }
      // The loading state renders default-size blocks and no total count.
      const counted = container.querySelector(".react-activity-calendar__count");
      const sized = Array.from(container.querySelectorAll(".react-activity-calendar__calendar rect")).some(
        (rect) => rect.getAttribute("width") === String(blockSize),
      );
      if (!counted || !sized) return false;

      // Stagger each day by its column and row so the graph sweeps in as a wave (once).
      if (!still) {
        container
          .querySelectorAll<SVGGElement>(".react-activity-calendar__calendar > g[transform]")
          .forEach((week) => {
            const x = /translate\(([\d.]+)/.exec(week.getAttribute("transform") ?? "")?.[1];
            const col = parseFloat(x ?? "0") / (blockSize + M);
            week.querySelectorAll<SVGRectElement>("rect").forEach((rect) => {
              const row = new Date(rect.dataset.date ?? "").getUTCDay() || 0;
              rect.style.setProperty("--d", `${Math.round(col * 16 + row * 30)}ms`);
            });
          });
        setWaving(true);
      }
      setStatus("data");
      return true;
    };

    if (check()) return;
    const observer = new MutationObserver(() => {
      if (check()) observer.disconnect();
    });
    observer.observe(container, { childList: true, subtree: true });

    // Never leave the skeleton up forever: show whatever the library has after 10s.
    const timeout =
      status === "loading" ? window.setTimeout(() => setStatus("timeout"), LOAD_TIMEOUT_MS) : 0;

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [status, blockSize, still]);

  // The key shares the count's line, so show it only where both fit on one row (never a
  // collision, never a second line). The count is monospaced, so its width follows its length.
  useLayoutEffect(() => {
    if (!hasData) return;
    const count = calendarRef.current?.querySelector(".react-activity-calendar__count");
    const key = keyRef.current;
    if (!count || !key) return;
    const countWidth = (count.textContent?.length ?? 0) * FONT * MONO_ADVANCE;
    setKeyFits(countWidth + FOOTER_COL_GAP + key.offsetWidth <= gridWidth);
  }, [hasData, gridWidth, labels]);

  // Drop the wave class once it has played so theme switches and resizes don't replay it.
  useEffect(() => {
    if (!waving) return;
    const id = window.setTimeout(() => setWaving(false), 1800);
    return () => window.clearTimeout(id);
  }, [waving]);

  return (
    <section aria-labelledby="sec-activity">
      <header className="sec-head">
        <span className="sec-index" aria-hidden>
          §01
        </span>
        <h2 id="sec-activity" className="sec-title">
          <span className="sec-title-muted">GitHub</span> Activity
        </h2>
        <span className="leader" aria-hidden />
        <a
          className="sec-action"
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <AsciiScramble text={`@${USERNAME} ↗`} />
        </a>
      </header>

      {/* Floor only: the box below reserves the exact graph height. These are the smallest loaded
          card heights per breakpoint (168 phones, 162 at 715–767px year mode, 192 from 1024px). */}
      <div className="frame-dashed group min-h-[168px] p-3 sm:min-h-[162px] sm:p-4 lg:min-h-[192px]">
        <span className="xhair" aria-hidden />

        <div ref={boxRef} className="relative w-full min-w-0" style={{ minHeight: graphHeight(blockSize) }}>
          {width > 0 && !calendarLoaded && <CalendarSkeleton {...layout} still={still} />}

          <div
            ref={calendarRef}
            className={`activity-graph min-h-[inherit] w-full ${
              calendarLoaded ? "relative" : "invisible absolute inset-x-0 top-0"
            } ${waving ? "calendar-wave" : ""}`}
          >
            {/* centred; an error message also sits in the middle of the reserved space */}
            <div className="flex min-h-[inherit] w-full items-center justify-center">
              {width > 0 && (
                <div className="relative min-w-0 max-w-full">
                  <GitHubCalendar
                    username={USERNAME}
                    year="last"
                    blockSize={blockSize}
                    blockMargin={M}
                    blockRadius={2}
                    fontSize={FONT}
                    transformData={transformData}
                    labels={labels}
                    // One key, drawn below on the count's line, replaces the library legend.
                    showColorLegend={false}
                    colorScheme={scheme}
                    theme={PALETTE}
                    renderBlock={renderBlock}
                    throwOnError={false}
                    errorMessage={ERROR_MESSAGE}
                  />

                  {/* Key, right-aligned on the footer line: the ramp (full year only) and
                      today's ring, which lands under the last column where today's cell is. */}
                  {hasData && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-end"
                      style={{ height: FOOTER_H }}
                    >
                      <span
                        ref={keyRef}
                        className={`inline-flex items-center gap-4 ${keyFits ? "" : "invisible"}`}
                      >
                        {mode === "year" && (
                          <span className="inline-flex items-center gap-1.5">
                            <span className="rail">Less</span>
                            <span className="inline-flex" style={{ gap: M }}>
                              {PALETTE[scheme].map((color) => (
                                <span
                                  key={color}
                                  className="h-2 w-2 rounded-[2px]"
                                  style={{
                                    backgroundColor: color,
                                    boxShadow: `inset 0 0 0 1px ${CELL_STROKE[scheme]}`,
                                  }}
                                />
                              ))}
                            </span>
                            <span className="rail">More</span>
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-[2px] border-[1.5px] border-[var(--accent-strong)]" />
                          <span className="rail">Today</span>
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityCalendar;
