import React, { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useReducedMotion } from "motion/react";
import { ProjectData } from "../../data/projects";
import { BLOGS } from "../../data/blogs";
import { EMAIL } from "../../data/contact";
import { useTheme } from "../../context/ThemeContext";
import "./jump-palette.css";

type Group = "pages" | "sections" | "projects" | "writing" | "actions";

const GROUPS: Group[] = ["pages", "sections", "projects", "writing", "actions"];

interface Doc {
  key: string;
  group: Group;
  /** mono path on the left, also searched segment by segment */
  path: string;
  title: string;
  meta?: string;
  /** searched but not shown: full tech stack, category, tags */
  tags?: string;
  run: () => void;
}

interface Hit {
  doc: Doc;
  score: number;
}

const RESUME = "/Ayushman-Chakraborty-Resume.pdf";
// same URLs as src/components/OpenSource.tsx and SocialLinks.tsx
const LINKS = {
  github: "https://github.com/ayushman46",
  linkedin: "https://www.linkedin.com/in/ayushmanchakraborty",
  betterAuth: "https://github.com/better-auth/better-auth/pull/10388",
  corsair: "https://github.com/corsairdev/corsair/pull/491",
};

const SECTIONS: { id: string; title: string; meta: string }[] = [
  { id: "sec-activity", title: "GitHub activity", meta: "contribution graph" },
  { id: "sec-experience", title: "Experience", meta: "Wipro · TraininGenie" },
  { id: "sec-board", title: "Shipped board", meta: "departures" },
  { id: "sec-projects", title: "Featured projects", meta: "selected work" },
  { id: "sec-oss", title: "Open source", meta: "pull requests" },
  { id: "sec-signal", title: "How it runs", meta: "pipeline schematics" },
  { id: "sec-stack", title: "Tech stack", meta: "tools I use" },
  { id: "sec-now", title: "Now", meta: "what I'm on" },
  { id: "sec-contact", title: "Contact", meta: "say hello" },
];

/* ---------------------------------------------------------------- ranking */

/** Characters of q appear in s in order; bonus scaled by how tight the run is. */
const subsequence = (q: string, s: string) => {
  let i = 0;
  let first = -1;
  let last = -1;
  for (let j = 0; j < s.length && i < q.length; j++) {
    if (s[j] === q[i]) {
      if (first < 0) first = j;
      last = j;
      i++;
    }
  }
  if (i < q.length) return 0;
  return (last - first + 1) <= q.length * 2 ? 0.5 : 0.25;
};

