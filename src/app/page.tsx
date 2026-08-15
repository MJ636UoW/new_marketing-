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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeFlavor, setActiveFlavor] = useState<FlavorStation>(FLAVOR_STATIONS[0]);

  const handleSelectFlavor = (flavor: FlavorStation) => {
    setActiveFlavor(flavor);
  };

  return (
    <main className="relative bg-[#040406] text-[#f0f4f8] min-h-screen overflow-x-hidden">
      {/* 1. Full-screen Loading Sequence */}
      <LoadingSequence onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <>
          {/* 2. Fixed Navigation Header */}
          <Navbar />

          {/* 3. Full-Screen 3D Hero */}
          <HeroSection />

          {/* 4. Scroll-Controlled Cinematic 6-Act Timeline */}
          <ScrollCinematic />

          {/* 5. Product Story Sections ("Change Your State") */}
          <ProductStory />

          {/* 6. Interactive Inside The System Section */}
          <InsideSystem />

          {/* 7. Ingredient Science Section */}
          <IngredientScience />

          {/* 8. CHOOSE YOUR STATE (Flavor Stations Section) */}
          <FlavorSelection
            activeFlavor={activeFlavor}
            onSelectFlavor={handleSelectFlavor}
          />

          {/* 9. Launch Registration Section */}
          <LaunchRegistration />

          {/* 10. Footer */}
          <Footer />
        </>
      )}
    </main>
  );
}
