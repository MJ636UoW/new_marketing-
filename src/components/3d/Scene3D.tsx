"use client";

import React from "react";
import { Aer0HeroCanvas } from "./Aer0HeroCanvas";

interface Scene3DProps {
  accentColor?: string;
  scrollProgress?: number;
  scale?: number;
}

export function Scene3D({
  accentColor = "#00f0ff",
  scale = 1.15,
}: Scene3DProps) {
  return (
    <div className="w-full h-full relative pointer-events-none min-h-[400px]">
      <Aer0HeroCanvas accentColor={accentColor} scale={scale} />
    </div>
  );
}
