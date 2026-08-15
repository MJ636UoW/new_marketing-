"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Aer0CanisterProps {
  accentColor?: string;
  scrollProgress?: number;
  scale?: number;
  isMobile?: boolean;
}

export function Aer0Canister({
  accentColor = "#00f0ff",
  scrollProgress = 0,
  scale = 1.0,
  isMobile = false,
}: Aer0CanisterProps) {
  const canisterRef = useRef<THREE.Group>(null!);

  const brandTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 512, 256);
      ctx.font = "900 52px Orbitron, sans-serif";
      ctx.fillStyle = "#f0f4f8";
      ctx.textAlign = "center";
      ctx.fillText("AER / 0", 256, 110);

      ctx.font = "bold 20px Inter, sans-serif";
      ctx.fillStyle = accentColor;
      ctx.fillText("SYSTEM 01 // CHANGE YOUR STATE", 256, 160);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [accentColor]);

  useFrame((state) => {
    if (!canisterRef.current) return;
    const time = state.clock.getElapsedTime();
    canisterRef.current.rotation.y = time * 0.4 + scrollProgress * Math.PI * 2;
    canisterRef.current.position.y = Math.sin(time * 1.5) * 0.06;
  });

  return (
    <group ref={canisterRef} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.98, 0.98, 3.4, 64]} />
        <meshPhysicalMaterial
          color="#0a0d14"
          metalness={0.92}
          roughness={0.12}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          reflectivity={0.95}
        />
      </mesh>

      {brandTexture && (
        <mesh position={[0, 1.2, 1.0]}>
          <planeGeometry args={[1.4, 0.7]} />
          <meshBasicMaterial map={brandTexture} transparent opacity={0.95} depthWrite={false} />
        </mesh>
      )}

      <mesh position={[0, 1.72, 0]}>
        <cylinderGeometry args={[0.99, 0.99, 0.08, 64]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}
