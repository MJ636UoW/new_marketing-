export interface ProductState {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  accent: "cyan" | "lime";
  hex: string;
  tagline: string;
  description: string;
  telemetry: {
    bioResonance: string;
    dopamineFlux: string;
    absorptionTime: string;
    cellularCharge: string;
  };
}

export const PRODUCT_STATES: ProductState[] = [
  {
    id: "focus",
    code: "STATE 01",
    name: "NEURAL FOCUS",
    subtitle: "SYNAPTIC ACCELERATION",
    accent: "cyan",
    hex: "#00f0ff",
    tagline: "Alpha-wave resonance for peak cognitive endurance.",
    description:
      "Engineered to cross the blood-brain barrier rapidly. Eliminates cognitive friction and locks your mind into deep flow state without central nervous system jitter.",
    telemetry: {
      bioResonance: "98.4%",
      dopamineFlux: "+310%",
      absorptionTime: "4.2 MIN",
      cellularCharge: "+45mV",
    },
  },
  {
    id: "shift",
    code: "STATE 02",
    name: "KINETIC SHIFT",
    subtitle: "METABOLIC POWER FLUX",
    accent: "lime",
    hex: "#ccff00",
    tagline: "Clean cellular energy surge without crash kinetics.",
    description:
      "Direct mitochondrial activation via botanical adaptogen matrix and micro-ionized electrolytes. Sustains physical and mental momentum across extended output cycles.",
    telemetry: {
      bioResonance: "99.1%",
      dopamineFlux: "+240%",
      absorptionTime: "3.8 MIN",
      cellularCharge: "+68mV",
    },
  },
  {
    id: "reset",
    code: "STATE 03",
    name: "CELLULAR RESET",
    subtitle: "MITOCHONDRIAL RECOVERY",
    accent: "cyan",
    hex: "#00f0ff",
    tagline: "Rapid ionic rehydration and oxidative stress reduction.",
    description:
      "Clears metabolic lactate build-up while restoring intracellular electrolyte balance. High-density antioxidants repair oxidative stress at the cellular level.",
    telemetry: {
      bioResonance: "97.8%",
      dopamineFlux: "+180%",
      absorptionTime: "2.9 MIN",
      cellularCharge: "+82mV",
    },
  },
];

export interface Formula {
  id: string;
  code: string;
  name: string;
  flavourNotes: string[];
  volume: string;
  pressure: string;
  colorHex: string;
  accent: "cyan" | "lime";
  tagline: string;
  density: string;
  purity: string;
  activeCore: string;
}

export const FORMULAS: Formula[] = [
  {
    id: "formula-01",
    code: "FORMULA 01",
    name: "ZERO-POINT BLUE",
    flavourNotes: ["ARCTIC MINT", "BLUE LOTUS", "IONIZED OXYGEN"],
    volume: "355ml // 12 FL OZ",
    pressure: "2.8 BAR",
    colorHex: "#00f0ff",
    accent: "cyan",
    tagline: "Ultra-crisp sub-zero mental clarity formulation.",
    density: "1.024 g/cm³",
    purity: "99.9%",
    activeCore: "ALPHA-GPC 600MG + L-TYROSINE",
  },
  {
    id: "formula-02",
    code: "FORMULA 02",
    name: "NEURAL LIME",
    flavourNotes: ["YUZU ESSENCE", "BERGAMOT CITRUS", "KAFFIR LEAF"],
    volume: "355ml // 12 FL OZ",
    pressure: "3.1 BAR",
    colorHex: "#ccff00",
    accent: "lime",
    tagline: "Sharp citrus kinetic energy surge with adaptogenic shield.",
    density: "1.031 g/cm³",
    purity: "99.7%",
    activeCore: "BOTANICAL ADAPTOGEN + RHODIOLA",
  },
  {
    id: "formula-03",
    code: "FORMULA 03",
    name: "SYNAPSE DARK",
    flavourNotes: ["BLACK CURRANT", "WILD ACAI", "MICRO-ION COCOA"],
    volume: "355ml // 12 FL OZ",
    pressure: "2.9 BAR",
    colorHex: "#00f0ff",
    accent: "cyan",
    tagline: "Deep antioxidant focus matrix with dark botanical notes.",
    density: "1.028 g/cm³",
    purity: "99.8%",
    activeCore: "ELECTROLYTE MATRIX + L-THEANINE",
  },
];

export interface Ingredient {
  id: string;
  code: string;
  name: string;
  dosage: string;
  purity: string;
  molecularFormula: string;
  role: string;
  description: string;
  mechanics: string;
  accent: "cyan" | "lime";
}

export const INGREDIENTS: Ingredient[] = [
  {
    id: "tyrosine",
    code: "ING-01",
    name: "N-ACETYL L-TYROSINE",
    dosage: "800mg",
    purity: "99.8%",
    molecularFormula: "C11H13NO4",
    role: "Neuro-Precursor Synthesizer",
    description:
      "Rapid-absorb amino acid formulation designed to maintain dopamine production during intense cognitive workload.",
    mechanics: "Crosses blood-brain barrier 3.2x faster than standard L-Tyrosine.",
    accent: "cyan",
  },
  {
    id: "alphagpc",
    code: "ING-02",
    name: "ALPHA-GPC 99%",
    dosage: "600mg",
    purity: "99.5%",
    molecularFormula: "C8H20NO6P",
    role: "Choline Signal Booster",
    description:
      "Pharmaceutical-grade cholinergic compound that boosts acetylcholine synthesis for heightened mental processing speed.",
    mechanics: "Enhances synaptic firing rates and inter-hemispheric signal velocity.",
    accent: "lime",
  },
  {
    id: "ion-matrix",
    code: "ING-03",
    name: "BOTANICAL ION MATRIX",
    dosage: "450mg",
    purity: "99.9%",
    molecularFormula: "Na-K-Mg-Zn",
    role: "Bio-Electric Hydrator",
    description:
      "Precision blend of chelated magnesium, potassium, and zinc ions coupled with standardized Rhodiola Rosea extract.",
    mechanics: "Prevents cellular dehydration and modulates cortisol response curves.",
    accent: "cyan",
  },
  {
    id: "micro-co2",
    code: "ING-04",
    name: "MICRO-AERATED CARBONATION",
    dosage: "Atmospheric",
    purity: "100%",
    molecularFormula: "CO2 (Sub-micron)",
    role: "Mucosal Transport Engine",
    description:
      "Sub-micron gas bubble dispersion system that creates a velvet mouthfeel while increasing mucosal absorption rates.",
    mechanics: "Accelerates active compound uptake into systemic circulation within 3 minutes.",
    accent: "lime",
  },
];
