"use client";

import React, { useState } from "react";
import { LoadingSequence } from "@/components/ui/LoadingSequence";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { ScrollCinematic } from "@/components/ui/ScrollCinematic";
import { ProductStory } from "@/components/ui/ProductStory";
import { InsideSystem } from "@/components/ui/InsideSystem";
import { IngredientScience } from "@/components/ui/IngredientScience";
import { FlavorSelection, FLAVOR_STATIONS, FlavorStation } from "@/components/ui/FlavorSelection";
import { LaunchRegistration } from "@/components/ui/LaunchRegistration";
import { Footer } from "@/components/ui/Footer";
import { GlobalModals, ModalType } from "@/components/ui/GlobalModals";

export default function Home() {
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(true);
  const [activeFlavor, setActiveFlavor] = useState<FlavorStation>(FLAVOR_STATIONS[0]);
  const [activeModal, setActiveModal] = useState<ModalType>("none");

  const handleSelectFlavor = (flavor: FlavorStation) => {
    setActiveFlavor(flavor);
  };

  const handleOpenModal = (modal: ModalType) => {
    setActiveModal(modal);
  };

  const handleCloseModal = () => {
    setActiveModal("none");
  };

  return (
    <main className="relative bg-[#040406] text-[#f0f4f8] min-h-screen overflow-x-hidden">
      {/* 1. Diagnostic Boot Loading Overlay */}
      {showLoadingOverlay && (
        <LoadingSequence onComplete={() => setShowLoadingOverlay(false)} />
      )}

      {/* 2. Main Site Structure Always Mounted & Ready */}
      <Navbar onOpenModal={handleOpenModal} />
      <HeroSection onOpenModal={handleOpenModal} />
      <ScrollCinematic />
      <ProductStory />
      <InsideSystem />
      <IngredientScience />
      <FlavorSelection
        activeFlavor={activeFlavor}
        onSelectFlavor={handleSelectFlavor}
      />
      <LaunchRegistration />
      <Footer onOpenModal={handleOpenModal} />

      {/* 3. Global Modals Suite */}
      <GlobalModals
        activeModal={activeModal}
        onClose={handleCloseModal}
        defaultFlavor={activeFlavor.name}
      />
    </main>
  );
}
