import { FadeUp } from "@/components/ui/motion";
import { StatsRow } from "./stats-row";
import { CTAButtons } from "./cta-buttons";
import type { Profile } from "@/lib/types";

interface NarrativeSectionProps {
  profileData: Profile;
  yearLabel: string;
}

export function NarrativeSection({
  profileData,
  yearLabel,
}: NarrativeSectionProps) {
  const about = profileData.about;

  return (
    <FadeUp delay={0.05}>
      <div className="flex flex-col">
        {/* Headline */}
        {about?.headline && (
          <p className="text-lg leading-[1.75] text-text-1 sm:text-xl sm:leading-[1.7]">
            {about.headline.split(/(\*\*.*?\*\*)/).map((part, idx) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong key={idx} className="font-semibold">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return part;
            })}
          </p>
        )}

        {/* Description */}
        {about?.description && (
          <p className="mt-5 text-[15px] leading-[1.8] text-text-2">
            {about.description}
          </p>
        )}

        {/* Stats row */}
        <StatsRow profileData={profileData} yearLabel={yearLabel} />

        {/* CTAs */}
        <CTAButtons cta={about?.cta} resumeUrl={profileData.resumeUrl} />
      </div>
    </FadeUp>
  );
}
