import BillSplitter from "./imgs/Bill-splitter.png";
import BookList from "./imgs/bookList.jpg";
import playmate from "./imgs/playmate.png";
import gmeet from "./imgs/gmeet.png";
import strideCirclePreview from "./stride-circle-preview.png";
import prepviaPreview from "./prepvia-preview.png";
import codeglyphPreview from "./codeglyph-preview.png";
import seamlyPreview from "./seamly-preview.png";
import releaseLensPreview from "./releaselens-preview.png";
import billSplitPreview from "./billsplit-preview.png";
import iplPredictionPreview from "./ipl-prediction-preview.png";

export type Category =
  | "AI/ML"
  | "Full-Stack"
  | "Data Science"
  | "Computer Vision"
  | "Frontend"
  | "Extensions";

export interface Project {
  image: string;
  heading: string;
  description: string;
  techStack: string[];
  github: string;
  liveLink: string;
  category: Category;
}

export const projectSlug = (project: Project) =>
  project.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const ProjectData: Project[] = [
  {
    image: releaseLensPreview,
    heading: "ReleaseLens",
    description:
      "AIOps and release-intelligence platform ingesting 519K+ historical CI builds and repository signals for pre-deployment risk analysis, with Airflow ETL, dbt marts, XGBoost scoring, MLflow tracking, and OpenTelemetry-driven root-cause analysis.",
    techStack: [
      "Python",
      "FastAPI",
      "Airflow",
      "dbt",
      "AWS S3",
      "PostgreSQL",
      "XGBoost",
      "MLflow",
    ],
    github: "https://github.com/ayushman46",
    liveLink: "",
    category: "Data Science",
  },
  {
    image: codeglyphPreview,
    heading: "CodeGlyph",
    description:
      "Production codebase-intelligence SaaS used by 25+ users, combining hybrid retrieval, dependency graphs, and agentic editing to return grounded answers with file- and line-level citations.",
    techStack: [
      "Python",
      "FastAPI",
      "React",
      "RAG",
      "LLMs",
      "Vector Search",
      "Supabase",
      "GitHub API",
    ],
    github: "https://github.com/ayushman46/CodeGlyph",
    liveLink: "",
    category: "AI/ML",
  },

  {
    image: prepviaPreview,
    heading: "Prepvia",
    description:
      "Real-time AI interview platform that delivered 50+ sessions with WebSockets, live speech-to-text, adaptive follow-up questions, MongoDB persistence, and provider failover across Groq, DeepSeek, and Gemini.",
    techStack: [
      "Python",
      "AI Agents",
      "LLMs",
      "Speech AI",
      "NLP",
      "FastAPI",
    ],
    github: "https://github.com/ayushman46/Prepvia",
    liveLink: "",
    category: "AI/ML",
  },

  {
    image: seamlyPreview,
    heading: "Seamly",
    description:
      "Cricket biomechanics platform that performs human mesh recovery from broadcast videos to generate 3D pose estimation, bowling metrics, and performance analysis for coaches and athletes.",
    techStack: [
      "Python",
      "MediaPipe",
      "SPIN",
      "SMPL",
      "OpenCV",
      "Computer Vision",
      "Streamlit",
    ],
    github: "https://github.com/ayushman46/bowling_analysis",
    liveLink: "",
    category: "Computer Vision",
  },

  {
    image: strideCirclePreview,
    heading: "StrideCircle",
    description:
      "Social running platform that turns workouts into competitive group challenges with live leaderboards, smart scoring, progress tracking, and AI-powered coaching.",
    techStack: [
      "JavaScript",
      "Full-Stack",
      "AI",
      "Data Analytics",
      "REST APIs",
    ],
    github: "https://github.com/ayushman46/StrideCircle",
    liveLink: "",
    category: "Full-Stack",
  },

  {
    image: BillSplitter,
    heading: "AutoBlog",
    description:
      "AI-powered content automation platform that transforms long-form technical content into structured and readable blog posts using large language models and automated content-processing pipelines.",
    techStack: [
      "Python",
      "LLMs",
      "NLP",
      "Generative AI",
      "Automation",
    ],
    github: "https://github.com/ayushman46/autoblog",
    liveLink: "",
    category: "AI/ML",
  },

  {
    image: BookList,
    heading: "RAG Document QA",
    description:
      "Retrieval-Augmented Generation application that retrieves relevant information from documents and generates context-aware answers grounded in retrieved source material.",
    techStack: [
      "RAG",
      "LLMs",
      "Embeddings",
      "Vector Search",
      "NLP",
      "JavaScript",
    ],
    github: "https://github.com/ayushman46/RAG",
    liveLink: "",
    category: "AI/ML",
  },

  {
    image: iplPredictionPreview,
    heading: "IPL Match Predictor",
    description:
      "Machine learning system trained on historical IPL match data to predict match outcomes using team information, match conditions, feature engineering, and ensemble classification.",
    techStack: [
      "Python",
      "Scikit-learn",
      "Random Forest",
      "Pandas",
      "NumPy",
      "Machine Learning",
    ],
    github: "https://github.com/ayushman46/IPL_api",
    liveLink: "",
    category: "Data Science",
  },

  {
    image: billSplitPreview,
    heading: "Bill Split AI",
    description:
      "AI-assisted expense splitting application designed to simplify shared bill calculations, expense tracking, and settlement workflows between multiple users.",
    techStack: [
      "AI",
      "AWS",
      "IBM Cloud",
      "Microservices",
      "REST APIs",
    ],
    github: "https://github.com/ayushman46",
    liveLink: "",
    category: "AI/ML",
  },

  {
    image: playmate,
    heading: "Machine Learning Projects",
    description:
      "Collection of applied machine learning experiments covering data preprocessing, feature engineering, model training, evaluation, and predictive analytics workflows.",
    techStack: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Machine Learning",
    ],
    github: "https://github.com/ayushman46",
    liveLink: "",
    category: "Data Science",
  },

  {
    image: gmeet,
    heading: "AI & Data Experiments",
    description:
      "Collection of experiments exploring artificial intelligence, data processing, model development, APIs, and practical software engineering workflows.",
    techStack: [
      "Python",
      "AI",
      "Data Science",
      "APIs",
      "Machine Learning",
    ],
    github: "https://github.com/ayushman46",
    liveLink: "",
    category: "AI/ML",
  },
];