/** keyword + path-aware: heading prefix / substring, path segments, meta, then a fuzzy subsequence fallback. */
function score(doc: Doc, tokens: string[]): number {
  const title = doc.title.toLowerCase();
  const segs = doc.path.toLowerCase().split(/[/\s]+/);
  const meta = `${doc.meta ?? ""} ${doc.tags ?? ""}`.toLowerCase();
  const words = title.split(/[\s·#()-]+/);
  let total = 0;
  for (const t of tokens) {
    let s = 0;
    if (title.startsWith(t) || words.some((w) => w.startsWith(t))) s += 3;
    else if (title.includes(t)) s += 2;
    if (segs.some((g) => g.includes(t))) s += 2;
    if (meta.includes(t)) s += 1;
    if (s === 0) s = subsequence(t, `${title} ${doc.path.toLowerCase()}`);
    if (s === 0) return 0; // every token has to land somewhere
    total += s;
  }
  return total;
}

/* -------------------------------------------------------------- component */

const JumpPalette: React.FC<{ onClose: (restore?: boolean) => void }> = ({ onClose }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const reduced = !!useReducedMotion();
  const uid = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const go = useCallback(
    (to: string) => {
      onClose(false);
      navigate(to);
    },
    [navigate, onClose],
  );

  const openExternal = useCallback(
    (href: string) => {
      window.open(href, "_blank", "noopener,noreferrer");
      onClose();
    },
    [onClose],
  );

  const jumpToSection = useCallback(
    (id: string) => {
      onClose(false);
      // Off Home, go through the #hash route: ScrollToTop scrolls to it once Home has rendered
      // (a plain navigate would scroll to the top and RouteFocus would take focus to <main>).
      const away = pathname !== "/";
      if (away) navigate({ pathname: "/", hash: id });
      const start = performance.now();
      const find = () => {
        const el = document.getElementById(id);
        if (el) {
          const section = el.closest("section") ?? el;
          if (!away) section.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
          if (!el.hasAttribute("tabindex")) {
            el.setAttribute("tabindex", "-1");
            el.addEventListener("blur", () => el.removeAttribute("tabindex"), { once: true });
          }
          el.focus({ preventScroll: true });
          return;
        }
        if (performance.now() - start < 1200) requestAnimationFrame(find);
      };
      requestAnimationFrame(find);
    },
    [navigate, onClose, pathname, reduced],
  );

  // The index: built once per open.
  const docs = useMemo<Doc[]>(() => {
    const out: Doc[] = [
      { key: "p-index", group: "pages", path: "~/index", title: "Home", meta: "index", run: () => go("/") },
      { key: "p-work", group: "pages", path: "~/work", title: "Work", meta: "experience timeline", run: () => go("/work") },
      { key: "p-projects", group: "pages", path: "~/projects", title: "Projects", meta: "all projects", run: () => go("/projects") },
      { key: "p-skills", group: "pages", path: "~/skills", title: "Skills", meta: "stack + verified credentials", run: () => go("/skills") },
      { key: "p-blogs", group: "pages", path: "~/blogs", title: "Blog", meta: "writing", run: () => go("/blogs") },
    ];

    // Sections that exist on Home. Off Home we cannot check the DOM, so list the known ids.
    const onHome = pathname === "/";
    for (const s of SECTIONS) {
      if (onHome && !document.getElementById(s.id)) continue;
      out.push({ key: `s-${s.id}`, group: "sections", path: `index#${s.id.slice(4)}`, title: s.title, meta: s.meta, run: () => jumpToSection(s.id) });
    }

    for (const p of ProjectData) {
      out.push({
        key: `pr-${p.slug}`,
        group: "projects",
        path: `projects/${p.slug}`,
        title: p.heading,
        meta: [p.techStack.slice(0, 3).join(" · "), p.metric].filter(Boolean).join(" — "),
        tags: [...p.techStack, p.category].join(" "),
        run: () => go(`/projects/${p.slug}`),
      });
    }

    for (const b of BLOGS) {
      out.push({
        key: `b-${b.slug}`,
        group: "writing",
        path: `blogs/${b.slug}`,
        title: b.title,
        meta: [b.date, b.readTime, ...b.tags].join(" · "),
        run: () => go(`/blogs/${b.slug}`),
      });
    }

    out.push(
      {
        key: "a-email",
        group: "actions",
        path: "copy email",
        title: "Copy email address",
        meta: EMAIL,
        run: () => {
          const done = () => {
            setStatus("Email copied");
            closeTimer.current = window.setTimeout(() => onClose(), 900);
          };
          if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(EMAIL).then(done, () => setStatus(`Copy failed: ${EMAIL}`));
          } else setStatus(`Copy unavailable: ${EMAIL}`);
        },
      },
      { key: "a-resume", group: "actions", path: "open resume", title: "Open résumé (PDF)", meta: "new tab", run: () => openExternal(RESUME) },
      {
        key: "a-theme",
        group: "actions",
        path: "toggle theme",
        title: `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
        meta: "theme",
        run: () => {
          toggleTheme();
          onClose();
        },
      },
      { key: "a-gh", group: "actions", path: "github", title: "GitHub profile", meta: "ayushman46", run: () => openExternal(LINKS.github) },
      { key: "a-li", group: "actions", path: "linkedin", title: "LinkedIn profile", meta: "ayushmanchakraborty", run: () => openExternal(LINKS.linkedin) },
      { key: "a-bau", group: "actions", path: "oss/better-auth", title: "Better Auth PR #10388", meta: "merged · open source", run: () => openExternal(LINKS.betterAuth) },
      { key: "a-crs", group: "actions", path: "oss/corsair", title: "Corsair PR #491", meta: "merged · YC W25 · open source", run: () => openExternal(LINKS.corsair) },
    );
    return out;
    // theme only changes the toggle label; rebuilding is cheap
  }, [go, jumpToSection, onClose, openExternal, pathname, theme, toggleTheme]);

  const hits = useMemo<Hit[]>(() => {
    const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!tokens.length) {
      let projects = 0;
      return docs
        .filter((d) => d.group === "pages" || d.group === "actions" || (d.group === "projects" && projects++ < 4))
        .map((doc) => ({ doc, score: 1 }));
    }
    return docs
      .map((doc) => ({ doc, score: score(doc, tokens) }))
      .filter((h) => h.score > 0)
      .sort((a, b) => b.score - a.score || GROUPS.indexOf(a.doc.group) - GROUPS.indexOf(b.doc.group));
  }, [docs, query]);

  const maxScore = hits.reduce((m, h) => Math.max(m, h.score), 0) || 1;
  const grouped = !query.trim();
  const optId = (i: number) => `${uid}-opt-${i}`;
  const activeId = hits.length ? optId(Math.min(active, hits.length - 1)) : undefined;

  useEffect(() => setActive(0), [query]);

  // keep the active option in view
  useLayoutEffect(() => {
    if (!activeId) return;
    document.getElementById(activeId)?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  // focus the input on pointer devices (phones would pop the keyboard over the list), lock page scroll
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
    else panelRef.current?.focus();
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
      window.clearTimeout(closeTimer.current);
    };
  }, []);

  const runAt = (i: number) => {
    const hit = hits[i];
    if (hit) hit.doc.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      onClose();
      return;
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!hits.length) return;
      const d = e.key === "ArrowDown" ? 1 : -1;
      setActive((a) => (a + d + hits.length) % hits.length);
      return;
    }
    if (e.key === "Enter" && e.target === inputRef.current) {
      e.preventDefault();
      runAt(Math.min(active, hits.length - 1));
      return;
    }
    if (e.key === "Tab") {
      // trap focus inside the dialog
      const panel = panelRef.current;
      if (!panel) return;
      const f = Array.from(
        panel.querySelectorAll<HTMLElement>('input, button, a[href], [tabindex]:not([tabindex="-1"])'),
      ).filter((el) => !el.hasAttribute("disabled"));
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      const cur = document.activeElement;
      if (e.shiftKey && (cur === first || cur === panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && cur === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  // render list rows, with group headings only for the empty-query browse view
  const rows: React.ReactNode[] = [];
  let lastGroup: Group | null = null;
  hits.forEach((h, i) => {
    if (grouped && h.doc.group !== lastGroup) {
      lastGroup = h.doc.group;
      rows.push(
        <li key={`g-${h.doc.group}`} role="presentation" className="rail jp-group">
          {h.doc.group}
        </li>,
      );
    }
    const on = i === Math.min(active, hits.length - 1);
    rows.push(
      <li
        key={h.doc.key}
        id={optId(i)}
        role="option"
        aria-selected={on}
        className="jp-opt"
        onMouseMove={() => !on && setActive(i)}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => runAt(i)}
      >
        <span className="jp-path jetbrains-mono">{h.doc.path}</span>
        <span className="jp-text">
          <span className="jp-title">{h.doc.title}</span>
          {h.doc.meta && <span className="jp-meta">{h.doc.meta}</span>}
        </span>
        {!grouped && <span className="jp-kind rail">{h.doc.group}</span>}
        <span className="jp-score" aria-hidden>
          <span style={{ transform: `scaleX(${on ? h.score / maxScore : 0})` }} />
        </span>
      </li>,
    );
  });

  return (
    <div className="jp-root" data-still={reduced ? "" : undefined}>
      <div className="jp-backdrop" aria-hidden onClick={() => onClose()} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Jump to"
        tabIndex={-1}
        className="frame-dashed jp-panel"
        onKeyDown={onKeyDown}
      >
        <span className="xhair" aria-hidden />

        <div className="jp-bar">
          <span className="jp-dots" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span className="jetbrains-mono jp-bar-title">ayushman@portfolio: ~/jump</span>
          <button type="button" className="jetbrains-mono jp-esc" onClick={() => onClose()} aria-label="Close quick jump">
            esc
          </button>
        </div>

        <label className="jp-input-row">
          <span className="rail jp-prompt" aria-hidden>
            ~ $ jump
          </span>
          <span className="sr-only">Search pages, sections, projects, posts and actions</span>
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded="true"
            aria-controls="jp-list"
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="go"
            placeholder="projects, posts, sections, actions…"
            className="jetbrains-mono jp-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        <ul ref={listRef} id="jp-list" role="listbox" aria-label="Results" className="jp-list">
          {rows}
          {!hits.length && (
            <li role="presentation" className="jp-empty jetbrains-mono">
              0 hits for “{query.trim()}” · try a project, tech or page
            </li>
          )}
        </ul>

        <div className="jp-foot">
          <span className="rail">
            retrieval: keyword + path-aware ranking · {docs.length} docs indexed
          </span>
          <span className="rail jp-keys" aria-hidden>
            ↑↓ move · ↵ open · esc close
          </span>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {status || (query.trim() ? `${hits.length} results` : "")}
        </p>
        {status && (
          <p className="jp-toast jetbrains-mono" aria-hidden>
            ✓ {status.toLowerCase()}
          </p>
        )}
      </div>
    </div>
  );
};

export default JumpPalette;
