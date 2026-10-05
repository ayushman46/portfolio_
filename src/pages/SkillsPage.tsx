import React from "react";
import DockNavbar from "../components/DockNavbar";
import Footer from "../components/Footer";

import {
  FaReact,
  FaPython,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";

import {
  SiMongodb,
  SiTypescript,
  SiPostgresql,
  SiSupabase,
  SiNextdotjs,
  SiDocker,
  SiFastapi,
} from "react-icons/si";

import {
  TbFileTypeSql,
  TbBrain,
  TbDatabaseSearch,
  TbApi,
} from "react-icons/tb";

import { IoLogoJavascript } from "react-icons/io5";

interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  tag: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    tag: "<languages/>",
    skills: [
      {
        name: "Python",
        icon: <FaPython className="text-yellow-300" />,
      },
      {
        name: "TypeScript",
        icon: <SiTypescript className="text-blue-400" />,
      },
      {
        name: "JavaScript",
        icon: <IoLogoJavascript className="text-yellow-400" />,
      },
      {
        name: "SQL",
        icon: <TbFileTypeSql className="text-emerald-400" />,
      },
    ],
  },

  {
    tag: "<ai & ml/>",
    skills: [
      {
        name: "RAG",
        icon: <TbDatabaseSearch className="text-purple-400" />,
      },
      {
        name: "LLMs",
        icon: <TbBrain className="text-violet-400" />,
      },
      {
        name: "AI Agents",
        icon: <TbBrain className="text-fuchsia-400" />,
      },
      {
        name: "Vector Search",
        icon: <TbDatabaseSearch className="text-cyan-400" />,
      },
      {
        name: "Embeddings",
        icon: <TbBrain className="text-indigo-400" />,
      },
      { name: "XGBoost", icon: <TbBrain className="text-orange-400" /> },
      { name: "MLflow", icon: <TbBrain className="text-cyan-400" /> },
    ],
  },

  {
    tag: "<backend & web/>",
    skills: [
      {
        name: "FastAPI",
        icon: <SiFastapi className="text-emerald-400" />,
      },
      {
        name: "React",
        icon: <FaReact className="text-cyan-400" />,
      },
      {
        name: "Next.js",
        icon: (
          <SiNextdotjs className="text-[var(--text-primary)]" />
        ),
      },
      {
        name: "REST APIs",
        icon: <TbApi className="text-blue-400" />,
      },
      { name: "GraphQL", icon: <TbApi className="text-pink-400" /> },
      { name: "WebSockets", icon: <TbApi className="text-cyan-400" /> },
      { name: "shadcn/ui", icon: <FaReact className="text-cyan-400" /> },
    ],
  },

  {
    tag: "<databases/>",
    skills: [
      {
        name: "PostgreSQL",
        icon: <SiPostgresql className="text-blue-400" />,
      },
      {
        name: "MongoDB",
        icon: <SiMongodb className="text-emerald-500" />,
      },
      {
        name: "Supabase",
        icon: <SiSupabase className="text-emerald-400" />,
      },
      { name: "Turso", icon: <SiPostgresql className="text-orange-400" /> },
    ],
  },

  {
    tag: "<tools & devops/>",
    skills: [
      {
        name: "Git",
        icon: <FaGitAlt className="text-orange-500" />,
      },
      {
        name: "GitHub",
        icon: (
          <FaGithub className="text-[var(--text-primary)]" />
        ),
      },
      {
        name: "Docker",
        icon: <SiDocker className="text-blue-400" />,
      },
      { name: "Apache Airflow", icon: <TbBrain className="text-red-400" /> },
      { name: "dbt", icon: <TbDatabaseSearch className="text-orange-400" /> },
      { name: "AWS S3", icon: <TbDatabaseSearch className="text-yellow-400" /> },
      { name: "OpenTelemetry", icon: <TbApi className="text-purple-400" /> },
      { name: "CI/CD", icon: <FaGithub className="text-[var(--text-primary)]" /> },
      { name: "pytest", icon: <FaPython className="text-yellow-300" /> },
      { name: "Jest", icon: <SiTypescript className="text-red-400" /> },
    ],
  },
];

export const SkillsPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] antialiased">
      <main className="page">

        {/* Page Header */}
        <div className="page-col mb-5">
          <div>
            <h1 className="doto-font text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Skills
            </h1>
          </div>
        </div>

        {/* Narrative */}
        <div className="rounded-lg p-3 sm:p-4 mb-5 text-sm text-[var(--text-muted)] leading-relaxed">
          <p className="flex flex-wrap items-center gap-x-1 gap-y-1.5">

            <span>I build production</span>

            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[var(--border-color)] bg-[var(--pill-bg)] text-[11px] text-[var(--text-primary)] font-medium">
              <TbBrain className="text-violet-400 text-xs" />
              AI and Data Systems
            </span>

            <span>with</span>

            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[var(--border-color)] bg-[var(--pill-bg)] text-[11px] text-[var(--text-primary)] font-medium">
              <FaPython className="text-yellow-300 text-xs" />
              Python
            </span>

            <span>,</span>

            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[var(--border-color)] bg-[var(--pill-bg)] text-[11px] text-[var(--text-primary)] font-medium">
              <SiFastapi className="text-emerald-400 text-xs" />
              FastAPI
            </span>

            <span>and</span>

            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[var(--border-color)] bg-[var(--pill-bg)] text-[11px] text-[var(--text-primary)] font-medium">
              <TbDatabaseSearch className="text-purple-400 text-xs" />
              RAG
            </span>

            <span>. I build interfaces with</span>

            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[var(--border-color)] bg-[var(--pill-bg)] text-[11px] text-[var(--text-primary)] font-medium">
              <FaReact className="text-cyan-400 text-xs" />
              React
            </span>

            <span>+</span>

            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[var(--border-color)] bg-[var(--pill-bg)] text-[11px] text-[var(--text-primary)] font-medium">
              <SiTypescript className="text-blue-400 text-xs" />
              TypeScript
            </span>

            <span>, backed by</span>

            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[var(--border-color)] bg-[var(--pill-bg)] text-[11px] text-[var(--text-primary)] font-medium">
              <SiPostgresql className="text-blue-400 text-xs" />
              PostgreSQL
            </span>

            <span>and</span>

            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[var(--border-color)] bg-[var(--pill-bg)] text-[11px] text-[var(--text-primary)] font-medium">
              <SiSupabase className="text-emerald-400 text-xs" />
              Supabase
            </span>

            <span>.</span>
          </p>
        </div>

        {/* Categorized Skills */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col gap-1.5"
            >
              <div className="jetbrains-mono text-xs font-semibold text-[var(--text-muted)] tracking-wider">
                {category.tag}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      whitespace-nowrap
                      rounded-md
                      font-medium
                      border
                      border-[var(--border-color)]
                      h-[28px]
                      cursor-default
                      gap-1.5
                      bg-[var(--card-bg)]
                      px-2.5
                      text-xs
                      text-[var(--text-primary)]
                      hover:border-[var(--text-muted)]
                      hover:bg-[var(--card-hover)]
                      transition-all
                      duration-200
                      shadow-xs
                    "
                  >
                    <span className="text-sm">
                      {skill.icon}
                    </span>

                    <span className="font-medium text-xs text-[var(--text-primary)]">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Footer />
      </main>

      {/* Floating Bottom Dock */}
      <DockNavbar />

      {/* Bottom Blur */}
      <div className="bottom-progressive-blur" />
    </div>
  );
};

export default SkillsPage;
