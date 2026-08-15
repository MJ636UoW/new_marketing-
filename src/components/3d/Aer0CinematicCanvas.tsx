"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Aer0CinematicCanvasProps {
  accentColor?: string;
  scrollProgress: number;
  scrollVelocity: number;
}

export function Aer0CinematicCanvas({
  accentColor = "#00f0ff",
  scrollProgress = 0,
  scrollVelocity = 0,
}: Aer0CinematicCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(scrollProgress);
  const scrollVelocityRef = useRef(scrollVelocity);
  const accentColorRef = useRef(accentColor);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    scrollVelocityRef.current = scrollVelocity;
  }, [scrollVelocity]);

  useEffect(() => {
    accentColorRef.current = accentColor;
  }, [accentColor]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#040406");

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // 3. Studio Lighting Suite
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const rimLight = new THREE.DirectionalLight(new THREE.Color(accentColorRef.current), 4.5);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
    mainLight.position.set(4, 5, 4);
    scene.add(mainLight);

    const intLight = new THREE.PointLight(0xccff00, 2.5, 4.5);
    intLight.position.set(0, 0, 0);
    scene.add(intLight);

    // 4. Bottle Components Group
    const bottleGroup = new THREE.Group();
    scene.add(bottleGroup);

    // Glass Shell
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
    });
    const shellMesh = new THREE.Mesh(glassGeo, glassMat);
    bottleGroup.add(shellMesh);

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
      emissive: new THREE.Color(accentColorRef.current),
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.2,
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    bottleGroup.add(liquidMesh);

    // Cyan Ring
    const ringGeo = new THREE.TorusGeometry(0.71, 0.015, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColorRef.current) });
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
      color: new THREE.Color(accentColorRef.current),
      emissive: new THREE.Color(accentColorRef.current),
      emissiveIntensity: 0.6,
    });
    const capRingMesh = new THREE.Mesh(capRingGeo, capRingMat);
    capRingMesh.position.set(0, 0.28, 0);
    capRingMesh.rotation.x = Math.PI / 2;
    capGroup.add(capRingMesh);
    bottleGroup.add(capGroup);

    // Brand Wordmark Texture
    let wordmarkMesh: THREE.Mesh | null = null;
    const updateWordmark = (colHex: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, 512, 256);
        ctx.font = "900 54px Orbitron, sans-serif";
        ctx.fillStyle = "#f0f4f8";
        ctx.textAlign = "center";
        ctx.fillText("AER / 0", 256, 110);

        ctx.font = "bold 20px Inter, sans-serif";
        ctx.fillStyle = colHex;
        ctx.fillText("CINEMATIC TIMELINE", 256, 160);
      }
      const tex = new THREE.CanvasTexture(canvas);
      if (!wordmarkMesh) {
        const geo = new THREE.PlaneGeometry(1.3, 0.65);
        const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.95, depthWrite: false });
        wordmarkMesh = new THREE.Mesh(geo, mat);
        wordmarkMesh.position.set(0, 0.0, 0.73);
        bottleGroup.add(wordmarkMesh);
      } else {
        (wordmarkMesh.material as THREE.MeshBasicMaterial).map = tex;
        (wordmarkMesh.material as THREE.MeshBasicMaterial).needsUpdate = true;
      }
    };
    updateWordmark(accentColorRef.current);

    // Inner Particles
    const innerParticleCount = 160;
    const innerGeo = new THREE.BufferGeometry();
    const innerPositions = new Float32Array(innerParticleCount * 3);
    const innerSpeeds = new Float32Array(innerParticleCount);

    for (let i = 0; i < innerParticleCount; i++) {
      const r = 0.15 + Math.random() * 0.45;
      const theta = Math.random() * Math.PI * 2;
      const y = -1.5 + Math.random() * 1.9;

      innerPositions[i * 3] = Math.cos(theta) * r;
      innerPositions[i * 3 + 1] = y;
      innerPositions[i * 3 + 2] = Math.sin(theta) * r;
      innerSpeeds[i] = 0.005 + Math.random() * 0.012;
    }
    innerGeo.setAttribute("position", new THREE.BufferAttribute(innerPositions, 3));
    const innerMat = new THREE.PointsMaterial({
      size: 0.032,
      color: new THREE.Color(accentColorRef.current),
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const innerParticles = new THREE.Points(innerGeo, innerMat);
    bottleGroup.add(innerParticles);

    // Atmospheric Cloud Particles
    const atmosCount = 250;
    const atmosGeo = new THREE.BufferGeometry();
    const atmosPositions = new Float32Array(atmosCount * 3);

    for (let i = 0; i < atmosCount; i++) {
      const r = 0.8 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      atmosPositions[i * 3] = Math.cos(theta) * Math.cos(phi) * r;
      atmosPositions[i * 3 + 1] = Math.sin(phi) * r * 1.5;
      atmosPositions[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * r;
    }
    atmosGeo.setAttribute("position", new THREE.BufferAttribute(atmosPositions, 3));
    const atmosMat = new THREE.PointsMaterial({
      size: 0.045,
      color: new THREE.Color("#ccff00"),
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });
    const atmosParticles = new THREE.Points(atmosGeo, atmosMat);
    bottleGroup.add(atmosParticles);

    // Reflective Dark Floor
    const floorGeo = new THREE.PlaneGeometry(20, 20);
    const floorMat = new THREE.MeshStandardMaterial({ color: new THREE.Color("#030406"), roughness: 0.2, metalness: 0.8 });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.set(0, -2.46, 0);
    floorMesh.rotation.x = -Math.PI / 2;
    scene.add(floorMesh);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth || window.innerWidth;
      const h = containerRef.current.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // ResizeObserver to ensure canvas NEVER gets collapsed to 0px
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 5. Continuous 60 FPS Render Loop with Smooth Scroll Interpolation
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      const p = Math.max(0, Math.min(1, scrollProgressRef.current));
      const vel = scrollVelocityRef.current;

      // Color updates
      const targetCol = new THREE.Color(accentColorRef.current);
      rimLight.color.lerp(targetCol, 0.08);
      liquidMat.emissive.lerp(targetCol, 0.08);
      ringMat.color.lerp(targetCol, 0.08);
      innerMat.color.lerp(targetCol, 0.08);

      // Act 2 Separation exploded view
      const act2Factor = THREE.MathUtils.smoothstep(p, 0.12, 0.28) - THREE.MathUtils.smoothstep(p, 0.33, 0.42);
      capGroup.position.y = THREE.MathUtils.lerp(capGroup.position.y, 2.05 + act2Factor * 0.95, 0.1);
      shellMesh.position.y = THREE.MathUtils.lerp(shellMesh.position.y, act2Factor * 0.35, 0.1);
      liquidMesh.position.y = THREE.MathUtils.lerp(liquidMesh.position.y, -act2Factor * 0.25, 0.1);

      // Act 3 Atmosphere cloud expansion
      const act3Factor = THREE.MathUtils.smoothstep(p, 0.30, 0.45) - THREE.MathUtils.smoothstep(p, 0.52, 0.62);
      atmosMat.opacity = THREE.MathUtils.lerp(atmosMat.opacity, act3Factor * 0.85, 0.1);
      atmosParticles.rotation.y += 0.002 + act3Factor * 0.01;

      // Act 4 Orbit & Act 5 Immersion Camera Path
      let targetCamX = 0;
      let targetCamY = 0;
      let targetCamZ = 5.8;

      if (p >= 0.45 && p < 0.68) {
        const orbitProgress = (p - 0.45) / (0.68 - 0.45);
        const angle = orbitProgress * Math.PI * 1.8;
        targetCamX = Math.sin(angle) * 5.6;
        targetCamZ = Math.cos(angle) * 5.6;
        targetCamY = Math.sin(orbitProgress * Math.PI) * 0.8;
      } else if (p >= 0.68 && p < 0.85) {
        const immerseProgress = (p - 0.68) / (0.85 - 0.68);
        const easeImmersion = Math.sin(immerseProgress * Math.PI);
        targetCamZ = THREE.MathUtils.lerp(5.6, 0.35, easeImmersion);
        targetCamY = THREE.MathUtils.lerp(0.0, 0.1, easeImmersion);
        targetCamX = THREE.MathUtils.lerp(0.0, 0.05, easeImmersion);
      }

      // Camera FOV Velocity Blur
      const velNorm = Math.min(vel * 0.04, 1.0);
      camera.fov = THREE.MathUtils.lerp(camera.fov, 42 + velNorm * 12, 0.1);
      camera.updateProjectionMatrix();

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.08);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.08);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.08);
      camera.lookAt(0, 0.1, 0);

      bottleGroup.rotation.y += 0.004;

      // Particle upward drift
      const posAttr = innerGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < innerParticleCount; i++) {
        posArray[i * 3 + 1] += innerSpeeds[i] + velNorm * 0.01;
        if (posArray[i * 3 + 1] > 0.42) {
          posArray[i * 3 + 1] = -1.65;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full relative min-h-[400px]" />;
}
