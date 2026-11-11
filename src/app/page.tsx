import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductExperienceSection } from "@/components/sections/ProductExperienceSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionDiagramSection } from "@/components/sections/SolutionDiagramSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { CapabilityMatrixSection } from "@/components/sections/CapabilityMatrixSection";
import { PrivacySection } from "@/components/sections/PrivacySection";
import { EnterpriseSection } from "@/components/sections/EnterpriseSection";
import { EarlyAccessSection } from "@/components/sections/EarlyAccessSection";
import { FaqSection } from "@/components/sections/FaqSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* SECTION 02: HERO */}
      <HeroSection />

      {/* SECTION 03: PRODUCT EXPERIENCE */}
      <ProductExperienceSection />

      {/* SECTION 04: THE PROBLEM */}
      <ProblemSection />

      {/* SECTION 05: THE SOLUTION & SCHEMATIC */}
      <SolutionDiagramSection />

      {/* SECTION 06: HOW SPIKER WORKS */}
      <HowItWorksSection />

      {/* SECTION 07: TECHNOLOGY & ARCHITECTURE */}
      <TechnologySection />

      {/* SECTION 08: OPERATIONAL USE CASES */}
      <UseCasesSection />

      {/* SECTION 09: PRODUCT STATUS & CAPABILITY MATRIX */}
      <CapabilityMatrixSection />

      {/* SECTION 10: PRIVACY ARCHITECTURE */}
      <PrivacySection />

      {/* SECTION 11: ENTERPRISE & PILOT COHORTS */}
      <EnterpriseSection />

      {/* SECTION 12: EARLY ACCESS INTAKE */}
      <EarlyAccessSection />

      {/* SECTION 13: TECHNICAL FAQ */}
      <FaqSection />
    </div>
  );
}

