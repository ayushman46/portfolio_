import React from "react";
import { motion, type Variants } from "motion/react";
import { Link } from "react-router";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { BLOGS, type Blog } from "../data/blogs";
import { ProjectData } from "../data/projects";
import "../styles/inner.css";
import { EMAIL } from "../data/contact";


const EASE = [0.16, 1, 0.3, 1] as const;

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: Math.min(i, 8) * 0.06 },
  }),
};

const plural = (n: number) => `${n} post${n === 1 ? "" : "s"}`;

/** Older posts grouped by year, newest year first (BLOGS is newest first). */
const groupByYear = (posts: Blog[]) =>
  posts.reduce<{ year: string; posts: Blog[] }[]>((groups, post) => {
    const year = post.isoDate.slice(0, 4);
    const group = groups.find((g) => g.year === year);
    if (group) group.posts.push(post);
    else groups.push({ year, posts: [post] });
    return groups;
  }, []);

const Tags: React.FC<{ tags: string[]; className?: string }> = ({ tags, className = "" }) => (
  <ul aria-label="Tags" className={`flex flex-wrap gap-1 ${className}`}>
    {tags.map((tag) => (
      <li key={tag} className="chip">
        {tag}
      </li>
    ))}
  </ul>
);

export const Blogs: React.FC = () => {
  const [latest, ...older] = BLOGS;
  // the project this post goes deeper on, shown beside it when it has a screenshot
  const related = latest ? ProjectData.find((p) => p.writeup === latest.slug && p.image) : undefined;
  const years = groupByYear(older);

  return (
    <>
      <SEO
        title="Blog | Ayushman Chakraborty"
        description="Engineering notes from Ayushman Chakraborty on AI systems, data engineering, AIOps, software development and projects in progress."
        path="/blogs"
      />
      <main id="main" className="page">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="rail inner-eyebrow">
            <span className="text-[var(--accent)]">[04]</span>
            <span>/ 04</span>
            <span>· {plural(BLOGS.length)}</span>
          </p>
          <h1 className="inner-title">Blog</h1>
          <p className="inner-dek">Thoughts on AI, engineering, and things I'm building.</p>
          <div className="tick-rule mt-8" aria-hidden />
        </motion.header>

        {/* Feature: the latest post */}
        {latest && (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.06 }}
          >
            <Link to={`/blogs/${latest.slug}`} className="frame-dashed spotlight group block p-4 sm:p-5">
              <span className="xhair xhair--hover" aria-hidden />
              <article
                className={related ? "grid gap-5 sm:grid-cols-[minmax(0,1fr)_15rem] sm:items-center" : undefined}
              >
                <div className="min-w-0">
                  <p className="rail">
                    Latest · <time dateTime={latest.isoDate}>{latest.date}</time> · {latest.readTime}
                  </p>
                  <h2 className="mt-3 text-[length:var(--fs-lead)] leading-tight font-semibold tracking-[-0.015em] text-balance text-[var(--text-primary)] underline-offset-4 group-hover:underline">
                    {latest.title}
                  </h2>
                  <p className="mt-2 max-w-[40rem] text-[15px] leading-[1.65] text-pretty text-[var(--text-muted)]">
                    {latest.description}
                  </p>
                  <Tags tags={latest.tags} className="mt-4" />
                  <span className="jetbrains-mono mt-4 inline-flex items-center gap-1.5 text-xs text-[var(--text-primary)]">
                    Read post
                    <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>

                {related && (
                  <div className="min-w-0">
                    <img
                      src={related.image}
                      alt=""
                      width={1280}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full rounded-[4px] border border-[var(--border-color)] object-cover object-top"
                    />
                    <p className="rail mt-2">Related · {related.heading}</p>
                  </div>
                )}
              </article>
            </Link>
          </motion.div>
        )}

        {/* Older posts, grouped by year */}
        {older.length > 0 && (
          <section aria-labelledby="older-posts" className="mt-10 grid gap-6 sm:grid-cols-[6rem_minmax(0,1fr)]">
            <h2 id="older-posts" className="sr-only">
              Older posts
            </h2>
            {years.map((group) => (
              <React.Fragment key={group.year}>
                <p className="rail self-start pt-6 sm:sticky sm:top-8">{group.year}</p>
                <motion.ul initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                  {group.posts.map((post, i) => (
                    <motion.li key={post.slug} custom={i} variants={rowVariants}>
                      <Link
                        to={`/blogs/${post.slug}`}
                        className="group block border-b border-dashed border-[var(--border-color)] py-6"
                      >
                        <p className="rail">
                          <time dateTime={post.isoDate}>{post.date}</time> · {post.readTime}
                        </p>
                        <h3 className="mt-3 text-[length:var(--fs-item)] leading-snug font-semibold tracking-[-0.01em] text-balance text-[var(--text-primary)] underline-offset-4 group-hover:underline">
                          {post.title}
                        </h3>
                        <p className="mt-2 max-w-[40rem] text-[15px] leading-[1.65] text-pretty text-[var(--text-muted)]">
                          {post.description}
                        </p>
                        <Tags tags={post.tags} className="mt-3" />
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </React.Fragment>
            ))}
          </section>
        )}

        {/* End of the index */}
        <p className="jetbrains-mono mt-8 text-[11px] text-[var(--text-subtle)]">{`// ${plural(BLOGS.length)}`}</p>
        <div className="flex min-h-11 items-center">
          <span className="text-sm text-[var(--text-muted)]">Questions?</span>
          <span className="leader" aria-hidden />
          <a
            href={`mailto:${EMAIL}`}
            className="jetbrains-mono inline-flex min-h-11 items-center text-xs text-[var(--text-primary)] underline decoration-[var(--text-subtle)] underline-offset-4 transition-colors hover:decoration-[var(--text-primary)]"
          >
            Email me
          </a>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Blogs;
