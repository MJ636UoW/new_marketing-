"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { Aer0Bottle } from "./Aer0Bottle";

interface Scene3DProps {
  accentColor?: string;
  scrollProgress?: number;
  scale?: number;
}

// Fallback error boundary state for WebGL unavailability
class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Static Fallback Image / SVG HUD Graphic for WebGL fallback
function StaticProductFallback({ accentColor = "#00f0ff" }: { accentColor?: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center hud-border p-6 bg-[#0a0c14] relative">
      <div className="w-48 h-80 border-2 border-[#00f0ff]/40 rounded-full flex flex-col items-center justify-between p-4 relative overflow-hidden bg-[#040406]/80">
        <div className="w-12 h-6 border-b-2 border-[#00f0ff] bg-[#12151f]" />
        <div className="my-auto text-center">
          <span className="font-display text-2xl font-black text-[#f0f4f8]">
            AER<span style={{ color: accentColor }}>/0</span>
          </span>
          <div className="text-[9px] font-display text-[#64748b] tracking-widest pt-1">
            STATIC FALLBACK VIEW
          </div>
        </div>
        <div className="w-full h-24 bg-[#00f0ff]/20 rounded-b-full border-t border-[#00f0ff]" />
      </div>
      <div className="text-[10px] font-display text-[#64748b] pt-4">
        [WEBGL HARDWARE ACCELERATION FALLBACK MODE]
      </div>
    </div>
  );
}

function FallbackLoader() {
  return (
    <mesh>
      <cylinderGeometry args={[0.7, 0.7, 3, 32]} />
      <meshBasicMaterial color="#00f0ff" wireframe />
    </mesh>
  );
}

export function Scene3D({
  accentColor = "#00f0ff",
  scrollProgress = 0,
  scale = 1.15,
}: Scene3DProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Detect mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Detect reduced motion preference
    const checkMotion = () => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);
    };

    checkMobile();
    checkMotion();

    window.addEventListener("resize", checkMobile);
    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [reducedMotion]);

  return (
    <WebGLErrorBoundary fallback={<StaticProductFallback accentColor={accentColor} />}>
      <div className="w-full h-full relative pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5.8], fov: 42 }}
          dpr={[1, isMobile ? 1.5 : 2]}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          {/* Dark Studio Ambient & Key Lighting */}
          <color attach="background" args={["#040406"]} />
          <ambientLight intensity={0.25} />
          
          {/* Main Key Light */}
          <directionalLight position={[4, 5, 4]} intensity={1.5} color="#ffffff" />
          
          {/* Strong Cyan Rim Light (Back-Left) */}
          <directionalLight
            position={[-5, 3, -4]}
            intensity={3.8}
            color="#00f0ff"
          />

          {/* Subtle Lime Internal Accent Light (Front-Right) */}
          <directionalLight
            position={[3, -2, 3]}
            intensity={1.4}
            color="#ccff00"
          />

          {/* Soft Top Down Spot */}
          <spotLight
            position={[0, 8, 2]}
            intensity={2.0}
            angle={0.4}
            penumbra={0.8}
            color="#f0f4f8"
          />

          <Suspense fallback={<FallbackLoader />}>
            {/* Sculptural Transparent 3D Bottle */}
            <Aer0Bottle
              accentColor={accentColor}
              interactiveMouse={mouse}
              scrollProgress={scrollProgress}
              scale={scale}
              isMobile={isMobile}
              reducedMotion={reducedMotion}
            />

            {/* Dark Reflective Surface & Contact Shadows Beneath the Bottle */}
            <ContactShadows
              position={[0, -2.45, 0]}
              opacity={isMobile ? 0.45 : 0.75}
              scale={9}
              blur={2.8}
              far={4.5}
              color={accentColor}
            />

            {/* Dark Reflective Surface Plane */}
            <mesh position={[0, -2.46, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial
                color="#030406"
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
