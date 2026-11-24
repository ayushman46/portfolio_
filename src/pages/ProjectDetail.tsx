import React from "react";
import { Link, useParams } from "react-router";
import { motion, type Variants } from "motion/react";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink, FiFileText } from "react-icons/fi";
import AsciiScramble from "../components/AsciiScramble";
import Footer from "../components/Footer";
import SEO, { PERSON_ID, SITE_URL } from "../components/SEO";
import { BLOGS } from "../data/blogs";
import { ProjectData } from "../data/projects";
import "../styles/inner.css";
import { EMAIL } from "../data/contact";

const RESUME = "/Ayushman-Chakraborty-Resume.pdf";

const EASE = [0.16, 1, 0.3, 1] as const;

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: Math.min(i, 8) * 0.06 },
  }),
};

const pad = (n: number) => String(n).padStart(2, "0");

// "By the numbers" columns per figure count, so every row is full (phones always get two columns, or one for three).
const NUMBER_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-1 min-[420px]:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
  6: "grid-cols-2 sm:grid-cols-3",
  8: "grid-cols-2 lg:grid-cols-4",
};

// 40px tap on phones
const contactLinkClass =
  "jetbrains-mono inline-flex min-h-10 items-center text-xs text-[var(--text-primary)] underline decoration-[var(--text-subtle)] underline-offset-4 transition-colors hover:decoration-[var(--text-primary)] sm:min-h-0";

