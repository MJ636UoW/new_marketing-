"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float } from "@react-three/drei";
import { Aer0Canister } from "./Aer0Canister";

interface Scene3DProps {
  accentColor?: string;
  scrollProgress?: number;
  scale?: number;
}

function FallbackLoader() {
  return (
    <mesh>
      <boxGeometry args={[1, 2, 1]} />
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Studio Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-5, -2, -2]} intensity={1.2} color={accentColor} />
        <pointLight position={[0, 4, 3]} intensity={2.0} color={accentColor} />

        <Suspense fallback={<FallbackLoader />}>
          <Float
            speed={1.5}
            rotationIntensity={0.2}
            floatIntensity={0.3}
          >
            <Aer0Canister
              accentColor={accentColor}
              interactiveMouse={mouse}
              scrollProgress={scrollProgress}
              scale={scale}
            />
          </Float>

          {/* Precision Floor Shadow */}
          <ContactShadows
            position={[0, -2.6, 0]}
            opacity={0.65}
            scale={8}
            blur={2.5}
            far={4}
            color={accentColor}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
