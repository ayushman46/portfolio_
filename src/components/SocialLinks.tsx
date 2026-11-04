import React, { useEffect, useState } from "react";
import { FaXTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { FiArrowUpRight, FiCheck, FiCopy } from "react-icons/fi";
import { EMAIL } from "../data/contact";

interface SocialItem {
  name: string;
  handle: string;
  href: string;
  icon: React.ReactNode;
}

const [EMAIL_USER, EMAIL_DOMAIN] = EMAIL.split("@");

const socials: SocialItem[] = [
  {
    name: "LinkedIn",
    handle: "in/ayushmanchakraborty",
    href: "https://www.linkedin.com/in/ayushmanchakraborty",
    icon: <FaLinkedinIn />,
  },
  {
    name: "GitHub",
    handle: "@ayushman46",
    href: "https://github.com/ayushman46",
    icon: <FaGithub />,
  },
  {
    name: "Resume",
    handle: "PDF · 1 page",
    href: "/Ayushman-Chakraborty-Resume.pdf",
    icon: <HiOutlineDocumentText />,
  },
  {
    name: "X",
    handle: "@Im_ayushman46",
    href: "https://x.com/Im_ayushman46",
    icon: <FaXTwitter />,
  },
];

export const SocialLinks: React.FC = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copyEmail = () => {
    navigator.clipboard
      ?.writeText(EMAIL)
      .then(() => setCopied(true))
      .catch(() => {
        /* clipboard blocked: the address stays visible and selectable */
      });
  };

  return (
    <section aria-labelledby="sec-contact">
      <header className="sec-head">
        <span className="sec-index" aria-hidden>
          §09
        </span>
        <h2 id="sec-contact" className="sec-title">
          <span className="sec-title-muted">Get in</span> touch
        </h2>
        <span className="leader" aria-hidden />
        <span className="sec-aside" aria-hidden>
          IST (UTC+5:30)
        </span>
      </header>

      <p className="mb-4 text-pretty text-[14px] leading-[1.6] text-[var(--text-body)]">
        Open to <span className="font-medium text-[var(--text-primary)]">SWE roles in AI &amp; backend</span>
        <span className="text-[var(--text-subtle)]"> · </span>graduating May 2027
        <span className="text-[var(--text-subtle)]"> · </span>Bengaluru
      </p>

      <p className="rail">Write to</p>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <a
          href={`mailto:${EMAIL}`}
          className="min-w-0 text-[clamp(1.25rem,0.85rem+3.2vw,2.25rem)] font-semibold leading-tight tracking-[-0.02em] text-[var(--text-primary)] underline decoration-[var(--border-dashed)] decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-200 [overflow-wrap:anywhere] hover:decoration-[var(--accent-strong)]"
        >
          {/* prefer breaking before the @ on narrow phones */}
          {EMAIL_USER}
          <wbr />@{EMAIL_DOMAIN}
        </a>

        <button
          type="button"
          onClick={copyEmail}
          aria-label="Copy email address"
          className="jetbrains-mono inline-flex h-10 shrink-0 items-center gap-1.5 rounded-md border border-[var(--accent-line)] bg-[var(--accent-soft)] px-3.5 text-xs font-medium text-[var(--accent)] transition-colors duration-200 hover:border-[var(--accent-strong)] hover:text-[var(--accent-strong)]"
        >
          {copied ? (
            <FiCheck aria-hidden className="text-[var(--accent)]" />
          ) : (
            <FiCopy aria-hidden />
          )}
          <span aria-hidden>{copied ? "copied" : "copy email"}</span>
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? "Email address copied" : ""}
        </span>
      </div>

      <ul className="mt-6 grid grid-cols-1 border-t border-[var(--border-color)] lg:grid-cols-2 lg:gap-x-10">
        {socials.map((s) => {
          const external = !s.href.startsWith("mailto:");
          return (
            <li key={s.name}>
              <a
                href={s.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex min-h-11 items-center gap-3 border-b border-dashed border-[var(--border-color)]"
              >
                <span
                  aria-hidden
                  className="flex w-3.5 shrink-0 justify-center text-[14px] text-[var(--text-subtle)] transition-colors duration-200 group-hover:text-[var(--text-primary)]"
                >
                  {s.icon}
                </span>
                <span className="shrink-0 text-[14px] font-medium text-[var(--text-primary)]">{s.name}</span>
                <span className="leader !mx-0 !min-w-4 max-[359px]:!hidden" aria-hidden />
                {/* never truncated: a long handle wraps only if the row is too narrow */}
                <span className="jetbrains-mono ml-auto min-w-0 text-right text-[12px] text-[var(--text-muted)] transition-colors duration-200 [overflow-wrap:anywhere] group-hover:text-[var(--text-primary)]">
                  {s.handle}
                </span>
                <FiArrowUpRight
                  aria-hidden
                  className="shrink-0 text-xs text-[var(--text-subtle)] transition-[color,translate] duration-200 group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-[var(--text-primary)]"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SocialLinks;
