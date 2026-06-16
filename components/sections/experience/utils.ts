import type { Experience } from "@/lib/types";

export const calculateYearsExp = (experiences: Experience[]): number => {
  if (!experiences.length) return 0;
  const years = experiences.map((e) => {
    const match = e.period.match(/\d{4}/);
    return match ? parseInt(match[0], 10) : new Date().getFullYear();
  });
  return new Date().getFullYear() - Math.min(...years);
};
