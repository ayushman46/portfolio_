import React from "react";
import { Link } from "react-router";
import { useReducedMotion } from "motion/react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { EMAIL } from "../data/contact";


const elsewhere = [
  { name: "GitHub", href: "https://github.com/ayushman46", icon: <FaGithub /> },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/ayushmanchakraborty", icon: <FaLinkedinIn /> },
  { name: "X / Twitter", href: "https://x.com/Im_ayushman46", icon: <FaXTwitter /> },
  { name: "Resume (PDF)", href: "/Ayushman-Chakraborty-Resume.pdf", icon: <HiOutlineDocumentText /> },
];

// 40x40px minimum tap boxes on phones (short words like "Blog" keep their text left-aligned;
// the dotted underline is a text-decoration, so it stays under the glyphs); compact from 640px
const rowLink = "bio-link inline-flex min-h-10 min-w-10 items-center sm:min-h-0 sm:min-w-0";

export const Footer: React.FC = () => {
  const reduced = useReducedMotion();

  // scroll up, and take keyboard focus along so the next Tab starts at the top of the page
  // (main is a programmatic target, not a tab stop: the temporary tabindex goes on blur)
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    const main = document.getElementById("main");
    if (!main) return;
    if (!main.hasAttribute("tabindex")) {
      main.setAttribute("tabindex", "-1");
      main.addEventListener("blur", () => main.removeAttribute("tabindex"), { once: true });
    }
    main.focus({ preventScroll: true });
  };

  // park the glow off-screen when the cursor leaves the signature
  const resetGlow = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--mx", "-999px");
    e.currentTarget.style.setProperty("--my", "-999px");
  };

  return (
    <footer className="mt-16 text-[var(--text-muted)] sm:mt-20">
      <div className="tick-rule" aria-hidden />

      <div className="mt-6 grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        {/* Colophon */}
        <div className="flex flex-col gap-2 text-[13px]">
          <p className="rail">Colophon</p>
          <p className="max-w-[34rem] leading-relaxed">
            Designed &amp; built by Ayushman Chakraborty. Set in Figtree, IBM Plex Mono, JetBrains Mono &amp; Doto.
            Built with React, TypeScript, Vite, Tailwind CSS &amp; Motion.
          </p>
          <p className="flex flex-wrap items-center gap-x-3">
            <a href={`mailto:${EMAIL}`} className={rowLink}>
              {EMAIL}
            </a>
            <span aria-hidden className="text-[var(--text-subtle)]">
              ·
            </span>
            <Link to="/blogs" className={rowLink}>
              Blog
            </Link>
          </p>
          <p className="text-xs text-[var(--text-subtle)]">© 2026 Ayushman Chakraborty</p>
        </div>

        {/* Elsewhere + back to top; glyphs line up with the text edge on phones */}
        <div className="-ml-3 flex items-center gap-1 sm:ml-0">
          {elsewhere.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              title={item.name}
              className="flex h-10 w-10 items-center justify-center rounded-md text-sm text-[var(--text-subtle)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--badge-subtle-bg)] hover:text-[var(--text-primary)] sm:h-8 sm:w-8 sm:text-xs"
            >
              {item.icon}
            </a>
          ))}
          <button
            type="button"
            onClick={backToTop}
            className="rail ml-1 inline-flex min-h-10 cursor-pointer items-center px-2 transition-colors duration-200 hover:text-[var(--text-primary)]"
          >
            <span aria-hidden className="mr-1.5">
              ↑
            </span>
            Back to top
          </button>
        </div>
      </div>

      {/* Dot-matrix signature, lit by the cursor */}
      <div
        className="signature doto-font -mb-2 mt-8 select-none text-center text-[clamp(3.4rem,17.5vw,9.6rem)] leading-[0.85] font-bold tracking-tight"
        onPointerLeave={resetGlow}
        aria-hidden
      >
        AYUSHMAN
      </div>
    </footer>
  );
};

export default Footer;
