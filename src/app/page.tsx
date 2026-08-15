"use client";

import React, { useState } from "react";
import { LoadingSequence } from "@/components/ui/LoadingSequence";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { ScrollCinematic } from "@/components/ui/ScrollCinematic";
import { ProductStory } from "@/components/ui/ProductStory";
import { InsideSystem } from "@/components/ui/InsideSystem";
import { IngredientScience } from "@/components/ui/IngredientScience";
import { FlavorSelection } from "@/components/ui/FlavorSelection";
import { LaunchRegistration } from "@/components/ui/LaunchRegistration";
import { Footer } from "@/components/ui/Footer";
import { FORMULAS, Formula } from "@/lib/constants";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeFormula, setActiveFormula] = useState<Formula>(FORMULAS[0]);

  const handleFormulaSelect = (formula: Formula) => {
    setActiveFormula(formula);
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

          {/* 8. Flavor Selection Section */}
          <FlavorSelection
            activeFormula={activeFormula}
            onFormulaSelect={handleFormulaSelect}
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
