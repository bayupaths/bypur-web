"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { profile } from "@/lib/data/profile";
import { services } from "@/lib/data/services";
import { skills } from "@/lib/data/skills";
import { experiences } from "@/lib/data/experiences";
import { projects } from "@/lib/data/projects";
import type { Profile, Service, Skill, Experience, Project } from "@/lib/types";

interface PortfolioContextType {
  profile: Profile;
  services: Service[];
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
  loading: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [profileData, setProfileData] = useState<Profile>(profile);
  const [servicesData, setServicesData] = useState<Service[]>(services);
  const [skillsData, setSkillsData] = useState<Skill[]>(skills);
  const [experiencesData, setExperiencesData] = useState<Experience[]>(experiences);
  const [projectsData, setProjectsData] = useState<Project[]>(projects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [profileRes, servicesRes, skillsRes, experiencesRes, projectsRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/services"),
          fetch("/api/skills"),
          fetch("/api/experiences"),
          fetch("/api/projects"),
        ]);

        if (profileRes?.ok) {
          const profileJson = await profileRes.json();
          setProfileData(profileJson);
        }

        if (servicesRes?.ok) {
          const servicesJson = await servicesRes.json();
          setServicesData(servicesJson);
        }

        if (skillsRes?.ok) {
          const skillsJson = await skillsRes.json();
          setSkillsData(skillsJson);
        }

        if (experiencesRes?.ok) {
          const experiencesJson = await experiencesRes.json();
          setExperiencesData(experiencesJson);
        }

        if (projectsRes?.ok) {
          const projectsJson = await projectsRes.json();
          setProjectsData(projectsJson);
        }
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error);
        // Fallback to static data
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        profile: profileData,
        services: servicesData,
        skills: skillsData,
        experiences: experiencesData,
        projects: projectsData,
        loading,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
