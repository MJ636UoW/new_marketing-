"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scene3D } from "../3d/Scene3D";
import { PRODUCT_STATES, ProductState } from "@/lib/constants";

interface HeroSectionProps {
  activeState: ProductState;
  onStateSelect: (state: ProductState) => void;
}

export function HeroSection({ activeState, onStateSelect }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen pt-24 pb-12 flex flex-col justify-between hud-grid overflow-hidden selection:bg-[#00f0ff] selection:text-[#040406]"
    >
      {/* Background Decorative Telemetry Crosshairs */}
      <div className="absolute top-28 left-8 text-[10px] font-display text-[#64748b]/40 pointer-events-none hidden md:block">
        <div>[LAT: 35.6762° N // LON: 139.6503° E]</div>
        <div>SYS_STATUS: CALIBRATED</div>
      </div>
      <div className="absolute top-28 right-8 text-[10px] font-display text-[#64748b]/40 pointer-events-none hidden md:block text-right">
        <div>ATMOSPHERIC PRESS: 3.1 BAR</div>
        <div>MOLECULAR DENSITY: 1.028 g/cm³</div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto z-10">
        {/* Left Column: Hero Text & Controls */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-3 hud-border px-3 py-1 text-[11px] font-display">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: activeState.hex }}
            />
            <span className="text-[#64748b]">FORMULATION CODE:</span>
            <span style={{ color: activeState.hex }} className="font-bold">
              {activeState.code}
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-[#f0f4f8] uppercase leading-none">
              CHANGE YOUR <br />
              <span
                className="transition-colors duration-500"
                style={{ color: activeState.hex }}
              >
                STATE.
              </span>
            </h1>
            <p className="text-xs md:text-sm font-display text-[#ccff00] tracking-widest uppercase pt-2">
              // {activeState.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-[#64748b] leading-relaxed max-w-lg font-sans">
            {activeState.description}
          </p>

          {/* State Switcher Buttons */}
          <div className="space-y-3 pt-2">
            <div className="text-[10px] font-display text-[#64748b] tracking-widest uppercase">
              SELECT TARGET PHYSIOLOGICAL STATE:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {PRODUCT_STATES.map((st) => {
                const isSelected = activeState.id === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => onStateSelect(st)}
                    className={`hud-border p-3 text-left transition-all duration-300 ${
                      isSelected
                        ? "bg-[#00f0ff]/10 border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                        : "hover:border-[#64748b]"
                    }`}
                  >
                    <div className="text-[9px] font-display text-[#64748b]">
                      {st.code}
                    </div>
                    <div
                      className={`text-xs font-display font-bold ${
                        isSelected ? "text-[#f0f4f8]" : "text-[#64748b]"
                      }`}
                    >
                      {st.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active State Telemetry Strip */}
          <div className="hud-border p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-[9px] font-display text-[#64748b]">
                BIO-RESONANCE
              </div>
              <div
                className="text-base font-display font-bold pt-0.5"
                style={{ color: activeState.hex }}
              >
                {activeState.telemetry.bioResonance}
              </div>
            </div>
            <div>
              <div className="text-[9px] font-display text-[#64748b]">
                DOPAMINE FLUX
              </div>
              <div className="text-base font-display font-bold text-[#f0f4f8] pt-0.5">
                {activeState.telemetry.dopamineFlux}
              </div>
            </div>
            <div>
              <div className="text-[9px] font-display text-[#64748b]">
                ABSORPTION
              </div>
              <div className="text-base font-display font-bold text-[#f0f4f8] pt-0.5">
                {activeState.telemetry.absorptionTime}
              </div>
            </div>
            <div>
              <div className="text-[9px] font-display text-[#64748b]">
                CELLULAR CHARGE
              </div>
              <div
                className="text-base font-display font-bold pt-0.5"
                style={{ color: activeState.hex }}
              >
                {activeState.telemetry.cellularCharge}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Hero Canister Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="lg:col-span-6 h-[480px] sm:h-[580px] lg:h-[650px] relative w-full flex items-center justify-center"
        >
          {/* Ambient Glow Disk Behind Canister */}
          <div
            className="absolute w-72 h-72 rounded-full blur-[100px] opacity-35 transition-colors duration-700 pointer-events-none"
            style={{ backgroundColor: activeState.hex }}
          />

          {/* 3D Scene */}
          <Scene3D accentColor={activeState.hex} scale={1.25} />

          {/* HUD Overlay Reticle */}
          <div className="absolute inset-0 pointer-events-none border border-[#00f0ff]/10 m-4 flex flex-col justify-between p-4">
            <div className="flex justify-between text-[9px] font-display text-[#00f0ff]/50">
              <span>+ CAM_VIEW: ROTATIONAL 360</span>
              <span>CANISTER // 355ML</span>
            </div>
            <div className="flex justify-between text-[9px] font-display text-[#00f0ff]/50">
              <span>[TARGET LOCKED]</span>
              <span>RENDER: R3F HARDWARE ACCEL</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex justify-between items-center text-[10px] font-display text-[#64748b] pt-6 z-10 border-t border-[#00f0ff]/10">
        <span>[SCROLL TO EXPLORE CELLULAR DYNAMICS]</span>
        <div className="flex items-center gap-2 text-[#00f0ff]">
          <span className="animate-bounce">↓</span>
          <span>DISCOVER SCIENCE</span>
        </div>
      </div>
    </section>
  );
}
