"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { INGREDIENTS, Ingredient } from "@/lib/constants";

export function IngredientScience() {
  const [activeIngredient, setActiveIngredient] = useState<Ingredient>(INGREDIENTS[0]);

  return (
    <section id="science" className="py-24 px-4 md:px-8 hud-grid relative bg-[#040406]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#00f0ff]/20 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-display text-[#00f0ff] tracking-widest border border-[#00f0ff]/20 px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
              <span>SECTION 03 // MOLECULAR SCIENCE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-[#f0f4f8] tracking-tight uppercase">
              PRECISION BIO-CHEMISTRY. <br />
              <span className="text-[#ccff00]">ZERO FILLERS.</span>
            </h2>
          </div>
          <div className="text-xs font-display text-[#64748b] max-w-md">
            Every active compound in AER/0 is selected for synergistic bioavailability and standardized to 99%+ pharmaceutical purity.
          </div>
        </div>

        {/* Interactive Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Ingredient List Selection */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-[10px] font-display text-[#64748b] tracking-widest uppercase pb-1">
              SELECT ACTIVE COMPOUND TO INSPECT TELEMETRY:
            </div>
            {INGREDIENTS.map((ing) => {
              const isSelected = activeIngredient.id === ing.id;
              return (
                <button
                  key={ing.id}
                  onClick={() => setActiveIngredient(ing)}
                  className={`w-full hud-border p-4 text-left transition-all duration-300 flex items-center justify-between group ${
                    isSelected
                      ? "bg-[#00f0ff]/10 border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                      : "hover:border-[#64748b]"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-display text-[#64748b]">
                        {ing.code}
                      </span>
                      <span className="text-xs font-display text-[#ccff00] font-bold">
                        {ing.dosage}
                      </span>
                    </div>
                    <div className="font-display text-sm font-extrabold text-[#f0f4f8]">
                      {ing.name}
                    </div>
                  </div>
                  <div className="font-display text-xs text-[#00f0ff] group-hover:translate-x-1 transition-transform">
                    {isSelected ? "[INSPECTING]" : "->"}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Side: Detailed Molecular HUD Node Inspector */}
          <motion.div
            key={activeIngredient.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 hud-border p-8 space-y-8 bg-[#0a0c14]"
          >
            {/* Header */}
            <div className="flex justify-between items-start border-b border-[#00f0ff]/20 pb-6">
              <div>
                <div className="text-[10px] font-display text-[#00f0ff]">
                  {activeIngredient.code} // PURITY: {activeIngredient.purity}
                </div>
                <h3 className="font-display text-2xl font-black text-[#f0f4f8] pt-1">
                  {activeIngredient.name}
                </h3>
                <p className="text-xs font-display text-[#ccff00] pt-1">
                  ROLE: {activeIngredient.role}
                </p>
              </div>

              {/* Chemical Formula Stamp */}
              <div className="hud-border px-4 py-2 font-display text-xs text-[#00f0ff] bg-[#040406]">
                {activeIngredient.molecularFormula}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <div className="text-[10px] font-display text-[#64748b]">
                BIOLOGICAL PROFILE & DESCRIPTION:
              </div>
              <p className="text-sm text-[#f0f4f8] leading-relaxed font-sans">
                {activeIngredient.description}
              </p>
            </div>

            {/* Mechanism of Action Box */}
            <div className="hud-border p-4 bg-[#040406] space-y-2 border-l-2 border-l-[#ccff00]">
              <div className="text-[10px] font-display text-[#ccff00]">
                CLINICAL MECHANISM OF ACTION:
              </div>
              <p className="text-xs text-[#64748b] leading-relaxed font-sans">
                {activeIngredient.mechanics}
              </p>
            </div>

            {/* Telemetry Gauge Grid */}
            <div className="grid grid-cols-3 gap-4 pt-2 text-center font-display">
              <div className="hud-border p-3">
                <div className="text-[9px] text-[#64748b]">PURITY LEVEL</div>
                <div className="text-base font-bold text-[#00f0ff] pt-1">
                  {activeIngredient.purity}
                </div>
              </div>
              <div className="hud-border p-3">
                <div className="text-[9px] text-[#64748b]">DOSAGE VOLUME</div>
                <div className="text-base font-bold text-[#f0f4f8] pt-1">
                  {activeIngredient.dosage}
                </div>
              </div>
              <div className="hud-border p-3">
                <div className="text-[9px] text-[#64748b]">Uptake Speed</div>
                <div className="text-base font-bold text-[#ccff00] pt-1">
                  SUB-3 MIN
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
