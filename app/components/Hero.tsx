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
      
      {/* Immersive Centerpiece: Faded Image */}
      <div className="absolute inset-0 z-[-1] flex items-center justify-center pointer-events-none">
        <motion.div 
          style={{ y, opacity, scale }}
          className="relative w-full h-full flex items-center justify-center opacity-60 md:opacity-80"
        >
          <motion.img 
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            src="/hero-bg.png" 
            alt="Ayushman" 
            className="w-full h-full max-w-[1400px] object-cover md:object-contain blur-[1px]"
            style={{
              maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)',
            }}
          />
        </motion.div>
      </div>

      <div className="max-w-page mx-auto w-full px-[clamp(22px,5vw,69px)] relative z-10 flex flex-col items-center text-center mt-[15vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <span className="text-[10px] md:text-[12px] text-steel-gray mb-8 tracking-widest uppercase">
            Ayushman Chakraborty
          </span>
          <h1 className="text-[48px] md:text-[80px] text-off-black leading-[1.05] max-w-[900px] mb-8 font-[300]">
            Building intelligent software that feels invisible.
          </h1>
          <p className="text-[14px] md:text-[16px] text-steel-gray max-w-[480px] leading-[1.5]">
            AI Engineer specializing in large language models, autonomous agents, and multimodal perception. Translating complex research into elegant production systems.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
