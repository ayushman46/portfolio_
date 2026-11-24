import React from "react";
import { motion } from "motion/react";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { AWARDS, CERTIFICATIONS } from "../data/credentials";
import "../styles/inner.css";

interface WorkExperience {
  company: string;
  type: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  links?: { label: string; href: string }[];
  skills?: string[];
  isCurrent?: boolean;
}

// Experience first, then open source contributions, then education.
const workData: WorkExperience[] = [
  {
    company: "TraininGenie",
    type: "Startup",
    role: "Software Development Intern (Full Stack)",
    period: "May 2026 – Jul 2026",
    location: "Remote",
    description: [
      "Sole developer: built and launched the company's production website showcasing its corporate training programs, from architecture to launch (Next.js 16, TypeScript, Tailwind CSS).",
      "Owned testing, debugging and deployment of a fully static, prerendered site with a strict Content Security Policy and an enquiry form posted to FormSubmit, so there is no backend to run.",
      "Led technical SEO and GEO (metadata, sitemaps, canonical URLs, JSON-LD schema, llms.txt, IndexNow), improving discoverability on search and AI engines.",
    ],
    links: [{ label: "trainingenie.com", href: "https://www.trainingenie.com" }],
    skills: ["Next.js", "TypeScript", "React", "Tailwind CSS", "shadcn/ui", "Technical SEO / GEO"],
    isCurrent: false,
  },
  {
    company: "Wipro Limited",
    type: "Internship",
    role: "Software Engineering and Generative AI Intern",
    period: "Jun 2025 – Jul 2025",
    location: "Bengaluru, India",
    description: [
      "Architected AutoBlog, a multimodal GenAI pipeline that turns technical videos from 30+ internal sources into documentation.",
      "Engineered parallel audio and visual pipelines: Whisper transcription plus computer vision to extract on-screen code.",
      "Designed a frame-deduplication method that cut frames sent to the model by 75% and sped up processing by about 40%.",
      "Generated blogs with Azure OpenAI GPT-4o, with automated evaluation and regression tests; shipped via Streamlit and Docker.",
    ],
    skills: ["Python", "Azure OpenAI GPT-4o", "Whisper", "Computer Vision", "Streamlit", "Docker"],
    isCurrent: false,
  },
  {
    company: "Open Source Contributions",
    type: "2 merged · 3 open",
    role: "Volunteer contributor · Better Auth, Corsair, PyTorch, Onyx",
    period: "Jul 2026 – Present",
    location: "GitHub",
    description: [
      "Better Auth (29k+★): fixed IdP-initiated SAML single sign-on redirects in split-origin deployments with trusted-callback resolution and regression tests. Merged.",
      "Corsair (YC W25): shipped a Hashnode GraphQL integration for AI agents across 10 endpoint groups, with schema validation and Jest tests. Merged.",
      "Open: a conjugate-metadata fix for linalg solve in PyTorch, an empty-answer fix in Onyx, and a stateless cookie-only configuration fix in Better Auth.",
    ],
    links: [
      { label: "better-auth#10388", href: "https://github.com/better-auth/better-auth/pull/10388" },
      { label: "corsair#491", href: "https://github.com/corsairdev/corsair/pull/491" },
      { label: "pytorch#200308", href: "https://github.com/pytorch/pytorch/pull/200308" },
      { label: "onyx#14626", href: "https://github.com/onyx-dot-app/onyx/pull/14626" },
      { label: "better-auth#10461", href: "https://github.com/better-auth/better-auth/pull/10461" },
    ],
    skills: ["TypeScript", "Python", "SAML", "GraphQL", "Jest"],
    isCurrent: true,
  },
  {
    company: "Manipal Institute of Technology",
    type: "Education",
    role: "B.Tech Computer Science and Engineering (Data Science)",
    period: "Jul 2023 – May 2027",
    location: "Bengaluru, India · CGPA 7.41/10",
    description: [
      "Final-year student building AI, backend and data systems alongside coursework in DSA, OOP, DBMS, operating systems and networks, while competing as a professional cricketer and athlete.",
      "Major GPA: 8.0/10.",
      `Awards: ${AWARDS.map((a) => `${a.title}, ${a.org} (${a.detail})`).join("; ")}.`,
      `Certifications: ${CERTIFICATIONS.map((c) => `${c.name} (${c.issuer}${c.date ? `, ${c.date}` : ""})`).join(" · ")}.`,
    ],
    links: [{ label: "IBM agentic AI badge", href: "https://www.credly.com/go/WPcLDSmS" }],
    skills: ["Data Science", "DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks"],
    isCurrent: true,
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/** Spine segment below an entry: accent while the entry is current, fading at the ends of the list. */
const segmentStyle = (item: WorkExperience, index: number): React.CSSProperties | undefined => {
  if (!item.isCurrent) return undefined;
  const isFirst = index === 0;
  const isLast = index === workData.length - 2;
  const c = "var(--accent-strong)";
  if (isFirst && isLast) return { background: `linear-gradient(to bottom, transparent, ${c} 20%, ${c} 80%, transparent)` };
  if (isFirst) return { background: `linear-gradient(to bottom, transparent, ${c} 20%)` };
  if (isLast) return { background: `linear-gradient(to bottom, ${c} 80%, transparent)` };
  return { background: c };
};

export const Work: React.FC = () => {
  return (
    <>
      <SEO
        title="Work & Experience | Ayushman Chakraborty"
        description="Ayushman Chakraborty's experience: multimodal GenAI pipeline at Wipro (75% fewer frames, ~40% faster), sole developer of TraininGenie's production site, merged fixes in Better Auth and Corsair (YC W25), and Manipal Institute of Technology."
        path="/work"
      />
      <main id="main" className="page">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="rail inner-eyebrow">
            <span className="text-[var(--accent)]">[01]</span>
            <span>/ 04</span>
          </p>
          <h1 className="inner-title">Work</h1>
          <div className="tick-rule mt-8" aria-hidden />
        </motion.header>

        {/* Single-column timeline: spine + entry */}
        <ol className="mt-8 flex flex-col">
          {workData.map((item, index) => {
            const last = index === workData.length - 1;
            return (
              <motion.li
                key={item.company}
                className="relative flex gap-2.5 sm:gap-3"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: EASE, delay: Math.min(index, 8) * 0.06 }}
              >
                {/* Spine */}
                <div aria-hidden className="flex w-5 shrink-0 flex-col items-center">
                  {/* node sits on the company name's cap height */}
                  <span className="mt-[9px] flex h-2.5 items-center justify-center">
                    {item.isCurrent ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-strong)] ring-2 ring-[var(--bg-page)]" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-[var(--text-subtle)] ring-2 ring-[var(--bg-page)]" />
                    )}
                  </span>
                  {!last && (
                    <span
                      className={`my-[3px] w-[1.5px] flex-1 ${item.isCurrent ? "" : "bg-[var(--border-color)]"}`}
                      style={segmentStyle(item, index)}
                    />
                  )}
                </div>

                {/* Entry */}
                <div className={`min-w-0 flex-1 ${last ? "pb-0" : "pb-10"}`}>
                  <div className="flex flex-col gap-1.5 border-b border-[var(--border-color)] pb-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                        <h2 className="text-[length:var(--fs-item)] font-semibold tracking-[-0.01em] text-[var(--text-primary)]">
                          {item.company}
                        </h2>
                        <span className="chip">{item.type}</span>
                      </div>
                      <p className="mt-1 text-[length:var(--fs-body)] font-medium text-pretty text-[var(--text-primary)]/90">{item.role}</p>
                    </div>

                    {/* from 640px: period above location, right-aligned */}
                    <div className="hidden shrink-0 flex-col items-end gap-1 pt-[5px] sm:flex">
                      <span
                        className={`jetbrains-mono text-xs whitespace-nowrap tabular-nums ${
                          item.isCurrent ? "font-medium text-[var(--accent)]" : "text-[var(--text-muted)]"
                        }`}
                      >
                        {item.period}
                      </span>
                      <span className="text-xs whitespace-nowrap text-[var(--text-muted)]">{item.location}</span>
                    </div>

                    {/* phones: one wrapping line */}
                    <p className="jetbrains-mono text-[0.75rem] leading-relaxed text-[var(--text-muted)] tabular-nums sm:hidden">
                      <span className={item.isCurrent ? "font-medium text-[var(--accent)]" : undefined}>{item.period}</span>
                      <span aria-hidden className="text-[var(--text-subtle)]">
                        {" · "}
                      </span>
                      <span>{item.location}</span>
                    </p>
                  </div>

                  <ul className="mt-3 flex max-w-[68ch] flex-col gap-2.5 text-[15px] leading-[1.7] text-pretty text-[var(--text-muted)]">
                    {item.description.map((desc, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span aria-hidden className="shrink-0 text-[var(--text-subtle)] select-none">
                          ▹
                        </span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {item.links && (
                    <div className="mt-2 flex flex-wrap gap-x-4 sm:mt-3 sm:gap-y-1">
                      {item.links.map((link) => (
                        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="mono-link">
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  )}

                  {item.skills && (
                    <ul
                      aria-label={`${item.company} skills`}
                      className="mt-3 flex flex-wrap gap-1 border-t border-[var(--border-color)] pt-3"
                    >
                      {item.skills.map((skill) => (
                        <li key={skill} className="chip">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>

        <Footer />
      </main>
    </>
  );
};

export default Work;
