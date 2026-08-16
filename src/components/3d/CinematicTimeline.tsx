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

  // Perfectly Fitted Zero-Gap Overlapping Opacity & Motion Keyframes across 200vh
  const sec1Opacity = useTransform(scrollYProgress, [0.0, 0.28, 0.35], [1, 1, 0]);
  const sec1Y = useTransform(scrollYProgress, [0.0, 0.28, 0.35], [0, 0, -25]);

  const sec2Opacity = useTransform(scrollYProgress, [0.28, 0.36, 0.60, 0.68], [0, 1, 1, 0]);
  const sec2Y = useTransform(scrollYProgress, [0.28, 0.36, 0.60, 0.68], [25, 0, 0, -25]);

  const sec3Opacity = useTransform(scrollYProgress, [0.62, 0.70, 1.0], [0, 1, 1]);
  const sec3Y = useTransform(scrollYProgress, [0.62, 0.70, 1.0], [25, 0, 0]);

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
    <div id="cinematic" ref={containerRef} className="relative h-[200vh] w-full bg-[#040406]">
      {/* Sticky Fullscreen Canvas & Editorial Overlays */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden hud-grid pt-20 pb-6 px-4 md:px-12">
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
              backdropFilter: `blur(${Math.min(velocityDisplay * 0.2, 6)}px)`,
            }}
          />
        )}

        {/* Telemetry HUD Lines & Annotations */}
        <div className="relative z-10 w-full flex justify-between items-center text-[10px] font-display text-[#64748b]/50 select-none pointer-events-none">
          <div>[LAT: 35.6762° N // LON: 139.6503° E]</div>
          <div>[SPECTRAL DENSITY: 1.028 g/cm³]</div>
        </div>

        {/* Continuous Overlapping Editorial Overlay Layers (Centered & Fitted) */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between my-auto pointer-events-none min-h-[300px]">
          {/* SECTION 01 */}
          <motion.div
            style={{ opacity: sec1Opacity, y: sec1Y }}
            className="absolute left-0 max-w-lg space-y-4 text-left"
          >
            <div className="inline-flex items-center gap-2 text-xs font-display text-[#00f0ff] tracking-widest border-b border-[#00f0ff]/30 pb-1">
              <span>{EDITORIAL_SECTIONS[0].sectionLabel}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-[#f0f4f8] tracking-tight uppercase leading-none text-glow-cyan">
              {EDITORIAL_SECTIONS[0].title}
            </h2>
            <p className="text-sm sm:text-base text-[#64748b] leading-relaxed font-sans max-w-md">
              {EDITORIAL_SECTIONS[0].text}
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-[10px] font-display text-[#64748b]/80">
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
            className="absolute right-0 max-w-lg space-y-4 text-right ml-auto"
          >
            <div className="inline-flex items-center gap-2 text-xs font-display text-[#00f0ff] tracking-widest border-b border-[#00f0ff]/30 pb-1">
              <span>{EDITORIAL_SECTIONS[1].sectionLabel}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-[#f0f4f8] tracking-tight uppercase leading-none text-glow-cyan">
              {EDITORIAL_SECTIONS[1].title}
            </h2>
            <p className="text-sm sm:text-base text-[#64748b] leading-relaxed font-sans max-w-md ml-auto">
              {EDITORIAL_SECTIONS[1].text}
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-[10px] font-display text-[#64748b]/80 justify-end">
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
            className="absolute left-0 max-w-lg space-y-4 text-left"
          >
            <div className="inline-flex items-center gap-2 text-xs font-display text-[#00f0ff] tracking-widest border-b border-[#00f0ff]/30 pb-1">
              <span>{EDITORIAL_SECTIONS[2].sectionLabel}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-[#f0f4f8] tracking-tight uppercase leading-none text-glow-cyan">
              {EDITORIAL_SECTIONS[2].title}
            </h2>
            <p className="text-sm sm:text-base text-[#64748b] leading-relaxed font-sans max-w-md">
              {EDITORIAL_SECTIONS[2].text}
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-[10px] font-display text-[#64748b]/80">
              {EDITORIAL_SECTIONS[2].annotations.map((ann, i) => (
                <span key={i} className="hud-border px-2.5 py-1 bg-[#040406]/80">
                  {ann}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section Progress Indicator Bar */}
        <div className="relative z-20 w-full flex justify-between items-center text-[10px] font-display text-[#64748b] select-none pointer-events-none">
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
