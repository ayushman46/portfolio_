import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import DockNavbar from "../components/DockNavbar";
import SEO from "../components/SEO";

export const NotFound: React.FC = () => {
  return (
    <div
      className="
        relative
        min-h-screen
        bg-[var(--bg-page)]
        text-[var(--text-primary)]
        flex
        flex-col
        items-center
        justify-center
        px-4
        antialiased
      "
    >
      <SEO
        title="Page Not Found | Ayushman Chakraborty"
        description="The requested page could not be found on Ayushman Chakraborty's portfolio."
        noindex
      />
      {/* 404 Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="
          flex
          flex-col
          items-center
          text-center
          max-w-md
        "
      >
        {/* Error Badge */}
        <span
          className="
            jetbrains-mono
            text-[10px]
            sm:text-xs
            px-2.5
            py-1
            rounded
            border
            border-[var(--border-color)]
            bg-[var(--badge-subtle-bg)]
            text-[var(--text-muted)]
          "
        >
          404 ERROR
        </span>

        {/* Main Heading */}
        <h1
          className="
            doto-font
            text-4xl
            sm:text-5xl
            font-bold
            tracking-tight
            text-[var(--text-primary)]
            mt-4
          "
        >
          Page Not Found
        </h1>

        {/* Description */}
        <p
          className="
            jetbrains-mono
            text-[11px]
            sm:text-xs
            leading-relaxed
            text-[var(--text-muted)]
            mt-4
            max-w-sm
          "
        >
          The page you're looking for doesn't exist, may have moved, or is
          temporarily unavailable.
        </p>

        {/* Error Path */}
        <div
          className="
            jetbrains-mono
            text-[10px]
            sm:text-xs
            text-[var(--text-subtle)]
            mt-5
          "
        >
          {"// looks like you took a wrong turn"}
        </div>

        {/* Return Home */}
        <Link
          to="/"
          className="
            mt-7
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-lg
            border
            border-[var(--border-color)]
            bg-[var(--badge-subtle-bg)]
            text-xs
            font-medium
            text-[var(--text-primary)]
            transition-all
            duration-200
            hover:-translate-y-[1px]
            hover:border-[var(--text-subtle)]
          "
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 9H3M3 9L7.5 4.5M3 9L7.5 13.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          Return Home
        </Link>
      </motion.div>

      {/* Floating Bottom Navigation */}
      <DockNavbar />

      {/* Bottom Progressive Blur */}
      <div className="bottom-progressive-blur" />
    </div>
  );
};

export default NotFound;
