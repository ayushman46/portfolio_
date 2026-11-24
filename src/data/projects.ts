// Project data. Every claim below was re-verified against each project's code,
// README/docs, the live deployment and the GitHub API on 2026-11-05. Numbers come
// from the projects' own measured runs (README, docs/, STATUS.md, progress.md);
// none are estimates. Live links were checked with an HTTP request the same day.
//
// Resume-only figures with no contradiction in the code are kept and marked here:
// CodeGlyph 30+ users, Prepvia 100+ users / 50+ completed interviews, the Bosch
// hackathon Top 5 (ChaosAI), and all of MandateGraph (no public repo yet).
//
// Array order is display order: products with real users first, then the rest.
// The first four entries are the home page's featured projects.

import codeGlyphImg from "../assets/projects/codeglyph.webp";
import prepviaImg from "../assets/projects/prepvia.webp";
import strideCircleImg from "../assets/projects/stride-circle.webp";
import twtdashImg from "../assets/projects/twtdash.webp";
import seamlyImg from "../assets/projects/seamly.webp";
import trainingenieImg from "../assets/projects/trainingenie.webp";
import settleImg from "../assets/projects/settle.webp";

export const CATEGORIES = ["AI/ML", "Data", "Full-Stack", "Computer Vision"] as const;
export type Category = (typeof CATEGORIES)[number];

