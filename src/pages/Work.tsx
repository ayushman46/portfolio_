import React from "react";
import DockNavbar from "../components/DockNavbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

interface WorkExperience {
  company: string;
  type: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  skills?: string[];
  isCurrent?: boolean;
}

const workData: WorkExperience[] = [
  {
    company: "TraininGenie",
    type: "Startup",
    role: "Software Development Intern (Full Stack)",
    period: "May 2026 - Jul 2026",
    location: "Remote",
    description: [
      "Took sole ownership of the production website from architecture to launch using Next.js, Turso, and Supabase authentication.",
      "Designed the database schema and API routes powering core product flows, then optimized queries for low latency.",
      "Built a reusable shadcn/ui component library and responsive design system, and shipped zero-downtime updates from founder feedback.",
    ],
    skills: ["Next.js", "Turso", "Supabase", "TypeScript", "shadcn/ui"],
    isCurrent: true,
  },
  {
    company: "Wipro Limited",
    type: "Internship",
    role: "Software Engineering and Generative AI Intern",
    period: "Jun 2025 - Jul 2025",
    location: "Bengaluru, India",
    description: [
      "Built a Python and SQL pipeline processing 30+ heterogeneous sources including audio, transcripts, code, and content.",
      "Integrated Azure OpenAI GPT-4o and Whisper with structured-output validation for reliable, analysis-ready records.",
      "Added exception handling and automated tests, cutting processing time by 40% with consistent outputs.",
    ],
    skills: ["Python", "SQL", "Azure OpenAI", "Whisper", "Automated Testing"],
    isCurrent: false,
  },
  {
    company: "Open Source Contributions",
    type: "Merged PRs",
    role: "Open Source Developer",
    period: "Jul 2026",
    location: "GitHub",
    description: [
      "Fixed SAML single sign-on redirect failures in Better Auth with trusted-callback resolution and regression coverage.",
      "Shipped a Hashnode GraphQL integration for Corsair across 10 endpoint groups with schema validation, pagination, and Jest coverage.",
    ],
    skills: ["TypeScript", "SAML", "GraphQL", "Jest", "GitHub"],
    isCurrent: false,
  },
  {
    company: "Manipal Institute of Technology",
    type: "Education",
    role: "B.Tech Computer Science and Engineering (Data Science)",
    period: "Jul 2023 - May 2027",
    location: "Bengaluru, India · CGPA 7.5/10",
    description: [
      "Final-year student building production AI, backend, and data engineering systems alongside coursework in data structures, databases, operating systems, and networks.",
      "Major GPA: 8.0/10. Solved 150+ DSA problems on LeetCode and placed in the top 5 of 50 teams at Hackverse.",
    ],
    skills: ["Data Science", "DSA", "DBMS", "Operating Systems", "Computer Networks"],
    isCurrent: true,
  },
];

export const Work: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] antialiased">
      <SEO
        title="Work & Experience | Ayushman Chakraborty"
        description="Ayushman Chakraborty's experience across Wipro enterprise AI, TraininGenie full-stack development, open source contributions and MIT Bengaluru."
        path="/work"
      />
      <main className="page">
        {/* Page Header */}
        <div className="page-col mb-5">
          <div>
            <h1 className="doto-font text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Work
            </h1>
          </div>
        </div>

        {/* Work Timeline List */}
        <div className="relative flex flex-col">
          {workData.map((item, index) => (
            <div key={index} className="relative flex gap-2 sm:gap-3 group">
              {/* Timeline Spine Column */}
              <div className="flex flex-col items-center shrink-0 w-4 sm:w-5">
                {/* Node dot aligned with header of card */}
                <div className="relative z-10 flex items-center justify-center mt-3">
                  {item.isCurrent ? (
                    <span className="relative z-10 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-500 ring-2 ring-[var(--bg-page)] shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
                  ) : (
                    <span className="relative z-10 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[var(--text-subtle)] ring-2 ring-[var(--bg-page)]" />
                  )}
                </div>

                {/* Connecting Vertical Line */}
                {index < workData.length - 1 && (() => {
                  const isFirst = index === 0;
                  const isLast = index === workData.length - 2;
                  const bothEnds = isFirst && isLast;

                  let gradientStyle: React.CSSProperties | undefined;
                  if (item.isCurrent) {
                    if (bothEnds) {
                      gradientStyle = {
                        background:
                          "linear-gradient(to bottom, transparent, #10b981 20%, #10b981 80%, transparent)",
                      };
                    } else if (isFirst) {
                      gradientStyle = {
                        background:
                          "linear-gradient(to bottom, transparent, #10b981 20%)",
                      };
                    } else if (isLast) {
                      gradientStyle = {
                        background:
                          "linear-gradient(to bottom, #10b981 80%, transparent)",
                      };
                    } else {
                      gradientStyle = { background: "#10b981" };
                    }
                  }

                  return (
                    <div
                      className={`w-[1.5px] flex-1 my-[3px] transition-colors duration-300 ${
                        item.isCurrent
                          ? "shadow-[0_0_5px_rgba(16,185,129,0.4)]"
                          : "bg-[var(--border-color)]"
                      }`}
                      style={gradientStyle}
                    />
                  );
                })()}
              </div>

              {/* Work Card */}
              <div className="flex-1 pb-3 min-w-0">
                <div className="relative flex flex-col p-0 transition-all duration-300">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-1.5 border-b border-[var(--border-color)]">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                          {item.company}
                        </h2>
                        <span className="jetbrains-mono text-[9px] font-medium px-1.5 py-0.5 rounded bg-[var(--badge-subtle-bg)] text-[var(--badge-subtle-text)] border border-[var(--badge-subtle-border)]">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-[11px] font-medium text-[var(--text-primary)] opacity-80 mt-0.5">
                        {item.role}
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end">
                      <span className={`jetbrains-mono text-[11px] ${item.isCurrent ? "text-emerald-500 dark:text-emerald-400 font-medium" : "text-[var(--text-muted)]"}`}>
                        {item.period}
                      </span>
                      <span className="text-[10px] text-[var(--text-subtle)]">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="mt-2 flex flex-col gap-1.5 text-[11px] text-[var(--text-muted)] leading-relaxed">
                    {item.description.map((desc, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[var(--text-subtle)] select-none mt-0.5">▹</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills Tags */}
                  {item.skills && (
                    <div className="mt-2 pt-1.5 border-t border-[var(--border-color)] flex flex-wrap gap-1">
                      {item.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="jetbrains-mono text-[9px] px-1.5 py-0.5 rounded bg-[var(--badge-subtle-bg)] text-[var(--badge-subtle-text)] border border-[var(--badge-subtle-border)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Footer />
      </main>

      {/* Floating Bottom Dock Navigation */}
      <DockNavbar />
      <div className="bottom-progressive-blur" />
    </div>
  );
};

export default Work;
