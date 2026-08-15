"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ModalType } from "./GlobalModals";

interface NavbarProps {
  onOpenModal: (modal: ModalType) => void;
}

export function Navbar({ onOpenModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        {/* AER/0 Brand Logo -> Scrolls to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-3 group text-left"
        >
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
        </button>

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
          <button
            onClick={() => scrollToSection("story")}
            className="hover:text-[#00f0ff] transition-colors tracking-wider"
          >
            01 // STORY
          </button>
          <button
            onClick={() => onOpenModal("formula")}
            className="hover:text-[#00f0ff] transition-colors tracking-wider"
          >
            02 // FORMULA
          </button>
          <button
            onClick={() => scrollToSection("formulas")}
            className="hover:text-[#00f0ff] transition-colors tracking-wider"
          >
            03 // FLAVORS
          </button>
          <button
            onClick={() => onOpenModal("registration")}
            className="hover:text-[#00f0ff] transition-colors tracking-wider"
          >
            04 // LAUNCH
          </button>
        </nav>

        {/* Action CTA */}
        <button
          onClick={() => onOpenModal("registration")}
          className="hud-border px-5 py-2 text-xs font-display font-semibold tracking-widest text-[#00f0ff] hover:text-[#040406] hover:bg-[#00f0ff] transition-all duration-300"
        >
          RESERVE BATCH
        </button>
      </div>
    </motion.header>
  );
}
