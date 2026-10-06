import React from "react";
import { Link, useParams } from "react-router";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import DockNavbar from "../components/DockNavbar";
import Footer from "../components/Footer";
import SEO, { PERSON_ID, SITE_URL } from "../components/SEO";
import { ProjectData, projectSlug } from "../assets/ProjectsData";

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = ProjectData.find((item) => projectSlug(item) === slug);

  if (!project) {
    return (
      <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
        <SEO
          title="Project not found | Ayushman Chakraborty"
          description="The requested project could not be found."
          path={`/projects/${slug ?? "unknown"}`}
          noindex
        />
        <main className="page pt-20">
          <h1 className="text-3xl font-semibold">Project not found</h1>
          <Link
            to="/projects"
            className="mt-5 inline-block text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            ← Back to projects
          </Link>
        </main>
        <DockNavbar />
      </div>
    );
  }

  const path = `/projects/${projectSlug(project)}`;
  const projectUrl = `${SITE_URL}${path}`;
  const repository = project.github.startsWith("https://github.com/ayushman46/")
    ? project.github
    : undefined;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      "@id": `${projectUrl}#software`,
      name: project.heading,
      description: project.description,
      url: projectUrl,
      creator: { "@id": PERSON_ID },
      ...(repository ? { codeRepository: repository } : {}),
      keywords: project.techStack.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
        { "@type": "ListItem", position: 3, name: project.heading, item: projectUrl },
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] antialiased">
      <SEO
        title={`${project.heading} | Ayushman Chakraborty`}
        description={project.description}
        path={path}
        structuredData={structuredData}
      />
      <main className="page pb-32">
        <article className="pt-8 sm:pt-12">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs text-[var(--text-muted)]">
            <Link to="/" className="hover:text-[var(--text-primary)]">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/projects" className="hover:text-[var(--text-primary)]">Projects</Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--text-primary)]">{project.heading}</span>
          </nav>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className="jetbrains-mono text-xs uppercase tracking-[0.18em] text-[var(--text-subtle)]">
                {project.category}
              </p>
              <h1 className="doto-font mt-2 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
                {project.heading}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-muted)]">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {repository && (
                  <a
                    href={repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-[var(--border-color)] bg-[var(--card-bg)] px-3 py-2 text-xs text-[var(--text-primary)] hover:border-[var(--text-muted)]"
                  >
                    <FaGithub /> View {project.heading} on GitHub
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-[var(--border-color)] bg-[var(--card-bg)] px-3 py-2 text-xs text-[var(--text-primary)] hover:border-[var(--text-muted)]"
                  >
                    <FiExternalLink /> Open live project
                  </a>
                )}
              </div>
            </div>

            <figure className="overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-sm">
              <img
                src={project.image}
                alt={`${project.heading} project interface by Ayushman Chakraborty`}
                className="h-auto max-h-[360px] w-full object-cover object-top"
                loading="eager"
              />
              <figcaption className="border-t border-[var(--border-color)] px-3 py-2 text-[10px] text-[var(--text-subtle)]">
                {project.heading} project preview
              </figcaption>
            </figure>
          </div>

          <section aria-labelledby="project-details" className="mt-10 border-t border-[var(--border-color)] pt-6">
            <h2 id="project-details" className="text-lg font-semibold text-[var(--text-primary)]">
              Project details
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
              {project.description} The implementation uses the technologies listed below and reflects Ayushman&apos;s work across AI engineering, backend systems, data workflows, and product development.
            </p>
            <h3 className="mt-6 text-sm font-semibold text-[var(--text-primary)]">Technology stack</h3>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${project.heading} technology stack`}>
              {project.techStack.map((technology) => (
                <li key={technology} className="jetbrains-mono rounded border border-[var(--border-color)] bg-[var(--badge-subtle-bg)] px-2 py-1 text-[10px] text-[var(--badge-subtle-text)]">
                  {technology}
                </li>
              ))}
            </ul>
          </section>
        </article>
        <Footer />
      </main>
      <DockNavbar />
      <div className="bottom-progressive-blur" />
    </div>
  );
};

export default ProjectDetail;
