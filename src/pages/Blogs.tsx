import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import DockNavbar from "../components/DockNavbar";
import Footer from "../components/Footer";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    slug: "from-ci-data-to-release-risk",
    title: "From CI Data to Release Risk",
    description:
      "How I am combining ETL, time-based validation, and observability in ReleaseLens.",
    date: "Oct 02, 2026",
    readTime: "2 min read",
    tags: ["AIOps", "Data Engineering", "Machine Learning"],
  },
];

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export const Blogs: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] antialiased">
      <main className="page">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          {/* Page Header */}
          <section className="pt-8 sm:pt-12">
            <h1 className="text-3xl sm:text-4xl font-mono tracking-tight text-[var(--text-primary)]">
              Blogs
            </h1>

            <p className="mt-3 text-sm sm:text-base font-mono text-[var(--text-muted)]">
              Thoughts on AI, engineering, and things I'm building.
            </p>
          </section>

          {/* Divider */}
          <div className="my-8 border-t border-[var(--border-color)]" />

          {/* Blog List */}
          <section className="flex flex-col">
            {blogPosts.map((blog, index) => (
              <motion.div
                key={blog.slug}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.4,
                  ease: "easeOut",
                }}
              >
                <Link
                  to={`/blogs/${blog.slug}`}
                  className="
                    group
                    block
                    py-6
                    border-b
                    border-[var(--border-color)]
                    transition-all
                    duration-200
                  "
                >
                  {/* Metadata */}
                  <div className="flex items-center gap-2 mb-3 text-[10px] sm:text-xs font-mono text-[var(--text-subtle)]">
                    <span>{blog.date}</span>

                    <span>·</span>

                    <span>{blog.readTime}</span>
                  </div>

                  {/* Title */}
                  <div className="flex items-center justify-between gap-4">
                    <h2
                      className="
                        text-lg
                        sm:text-xl
                        font-semibold
                        text-[var(--text-primary)]
                        group-hover:opacity-70
                        transition-opacity
                      "
                    >
                      {blog.title}
                    </h2>

                    <span
                      className="
                        font-mono
                        text-sm
                        text-[var(--text-muted)]
                        transition-transform
                        duration-200
                        group-hover:translate-x-1
                      "
                    >
                      →
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className="
                      mt-2
                      max-w-2xl
                      text-xs
                      sm:text-sm
                      font-mono
                      leading-relaxed
                      text-[var(--text-muted)]
                    "
                  >
                    {blog.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
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
                </Link>
              </motion.div>
            ))}
          </section>
        </motion.div>

        <Footer />
      </main>

      {/* Floating Bottom Dock */}
      <DockNavbar />

      {/* Bottom Progressive Blur */}
      <div className="bottom-progressive-blur" />
    </div>
  );
};

export default Blogs;
