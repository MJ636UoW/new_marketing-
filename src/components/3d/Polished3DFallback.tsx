"use client";

import React from "react";

export function Polished3DFallback({ accentColor = "#00f0ff" }: { accentColor?: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center hud-border p-6 bg-[#0a0c14]/80 relative overflow-hidden min-h-[400px]">
      <div className="w-44 h-72 border border-[#00f0ff]/30 rounded-3xl flex flex-col items-center justify-between p-4 bg-[#040406]/90 relative">
        <div className="w-10 h-5 border-b border-[#00f0ff] bg-[#12151f]" />
        <div className="my-auto text-center space-y-1">
          <span className="font-display text-2xl font-black text-[#f0f4f8]">
            AER<span style={{ color: accentColor }}>/0</span>
          </span>
          <div className="text-[9px] font-display text-[#64748b] tracking-widest">
            3D PRODUCT ENGINE
          </div>
        </div>
        <div className="w-full h-20 bg-[#00f0ff]/15 rounded-b-2xl border-t border-[#00f0ff]/40" />
      </div>
      <div className="text-[10px] font-display text-[#64748b] pt-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
        <span>CALIBRATING 3D MODEL...</span>
      </div>
    </div>
  );
}
