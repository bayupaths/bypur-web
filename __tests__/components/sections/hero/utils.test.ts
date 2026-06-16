// Unit Tests for Hero Section Utils
import { mapRolesToIcons, getDefaultMobileStats } from "@/components/sections/hero/utils";
import type { Profile } from "@/lib/types";

describe("Hero Section Utils", () => {
  describe("mapRolesToIcons", () => {
    it("should map roles to icon objects correctly", () => {
      const roles = ["Backend Engineer", "Systems Architect"];
      const result = mapRolesToIcons(roles);

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty("label", "Backend Engineer");
      expect(result[0]).toHaveProperty("icon");
      expect(result[1]).toHaveProperty("label", "Systems Architect");
    });

    it("should handle empty roles array", () => {
      const result = mapRolesToIcons([]);
      expect(result).toEqual([]);
    });

    it("should handle undefined roles", () => {
      const result = mapRolesToIcons(undefined);
      expect(result).toEqual([]);
    });

    it("should map roles to have icon property", () => {
      const roles = ["Backend Engineer", "Systems Architect"];
      const result = mapRolesToIcons(roles);
      expect(result[0].icon).toBeDefined();
      expect(typeof result[0].icon).toBe("object"); // Lucide icons are React components (objects)
    });

    it("should map Developer roles correctly", () => {
      const roles = ["Full Stack Developer"];
      const result = mapRolesToIcons(roles);
      expect(result[0].icon).toBeDefined();
      expect(typeof result[0].icon).toBe("object");
    });
  });

  describe("getDefaultMobileStats", () => {
    const mockProfile: Profile = {
      name: "Bayu Purnomo",
      title: "Backend Engineer",
      bio: "Test bio",
      email: "test@example.com",
      location: "Indonesia",
      avatar: "/avatar.png",
      socials: {},
    };

    it("should generate default mobile stats from profile", () => {
      const result = getDefaultMobileStats(mockProfile);

      expect(result).toHaveLength(4);
      expect(result[0]).toMatchObject({
        label: "years experience",
        accent: true,
        icon: "ti-briefcase",
      });
    });

    it("should include years experience stat", () => {
      const result = getDefaultMobileStats(mockProfile);
      const yearsStat = result.find((stat) => stat.label === "years experience");
      expect(yearsStat).toBeDefined();
      expect(yearsStat?.value).toMatch(/\d+\+/);
    });

    it("should include projects shipped stat", () => {
      const result = getDefaultMobileStats(mockProfile);
      const projectsStat = result.find((stat) => stat.label === "projects shipped");
      expect(projectsStat).toBeDefined();
      expect(projectsStat?.accent).toBe(true);
    });

    it("should include primary stack stat", () => {
      const result = getDefaultMobileStats(mockProfile);
      const stackStat = result.find((stat) => stat.label === "primary stack");
      expect(stackStat).toBeDefined();
      expect(stackStat?.value).toBeTruthy();
      expect(stackStat?.accent).toBe(false);
    });

    it("should include remote ready stat", () => {
      const result = getDefaultMobileStats(mockProfile);
      const remoteStat = result.find((stat) => stat.label === "remote ready");
      expect(remoteStat).toBeDefined();
      expect(remoteStat?.value).toBe("100%");
    });
  });
});
