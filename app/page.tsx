"use client";

import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import Architecture from "./components/Architecture";
import HorizontalScroll from "./components/HorizontalScroll";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <main className="noise-overlay relative z-0">
        <Hero />
        <Philosophy />
        <Architecture />
        <HorizontalScroll />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
