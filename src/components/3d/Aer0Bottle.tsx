"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface Aer0BottleProps {
  accentColor?: string;
  rotationSpeed?: number;
  interactiveMouse?: { x: number; y: number };
  scrollProgress?: number;
  scale?: number;
  isMobile?: boolean;
  reducedMotion?: boolean;
}

export function Aer0Bottle({
  accentColor = "#00f0ff",
  rotationSpeed = 0.004,
  interactiveMouse = { x: 0, y: 0 },
  scrollProgress = 0,
  scale = 1.0,
  isMobile = false,
  reducedMotion = false,
}: Aer0BottleProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const liquidCoreRef = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.Points>(null!);
  const cyanRingRef = useRef<THREE.Mesh>(null!);
  const cursorLightRef = useRef<THREE.PointLight>(null!);

  const particleCount = isMobile ? 45 : 160;

  const [positions, speeds, offsets] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);
    const off = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const r = 0.15 + Math.random() * 0.48;
      const theta = Math.random() * Math.PI * 2;
      const y = -1.5 + Math.random() * 2.0;

      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * r;

      spd[i] = 0.003 + Math.random() * 0.008;
      off[i] = Math.random() * Math.PI * 2;
    }
    return [pos, spd, off];
  }, [particleCount]);

  const glassPoints = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    pts.push(new THREE.Vector2(0.0, -1.8));
    pts.push(new THREE.Vector2(0.68, -1.8));
    pts.push(new THREE.Vector2(0.72, -1.6));
    pts.push(new THREE.Vector2(0.64, -0.6));
    pts.push(new THREE.Vector2(0.76, 0.4));
    pts.push(new THREE.Vector2(0.68, 0.7));
    pts.push(new THREE.Vector2(0.32, 1.3));
    pts.push(new THREE.Vector2(0.28, 1.9));
    pts.push(new THREE.Vector2(0.34, 1.95));
    pts.push(new THREE.Vector2(0.32, 2.05));
    return pts;
  }, []);

  const liquidPoints = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    pts.push(new THREE.Vector2(0.0, -1.72));
    pts.push(new THREE.Vector2(0.62, -1.72));
    pts.push(new THREE.Vector2(0.66, -1.55));
    pts.push(new THREE.Vector2(0.58, -0.6));
    pts.push(new THREE.Vector2(0.70, 0.45));
    pts.push(new THREE.Vector2(0.0, 0.45));
    return pts;
  }, []);

  const targetColor = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    if (!reducedMotion) {
      groupRef.current.rotation.y += rotationSpeed + scrollProgress * 0.008;
    }

    const targetRotX = interactiveMouse.y * 0.25 + scrollProgress * Math.PI * 0.2;
    const targetRotZ = -interactiveMouse.x * 0.25;

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

    if (!reducedMotion) {
      groupRef.current.position.y = Math.sin(time * 1.2) * 0.08 + 0.15;
    }

    if (liquidCoreRef.current) {
      const mat = liquidCoreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissive.lerp(targetColor, 0.08);
      const pulse = 0.75 + Math.sin(time * 2.0) * 0.15;
      mat.emissiveIntensity = pulse;
    }

    if (cyanRingRef.current) {
      const ringMat = cyanRingRef.current.material as THREE.MeshBasicMaterial;
      ringMat.color.lerp(targetColor, 0.1);
    }

    // Tiny cursor-reactive light smooth tracking on glass surface
    if (cursorLightRef.current) {
      cursorLightRef.current.position.x = THREE.MathUtils.lerp(
        cursorLightRef.current.position.x,
        interactiveMouse.x * 2.5,
        0.1
      );
      cursorLightRef.current.position.y = THREE.MathUtils.lerp(
        cursorLightRef.current.position.y,
        interactiveMouse.y * 2.5,
        0.1
      );
    }

    if (particlesRef.current) {
      const geo = particlesRef.current.geometry;
      const posAttr = geo.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        array[i * 3 + 1] += speeds[i];
        const phase = time * 1.5 + offsets[i];
        array[i * 3] += Math.sin(phase) * 0.001;
        array[i * 3 + 2] += Math.cos(phase) * 0.001;

        if (array[i * 3 + 1] > 0.42) {
          array[i * 3 + 1] = -1.65;
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, 0.15, 0]}>
      {/* Tiny cursor-reactive light on bottle surface */}
      <pointLight
        ref={cursorLightRef}
        position={[0, 0, 2.2]}
        intensity={1.6}
        color={accentColor}
        distance={3.2}
      />

      {/* Outer Transparent Glass Bottle */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <latheGeometry args={[glassPoints, 64]} />
        <meshPhysicalMaterial
          color="#060912"
          transmission={isMobile ? 0.75 : 0.92}
          opacity={1}
          transparent
          roughness={0.06}
          ior={1.52}
          thickness={0.55}
          reflectivity={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.04}
          envMapIntensity={1.8}
        />
      </mesh>

      {/* Glowing Liquid Core */}
      <mesh ref={liquidCoreRef} position={[0, 0, 0]}>
        <latheGeometry args={[liquidPoints, 64]} />
        <meshStandardMaterial
          color="#04060c"
          emissive={accentColor}
          emissiveIntensity={0.85}
          roughness={0.25}
          metalness={0.2}
        />
      </mesh>

      {/* Thin Cyan Light Ring */}
      <mesh ref={cyanRingRef} position={[0, 0.45, 0]}>
        <torusGeometry args={[0.71, 0.015, 16, 64]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      {/* Brand Wordmark */}
      <group position={[0, 0.0, 0.72]}>
        <Text
          fontSize={0.22}
          letterSpacing={0.24}
          color="#f0f4f8"
          anchorX="center"
          anchorY="middle"
        >
          AER / 0
        </Text>
        <Text
          position={[0, -0.16, 0]}
          fontSize={0.075}
          letterSpacing={0.3}
          color={accentColor}
          anchorX="center"
          anchorY="middle"
        >
          STATE ACCELERATOR
        </Text>
      </group>

      {/* Metallic Cap */}
      <group position={[0, 2.05, 0]}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.31, 0.33, 0.32, 48]} />
          <meshStandardMaterial
            color="#12151f"
            metalness={0.95}
            roughness={0.15}
            envMapIntensity={2.0}
          />
        </mesh>
        <mesh position={[0, 0.28, 0]}>
          <torusGeometry args={[0.31, 0.02, 16, 48]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Internal Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.025 : 0.032}
          color={accentColor}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
