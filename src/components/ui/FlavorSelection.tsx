"use client";

import React from "react";
import { motion } from "framer-motion";

export interface FlavorStation {
  id: string;
  name: string;
  tagline: string;
  description: string;
  accentHex: string;
  liquidColorHex: string;
  bgLightHex: string;
  particleSpeed: number;
  notes: string[];
}

export const FLAVOR_STATIONS: FlavorStation[] = [
  {
    id: "polar-citrus",
    name: "POLAR CITRUS",
    tagline: "SUB-ZERO ARCTIC RECOVERY",
    description: "Cold citrus, mineral brightness, and a clean electric finish.",
    accentHex: "#00f0ff",
    liquidColorHex: "#00f0ff",
    bgLightHex: "#002b36",
    particleSpeed: 0.015,
    notes: ["YUZU ESSENCE", "ARCTIC MINT", "MINERAL ION"],
  },
  {
    id: "night-peach",
    name: "NIGHT PEACH",
    tagline: "DARK BOTANICAL FOCUS",
    description: "Dark peach, soft acidity, and a smooth late-night profile.",
    accentHex: "#00f0ff",
    liquidColorHex: "#00d2ff",
    bgLightHex: "#081224",
    particleSpeed: 0.008,
    notes: ["DARK PEACH", "BLACK TEA", "LATE-NIGHT FLUX"],
  },
  {
    id: "electric-lime",
    name: "ELECTRIC LIME",
    tagline: "HIGH-FREQUENCY KINETIC SURGE",
    description: "Sharp lime, cold sparkle, and an immediate sensory lift.",
    accentHex: "#ccff00",
    liquidColorHex: "#ccff00",
    bgLightHex: "#1a2b00",
    particleSpeed: 0.024,
    notes: ["SHARP LIME", "BERGAMOT", "KAFFIR LEAF"],
  },
];

interface FlavorSelectionProps {
  activeFlavor: FlavorStation;
  onSelectFlavor: (flavor: FlavorStation) => void;
}

export function FlavorSelection({
  activeFlavor,
  onSelectFlavor,
}: FlavorSelectionProps) {
  return (
    <section
      id="formulas"
      className="py-24 px-4 md:px-8 hud-grid relative bg-[#040406] overflow-hidden transition-colors duration-700 selection:bg-[#00f0ff] selection:text-[#040406]"
    >
      {/* Background Ambient Lighting Shift according to active station */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-700 opacity-20 z-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${activeFlavor.bgLightHex} 0%, transparent 75%)`,
        }}
      />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-display text-[#ccff00] tracking-widest border border-[#ccff00]/20 px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
            <span>SECTION 04 // FLAVOR DISCOVERY</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-[#f0f4f8] tracking-tight uppercase">
            CHOOSE YOUR <br />
            <span
              className="transition-colors duration-500"
              style={{ color: activeFlavor.accentHex }}
            >
              STATE.
            </span>
          </h2>
          <p className="text-sm md:text-base text-[#64748b] leading-relaxed font-sans">
            Selecting a flavor station updates the 3D liquid luminescence, background lighting, particle velocity, and active system telemetry globally.
          </p>
        </div>

        {/* 3 Large Interactive Flavor Stations (Swipeable horizontal on mobile) */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory pb-6 md:pb-0 scrollbar-none">
          {FLAVOR_STATIONS.map((station, idx) => {
            const isSelected = activeFlavor.id === station.id;
            return (
              <motion.div
                key={station.id}
                whileHover={{ y: -6 }}
                onClick={() => onSelectFlavor(station)}
                className={`snap-center flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-auto hud-border p-8 cursor-pointer transition-all duration-500 space-y-6 bg-[#0a0c14] relative flex flex-col justify-between ${
                  isSelected
                    ? "border-[#00f0ff] shadow-[0_0_30px_rgba(0,240,255,0.25)] bg-[#0c101a]"
                    : "hover:border-[#64748b]"
                }`}
              >
                {/* Active Station Tag */}
                {isSelected && (
                  <div
                    className="absolute top-4 right-4 text-[9px] font-display font-extrabold px-2.5 py-1 text-[#040406]"
                    style={{ backgroundColor: station.accentHex }}
                  >
                    SYSTEM ACTIVE
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-display">
                    <span className="text-[#64748b]">STATION 0{idx + 1}</span>
                    <span
                      className="font-bold tracking-widest"
                      style={{ color: station.accentHex }}
                    >
                      {station.tagline.split(" ")[0]}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl font-black text-[#f0f4f8] tracking-wider">
                    {station.name}
                  </h3>

                  <p className="text-sm text-[#f0f4f8] leading-relaxed font-sans min-h-[48px]">
                    {station.description}
                  </p>
                </div>

                {/* Flavor Profile Notes */}
                <div className="space-y-4 pt-4 border-t border-[#00f0ff]/10">
                  <div className="text-[10px] font-display text-[#64748b]">
                    PALATE PROFILE:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {station.notes.map((note, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-display px-2.5 py-1 bg-[#040406] border border-[#00f0ff]/20 text-[#00f0ff]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* SELECT FLAVOR Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectFlavor(station);
                    }}
                    className={`w-full py-3.5 font-display text-xs tracking-widest font-black transition-all duration-300 ${
                      isSelected
                        ? "text-[#040406]"
                        : "hud-border text-[#00f0ff] hover:bg-[#00f0ff]/10"
                    }`}
                    style={{
                      backgroundColor: isSelected ? station.accentHex : "transparent",
                    }}
                  >
                    {isSelected ? "[SELECTED STAGE]" : "SELECT FLAVOR"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Active Flavor Status Bar */}
        <div className="hud-border p-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#0a0c14] font-display text-xs">
          <div className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: activeFlavor.accentHex }}
            />
            <span className="text-[#64748b]">GLOBAL PERSISTENT STATE:</span>
            <span className="text-[#f0f4f8] font-bold">{activeFlavor.name}</span>
          </div>
          <div className="text-[10px] text-[#ccff00]">
            PARTICLE VELOCITY: {activeFlavor.particleSpeed * 1000} MM/S
          </div>
        </div>
      </div>
    </section>
  );
}
