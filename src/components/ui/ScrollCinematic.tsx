"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Polished3DFallback } from "../3d/Polished3DFallback";

const CinematicTimeline = dynamic(
  () => import("../3d/CinematicTimeline").then((m) => m.CinematicTimeline),
  {
    ssr: false,
    loading: () => <Polished3DFallback />,
  }
);

export function ScrollCinematic() {
  return (
    <section id="cinematic" className="relative w-full bg-[#040406]">
      <CinematicTimeline accentColor="#00f0ff" />
    </section>
  );
}
