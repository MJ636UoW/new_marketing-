"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Scene3D } from "../3d/Scene3D";

export function ScrollCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform parameters based on scroll
  const rotationValue = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const activePhase = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [1, 1, 2, 3]);

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full bg-[#040406]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden hud-grid">
        {/* Ambient Dark Canvas Background */}
        <div className="absolute inset-0 z-0">
          <Scene3D accentColor="#00f0ff" scrollProgress={0.5} scale={1.3} />
        </div>

        {/* HUD Precision Reticle Lines */}
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 md:p-12">
          <div className="flex justify-between items-center text-[10px] font-display text-[#64748b]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
              <span className="text-[#00f0ff]">SCENARIO // EXPLODED ANATOMY</span>
            </div>
            <div>SCROLL PROGRESS: CINEMATIC MODE</div>
          </div>

          <div className="flex justify-between items-center text-[10px] font-display text-[#64748b]">
            <div>CORE: AER/0 HIGH-PRESSURE VESSEL</div>
            <div className="text-[#ccff00]">ATM: 3.1 BAR CONTINUOUS</div>
          </div>
        </div>

        {/* Phase 1 Overlay (Top Titanium Seal) */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]),
            y: useTransform(scrollYProgress, [0, 0.35], [0, -40]),
          }}
          className="absolute top-1/4 left-6 md:left-24 max-w-sm z-20 hud-border p-6 space-y-3 bg-[#040406]/95 backdrop-blur-md"
        >
          <div className="text-[10px] font-display text-[#00f0ff]">
            ANATOMY ZONE 01 // TOP SEAL
          </div>
          <h3 className="font-display text-xl font-bold text-[#f0f4f8]">
            TITANIUM VACUUM SEAL
          </h3>
          <p className="text-xs text-[#64748b] leading-relaxed">
            Hermetically sealed cap preserves micro-encapsulated carbonation at 3.1 BAR. Prevents premature gas dissipation and maintains active bio-availability.
          </p>
          <div className="text-[10px] font-display text-[#ccff00]">
            ✓ ZERO DEGRADATION PROTOCOL
          </div>
        </motion.div>

        {/* Phase 2 Overlay (Center Frosted Viewport) */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.3, 0.45, 0.65, 0.75], [0, 1, 1, 0]),
            y: useTransform(scrollYProgress, [0.3, 0.45], [40, 0]),
          }}
          className="absolute top-1/2 -translate-y-1/2 right-6 md:right-24 max-w-sm z-20 hud-border p-6 space-y-3 bg-[#040406]/95 backdrop-blur-md"
        >
          <div className="text-[10px] font-display text-[#ccff00]">
            ANATOMY ZONE 02 // VIEWPORT
          </div>
          <h3 className="font-display text-xl font-bold text-[#f0f4f8]">
            LUMINESCENT ION RING
          </h3>
          <p className="text-xs text-[#64748b] leading-relaxed">
            Translucent frosted glass viewport displays active state luminescence. Real-time bio-resonance monitoring indicates formula concentration.
          </p>
          <div className="text-[10px] font-display text-[#00f0ff]">
            ✓ SUB-MICRON CARBONATION SUSPENSION
          </div>
        </motion.div>

        {/* Phase 3 Overlay (Bottom Specs) */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1, 1]),
            y: useTransform(scrollYProgress, [0.7, 0.85], [40, 0]),
          }}
          className="absolute bottom-1/4 left-6 md:left-24 max-w-sm z-20 hud-border p-6 space-y-3 bg-[#040406]/95 backdrop-blur-md"
        >
          <div className="text-[10px] font-display text-[#00f0ff]">
            ANATOMY ZONE 03 // BASE
          </div>
          <h3 className="font-display text-xl font-bold text-[#f0f4f8]">
            REINFORCED ALLOY BASE
          </h3>
          <p className="text-xs text-[#64748b] leading-relaxed">
            Weighted cold-forged aluminum base ensures thermal stability and structural rigidity under high transport pressure.
          </p>
          <div className="text-[10px] font-display text-[#ccff00]">
            ✓ 100% RECYCLABLE AEROSPACE GRADE
          </div>
        </motion.div>
      </div>
    </div>
  );
}
