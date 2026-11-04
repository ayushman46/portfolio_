// Project data. Every claim below is grounded in the project's README, its
// source tree, the live deployment, or the resume — verified on 2026-10-30.
// Live links were checked with an HTTP request on the same date.
//
// Array order is display order: products with real users first, then the rest.
// The first four entries are the home page's featured projects.
// User counts (30+, 100+, 50+ interviews) and 519K+ builds come from the
// resume dated 2026-11.

import releaseLensImg from "../assets/projects/releaselens.webp";
import codeGlyphImg from "../assets/projects/codeglyph.webp";
import prepviaImg from "../assets/projects/prepvia.webp";
import strideCircleImg from "../assets/projects/stride-circle.webp";
import twtdashImg from "../assets/projects/twtdash.webp";
import seamlyImg from "../assets/projects/seamly.webp";
import trainingenieImg from "../assets/projects/trainingenie.webp";
import settleImg from "../assets/projects/settle.webp";

export const CATEGORIES = ["AI/ML", "Data", "Full-Stack", "Computer Vision"] as const;
export type Category = (typeof CATEGORIES)[number];

export interface Project {
  slug: string;
  heading: string;
  description: string;
  highlights: string[];
  category: Category;
  year: string;
  image?: string;
  /** One short proof line shown in full on the card. Only verified numbers. */
  metric?: string;
  /** Stages drawn in place of a screenshot when a project has no `image`. */
  pipeline?: string[];
  /** Slug of a blog post that goes deeper on this project. */
  writeup?: string;
  techStack: string[];
  /** Omitted while a project has no public repo yet (rendered as "In progress"). */
  github?: string;
  liveLink?: string;
}

const GH = "https://github.com/ayushman46";

