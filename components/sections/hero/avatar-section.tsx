import { FadeUp } from "@/components/ui/motion";
import { MobileStatsGrid } from "./mobile-stats";
import { TechStackTags } from "./tech-stack-tags";
import { DesktopAvatar } from "./desktop-avatar";
import type { Profile, MobileStat } from "@/lib/types";

interface AvatarSectionProps {
  profileData: Profile;
  mobileStats: MobileStat[];
  techStackPreview: string[];
}

export function AvatarSection({
  profileData,
  mobileStats,
  techStackPreview,
}: AvatarSectionProps) {
  return (
    <FadeUp delay={0.12}>
      {/* Mobile: Stats Cards */}
      <div className="lg:hidden flex flex-col gap-4">
        <MobileStatsGrid stats={mobileStats} />
        <TechStackTags tags={techStackPreview} />
      </div>

      {/* Desktop: Avatar with floating badges */}
      <DesktopAvatar profileData={profileData} />
    </FadeUp>
  );
}
