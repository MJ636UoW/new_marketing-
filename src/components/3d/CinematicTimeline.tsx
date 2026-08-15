"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useVelocity, useSpring, AnimatePresence } from "framer-motion";
import { Aer0CinematicCanvas } from "./Aer0CinematicCanvas";

interface CinematicTimelineProps {
  accentColor?: string;
}

const EDITORIAL_SECTIONS = [
  {
    id: "sec-01",
    actRange: [0.0, 0.33],
    sectionLabel: "[01 // SENSORY SYSTEM]",
    title: "THE BOTTLE IS ONLY THE BEGINNING.",
    text: "AER/0 is built as a complete sensory system: liquid, light, pressure, flavor, and motion.",
    alignment: "left",
    annotations: [
      "ATMOSPHERIC PRESS: 3.1 BAR",
      "HERMETIC SEAL: TITANIUM",
      "VOLUME: 355ML // 12 FL OZ",
    ],
  },
  {
    id: "sec-02",
    actRange: [0.33, 0.66],
    sectionLabel: "[02 // COGNITIVE FLUX]",
    title: "BUILT FOR THE SHIFT.",
    text: "Designed for the moment your attention changes direction.",
    alignment: "right",
    annotations: [
      "BIO-RESONANCE: 98.4%",
      "SYNAPTIC LATENCY: -14MS",
      "DOPAMINE FLUX: +310%",
    ],
  },
  {
    id: "sec-03",
    actRange: [0.66, 1.0],
    sectionLabel: "[03 // FLAVOR ARCHITECTURE]",
    title: "NOTHING ORDINARY INSIDE.",
    text: "A bright sparkling base, functional ingredients, and a flavor architecture that stays clean from first sip to finish.",
    alignment: "left",
    annotations: [
      "PURITY INDEX: 99.8%",
      "ACTIVE: N-ACETYL L-TYROSINE",
      "CHOLINE: ALPHA-GPC 600MG",
    ],
  },
];

export function CinematicTimeline({ accentColor = "#00f0ff" }: CinematicTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [progressVal, setProgressVal] = useState(0);
  const [velocityDisplay, setVelocityDisplay] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollVelocityRaw = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocityRaw, { damping: 25, stiffness: 200 });

  useEffect(() => {
    const unsubscribeProgress = scrollYProgress.on("change", (v) => {
      const val = typeof v === "number" && !isNaN(v) ? v : 0;
      setProgressVal(val);

      if (val < 0.33) {
        setCurrentSectionIdx(0);
      } else if (val < 0.66) {
        setCurrentSectionIdx(1);
      } else {
        setCurrentSectionIdx(2);
      }
    });

    const unsubscribeVelocity = smoothVelocity.on("change", (vel) => {
      const v = typeof vel === "number" && !isNaN(vel) ? Math.abs(vel * 100) : 0;
      setVelocityDisplay(v);
    });

    return () => {
      unsubscribeProgress();
      unsubscribeVelocity();
    };
  }, [scrollYProgress, smoothVelocity]);

  const activeSection = EDITORIAL_SECTIONS[currentSectionIdx];

  return (
    <div ref={containerRef} className="relative h-[600vh] w-full bg-[#040406]">
      {/* Sticky Fullscreen Canvas & Editorial Overlays */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden hud-grid">
        {/* Native Three.js Canvas Layer */}
        <div className="absolute inset-0 z-0">
          <Aer0CinematicCanvas
            accentColor={accentColor}
            scrollProgress={progressVal}
            scrollVelocity={velocityDisplay}
          />
        </div>

        {/* Dynamic Speed Blur Overlay */}
        {velocityDisplay > 18 && (
          <div
            className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-150"
            style={{
              backdropFilter: `blur(${Math.min(velocityDisplay * 0.25, 8)}px)`,
            }}
          />
        )}

        {/* Ghosted Background Telemetry Lines & Annotations */}
        <div className="absolute inset-0 pointer-events-none z-10 p-8 md:p-16 flex flex-col justify-between select-none">
          <div className="flex justify-between items-center text-[10px] font-display text-[#64748b]/30">
            <div>[LAT: 35.6762° N // LON: 139.6503° E]</div>
            <div>[SPECTRAL DENSITY: 1.028 g/cm³]</div>
          </div>
          <div className="flex justify-between items-center text-[10px] font-display text-[#64748b]/30">
            <div>+ CROSSHAIR RETICLE 04</div>
            <div>[CORE TRANSMISSION: 92%]</div>
          </div>
        </div>

        {/* Editorial Story Overlay Layer */}
        <div className="absolute inset-0 pointer-events-none z-20 max-w-7xl mx-auto w-full px-6 md:px-12 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full max-w-xl space-y-6 ${
                activeSection.alignment === "right" ? "ml-auto text-right" : "mr-auto text-left"
              }`}
            >
              {/* Section Label */}
              <div className="inline-flex items-center gap-2 text-xs font-display text-[#00f0ff] tracking-widest border-b border-[#00f0ff]/30 pb-1">
                <span>{activeSection.sectionLabel}</span>
              </div>

              {/* Large Cinematic Title */}
              <h2 className="font-display text-4xl sm:text-6xl font-black text-[#f0f4f8] tracking-tight uppercase leading-none text-glow-cyan">
                {activeSection.title}
              </h2>

              {/* Editorial Text */}
              <p className="text-base sm:text-lg text-[#64748b] leading-relaxed font-sans max-w-lg">
                {activeSection.text}
              </p>

              {/* Ghosted Technical Annotations */}
              <div className={`flex flex-wrap gap-4 pt-4 border-t border-[#00f0ff]/15 text-[10px] font-display text-[#64748b]/60 ${
                activeSection.alignment === "right" ? "justify-end" : "justify-start"
              }`}>
                {activeSection.annotations.map((ann, i) => (
                  <span key={i} className="hud-border px-2.5 py-1 bg-[#040406]/60">
                    {ann}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Section Progress Indicator Bar */}
        <div className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12 z-20 pointer-events-none flex justify-between items-center text-[10px] font-display text-[#64748b]">
          <div className="flex gap-4 items-center">
            {EDITORIAL_SECTIONS.map((sec, idx) => (
              <div
                key={sec.id}
                className={`flex items-center gap-2 transition-colors duration-300 ${
                  idx === currentSectionIdx ? "text-[#00f0ff]" : "text-[#64748b]/40"
                }`}
              >
                <span className="font-bold">0{idx + 1}</span>
                <span className="hidden sm:inline">{sec.sectionLabel.split("//")[1]}</span>
              </div>
            ))}
          </div>

          <div className="text-[#ccff00]">
            SCROLL TO ADVANCE SYSTEM // ACT 0{currentSectionIdx + 1}
          </div>
        </div>
      </div>
    </div>
  );
}