export const ProjectData: Project[] = [
  {
    slug: "codeglyph",
    heading: "CodeGlyph",
    description:
      "Production RAG and agentic code-intelligence SaaS used by 30+ users. Ask any public GitHub repo a question and get answers cited to the exact file and line.",
    highlights: [
      "Hybrid retrieval: vector, keyword, path-aware ranking and dependency graph, with exact file and line citations.",
      "Incremental ingestion with SHA-256 manifests for repos up to 5,000 files, and incremental re-indexing.",
      "NVIDIA Nemotron models for generation and 2,048-dim embeddings.",
      "Agentic edit mode that writes multi-file patches and opens pull requests via GitHub OAuth.",
    ],
    category: "AI/ML",
    year: "2026",
    image: codeGlyphImg,
    metric: "30+ users · 5,000-file repos · agent opens multi-file PRs",
    techStack: ["Python", "FastAPI", "React", "RAG", "Turso", "Supabase", "NVIDIA NIM", "GitHub API", "Docker"],
    github: `${GH}/CodeGlyph`,
    liveLink: "https://codebase-rag-qu7s.onrender.com",
  },
  {
    slug: "prepvia",
    heading: "Prepvia",
    description:
      "Live real-time voice AI interview platform with 100+ users and 50+ completed interviews, grounded in your resume and the job description.",
    highlights: [
      "In-browser voice detection streaming audio over a persistent WebSocket.",
      "Groq Whisper speech-to-text with streaming NVIDIA Nemotron responses.",
      "AI adapts each follow-up question to the candidate's last answer, with per-session memory in MongoDB.",
      "Evidence-backed report at the end of every session.",
    ],
    category: "AI/ML",
    year: "2026",
    image: prepviaImg,
    metric: "100+ users · 50+ completed interviews",
    techStack: ["Python", "FastAPI", "WebSockets", "Next.js", "TypeScript", "MongoDB"],
    github: `${GH}/Prepvia`,
    liveLink: "https://prepviaai.vercel.app",
  },
  {
    slug: "releaselens",
    heading: "ReleaseLens",
    description:
      "AIOps release-intelligence platform that ingests 519K+ historical CI builds, predicts build-failure risk before a deploy and traces regressions to root cause after it.",
    highlights: [
      "Airflow ETL pipeline into validated dbt marts on AWS S3.",
      "XGBoost release-risk models with leakage-safe, time-based validation tracked in MLflow, served via FastAPI for live risk scoring.",
      "OpenTelemetry traces streamed through Kafka to correlate deployments with latency and error regressions.",
      "Statistical regression gates and a trace-derived service graph to find root cause and blast radius.",
    ],
    category: "Data",
    year: "2026",
    image: releaseLensImg,
    metric: "In progress · 519K+ CI builds · leakage-safe time-based validation",
    writeup: "from-ci-data-to-release-risk",
    techStack: ["Python", "FastAPI", "Airflow", "dbt", "AWS S3", "XGBoost", "MLflow", "Kafka", "OpenTelemetry"],
    github: `${GH}/releaselens`,
  },
  // No public repo, live link or screenshot yet: shown as "In progress".
  {
    slug: "mandategraph",
    heading: "MandateGraph",
    description:
      "Authorization and security harness for AI agents: every tool call runs under scoped, revocable permissions, behind an MCP proxy with human approval and a full audit trail.",
    highlights: [
      "Enforces scoped, revocable permissions on AI agents' tool calls, with a full audit trail.",
      "MCP proxy with a human approval flow for sensitive actions.",
      "10-scenario prompt-injection test harness that measures block rate.",
    ],
    category: "AI/ML",
    year: "2026",
    metric: "In progress · 10-scenario prompt-injection harness",
    pipeline: ["agent tool call", "MCP proxy", "scope check", "human approval", "audit log"],
    techStack: ["Python", "FastAPI", "PostgreSQL", "MCP"],
  },
  {
    slug: "twtdash",
    heading: "twtdash",
    description:
      "Local-first browser extension that turns your X bookmarks into a fast, searchable library, sorted on-device into 18 categories in English, Hindi and eight more Indian languages.",
    highlights: [
      "Sync reads the GraphQL responses x.com already loads — no X API key or account, and no requests sent on your behalf.",
      "On-device classifier that maps eight Indian scripts onto Devanagari, so one keyword matches across languages and romanized Hindi.",
      "Virtualized masonry layouts and an index-free scan search — about 42 ms per keystroke at 10,000 posts.",
      "Spaced-repetition Recall, a resource Shelf, and optional Ask answers cited to the original posts via NVIDIA Nemotron.",
    ],
    category: "Full-Stack",
    year: "2026",
    image: twtdashImg,
    metric: "~42 ms per keystroke at 10,000 posts · no X API key",
    techStack: ["TypeScript", "React", "WXT", "Dexie", "Next.js", "Tailwind CSS", "NVIDIA NIM", "Vitest"],
    github: `${GH}/twt`,
    liveLink: "https://twtdash.vercel.app",
  },
  {
    slug: "seamly",
    heading: "Seamly",
    description:
      "In-browser bowling coach: film one delivery on a phone and get the key moments, a 3D body model and angles measured against published norms. The video never leaves the device.",
    highlights: [
      "YOLO11 pose on every frame through ONNX Runtime Web (WebGPU, with a WebAssembly fallback), entirely in the browser.",
      "MotionBERT 3D lifting and a metric skeleton fit, a TypeScript port of the Python pipeline checked by 364 parity tests.",
      "Marks back-foot contact, front-foot contact and release, then rates each angle against published research with a back-health check.",
      "Fuses side-on and behind-the-stumps clips of the same ball from two phones into one analysis.",
    ],
    category: "Computer Vision",
    year: "2026",
    image: seamlyImg,
    metric: "364 parity tests · runs fully in the browser",
    techStack: ["TypeScript", "React", "ONNX Runtime Web", "YOLO11", "MotionBERT", "three.js", "Python", "FastAPI"],
    // The in-browser rewrite lives on the seamly-web branch (not yet merged into main).
    github: `${GH}/Seamly/tree/seamly-web`,
    liveLink: "https://seamly-cricket.vercel.app",
  },
  {
    slug: "settle",
    heading: "Settle",
    description: "Mobile-first PWA to split any bill and get paid back over UPI. AI reads the bill; no sign-up, no database.",
    highlights: [
      "AI bill scanning and natural-language splits with NVIDIA Nemotron.",
      "Six split modes computed exactly in paise, settled in the fewest payments with a UPI QR for each.",
      "\"Who's paid?\" reconciles repayments from UPI screenshots, bank statements or bank SMS in one go.",
      "Every app screen in eight languages — English, Hindi and six more Indian languages — with speak-to-split in all of them.",
    ],
    category: "Full-Stack",
    year: "2026",
    image: settleImg,
    metric: "8 languages · exact in paise · UPI QR per payment",
    techStack: ["React", "TypeScript", "Vite", "Hono", "Zod", "Vitest"],
    github: `${GH}/settle`,
    liveLink: "https://settleupi.vercel.app",
  },
  {
    slug: "stridecircle",
    heading: "StrideCircle",
    description:
      "Turns Strava runs into group challenges with live leaderboards, effort-based scoring and AI coaching.",
    highlights: [
      "Strava OAuth 2.0 sync with automatic token refresh.",
      "Custom scoring with weekly, monthly and all-time leaderboards built on SQL views.",
      "Weekly AI coaching reports powered by Groq.",
    ],
    category: "Full-Stack",
    year: "2026",
    image: strideCircleImg,
    metric: "Weekly, monthly and all-time leaderboards",
    techStack: ["React", "JavaScript", "Supabase", "PostgreSQL", "Strava API", "Groq"],
    github: `${GH}/StrideCircle`,
    liveLink: "https://stridecircle.vercel.app",
  },
  {
    slug: "trainingenie",
    heading: "TraininGenie",
    description:
      "Production website for a corporate training company, built and launched as sole developer during my internship, from architecture to zero-downtime updates.",
    highlights: [
      "Built on Next.js with Turso and Supabase authentication.",
      "Reusable shadcn/ui component library and responsive design system.",
      "Led technical SEO and GEO: metadata, sitemaps, canonical URLs and schema, with IndexNow on the Next.js App Router.",
    ],
    category: "Full-Stack",
    year: "2026",
    image: trainingenieImg,
    metric: "Sole developer · zero-downtime updates · SEO + GEO",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Turso", "Supabase"],
    github: `${GH}/Trainingenie`,
    liveLink: "https://www.trainingenie.com",
  },
  {
    slug: "chaosai",
    heading: "ChaosAI",
    description:
      "Agentic chaos-engineering tool that runs bounded fault experiments against OpenMeter and verifies recovery. Built with a teammate.",
    highlights: [
      "LangGraph flow from plan and safety checks through inject, observe and rollback.",
      "Four fault types with hard duration, latency and rate caps.",
      "Faults go through an authenticated control API, never raw Docker.",
    ],
    category: "AI/ML",
    year: "2026",
    metric: "4 fault types with hard caps · built with a teammate",
    pipeline: ["plan", "safety checks", "inject", "observe", "rollback"],
    techStack: ["Python", "FastAPI", "LangGraph", "React", "Docker"],
    github: `${GH}/Cloud_native_bosch`,
  },
  {
    slug: "rag-document-qa",
    heading: "Document QA",
    description: "Local RAG system that answers questions over scanned PDFs with citations, using FAISS + BM25 retrieval and Ollama.",
    highlights: [
      "Layout-aware OCR of text and tables with unstructured and Tesseract.",
      "Hybrid FAISS + BM25 retrieval with LangChain.",
      "Runs entirely on-device with Llama 3.2, with a grounding check on every answer.",
    ],
    category: "AI/ML",
    year: "2026",
    metric: "Runs fully on-device with Llama 3.2",
    pipeline: ["scanned PDF", "OCR", "FAISS + BM25", "Llama 3.2", "grounding check"],
    techStack: ["Python", "RAG", "LangChain", "FAISS", "Ollama", "FastAPI"],
    github: `${GH}/RAG`,
  },
  {
    // Keep the slug: /projects/ipl-match-predictor is in the sitemap.
    // No screenshot on purpose — the live site's landing page shows marketing
    // numbers that aren't backed by the repo.
    slug: "ipl-match-predictor",
    heading: "IPL Match Predictor",
    description:
      "Predicts IPL match winners from team form, venue and head-to-head history, trained on every season from 2008 to 2024.",
    highlights: [
      "Random Forest win probabilities served through a Flask API.",
      "React + TypeScript frontend with prediction history in Supabase.",
    ],
    category: "AI/ML",
    year: "2025",
    metric: "Trained on IPL 2008–2024",
    pipeline: ["2008–2024 seasons", "Random Forest", "Flask API", "win probability"],
    techStack: ["Python", "scikit-learn", "pandas", "Flask", "React"],
    github: `${GH}/IPL_api`,
    liveLink: "https://ipl-match-predictor1.vercel.app",
  },
];

