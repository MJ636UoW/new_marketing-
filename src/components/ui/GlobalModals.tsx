"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateAllocationId } from "@/lib/utils";
import { INGREDIENTS } from "@/lib/constants";

export type ModalType = "none" | "registration" | "formula" | "cinematic" | "terms" | "privacy";

interface GlobalModalsProps {
  activeModal: ModalType;
  onClose: () => void;
  defaultFlavor?: string;
}

export function GlobalModals({
  activeModal,
  onClose,
  defaultFlavor = "POLAR CITRUS",
}: GlobalModalsProps) {
  // Registration Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    flavor: defaultFlavor,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successResult, setSuccessResult] = useState<{
    id: string;
    timestamp: string;
  } | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  // Sync default flavor if passed
  useEffect(() => {
    setFormData((prev) => ({ ...prev, flavor: defaultFlavor }));
  }, [defaultFlavor]);

  // Escape key listener for active modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModal !== "none") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModal, onClose]);

  // Focus trapping when modal opens
  useEffect(() => {
    if (activeModal !== "none" && modalRef.current) {
      modalRef.current.focus();
    }
  }, [activeModal]);

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Email validation
    if (!formData.email || !formData.email.includes("@")) {
      setErrorMessage("PLEASE ENTER A VALID COMMUNICATION ENDPOINT (EMAIL)");
      return;
    }

    setIsSubmitting(true);

    // Simulate laboratory calibration delay
    setTimeout(() => {
      setIsSubmitting(false);
      const newId = generateAllocationId();
      const timestamp = new Date().toLocaleTimeString();
      setSuccessResult({ id: newId, timestamp });
    }, 1200);
  };

  const resetRegistration = () => {
    setSuccessResult(null);
    setErrorMessage("");
    onClose();
  };

  return (
    <AnimatePresence>
      {activeModal !== "none" && (
        <div
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          ref={modalRef}
          className="fixed inset-0 z-50 bg-[#040406]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto selection:bg-[#00f0ff] selection:text-[#040406]"
        >
          {/* 1. REGISTRATION MODAL */}
          {activeModal === "registration" && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-lg w-full hud-border p-8 bg-[#0a0c14] space-y-6 relative my-auto shadow-[0_0_40px_rgba(0,240,255,0.2)]"
            >
              <button
                onClick={resetRegistration}
                aria-label="Close registration modal"
                className="absolute top-4 right-4 text-xs font-display text-[#64748b] hover:text-[#00f0ff]"
              >
                [CLOSE X]
              </button>

              {!successResult ? (
                <>
                  <div className="space-y-2 border-b border-[#00f0ff]/20 pb-4">
                    <div className="text-[10px] font-display text-[#00f0ff]">
                      AUTHENTICATION // BATCH 01 ALLOCATION PROTOCOL
                    </div>
                    <h3 className="font-display text-2xl font-black text-[#f0f4f8]">
                      ENTER THE STATE
                    </h3>
                    <p className="text-xs text-[#64748b] font-sans">
                      Lock priority batch access for AER/0 functional hydration.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="hud-border p-3 bg-[#1e0808] border-red-500 text-red-400 font-display text-[10px]">
                      ⚠️ {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-display text-[#64748b]">
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
                        className="w-full bg-[#040406] border border-[#00f0ff]/30 p-3 font-mono text-xs text-[#f0f4f8] focus:border-[#00f0ff] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-display text-[#64748b]">
                        SUBJECT NAME (OPTIONAL)
                      </label>
                      <input
                        type="text"
                        placeholder="DR. ALEX VANCE"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-[#040406] border border-[#00f0ff]/30 p-3 font-mono text-xs text-[#f0f4f8] focus:border-[#00f0ff] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-display text-[#64748b]">
                        FLAVOR PREFERENCE
                      </label>
                      <select
                        value={formData.flavor}
                        onChange={(e) =>
                          setFormData({ ...formData, flavor: e.target.value })
                        }
                        className="w-full bg-[#040406] border border-[#00f0ff]/30 p-3 font-mono text-xs text-[#f0f4f8] focus:border-[#00f0ff] focus:outline-none"
                      >
                        <option value="POLAR CITRUS">POLAR CITRUS</option>
                        <option value="NIGHT PEACH">NIGHT PEACH</option>
                        <option value="ELECTRIC LIME">ELECTRIC LIME</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#00f0ff] text-[#040406] font-display text-xs font-black tracking-widest hover:bg-[#ccff00] transition-colors disabled:opacity-50"
                    >
                      {isSubmitting
                        ? "CALIBRATING ALLOCATION PROTOCOL..."
                        : "EXECUTE STATE RESERVATION"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="space-y-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff] flex items-center justify-center text-[#00f0ff] font-bold text-xl mx-auto">
                    ✓
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-black text-[#f0f4f8]">
                      STATE ACCESS CONFIRMED
                    </h3>
                    <p className="font-display text-xs text-[#ccff00]">
                      “Your state is reserved. AER/0 will find you first.”
                    </p>
                  </div>

                  <div className="hud-border p-4 bg-[#040406] space-y-2 font-mono text-xs text-[#64748b] text-left">
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
                    onClick={resetRegistration}
                    className="w-full py-3 bg-[#00f0ff] text-[#040406] font-display text-xs font-bold tracking-widest hover:bg-[#ccff00]"
                  >
                    RETURN TO SYSTEM
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* 2. FORMULA MODAL */}
          {activeModal === "formula" && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-3xl w-full hud-border p-8 md:p-12 bg-[#0a0c14] space-y-8 relative max-h-[90vh] overflow-y-auto my-auto"
            >
              <button
                onClick={onClose}
                aria-label="Close formula modal"
                className="absolute top-6 right-6 hud-border px-3 py-1 font-display text-xs text-[#64748b] hover:text-[#00f0ff]"
              >
                [CLOSE X]
              </button>

              <div className="space-y-2 border-b border-[#00f0ff]/20 pb-4">
                <div className="text-[10px] font-display text-[#00f0ff]">
                  FULL FORMULA DOSSIER // PHARMACEUTICAL SPEC
                </div>
                <h3 className="font-display text-3xl font-black text-[#f0f4f8]">
                  COMPLETE INGREDIENT ARCHITECTURE
                </h3>
              </div>

              <div className="space-y-6">
                {INGREDIENTS.map((ing) => (
                  <div
                    key={ing.id}
                    className="hud-border p-6 bg-[#040406] space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-[#00f0ff]/10 pb-2">
                      <div>
                        <span className="text-[10px] font-display text-[#64748b]">
                          {ing.code} // {ing.molecularFormula}
                        </span>
                        <h4 className="font-display text-lg font-bold text-[#f0f4f8]">
                          {ing.name}
                        </h4>
                      </div>
                      <div className="font-display text-xs text-[#ccff00] font-bold">
                        DOSAGE: {ing.dosage} // PURITY: {ing.purity}
                      </div>
                    </div>
                    <p className="text-xs text-[#64748b] leading-relaxed font-sans">
                      {ing.description}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-[#00f0ff] text-[#040406] font-display text-xs font-bold hover:bg-[#ccff00]"
              >
                RETURN TO SYSTEM
              </button>
            </motion.div>
          )}

          {/* 3. CINEMATIC OVERLAY MODAL */}
          {activeModal === "cinematic" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-6 md:p-12 hud-grid"
            >
              <div className="flex justify-between items-center font-display text-xs text-[#00f0ff]">
                <div>[WATCH THE SYSTEM // CINEMATIC OVERLAY]</div>
                <button
                  onClick={onClose}
                  className="hud-border px-4 py-2 hover:bg-[#00f0ff] hover:text-black"
                >
                  [EXIT OVERLAY X]
                </button>
              </div>

              <div className="my-auto text-center space-y-6 max-w-2xl mx-auto">
                <div className="w-24 h-24 rounded-full border-2 border-[#00f0ff] border-t-transparent animate-spin mx-auto" />
                <h3 className="font-display text-4xl font-black text-[#f0f4f8]">
                  AER/0 CINEMATIC TRANSMISSION
                </h3>
                <p className="text-sm font-sans text-[#64748b]">
                  Real-time sub-micron particle simulation rendering at 60 FPS hardware acceleration.
                </p>
              </div>

              <div className="flex justify-between text-[10px] font-display text-[#64748b]">
                <span>AUDIO SYNTHESIS: ACTIVE</span>
                <span>PRESS [ESC] TO CLOSE</span>
              </div>
            </motion.div>
          )}

          {/* 4. TERMS MODAL */}
          {activeModal === "terms" && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-2xl w-full hud-border p-8 bg-[#0a0c14] space-y-6 relative my-auto max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-xs font-display text-[#64748b] hover:text-[#00f0ff]"
              >
                [CLOSE X]
              </button>
              <h3 className="font-display text-2xl font-black text-[#f0f4f8]">
                TERMS OF ALLOCATION
              </h3>
              <p className="text-xs text-[#64748b] leading-relaxed font-sans">
                Batch 01 production units are strictly reserved on a first-come, first-calibrated basis. Allocation priority is non-transferable and subject to batch verification standards.
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 bg-[#00f0ff] text-[#040406] font-display text-xs font-bold"
              >
                ACKNOWLEDGE PROTOCOL
              </button>
            </motion.div>
          )}

          {/* 5. PRIVACY MODAL */}
          {activeModal === "privacy" && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-2xl w-full hud-border p-8 bg-[#0a0c14] space-y-6 relative my-auto max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-xs font-display text-[#64748b] hover:text-[#00f0ff]"
              >
                [CLOSE X]
              </button>
              <h3 className="font-display text-2xl font-black text-[#f0f4f8]">
                PRIVACY PROTOCOL
              </h3>
              <p className="text-xs text-[#64748b] leading-relaxed font-sans">
                AER/0 respects communication endpoint confidentiality. Subject emails and bio-telemetry input are encrypted using AES-256 standard and used solely for dispatch notifications.
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 bg-[#00f0ff] text-[#040406] font-display text-xs font-bold"
              >
                ACKNOWLEDGE PRIVACY
              </button>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
