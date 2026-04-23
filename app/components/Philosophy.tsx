"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHILOSOPHY_TEXT =
  "My perspective comes from focusing on how AI actually works in the real world, rather than just chasing theoretical accuracy metrics. From data structures to deployment, I build end to end systems designed for impact.";

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return;

    const words = textRef.current.querySelectorAll(".scrub-word");

    gsap.set(words, { opacity: 0.15 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 0.5,
      },
    });

    words.forEach((word, i) => {
      tl.to(
        word,
        {
          opacity: 1,
          duration: 0.3,
          ease: "none",
        },
        i * 0.05
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) {
          st.kill();
        }
      });
    };
  }, []);

  const words = PHILOSOPHY_TEXT.split(" ");

  const getWordStyle = (word: string) => {
    const cleanWord = word.replace(/[.,]/g, "").toLowerCase();
    const serifWords = ["ai", "real", "world", "impact"];
    if (serifWords.includes(cleanWord)) {
      return "font-serif italic font-medium";
    }
    return "font-light";
  };

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative py-40 md:py-56 section-padding"
    >
      {/* Architectural Background Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/[0.03] -translate-x-1/2 pointer-events-none" />

      {/* Section label */}
      <div className="max-w-6xl mx-auto mb-16 relative z-10 flex items-center justify-center">
        <div className="w-12 h-[1px] bg-white/20 mr-6" />
        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">
          02 — Philosophy
        </span>
        <div className="w-12 h-[1px] bg-white/20 ml-6" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <p
          ref={textRef}
          className="text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.3] tracking-tight"
        >
          {words.map((word, i) => (
            <span key={i} className={`scrub-word ${getWordStyle(word)}`} style={{ marginRight: '0.3em' }}>
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