export interface ArchiveItem {
  name: string;
  year: string;
  description: string;
  github: string;
}

export const ARCHIVE: ArchiveItem[] = [
  { name: "LeetCode Solutions", year: "2026", description: "156 problems solved in Python, SQL and JavaScript", github: `${GH}/leetcode-submissions` },
  { name: "n8n Outreach Automation", year: "2026", description: "Groq-written emails from Google Sheets to Gmail drafts", github: `${GH}/n8n-workflows` },
  { name: "Instructor Effectiveness", year: "2026", description: "EdTech classification model", github: `${GH}/Instuctor-effectiveness-jupyter-notebook-` },
  { name: "AutoBlog", year: "2025", description: "Wipro GenAI pipeline: video to docs, 75% fewer frames, ~40% faster", github: `${GH}/autoblog` },
  { name: "Discord Clone", year: "2025", description: "Real-time chat on FastAPI WebSockets", github: `${GH}/Discord-clone` },
  { name: "genHMR", year: "2025", description: "Seamly v2 experiment with TokenHMR", github: `${GH}/genHMR` },
  { name: "SMS Spam Classifier", year: "2025", description: "NLP classifier comparing 11 models", github: `${GH}/SMS-spam-classifier` },
  { name: "Car Price Predictor", year: "2025", description: "Regression model comparison", github: `${GH}/Car-Price-Predictor` },
  { name: "Credit Risk EDA", year: "2025", description: "Exploratory analysis of loan defaulters", github: `${GH}/Credit-EDA` },
  { name: "Portfolio v1", year: "2025", description: "macOS-themed portfolio", github: `${GH}/portfolio` },
];
