import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Inter as substitute for PP Neue Montreal (Weight 300 acts as 350, 400 for buttons)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayushman Chakraborty — AI Engineer",
  description: "Portfolio of Ayushman Chakraborty. Building intelligent software powered by AI. Designing scalable systems that transform ideas into production-ready products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-off-white text-off-black relative font-sans">
        {children}
      </body>
    </html>
  );
}
