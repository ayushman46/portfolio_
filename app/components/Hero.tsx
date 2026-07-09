"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.05]);

  return (
    <section className="min-h-[100vh] flex flex-col justify-center relative overflow-hidden">
      
      {/* Immersive Centerpiece: Right-Aligned Silhouette */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[65%] flex items-center justify-end pointer-events-none z-[-1]">
        <motion.div 
          style={{ y, opacity, scale }}
          className="relative w-full h-[90vh] flex items-center justify-end opacity-40 md:opacity-60"
        >
          <motion.img 
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            src="/hero-bg.png" 
            alt="Ayushman" 
            className="w-full h-full max-w-[900px] object-contain object-right blur-[1px] md:blur-[2px]"
            style={{
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 20%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 20%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)',
            }}
          />
        </motion.div>
      </div>

      <div className="max-w-page mx-auto w-full px-[clamp(22px,5vw,69px)] relative z-10 flex flex-col justify-end pb-[10vh] h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start text-left"
        >
          <h1 className="text-[36px] md:text-[64px] lg:text-[84px] text-[#111111] leading-[0.95] max-w-[980px] mb-4 md:mb-5 font-[400] tracking-[-0.06em]">
            Building intelligent systems<br />
            for scalable software
          </h1>
          <span className="text-[20px] md:text-[28px] text-[#5f5f5f] font-[500] font-ultraboldtracking-[-0.03em] leading-[1.35] max-w-[390px]">
            Ayushman Chakraborty
          </span>
        </motion.div>
      </div>
    </section>
  );
}
