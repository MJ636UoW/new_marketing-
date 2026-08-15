"use client";

import React, { useState } from "react";
import { generateAllocationId } from "@/lib/utils";
import { FLAVOR_STATIONS } from "./FlavorSelection";

export function LaunchRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    flavor: FLAVOR_STATIONS[0].name,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successResult, setSuccessResult] = useState<{
    id: string;
    timestamp: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.email || !formData.email.includes("@")) {
      setErrorMessage("PLEASE ENTER A VALID EMAIL ENDPOINT");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newId = generateAllocationId();
      const timestamp = new Date().toLocaleTimeString();
      setSuccessResult({ id: newId, timestamp });
    }, 1000);
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

          {errorMessage && (
            <div className="hud-border p-3 bg-[#1e0808] border-red-500 text-red-400 font-display text-[10px]">
              ⚠️ {errorMessage}
            </div>
          )}

          {!successResult ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-xs font-display text-[#64748b]">
                    COMMUNICATION ENDPOINT (EMAIL) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ALEX@LABORATORY.IO"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-[#040406] border border-[#00f0ff]/30 p-3 font-mono text-sm text-[#f0f4f8] focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-display text-[#64748b]">
                    SUBJECT NAME (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    placeholder="DR. ALEX VANCE"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-[#040406] border border-[#00f0ff]/30 p-3 font-mono text-sm text-[#f0f4f8] focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>
              </div>

              {/* Flavor Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-display text-[#64748b]">
                  TARGET FLAVOR PREFERENCE
                </label>
                <select
                  value={formData.flavor}
                  onChange={(e) =>
                    setFormData({ ...formData, flavor: e.target.value })
                  }
                  className="w-full bg-[#040406] border border-[#00f0ff]/30 p-3 font-mono text-sm text-[#f0f4f8] focus:border-[#00f0ff] focus:outline-none"
                >
                  {FLAVOR_STATIONS.map((st) => (
                    <option key={st.id} value={st.name}>
                      {st.name} // {st.tagline}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#00f0ff] text-[#040406] font-display text-sm font-extrabold tracking-widest hover:bg-[#ccff00] transition-colors duration-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] disabled:opacity-50"
              >
                {isSubmitting
                  ? "CALIBRATING ALLOCATION PROTOCOL..."
                  : "EXECUTE BATCH 01 ALLOCATION PROTOCOL"}
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-center py-4">
              <div className="w-14 h-14 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff] flex items-center justify-center text-[#00f0ff] font-bold text-2xl mx-auto">
                ✓
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-3xl font-black text-[#f0f4f8]">
                  STATE ACCESS CONFIRMED
                </h3>
                <p className="font-display text-sm text-[#ccff00]">
                  “Your state is reserved. AER/0 will find you first.”
                </p>
              </div>

              <div className="hud-border p-4 bg-[#040406] space-y-2 font-mono text-xs text-[#64748b] max-w-md mx-auto text-left">
                <div className="flex justify-between">
                  <span>ALLOCATION ID:</span>
                  <span className="text-[#00f0ff] font-bold">
                    {successResult.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>TARGET FLAVOR:</span>
                  <span className="text-[#f0f4f8]">{formData.flavor}</span>
                </div>
                <div className="flex justify-between">
                  <span>TIMESTAMP:</span>
                  <span>{successResult.timestamp}</span>
                </div>
              </div>

              <button
                onClick={() => setSuccessResult(null)}
                className="px-8 py-3 bg-[#00f0ff] text-[#040406] font-display text-xs font-bold tracking-widest hover:bg-[#ccff00]"
              >
                SUBMIT ANOTHER ALLOCATION
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
