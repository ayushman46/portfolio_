import React from "react";
import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import SEO from "../components/SEO";
import "../styles/inner.css";

const ART_404 = String.raw`         :*####:      :=**##**=:             =****-
        +%@@@@@:    :#%%%%##%%%%*.         :*#####=
      -%@@%%%%%:   .%%%%#:  -###%#.      .+###***#=
    :#@@%+=%%%%:   +%##%+    +####=    .=###+-****=
  .+%%%*: -%##%:   *###%-    =#**#+   -*#*+:  ****-
 =%%%#=. .=%###-.  +####-    =#**#+ :+***=.  .+*+*=
.%%%%###%########= =#**#=    =****- =****+***++++++++
 **********####**= .*#***:  :*****. -++++++++++++++==
          -####:    .+**********+.           .++++-
          :+===.      .-==++==-.              ----:`;

const EASE = [0.16, 1, 0.3, 1] as const;

const suggestions = [
  { to: "/work", label: "~/work" },
  { to: "/projects", label: "~/projects" },
  { to: "/blogs", label: "~/blogs" },
];

export const NotFound: React.FC = () => {
  const { pathname } = useLocation();
  const shown = pathname.length > 32 ? `${pathname.slice(0, 32)}…` : pathname;

  return (
    <>
      <SEO
        title="Page Not Found | Ayushman Chakraborty"
        description="The requested page could not be found on Ayushman Chakraborty's portfolio."
        noindex
      />
      <main id="main" className="page">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex min-h-[calc(100svh-12rem)] flex-col items-center justify-center text-center"
        >
          <pre aria-hidden className="ascii-art text-[6.5px] leading-[1.15] sm:text-[9px]">
            {ART_404}
          </pre>

          <h1 className="doto-font mt-6 text-[clamp(1.875rem,1.4rem+2vw,2.5rem)] leading-none font-bold tracking-[-0.02em] text-[var(--text-primary)]">
            Page not found
          </h1>

          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-pretty text-[var(--text-muted)]">
            The page you're looking for doesn't exist, may have moved, or is temporarily unavailable.
          </p>

          <p className="jetbrains-mono mt-4 max-w-full text-[11.5px] text-[var(--text-subtle)] [overflow-wrap:anywhere]">
            zsh: no such file or directory: ~{shown}
          </p>

          <Link to="/" className="btn-pill-3d mt-6" data-variant="primary">
            <svg aria-hidden width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 9H3M3 9L7.5 4.5M3 9L7.5 13.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Return home
          </Link>

          <nav aria-label="Suggested pages" className="mt-6 w-full max-w-[20rem]">
            <ul className="flex flex-col">
              {suggestions.map((s) => (
                <li key={s.to}>
                  <Link
                    to={s.to}
                    className="group jetbrains-mono flex min-h-11 items-center text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    <span>{s.label}</span>
                    <span className="leader" aria-hidden />
                    <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      </main>
    </>
  );
};

export default NotFound;
