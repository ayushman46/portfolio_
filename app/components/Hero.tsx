"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const lineVariants = {
  hidden: {
    y: "120%",
    opacity: 0,
    rotateZ: 2,
  },
  visible: {
    y: 0,
    opacity: 1,
    rotateZ: 0,
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 },
  },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToWork = () => {
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden"
    >
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-5xl mx-auto"
      >
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/[0.04] rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="flex flex-col items-start text-left w-full">
          {/* Refined Name with Mask Reveal */}
          <div className="overflow-hidden mb-12 py-2">
            <motion.h1
              variants={lineVariants}
              className="text-[clamp(3.5rem,9vw,8rem)] font-bold tracking-[-0.04em] leading-[0.9] text-white origin-bottom-left"
            >
              Ayushman
              <br />
              Chakraborty.
            </motion.h1>
          </div>

          {/* Elevated Architectural Grid (Reverting to the preferred layout structure but making it ultra-premium) */}
          <motion.div variants={fadeUp} className="relative flex flex-col md:flex-row items-start w-full max-w-5xl mt-12 md:mt-20">

            {/* Top Border with animated sweeping highlight */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/[0.08] overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ["-100%", "300%"] }}
                transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
              />
            </div>

            {/* Role Column */}
            <div className="flex flex-col gap-5 min-w-[280px] pt-10 md:pt-12 relative w-full md:w-auto">
              <div className="flex items-center gap-4">
                <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.4em]">Roles</span>
                <div className="h-[1px] flex-1 bg-white/[0.05]" />
              </div>
              <p className="text-white/90 text-xl font-medium tracking-tight">Machine Learning Engineer </p>
            </div>

            {/* Vertical Divider with Crosshairs (Desktop only) */}
            <div className="hidden md:block w-[1px] self-stretch bg-white/[0.08] mt-10 relative mx-8 lg:mx-16">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20 text-[10px] font-mono leading-none">+</div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-white/20 text-[10px] font-mono leading-none">+</div>
            </div>

            {/* Focus Column */}
            <div className="flex flex-col gap-5 pt-8 md:pt-12 w-full">
              <div className="flex items-center gap-4">
                <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.4em]">Focus</span>
                <div className="h-[1px] w-12 bg-white/[0.05]" />
              </div>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed font-light max-w-2xl">
                Engineering AI for the real world. Specializing in agentic systems, multimodal models, and end-to-end MLOps architectures designed for impact.
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-16 border-t border-white/[0.08] pt-8 w-full">
            <MagneticButton onClick={scrollToWork}>
              View the Engineering
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
