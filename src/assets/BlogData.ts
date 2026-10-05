export interface Blog {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

export const BlogsData: Blog[] = [
  {
    slug: "from-ci-data-to-release-risk",
    title: "From CI Data to Release Risk",
    description: "How I am combining ETL, time-based validation, and observability in ReleaseLens.",
    date: "October 2, 2026",
    readTime: "2 min read",
    tags: ["AIOps", "Data Engineering", "Machine Learning"],
    content: `
ReleaseLens is an AIOps and release-intelligence platform built around a practical question: can historical CI and repository signals help teams identify deployment risk before a release?

The project starts with an Airflow-orchestrated ETL pipeline that turns heterogeneous CI and Git data into validated analytics marts on AWS S3 and dbt. From there, time-based validation keeps the XGBoost models honest and MLflow makes experiments reproducible.

The next layer is observability. OpenTelemetry connects deployments with latency and error regressions so a risk score can be paired with likely root cause and blast radius—not just a number.

This is the kind of engineering I enjoy most: turning messy operational data into systems that are useful to people making decisions.
    `,
  },
];
