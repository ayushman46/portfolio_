import React, { useRef } from "react";
import { Link, useParams } from "react-router";
import { motion, useScroll } from "motion/react";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { BLOGS, type Blog } from "../data/blogs";
import { ProjectData } from "../data/projects";
import "../styles/inner.css";
import { EMAIL } from "../data/contact";


const EASE = [0.16, 1, 0.3, 1] as const;

const backLinkClass =
  "jetbrains-mono inline-flex min-h-10 items-center text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]";

// label ······ action, a 44px row
const rowLinkClass = "group flex min-h-11 items-center text-sm text-[var(--text-muted)]";
const rowActionClass =
  "jetbrains-mono text-xs text-[var(--text-primary)] underline-offset-4 group-hover:underline whitespace-nowrap";

/*
 * A tiny block renderer for posts written as string[] in src/data/blogs.ts.
 * Each array entry is one block:
 *   "## Heading" / "### Sub-heading"
 *   "```lang\n…\n```"                 code block (scrolls inside its own frame)
 *   "- one\n- two"                     bulleted list
 *   "1. one\n2. two"                   numbered list
 *   "> quoted text"                    blockquote
 *   anything else                      paragraph
 * Inline, inside text: `code`, **bold** and [label](https://… | mailto:… | /internal).
 */

// only these targets become links; anything else stays literal text
const INLINE = /`([^`\n]+)`|\*\*([^*\n]+)\*\*|\[([^\]\n]+)\]\(((?:https?:\/\/|mailto:|\/)[^\s)]+)\)/g;

const renderInline = (text: string): React.ReactNode[] => {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE)) {
    const at = match.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    const [whole, code, bold, label, href] = match;
    const key = `${at}-${whole.length}`;
    if (code !== undefined) {
      out.push(<code key={key}>{code}</code>);
    } else if (bold !== undefined) {
      out.push(<strong key={key}>{bold}</strong>);
    } else if (href.startsWith("/")) {
      out.push(
        <Link key={key} to={href}>
          {label}
        </Link>,
      );
    } else {
      out.push(
        <a key={key} href={href} {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
          {label}
        </a>,
      );
    }
    last = at + whole.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
};

const ORDERED = /^\d+\.\s+/;

const renderBlock = (block: string, i: number) => {
  if (block.startsWith("```")) {
    const lines = block.split("\n");
    const lang = lines[0].slice(3).trim();
    const body = lines.slice(1);
    if (body.length && body[body.length - 1].trim() === "```") body.pop();
    return (
      // focusable so a long line can be scrolled from the keyboard
      <pre key={i} tabIndex={0} data-lang={lang || undefined}>
        <code>{body.join("\n")}</code>
      </pre>
    );
  }
  if (block.startsWith("### ")) return <h3 key={i}>{renderInline(block.slice(4))}</h3>;
  if (block.startsWith("## ")) return <h2 key={i}>{renderInline(block.slice(3))}</h2>;

  const lines = block.split("\n").filter((line) => line.trim() !== "");
  if (lines.length && lines.every((line) => line.startsWith("- "))) {
    return (
      <ul key={i}>
        {lines.map((line, j) => (
          <li key={j}>{renderInline(line.slice(2))}</li>
        ))}
      </ul>
    );
  }
  if (lines.length && lines.every((line) => ORDERED.test(line))) {
    return (
      <ol key={i}>
        {lines.map((line, j) => (
          <li key={j}>{renderInline(line.replace(ORDERED, ""))}</li>
        ))}
      </ol>
    );
  }
  if (lines.length && lines.every((line) => line.startsWith(">"))) {
    return <blockquote key={i}>{renderInline(lines.map((line) => line.replace(/^>\s?/, "")).join(" "))}</blockquote>;
  }
  return <p key={i}>{renderInline(block)}</p>;
};

