"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ModalType } from "./GlobalModals";
import { MagneticButton } from "./MagneticButton";
import { Polished3DFallback } from "../3d/Polished3DFallback";

const Scene3D = dynamic(() => import("../3d/Scene3D").then((m) => m.Scene3D), {
  ssr: false,
  loading: () => <Polished3DFallback />,
});

interface HeroSectionProps {
  onOpenModal: (modal: ModalType) => void;
}

const HERO_PARTICLES = [
  { id: 1, width: "2px", height: "2px", top: "15%", left: "18%", opacity: 0.3, duration: 5 },
  { id: 2, width: "3px", height: "3px", top: "35%", left: "75%", opacity: 0.4, duration: 7 },
  { id: 3, width: "2px", height: "2px", top: "65%", left: "12%", opacity: 0.25, duration: 6 },
  { id: 4, width: "4px", height: "4px", top: "82%", left: "84%", opacity: 0.35, duration: 8 },
  { id: 5, width: "2px", height: "2px", top: "42%", left: "48%", opacity: 0.45, duration: 5.5 },
  { id: 6, width: "3px", height: "3px", top: "22%", left: "88%", opacity: 0.3, duration: 6.5 },
  { id: 7, width: "2px", height: "2px", top: "72%", left: "38%", opacity: 0.2, duration: 7.5 },
  { id: 8, width: "3px", height: "3px", top: "10%", left: "62%", opacity: 0.4, duration: 8.5 },
];

export function HeroSection({ onOpenModal }: HeroSectionProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSecondaryClick = () => {
    const storySection = document.getElementById("story");
    if (storySection) {
      storySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const brandName = "AER/0";

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen pt-24 pb-12 flex flex-col justify-between hud-grid overflow-hidden bg-[#040406] selection:bg-[#00f0ff] selection:text-[#040406]"
    >
      {/* Deterministic Floating Background Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {HERO_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#00f0ff]"
            style={{
              width: p.width,
              height: p.height,
              top: p.top,
              left: p.left,
              opacity: p.opacity,
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0.15, p.opacity, 0.15],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[140px] bg-[#00f0ff]/20 pointer-events-none z-0"
        animate={{
          x: mousePos.x * 2.5,
          y: mousePos.y * 2.5,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        style={{
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex justify-between items-center z-10 font-display text-xs text-[#64748b]">
        <div className="hud-border px-3 py-1.5 flex items-center gap-2 bg-[#040406]/90 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
          <span className="text-[#00f0ff] font-bold tracking-widest text-[10px]">
            SYSTEM ACTIVE
          </span>
          <span className="text-[#64748b]/40">|</span>
          <span className="text-[10px] text-[#64748b]">ATM: 3.1 BAR</span>
        </div>

        <div className="hidden sm:flex items-center gap-1 font-display font-extrabold tracking-widest text-lg text-[#f0f4f8]">
          {brandName.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12 + 0.3, duration: 0.5 }}
              className={char === "/" ? "text-[#00f0ff]" : ""}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto z-10">
        <div className="lg:col-span-6 space-y-8">
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 text-xs font-display text-[#ccff00] tracking-widest border-l-2 border-[#ccff00] pl-3 py-0.5"
            >
              <span>A NEW STATE OF REFRESHMENT</span>
            </motion.div>
          </div>

          <div className="overflow-hidden space-y-1">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-7xl xl:text-8xl font-black tracking-tight text-[#f0f4f8] uppercase leading-none"
            >
              CHANGE <br />
              <span className="text-[#00f0ff] text-glow-cyan">YOUR STATE.</span>
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-base text-[#64748b] leading-relaxed max-w-md font-sans"
            >
              A sparkling functional drink engineered for the moment between ordinary and extraordinary.
            </motion.p>
          </div>

          <div className="overflow-hidden pt-2">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton
                onClick={() => onOpenModal("registration")}
                className="hud-border px-8 py-4 bg-[#00f0ff] text-[#040406] font-display text-xs font-black tracking-widest hover:bg-[#ccff00] transition-colors duration-300 shadow-[0_0_25px_rgba(0,240,255,0.4)]"
              >
                ENTER THE STATE
              </MagneticButton>

              <MagneticButton
                onClick={handleSecondaryClick}
                className="hud-border px-8 py-4 text-[#00f0ff] font-display text-xs font-bold tracking-widest hover:bg-[#00f0ff]/10 hover:text-[#f0f4f8] transition-all duration-300"
              >
                DISCOVER AER/0
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="lg:col-span-6 h-[500px] sm:h-[620px] lg:h-[700px] relative w-full flex items-center justify-center min-h-[400px]"
        >
          <Scene3D accentColor="#00f0ff" scale={1.3} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex justify-between items-center text-[10px] font-display text-[#64748b] pt-6 z-10 border-t border-[#00f0ff]/10">
        <span>[RESTRICTED ALLOCATION // BATCH 01]</span>

        <a
          href="#cinematic"
          className="flex items-center gap-3 text-[#00f0ff] hover:text-[#ccff00] transition-colors group cursor-pointer"
        >
          <span className="tracking-widest">SCROLL TO UNLOCK</span>
          <div className="w-4 h-8 hud-border flex flex-col items-center justify-start p-1 relative">
            <motion.div
              className="w-1 h-2 bg-[#00f0ff] rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </a>
      </div>
    </section>
  );
}
