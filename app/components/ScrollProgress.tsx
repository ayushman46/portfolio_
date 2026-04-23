"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Scroll track (background) */}
      <div className="fixed top-0 right-0 w-[2px] h-screen bg-white/[0.05] z-50 mix-blend-difference hidden md:block" />
      
      {/* Scroll progress (foreground) */}
      <motion.div
        className="fixed top-0 right-0 w-[2px] bg-white z-50 mix-blend-difference origin-top hidden md:block"
        style={{ scaleY, height: "100vh" }}
      />
    </>
  );
}
