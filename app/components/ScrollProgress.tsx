"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* Scroll track (background) */}
      <div className="fixed top-0 right-6 w-[1px] h-[calc(100vh-60px)] bg-white/[0.05] z-50 hidden md:block" />
      
      {/* Scroll progress (foreground) */}
      <motion.div
        className="fixed top-0 right-6 w-[1px] bg-gradient-to-b from-indigo-500 via-purple-400 to-white z-50 origin-top hidden md:block"
        style={{ scaleY, height: "calc(100vh - 60px)" }}
      />

      {/* Percentage indicator */}
      <div className="fixed bottom-4 right-3 w-8 text-center hidden md:block z-50 text-[10px] font-mono text-white/40 tracking-widest pointer-events-none">
        {percent.toString().padStart(2, '0')}
      </div>
    </>
  );
}
