"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { motion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";
import { CinematicBottle } from "./CinematicBottle";

interface CinematicTimelineProps {
  accentColor?: string;
}

const ACT_DATA = [
  {
    act: "ACT 01",
    name: "CONTAINMENT",
    code: "STATE: EQUILIBRIUM",
    tagline: "HERMETICALLY SEALED AT 3.1 BAR",
    description:
      "The AER/0 sculptural polymer vessel floats in total darkness. Internal micro-particles oscillate at resting cellular frequency.",
  },
  {
    act: "ACT 02",
    name: "ANATOMICAL SEPARATION",
    code: "STATE: DECONSTRUCTION",
    tagline: "EXPLODED ANATOMY PROTOCOL",
    description:
      "The outer physical shell, titanium vacuum cap, liquid core, and laser-etched label separate along the vertical Z-axis, revealing internal bio-architecture.",
  },
  {
    act: "ACT 03",
    name: "ATMOSPHERIC EXPANSION",
    code: "STATE: DISSOLUTION",
    tagline: "CONTROLLED CARBONATION CLOUD",
    description:
      "Micro-aerated CO2 and active botanical ions expand into a controlled atmospheric particle cloud surrounding the vessel core.",
  },
  {
    act: "ACT 04",
    name: "ORBITAL TELEMETRY",
    code: "STATE: ROTATIONAL SCAN",
    tagline: "360-DEGREE PROFILE INSPECTION",
    description:
      "Camera executes a continuous orbital trajectory, highlighting the liquid level light ring and high-specular glass refraction.",
  },
  {
    act: "ACT 05",
    name: "MOLECULAR IMMERSION",
    code: "STATE: INTRA-CELLULAR",
    tagline: "MACRO CAM IMMERSION TRAVEL",
    description:
      "Camera plunges inside the glowing liquid core, navigating through suspended sub-micron compounds and luminescent ionic structures.",
  },
  {
    act: "ACT 06",
    name: "HERO RETURN",
    code: "STATE: RE-CONSOLIDATION",
    tagline: "FINAL SYNTHESIS COMPLETE",
    description:
      "Camera retracts through the liquid surface and locks back into the primary hero framing. AER/0 state transformation ready.",
  },
];

export function CinematicTimeline({ accentColor = "#00f0ff" }: CinematicTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentActIndex, setCurrentActIndex] = useState(0);
  const [velocityDisplay, setVelocityDisplay] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scroll Velocity tracking
  const scrollVelocityRaw = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocityRaw, { damping: 25, stiffness: 200 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const unsubscribeProgress = scrollYProgress.on("change", (v) => {
      const actIdx = Math.min(Math.floor(v * 6), 5);
      setCurrentActIndex(actIdx);
    });

    const unsubscribeVelocity = smoothVelocity.on("change", (vel) => {
      setVelocityDisplay(Math.abs(vel * 100));
    });

    return () => {
      window.removeEventListener("resize", checkMobile);
      unsubscribeProgress();
      unsubscribeVelocity();
    };
  }, [scrollYProgress, smoothVelocity]);

  const activeAct = ACT_DATA[currentActIndex];

  return (
    <div ref={containerRef} className="relative h-[600vh] w-full bg-[#040406]">
      {/* Sticky Fullscreen 3D Scene & HUD */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden hud-grid">
        {/* R3F Canvas Container */}
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 5.8], fov: 42 }}
            dpr={[1, isMobile ? 1.5 : 2]}
            gl={{ antialias: !isMobile, alpha: true }}
          >
            <ambientLight intensity={0.3} />
            <CinematicBottle
              accentColor={accentColor}
              scrollProgress={scrollYProgress.get()}
              scrollVelocity={velocityDisplay}
              isMobile={isMobile}
            />
            <ContactShadows
              position={[0, -2.45, 0]}
              opacity={0.7}
              scale={9}
              blur={2.8}
              far={4.5}
              color={accentColor}
            />
          </Canvas>
        </div>

        {/* Dynamic Motion Blur Motion Overlay when Scrolling Fast */}
        {velocityDisplay > 15 && (
          <div
            className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-150"
            style={{
              backdropFilter: `blur(${Math.min(velocityDisplay * 0.25, 8)}px)`,
              background: `radial-gradient(circle, transparent 40%, rgba(0,240,255,${Math.min(
                velocityDisplay * 0.005,
                0.15
              )}) 100%)`,
            }}
          />
        )}

        {/* HUD Telemetry Frame & Act Indicator */}
        <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 md:p-12">
          {/* Top Bar */}
          <div className="flex justify-between items-start font-display text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                <span className="text-[#00f0ff] font-bold">
                  SCENARIO // 6-ACT PRODUCT FILM
                </span>
              </div>
              <div className="text-[10px] text-[#64748b]">
                {activeAct.code}
              </div>
            </div>

            <div className="hud-border px-3 py-1.5 text-right bg-[#040406]/90 backdrop-blur-md">
              <div className="text-[9px] text-[#64748b]">SCROLL VELOCITY</div>
              <div className="text-xs font-bold text-[#ccff00]">
                {velocityDisplay.toFixed(1)} <span className="text-[9px]">PX/S</span>
              </div>
            </div>
          </div>

          {/* Act Progression Step Indicators */}
          <div className="hidden md:flex justify-between items-center max-w-xl mx-auto w-full hud-border p-2 bg-[#040406]/90 backdrop-blur-md">
            {ACT_DATA.map((item, idx) => {
              const isActive = idx === currentActIndex;
              const isPast = idx < currentActIndex;
              return (
                <div key={item.act} className="flex-1 text-center">
                  <div
                    className={`text-[9px] font-display font-bold ${
                      isActive
                        ? "text-[#00f0ff]"
                        : isPast
                        ? "text-[#ccff00]"
                        : "text-[#64748b]/40"
                    }`}
                  >
                    0{idx + 1}
                  </div>
                  <div
                    className={`h-1 mt-1 transition-all duration-300 ${
                      isActive
                        ? "bg-[#00f0ff]"
                        : isPast
                        ? "bg-[#ccff00]"
                        : "bg-[#64748b]/20"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Bottom Left Act Details Card */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <motion.div
              key={activeAct.act}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-md w-full hud-border p-6 space-y-3 bg-[#040406]/95 backdrop-blur-md"
            >
              <div className="flex justify-between items-center font-display text-xs border-b border-[#00f0ff]/20 pb-2">
                <span className="text-[#00f0ff] font-bold">{activeAct.act}</span>
                <span className="text-[#ccff00] text-[10px]">
                  // {activeAct.tagline}
                </span>
              </div>

              <h3 className="font-display text-xl font-black text-[#f0f4f8]">
                {activeAct.name}
              </h3>

              <p className="text-xs text-[#64748b] leading-relaxed font-sans">
                {activeAct.description}
              </p>
            </motion.div>

            {/* Bottom Right Diagnostic Status */}
            <div className="hidden sm:block text-[10px] font-display text-[#64748b] text-right">
              <div>INTERPOLATION: CONTINUOUS LERP</div>
              <div>CAMERA TRAJECTORY: 6-ACT CURVE</div>
              <div className="text-[#00f0ff]">ZERO CUTS // UNINTERRUPTED FILM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
