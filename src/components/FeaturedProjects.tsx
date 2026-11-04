import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ProjectData } from "../data/projects";
import ProjectCard from "./ProjectCard";
import AsciiScramble from "./AsciiScramble";

const featured = ProjectData.slice(0, 4);

const EASE = [0.16, 1, 0.3, 1] as const;

export const FeaturedProjects: React.FC = () => {
  return (
    <section aria-labelledby="sec-projects">
      <header className="sec-head">
        <span className="sec-index" aria-hidden>
          §04
        </span>
        <h2 id="sec-projects" className="sec-title">
          <span className="sec-title-muted">Featured</span> Projects
        </h2>
        <span className="leader" aria-hidden />
        <Link to="/projects" className="sec-action">
          <AsciiScramble text={`View all (${ProjectData.length}) →`} />
        </Link>
      </header>

      {/* 1024px+: a lead row, then three cards. 640–1023: the lead is a normal card in a 2×2. Phones: one column. */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {featured.map((project, idx) => (
          <motion.div
            key={project.slug}
            className={idx === 0 ? "lg:col-span-3" : undefined}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: idx * 0.06, duration: 0.5, ease: EASE }}
          >
            {/* the first row is near the fold: load those screenshots eagerly so they never paint blank */}
            <ProjectCard
              project={project}
              variant={idx === 0 ? "lead" : "default"}
              maxTech={3}
              priority={idx < 2}
              headingAs="h3"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
