import { Zap, Server, Layers, Database, type LucideIcon } from "lucide-react";
import type { Skill } from "@/lib/types";

// Map icon string to Lucide component
export const getIconComponent = (iconName: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    Server,
    Database,
    Layers,
    Zap,
  };
  return iconMap[iconName] || Server;
};

// Filter skills by excluding primary and familiar lists
export const filterSkills = (
  allSkills: Skill[],
  primaryNames: Set<string>,
  familiarNames: Set<string>
): Skill[] => {
  return allSkills.filter(
    (skill) => !primaryNames.has(skill.name) && !familiarNames.has(skill.name)
  );
};
