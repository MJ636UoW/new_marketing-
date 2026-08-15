"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface Aer0CanisterProps {
  accentColor?: string; // Hex color string (#00f0ff or #ccff00)
  rotationSpeed?: number;
  interactiveMouse?: { x: number; y: number };
  scrollProgress?: number;
  scale?: number;
}

export function Aer0Canister({
  accentColor = "#00f0ff",
  rotationSpeed = 0.005,
  interactiveMouse = { x: 0, y: 0 },
  scrollProgress = 0,
  scale = 1.0,
}: Aer0CanisterProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const innerCoreRef = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.Points>(null!);

  // Generate carbonation micro-particles
  const particleCount = 120;
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Radius inside liquid viewport ring
      const radius = 0.6 + Math.random() * 0.35;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 2.8;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius;

      spd[i] = 0.005 + Math.random() * 0.015;
    }
    return [pos, spd];
  }, [particleCount]);

  // Dynamic color interpolation
  const targetColor = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Continuous smooth rotation
    groupRef.current.rotation.y += rotationSpeed + scrollProgress * 0.01;

    // Interactive mouse tilt parallax
    const targetRotX = interactiveMouse.y * 0.35 + scrollProgress * Math.PI * 0.25;
    const targetRotZ = -interactiveMouse.x * 0.35;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.05
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotZ,
      0.05
    );

    // Floating animation
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.12;

    // Lerp material emission color
    if (innerCoreRef.current) {
      const mat = innerCoreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissive.lerp(targetColor, 0.1);
    }

    // Animate carbonation micro-particles floating upward
    if (particlesRef.current) {
      const geo = particlesRef.current.geometry;
      const posAttr = geo.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        array[i * 3 + 1] += speeds[i];
        // Reset particle to bottom when reaching top
        if (array[i * 3 + 1] > 1.4) {
          array[i * 3 + 1] = -1.4;
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} dispose={null}>
      {/* --- TOP CANISTER CAP (TITANIUM MACHINED SEAL) --- */}
      <mesh position={[0, 2.1, 0]}>
        <cylinderGeometry args={[0.82, 0.9, 0.25, 64]} />
        <meshStandardMaterial
          color="#161922"
          metalness={0.92}
          roughness={0.18}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Top Beveled Rim */}
      <mesh position={[0, 1.95, 0]}>
        <cylinderGeometry args={[0.92, 0.98, 0.1, 64]} />
        <meshStandardMaterial
          color="#0d0f16"
          metalness={0.88}
          roughness={0.25}
        />
      </mesh>

      {/* Titanium Seal Valve Ring */}
      <mesh position={[0, 2.25, 0]}>
        <torusGeometry args={[0.55, 0.06, 16, 64]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* --- UPPER BODY (MACHINED OBSIDIAN ALUMINUM) --- */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.98, 0.98, 1.3, 64]} />
        <meshStandardMaterial
          color="#08090e"
          metalness={0.95}
          roughness={0.22}
        />
      </mesh>

      {/* Laser Engraved Brand Typography on Upper Canister Body */}
      <group position={[0, 1.3, 0.99]}>
        <Text
          fontSize={0.28}
          letterSpacing={0.2}
          color="#f0f4f8"
          anchorX="center"
          anchorY="middle"
        >
          AER / 0
        </Text>
        <Text
          position={[0, -0.22, 0]}
          fontSize={0.09}
          letterSpacing={0.25}
          color={accentColor}
          anchorX="center"
          anchorY="middle"
        >
          SYSTEM 01 // CHANGE YOUR STATE
        </Text>
      </group>

      {/* --- MID SECTION (LUMINESCENT LIQUID VIEWPORT BAND) --- */}
      {/* Outer Frosted Glass Ring */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.99, 0.99, 1.2, 64]} />
        <meshPhysicalMaterial
          color="#040406"
          transmission={0.85}
          opacity={1}
          transparent
          roughness={0.15}
          ior={1.4}
          thickness={0.5}
          roughnessMap={null}
        />
      </mesh>

      {/* Inner Glowing Liquid Core */}
      <mesh ref={innerCoreRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.92, 0.92, 1.15, 64]} />
        <meshStandardMaterial
          color="#050810"
          emissive={accentColor}
          emissiveIntensity={0.85}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>

      {/* Telemetry Ring Cutouts */}
      <mesh position={[0, 0.61, 0]}>
        <torusGeometry args={[0.99, 0.02, 16, 64]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0, -0.61, 0]}>
        <torusGeometry args={[0.99, 0.02, 16, 64]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.8} />
      </mesh>

      {/* --- LOWER BODY (OBSIDIAN ALUMINUM) --- */}
      <mesh position={[0, -1.25, 0]}>
        <cylinderGeometry args={[0.98, 0.98, 1.3, 64]} />
        <meshStandardMaterial
          color="#08090e"
          metalness={0.95}
          roughness={0.22}
        />
      </mesh>

      {/* Laser-Etched Telemetry Specs on Lower Canister Body */}
      <group position={[0, -1.25, 0.99]}>
        <Text
          fontSize={0.08}
          letterSpacing={0.15}
          color="#64748b"
          anchorX="center"
          anchorY="middle"
        >
          355ML // 12 FL OZ — ATM: 3.1 BAR
        </Text>
        <Text
          position={[0, -0.18, 0]}
          fontSize={0.07}
          letterSpacing={0.18}
          color="#f0f4f8"
          anchorX="center"
          anchorY="middle"
        >
          N-ACETYL L-TYROSINE + ALPHA GPC 600MG
        </Text>
      </group>

      {/* --- BOTTOM BASE CAP --- */}
      <mesh position={[0, -1.95, 0]}>
        <cylinderGeometry args={[0.98, 0.9, 0.15, 64]} />
        <meshStandardMaterial
          color="#161922"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* --- CARBONATION MICRO-PARTICLE MIST --- */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color={accentColor}
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* --- EXTERNAL HUD ACCENT LIGHT RING --- */}
      <pointLight position={[0, 0, 1.2]} intensity={2.5} color={accentColor} distance={4} />
      <pointLight position={[0, 0, -1.2]} intensity={1.5} color={accentColor} distance={3} />
    </group>
  );
}
