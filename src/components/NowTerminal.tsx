import React, { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { FiCheck, FiCopy } from "react-icons/fi";
import { BLOGS } from "../data/blogs";
import { EMAIL } from "../data/contact";


// "A" monogram rendered from a heavy typeface and shaded into ASCII.
const LOGO = String.raw`        .###*****.
        #@%%%%%%%*
       *@%%%%%####+
      =%%%#%++#####=
     -%##### .###**#:
    .%#####:  :#*****.
    ######+.:::+*****+
   *%#########******+*=
  =####*#*******+*+++++-
 -%#####=        =*+++++:
.+++++++         .=======.`;

// neofetch-style colour blocks, using the site's own palette (the last one is the live accent)
const PALETTE = ["#1C1D1F", "#3F3F46", "#71717A", "#D4D4D8", "#FFFFFF", "var(--accent-strong)"];

// Newest post by date, so the row stays right whatever order posts are added in.
const LATEST_POST = [...BLOGS].sort((a, b) => b.isoDate.localeCompare(a.isoDate))[0];

const lineVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

// Below 640px every link is a 40px-tall tap target.
const inlineLink =
  "text-[var(--text-primary)] underline decoration-[var(--border-dashed)] underline-offset-2 transition-colors hover:decoration-[var(--text-primary)] max-sm:inline-flex max-sm:min-h-10 max-sm:items-center";

// Short links in a " · " list ("onyx") also get a ::before pad that widens them to 40px without moving the text;
// the separator between neighbours stays wider than both pads together, so the targets never overlap.
const partLink = `${inlineLink} max-sm:relative max-sm:before:absolute max-sm:before:inset-y-0 max-sm:before:-inset-x-1.5`;

/**
 * `interactive` rows hold links: below 640px they grow to the links' 40px height, with the key on the first
 * line's baseline (so a wrapped value still reads like neofetch). Text-only rows keep the tight 1.8 leading.
 */
const Row: React.FC<{ k: string; interactive?: boolean; children: React.ReactNode }> = ({ k, interactive, children }) => (
  <motion.div variants={lineVariants} className={`flex gap-3 ${interactive ? "max-sm:items-baseline" : ""}`}>
    <span className="w-[4.25rem] shrink-0 text-[var(--accent)] sm:w-[5.5rem]">{k}</span>
    <span className="min-w-0 text-[var(--text-muted)]">{children}</span>
  </motion.div>
);

/** Multi-part value whose parts never split mid-word: lines only break after a " · " separator. */
const Parts: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <>
    {items.map((item, i) => (
      <React.Fragment key={i}>
        {i > 0 && "\u00a0· "}
        <span className="whitespace-nowrap">{item}</span>
      </React.Fragment>
    ))}
  </>
);

