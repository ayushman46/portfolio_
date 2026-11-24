import React from "react";
import { motion, type Variants } from "motion/react";
import Footer from "../components/Footer";
import VerifyLog from "../components/fx/VerifyLog";
import SEO from "../components/SEO";

import { FaReact, FaPython } from "react-icons/fa";
import { SiTypescript, SiPostgresql, SiSupabase, SiFastapi } from "react-icons/si";
import { TbDatabaseSearch } from "react-icons/tb";
import { allSkills, skillCategories } from "../data/skills";
import "../styles/inner.css";

const EASE = [0.16, 1, 0.3, 1] as const;

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: Math.min(i, 8) * 0.06 },
  }),
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Tech chip set inline with prose. Any punctuation that follows the chip is
 * rendered inside the same no-wrap span so it can never orphan onto the next line.
 */
const InlineChip: React.FC<{ icon: React.ReactNode; after?: string; children: React.ReactNode }> = ({
  icon,
  after,
  children,
}) => (
  <span className="whitespace-nowrap">
    <span className="inline-flex items-center gap-1 rounded-[3px] border border-[var(--border-color)] bg-[var(--pill-bg)] px-1.5 py-1 align-middle text-xs leading-none font-medium text-[var(--text-primary)]">
      <span aria-hidden className="text-xs">
        {icon}
      </span>
      {children}
    </span>
    {after}
  </span>
);

export const SkillsPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Skills | Ayushman Chakraborty"
        description="Ayushman Chakraborty's skills, each backed by shipped code: LLMs, RAG, AI agents and evals; computer vision and real-time voice; Python, SQL, Airflow, dbt, Kafka and MLflow data pipelines; FastAPI, Next.js and TypeScript; Docker, OpenTelemetry and CI/CD."
        path="/skills"
      />
      <main id="main" className="page">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="rail inner-eyebrow">
            <span className="text-[var(--accent)]">[03]</span>
            <span>/ 04</span>
            <span>· {allSkills.length} skills</span>
            <span>· {skillCategories.length} groups</span>
          </p>
          <h1 className="inner-title">Skills</h1>
          <div className="tick-rule mt-8" aria-hidden />
        </motion.header>

        {/* Narrative — each chip is glued to the punctuation after it, so no line can start with "," or "." */}
        <motion.p
          className="mt-8 max-w-[44rem] text-base leading-[2.1] text-pretty text-[var(--text-muted)]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.06 }}
        >
          I ship LLM, RAG and agentic systems with{" "}
          <InlineChip icon={<FaPython />} after=",">
            Python
          </InlineChip>{" "}
          <InlineChip icon={<SiFastapi />}>FastAPI</InlineChip> and{" "}
          <InlineChip icon={<TbDatabaseSearch />} after=".">
            RAG
          </InlineChip>{" "}
          I build interfaces with{" "}
          <InlineChip icon={<FaReact />} after=" +">
            React
          </InlineChip>{" "}
          <InlineChip icon={<SiTypescript />} after=",">
            TypeScript
          </InlineChip>{" "}
          backed by <InlineChip icon={<SiPostgresql />}>PostgreSQL</InlineChip> and{" "}
          <InlineChip icon={<SiSupabase />} after=".">
            Supabase
          </InlineChip>
        </motion.p>

        {/* Index: group label left, chips right from 768px */}
        <motion.div
          className="mt-10 flex flex-col border-t border-dashed border-[var(--border-color)]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {skillCategories.map((category, index) => (
            <motion.section
              key={category.tag}
              custom={index}
              variants={rowVariants}
              aria-labelledby={`skills-${index}`}
              className="grid gap-3 border-b border-dashed border-[var(--border-color)] py-5 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8"
            >
              <h2 id={`skills-${index}`} className="jetbrains-mono flex items-baseline gap-2 text-xs md:pt-2">
                <span aria-hidden className="text-[var(--text-subtle)] tabular-nums">
                  {pad(index + 1)}
                </span>
                <span className="font-medium text-[var(--text-primary)]">{category.tag}</span>
                <span className="text-[var(--text-subtle)] tabular-nums">· {category.skills.length}</span>
              </h2>

              <ul className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[var(--border-color)] bg-[var(--card-bg)] px-2.5 text-[0.8125rem] font-medium whitespace-nowrap text-[var(--text-primary)]"
                  >
                    <span
                      aria-hidden
                      className="text-[12px] leading-none"
                    >
                      {skill.icon}
                    </span>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </motion.div>

        <div className="mt-14">
          <VerifyLog />
        </div>

        <Footer />
      </main>
    </>
  );
};

export default SkillsPage;
