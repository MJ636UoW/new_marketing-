"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#040406]/90 backdrop-blur-md border-b border-[#00f0ff]/20 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* AER/0 Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 hud-border flex items-center justify-center font-display text-xs font-bold text-[#00f0ff] group-hover:border-[#ccff00] transition-colors">
            01
          </div>
          <div>
            <span className="font-display text-xl md:text-2xl font-extrabold tracking-widest text-[#f0f4f8]">
              AER<span className="text-[#00f0ff]">/0</span>
            </span>
            <span className="hidden sm:block text-[9px] font-display text-[#ccff00] tracking-widest">
              LABORATORY GRADE
            </span>
          </div>
        </a>

        {/* Live Telemetry Ticker (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 text-[10px] font-display text-[#64748b] border-x border-[#00f0ff]/15 px-6 py-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
            <span className="text-[#f0f4f8]">ATM: 3.1 BAR</span>
          </div>
          <span className="text-[#00f0ff]/40">|</span>
          <div>
            PURITY: <span className="text-[#00f0ff]">99.8%</span>
          </div>
          <span className="text-[#00f0ff]/40">|</span>
          <div>
            BATCH: <span className="text-[#ccff00]">01 RELEASE</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-display text-[#64748b]">
          <a
            href="#hero"
            className="hover:text-[#00f0ff] transition-colors tracking-wider"
          >
            01 // SYSTEM
          </a>
          <a
            href="#story"
            className="hover:text-[#00f0ff] transition-colors tracking-wider"
          >
            02 // STATE
          </a>
          <a
            href="#science"
            className="hover:text-[#00f0ff] transition-colors tracking-wider"
          >
            03 // SCIENCE
          </a>
          <a
            href="#formulas"
            className="hover:text-[#00f0ff] transition-colors tracking-wider"
          >
            04 // FORMULAS
          </a>
        </nav>

        {/* Action CTA */}
        <a
          href="#reserve"
          className="hud-border px-5 py-2 text-xs font-display font-semibold tracking-widest text-[#00f0ff] hover:text-[#040406] hover:bg-[#00f0ff] transition-all duration-300"
        >
          RESERVE BATCH
        </a>
      </div>
    </motion.header>
  );
}
