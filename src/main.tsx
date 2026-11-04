import { StrictMode, Suspense, lazy, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router";
import { MotionConfig, motion } from "motion/react";
import "./index.css";

import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { BootProvider, useBoot } from "./context/BootContext";
import BootIntro from "./components/BootIntro";
import ScrollToTop from "./components/ScrollToTop";
import SpotlightTracker from "./components/SpotlightTracker";
import DockNavbar from "./components/DockNavbar";
import JumpTrigger, { JumpChip } from "./components/fx/JumpTrigger";

// Inner pages are split into their own chunks so the home page loads lean.
const Work = lazy(() => import("./pages/Work"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Top-level sections the breadcrumb links back to. */
const SECTIONS = new Set(["work", "projects", "skills", "blogs"]);

const istClock = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

const decodeSegment = (segment: string) => {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
};

/** The site's one live clock: IST, minute precision, idle while the tab is hidden. */
const useIstTime = () => {
  const [time, setTime] = useState(() => istClock.format(new Date()));

  useEffect(() => {
    const refresh = () => {
      if (!document.hidden) setTime(istClock.format(new Date()));
    };
    const id = window.setInterval(refresh, 30_000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  return time;
};

/**
 * Move focus to the visible page's <main id="main"> (a programmatic target, not a tab stop:
 * the temporary tabindex is dropped again on blur). Returns false while the lazily loaded
 * page has not mounted yet (the previous page may still be in the DOM, hidden by Suspense).
 */
const focusMain = () => {
  const main = document.querySelector<HTMLElement>("main#main");
  if (!main || main.getClientRects().length === 0) return false;
  if (!main.hasAttribute("tabindex")) {
    main.setAttribute("tabindex", "-1");
    main.addEventListener("blur", () => main.removeAttribute("tabindex"), { once: true });
  }
  main.focus({ preventScroll: true });
  return document.activeElement === main;
};

/**
 * After a client-side route change, hand focus to the new page so keyboard and screen-reader
 * users land on its content instead of staying on the persistent dock link. Skips the initial
 * load (the ref also survives StrictMode's double effect) and #hash links, which ScrollToTop
 * scrolls to.
 */
// eslint-disable-next-line react-refresh/only-export-components
const RouteFocus = () => {
  const { pathname, hash } = useLocation();
  const prev = useRef(pathname);

  useEffect(() => {
    if (prev.current === pathname) return;
    prev.current = pathname;
    if (hash || focusMain()) return;

    let attempts = 0;
    const id = window.setInterval(() => {
      if (focusMain() || attempts++ > 100) window.clearInterval(id);
    }, 50);
    return () => window.clearInterval(id);
  }, [pathname, hash]);

  return null;
};

/** Persistent masthead: ~/path breadcrumb, dotted leader, place and live IST time, tick rule. */
// The entry module is never hot-swapped as a component file, so fast refresh has nothing to lose here.
// eslint-disable-next-line react-refresh/only-export-components
const Masthead = () => {
  const { pathname } = useLocation();
  const { ready } = useBoot();
  const time = useIstTime();

  const raw = pathname.split("/").filter(Boolean);
  const segments = raw.length ? raw.map(decodeSegment) : ["index"];

  return (
    <motion.header
      className="masthead"
      initial={{ opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex h-10 items-center gap-3">
        <nav
          aria-label="Breadcrumb"
          className="jetbrains-mono flex min-w-0 items-center text-[11px] text-[var(--text-muted)]"
        >
          {/* 40px hit box that reaches into the left gutter; the glyph sits on the content edge
              and the first "/" tucks in right after it (slashes let taps through) */}
          <Link
            to="/"
            aria-label="Home"
            className="-ml-4 -mr-[17px] inline-flex h-10 w-10 shrink-0 items-center pl-4 text-[var(--accent)]"
          >
            ~
          </Link>
          {segments.map((segment, i) => {
            const last = i === segments.length - 1;
            return (
              <span
                key={`${i}-${segment}`}
                className={`pointer-events-none flex items-center ${last ? "min-w-0" : "shrink-0"}`}
              >
                <span aria-hidden className="text-[var(--text-subtle)]">
                  /
                </span>
                {last ? (
                  <span
                    aria-current="page"
                    className="pointer-events-auto min-w-0 truncate text-[var(--text-primary)]"
                  >
                    {segment}
                  </span>
                ) : i === 0 && SECTIONS.has(raw[0]) ? (
                  // glyphs sit flush against the slashes; the padding (cancelled by negative
                  // margins) widens the hit box to >= 40px over the non-interactive slashes
                  <Link
                    to={`/${raw[0]}`}
                    className="pointer-events-auto relative -ml-[4px] -mr-[10px] inline-flex h-10 shrink-0 items-center pl-[4px] pr-[10px] transition-colors duration-200 hover:text-[var(--text-primary)]"
                  >
                    {segment}
                  </Link>
                ) : (
                  <span className="pointer-events-auto shrink-0">{segment}</span>
                )}
              </span>
            );
          })}
        </nav>

        <span className="leader !m-0 !min-w-4" aria-hidden />

        <p className="flex shrink-0 items-center gap-2">
          <JumpChip />
          <span className="rail hidden sm:inline">Bengaluru, IN</span>
          <span aria-hidden className="rail hidden sm:inline">
            ·
          </span>
          <span className="sr-only">Based in Bengaluru, India (IST)</span>
          <span aria-hidden className="rail tabular-nums text-[var(--text-muted)]">
            {time} IST
          </span>
        </p>
      </div>
      <div className="tick-rule" aria-hidden />
    </motion.header>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BootProvider>
        <MotionConfig reducedMotion="user">
          <BrowserRouter>
            <BootIntro />
            <div className="grain" aria-hidden />
            <ScrollToTop />
            <RouteFocus />
            <SpotlightTracker />
            <a href="#main" className="skip-link">
              Skip to content
            </a>
            <Masthead />
            <Suspense fallback={<div className="min-h-screen" />}>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/work" element={<Work />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:slug" element={<BlogPost />} />
                {/* 404 - Always keep this last */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            {/* persistent: never unmounts, so the active dot slides between routes */}
            <DockNavbar />
            <JumpTrigger />
            <div className="bottom-progressive-blur" aria-hidden />
          </BrowserRouter>
        </MotionConfig>
      </BootProvider>
    </ThemeProvider>
  </StrictMode>,
);
