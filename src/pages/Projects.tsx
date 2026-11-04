import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useIsPresent, type Variants } from "motion/react";
import { FaGithub } from "react-icons/fa";
import { FiSearch, FiX } from "react-icons/fi";
import AsciiScramble from "../components/AsciiScramble";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import SEO, { PERSON_ID, SITE_URL } from "../components/SEO";
import { useMediaQuery } from "../components/hero/useMediaQuery";
import { ARCHIVE, CATEGORIES, ProjectData, type Category } from "../data/projects";
import "../styles/inner.css";

type Filter = "All" | Category;

const EASE = [0.16, 1, 0.3, 1] as const;

const categories: Filter[] = ["All", ...CATEGORIES];

const counts = Object.fromEntries(
  categories.map((cat) => [cat, cat === "All" ? ProjectData.length : ProjectData.filter((p) => p.category === cat).length]),
) as Record<Filter, number>;

// "AI/ML, Data, Full-Stack and Computer Vision"
const categoryList = `${CATEGORIES.slice(0, -1).join(", ")} and ${CATEGORIES[CATEGORIES.length - 1]}`;

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: Math.min(i, 8) * 0.06 },
  }),
};

/** Full-screen screenshot viewer: a real modal dialog with one focus stop (Close). */
const Lightbox: React.FC<{ src: string; onClose: () => void }> = ({ src, onClose }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const heading = ProjectData.find((p) => p.image === src)?.heading ?? "Project";

  // stop trapping keys while the exit animation plays; focus has already gone back
  const isPresent = useIsPresent();
  const presentRef = useRef(true);
  useEffect(() => {
    presentRef.current = isPresent;
  }, [isPresent]);

  useEffect(() => {
    closeRef.current?.focus();

    // lock page scroll behind the dialog (scrollbar-gutter keeps the layout still)
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (!presentRef.current) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab") {
        // Close is the only control, so Tab and Shift+Tab stay on it
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      root.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${heading} screenshot`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: EASE }}
      onClick={onClose}
      className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        className="absolute top-4 right-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-white/20 bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
      >
        <FiX aria-hidden className="text-base" />
      </button>

      <motion.figure
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.3, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center"
      >
        <img
          src={src}
          alt={`${heading} project interface by Ayushman Chakraborty`}
          width={1280}
          height={800}
          className="h-auto max-h-[85svh] w-auto max-w-[min(92vw,1280px)] rounded-[8px] object-contain"
        />
        <figcaption className="rail mt-3 text-center">
          <span className="text-white/70">
            {heading}
            <span className="hidden [@media(pointer:fine)]:inline"> · Esc to close</span>
          </span>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Filter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const returnFocus = useRef<HTMLElement | null>(null);
  // the lightbox only earns its place with a hover pointer and room to grow; phones tap through to the project page
  const canPreview = useMediaQuery("(min-width: 640px) and (hover: hover)");

  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return ProjectData.filter((p) => {
      if (activeCategory !== "All" && p.category !== activeCategory) return false;
      if (!query) return true;
      return [p.heading, p.description, p.category, ...p.techStack].some((v) => v.toLowerCase().includes(query));
    });
  }, [activeCategory, searchQuery]);

  const openPreview = useCallback((src: string) => {
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setPreviewImage(src);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewImage(null);
    returnFocus.current?.focus({ preventScroll: true });
    returnFocus.current = null;
  }, []);

  const resetFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
  };

  const query = searchQuery.trim();

  return (
    <>
      <SEO
        title="Projects | Ayushman Chakraborty"
        description="Explore Ayushman Chakraborty's AI, data engineering, computer vision and full-stack projects, including ReleaseLens, CodeGlyph, Prepvia and StrideCircle."
        path="/projects"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/projects#page`,
          name: "Projects | Ayushman Chakraborty",
          url: `${SITE_URL}/projects`,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": PERSON_ID },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: ProjectData.map((project, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: project.heading,
              url: `${SITE_URL}/projects/${project.slug}`,
            })),
          },
        }}
      />
      <main id="main" className="page">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="rail inner-eyebrow">
            <span className="text-[var(--accent)]">[02]</span>
            <span>/ 04</span>
            <span>· {ProjectData.length} projects</span>
            <span>· {ARCHIVE.length} in archive</span>
          </p>
          <h1 className="inner-title">Projects</h1>
          <p className="inner-dek">
            {ProjectData.length} projects across {categoryList}.
          </p>
          <div className="tick-rule mt-8" aria-hidden />
        </motion.header>

        {/* Filters wrap (never scroll sideways); search sits right from 768px */}
        <div className="mt-8 mb-6 flex flex-col gap-3 md:flex-row md:items-center">
          <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={isActive}
                  className={`jetbrains-mono relative inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-md border border-[var(--border-color)] bg-[var(--card-bg)] px-3 text-xs whitespace-nowrap transition-colors duration-200 ${
                    isActive ? "font-medium text-[var(--bg-page)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="filter-pill"
                      aria-hidden
                      className="absolute -inset-px rounded-md bg-[var(--text-primary)]"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative">{cat}</span>
                  <span
                    className={`relative text-[11px] tabular-nums ${
                      isActive ? "text-[var(--bg-page)] opacity-75" : "text-[var(--text-subtle)]"
                    }`}
                  >
                    {counts[cat]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 16px text on phones so iOS doesn't zoom on focus */}
          <div className="relative w-full md:ml-auto md:w-56 md:shrink-0">
            <FiSearch
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-[var(--text-subtle)] sm:left-2.5 sm:text-xs"
            />
            <input
              type="text"
              inputMode="search"
              enterKeyHint="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects…"
              aria-label="Search projects"
              className="h-11 w-full rounded-md border border-[var(--border-color)] bg-[var(--input-bg)] pr-11 pl-9 text-base text-[var(--text-primary)] placeholder-[var(--text-subtle)] transition-colors duration-200 focus:border-[var(--text-muted)] sm:h-10 sm:pr-10 sm:pl-8 sm:text-[13px]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-0.5 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] sm:right-0 sm:h-10 sm:w-10 sm:text-xs"
              >
                <FiX aria-hidden />
              </button>
            )}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {filteredProjects.length === 1 ? "1 project" : `${filteredProjects.length} projects`}
        </p>

        {filteredProjects.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                className="h-full min-w-0"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: EASE, delay: (i % 2) * 0.06 }}
              >
                {/* the first row loads eagerly so phones never paint empty frames above the fold */}
                <ProjectCard project={project} maxTech={5} priority={i < 2} onPreview={canPreview ? openPreview : undefined} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="frame-dashed flex flex-col items-center justify-center px-6 py-12 text-center">
            <span className="xhair" aria-hidden />
            <p className="rail">0 / {ProjectData.length}</p>
            <p className="mt-3 text-[15px] text-[var(--text-muted)]">
              No projects match
              {query && (
                <>
                  {" "}
                  “<span className="text-[var(--text-primary)]">{query}</span>”
                </>
              )}
              {activeCategory !== "All" && <> in {activeCategory}</>}.
            </p>
            <button type="button" onClick={resetFilters} className="btn-pill-3d mt-5 cursor-pointer">
              Reset filters
            </button>
          </div>
        )}

        {/* Archive */}
        <section aria-labelledby="more-projects" className="mt-16">
          <header className="sec-head">
            <h2 id="more-projects" className="sec-title">
              <span className="sec-title-muted">More on</span> GitHub
            </h2>
            <span className="leader" aria-hidden />
            <a href="https://github.com/ayushman46" target="_blank" rel="noopener noreferrer" className="sec-action">
              <AsciiScramble text="@ayushman46 ↗" />
            </a>
          </header>

          <div
            aria-hidden
            className="-mx-2 hidden grid-cols-[3rem_12rem_minmax(0,1fr)_1rem] gap-x-3 border-b border-[var(--border-color)] px-2 pb-2 sm:grid"
          >
            <span className="rail">Year</span>
            <span className="rail">Name</span>
            <span className="rail">Description</span>
            <span />
          </div>

          <motion.ul initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            {ARCHIVE.map((item, i) => (
              <motion.li key={item.name} custom={i} variants={rowVariants}>
                {/* phones: year + name on line 1, description under the name */}
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group -mx-2 grid min-h-11 grid-cols-[2.75rem_minmax(0,1fr)_1rem] items-baseline gap-x-3 gap-y-0.5 border-b border-dashed border-[var(--border-color)] px-2 py-2.5 transition-colors duration-200 hover:bg-[var(--card-hover)] sm:grid-cols-[3rem_12rem_minmax(0,1fr)_1rem]"
                >
                  <span className="jetbrains-mono text-[11.5px] text-[var(--text-muted)] tabular-nums">{item.year}</span>
                  <span className="text-sm font-medium text-[var(--text-primary)] underline-offset-4 group-hover:underline">
                    {item.name}
                  </span>
                  <span className="col-start-2 row-start-2 text-[13px] leading-relaxed text-[var(--text-muted)] sm:col-start-3 sm:row-start-1">
                    {item.description}
                  </span>
                  <FaGithub
                    aria-hidden
                    className="col-start-3 row-start-1 self-center text-[13px] text-[var(--text-subtle)] transition-colors duration-200 group-hover:text-[var(--text-primary)] sm:col-start-4"
                  />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </section>

        <AnimatePresence>
          {previewImage && <Lightbox key="lightbox" src={previewImage} onClose={closePreview} />}
        </AnimatePresence>

        <Footer />
      </main>
    </>
  );
};

export default Projects;
