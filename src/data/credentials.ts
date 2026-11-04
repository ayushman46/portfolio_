// Awards and certifications. Every entry comes from the latest resume or a
// certificate / badge the user holds (verified 2026-11-02). Do not add entries
// without a source.
//
// `date` is an empty string when the resume does not state one: render it
// conditionally (`c.date && ...`).

export type Award = { title: string; org: string; detail: string };
export type Certification = { name: string; issuer: string; date: string; url?: string };

export const AWARDS: Award[] = [
  {
    title: "Top 5 teams",
    org: "Bosch (BGSW) Hackathon",
    detail: "Governing AI Agents",
  },
  {
    title: "Top 5 of 50 teams",
    org: "Hackverse Hackathon",
    detail: "IBM and AWS",
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Make Agentic AI Work for You",
    issuer: "IBM SkillsBuild",
    date: "Oct 2026",
    url: "https://www.credly.com/go/WPcLDSmS",
  },
  {
    name: "Computer Vision",
    issuer: "Kaggle Learn",
    date: "Nov 2026",
  },
  {
    name: "Intro to Deep Learning",
    issuer: "Kaggle Learn",
    date: "Nov 2026",
  },
  {
    name: "Model Context Protocol",
    issuer: "Anthropic",
    date: "",
  },
  {
    name: "MLOps, Deployment and Model Life Cycling",
    issuer: "DataCamp",
    date: "",
  },
];
