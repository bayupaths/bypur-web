// Portfolio API - Simple static data untuk portfolio pribadi
// Fokus ke static data, backend API opsional (bisa ditambah nanti kalau perlu)

import { env } from "@/lib/env";
import { fetchApi } from "@/lib/api-client";
import { experiences as staticExperiences } from "@/lib/data/experiences";
import { profile as staticProfile } from "@/lib/data/profile";
import { projects as staticProjects } from "@/lib/data/projects";
import { services as staticServices } from "@/lib/data/services";
import { skills as staticSkills } from "@/lib/data/skills";
import type { Experience, Profile, Project, Service, Skill } from "@/lib/types";

/**
 * Helper: Fetch dari backend atau fallback ke static data
 * Untuk portfolio pribadi, default pakai static data
 */
async function getData<T>(endpoint: string, staticData: T): Promise<T> {
  // Kalau backend tidak diaktifkan, langsung return static data
  if (!env.useBackend) {
    return staticData;
  }

  // Try fetch dari backend
  const response = await fetchApi<T>(endpoint);
  
  // Kalau berhasil, return data dari backend
  if (response.data) {
    return response.data;
  }

  // Kalau gagal, fallback ke static data
  if (env.isDev) {
    console.warn(`Backend failed for ${endpoint}, using static data`);
  }
  return staticData;
}

// Export simple getters - langsung return static data
// Kalau mau pakai backend nanti, tinggal set NEXT_PUBLIC_USE_BACKEND=true

export async function getProfile(): Promise<Profile> {
  return getData("/profile", staticProfile);
}

export async function getServices(): Promise<Service[]> {
  return getData("/services", staticServices);
}

export async function getSkills(): Promise<Skill[]> {
  return getData("/skills", staticSkills);
}

export async function getExperiences(): Promise<Experience[]> {
  return getData("/experiences", staticExperiences);
}

export async function getProjects(): Promise<Project[]> {
  return getData("/projects", staticProjects);
}

// Simple export untuk semua data sekaligus
export const portfolioApi = {
  getProfile,
  getServices,
  getSkills,
  getExperiences,
  getProjects,
};
