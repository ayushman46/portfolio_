import React from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import DockNavbar from "../components/DockNavbar";
import SEO from "../components/SEO";

interface Blog {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

const blogs: Blog[] = [
  {
    slug: "from-ci-data-to-release-risk",
    title: "From CI Data to Release Risk",
    description:
      "How I am combining ETL, time-based validation, and observability in ReleaseLens.",
    date: "Oct 02, 2026",
    readTime: "2 min read",
    tags: ["AIOps", "Data Engineering", "Machine Learning"],
    content: `ReleaseLens is an AIOps and release-intelligence platform built around a practical question: can historical CI and repository signals help teams identify deployment risk before a release?

The project starts with an Airflow-orchestrated ETL pipeline that turns heterogeneous CI and Git data into validated analytics marts on AWS S3 and dbt. From there, time-based validation keeps the XGBoost models honest and MLflow makes experiments reproducible.

The next layer is observability. OpenTelemetry connects deployments with latency and error regressions so a risk score can be paired with likely root cause and blast radius—not just a number.

This is the kind of engineering I enjoy most: turning messy operational data into systems that are useful to people making decisions.

— Ayushman`,
  },
];

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const blog = blogs.find((post) => post.slug === slug);

  if (!blog) {
    return (
      <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
        <main className="page pt-20">
          <h1 className="text-3xl font-semibold">Blog not found</h1>

          <Link
            to="/blogs"
            className="inline-block mt-5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            ← Back to blogs
          </Link>
        </main>

        <DockNavbar />
        <div className="bottom-progressive-blur" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] antialiased">
      <SEO
        title={`${blog.title} | Ayushman Chakraborty`}
        description={blog.description}
        path={`/blogs/${blog.slug}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: blog.title,
          description: blog.description,
          datePublished: "2026-10-02",
          author: { "@id": "https://ayushmanchakraborty.vercel.app/#person" },
          mainEntityOfPage: `https://ayushmanchakraborty.vercel.app/blogs/${blog.slug}`,
        }}
      />
      <main className="page pb-32">
        <motion.article
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="pt-10 sm:pt-16"
        >
          {/* Back */}
          <Link
            to="/blogs"
            className="
              inline-flex
              items-center
              gap-2
              text-xs
              font-mono
              text-[var(--text-muted)]
              hover:text-[var(--text-primary)]
              transition-colors
            "
          >
            ← Back to blogs
          </Link>

          {/* Header */}
          <header className="mt-10">
            {/* Metadata */}
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-[var(--text-subtle)]">
              <span>{blog.date}</span>

              <span>·</span>

              <span>{blog.readTime}</span>
            </div>

            {/* Title */}
            <h1
              className="
                mt-4
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-semibold
                tracking-tight
                text-[var(--text-primary)]
              "
            >
              {blog.title}
            </h1>

            {/* Description */}
            <p
              className="
                mt-5
                max-w-2xl
                text-sm
                sm:text-base
                leading-relaxed
                text-[var(--text-muted)]
              "
            >
              {blog.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="
                    px-2
                    py-1
                    rounded
                    border
                    border-[var(--border-color)]
                    bg-[var(--badge-subtle-bg)]
                    text-[9px]
                    sm:text-[10px]
                    font-mono
                    text-[var(--text-muted)]
                  "
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Divider */}
          <div className="my-10 border-t border-[var(--border-color)]" />

          {/* Article */}
          <div
            className="
              max-w-2xl
              whitespace-pre-line
              text-sm
              sm:text-[15px]
              leading-8
              text-[var(--text-muted)]
            "
          >
            {blog.content}
          </div>

          {/* Bottom Divider */}
          <div className="mt-12 border-t border-[var(--border-color)]" />

          {/* Bottom navigation */}
          <div className="mt-6">
            <Link
              to="/blogs"
              className="
                text-xs
                font-mono
                text-[var(--text-muted)]
                hover:text-[var(--text-primary)]
                transition-colors
              "
            >
              ← All blogs
            </Link>
          </div>
        </motion.article>
      </main>

      <DockNavbar />

      <div className="bottom-progressive-blur" />
    </div>
  );
};

export default BlogPost;
