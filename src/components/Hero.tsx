import React from "react";
import DP from "../assets/ayushman-profile.jpeg";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { FiMail } from "react-icons/fi";

export const Hero: React.FC = () => {
  return (
    <div id="hero-section" className="page-col relative">
      {/* Header */}
      <div className="flex flex-col-reverse items-center gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        {/* Left Side */}
        <div className="flex min-w-0 flex-1 flex-col items-center sm:items-start">
          {/* Hey It's Me */}
          <div className="ibm-plex-mono mb-0.5 flex items-center gap-1.5 text-xs font-normal tracking-tighter text-[var(--text-muted)]">
            <span>Hey It's me</span>
          </div>

          {/* Name + X Handle */}
          <h1 className="ibm-plex-mono flex flex-wrap items-baseline justify-center gap-2 text-center text-xl font-medium tracking-tight text-[var(--text-primary)] sm:justify-start sm:text-left sm:text-3xl">
            <span>AYUSHMAN CHAKRABORTY</span>

            <a
              className="group inline-flex items-center"
              target="_blank"
              rel="noopener noreferrer"
              href="https://x.com/Im_ayushman46"
            >
             
            </a>
          </h1>

          {/* Availability Badge */}
          <div className="mt-2 flex w-fit max-w-full flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-1 sm:justify-start sm:rounded-full sm:gap-2">

            {/* Open For */}
            <span className="ibm-plex-mono text-[10px] text-[var(--text-muted)] sm:text-xs">
              Open to
            </span>

            {/* Internship */}
            <span className="ibm-plex-mono rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-500 sm:px-3 sm:text-xs dark:text-emerald-400">
              Software Engineering Roles
            </span>

            {/* Separator */}
            <span className="text-[9px] text-emerald-500">•</span>

            {/* Full Time */}
            <span className="ibm-plex-mono rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-500 sm:px-3 sm:text-xs dark:text-emerald-400">
              AI & Backend Roles
            </span>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="group relative shrink-0 self-center sm:self-start">
          <div className="relative h-18 w-18 overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-2xl ring-1 ring-black/5 transition-all duration-300 group-hover:border-[var(--text-muted)] sm:h-24 sm:w-24 dark:ring-white/10">
            <img
              src={DP}
              alt="Ayushman Chakraborty"
              className="h-full w-full object-cover object-[center_35%] transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Status Dot */}
          <div className="pointer-events-none absolute -right-1 -bottom-1 flex h-3.5 w-3.5 items-center justify-center sm:h-4 sm:w-4">
            <span className="animate-pulse-glow h-2.5 w-2.5 rounded-full border-2 border-[var(--bg-page)] bg-emerald-500 sm:h-3 sm:w-3" />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="mx-auto max-w-xl text-center sm:mx-0 sm:text-left">
        <p className="text-sm leading-relaxed text-[var(--text-muted)]">
          I'm a{" "}
          <span className="font-medium text-[var(--text-primary)]">
             AI, Backend & Data Engineer
          </span>{" "}
          building production ready and Scalable AI applications and backend
          systems. I work across{" "}
          <span className="font-medium text-[var(--text-primary)]">
          Python, SQL, TypeScript & React
          </span>
          , with a focus on{" "}
          <span className="font-medium text-[var(--text-primary)]">
            GenAI, RAG, distributed systems & developer tools
          </span>
          .
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
        {/* Twitter / X */}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://x.com/Im_ayushman46"
        >
          <button className="btn-pill-3d cursor-pointer">
            <svg
              height="14px"
              width="14px"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.25 1.5H16.88L11.13 8.07L17.89 17H12.6L8.45 11.58L3.71 17H1.08L7.23 9.97L0.77 1.5H6.19L9.94 6.46L14.25 1.5ZM13.33 15.42H14.78L5.39 3H3.83L13.33 15.42Z"
                fill="currentColor"
              />
            </svg>

            <span>Twitter DM</span>
          </button>
        </a>

        <span className="text-[10px] font-medium text-[var(--text-subtle)]">
          OR
        </span>

        {/* Resume */}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/Ayushman-Chakraborty-Resume.pdf"
        >
          <button className="btn-pill-3d cursor-pointer">
            <HiOutlineDocumentText className="text-sm" />
            <span>Resume</span>
          </button>
        </a>

        {/* Email */}
        <a href="mailto:ayushman.mitblr@gmail.com">
          <button className="btn-pill-3d cursor-pointer">
            <FiMail className="text-sm" />
            <span>Email</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default Hero;