export const NowTerminal: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(EMAIL).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <section aria-labelledby="sec-now">
      <header className="sec-head">
        <span className="sec-index" aria-hidden>
          §08
        </span>
        <h2 id="sec-now" className="sec-title">
          <span className="sec-title-muted">Right</span> Now
        </h2>
        <span className="leader" aria-hidden />
        <span className="sec-aside" aria-hidden>
          ~/neofetch
        </span>
      </header>

      <div className="group overflow-hidden rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] transition-colors duration-200 hover:border-[var(--text-muted)]">
        {/* Window chrome */}
        <div className="flex h-9 items-center gap-3 border-b border-[var(--border-color)] bg-[var(--pill-bg)] px-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-dashed)] transition-colors duration-300 group-hover:bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-dashed)] transition-colors delay-75 duration-300 group-hover:bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-dashed)] transition-colors delay-150 duration-300 group-hover:bg-[#28c840]" />
          </div>
          <span className="jetbrains-mono flex-1 text-center text-[10px] text-[var(--text-subtle)]">ayushman@portfolio: ~</span>
          <span className="w-[42px]" aria-hidden />
        </div>

        {/* Session */}
        <motion.div
          className="jetbrains-mono px-3.5 py-3 text-[11.5px] leading-[1.8] sm:px-4 sm:text-xs"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.07, delayChildren: 0.15 }}
        >
          <motion.div variants={lineVariants}>
            <span className="text-[var(--accent)]">~</span>
            <span className="text-[var(--text-subtle)]"> $ </span>
            <span className="text-[var(--text-primary)]">neofetch</span>
          </motion.div>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-7">
            {/* ASCII logo — dropped on narrow screens, the way neofetch does in a small terminal */}
            <motion.pre
              variants={lineVariants}
              aria-hidden
              className="ascii-art hidden shrink-0 self-start pt-1 text-[13px] leading-[1.2] sm:block"
            >
              {LOGO}
            </motion.pre>

            {/* Info */}
            <motion.div className="flex min-w-0 flex-col" transition={{ staggerChildren: 0.06 }}>
              <motion.div variants={lineVariants}>
                <span className="text-[var(--accent)]">ayushman</span>
                <span className="text-[var(--text-subtle)]">@</span>
                <span className="text-[var(--accent)]">portfolio</span>
              </motion.div>
              <motion.div variants={lineVariants} className="text-[var(--text-subtle)]">
                ------------------
              </motion.div>
              <Row k="role">ai &amp; backend engineer · llm / rag / agents</Row>
              <Row k="location">bengaluru, in</Row>
              <Row k="education">
                <Parts items={["b.tech cse (data science)", "manipal", "class of '27"]} />
              </Row>
              <Row k="users">
                <Parts items={["130+ on live products", "prepvia 100+", "codeglyph 30+"]} />
              </Row>
              <Row k="building" interactive>
                <Parts
                  items={[
                    <Link to="/projects/twtdash" className={partLink}>
                      twtdash
                    </Link>,
                    <Link to="/projects/settle" className={partLink}>
                      settle
                    </Link>,
                    <Link to="/projects/releaselens" className={partLink}>
                      releaselens
                    </Link>,
                    <Link to="/projects/mandategraph" className={partLink}>
                      mandategraph
                    </Link>,
                  ]}
                />
              </Row>
              <Row k="merged" interactive>
                <Parts
                  items={[
                    <a href="https://github.com/better-auth/better-auth/pull/10388" target="_blank" rel="noopener noreferrer" className={partLink}>
                      better auth
                    </a>,
                    <a href="https://github.com/corsairdev/corsair/pull/491" target="_blank" rel="noopener noreferrer" className={partLink}>
                      corsair
                    </a>,
                  ]}
                />
              </Row>
              <Row k="open" interactive>
                <Parts
                  items={[
                    <a href="https://github.com/pytorch/pytorch/pull/200308" target="_blank" rel="noopener noreferrer" className={partLink}>
                      pytorch
                    </a>,
                    <a href="https://github.com/onyx-dot-app/onyx/pull/14626" target="_blank" rel="noopener noreferrer" className={partLink}>
                      onyx
                    </a>,
                  ]}
                />
              </Row>
              <Row k="stack">
                <Parts items={["python", "typescript", "fastapi", "next.js", "airflow", "dbt"]} />
              </Row>
              <Row k="awards">
                <Parts items={["bosch bgsw top 5", "hackverse top 5/50"]} />
              </Row>
              <Row k="certs">
                <Parts items={["anthropic mcp", "datacamp mlops", "ibm agentic ai", "kaggle cv + dl"]} />
              </Row>
              <Row k="offline">professional cricketer</Row>
              <Row k="contact" interactive>
                <span className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 sm:gap-x-2">
                  <a href={`mailto:${EMAIL}`} className={inlineLink}>
                    {EMAIL}
                  </a>
                  <button
                    type="button"
                    onClick={copy}
                    aria-label={copied ? "Email address copied" : "Copy email address"}
                    // icon-only on phones so it stays beside the email; the ::before pad makes the tap area 40px square
                    className="relative inline-flex cursor-pointer items-center gap-1 rounded border border-[var(--border-color)] bg-[var(--badge-subtle-bg)] p-1 text-[11px] text-[var(--text-muted)] transition-colors before:absolute before:-inset-[10px] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] sm:px-1.5 sm:py-[1px] sm:before:hidden"
                  >
                    {copied ? <FiCheck aria-hidden className="text-[var(--accent)]" /> : <FiCopy aria-hidden />}
                    <span aria-hidden className="hidden sm:inline">
                      {copied ? "copied" : "copy"}
                    </span>
                  </button>
                </span>
              </Row>
              {/* derived: the newest post, so the session always points at the latest writing */}
              {LATEST_POST && (
                <Row k="latest" interactive>
                  <Link to={`/blogs/${LATEST_POST.slug}`} className={inlineLink}>
                    {LATEST_POST.title}
                  </Link>
                </Row>
              )}

              <motion.div variants={lineVariants} className="mt-2.5 flex gap-1" aria-hidden>
                {PALETTE.map((c) => (
                  <span key={c} className="h-3 w-5 rounded-[2px] ring-1 ring-[var(--border-color)]" style={{ background: c }} />
                ))}
              </motion.div>
            </motion.div>
          </div>

          <motion.div variants={lineVariants} className="mt-3">
            <span className="text-[var(--accent)]">~</span>
            <span className="text-[var(--text-subtle)]"> $ </span>
            <span className="terminal-caret" aria-hidden />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NowTerminal;
