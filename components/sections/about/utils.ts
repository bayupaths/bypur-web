import type { Profile } from "@/lib/types";

// Default year label fallback
export const getYearLabel = (profileData: Profile): string => {
  return profileData.about?.yearLabel || "years";
};
