// Integration Tests for API Routes
import { GET as getProfile } from "@/app/api/profile/route";
import { GET as getServices } from "@/app/api/services/route";
import { GET as getSkills } from "@/app/api/skills/route";
import { GET as getExperiences } from "@/app/api/experiences/route";
import { GET as getProjects } from "@/app/api/projects/route";

describe("API Routes Integration", () => {
  describe("GET /api/profile", () => {
    it("should return profile data", async () => {
      const response = await getProfile();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("name");
      expect(data).toHaveProperty("email");
      expect(data).toHaveProperty("title");
    });

    it("should return valid profile structure", async () => {
      const response = await getProfile();
      const data = await response.json();

      expect(data.name).toBeDefined();
      expect(typeof data.name).toBe("string");
      expect(data.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });
  });

  describe("GET /api/services", () => {
    it("should return services array", async () => {
      const response = await getServices();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
    });

    it("should return valid service structure", async () => {
      const response = await getServices();
      const data = await response.json();

      if (data.length > 0) {
        const service = data[0];
        expect(service).toHaveProperty("title");
        expect(service).toHaveProperty("slug");
        expect(service).toHaveProperty("description");
      }
    });
  });

  describe("GET /api/skills", () => {
    it("should return skills array", async () => {
      const response = await getSkills();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
    });

    it("should return valid skill structure", async () => {
      const response = await getSkills();
      const data = await response.json();

      if (data.length > 0) {
        const skill = data[0];
        expect(skill).toHaveProperty("name");
        expect(skill).toHaveProperty("category");
        expect(["frontend", "backend", "tools", "ai", "other"]).toContain(
          skill.category
        );
      }
    });
  });

  describe("GET /api/experiences", () => {
    it("should return experiences array", async () => {
      const response = await getExperiences();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
    });

    it("should return valid experience structure", async () => {
      const response = await getExperiences();
      const data = await response.json();

      if (data.length > 0) {
        const exp = data[0];
        expect(exp).toHaveProperty("id");
        expect(exp).toHaveProperty("company");
        expect(exp).toHaveProperty("role");
        expect(exp).toHaveProperty("period");
        expect(exp).toHaveProperty("description");
        expect(Array.isArray(exp.description)).toBe(true);
      }
    });
  });

  describe("GET /api/projects", () => {
    it("should return projects array", async () => {
      const response = await getProjects();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
    });

    it("should return valid project structure", async () => {
      const response = await getProjects();
      const data = await response.json();

      if (data.length > 0) {
        const project = data[0];
        expect(project).toHaveProperty("id");
        expect(project).toHaveProperty("title");
        expect(project).toHaveProperty("description");
        expect(project).toHaveProperty("techStack");
        expect(Array.isArray(project.techStack)).toBe(true);
      }
    });
  });
});
