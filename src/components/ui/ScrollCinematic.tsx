"use client";

import React from "react";
import { CinematicTimeline } from "../3d/CinematicTimeline";

export function ScrollCinematic() {
  return (
    <section id="cinematic" className="relative w-full bg-[#040406]">
      <CinematicTimeline accentColor="#00f0ff" />
    </section>
  );
}
