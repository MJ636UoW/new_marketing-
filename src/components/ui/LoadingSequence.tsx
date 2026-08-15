"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface LoadingSequenceProps {
  onComplete: () => void;
}

const LOG_LINES = [
  "INITIALIZING LABORATORY TELEMETRY...",
  "ESTABLISHING CELLULAR BIO-RESONANCE LINK...",
  "VERIFYING MOLECULAR PURITY (99.8%)...",
  "ATMOSPHERIC CARBONATION PRESSURE: 3.1 BAR...",
  "AER/0 CORE SYSTEM READY. STATE CALIBRATED.",
];

export function LoadingSequence({ onComplete }: LoadingSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Fast reliable loading sequence timer (0.8 sec)
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsExiting(true);
          setTimeout(() => {
            if (onCompleteRef.current) {
              onCompleteRef.current();
            }
          }, 400);
          return 100;
        }
        return prev + 15;
      });
    }, 60);

    // Safety fallback timeout after 1.5 seconds max
    const safetyTimeout = setTimeout(() => {
      clearInterval(timer);
      setIsExiting(true);
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }, 1500);

    return () => {
      clearInterval(timer);
      clearTimeout(safetyTimeout);
    };
  }, []);

  useEffect(() => {
    const logIndex = Math.min(
      Math.floor((progress / 100) * LOG_LINES.length),
      LOG_LINES.length - 1
    );
    setCurrentLog(logIndex);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-[#040406] hud-grid flex flex-col justify-between p-6 md:p-12 selection:bg-[#00f0ff] selection:text-[#040406]"
    >
      {/* Top Status Header */}
      <div className="flex items-center justify-between font-display text-xs tracking-widest text-[#64748b] border-b border-[#00f0ff]/20 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
          <span className="text-[#00f0ff]">LAB 04 // BOOT DIAGNOSTIC</span>
        </div>
        <span>SYS_VER: 2.0.4 // TOKYO CORE</span>
      </div>

      {/* Center Diagnostic Core */}
      <div className="max-w-xl mx-auto w-full flex flex-col items-center justify-center space-y-8 my-auto">
        {/* AER/0 Branding */}
        <div className="text-center space-y-2">
          <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-widest text-[#f0f4f8]">
            AER<span className="text-[#00f0ff] text-glow-cyan">/0</span>
          </h1>
          <p className="font-display text-xs text-[#ccff00] tracking-widest">
            CHANGE YOUR STATE
          </p>
        </div>

        {/* Progress Gauge Display */}
        <div className="w-full space-y-3">
          <div className="flex justify-between items-end font-display text-xs">
            <span className="text-[#00f0ff]">STATE CALIBRATION</span>
            <span className="text-2xl font-bold text-[#f0f4f8]">
              {progress}
              <span className="text-[#00f0ff] text-sm">%</span>
            </span>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full h-1.5 bg-[#0a0c14] border border-[#00f0ff]/30 p-0.5 relative">
            <div
              className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ccff00] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Live Boot Log Output */}
        <div className="w-full hud-border p-4 font-mono text-xs text-[#64748b] space-y-1">
          <div className="flex items-center gap-2 text-[#00f0ff]">
            <span className="text-[#ccff00]">&gt;</span>
            <span>{LOG_LINES[currentLog]}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-[#00f0ff]/10 text-[10px] text-[#64748b]">
            <span>ATM: 1.02 BAR</span>
            <span>CORE: OPTIMAL</span>
            <span>FLOW: ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="flex justify-between items-center text-[10px] font-display text-[#64748b] border-t border-[#00f0ff]/20 pt-4">
        <span>[SECURITY PROTOCOL: ENFORCED]</span>
        <span>RESTRICTED ACCESS // BATCH 01</span>
      </div>
    </motion.div>
  );
}
