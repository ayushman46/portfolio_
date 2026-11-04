import React, { Suspense, lazy } from "react";
import { motion } from "motion/react";
import Hero from "../components/Hero";
import ActivityCalendar from "../components/ActivityCalendar";
import ExperienceTimeline from "../components/ExperienceTimeline";
import SocialLinks from "../components/SocialLinks";
import FeaturedProjects from "../components/FeaturedProjects";
import OpenSource from "../components/OpenSource";
import StackMarquee from "../components/StackMarquee";
import NowTerminal from "../components/NowTerminal";
import Footer from "../components/Footer";
import ProofBoard from "../components/fx/ProofBoard";
import SignalPath from "../components/fx/SignalPath";
import SEO from "../components/SEO";
import { useBoot } from "../context/BootContext";
import "../styles/home-a.css";

// Last thing before the footer and never a jump target: safe to load as its own chunk.
const LedBoard = lazy(() => import("../components/fx/LedBoard"));

// Hero, then the contribution graph straight under it (§01); open source sits after the projects (§05).
const LEAD = [Hero, ActivityCalendar];
// Home sections run §01–§09 in reading order (shipped board §03, signal path §06).
const REST = [ExperienceTimeline, ProofBoard, FeaturedProjects, OpenSource, SignalPath, StackMarquee, NowTerminal, SocialLinks];

const EASE = [0.16, 1, 0.3, 1] as const;

// Reveal-only entrances: no filter blur (blur is reserved for the hero name and portrait).
const leadVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.55, ease: EASE },
  }),
};

const restVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const LEAD_CLASS = ["relative z-[1]", "relative z-[1] section section--first"];

export const Home: React.FC = () => {
  const { ready } = useBoot();
  return (
    <>
      <SEO
        title="Ayushman Chakraborty | AI Engineer & Software Developer"
        description="Ayushman Chakraborty is an AI and backend engineer in Bengaluru shipping LLM apps, RAG, agentic AI and data pipelines: GenAI at Wipro, two live AI products with 130+ users, and merged fixes in Better Auth and Corsair (YC W25)."
        path="/"
      />
      <main id="main" className="page relative antialiased">
        {/* Above the fold: revealed as soon as the boot intro hands over */}
        {LEAD.map((Section, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate={ready ? "visible" : "hidden"}
            variants={leadVariants}
            className={LEAD_CLASS[i]}
          >
            <Section />
          </motion.div>
        ))}

        {/* Below the fold: each section rises in once as it scrolls into view */}
        {REST.map((Section, i) => (
          <motion.div
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={restVariants}
            className="relative z-[1] section"
          >
            <Section />
          </motion.div>
        ))}
        {/* LED credentials sign, directly above the footer's dot-matrix signature */}
        <div className="relative z-[1] section">
          <Suspense fallback={<div aria-hidden style={{ minHeight: "8rem" }} />}>
            <LedBoard />
          </Suspense>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Home;
