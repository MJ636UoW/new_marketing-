"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PRODUCT_STATES, ProductState } from "@/lib/constants";

export function ProductStory() {
  const [selectedState, setSelectedState] = useState<ProductState>(PRODUCT_STATES[0]);

  return (
    <section id="story" className="py-24 px-4 md:px-8 hud-grid relative bg-[#040406]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-display text-[#00f0ff] tracking-widest border border-[#00f0ff]/20 px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-ping" />
            <span>SECTION 02 // PHYSIOLOGICAL STATES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-[#f0f4f8] tracking-tight uppercase">
            NOT A BEVERAGE. <br />
            <span className="text-[#00f0ff]">A STATE SHIFT ENGINE.</span>
          </h2>
          <p className="text-sm md:text-base text-[#64748b] leading-relaxed">
            Traditional drinks provide superficial spikes followed by steep crashes. AER/0 optimizes cellular electrical charge and neuro-transmitter synthesis for sustained baseline transformation.
          </p>
        </div>

        {/* State Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCT_STATES.map((st, idx) => {
            const isActive = selectedState.id === st.id;
            return (
              <motion.div
                key={st.id}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedState(st)}
                className={`hud-border p-8 cursor-pointer transition-all duration-300 space-y-6 ${
                  isActive
                    ? "border-[#00f0ff] bg-[#0a0c14] shadow-[0_0_20px_rgba(0,240,255,0.15)]"
                    : "hover:border-[#64748b]/50"
                }`}
              >
                <div className="flex justify-between items-center font-display text-xs">
                  <span className="text-[#64748b]">{st.code}</span>
                  <span
                    className="font-bold tracking-widest"
                    style={{ color: st.hex }}
                  >
                    0{idx + 1}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-extrabold text-[#f0f4f8] tracking-wider">
                    {st.name}
                  </h3>
                  <p className="text-[11px] font-display text-[#ccff00] tracking-widest">
                    // {st.subtitle}
                  </p>
                </div>

                <p className="text-xs text-[#64748b] leading-relaxed font-sans">
                  {st.description}
                </p>

                {/* Simulated Telemetry EEG Wave Graph */}
                <div className="hud-border p-3 space-y-2 bg-[#040406]">
                  <div className="flex justify-between text-[9px] font-display text-[#64748b]">
                    <span>BIO-SIGNAL WAVEFORM</span>
                    <span style={{ color: st.hex }}>ACTIVE</span>
                  </div>
                  <div className="h-8 flex items-end gap-1">
                    {[40, 65, 30, 85, 95, 50, 75, 45, 90, 60, 80, 35, 100, 70, 55].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 transition-all duration-500"
                          style={{
                            height: `${isActive ? h : h * 0.4}%`,
                            backgroundColor: isActive ? st.hex : "#64748b",
                            opacity: isActive ? 0.8 : 0.2,
                          }}
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-xs font-display">
                  <span className="text-[#64748b]">ABSORPTION SPEED</span>
                  <span className="font-bold text-[#f0f4f8]">
                    {st.telemetry.absorptionTime}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Clinical Comparison HUD Matrix */}
        <div className="hud-border p-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-[#00f0ff]/20 pb-4">
            <div>
              <div className="text-[10px] font-display text-[#00f0ff]">
                BENCHMARK TELEMETRY
              </div>
              <h3 className="font-display text-xl font-bold text-[#f0f4f8]">
                CLINICAL EFFICACY COMPARISON
              </h3>
            </div>
            <div className="text-xs font-display text-[#ccff00]">
              LABORATORY TRIALS // N=480 PARTICIPANTS
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-[#00f0ff]/10 text-[10px] font-display text-[#64748b]">
                  <th className="py-3 px-4">METRIC PARAMETER</th>
                  <th className="py-3 px-4 text-[#00f0ff] font-bold">AER/0 SYSTEM</th>
                  <th className="py-3 px-4">STANDARD ENERGY DRINK</th>
                  <th className="py-3 px-4">SYNTHETIC COFFEE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#00f0ff]/5 text-[#64748b]">
                <tr>
                  <td className="py-4 px-4 font-display font-medium text-[#f0f4f8]">
                    BIO-AVAILABILITY UPTAKE
                  </td>
                  <td className="py-4 px-4 font-display font-bold text-[#00f0ff]">
                    3.8 MINUTES (99.8%)
                  </td>
                  <td className="py-4 px-4">45.0 MINUTES (32%)</td>
                  <td className="py-4 px-4">25.0 MINUTES (41%)</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-display font-medium text-[#f0f4f8]">
                    NEURAL FLOW DURATION
                  </td>
                  <td className="py-4 px-4 font-display font-bold text-[#ccff00]">
                    6.5 HOURS SUSTAINED
                  </td>
                  <td className="py-4 px-4">1.2 HOURS (SPIKE/CRASH)</td>
                  <td className="py-4 px-4">2.0 HOURS (JITTER)</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-display font-medium text-[#f0f4f8]">
                    SUGAR & ARTIFICIAL DYES
                  </td>
                  <td className="py-4 px-4 font-display font-bold text-[#00f0ff]">
                    0.0g // ZERO SYNTHETICS
                  </td>
                  <td className="py-4 px-4">28.0g HIGH FRUCTOSE</td>
                  <td className="py-4 px-4">0.0g - 18.0g</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-display font-medium text-[#f0f4f8]">
                    ADENOSINE RECEPTOR CRASH
                  </td>
                  <td className="py-4 px-4 font-display font-bold text-[#ccff00]">
                    NONE (ADAPTOGENIC BUFFER)
                  </td>
                  <td className="py-4 px-4">SEVERE SYSTEMIC CRASH</td>
                  <td className="py-4 px-4">MODERATE REBOUND FOG</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
