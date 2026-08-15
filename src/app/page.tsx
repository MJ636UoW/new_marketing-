"use client";

import React, { useState } from "react";
import { LoadingSequence } from "@/components/ui/LoadingSequence";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { ScrollCinematic } from "@/components/ui/ScrollCinematic";
import { ProductStory } from "@/components/ui/ProductStory";
import { IngredientScience } from "@/components/ui/IngredientScience";
import { FlavorSelection } from "@/components/ui/FlavorSelection";
import { LaunchRegistration } from "@/components/ui/LaunchRegistration";
import { Footer } from "@/components/ui/Footer";
import { PRODUCT_STATES, FORMULAS, ProductState, Formula } from "@/lib/constants";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeState, setActiveState] = useState<ProductState>(PRODUCT_STATES[0]);
  const [activeFormula, setActiveFormula] = useState<Formula>(FORMULAS[0]);

  // Sync formula selection with active state accent color
  const handleFormulaSelect = (formula: Formula) => {
    setActiveFormula(formula);
    // Find matching state or update color accent
    const matchingState = PRODUCT_STATES.find(
      (s) => s.accent === formula.accent
    );
    if (matchingState) {
      setActiveState(matchingState);
    }
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
          <HeroSection
            activeState={activeState}
            onStateSelect={setActiveState}
          />

          {/* 4. Scroll-Controlled Cinematic Product Animation */}
          <ScrollCinematic />

          {/* 5. Product Story Sections ("Change Your State") */}
          <ProductStory />

          {/* 6. Ingredient Science Section */}
          <IngredientScience />

          {/* 7. Flavor Selection Section */}
          <FlavorSelection
            activeFormula={activeFormula}
            onFormulaSelect={handleFormulaSelect}
          />

          {/* 8. Launch Registration Section */}
          <LaunchRegistration />

          {/* 9. Footer */}
          <Footer />
        </>
      )}
    </main>
  );
}
