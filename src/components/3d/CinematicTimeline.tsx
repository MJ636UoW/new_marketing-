"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";
import { Aer0CinematicCanvas } from "./Aer0CinematicCanvas";

interface CinematicTimelineProps {
  accentColor?: string;
}

const EDITORIAL_SECTIONS = [
  {
    id: "sec-01",
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
  const [progressVal, setProgressVal] = useState(0);
  const [velocityDisplay, setVelocityDisplay] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollVelocityRaw = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocityRaw, { damping: 25, stiffness: 200 });

  // 1:1 Overlapping Gapless Opacity & Motion Transforms
  const sec1Opacity = useTransform(scrollYProgress, [0.0, 0.28, 0.36], [1, 1, 0]);
  const sec1Y = useTransform(scrollYProgress, [0.0, 0.28, 0.36], [0, 0, -40]);

  const sec2Opacity = useTransform(scrollYProgress, [0.30, 0.38, 0.62, 0.70], [0, 1, 1, 0]);
  const sec2Y = useTransform(scrollYProgress, [0.30, 0.38, 0.62, 0.70], [40, 0, 0, -40]);

  const sec3Opacity = useTransform(scrollYProgress, [0.64, 0.72, 1.0], [0, 1, 1]);
  const sec3Y = useTransform(scrollYProgress, [0.64, 0.72, 1.0], [40, 0, 0]);

  useEffect(() => {
    const unsubscribeProgress = scrollYProgress.on("change", (v) => {
      const val = typeof v === "number" && !isNaN(v) ? v : 0;
      setProgressVal(val);
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

  const activeIndex = progressVal < 0.33 ? 0 : progressVal < 0.66 ? 1 : 2;

  return (
    <div ref={containerRef} className="relative h-[180vh] w-full bg-[#040406]">
      {/* Sticky Fullscreen Canvas & Editorial Overlays */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden hud-grid">
        {/* Native Three.js 3D Canvas Layer */}
        <div className="absolute inset-0 z-0 w-full h-full">
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
          <div className="flex justify-between items-center text-[10px] font-display text-[#64748b]/50">
            <div>[LAT: 35.6762° N // LON: 139.6503° E]</div>
            <div>[SPECTRAL DENSITY: 1.028 g/cm³]</div>
          </div>
          <div className="flex justify-between items-center text-[10px] font-display text-[#64748b]/50">
            <div>+ CROSSHAIR RETICLE 04</div>
            <div>[CORE TRANSMISSION: 92%]</div>
          </div>
        </div>

        {/* Continuous Overlapping Editorial Overlay Layers (Zero Gap) */}
        <div className="absolute inset-0 pointer-events-none z-20 max-w-7xl mx-auto w-full px-6 md:px-12 flex items-center">
          {/* SECTION 01 */}
          <motion.div
            style={{ opacity: sec1Opacity, y: sec1Y }}
            className="absolute left-6 md:left-12 max-w-xl space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 text-xs font-display text-[#00f0ff] tracking-widest border-b border-[#00f0ff]/30 pb-1">
              <span>{EDITORIAL_SECTIONS[0].sectionLabel}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-[#f0f4f8] tracking-tight uppercase leading-none text-glow-cyan">
              {EDITORIAL_SECTIONS[0].title}
            </h2>
            <p className="text-base sm:text-lg text-[#64748b] leading-relaxed font-sans max-w-lg">
              {EDITORIAL_SECTIONS[0].text}
            </p>
            <div className="flex flex-wrap gap-4 pt-4 border-t border-[#00f0ff]/15 text-[10px] font-display text-[#64748b]/80">
              {EDITORIAL_SECTIONS[0].annotations.map((ann, i) => (
                <span key={i} className="hud-border px-2.5 py-1 bg-[#040406]/80">
                  {ann}
                </span>
              ))}
            </div>
          </motion.div>

          {/* SECTION 02 */}
          <motion.div
            style={{ opacity: sec2Opacity, y: sec2Y }}
            className="absolute right-6 md:right-12 max-w-xl space-y-6 text-right ml-auto"
          >
            <div className="inline-flex items-center gap-2 text-xs font-display text-[#00f0ff] tracking-widest border-b border-[#00f0ff]/30 pb-1">
              <span>{EDITORIAL_SECTIONS[1].sectionLabel}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-[#f0f4f8] tracking-tight uppercase leading-none text-glow-cyan">
              {EDITORIAL_SECTIONS[1].title}
            </h2>
            <p className="text-base sm:text-lg text-[#64748b] leading-relaxed font-sans max-w-lg ml-auto">
              {EDITORIAL_SECTIONS[1].text}
            </p>
            <div className="flex flex-wrap gap-4 pt-4 border-t border-[#00f0ff]/15 text-[10px] font-display text-[#64748b]/80 justify-end">
              {EDITORIAL_SECTIONS[1].annotations.map((ann, i) => (
                <span key={i} className="hud-border px-2.5 py-1 bg-[#040406]/80">
                  {ann}
                </span>
              ))}
            </div>
          </motion.div>

          {/* SECTION 03 */}
          <motion.div
            style={{ opacity: sec3Opacity, y: sec3Y }}
            className="absolute left-6 md:left-12 max-w-xl space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 text-xs font-display text-[#00f0ff] tracking-widest border-b border-[#00f0ff]/30 pb-1">
              <span>{EDITORIAL_SECTIONS[2].sectionLabel}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-[#f0f4f8] tracking-tight uppercase leading-none text-glow-cyan">
              {EDITORIAL_SECTIONS[2].title}
            </h2>
            <p className="text-base sm:text-lg text-[#64748b] leading-relaxed font-sans max-w-lg">
              {EDITORIAL_SECTIONS[2].text}
            </p>
            <div className="flex flex-wrap gap-4 pt-4 border-t border-[#00f0ff]/15 text-[10px] font-display text-[#64748b]/80">
              {EDITORIAL_SECTIONS[2].annotations.map((ann, i) => (
                <span key={i} className="hud-border px-2.5 py-1 bg-[#040406]/80">
                  {ann}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section Progress Indicator Bar */}
        <div className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12 z-20 pointer-events-none flex justify-between items-center text-[10px] font-display text-[#64748b]">
          <div className="flex gap-4 items-center">
            {EDITORIAL_SECTIONS.map((sec, idx) => (
              <div
                key={sec.id}
                className={`flex items-center gap-2 transition-colors duration-300 ${
                  idx === activeIndex ? "text-[#00f0ff]" : "text-[#64748b]/40"
                }`}
              >
                <span className="font-bold">0{idx + 1}</span>
                <span className="hidden sm:inline">{sec.sectionLabel.split("//")[1]}</span>
              </div>
            ))}
          </div>

          <div className="text-[#ccff00]">
            SCROLL TO ADVANCE SYSTEM // ACT 0{activeIndex + 1}
          </div>
        </div>
      </div>
    </div>
  );
}
