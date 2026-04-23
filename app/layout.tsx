import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import ScrollProgress from "./components/ScrollProgress";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Ayushman Chakraborty — Machine Learning Engineer",
  description:
    "Portfolio of Ayushman Chakraborty. Machine Learning Engineer specializing in agentic systems, multimodal AI, and MLOps. Engineering AI for the real world.",
  keywords: [
    "Machine Learning",
    "AI Engineer",
    "MLOps",
    "Portfolio",
    "Ayushman Chakraborty",
  ],
  openGraph: {
    title: "Ayushman Chakraborty — ML Engineer",
    description:
      "Engineering AI for the real world. Agentic systems, multimodal AI, and MLOps.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="min-h-screen bg-[#0a0a0a] text-white font-[family-name:var(--font-inter)] selection:bg-white selection:text-black relative">
        {/* Film Grain Overlay */}
        <svg 
          className="pointer-events-none fixed isolate z-50 opacity-20 mix-blend-soft-light inset-0 w-full h-full"
          aria-hidden="true"
        >
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>

        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
