import type { Project } from "@/lib/types";

export const generateTags = (projects: Project[]): string[] => {
  const set = new Set<string>();
  projects.forEach((p) => p.techStack.forEach((t) => set.add(t)));
  return ["All", ...Array.from(set).slice(0, 6)];
};
