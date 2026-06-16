// Unit Tests for Stack Section Utils
import { getIconComponent, filterSkills } from "@/components/sections/stack/utils";
import { Server, Database, Layers, Zap } from "lucide-react";
import type { Skill } from "@/lib/types";

describe("Stack Section Utils", () => {
  describe("getIconComponent", () => {
    it("should return Server icon for 'Server' string", () => {
      const icon = getIconComponent("Server");
      expect(icon).toBe(Server);
    });

    it("should return Database icon for 'Database' string", () => {
      const icon = getIconComponent("Database");
      expect(icon).toBe(Database);
    });

    it("should return Layers icon for 'Layers' string", () => {
      const icon = getIconComponent("Layers");
      expect(icon).toBe(Layers);
    });

    it("should return Zap icon for 'Zap' string", () => {
      const icon = getIconComponent("Zap");
      expect(icon).toBe(Zap);
    });

    it("should return Server as default for unknown icon", () => {
      const icon = getIconComponent("Unknown");
      expect(icon).toBe(Server);
    });
  });

  describe("filterSkills", () => {
    const allSkills: Skill[] = [
      { name: "Laravel", category: "backend" },
      { name: "Vue.js", category: "frontend" },
      { name: "Redis", category: "backend" },
      { name: "TypeScript", category: "frontend" },
      { name: "Docker", category: "tools" },
    ];

    it("should filter out skills in primary set", () => {
      const primarySet = new Set(["Laravel"]);
      const familiarSet = new Set<string>();
      const result = filterSkills(allSkills, primarySet, familiarSet);

      expect(result).toHaveLength(4);
      expect(result.find((s) => s.name === "Laravel")).toBeUndefined();
    });

    it("should filter out skills in familiar set", () => {
      const primarySet = new Set<string>();
      const familiarSet = new Set(["Redis", "TypeScript"]);
      const result = filterSkills(allSkills, primarySet, familiarSet);

      expect(result).toHaveLength(3);
      expect(result.find((s) => s.name === "Redis")).toBeUndefined();
      expect(result.find((s) => s.name === "TypeScript")).toBeUndefined();
    });

    it("should filter out skills in both sets", () => {
      const primarySet = new Set(["Laravel"]);
      const familiarSet = new Set(["Redis"]);
      const result = filterSkills(allSkills, primarySet, familiarSet);

      expect(result).toHaveLength(3);
      expect(result.find((s) => s.name === "Laravel")).toBeUndefined();
      expect(result.find((s) => s.name === "Redis")).toBeUndefined();
    });

    it("should return all skills when sets are empty", () => {
      const primarySet = new Set<string>();
      const familiarSet = new Set<string>();
      const result = filterSkills(allSkills, primarySet, familiarSet);

      expect(result).toHaveLength(5);
    });
  });
});
