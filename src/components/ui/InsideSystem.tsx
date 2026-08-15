"use client";

import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { INGREDIENTS } from "@/lib/constants";
import { Polished3DFallback } from "../3d/Polished3DFallback";
import { ClientOnly } from "./ClientOnly";

const Aer0Bottle = dynamic(() => import("../3d/Aer0Bottle").then((m) => m.Aer0Bottle), {
  ssr: false,
  loading: () => <Polished3DFallback />,
});

interface SystemPoint {
  id: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  scientificNote: string;
  position: [number, number, number];
  accent: "cyan" | "lime";
  hex: string;
}

const SYSTEM_POINTS: SystemPoint[] = [
  {
    id: "spark",
    code: "POINT 01",
    name: "SPARK",
    tagline: "Clean carbonation for a bright first impact.",
    description:
      "Micro-aerated gas dispersion engine that creates a velvety mouthfeel while accelerating active compound mucosal bio-absorption.",
    scientificNote:
      "Sub-micron CO2 micro-bubbles engineered for 3.4x faster mucosal bio-transport into systemic circulation.",
    position: [1.3, 1.1, 0.4],
    accent: "cyan",
    hex: "#00f0ff",
  },
  {
    id: "shift",
    code: "POINT 02",
    name: "SHIFT",
    tagline: "Functional ingredients designed for focused energy.",
    description:
      "Pharmaceutical-grade synaptic stack designed to synthesize dopamine and boost acetylcholine for sustained flow-state output.",
    scientificNote:
      "N-Acetyl L-Tyrosine (800mg) + Alpha-GPC 99% (600mg) neurotransmitter synthesis matrix.",
    position: [-1.4, 0.0, 0.4],
    accent: "lime",
    hex: "#ccff00",
  },
  {
    id: "trace",
    code: "POINT 03",
    name: "TRACE",
    tagline: "Minerals and electrolytes for a balanced finish.",
    description:
      "Intracellular ionic rehydration matrix that clears metabolic lactate and prevents central nervous system exhaustion.",
    scientificNote:
      "Chelated Magnesium, Sodium & Potassium ion matrix stabilized with standardized Rhodiola Rosea.",
    position: [1.3, -1.1, 0.4],
    accent: "cyan",
    hex: "#00f0ff",
  },
];

