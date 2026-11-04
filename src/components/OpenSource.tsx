import React from "react";
import { Link } from "react-router";
import { FiArrowUpRight } from "react-icons/fi";
import AsciiScramble from "./AsciiScramble";

interface PullRequest {
  project: string;
  org: string;
  number: number;
  title: string;
  url: string;
  merged: boolean;
}

// Upstream pull requests, verified with `gh pr view` on 2026-10-23.
const pullRequests: PullRequest[] = [
  {
    project: "Better Auth",
    org: "better-auth",
    number: 10388,
    title: "Redirect IdP-initiated SAML flows in split-origin deployments",
    url: "https://github.com/better-auth/better-auth/pull/10388",
    merged: true,
  },
  {
    project: "Corsair",
    org: "corsairdev",
    number: 491,
    title: "Add Hashnode GraphQL plugin",
    url: "https://github.com/corsairdev/corsair/pull/491",
    merged: true,
  },
  {
    project: "PyTorch",
    org: "pytorch",
    number: 200308,
    title: "Preserve conjugate metadata for left-looking linalg solve",
    url: "https://github.com/pytorch/pytorch/pull/200308",
    merged: false,
  },
  {
    project: "Onyx",
    org: "onyx-dot-app",
    number: 14626,
    title: "Fix empty answers after successful retrieval",
    url: "https://github.com/onyx-dot-app/onyx/pull/14626",
    merged: false,
  },
  {
    project: "Better Auth",
    org: "better-auth",
    number: 10461,
    title: "Explicit stateless configuration for cookie-only deployments",
    url: "https://github.com/better-auth/better-auth/pull/10461",
    merged: false,
  },
];

const MergedIcon = () => (
  <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor" aria-hidden>
    <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z" />
  </svg>
);

const OpenIcon = () => (
  <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor" aria-hidden>
    <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
  </svg>
);

// Merged work first; the rest are open upstream (GitHub's own label).
const sortedPullRequests = [...pullRequests].sort((a, b) => Number(b.merged) - Number(a.merged));

// 640px+: logo | repository | pull request | status | ↗, shared by the column header and every row.
const ROW_GRID = "sm:grid-cols-[1.25rem_8.5rem_minmax(0,1fr)_5.25rem_0.75rem]";

const MERGED_BADGE = "border-[var(--accent-line)] bg-[var(--accent-soft)] text-[var(--accent)]";
const OPEN_BADGE = "border-dashed border-[var(--border-dashed)] bg-transparent text-[var(--text-muted)]";

export const OpenSource: React.FC = () => {
  const merged = pullRequests.filter((pr) => pr.merged).length;
  const open = pullRequests.length - merged;

  return (
    <section aria-labelledby="sec-oss">
      <header className="sec-head">
        <span className="sec-index" aria-hidden>
          §05
        </span>
        <h2 id="sec-oss" className="sec-title">
          <span className="sec-title-muted">Open</span> Source
        </h2>
        <span className="leader" aria-hidden />
        <Link className="sec-action" to="/work">
          <AsciiScramble text={`${merged} merged · ${open} open →`} />
        </Link>
      </header>

      <div className="overflow-hidden rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)]">
        <div
          aria-hidden
          className={`hidden gap-x-3 border-b border-[var(--border-color)] px-4 py-2 sm:grid ${ROW_GRID}`}
        >
          <span />
          <span className="rail">Repository</span>
          <span className="rail">Pull request</span>
          <span className="rail">Status</span>
          <span />
        </div>

        <ul>
          {sortedPullRequests.map((pr) => (
            <li key={pr.number} className="border-b border-dashed border-[var(--border-color)] last:border-0">
              {/*
                Phones: logo | name | badge, with the full title wrapping underneath — never clamped.
                640px+: one row in shared columns so the #numbers line up under the header.
              */}
              <a
                href={pr.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${pr.project} pull request #${pr.number}, ${pr.merged ? "merged" : "open"}: ${pr.title}`}
                className={`spotlight group grid min-h-14 grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1.5 px-3 py-3.5 transition-colors duration-200 hover:bg-[var(--card-hover)] focus-visible:outline-offset-[-2px] sm:min-h-12 sm:items-center sm:gap-y-0 sm:px-4 sm:py-3 ${ROW_GRID}`}
              >
                <img
                  src={`https://github.com/${pr.org}.png?size=40`}
                  alt=""
                  width={20}
                  height={20}
                  loading="lazy"
                  className="col-start-1 row-span-2 row-start-1 mt-0.5 h-5 w-5 shrink-0 rounded border border-[var(--border-color)] bg-[var(--pill-bg)] grayscale transition-[filter] duration-200 group-hover:grayscale-0 sm:row-span-1 sm:mt-0"
                />

                <span className="col-start-2 row-start-1 flex min-h-6 min-w-0 flex-wrap items-center gap-x-2">
                  <span className="whitespace-nowrap text-[13.5px] font-semibold leading-tight text-[var(--text-primary)]">
                    {pr.project}
                  </span>
                </span>

                <span className="col-span-2 col-start-2 row-start-2 text-pretty text-[14px] leading-[1.5] text-[var(--text-body)] sm:col-span-1 sm:col-start-3 sm:row-start-1 sm:text-[13.5px]">
                  <span className="jetbrains-mono text-[11.5px] tabular-nums text-[var(--text-subtle)]">
                    #{pr.number}
                  </span>{" "}
                  {pr.title}
                </span>

                {/* phones: badge and arrow travel together; 640px+: each takes its own column */}
                <span className="col-start-3 row-start-1 flex items-center gap-2 sm:contents">
                  <span
                    className={`jetbrains-mono inline-flex h-6 w-[4.75rem] shrink-0 items-center justify-center gap-1 rounded-full border text-[11px] sm:col-start-4 sm:row-start-1 ${
                      pr.merged ? MERGED_BADGE : OPEN_BADGE
                    }`}
                  >
                    {pr.merged ? <MergedIcon /> : <OpenIcon />}
                    {pr.merged ? "Merged" : "Open"}
                  </span>

                  <FiArrowUpRight
                    aria-hidden
                    className="shrink-0 text-xs text-[var(--text-subtle)] transition-[color,translate] duration-200 group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-[var(--text-primary)] sm:col-start-5 sm:row-start-1 sm:justify-self-end"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OpenSource;
