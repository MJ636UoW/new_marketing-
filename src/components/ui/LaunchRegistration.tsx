"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateAllocationId } from "@/lib/utils";
import { FORMULAS } from "@/lib/constants";

export function LaunchRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    formula: FORMULAS[0].name,
    priorityCode: "",
  });

  const [allocationResult, setAllocationResult] = useState<{
    id: string;
    timestamp: string;
    name: string;
    formula: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    const newId = generateAllocationId();
    const timestamp = new Date().toISOString();

    setAllocationResult({
      id: newId,
      timestamp,
      name: formData.name || "UNNAMED SUBJECT",
      formula: formData.formula,
    });
  };

  return (
    <section id="reserve" className="py-24 px-4 md:px-8 hud-grid relative bg-[#040406]">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-display text-[#00f0ff] tracking-widest border border-[#00f0ff]/20 px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
            <span>SECTION 05 // BATCH 01 ALLOCATION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-[#f0f4f8] tracking-tight uppercase">
            RESERVE ACCESS TO <br />
            <span className="text-[#00f0ff]">BATCH 01 RELEASE.</span>
          </h2>
          <p className="text-sm text-[#64748b] max-w-xl mx-auto font-sans">
            Initial production runs are strictly capped at 10,000 serialized units per laboratory batch to guarantee chemical stability.
          </p>
        </div>

        {/* Form Container */}
        <div className="hud-border p-8 md:p-12 bg-[#0a0c14] space-y-8">
          <div className="flex justify-between items-center border-b border-[#00f0ff]/20 pb-4 font-display text-xs">
            <span className="text-[#64748b]">STATUS: ALLOCATION OPEN</span>
            <span className="text-[#ccff00]">AVAILABLE UNITS: 1,420 / 10,000</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-xs font-display text-[#64748b]">
                  SUBJECT FULL NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="DR. ALEX VANCE"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-[#040406] border border-[#00f0ff]/30 p-3 font-mono text-sm text-[#f0f4f8] focus:border-[#00f0ff] focus:outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-xs font-display text-[#64748b]">
                  COMMUNICATION ENDPOINT (EMAIL)
                </label>
                <input
                  type="email"
                  required
                  placeholder="ALEX@LABORATORY.IO"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-[#040406] border border-[#00f0ff]/30 p-3 font-mono text-sm text-[#f0f4f8] focus:border-[#00f0ff] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Preferred Formulation */}
              <div className="space-y-2">
                <label className="block text-xs font-display text-[#64748b]">
                  PRIMARY FORMULATION SELECTION
                </label>
                <select
                  value={formData.formula}
                  onChange={(e) =>
                    setFormData({ ...formData, formula: e.target.value })
                  }
                  className="w-full bg-[#040406] border border-[#00f0ff]/30 p-3 font-mono text-sm text-[#f0f4f8] focus:border-[#00f0ff] focus:outline-none transition-colors"
                >
                  {FORMULAS.map((fm) => (
                    <option key={fm.id} value={fm.name}>
                      {fm.code} // {fm.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority Access Code */}
              <div className="space-y-2">
                <label className="block text-xs font-display text-[#64748b]">
                  PRIORITY ACCESS CODE (OPTIONAL)
                </label>
                <input
                  type="text"
                  placeholder="LAB-ACCESS-2026"
                  value={formData.priorityCode}
                  onChange={(e) =>
                    setFormData({ ...formData, priorityCode: e.target.value })
                  }
                  className="w-full bg-[#040406] border border-[#00f0ff]/30 p-3 font-mono text-sm text-[#f0f4f8] focus:border-[#00f0ff] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#00f0ff] text-[#040406] font-display text-sm font-extrabold tracking-widest hover:bg-[#ccff00] transition-colors duration-300 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              EXECUTE BATCH 01 ALLOCATION PROTOCOL
            </button>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {allocationResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#040406]/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-lg w-full hud-border p-8 bg-[#0a0c14] space-y-6 text-left relative"
            >
              <button
                onClick={() => setAllocationResult(null)}
                className="absolute top-4 right-4 text-xs font-display text-[#64748b] hover:text-[#00f0ff]"
              >
                [CLOSE X]
              </button>

              <div className="space-y-2 border-b border-[#00f0ff]/20 pb-4">
                <div className="text-[10px] font-display text-[#ccff00]">
                  ✓ ALLOCATION PROTOCOL EXECUTED
                </div>
                <h3 className="font-display text-2xl font-black text-[#f0f4f8]">
                  RESERVATION CONFIRMED
                </h3>
              </div>

              <div className="hud-border p-4 bg-[#040406] space-y-3 font-mono text-xs text-[#64748b]">
                <div className="flex justify-between">
                  <span>ALLOCATION ID:</span>
                  <span className="text-[#00f0ff] font-bold">
                    {allocationResult.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>SUBJECT NAME:</span>
                  <span className="text-[#f0f4f8]">{allocationResult.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>FORMULATION:</span>
                  <span className="text-[#ccff00]">{allocationResult.formula}</span>
                </div>
                <div className="flex justify-between text-[10px] pt-2 border-t border-[#00f0ff]/10">
                  <span>TIMESTAMP:</span>
                  <span>{allocationResult.timestamp}</span>
                </div>
              </div>

              <p className="text-xs text-[#64748b] font-sans leading-relaxed">
                Your priority slot has been locked into the Batch 01 queue. Final shipping notification and dispatch telemetry will be transmitted via email.
              </p>

              <button
                onClick={() => setAllocationResult(null)}
                className="w-full py-3 bg-[#00f0ff] text-[#040406] font-display text-xs font-bold tracking-widest hover:bg-[#ccff00] transition-colors"
              >
                RETURN TO TELEMETRY
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