export function InsideSystem() {
  const [activePoint, setActivePoint] = useState<SystemPoint>(SYSTEM_POINTS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isModalOpen]);

  return (
    <section
      id="inside-system"
      className="py-24 px-4 md:px-8 hud-grid relative bg-[#040406] overflow-hidden selection:bg-[#00f0ff] selection:text-[#040406]"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#00f0ff]/20 pb-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-display text-[#00f0ff] tracking-widest border border-[#00f0ff]/20 px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-ping" />
              <span>INSIDE THE SYSTEM // INTERACTIVE ANATOMY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-[#f0f4f8] tracking-tight uppercase">
              THREE CORE COMPOUND <br />
              <span className="text-[#00f0ff]">SYSTEM VECTORS.</span>
            </h2>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="hud-border px-6 py-3 font-display text-xs font-black tracking-widest text-[#ccff00] border-[#ccff00]/40 hover:bg-[#ccff00] hover:text-[#040406] transition-all duration-300"
          >
            VIEW FULL FORMULA
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 h-[480px] sm:h-[580px] relative w-full hud-border bg-[#0a0c14]/80 min-h-[400px]">
            <ClientOnly fallback={<Polished3DFallback />}>
              <Canvas
                camera={{
                  position: [
                    activePoint.position[0] * 0.35,
                    activePoint.position[1] * 0.2,
                    5.6,
                  ],
                  fov: 42,
                }}
                dpr={[1, isMobile ? 1.5 : 2]}
                gl={{ antialias: !isMobile, alpha: true }}
              >
                <ambientLight intensity={0.35} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
                <directionalLight
                  position={[-5, 3, -4]}
                  intensity={3.5}
                  color={activePoint.hex}
                />

                <Aer0Bottle
                  accentColor={activePoint.hex}
                  scale={1.2}
                  isMobile={isMobile}
                />

                <ContactShadows
                  position={[0, -2.45, 0]}
                  opacity={0.65}
                  scale={9}
                  blur={2.8}
                  far={4.5}
                  color={activePoint.hex}
                />
              </Canvas>
            </ClientOnly>

            <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
              {SYSTEM_POINTS.map((pt) => {
                const isActive = activePoint.id === pt.id;
                return (
                  <button
                    key={pt.id}
                    onClick={() => setActivePoint(pt)}
                    onMouseEnter={() => !isMobile && setActivePoint(pt)}
                    style={{
                      position: "absolute",
                      transform: `translate(${pt.position[0] * 90}px, ${
                        -pt.position[1] * 90
                      }px)`,
                    }}
                    className={`pointer-events-auto group hud-border p-2.5 flex items-center gap-2 transition-all duration-300 ${
                      isActive
                        ? "bg-[#040406] border-[#00f0ff] scale-110 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                        : "bg-[#040406]/80 border-[#64748b]/40 hover:border-[#00f0ff]"
                    }`}
                  >
                    <span
                      className={`w-3 h-3 rounded-full transition-transform ${
                        isActive ? "scale-125 animate-pulse" : "group-hover:scale-110"
                      }`}
                      style={{ backgroundColor: pt.hex }}
                    />
                    <span className="font-display text-xs font-bold text-[#f0f4f8]">
                      {pt.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <motion.div
              key={activePoint.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="hud-border p-8 space-y-6 bg-[#0a0c14] relative"
            >
              <div className="flex justify-between items-start border-b border-[#00f0ff]/20 pb-4">
                <div>
                  <span className="text-[10px] font-display text-[#64748b]">
                    {activePoint.code} // VECTOR
                  </span>
                  <h3 className="font-display text-3xl font-black text-[#f0f4f8] pt-1">
                    {activePoint.name}
                  </h3>
                </div>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: activePoint.hex,
                    boxShadow: `0 0 12px ${activePoint.hex}`,
                  }}
                />
              </div>

              <div className="space-y-2">
                <p className="font-display text-xs font-bold text-[#ccff00]">
                  {activePoint.tagline}
                </p>
                <p className="text-sm text-[#f0f4f8] leading-relaxed font-sans">
                  {activePoint.description}
                </p>
              </div>

              <div className="hud-border p-4 bg-[#040406] space-y-1.5 border-l-2 border-l-[#00f0ff]">
                <div className="text-[10px] font-display text-[#00f0ff]">
                  SCIENTIFIC NOTE:
                </div>
                <p className="text-xs text-[#64748b] leading-relaxed font-sans">
                  {activePoint.scientificNote}
                </p>
              </div>

              <div className="text-[10px] font-display text-[#64748b] pt-2 flex items-center gap-2">
                <span className="text-[#00f0ff]">*</span>
                <span>
                  {isMobile
                    ? "TAP FLOATING POINTS TO SHIFT 3D CAMERA REGION"
                    : "HOVER FLOATING POINTS TO SHIFT 3D CAMERA REGION"}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="full-formula-title"
            tabIndex={-1}
            ref={modalRef}
            className="fixed inset-0 z-50 bg-[#040406]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl w-full hud-border p-8 md:p-12 bg-[#0a0c14] space-y-8 relative max-h-[90vh] overflow-y-auto my-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Close full formula modal"
                className="absolute top-6 right-6 hud-border px-3 py-1 font-display text-xs text-[#64748b] hover:text-[#00f0ff] hover:border-[#00f0ff] transition-all"
              >
                [CLOSE X]
              </button>

              <div className="space-y-2 border-b border-[#00f0ff]/20 pb-4">
                <div className="text-[10px] font-display text-[#00f0ff]">
                  FULL FORMULA DOSSIER // PHARMACEUTICAL SPEC
                </div>
                <h3
                  id="full-formula-title"
                  className="font-display text-3xl font-black text-[#f0f4f8]"
                >
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
                      <div className="space-y-0.5">
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
                    <div className="text-[10px] font-display text-[#00f0ff]">
                      CLINICAL MECHANISM: {ing.mechanics}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[#00f0ff]/20 font-display text-xs">
                <span className="text-[#64748b]">
                  PRESS [ESC] OR CLICK CLOSE TO RETURN
                </span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="hud-border px-6 py-2 bg-[#00f0ff] text-[#040406] font-bold hover:bg-[#ccff00]"
                >
                  RETURN TO SYSTEM
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