/** One measured figure from a project's own tests, benchmarks or eval runs. */
export interface ProofFigure {
  value: string;
  label: string;
}

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
  /** Verified proof figures, shown as the "By the numbers" block on the project page. */
  numbers?: ProofFigure[];
  /**
   * Stages of the system, drawn as the card figure when a project has no `image`
   * and as the "How it works" flow on the project page. From 1024px the whole flow sits on
   * one line, so keep it short: six stages up to ~48 characters in all, or five up to ~58.
   */
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
      "Cited code-intelligence SaaS for any public GitHub repo, used by 30+ users. Ask a question and get a streamed answer pinned to checked file:line ranges; describe a change or link an issue and an agent opens a validated multi-file pull request. Live as Codebase Intel.",
    highlights: [
      "Answers you can check: 131/133 citations correct and 0 false existence claims in a blind 18-question A/B. Every path:Lx-Ly citation and backticked name is checked against the index, named files are traced through imports to their real definitions, and anything invented is flagged with a reason.",
      "Finds the right code: 62/64 targets hit on the retrieval eval set. Hybrid retrieval fuses FTS5 keywords (4× path weight), file-level vectors with a chunk rerank, path hints and the import graph through reciprocal-rank fusion, then follows imports to their definitions.",
      "Searchable in seconds: a Turso FTS5 keyword index lands first while 2,048-dim NVIDIA Nemotron Embed vectors and an import graph build in the background. sindresorhus/ky is keyword-searchable in ~5 s and fully indexed in 36 s.",
      "Indexes repos of up to 10,000 files: it streams the GitHub tarball at a pinned commit, ranks files within byte and chunk budgets, and splits code by declaration (Python, JS/TS, Go, Rust, Java and more) with exact line ranges. SHA-256 manifests re-index only what changed, and a coverage report lists every omission.",
      "From request or GitHub issue to pull request: the edit agent plans the change, reads the live files, writes search/replace hunks and opens one atomic commit, via a fork when you lack write access. Deterministic gates check the patch first: tree-sitter grammars for 13 languages, esbuild, and AST, JSON, TOML and YAML parsers.",
      "Safe to give repo access: a push needs a signed, short-lived ticket scoped to the user, repo, file set and reviewed blob SHAs. GitHub tokens are Fernet-encrypted at rest, team invite links store only SHA-256 hashes of 256-bit tokens, and Razorpay Team-plan payments are verified server-side.",
      "Runs on a 512 MB Render instance: a memory guard trims buffers at 350 MB and pauses work at 450 MB, a durable Turso job queue uses leases and heartbeats, 8 of 40 NVIDIA calls a minute stay reserved for live questions, and search degrades to keyword-only if embeddings fail.",
    ],
    category: "AI/ML",
    year: "2026",
    image: codeGlyphImg,
    metric: "30+ users · 10,000-file repos · 131/133 citations correct",
    numbers: [
      { value: "10,000", label: "files per repo (100 MB, 15,000 sections)" },
      { value: "62/64", label: "targets hit on the retrieval eval set" },
      { value: "131/133", label: "citations correct in a blind A/B" },
      { value: "1,428", label: "backend tests passing" },
      { value: "389 + 86", label: "frontend unit + Playwright E2E tests" },
      { value: "13", label: "languages syntax-checked before a PR" },
    ],
    pipeline: ["tarball", "chunk", "FTS5 + vectors", "RRF", "cited answer", "agent PR"],
    techStack: [
      "Python",
      "FastAPI",
      "RAG",
      "NVIDIA NIM",
      "React",
      "Turso",
      "tree-sitter",
      "GitHub API",
      "Razorpay",
      "Playwright",
    ],
    // The live app runs this branch; `main` still holds the October snapshot.
    github: `${GH}/CodeGlyph/tree/ux-polish-and-pr-flow`,
    liveLink: "https://codebase-rag-qu7s.onrender.com",
  },
  {
    slug: "prepvia",
    heading: "Prepvia",
    description:
      "Voice-first AI mock-interview platform with 100+ users and 50+ completed interviews. An AI interviewer runs a timed, adaptive spoken interview from your resume and the job description, with a live coding canvas and an evidence-quoting scorecard. Live as InterviewAI.",
    highlights: [
      "Feels like a conversation: a spoken turn takes 1.6–2.3 s end to end (median 1.88 s), including the 800 ms silence window. In-browser Silero VAD detects the end of a turn, Groq Whisper starts transcribing after 350 ms of silence with vocabulary primed from the resume and JD, and Edge neural TTS speaks sentence by sentence from a warm socket pool.",
      "Free-tier queue spikes of 7–12 s no longer stall the interview: NVIDIA Nemotron 3 Super streams the reply, and if no token arrives within 800 ms the request is hedged to Nemotron 3.5 Lightning, with Groq Llama 3.3 70B as the fallback.",
      "A 20-minute interview on serverless functions: each turn is one stateless POST streaming NDJSON, chosen over WebSockets because Vercel functions can't hold a long socket. Audio plays in order with captions, and the candidate can interrupt (~0.4 s) without the interviewer's own voice triggering it.",
      "Rated 4.78/5 by an LLM judge across 5 personas, with filler-praise openers cut from 22% to 0%. Guards enforce one question per turn, catch repeats and parroting, block goodbyes before the wrap-up, and repair and validate the model's JSON.",
      "Hands-on round: a role-specific coding, SQL or writing task in a CodeMirror canvas (C++, Go, Java, JavaScript, Python, SQL). The scorecard rates each competency 1–5 with quotes from the transcript and scores a strong vs a vague candidate 78 to 28.",
      "0 errors across 450 turns at 50 concurrent candidates (11.5 turns/s). Functions are pinned to Mumbai (bom1) beside MongoDB Atlas, cutting round trips from ~200 ms to ~25 ms, and merging database writes added ~44% throughput.",
      "Private by default: 128-bit random interview IDs, noindex pages, rate limits keyed on hashed IPs, a 30-day TTL on every session and 0 npm audit vulnerabilities.",
    ],
    category: "AI/ML",
    year: "2026",
    image: prepviaImg,
    metric: "100+ users · 50+ interviews · 1.88 s median voice turn",
    numbers: [
      { value: "1.88 s", label: "median voice turn, end to end" },
      { value: "~190 ms", label: "from Start to the greeting being heard" },
      { value: "~0.4 s", label: "to yield when the candidate barges in" },
      { value: "0 errors", label: "450 turns at 50 concurrent candidates" },
      { value: "~246 ms", label: "Nemotron time to first token (p50)" },
      { value: "4.78/5", label: "LLM-judge interview quality, 5 personas" },
    ],
    pipeline: ["VAD", "Whisper STT", "hedged LLM", "Edge TTS", "NDJSON", "scorecard"],
    techStack: [
      "Next.js",
      "TypeScript",
      "NVIDIA NIM",
      "Groq Whisper",
      "MongoDB",
      "Silero VAD",
      "Edge TTS",
      "CodeMirror",
      "Vercel",
      "Playwright",
    ],
    // The live Next.js app is on this branch; `main` is the earlier FastAPI version.
    github: `${GH}/Prepvia/tree/feature/vercel-live-interviews`,
    liveLink: "https://prepviaai.vercel.app",
  },
  {
    slug: "releaselens",
    heading: "ReleaseLens",
    description:
      "Release-intelligence platform. Before a deploy it scores CI build-failure risk 0–100 with SHAP reasons, from an XGBoost model trained on 128,819 real CI builds (PR-AUC 0.811); after it, OpenTelemetry trace comparisons name a regression's probable origin and blast radius. Built and verified locally; not yet deployed.",
    highlights: [
      "Predicts CI build failures with PR-AUC 0.811 against a 0.279 base rate (ROC-AUC 0.881, Brier 0.109) and 0.825 on held-out projects. XGBoost on 34 pre-build features, Optuna-tuned and trained on 128,819 Java builds from 402 projects with a time-based split; the champion is registered in MLflow with a model card.",
      "360,770 CI builds (2.64M job rows, 1,300 projects) ingested: an Airflow DAG lands the md5-verified TravisTorrent archive as Parquet on S3-compatible storage (MinIO), and dbt-duckdb builds staging, history and feature marts guarded by 94 dbt tests.",
      "No leakage, no false confidence: a past build counts only if it finished before the current one started, Hypothesis property tests check features against a naive oracle, and a calibration gate (ECE 0.0155) decides whether a probability is shown at all. A dataset audit rejected a 200,561-build release whose source churn was 0 on 99% of builds.",
      "Scores a change with SHAP reasons in p50 22 ms / p95 40 ms from a FastAPI service, fed by a GitHub Action that extracts change facts. A GitHub App that posts Check Runs is built and tested against fixtures.",
      "Ingests 4,000 spans/s at p95 14.6 ms with all 80,100 spans persisted: deploy events and OTLP traces stream through Kafka (KRaft) into Postgres spans, edges and minute rollups.",
      "Named the right service with HIGH confidence ~6.3 min after a demo deploy pushed payment p95 from 104 to 352 ms. Statistical gates (sample size, relative and absolute deltas, bootstrap CI, z-test or Fisher), self-time that excludes outbound waits and a trace-built service graph give the probable origin and blast radius.",
      "Built like a SaaS: Postgres row-level security on all 21 tenant tables, RBAC route-matrix tests, hashed API keys, CSRF and encrypted Slack webhooks; gitleaks, Trivy, pip-audit and bandit on every push; 23 ADRs, a 24-service Compose stack and a Next.js dashboard with a service map.",
    ],
    category: "Data",
    year: "2026",
    // No screenshot on purpose: the old releaselens.webp was a concept mock ("Root Cause Analysis",
    // invented health and confidence figures), not the real dashboard, which says "probable origin".
    metric: "360K+ CI builds ingested · PR-AUC 0.811 · p95 40 ms risk API",
    numbers: [
      { value: "360K+", label: "CI builds ingested (2.64M job rows, 1,300 projects)" },
      { value: "128,819", label: "Java builds across 402 projects for training" },
      { value: "0.811", label: "PR-AUC on a 0.279 base rate" },
      { value: "40 ms", label: "p95 risk-scoring latency at 8 req/s" },
      { value: "80,100", label: "spans persisted at 4,000 spans/s, p95 14.6 ms" },
      { value: "907", label: "unit tests, plus 694 integration and 353 web" },
    ],
    pipeline: ["Airflow + dbt", "XGBoost", "risk API", "OTel + Kafka", "probable origin"],
    writeup: "from-ci-data-to-release-risk",
    techStack: [
      "Python",
      "XGBoost",
      "Airflow",
      "dbt",
      "Kafka",
      "OpenTelemetry",
      "MLflow",
      "FastAPI",
      "PostgreSQL",
      "DuckDB",
      "MinIO (S3)",
      "Next.js",
    ],
    github: `${GH}/releaselens`,
  },
  // No public repo, live link or screenshot yet: shown as "In progress". Every claim is from the resume.
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
      "Local-first browser extension for Chrome, Edge, Brave, Arc and Firefox that turns your X bookmarks into a fast, searchable library sorted on-device into 18 categories. Works in English, Hindi and eight more Indian languages.",
    highlights: [
      "No X API key needed: a Manifest V3 content script reads the GraphQL responses x.com already loads (bookmarks, folders, new saves). It never sends or changes a request, and X Premium folders import as collections.",
      "Search keeps up at scale: 42 ms per keystroke at 10,000 posts and 150 ms at 50,000, using an index-free scan with operators (from:, cat:, has:) over Dexie / IndexedDB. Virtualized grid, list, table and gallery views scroll at 59.5 FPS, with a ⌘K palette.",
      "Startup cut from 43.0 s to 12.9 s and heap from 55 to 26 MB under a 4× CPU throttle, measured before and after each change. Jumping to the oldest of 10,000 posts takes 81 ms, and a 400-visit memory soak keeps DOM nodes flat.",
      "Sorts on-device into 18 categories from post text, link cards and quoted posts. Eight Brahmic scripts are folded onto Devanagari, so one keyword matches across Indian languages and romanized Hindi.",
      "Survives hostile input: the parser handles current and legacy X data shapes and is fuzzed with 2,700 malformed payloads that must not crash it; 13 hostile backup files are rejected, and CSV export is guarded against formula injection.",
      "Turns saves into learning: spaced-repetition Recall, a resource Shelf exportable as Markdown, Wrapped and Insights, plus optional Ask answers cited to the original posts, translation and AI sorting via NVIDIA Nemotron.",
      "Tested like a product: 437 unit tests, 339 end-to-end browser checks, and 0 axe-core violations on 10 screens in both themes on desktop and phone. The Next.js website passes 723 automated checks plus 181 API checks and scores 100 on Lighthouse accessibility, best practices and SEO.",
    ],
    category: "Full-Stack",
    year: "2026",
    image: twtdashImg,
    metric: "42 ms per keystroke at 10,000 posts · 437 unit + 339 E2E tests",
    numbers: [
      { value: "42 ms", label: "per keystroke at 10,000 posts (150 ms at 50,000)" },
      { value: "12.9 s", label: "startup at 4× CPU throttle, down from 43.0 s" },
      { value: "2,700", label: "fuzzed payloads the parser must survive" },
      { value: "437 + 339", label: "unit tests + end-to-end browser checks" },
      { value: "18", label: "on-device categories, 10 UI languages" },
      { value: "100", label: "Lighthouse accessibility, best practices, SEO" },
    ],
    pipeline: ["x.com GraphQL", "parse", "classify", "IndexedDB", "search", "Ask AI"],
    techStack: [
      "TypeScript",
      "React",
      "WXT (Manifest V3)",
      "Dexie",
      "Zustand",
      "Next.js",
      "Tailwind CSS",
      "NVIDIA NIM",
      "Vitest",
      "Puppeteer",
    ],
    github: `${GH}/twt`,
    liveLink: "https://twtdash.vercel.app",
  },
  {
    slug: "seamly",
    heading: "Seamly",
    description:
      "In-browser bowling coach: film one delivery on a phone and get the key moments, a 3D rebuild of the action, ball speed and angles rated against published research. The video never leaves the device.",
    highlights: [
      "Accurate on real deliveries: release lands within one frame on 7 of 8 hand-marked clips, the front knee within ~4° and trunk lean within ~2°. It marks back-foot contact, front-foot contact, release and follow-through, then rates each angle against published research with a back-health check.",
      "Runs entirely in the browser, so the video never leaves the phone: YOLO11n-pose on every frame through ONNX Runtime Web (WebGPU, with a WebAssembly fallback), camera-motion-compensated tracking with Hungarian assignment, and an arm-sweep rule (~270–360°) that picks out the bowler.",
      "3D from a single phone: YOLO11s-pose refines the bowler crop (flip test-time augmentation, Hampel outlier removal, left/right swap repair, Butterworth filter), MotionBERT-Lite (int8) lifts the pose to 3D at 50 fps, and an L-BFGS fit holds bone lengths constant with a knee hinge.",
      "364 parity tests hold the TypeScript port to the Python engine: recorded fixtures cover events, metrics, coaching and body binaries, and the skeleton fit matches to about 1 mm.",
      "Two phones, one ball: side-on and behind-the-stumps clips are aligned at release, each metric comes from the camera that sees its plane, and a clip recorded at the wrong speed is detected and fixed in one click.",
      "Pace without radar: the ball is timed from release to the batter over the fixed pitch length, and the reported range holds the true speed 92–100% of the time in simulation. A no-ball check has a ±5–8 cm too-close-to-call band, and the workload plan follows Cricket Australia's junior guidelines.",
      "Works offline as a PWA: a service worker precaches the app, and ~70 MB of models load from a commit-pinned CDN (the 40 MB detector split in two and joined in the browser). Clips under 20 distinct fps are refused, and angled views get no rating rather than a wrong one.",
    ],
    category: "Computer Vision",
    year: "2026",
    image: seamlyImg,
    metric: "Release within 1 frame on 7/8 real clips · 364 parity tests",
    numbers: [
      { value: "7/8", label: "real clips with release within one frame" },
      { value: "~4°", label: "front-knee error on hand-marked clips" },
      { value: "364", label: "parity tests against the Python engine" },
      { value: "~1 mm", label: "skeleton fit vs the Python engine" },
      { value: "92–100%", label: "of simulated balls inside the pace range" },
      { value: "~15–30 s", label: "per clip on a laptop, all in the browser" },
    ],
    pipeline: ["video", "YOLO11 pose", "tracking", "MotionBERT 3D", "events", "coach"],
    techStack: [
      "TypeScript",
      "React",
      "ONNX Runtime Web",
      "WebGPU",
      "YOLO11",
      "MotionBERT",
      "three.js",
      "Python",
      "FastAPI",
      "PyTorch",
    ],
    // The in-browser rewrite lives on the seamly-web branch (not yet merged into main).
    github: `${GH}/Seamly/tree/seamly-web`,
    liveLink: "https://seamly-cricket.vercel.app",
  },
  {
    slug: "settle",
    heading: "Settle",
    description:
      "Mobile-first PWA and Android app to split any bill in India and get paid back over UPI, in 8 languages. AI reads the bill, the maths is exact to the paisa, and there's no sign-up and no database.",
    highlights: [
      "Reads a bill in seconds: a 7-item restaurant bill took 4.4 s in a live check. Snap a photo, paste a Swiggy or Zomato order, say \"dhai hazaar ka dinner\" or use a bank SMS; a Hono API tries NVIDIA Nemotron vision and text models in order (3.5 Super VL, 3 Nano Omni, 3.5 Lightning).",
      "Exact to the paisa: all maths runs in integer paise across six split modes, with largest-remainder rounding and proportional tax and tip. Balances always sum to zero, and a greedy matcher settles any group in at most n−1 payments, each with its own UPI QR.",
      "Auto-settles on Android: a Capacitor 8 app with a native Java NotificationListener plugin matches incoming GPay, PhonePe, Paytm and BHIM alerts to whoever owed that amount, with Undo. Alerts are read on the phone and never uploaded.",
      "\"Who's paid?\" reconciles repayments in one go from UPI screenshots (AI), CSV/XLSX bank statements or bank SMS. Stuck money encodes RBI turnaround rules (T+1 / T+5, ₹100 a day compensation) and drafts each step of the complaint, from the bank to the RBI Ombudsman.",
      "India-specific tools: Fair bijli splits electricity by tariff slab with 10 built-in tariffs (BESCOM, MSEDCL and more), HRA rent receipts follow PAN and revenue-stamp rules, and Bill check flags a default service charge (CCPA 2022) and GST charged on it.",
      "Pro with no database: the server re-reads the Razorpay order, then issues an Ed25519-signed licence the app verifies on the device. The split itself travels in the URL fragment, so the server never sees it; strict CSP, HSTS and per-visitor rate limits.",
      "5,081 unit and component tests and 364 end-to-end journeys on the production build (360 and 390 px, both themes) across 4 CI shards. A 300-expense group opens in 1.6 s on a budget-phone profile, down from 7.7 s.",
    ],
    category: "Full-Stack",
    year: "2026",
    image: settleImg,
    metric: "5,081 tests · 364 E2E journeys · 8 Indian languages",
    numbers: [
      { value: "5,081", label: "unit and component tests, 0 failing" },
      { value: "364", label: "end-to-end journeys on the production build" },
      { value: "8", label: "languages on every screen, voice in all 8" },
      { value: "1.6 s", label: "to open a 300-expense group (was 7.7 s)" },
      { value: "4.4 s", label: "AI read of a 7-item restaurant bill" },
      { value: "n − 1", label: "payments at most to settle a group of n" },
    ],
    pipeline: ["capture", "AI read", "paise split", "settle", "UPI QR", "reconcile"],
    techStack: [
      "React",
      "TypeScript",
      "Hono",
      "NVIDIA NIM",
      "Capacitor (Android)",
      "Java",
      "Zod",
      "Vite",
      "Vitest",
      "Playwright",
      "Razorpay",
    ],
    github: `${GH}/settle`,
    liveLink: "https://settleupi.vercel.app",
  },
  {
    slug: "stridecircle",
    heading: "StrideCircle",
    description:
      "Turns Strava runs into private group challenges with effort-weighted scoring, weekly, monthly and all-time leaderboards, and AI coaching.",
    highlights: [
      "Strava OAuth 2.0 with token exchange and automatic refresh; sessions are HMAC-SHA-256-signed, HTTP-only cookies.",
      "Syncs Run, TrailRun and VirtualRun activities, incrementally or as a full lifetime backlog.",
      "Effort-weighted scoring: distance × a pace multiplier (1.1–1.6 for runs of 2 km or more), plus 1 point for every 20 m of climbing.",
      "Supabase Postgres with 7 tables behind a service-role backend, row-level security as a second guard, and weekly, monthly and all-time leaderboards computed in SQL views.",
      "Groups join with six-character invite codes. Weekly AI coaching from Groq Llama 3.1 8B compares this week with the last (cached for 24 h), and runs can be compared head to head with AI feedback.",
      "Serverless functions on Vercel, wrapped in Express for local development. CodeGlyph's edit agent has opened five pull requests on this repo.",
    ],
    category: "Full-Stack",
    year: "2026",
    image: strideCircleImg,
    metric: "Weekly, monthly and all-time leaderboards · Strava OAuth",
    pipeline: ["Strava OAuth", "sync runs", "effort score", "SQL leaderboards", "AI coach"],
    techStack: ["React", "JavaScript", "Supabase", "PostgreSQL", "Vercel Functions", "Strava API", "Groq", "TanStack Query"],
    github: `${GH}/StrideCircle`,
    liveLink: "https://stridecircle.vercel.app",
  },
  {
    slug: "trainingenie",
    heading: "TraininGenie",
    description:
      "Production marketing and enquiry website for a Bengaluru and Kolkata corporate-training company, built and launched as sole developer during my internship.",
    highlights: [
      "Static Next.js 16 App Router site: every route is prerendered to HTML with the React Compiler on, self-hosted fonts, and a strict production CSP (default-src 'self', form posts only to FormSubmit).",
      "Technical SEO and GEO: per-page metadata, canonical URLs and JSON-LD (Organization, Course, Service, FAQPage, BreadcrumbList), a sitemap and robots file, an llms.txt for AI engines and an IndexNow ping script.",
      "Open Graph share cards generated per training area and programme with next/og.",
      "Content kept as data: 7 programme pages, 4 training areas and 45 topics, searchable from a ⌘K palette with curated synonyms.",
      "Enquiry form with inline validation and a draft that survives a refresh, posted to FormSubmit, so there is no backend to run.",
      "Accessibility: skip link, focus management after navigation, a focus-trapped mobile menu, reduced-motion support and a print stylesheet, on a reusable shadcn/ui-style component library.",
    ],
    category: "Full-Stack",
    year: "2026",
    image: trainingenieImg,
    metric: "Sole developer · static Next.js 16 · SEO + GEO",
    pipeline: ["content data", "prerender", "JSON-LD", "llms.txt", "FormSubmit"],
    techStack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "shadcn/ui", "JSON-LD", "Vercel"],
    github: `${GH}/Trainingenie`,
    liveLink: "https://www.trainingenie.com",
  },
  {
    slug: "chaosai",
    heading: "ChaosAI",
    description:
      "Agentic chaos-engineering tool built for the Bosch (BGSW) hackathon: it plans, injects, observes and verifiably rolls back bounded faults against OpenMeter, treating LLM output as untrusted. Built with a teammate.",
    highlights: [
      "LangGraph state machine: plan → safety and preflight → baseline → inject and verify → observe → rollback and recovery → analyze and report.",
      "An NVIDIA LLM planner returns a JSON-mode plan that fails closed in real mode. Hard caps of 30 s, 2,000 ms added latency and 20 req/s, a target allowlist and one experiment at a time.",
      "Faults go only through an authenticated Chaos Control API with idempotency keys and a watchdog armed before activation, never raw Docker.",
      "Three proofs per run: controller activation evidence, measured impact (for example p95 +50 ms and ≥1.5× baseline) and rollback with functional recovery, where the metered event count must equal the accepted events. A run with no measurable impact is marked FAILED.",
      "Baseline probes send a synthetic CloudEvent to OpenMeter and confirm it in the meter query; a shared Pydantic Observer contract connects both teammates' services.",
      "Four fault types (application crash, network latency, service restart, traffic spike); mock mode is labelled and can never count as real proof.",
    ],
    category: "AI/ML",
    year: "2026",
    metric: "Top 5 · Bosch BGSW hackathon · 4 fault types with hard caps",
    pipeline: ["plan", "safety caps", "baseline", "inject", "observe", "rollback"],
    techStack: ["Python", "LangGraph", "FastAPI", "Pydantic", "NVIDIA NIM", "React", "Docker Compose", "OpenMeter"],
    github: `${GH}/Cloud_native_bosch`,
  },
  {
    slug: "rag-document-qa",
    heading: "Document QA",
    description:
      "Local, private RAG system that answers questions over scanned PDFs, tables included, with citations and an LLM-judged grounding check. Runs fully on-device with Ollama.",
    highlights: [
      "Layout-aware ingestion with unstructured (hi_res strategy), Tesseract OCR and Poppler, so scanned pages and tables become semantic chunks.",
      "Hybrid retrieval: FAISS dense vectors (nomic-embed-text) and BM25 combined in a LangChain EnsembleRetriever, then deduplicated, so exact terms and acronyms aren't lost to embeddings.",
      "Llama 3.2 via Ollama with a strict prompt template; a second LLM pass judges whether every claim is supported, and source pills show where each answer came from.",
      "Dockerised FastAPI backend that bundles the OCR binaries, plus a DocVQA-style ANLS benchmark harness.",
    ],
    category: "AI/ML",
    year: "2026",
    metric: "Runs fully on-device · hybrid FAISS + BM25 retrieval",
    pipeline: ["scanned PDF", "OCR", "FAISS + BM25", "Llama 3.2", "grounding check"],
    techStack: ["Python", "RAG", "LangChain", "FAISS", "BM25", "Ollama", "FastAPI", "Tesseract", "React", "Docker"],
    github: `${GH}/RAG`,
  },
  {
    // Keep the slug: /projects/ipl-match-predictor is in the sitemap.
    // No screenshot on purpose — the live site's landing page shows marketing
    // numbers that aren't backed by the repo. No accuracy figure is recorded anywhere.
    slug: "ipl-match-predictor",
    heading: "IPL Match Predictor",
    description:
      "Predicts IPL match winners and win probabilities from team form, venue and head-to-head history, trained on all 1,095 matches from 2008 to 2024.",
    highlights: [
      "Features from 1,095 matches: label-encoded teams, venue, city, toss winner and decision, season timing and toss-advantage signals.",
      "Random Forest (100 trees, max depth 10, 80/20 split) served through a Flask API on Render with three endpoints.",
      "React + TypeScript frontend on Vercel with recent-form, head-to-head and venue stats, and prediction history in Supabase.",
    ],
    category: "AI/ML",
    year: "2025",
    metric: "1,095 matches · IPL 2008–2024",
    pipeline: ["1,095 matches", "features", "Random Forest", "Flask API", "win probability"],
    techStack: ["Python", "scikit-learn", "pandas", "Flask", "React", "TypeScript", "Supabase"],
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
  // Oct 2025, before Seamly's first version (Dec 2025): an early prototype, not a later experiment.
  { name: "genHMR", year: "2025", description: "Early Seamly prototype (Khel-Metrics): TokenHMR + SMPL mesh recovery", github: `${GH}/genHMR` },
  { name: "SMS Spam Classifier", year: "2025", description: "NLP classifier comparing 11 models", github: `${GH}/SMS-spam-classifier` },
  { name: "Car Price Predictor", year: "2025", description: "Regression model comparison", github: `${GH}/Car-Price-Predictor` },
  { name: "Credit Risk EDA", year: "2025", description: "Exploratory analysis of loan defaulters", github: `${GH}/Credit-EDA` },
  { name: "Portfolio v1", year: "2025", description: "macOS-themed portfolio", github: `${GH}/portfolio` },
];
