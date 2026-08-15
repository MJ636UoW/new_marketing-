"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface CinematicBottleProps {
  accentColor?: string;
  scrollProgress: number;
  scrollVelocity: number;
  isMobile?: boolean;
}

export function CinematicBottle({
  accentColor = "#00f0ff",
  scrollProgress = 0,
  scrollVelocity = 0,
  isMobile = false,
}: CinematicBottleProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const capRef = useRef<THREE.Group>(null!);
  const shellRef = useRef<THREE.Mesh>(null!);
  const liquidRef = useRef<THREE.Mesh>(null!);
  const labelRef = useRef<THREE.Group>(null!);
  const cyanRingRef = useRef<THREE.Mesh>(null!);
  const innerParticlesRef = useRef<THREE.Points>(null!);
  const atmosphericParticlesRef = useRef<THREE.Points>(null!);
  const rimLightRef = useRef<THREE.DirectionalLight>(null!);
  const intLightRef = useRef<THREE.PointLight>(null!);

  const { camera } = useThree();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
  }, []);

  const innerParticleCount = isMobile ? 50 : 160;
  const atmosParticleCount = isMobile ? 70 : 250;

  const [innerPos, innerSpd, innerOff] = useMemo(() => {
    const pos = new Float32Array(innerParticleCount * 3);
    const spd = new Float32Array(innerParticleCount);
    const off = new Float32Array(innerParticleCount);

    for (let i = 0; i < innerParticleCount; i++) {
      const r = 0.15 + Math.random() * 0.45;
      const theta = Math.random() * Math.PI * 2;
      const y = -1.5 + Math.random() * 1.9;

      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * r;

      spd[i] = 0.004 + Math.random() * 0.01;
      off[i] = Math.random() * Math.PI * 2;
    }
    return [pos, spd, off];
  }, [innerParticleCount]);

  const [atmosPos] = useMemo(() => {
    const pos = new Float32Array(atmosParticleCount * 3);
    for (let i = 0; i < atmosParticleCount; i++) {
      const r = 0.8 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      pos[i * 3] = Math.cos(theta) * Math.cos(phi) * r;
      pos[i * 3 + 1] = Math.sin(phi) * r * 1.5;
      pos[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * r;
    }
    return [pos];
  }, [atmosParticleCount]);

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

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // If reduced motion is enabled, show static bottle without camera/object animation
    if (reducedMotion) {
      camera.position.set(0, 0, 5.8);
      camera.lookAt(0, 0.1, 0);
      return;
    }

    const p = Math.max(0, Math.min(1, scrollProgress));

    const act2Factor = THREE.MathUtils.smoothstep(p, 0.12, 0.28) - THREE.MathUtils.smoothstep(p, 0.33, 0.42);
    const act3Factor = THREE.MathUtils.smoothstep(p, 0.30, 0.45) - THREE.MathUtils.smoothstep(p, 0.52, 0.62);
    const act4Factor = THREE.MathUtils.smoothstep(p, 0.48, 0.62) - THREE.MathUtils.smoothstep(p, 0.68, 0.78);
    const act5Factor = THREE.MathUtils.smoothstep(p, 0.65, 0.78) - THREE.MathUtils.smoothstep(p, 0.84, 0.95);

    const targetCapY = 2.05 + act2Factor * 0.95;
    const targetShellY = act2Factor * 0.35;
    const targetLiquidY = -act2Factor * 0.25;
    const targetLabelY = act2Factor * 0.15;

    if (capRef.current) capRef.current.position.y = THREE.MathUtils.lerp(capRef.current.position.y, targetCapY, 0.1);
    if (shellRef.current) shellRef.current.position.y = THREE.MathUtils.lerp(shellRef.current.position.y, targetShellY, 0.1);
    if (liquidRef.current) liquidRef.current.position.y = THREE.MathUtils.lerp(liquidRef.current.position.y, targetLiquidY, 0.1);
    if (labelRef.current) labelRef.current.position.y = THREE.MathUtils.lerp(labelRef.current.position.y, targetLabelY, 0.1);

    if (atmosphericParticlesRef.current) {
      const mat = atmosphericParticlesRef.current.material as THREE.PointsMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, act3Factor * 0.85, 0.1);
      atmosphericParticlesRef.current.rotation.y += 0.002 + act3Factor * 0.01;
    }

    let targetCamX = 0;
    let targetCamY = 0;
    let targetCamZ = 5.8;

    if (p >= 0.45 && p < 0.68) {
      const orbitProgress = (p - 0.45) / (0.68 - 0.45);
      const angle = orbitProgress * Math.PI * 1.8;
      const radius = 5.6;
      targetCamX = Math.sin(angle) * radius;
      targetCamZ = Math.cos(angle) * radius;
      targetCamY = Math.sin(orbitProgress * Math.PI) * 0.8;
    } else if (p >= 0.68 && p < 0.85) {
      const immerseProgress = (p - 0.68) / (0.85 - 0.68);
      const easeImmersion = Math.sin(immerseProgress * Math.PI);
      targetCamZ = THREE.MathUtils.lerp(5.6, 0.35, easeImmersion);
      targetCamY = THREE.MathUtils.lerp(0.0, 0.1, easeImmersion);
      targetCamX = THREE.MathUtils.lerp(0.0, 0.05, easeImmersion);
    }

    const velocityNormalized = Math.min(scrollVelocity * 0.04, 1.0);
    const targetFov = 42 + velocityNormalized * 12;
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.1);
      camera.updateProjectionMatrix();
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.08);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.08);
    camera.lookAt(0, 0.1, 0);

    if (groupRef.current && scrollVelocity < 2) {
      groupRef.current.rotation.y += 0.003;
    }

    if (rimLightRef.current) {
      rimLightRef.current.intensity = THREE.MathUtils.lerp(
        rimLightRef.current.intensity,
        3.0 + act4Factor * 2.5 + act5Factor * 1.5,
        0.1
      );
    }

    if (intLightRef.current) {
      intLightRef.current.intensity = THREE.MathUtils.lerp(
        intLightRef.current.intensity,
        1.5 + act5Factor * 4.0,
        0.1
      );
    }

    if (innerParticlesRef.current) {
      const geo = innerParticlesRef.current.geometry;
      const posAttr = geo.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      for (let i = 0; i < innerParticleCount; i++) {
        array[i * 3 + 1] += innerSpd[i] + velocityNormalized * 0.01;
        const phase = time * 1.6 + innerOff[i];
        array[i * 3] += Math.sin(phase) * 0.001;

        if (array[i * 3 + 1] > 0.42) {
          array[i * 3 + 1] = -1.65;
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <directionalLight
        ref={rimLightRef}
        position={[-5, 3, -4]}
        intensity={3.5}
        color={accentColor}
      />
      <pointLight
        ref={intLightRef}
        position={[0, 0, 0]}
        intensity={1.8}
        color="#ccff00"
        distance={3.5}
      />

      <mesh ref={shellRef} castShadow receiveShadow position={[0, 0, 0]}>
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

      <mesh ref={liquidRef} position={[0, 0, 0]}>
        <latheGeometry args={[liquidPoints, 64]} />
        <meshStandardMaterial
          color="#04060c"
          emissive={accentColor}
          emissiveIntensity={0.88}
          roughness={0.25}
          metalness={0.2}
        />
      </mesh>

      <mesh ref={cyanRingRef} position={[0, 0.45, 0]}>
        <torusGeometry args={[0.71, 0.015, 16, 64]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      <group ref={labelRef} position={[0, 0.0, 0.72]}>
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
          CINEMATIC TIMELINE
        </Text>
      </group>

      <group ref={capRef} position={[0, 2.05, 0]}>
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

      <points ref={innerParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[innerPos, 3]}
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

      <points ref={atmosphericParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[atmosPos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#ccff00"
          transparent
          opacity={0.0}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
