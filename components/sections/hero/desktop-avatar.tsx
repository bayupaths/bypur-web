import { DecorativeAvatar } from "@/components/ui/decorative-avatar";
import { FloatingBadges } from "./floating-badges";
import type { Profile } from "@/lib/types";

interface DesktopAvatarProps {
  profileData: Profile;
}

export function DesktopAvatar({ profileData }: DesktopAvatarProps) {
  return (
    <div className="relative mx-auto w-full max-w-xs sm:max-w-sm hidden lg:block">
      <DecorativeAvatar
        src={profileData.avatar}
        alt={profileData.name}
        size="xl"
        decoration="rings"
        shape="circle"
        showGlow={true}
        priority
      />

      {/* Floating badges */}
      <FloatingBadges highlights={profileData.highlights} />
    </div>
  );
}
