import React from "react";
import { FaReact, FaPython, FaGitAlt, FaGithub } from "react-icons/fa";

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
  SiOnnx,
  SiOllama,
  SiMinio,
  SiDuckdb,
  SiApacheparquet,
  SiPolars,
  SiHono,
  SiTailwindcss,
  SiThreedotjs,
  SiZod,
  SiPwa,
  SiCapacitor,
  SiRazorpay,
  SiSqlite,
  SiVercel,
  SiRender,
} from "react-icons/si";

import {
  TbFileTypeSql,
  TbBrain,
  TbDatabaseSearch,
  TbDatabase,
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
  TbEye,
  TbScale,
  TbWaveSine,
  TbBrowser,
  TbKey,
  TbTestPipe,
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

// Every skill is evidenced by code in a public repo, a merged pull request or a certification
// (re-checked 2026-11-05). AWS was dropped: no repo uses it (ReleaseLens runs on S3-compatible MinIO).
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
      { name: "LLM Evals", icon: <TbScale className="text-violet-300" /> },
      { name: "LangChain / LangGraph", icon: <SiLangchain className="text-teal-400" /> },
      { name: "NVIDIA NIM", icon: <SiNvidia className="text-[#76B900]" /> },
      { name: "Azure OpenAI", icon: <VscAzure className="text-sky-400" /> },
      { name: "Ollama", icon: <SiOllama className="text-[var(--text-primary)]" /> },
      { name: "XGBoost", icon: <TbChartDots3 className="text-orange-400" /> },
      { name: "scikit-learn", icon: <SiScikitlearn className="text-orange-400" /> },
      { name: "PyTorch", icon: <SiPytorch className="text-orange-500" /> },
      { name: "Computer Vision", icon: <TbEye className="text-indigo-300" /> },
      { name: "OpenCV", icon: <SiOpencv className="text-indigo-400" /> },
      { name: "ONNX Runtime", icon: <SiOnnx className="text-[var(--text-primary)]" /> },
      { name: "Speech Recognition (Whisper)", icon: <TbMicrophone className="text-rose-400" /> },
      { name: "Real-time Voice (VAD, TTS)", icon: <TbWaveSine className="text-rose-300" /> },
    ],
  },
  {
    tag: "data engineering",
    skills: [
      { name: "Apache Airflow", icon: <SiApacheairflow className="text-sky-400" /> },
      { name: "dbt", icon: <SiDbt className="text-orange-500" /> },
      { name: "MLflow", icon: <SiMlflow className="text-sky-400" /> },
      { name: "Kafka", icon: <SiApachekafka className="text-[var(--text-primary)]" /> },
      { name: "DuckDB", icon: <SiDuckdb className="text-yellow-400" /> },
      { name: "pandas", icon: <SiPandas className="text-indigo-300" /> },
      { name: "Polars", icon: <SiPolars className="text-sky-300" /> },
      { name: "Parquet", icon: <SiApacheparquet className="text-sky-500" /> },
      { name: "S3 / MinIO", icon: <SiMinio className="text-rose-500" /> },
      { name: "ETL Pipelines", icon: <TbTransform className="text-sky-300" /> },
      { name: "Data Validation", icon: <TbChecklist className="text-emerald-400" /> },
    ],
  },
  {
    tag: "backend & web",
    skills: [
      { name: "FastAPI", icon: <SiFastapi className="text-emerald-400" /> },
      { name: "Hono", icon: <SiHono className="text-orange-500" /> },
      { name: "React", icon: <FaReact className="text-cyan-400" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-[var(--text-primary)]" /> },
      { name: "REST APIs", icon: <TbApi className="text-blue-400" /> },
      { name: "GraphQL", icon: <SiGraphql className="text-pink-500" /> },
      { name: "WebSockets", icon: <TbPlugConnected className="text-cyan-400" /> },
      { name: "OAuth 2.0", icon: <TbKey className="text-amber-300" /> },
      { name: "SAML", icon: <TbShieldLock className="text-amber-400" /> },
      { name: "Zod", icon: <SiZod className="text-blue-500" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400" /> },
      { name: "shadcn/ui", icon: <SiShadcnui className="text-[var(--text-primary)]" /> },
      { name: "three.js", icon: <SiThreedotjs className="text-[var(--text-primary)]" /> },
      { name: "Browser Extensions (MV3)", icon: <TbBrowser className="text-blue-300" /> },
      { name: "PWA", icon: <SiPwa className="text-violet-400" /> },
      { name: "Capacitor (Android)", icon: <SiCapacitor className="text-sky-400" /> },
      { name: "Razorpay", icon: <SiRazorpay className="text-blue-500" /> },
      { name: "Streamlit", icon: <SiStreamlit className="text-red-400" /> },
    ],
  },
  {
    tag: "databases",
    skills: [
      { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-emerald-500" /> },
      { name: "Supabase", icon: <SiSupabase className="text-emerald-400" /> },
      { name: "Turso", icon: <SiTurso className="text-teal-300" /> },
      { name: "SQLite", icon: <SiSqlite className="text-sky-500" /> },
      { name: "IndexedDB (Dexie)", icon: <TbDatabase className="text-amber-400" /> },
    ],
  },
  {
    tag: "cloud & devops",
    skills: [
      { name: "Azure", icon: <VscAzure className="text-sky-500" /> },
      { name: "Vercel", icon: <SiVercel className="text-[var(--text-primary)]" /> },
      { name: "Render", icon: <SiRender className="text-[var(--text-primary)]" /> },
      { name: "Docker", icon: <SiDocker className="text-blue-400" /> },
      { name: "CI/CD", icon: <TbInfinity className="text-blue-400" /> },
      { name: "GitHub Actions", icon: <SiGithubactions className="text-blue-400" /> },
      { name: "Git", icon: <FaGitAlt className="text-orange-500" /> },
      { name: "GitHub", icon: <FaGithub className="text-[var(--text-primary)]" /> },
      { name: "OpenTelemetry", icon: <SiOpentelemetry className="text-amber-400" /> },
      { name: "pytest", icon: <SiPytest className="text-sky-400" /> },
      { name: "Vitest", icon: <SiVitest className="text-lime-500" /> },
      { name: "Playwright", icon: <TbTestPipe className="text-green-500" /> },
      { name: "Jest", icon: <SiJest className="text-red-400" /> },
    ],
  },
];

/** Flat list used by the home-page stack marquee. */
export const allSkills: SkillItem[] = skillCategories.flatMap((c) => c.skills);
