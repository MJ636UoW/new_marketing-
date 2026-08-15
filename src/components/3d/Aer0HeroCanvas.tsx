"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Aer0HeroCanvasProps {
  accentColor?: string;
  scale?: number;
}

export function Aer0HeroCanvas({
  accentColor = "#00f0ff",
  scale = 1.15,
}: Aer0HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#040406");

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // 3. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(4, 5, 4);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(new THREE.Color(accentColor), 3.8);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xccff00, 1.4);
    fillLight.position.set(3, -2, 3);
    scene.add(fillLight);

    const cursorLight = new THREE.PointLight(new THREE.Color(accentColor), 2.5, 4);
    cursorLight.position.set(0, 0, 2);
    scene.add(cursorLight);

    // 4. Main 3D Bottle Group
    const bottleGroup = new THREE.Group();
    scene.add(bottleGroup);

    // Glass Lathe Profile
    const glassPoints: THREE.Vector2[] = [
      new THREE.Vector2(0.0, -1.8),
      new THREE.Vector2(0.68, -1.8),
      new THREE.Vector2(0.72, -1.6),
      new THREE.Vector2(0.64, -0.6),
      new THREE.Vector2(0.76, 0.4),
      new THREE.Vector2(0.68, 0.7),
      new THREE.Vector2(0.32, 1.3),
      new THREE.Vector2(0.28, 1.9),
      new THREE.Vector2(0.34, 1.95),
      new THREE.Vector2(0.32, 2.05),
    ];

    const glassGeo = new THREE.LatheGeometry(glassPoints, 64);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#060912"),
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.06,
      ior: 1.52,
      thickness: 0.55,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    bottleGroup.add(glassMesh);

    // Liquid Core
    const liquidPoints: THREE.Vector2[] = [
      new THREE.Vector2(0.0, -1.72),
      new THREE.Vector2(0.62, -1.72),
      new THREE.Vector2(0.66, -1.55),
      new THREE.Vector2(0.58, -0.6),
      new THREE.Vector2(0.70, 0.45),
      new THREE.Vector2(0.0, 0.45),
    ];
    const liquidGeo = new THREE.LatheGeometry(liquidPoints, 64);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#04060c"),
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 0.85,
      roughness: 0.25,
      metalness: 0.2,
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    bottleGroup.add(liquidMesh);

    // Cyan Ring
    const ringGeo = new THREE.TorusGeometry(0.71, 0.015, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(0, 0.45, 0);
    ringMesh.rotation.x = Math.PI / 2;
    bottleGroup.add(ringMesh);

    // Metallic Cap
    const capGroup = new THREE.Group();
    capGroup.position.set(0, 2.05, 0);

    const capGeo = new THREE.CylinderGeometry(0.31, 0.33, 0.32, 48);
    const capMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#12151f"),
      metalness: 0.95,
      roughness: 0.15,
    });
    const capMesh = new THREE.Mesh(capGeo, capMat);
    capMesh.position.set(0, 0.15, 0);
    capGroup.add(capMesh);

    const capRingGeo = new THREE.TorusGeometry(0.31, 0.02, 16, 48);
    const capRingMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(accentColor),
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 0.5,
      metalness: 0.9,
    });
    const capRingMesh = new THREE.Mesh(capRingGeo, capRingMat);
    capRingMesh.position.set(0, 0.28, 0);
    capRingMesh.rotation.x = Math.PI / 2;
    capGroup.add(capRingMesh);

    bottleGroup.add(capGroup);

    // Internal Carbonation Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const r = 0.15 + Math.random() * 0.45;
      const theta = Math.random() * Math.PI * 2;
      const y = -1.5 + Math.random() * 1.9;

      particlePositions[i * 3] = Math.cos(theta) * r;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = Math.sin(theta) * r;
      particleSpeeds[i] = 0.005 + Math.random() * 0.01;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.03,
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    bottleGroup.add(particlePoints);

    // Reflective Dark Floor Plane
    const floorGeo = new THREE.PlaneGeometry(20, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#030406"),
      roughness: 0.2,
      metalness: 0.8,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.set(0, -2.46, 0);
    floorMesh.rotation.x = -Math.PI / 2;
    scene.add(floorMesh);

    bottleGroup.scale.setScalar(scale);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth || window.innerWidth;
      const h = containerRef.current.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // 5. Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      // Idle float & rotation
      bottleGroup.position.y = Math.sin(time * 1.4) * 0.08;
      bottleGroup.rotation.y = time * 0.35 + mouseX * 0.35;
      bottleGroup.rotation.x = THREE.MathUtils.lerp(bottleGroup.rotation.x, mouseY * 0.2, 0.05);

      cursorLight.position.x = mouseX * 2.2;
      cursorLight.position.y = mouseY * 2.2;

      // Particle drift
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += particleSpeeds[i];
        if (posArray[i * 3 + 1] > 0.42) {
          posArray[i * 3 + 1] = -1.65;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Clean Up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [accentColor, scale]);

  return <div ref={containerRef} className="w-full h-full relative min-h-[400px] pointer-events-auto" />;
}
