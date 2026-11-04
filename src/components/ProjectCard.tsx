import React, { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { ProjectData, type Project } from "../data/projects";
import "../styles/home-b.css";

interface ProjectCardProps {
  project: Project;
  /** How many tech badges to show (all by default); the rest collapse into a "+N" tag. */
  maxTech?: number;
  /** Opens the screenshot in a lightbox instead of the project page. */
  onPreview?: (image: string) => void;
  /** Card is near the fold: fetch its screenshot eagerly at high priority. */
  priority?: boolean;
  /** "lead" spreads the card into a two-column feature row from 1024px; below that it is a normal card. */
  variant?: "default" | "lead";
  /**
   * Heading level for the project title, so cards are reachable by heading navigation.
   * h2 by default (/projects lists cards straight under its h1); pass "h3" under a section h2, as on Home.
   */
  headingAs?: "h2" | "h3";
}

/** The lead card has room for this many tech badges at 1024px and up. */
const LEAD_TECH = 6;

/** Categories longer than this need the rail's full width, so their year yields in narrow cards. */
const LONG_CATEGORY = 12;

// Catalogue number from the data order, so it stays the same when /projects is filtered.
const CATALOGUE = new Map(ProjectData.map((p, i) => [p.slug, String(i + 1).padStart(2, "0")]));

const MoreChip: React.FC<{ rest: string[]; className?: string }> = ({ rest, className = "" }) => (
  <span className={`chip ${className}`} title={rest.join(", ")}>
    <span aria-hidden>+{rest.length}</span>
    <span className="sr-only">{rest.length} more technologies</span>
  </span>
);

const leadLink =
  "jetbrains-mono inline-flex min-h-10 items-center gap-1 text-[12px] text-[var(--text-primary)] underline decoration-[var(--border-dashed)] underline-offset-4 transition-colors duration-200 hover:decoration-[var(--text-primary)]";

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  maxTech,
  onPreview,
  priority = false,
  variant = "default",
  headingAs: Heading = "h2",
}) => {
  const lead = variant === "lead";
  const href = `/projects/${project.slug}`;
  const nn = CATALOGUE.get(project.slug);

  // Default cards show `maxTech` badges and a "+N". The lead shows the same below 1024px and up to six from there.
  const stack = project.techStack;
  const base = Math.min(maxTech ?? stack.length, stack.length);
  const cap = lead ? Math.max(base, Math.min(LEAD_TECH, stack.length)) : base;
  const shown = stack.slice(0, cap);

  // Screenshots fade in over the project name once decoded, so a slow network never shows an empty box.
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  useLayoutEffect(() => {
    // cached images can finish before React attaches onLoad
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) setLoaded(true);
  }, []);

  const nameplate = (
    <span className="doto-font text-3xl font-bold tracking-tight text-[var(--text-subtle)] transition-colors duration-300 group-hover:text-[var(--text-primary)]">
      {project.heading}
    </span>
  );

  const thumb = project.image ? (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${loaded ? "opacity-0" : ""}`}
      >
        {nameplate}
      </span>
      <img
        ref={imgRef}
        src={project.image}
        alt={`${project.heading} project interface by Ayushman Chakraborty`}
        width={1280}
        height={800}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        data-loaded={loaded || undefined}
        className="pc-shot relative h-full w-full object-cover object-top"
      />
    </>
  ) : project.pipeline?.length ? (
    // No screenshot: draw the system as an ASCII flow instead of a bare name
    <span className="jetbrains-mono flex h-full w-full flex-wrap content-center items-center justify-center gap-1.5 px-4 text-[11px] text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--text-primary)]">
      {project.pipeline.map((step, i) => (
        <React.Fragment key={step}>
          {i > 0 && (
            <span aria-hidden className="text-[var(--text-subtle)]">
              →
            </span>
          )}
          <span className="rounded-[3px] border border-dashed border-[var(--border-dashed)] bg-[var(--card-bg)] px-1.5 py-0.5 whitespace-nowrap transition-colors duration-300 group-hover:border-[var(--text-subtle)]">
            {step}
          </span>
        </React.Fragment>
      ))}
    </span>
  ) : (
    <span className="flex h-full w-full items-center justify-center">{nameplate}</span>
  );

  return (
    <div
      className={`spotlight group relative flex h-full flex-col rounded-lg border border-dashed border-[var(--border-dashed)] bg-[var(--card-bg)] p-2.5 transition-colors duration-200 hover:border-[var(--text-muted)] sm:p-3 ${
        lead ? "lg:grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-6" : ""
      }`}
    >
      {/* Corner crosshairs, drawn on hover and keyboard focus */}
      <span className="xhair xhair--hover" aria-hidden />

      {/* Screenshot: whole 1280×800 frame at 16:10, never zoomed */}
      <div
        className={`pc-thumb relative z-10 aspect-[16/10] overflow-hidden rounded-[4px] border border-[var(--border-color)] ${
          lead ? "lg:self-start" : ""
        }`}
      >
        {onPreview && project.image ? (
          <button
            type="button"
            onClick={() => onPreview(project.image!)}
            aria-label={`Preview ${project.heading} screenshot`}
            className="pc-thumb-hit relative block h-full w-full cursor-zoom-in"
          >
            {thumb}
          </button>
        ) : (
          <Link to={href} tabIndex={-1} aria-hidden className="relative block h-full w-full">
            {thumb}
          </Link>
        )}
        {/* destination label on hover */}
        <span
          aria-hidden
          className="jetbrains-mono pointer-events-none absolute bottom-2.5 left-2.5 z-[3] translate-y-1 rounded-[3px] border border-white/15 bg-black/75 px-2 py-1 text-[10px] tracking-wide text-white opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          {onPreview && project.image ? "[ preview ]" : "[ view project ]"}
        </span>
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.heading} live`}
            // hover reveals it on desktop; touch screens can't hover, so it stays visible there.
            // The ::before pad turns the 28px chip into a 40px tap area on phones.
            className="absolute top-2.5 right-2.5 z-[3] rounded-md bg-black/75 p-2 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 before:absolute before:-inset-1.5 hover:bg-black focus-visible:opacity-100 sm:p-1.5 sm:before:hidden [@media(hover:none)]:opacity-100"
          >
            <FiExternalLink aria-hidden className="text-xs" />
          </a>
        )}
      </div>

      {/* Project Meta */}
      <div className={`flex flex-1 flex-col ${lead ? "lg:py-1" : ""}`}>
        {/* Rail: catalogue number, category · year, live flag, source */}
        <div className={`rail @container mt-3 flex items-center gap-2 ${lead ? "lg:mt-0" : ""}`}>
          {nn && <span className="tabular-nums text-[var(--text-muted)]">{nn}</span>}
          <span className="min-w-0 truncate">
            {project.category}
            {/* a long category ("Computer Vision") drops its year in a narrow card, so the rail never truncates */}
            <span className={project.category.length > LONG_CATEGORY ? "@max-[290px]:hidden" : undefined}>
              {` · ${project.year}`}
            </span>
          </span>
          {project.liveLink && (
            <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-[var(--accent)]">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--accent-strong)]" />
              Live
            </span>
          )}
          {project.github ? (
          <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              // 40px touch target on phones without growing the row; sits above the name link's tap pad
              className={`relative -my-3 -mr-2 inline-flex h-10 w-10 shrink-0 items-center justify-center text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text-primary)] sm:-my-1 sm:mr-0 sm:h-6 sm:w-6 ${
                project.liveLink ? "" : "ml-auto"
              }`}
              aria-label={`${project.heading} source on GitHub`}
              title="View source on GitHub"
            >
              <FaGithub aria-hidden className="text-[13px]" />
            </a>
          ) : (
            !project.liveLink && <span className="ml-auto shrink-0 text-[var(--text-muted)]">In progress</span>
          )}
        </div>

        {/* The heading carries the margins; the link inside keeps the type and the padding, so its
            40px tall tap area on phones overlaps the rail and metric without moving the text.
            The link is a block (not inline) so the heading's own line box adds no height. */}
        <Heading className={`-mb-2.5 mt-[-2px] self-start sm:mt-2 sm:mb-0 ${lead ? "lg:mt-3" : ""}`}>
          <Link
            to={href}
            className={`block py-2.5 text-[15px] font-semibold tracking-[-0.01em] text-[var(--text-primary)] underline-offset-4 hover:underline sm:py-0 ${
              lead
                ? "lg:font-[family-name:var(--font-doto)] lg:text-[2.25rem] lg:leading-none lg:font-bold lg:tracking-[-0.02em]"
                : ""
            }`}
          >
            {project.heading}
          </Link>
        </Heading>

        {/* The proof line is never clamped, and only breaks after a " · " separator */}
        {project.metric && (
          <p
            className={`jetbrains-mono mt-1.5 flex gap-1.5 text-[11.5px] leading-snug text-[var(--text-primary)]/85 ${
              lead ? "lg:text-[12.5px]" : ""
            }`}
          >
            <span aria-hidden className="text-[var(--accent)]">
              ▸
            </span>
            <span className="min-w-0">
              {project.metric.split(" · ").map((part, i) => (
                <React.Fragment key={i}>
                  {i > 0 && " · "}
                  <span className="inline-block max-w-full">{part}</span>
                </React.Fragment>
              ))}
            </span>
          </p>
        )}

        <p
          className={`mt-1.5 line-clamp-3 text-[13.5px] leading-[1.6] text-[var(--text-muted)] ${
            lead ? "lg:line-clamp-none lg:text-[14.5px] lg:leading-[1.65]" : ""
          }`}
        >
          {project.description}
        </p>

        {/* The ways in, spelled out on every card; 40px tall tap areas */}
        <div className="relative z-10 mt-1 flex flex-wrap gap-x-4">
          <Link to={href} className={leadLink}>
            Case study<span className="sr-only">: {project.heading}</span>
            <span aria-hidden>→</span>
          </Link>
          {project.writeup && (
            <Link to={`/blogs/${project.writeup}`} className={leadLink}>
              Write-up<span className="sr-only">: {project.heading}</span>
              <span aria-hidden>→</span>
            </Link>
          )}
          {lead && project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={`${leadLink} hidden lg:inline-flex`}>
              Live<span className="sr-only">: {project.heading}</span>
              <span aria-hidden>↗</span>
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={leadLink}>
              Source<span className="sr-only">: {project.heading}</span>
              <span aria-hidden>↗</span>
            </a>
          )}
        </div>

        {/* minimum gap above the badges; mt-auto below pins them to the card's foot */}
        <div aria-hidden className="h-3 shrink-0" />

        {/* Tech Stack Badges */}
        <div className="mt-auto flex flex-wrap gap-1 border-t border-[var(--border-color)] pt-2.5">
          {shown.map((t, i) => (
            <span key={t} className={`chip ${i >= base ? "hidden lg:inline-flex" : ""}`}>
              {t}
            </span>
          ))}
          {base < stack.length && <MoreChip rest={stack.slice(base)} className={lead ? "lg:hidden" : ""} />}
          {lead && cap < stack.length && <MoreChip rest={stack.slice(cap)} className="hidden lg:inline-flex" />}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
