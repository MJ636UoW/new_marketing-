"use client";

import React from "react";
import { motion } from "framer-motion";
import { FORMULAS, Formula } from "@/lib/constants";

interface FlavorSelectionProps {
  activeFormula: Formula;
  onFormulaSelect: (formula: Formula) => void;
}

export function FlavorSelection({
  activeFormula,
  onFormulaSelect,
}: FlavorSelectionProps) {
  return (
    <section id="formulas" className="py-24 px-4 md:px-8 hud-grid relative bg-[#040406]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-display text-[#ccff00] tracking-widest border border-[#ccff00]/20 px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
            <span>SECTION 04 // CLINICAL FORMULATIONS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-[#f0f4f8] tracking-tight uppercase">
            THREE FORMULATIONS. <br />
            <span className="text-[#00f0ff]">ZERO ARTIFICIAL FLAVORS.</span>
          </h2>
          <p className="text-sm md:text-base text-[#64748b] leading-relaxed font-sans">
            Selecting a formulation dynamically updates the 3D canister material telemetry and active bio-resonance frequency.
          </p>
        </div>

        {/* 3 Formula Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FORMULAS.map((fm) => {
            const isSelected = activeFormula.id === fm.id;
            return (
              <motion.div
                key={fm.id}
                whileHover={{ y: -8 }}
                onClick={() => onFormulaSelect(fm)}
                className={`hud-border p-8 cursor-pointer transition-all duration-300 space-y-6 bg-[#0a0c14] relative ${
                  isSelected
                    ? "border-[#00f0ff] shadow-[0_0_25px_rgba(0,240,255,0.2)]"
                    : "hover:border-[#64748b]"
                }`}
              >
                {/* Active Indicator Stamp */}
                {isSelected && (
                  <div className="absolute top-4 right-4 bg-[#00f0ff] text-[#040406] text-[9px] font-display font-extrabold px-2 py-0.5">
                    LIVE MODEL SYNCED
                  </div>
                )}

                <div className="space-y-2">
                  <div className="text-xs font-display text-[#64748b]">
                    {fm.code}
                  </div>
                  <h3 className="font-display text-2xl font-black text-[#f0f4f8] tracking-wider">
                    {fm.name}
                  </h3>
                  <p className="text-xs text-[#64748b] font-sans">
                    {fm.tagline}
                  </p>
                </div>

                {/* Flavor Notes Tags */}
                <div className="space-y-2">
                  <div className="text-[10px] font-display text-[#64748b]">
                    AROMA & PALATE SPECTRUM:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {fm.flavourNotes.map((note, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-display px-2.5 py-1 bg-[#040406] border border-[#00f0ff]/20 text-[#00f0ff]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technical Specs */}
                <div className="hud-border p-4 bg-[#040406] space-y-3 font-display text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">VOLUME:</span>
                    <span className="text-[#f0f4f8]">{fm.volume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">INTERNAL ATM:</span>
                    <span className="text-[#ccff00] font-bold">
                      {fm.pressure}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">PURITY INDEX:</span>
                    <span className="text-[#00f0ff] font-bold">{fm.purity}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#00f0ff]/10 pt-2">
                    <span className="text-[#64748b]">DENSITY:</span>
                    <span className="text-[#f0f4f8]">{fm.density}</span>
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  className={`w-full py-3 font-display text-xs tracking-widest font-bold transition-all duration-300 ${
                    isSelected
                      ? "bg-[#00f0ff] text-[#040406]"
                      : "hud-border text-[#00f0ff] hover:bg-[#00f0ff]/10"
                  }`}
                >
                  {isSelected ? "[CURRENTLY ACTIVE]" : "ACTIVATE FORMULA"}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
