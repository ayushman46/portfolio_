import React from "react";
import { FaReact, FaPython, FaGitAlt, FaGithub, FaAws } from "react-icons/fa";

import {
  SiMongodb,
  SiTypescript,
  SiPostgresql,
  SiSupabase,
  SiNextdotjs,
  SiDocker,
  SiFastapi,
  SiApacheairflow,
  SiDbt,
  SiMlflow,
  SiOpentelemetry,
  SiAmazons3,
  SiGraphql,
  SiJest,
  SiPytest,
  SiTurso,
  SiShadcnui,
  SiApachekafka,
  SiLangchain,
  SiNvidia,
  SiPytorch,
  SiScikitlearn,
  SiPandas,
  SiOpencv,
  SiGithubactions,
  SiVitest,
  SiStreamlit,
} from "react-icons/si";

import {
  TbFileTypeSql,
  TbBrain,
  TbDatabaseSearch,
  TbApi,
  TbRobot,
  TbPlugConnected,
  TbChartDots3,
  TbMicrophone,
  TbMessageCode,
  TbTransform,
  TbChecklist,
  TbShieldLock,
  TbInfinity,
} from "react-icons/tb";
import { VscAzure } from "react-icons/vsc";

import { IoLogoJavascript } from "react-icons/io5";

export interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

export interface SkillCategory {
  tag: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    tag: "languages",
    skills: [
      { name: "Python", icon: <FaPython className="text-[#3776AB] dark:text-yellow-300" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
      { name: "JavaScript", icon: <IoLogoJavascript className="text-yellow-400" /> },
      { name: "SQL", icon: <TbFileTypeSql className="text-emerald-400" /> },
    ],
  },
  {
    tag: "ai & ml",
    skills: [
      { name: "RAG", icon: <TbDatabaseSearch className="text-purple-400" /> },
      { name: "LLMs", icon: <TbBrain className="text-violet-400" /> },
      { name: "AI Agents", icon: <TbRobot className="text-fuchsia-400" /> },
      { name: "MCP", icon: <TbPlugConnected className="text-[var(--text-primary)]" /> },
      { name: "Prompt Engineering", icon: <TbMessageCode className="text-violet-300" /> },
      { name: "LangChain / LangGraph", icon: <SiLangchain className="text-teal-400" /> },
      { name: "NVIDIA NIM", icon: <SiNvidia className="text-[#76B900]" /> },
      { name: "Azure OpenAI", icon: <VscAzure className="text-sky-400" /> },
      { name: "XGBoost", icon: <TbChartDots3 className="text-orange-400" /> },
      { name: "scikit-learn", icon: <SiScikitlearn className="text-orange-400" /> },
      { name: "PyTorch", icon: <SiPytorch className="text-orange-500" /> },
      { name: "OpenCV", icon: <SiOpencv className="text-indigo-400" /> },
      { name: "Speech Recognition (Whisper)", icon: <TbMicrophone className="text-rose-400" /> },
    ],
  },
  {
    tag: "data engineering",
    skills: [
      { name: "Apache Airflow", icon: <SiApacheairflow className="text-sky-400" /> },
      { name: "dbt", icon: <SiDbt className="text-orange-500" /> },
      { name: "MLflow", icon: <SiMlflow className="text-sky-400" /> },
      { name: "Kafka", icon: <SiApachekafka className="text-[var(--text-primary)]" /> },
      { name: "pandas", icon: <SiPandas className="text-indigo-300" /> },
      { name: "AWS S3", icon: <SiAmazons3 className="text-green-500" /> },
      { name: "ETL Pipelines", icon: <TbTransform className="text-sky-300" /> },
      { name: "Data Validation", icon: <TbChecklist className="text-emerald-400" /> },
    ],
  },
  {
    tag: "backend & web",
    skills: [
      { name: "FastAPI", icon: <SiFastapi className="text-emerald-400" /> },
      { name: "React", icon: <FaReact className="text-cyan-400" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-[var(--text-primary)]" /> },
      { name: "REST APIs", icon: <TbApi className="text-blue-400" /> },
      { name: "GraphQL", icon: <SiGraphql className="text-pink-500" /> },
      { name: "WebSockets", icon: <TbPlugConnected className="text-cyan-400" /> },
      { name: "SAML", icon: <TbShieldLock className="text-amber-400" /> },
      { name: "Streamlit", icon: <SiStreamlit className="text-red-400" /> },
      { name: "shadcn/ui", icon: <SiShadcnui className="text-[var(--text-primary)]" /> },
    ],
  },
  {
    tag: "databases",
    skills: [
      { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-emerald-500" /> },
      { name: "Supabase", icon: <SiSupabase className="text-emerald-400" /> },
      { name: "Turso", icon: <SiTurso className="text-teal-300" /> },
    ],
  },
  {
    tag: "cloud & devops",
    skills: [
      { name: "AWS", icon: <FaAws className="text-orange-400" /> },
      { name: "Azure", icon: <VscAzure className="text-sky-500" /> },
      { name: "CI/CD", icon: <TbInfinity className="text-blue-400" /> },
      { name: "Git", icon: <FaGitAlt className="text-orange-500" /> },
      { name: "GitHub", icon: <FaGithub className="text-[var(--text-primary)]" /> },
      { name: "Docker", icon: <SiDocker className="text-blue-400" /> },
      { name: "OpenTelemetry", icon: <SiOpentelemetry className="text-amber-400" /> },
      { name: "GitHub Actions", icon: <SiGithubactions className="text-blue-400" /> },
      { name: "pytest", icon: <SiPytest className="text-sky-400" /> },
      { name: "Jest", icon: <SiJest className="text-red-400" /> },
      { name: "Vitest", icon: <SiVitest className="text-lime-500" /> },
    ],
  },
];

/** Flat list used by the home-page stack marquee. */
export const allSkills: SkillItem[] = skillCategories.flatMap((c) => c.skills);
