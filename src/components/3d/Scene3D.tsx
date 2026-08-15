"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { Aer0Bottle } from "./Aer0Bottle";
import { Polished3DFallback } from "./Polished3DFallback";

interface Scene3DProps {
  accentColor?: string;
  scrollProgress?: number;
  scale?: number;
}

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

export function Scene3D({
  accentColor = "#00f0ff",
  scrollProgress = 0,
  scale = 1.15,
}: Scene3DProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const checkMotion = () => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);
    };

    const handleVisibilityChange = () => {
      setIsTabHidden(document.hidden);
    };

    checkMobile();
    checkMotion();

    window.addEventListener("resize", checkMobile);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion || document.hidden) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", checkMobile);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [reducedMotion]);

  return (
    <WebGLErrorBoundary fallback={<Polished3DFallback accentColor={accentColor} />}>
      <div className="w-full h-full relative pointer-events-none min-h-[400px]">
        <Canvas
          camera={{ position: [0, 0, 5.8], fov: 42 }}
          dpr={[1, isMobile ? 1.5 : 2]}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: "high-performance",
          }}
          frameloop={isTabHidden ? "never" : "always"}
        >
          <color attach="background" args={["#040406"]} />
          <ambientLight intensity={0.25} />
          
          <directionalLight position={[4, 5, 4]} intensity={1.5} color="#ffffff" />
          <directionalLight
            position={[-5, 3, -4]}
            intensity={3.8}
            color="#00f0ff"
          />
          <directionalLight
            position={[3, -2, 3]}
            intensity={1.4}
            color="#ccff00"
          />

          <Suspense fallback={null}>
            <Aer0Bottle
              accentColor={accentColor}
              interactiveMouse={mouse}
              scrollProgress={scrollProgress}
              scale={scale}
              isMobile={isMobile}
              reducedMotion={reducedMotion}
            />

            <ContactShadows
              position={[0, -2.45, 0]}
              opacity={isMobile ? 0.45 : 0.75}
              scale={9}
              blur={2.8}
              far={4.5}
              color={accentColor}
            />

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