const PostArticle: React.FC<{ blog: Blog }> = ({ blog }) => {
  const articleRef = useRef<HTMLElement>(null);
  // user-driven, so it stays on under reduced motion; no spring
  const { scrollYProgress } = useScroll({ target: articleRef, offset: ["start start", "end end"] });

  const index = BLOGS.findIndex((post) => post.slug === blog.slug);
  const total = BLOGS.length;
  const prev = BLOGS[(index - 1 + total) % total];
  const next = BLOGS[(index + 1) % total];
  // the project this post goes deeper on, if any
  const related = ProjectData.find((project) => project.writeup === blog.slug);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[1000] h-[2px] origin-left bg-[var(--accent-strong)]"
        style={{ scaleX: scrollYProgress }}
      />

      <main id="main" className="page">
        <article ref={articleRef}>
          <motion.header
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <p className="rail inner-eyebrow">
                <span className="text-[var(--accent)]">[04]</span>
                <time dateTime={blog.isoDate}>{blog.date}</time>
                <span>· {blog.readTime}</span>
              </p>
              <ul aria-label="Tags" className="flex flex-wrap gap-1 sm:justify-end">
                {blog.tags.map((tag) => (
                  <li key={tag} className="chip">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <h1 className="mt-4 max-w-[44rem] text-[clamp(2rem,1.3rem+3vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-balance text-[var(--text-primary)]">
              {blog.title}
            </h1>
            <p className="mt-5 max-w-[38rem] text-[length:var(--fs-lede)] leading-[1.6] text-pretty text-[var(--text-muted)]">
              {blog.description}
            </p>
            <div className="tick-rule mt-8" aria-hidden />
          </motion.header>

          <motion.div
            className="prose-post mt-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.06 }}
          >
            {blog.content.map(renderBlock)}
            <p className="prose-signoff">— Ayushman</p>
          </motion.div>
        </article>

        {/* Where to go from here */}
        <div className="mt-12 flex max-w-[38rem] flex-col border-t border-[var(--border-color)] pt-2">
          {related && (
            <Link to={`/projects/${related.slug}`} className={rowLinkClass}>
              <span>Related project</span>
              <span className="leader" aria-hidden />
              <span className={rowActionClass}>{related.heading} →</span>
            </Link>
          )}
          <a href={`mailto:${EMAIL}`} className={rowLinkClass}>
            <span>Questions?</span>
            <span className="leader" aria-hidden />
            <span className={rowActionClass}>Email me</span>
          </a>
        </div>

        {total > 1 && (
          <nav aria-label="More posts" className="mt-8 grid max-w-[38rem] grid-cols-2 gap-4 border-t border-[var(--border-color)] pt-5">
            <Link to={`/blogs/${prev.slug}`} className="group flex min-h-16 min-w-0 flex-col gap-1">
              <span className="rail">← Previous</span>
              <span className="text-[15px] font-semibold text-balance text-[var(--text-primary)] underline-offset-4 group-hover:underline">
                {prev.title}
              </span>
            </Link>
            <Link to={`/blogs/${next.slug}`} className="group flex min-h-16 min-w-0 flex-col items-end gap-1 text-right">
              <span className="rail">Next →</span>
              <span className="text-[15px] font-semibold text-balance text-[var(--text-primary)] underline-offset-4 group-hover:underline">
                {next.title}
              </span>
            </Link>
          </nav>
        )}

        <Link to="/blogs" className={`mt-6 ${backLinkClass}`}>
          ← ~/blogs
        </Link>

        <Footer />
      </main>
    </>
  );
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = BLOGS.find((post) => post.slug === slug);

  if (!blog) {
    return (
      <>
        <SEO
          title="Post not found | Ayushman Chakraborty"
          description="The requested post could not be found."
          path={`/blogs/${slug ?? "unknown"}`}
          noindex
        />
        <main id="main" className="page">
          <p className="rail inner-eyebrow">
            <span className="text-[var(--accent)]">[04]</span>
            <span>/ 04 · 404</span>
          </p>
          <h1 className="inner-title">Post not found</h1>
          <Link to="/blogs" className={`mt-6 ${backLinkClass}`}>
            ← ~/blogs
          </Link>
          <Footer />
        </main>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${blog.title} | Ayushman Chakraborty`}
        description={blog.description}
        path={`/blogs/${blog.slug}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: blog.title,
          description: blog.description,
          datePublished: blog.isoDate,
          author: { "@id": "https://ayushmanchakraborty.vercel.app/#person" },
          mainEntityOfPage: `https://ayushmanchakraborty.vercel.app/blogs/${blog.slug}`,
        }}
      />
      {/* key: a fresh article (and progress bar) per post */}
      <PostArticle key={blog.slug} blog={blog} />
    </>
  );
};

export default BlogPost;
