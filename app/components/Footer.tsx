"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "./MagneticButton";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/ayushman-chakraborty",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ayushman-chakraborty",
  },
  {
    label: "Email",
    href: "mailto:ayushman.mitblr@gmail.com",
  },
];

const footerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  },
};

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <footer
      ref={sectionRef}
      id="connect"
      className="relative pt-24 pb-12 overflow-hidden border-t border-white/[0.04]"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-[0.04] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at bottom, rgba(255,255,255,1) 0%, transparent 70%)' }} />

      <motion.div
        variants={footerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full relative z-10"
      >
        {/* Infinite Marquee */}
        <div className="w-full overflow-hidden border-b border-white/[0.04] pb-10 mb-20">
          <div className="flex whitespace-nowrap marquee-container">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="text-white/20 text-xs md:text-sm uppercase tracking-[0.4em] font-mono mx-8 marquee-content">
                • AVAILABLE FOR NEW OPPORTUNITIES • ARCHITECTING INTELLIGENCE 
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto section-padding flex flex-col items-center text-center">
          <motion.p variants={itemVariants} className="text-white/40 text-xs md:text-sm uppercase tracking-[0.3em] font-mono mb-6">
            Got a complex problem?
          </motion.p>
          
          <motion.a
            variants={itemVariants}
            href="mailto:ayushman.mitblr@gmail.com"
            className="block text-[clamp(4rem,14vw,14rem)] font-bold tracking-tighter leading-[0.9] text-white/80 transition-colors duration-500 hover:text-white cursor-none"
            data-cursor-hover
          >
            LET&apos;S TALK
          </motion.a>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 mt-20 mb-32">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors duration-500 uppercase tracking-[0.2em] text-xs font-bold"
                data-cursor-hover
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto section-padding">
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-center gap-4 pt-10 border-t border-white/[0.06]"
          >
            <p className="text-[10px] text-white/20 tracking-[0.2em] font-mono uppercase text-center md:text-left">
              © {new Date().getFullYear()} AYUSHMAN CHAKRABORTY. ALL RIGHTS RESERVED.
            </p>
            <p className="text-[10px] text-white/20 tracking-[0.2em] font-mono uppercase text-center md:text-right">
              SYSTEM ONLINE
            </p>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
