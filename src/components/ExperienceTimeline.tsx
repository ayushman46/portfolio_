import React from "react";

interface TimelineNode {
  title: string;
  company: string;
  period: string;
  badge: string;
  isCurrent?: boolean;
}

const timelineNodes: TimelineNode[] = [
  {
    title: "Enterprise AI",
    company: "Wipro · Intern",
    period: "Jun - Jul 2025",
    badge: "01",
  },
  {
    title: "Full Stack",
    company: "TraininGenie · Intern",
    period: "May - Jul 2026",
    badge: "02",
  },
  {
    title: "Open Source",
    company: "Better Auth · Corsair",
    period: "Jul 2026",
    badge: "03",
    isCurrent: true,
  },
];

const positions = ["5%", "50%", "95%"];
const GAP_OFFSET = 10;

export const ExperienceTimeline: React.FC = () => {
  const segments = timelineNodes.slice(0, -1).map((_, idx) => {
    const startPct = parseFloat(positions[idx]);
    const endPct = parseFloat(positions[idx + 1]);

    const isHighlighted =
      timelineNodes[idx].isCurrent || timelineNodes[idx + 1].isCurrent;

    return {
      startPct,
      endPct,
      isHighlighted,
    };
  });

  const highlightedIndices = segments
    .map((segment, index) => (segment.isHighlighted ? index : -1))
    .filter((index) => index >= 0);

  const firstHighlighted = highlightedIndices[0];
  const lastHighlighted =
    highlightedIndices[highlightedIndices.length - 1];

  return (
    <div className="box min-h-[148px] sm:min-h-[132px]">
      <div className="relative h-[148px] w-full sm:h-[132px]">
        {/* Timeline Lines */}
        {segments.map((segment, idx) => {
          const width = `calc(${
            segment.endPct - segment.startPct
          }% - ${GAP_OFFSET * 2}px)`;

          const isFirst = idx === firstHighlighted;
          const isLast = idx === lastHighlighted;

          let highlightBg = "var(--text-primary)";

          if (isFirst && isLast) {
            highlightBg =
              "linear-gradient(to right, transparent, var(--text-primary) 20%, var(--text-primary) 80%, transparent)";
          } else if (isFirst) {
            highlightBg =
              "linear-gradient(to right, transparent, var(--text-primary) 20%)";
          } else if (isLast) {
            highlightBg =
              "linear-gradient(to right, var(--text-primary) 80%, transparent)";
          }

          return (
            <React.Fragment key={idx}>
              {/* Base timeline */}
              <div
                className="absolute top-[7px] h-[1.5px] bg-[var(--border-color)]"
                style={{
                  left: `calc(${segment.startPct}% + ${GAP_OFFSET}px)`,
                  width,
                }}
              />

              {/* Highlighted current path */}
              {segment.isHighlighted && (
                <div
                  className="absolute top-[7px] h-[1.5px]"
                  style={{
                    left: `calc(${segment.startPct}% + ${GAP_OFFSET}px)`,
                    width,
                    background: highlightBg,
                  }}
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
              <div
                className="absolute top-[7px] -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: dotPos }}
              >
                {item.isCurrent ? (
                  <span
                    className="
                      block
                      h-2.5
                      w-2.5
                      rounded-full
                      bg-emerald-400
                      ring-[3px]
                      ring-[var(--bg-page)]
                      animate-pulse-glow
                    "
                  />
                ) : (
                  <span
                    className="
                      block
                      h-2
                      w-2
                      rounded-full
                      bg-[var(--text-subtle)]
                      ring-[3px]
                      ring-[var(--bg-page)]
                    "
                  />
                )}
              </div>

              {/* Timeline Content */}
              <div
                className={`absolute top-[20px] flex flex-col gap-[2px] ${
                  isFirst
                    ? "left-0 items-start text-left"
                    : isLast
                      ? "right-0 items-end text-right"
                      : "items-center text-center -translate-x-1/2"
                }`}
                style={
                  !isFirst && !isLast
                    ? { left: dotPos }
                    : undefined
                }
              >
                {/* Badge + Role */}
                <div
                  className={`flex items-center gap-1.5 ${
                    isLast ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Badge */}
                  <span
                    className={`px-1.5 py-[2px] rounded text-[8px] sm:text-[11px] font-mono font-semibold border leading-none ${
                      item.isCurrent
                        ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                        : "border-[var(--border-color)] bg-[var(--badge-subtle-bg)] text-[var(--text-primary)]"
                    }`}
                  >
                    {item.badge}
                  </span>

                  {/* Role */}
                  <span
                    className={`text-[9px] sm:text-[12px] font-semibold leading-tight whitespace-nowrap ${
                      item.isCurrent
                        ? "text-emerald-400"
                        : "text-[var(--text-primary)]"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>

                {/* Company */}
                <span
                  className={`text-[7px] sm:text-[10px] font-medium leading-tight whitespace-nowrap ${
                    item.isCurrent
                      ? "text-emerald-400/80"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  {item.company}
                </span>

                {/* Period */}
                <span
                  className="
                    jetbrains-mono
                    text-[7px]
                    sm:text-[9px]
                    leading-tight
                    text-[var(--text-subtle)]
                    whitespace-nowrap
                  "
                >
                  {item.period}
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
