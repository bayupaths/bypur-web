import { Server, Code2 } from "lucide-react";
import type { Profile, MobileStat } from "@/lib/types";

// Default mobile stats fallback
export const getDefaultMobileStats = (profileData: Profile): MobileStat[] => [
  {
    value: profileData.stats?.[1]?.value || "5+",
    label: profileData.stats?.[1]?.label.toLowerCase() || "years experience",
    accent: true,
    icon: "ti-briefcase",
  },
  {
    value: profileData.stats?.[0]?.value || "40+",
    label: profileData.stats?.[0]?.label.toLowerCase() || "projects shipped",
    accent: true,
    icon: "ti-rocket",
  },
  {
    value: profileData.techStack?.[0] || "Laravel",
    label: "primary stack",
    accent: false,
    icon: "ti-server",
  },
  {
    value: "100%",
    label: "remote ready",
    accent: false,
    icon: "ti-world",
  },
];

// Map roles with icons
export const mapRolesToIcons = (roles: string[] = []) =>
  roles.map((role) => ({
    label: role,
    icon: role.includes("Backend")
      ? Server
      : role.includes("Laravel")
        ? Code2
        : Server,
  }));
