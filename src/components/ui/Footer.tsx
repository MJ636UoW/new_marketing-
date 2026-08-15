"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="w-full bg-[#040406] border-t border-[#00f0ff]/20 py-16 px-4 md:px-8 hud-grid font-display text-xs text-[#64748b] selection:bg-[#00f0ff] selection:text-[#040406]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-2xl font-extrabold text-[#f0f4f8] tracking-widest">
              AER<span className="text-[#00f0ff]">/0</span>
            </div>
            <p className="text-xs text-[#64748b] font-sans leading-relaxed">
              Sparkling functional state accelerator engineered for neuro-efficiency and cellular bio-resonance.
            </p>
            <div className="text-[10px] text-[#ccff00] tracking-widest">
              [LABORATORY GRADE // ZERO SYNTHETIC COLOURS]
            </div>
          </div>

          {/* Coordinates */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-[10px] text-[#00f0ff] uppercase tracking-widest">
              GLOBAL LABORATORY COORDINATES:
            </div>
            <ul className="space-y-1 text-xs text-[#f0f4f8]">
              <li>LAB 01 // TOKYO — 35.6762° N, 139.6503° E</li>
              <li>LAB 02 // BERLIN — 52.5200° N, 13.4050° E</li>
              <li>LAB 03 // SAN FRANCISCO — 37.7749° N, 122.4194° W</li>
            </ul>
          </div>

          {/* System Telemetry Status */}
          <div className="md:col-span-4 hud-border p-4 space-y-2 bg-[#0a0c14]">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-[#64748b]">SYSTEM HARDWARE STATUS</span>
              <span className="text-[#00f0ff] font-bold">ONLINE</span>
            </div>
            <div className="flex justify-between text-xs text-[#f0f4f8]">
              <span>ATM PRESSURE:</span>
              <span className="text-[#ccff00]">3.1 BAR</span>
            </div>
            <div className="flex justify-between text-xs text-[#f0f4f8]">
              <span>PURITY SPECIFICATION:</span>
              <span className="text-[#00f0ff]">99.8% STABILITY</span>
            </div>
          </div>
        </div>

        {/* Regulatory & Copyright Bar */}
        <div className="border-t border-[#00f0ff]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-[#64748b]">
          <div>
            © 2026 AER/0 SCIENTIFIC CORP. ALL RIGHTS RESERVED. FOR ADULT CELLULAR USE ONLY.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#00f0ff] transition-colors">
              PRIVACY PROTOCOL
            </a>
            <a href="#" className="hover:text-[#00f0ff] transition-colors">
              TERMS OF ALLOCATION
            </a>
            <a href="#" className="hover:text-[#00f0ff] transition-colors">
              LABORATORY DOSSIER
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
