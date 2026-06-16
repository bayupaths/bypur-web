"use client";

import { FadeUp } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionContainer } from "@/components/ui/section-container";
import { NarrativeSection } from "./about/narrative-section";
import { ServicesList } from "./about/services-list";
import { getYearLabel } from "./about/utils";
import { usePortfolio } from "@/contexts/portfolio-context";

export default function AboutSection() {
  const { profile: profileData, services: servicesData, loading } = usePortfolio();

  // Derived data
  const yearLabel = getYearLabel(profileData);
  const aboutLabel = profileData.about?.label || "About";
  const aboutTitle = profileData.about?.title || "A developer who cares about";
  const aboutTitleHighlight = profileData.about?.titleHighlight || "the full picture.";

  if (loading) {
    return (
      <SectionContainer id="about" background="subtle">
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer id="about" background="subtle">
      <FadeUp>
        <SectionHeader
          label={aboutLabel}
          title={
            <>
              {aboutTitle}{" "}
              <span className="text-accent">{aboutTitleHighlight}</span>
            </>
          }
        />
      </FadeUp>

      <div className="mx-auto mt-10 grid max-w-5xl gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        {/* LEFT - Narrative */}
        <NarrativeSection profileData={profileData} yearLabel={yearLabel} />

        {/* RIGHT - What I do */}
        <ServicesList services={servicesData} />
      </div>
    </SectionContainer>
  );
}