const metaRowClass = "flex min-w-0 flex-col gap-2 border-t border-dashed border-[var(--border-color)] pt-3 lg:pb-4";

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const index = ProjectData.findIndex((item) => item.slug === slug);
  const project = ProjectData[index];

  if (!project) {
    return (
      <>
        <SEO
          title="Project not found | Ayushman Chakraborty"
          description="The requested project could not be found."
          path={`/projects/${slug ?? "unknown"}`}
          noindex
        />
        <main id="main" className="page">
          <p className="rail inner-eyebrow">
            <span className="text-[var(--accent)]">[02]</span>
            <span>/ 04 · 404</span>
          </p>
          <h1 className="inner-title">Project not found</h1>
          <Link
            to="/projects"
            className="jetbrains-mono mt-6 inline-flex min-h-10 items-center text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
          >
            ← ~/projects
          </Link>
          <Footer />
        </main>
      </>
    );
  }

  const total = ProjectData.length;
  const prev = ProjectData[(index - 1 + total) % total];
  const next = ProjectData[(index + 1) % total];
  // only link a write-up that actually exists
  const writeup = project.writeup ? BLOGS.find((post) => post.slug === project.writeup) : undefined;
  const pipeline = project.pipeline?.length ? project.pipeline : undefined;
  const numbers = project.numbers?.length ? project.numbers : undefined;
  const repo = project.github ? (new URL(project.github).pathname.split("/").filter(Boolean)[1] ?? "") : "";
  const sourceLabel = project.liveLink
    ? new URL(project.liveLink).host
    : project.github
      ? `github.com/ayushman46/${repo}`
      : "repo not public yet";
  const openHref = project.liveLink ?? project.github;

  // The pipeline as a numbered flow: the figure when there is no screenshot, else its own § How it works block.
  const pipelineFrame = pipeline && (
    <div className="frame-dashed px-4 py-6 sm:px-8 sm:py-10">
      <span className="xhair" aria-hidden />

      {/* from 1024px: one numbered flow spanning the frame, steps joined by dotted leaders.
          (Narrower frames can't hold the longest pipeline on one line, so they get the stepper.) */}
      <ol
        aria-label={`${project.heading} pipeline`}
        className="jetbrains-mono hidden w-full flex-nowrap items-center justify-between text-[13px] text-[var(--text-primary)] lg:flex"
      >
        {pipeline.map((step, i) => (
          <li key={step} className="flex flex-1 items-center last:flex-none">
            <span className="inline-flex shrink-0 items-baseline gap-2 rounded-[3px] border border-dashed border-[var(--border-dashed)] bg-[var(--bg-page)] px-2.5 py-1.5 whitespace-nowrap">
              <span className="text-[11px] text-[var(--text-subtle)] tabular-nums">{pad(i + 1)}</span>
              {step}
            </span>
            {i < pipeline.length - 1 && <span aria-hidden className="leader mx-2! min-w-4!" />}
          </li>
        ))}
      </ol>

      {/* below 1024px: a vertical stepper on the frame's left edge, nothing wraps mid-chip */}
      <ol
        aria-label={`${project.heading} pipeline`}
        className="jetbrains-mono flex flex-col items-start text-[13px] text-[var(--text-primary)] lg:hidden"
      >
        {pipeline.map((step, i) => (
          <li key={step} className="flex flex-col items-start">
            {i > 0 && (
              <span aria-hidden className="ml-[2.875rem] flex h-5 items-center text-[11px] text-[var(--text-subtle)]">
                ↓
              </span>
            )}
            <span className="flex min-h-10 items-center gap-3">
              <span className="w-6 text-right text-[11px] text-[var(--text-subtle)] tabular-nums">{pad(i + 1)}</span>
              <span className="rounded-[3px] border border-dashed border-[var(--border-dashed)] bg-[var(--bg-page)] px-2.5 py-1.5">
                {step}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );

  const path = `/projects/${project.slug}`;
  const projectUrl = `${SITE_URL}${path}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      "@id": `${projectUrl}#software`,
      name: project.heading,
      description: project.description,
      url: projectUrl,
      creator: { "@id": PERSON_ID },
      ...(project.github ? { codeRepository: project.github } : {}),
      keywords: project.techStack.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
        { "@type": "ListItem", position: 3, name: project.heading, item: projectUrl },
      ],
    },
  ];

  return (
    <>
      <SEO
        title={`${project.heading} | Ayushman Chakraborty`}
        description={project.description}
        path={path}
        structuredData={structuredData}
      />
      <main id="main" className="page">
        {/* key restarts the entrance when prev / next swaps the project in place */}
        <article key={project.slug}>
          <motion.header
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="rail inner-eyebrow">
              <span className="text-[var(--accent)]">[02]</span>
              <span>
                Project {pad(index + 1)} / {pad(total)}
              </span>
              <span>· {project.category}</span>
              <span>· {project.year}</span>
              {project.liveLink && <span className="ml-auto text-[var(--accent)]">● Live</span>}
            </p>

            <h1 className="doto-font mt-3 text-[clamp(2.75rem,1.5rem+5.5vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.02em] break-words text-[var(--text-primary)] max-[359px]:text-[2.375rem]">
              {project.heading}
            </h1>

            <p className="mt-5 max-w-[40rem] text-[length:var(--fs-lede)] leading-[1.6] text-pretty text-[var(--text-body)]">
              {project.description}
            </p>

            {project.metric && (
              <p className="jetbrains-mono mt-4 flex max-w-[40rem] items-baseline gap-2 text-[12.5px] leading-relaxed text-[var(--text-primary)]">
                <span aria-hidden className="text-[var(--accent)]">
                  ▸
                </span>
                <span>
                  <span className="sr-only">Results: </span>
                  <span className="text-[var(--accent)]">{project.metric}</span>
                </span>
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-3d"
                  data-variant="primary"
                >
                  <FiExternalLink aria-hidden /> Live site
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-3d"
                  data-variant={project.liveLink ? undefined : "primary"}
                >
                  <FaGithub aria-hidden /> Source code
                </a>
              )}
              {writeup && (
                <Link to={`/blogs/${writeup.slug}`} className="btn-pill-3d" title={writeup.title}>
                  <FiFileText aria-hidden /> Read the write-up
                </Link>
              )}
            </div>
          </motion.header>

          {/* Figure plate */}
          <motion.figure
            className="mt-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.06 }}
          >
            <div aria-hidden className="mb-2 flex justify-between gap-3">
              <span className="rail">{project.image ? "Fig. 01 — Interface" : "How it works"}</span>
              <span className="rail">{project.image ? "Screenshot" : "Pipeline"}</span>
            </div>

            {project.image ? (
              <div className="frame-dashed p-2 sm:p-2.5">
                <span className="xhair" aria-hidden />
                <img
                  src={project.image}
                  alt={`${project.heading} project interface by Ayushman Chakraborty`}
                  width={1280}
                  height={800}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[16/10] w-full rounded-[4px] border border-[var(--border-color)] object-cover object-top"
                />
              </div>
            ) : (
              pipelineFrame
            )}

            <figcaption className="mt-2 flex items-center justify-between gap-4">
              <span className="rail min-w-0 leading-[1.5] [overflow-wrap:anywhere]">
                {project.liveLink ? "Live" : project.github ? "Source" : "Status"} · <span className="tracking-[0.04em] normal-case">{sourceLabel}</span>
              </span>
              {openHref && (
              <a
                href={openHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.heading} ${project.liveLink ? "live site" : "source"}`}
                className="jetbrains-mono inline-flex min-h-10 shrink-0 items-center text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] sm:min-h-0"
              >
                open ↗
              </a>
              )}
            </figcaption>
          </motion.figure>

          {numbers && (
            <section aria-labelledby="by-the-numbers" className="mt-12">
              <header className="sec-head">
                <span className="sec-index" aria-hidden>
                  §
                </span>
                <h2 id="by-the-numbers" className="sec-title">
                  <span className="sec-title-muted">By the</span> numbers
                </h2>
                <span className="leader" aria-hidden />
                <span className="sec-aside" aria-hidden>
                  {pad(numbers.length)} measured
                </span>
              </header>
              <div className="frame-dashed">
                <span className="xhair" aria-hidden />
                {/* Every cell draws its top and left rule; the -1px shift tucks the outer ones under the frame's
                    own border, so only the inner dashed grid shows whatever the count. */}
                <motion.dl
                  className={`grid overflow-hidden rounded-lg ${NUMBER_COLS[numbers.length] ?? "grid-cols-2 sm:grid-cols-3"}`}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                >
                  {numbers.map((figure, i) => (
                    <motion.div
                      key={figure.label}
                      custom={i}
                      variants={rowVariants}
                      className="-mt-px -ml-px flex min-w-0 flex-col gap-1.5 border-t border-l border-dashed border-[var(--border-color)] px-3.5 py-4 sm:px-5 sm:py-5"
                    >
                      <dt className="jetbrains-mono order-2 text-[11.5px] leading-[1.5] text-pretty text-[var(--text-muted)]">
                        {figure.label}
                      </dt>
                      <dd className="jetbrains-mono order-1 text-[clamp(1.25rem,1.05rem+0.9vw,1.625rem)] leading-none font-medium tracking-[-0.02em] whitespace-nowrap text-[var(--accent)] tabular-nums">
                        {figure.value}
                      </dd>
                    </motion.div>
                  ))}
                </motion.dl>
              </div>
            </section>
          )}

          {project.image && pipelineFrame && (
            <section aria-labelledby="how-it-works" className="mt-12">
              <header className="sec-head">
                <span className="sec-index" aria-hidden>
                  §
                </span>
                <h2 id="how-it-works" className="sec-title">
                  <span className="sec-title-muted">How it</span> works
                </h2>
                <span className="leader" aria-hidden />
                <span className="sec-aside" aria-hidden>
                  {pad(pipeline!.length)} steps
                </span>
              </header>
              {pipelineFrame}
            </section>
          )}

          {/* Body: spec sheet + highlights */}
          <div className="mt-12 grid gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
            <aside aria-label="Project details" className="self-start lg:sticky lg:top-8">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-0">
                <div className={metaRowClass}>
                  <dt className="rail">Category</dt>
                  <dd className="text-[13px] text-[var(--text-primary)]">{project.category}</dd>
                </div>
                <div className={metaRowClass}>
                  <dt className="rail">Year</dt>
                  <dd className="text-[13px] text-[var(--text-primary)] tabular-nums">{project.year}</dd>
                </div>
                <div className={metaRowClass}>
                  <dt className="rail">Status</dt>
                  <dd className="text-[13px]">
                    {project.liveLink ? (
                      <span className="text-[var(--accent)]">● Live</span>
                    ) : project.github ? (
                      <span className="text-[var(--text-primary)]">Source only</span>
                    ) : (
                      <span className="text-[var(--text-primary)]">In progress</span>
                    )}
                  </dd>
                </div>
                <div className={`${metaRowClass} col-span-2 sm:col-span-3 lg:col-span-1`}>
                  <dt className="rail">Stack</dt>
                  <dd>
                    <ul aria-label={`${project.heading} technology stack`} className="flex flex-wrap gap-1">
                      {project.techStack.map((technology) => (
                        <li key={technology} className="chip">
                          {technology}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className={`${metaRowClass} col-span-2 sm:col-span-3 lg:col-span-1`}>
                  <dt className="rail">Links</dt>
                  <dd className="flex flex-wrap gap-x-5 lg:flex-col lg:gap-1">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="mono-link w-fit">
                        Live ↗
                      </a>
                    )}
                    {project.github ? (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="mono-link w-fit">
                        Source ↗
                      </a>
                    ) : (
                      <span className="text-[13px] text-[var(--text-muted)]">Repo not public yet</span>
                    )}
                    {writeup && (
                      <Link to={`/blogs/${writeup.slug}`} className="mono-link w-fit">
                        Write-up →
                      </Link>
                    )}
                  </dd>
                </div>
              </dl>
            </aside>

            <section aria-labelledby="highlights" className="min-w-0">
              <header className="sec-head">
                <span className="sec-index" aria-hidden>
                  §
                </span>
                <h2 id="highlights" className="sec-title">
                  <span className="sec-title-muted">Engineering</span> notes
                </h2>
                <span className="leader" aria-hidden />
                <span className="sec-aside" aria-hidden>
                  {pad(project.highlights.length)} notes
                </span>
              </header>
              <motion.ol
                className="divide-y divide-dashed divide-[var(--border-color)]"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
              >
                {project.highlights.map((item, i) => (
                  <motion.li
                    key={item}
                    custom={i}
                    variants={rowVariants}
                    className="grid grid-cols-[2rem_minmax(0,1fr)] items-baseline py-3"
                  >
                    <span aria-hidden className="jetbrains-mono text-[11.5px] text-[var(--text-subtle)] tabular-nums">
                      {pad(i + 1)}
                    </span>
                    <span className="text-[15px] leading-[1.7] text-pretty text-[var(--text-body)]">{item}</span>
                  </motion.li>
                ))}
              </motion.ol>
            </section>
          </div>

          {/* Contact */}
          <aside
            aria-label="Contact"
            className="frame-dashed mt-12 flex flex-col gap-1 px-4 py-2.5 sm:flex-row sm:items-center sm:py-3"
          >
            <span className="xhair" aria-hidden />
            <p className="pt-1 text-sm text-[var(--text-muted)] sm:pt-0">
              Want to talk about <span className="font-medium text-[var(--text-primary)]">{project.heading}</span>?
            </p>
            <span className="leader hidden sm:block" aria-hidden />
            <div className="flex items-center gap-5 sm:gap-4">
              <a href={`mailto:${EMAIL}`} className={contactLinkClass}>
                <AsciiScramble text="Email me" />
              </a>
              <a href={RESUME} target="_blank" rel="noopener noreferrer" className={contactLinkClass}>
                <AsciiScramble text="Resume" />
              </a>
            </div>
          </aside>

          {/* Previous / next (wraps around) */}
          <nav aria-label="More projects" className="mt-8 grid grid-cols-2 gap-4 border-t border-[var(--border-color)] pt-5">
            <Link to={`/projects/${prev.slug}`} className="group flex min-h-16 min-w-0 flex-col gap-1">
              <span className="rail">← Previous</span>
              <span className="text-[15px] font-semibold break-words text-[var(--text-primary)] underline-offset-4 group-hover:underline">
                {prev.heading}
              </span>
            </Link>
            <Link to={`/projects/${next.slug}`} className="group flex min-h-16 min-w-0 flex-col items-end gap-1 text-right">
              <span className="rail">Next →</span>
              <span className="text-[15px] font-semibold break-words text-[var(--text-primary)] underline-offset-4 group-hover:underline">
                {next.heading}
              </span>
            </Link>
          </nav>
        </article>
        <Footer />
      </main>
    </>
  );
};

export default ProjectDetail;
