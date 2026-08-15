import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AER/0 — Change Your State | Futuristic Functional Hydration",
  description: "AER/0 is a sparkling functional drink engineered for cellular state transformation. Precision bio-chemistry, atmospheric carbonation, zero compromise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${inter.variable} dark h-full antialiased`}>
      <body className="min-h-full bg-[#040406] text-[#f0f4f8] font-sans overflow-x-hidden selection:bg-[#00f0ff] selection:text-[#040406]">
        {children}
      </body>
    </html>
  );
}
