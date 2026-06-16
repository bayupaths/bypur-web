// Integration Tests for PortfolioContext
import { renderHook, waitFor } from "@testing-library/react";
import { PortfolioProvider, usePortfolio } from "@/contexts/portfolio-context";
import { ReactNode } from "react";

// Mock fetch globally
global.fetch = jest.fn();

describe("PortfolioContext Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <PortfolioProvider>{children}</PortfolioProvider>
  );

  it("should provide initial loading state", async () => {
    // Suppress React act warning for initial state check
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation((msg) => {
      if (!msg.toString().includes("act(")) {
        console.warn(msg);
      }
    });

    const { result } = renderHook(() => usePortfolio(), { wrapper });

    expect(result.current.loading).toBe(true);

    // Wait for loading to complete to avoid memory leaks
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    consoleErrorSpy.mockRestore();
  });

  it("should fetch all data in parallel", async () => {
    const mockProfile = { name: "Test", email: "test@test.com" };
    const mockServices = [{ title: "Service 1", slug: "service-1" }];
    const mockSkills = [{ name: "React", category: "frontend" }];
    const mockExperiences = [{ id: 1, company: "Company A", role: "Developer" }];
    const mockProjects = [{ id: 1, title: "Project A", description: "Desc", techStack: [] }];

    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes("/api/profile")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProfile),
        });
      }
      if (url.includes("/api/services")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockServices),
        });
      }
      if (url.includes("/api/skills")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockSkills),
        });
      }
      if (url.includes("/api/experiences")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockExperiences),
        });
      }
      if (url.includes("/api/projects")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProjects),
        });
      }
      return Promise.reject(new Error("Unknown URL"));
    });

    const { result } = renderHook(() => usePortfolio(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(global.fetch).toHaveBeenCalledTimes(5);
    expect(global.fetch).toHaveBeenCalledWith("/api/profile");
    expect(global.fetch).toHaveBeenCalledWith("/api/services");
    expect(global.fetch).toHaveBeenCalledWith("/api/skills");
    expect(global.fetch).toHaveBeenCalledWith("/api/experiences");
    expect(global.fetch).toHaveBeenCalledWith("/api/projects");
  });

  it("should handle API failures gracefully and use fallback data", async () => {
    // Suppress console.error for this test since we expect it
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    (global.fetch as jest.Mock).mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => usePortfolio(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Should still have fallback static data
    expect(result.current.profile).toBeDefined();
    expect(result.current.services).toBeDefined();
    expect(result.current.skills).toBeDefined();
    expect(result.current.experiences).toBeDefined();
    expect(result.current.projects).toBeDefined();

    consoleErrorSpy.mockRestore();
  });

  it("should update profile data when API returns successfully", async () => {
    const mockProfile = {
      name: "Bayu Purnomo Updated",
      title: "Senior Backend Engineer",
      email: "new@test.com",
      location: "Jakarta",
      avatar: "/new-avatar.png",
      bio: "Updated bio",
      socials: {},
    };

    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes("/api/profile")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProfile),
        });
      }
      return Promise.resolve({ ok: false });
    });

    const { result } = renderHook(() => usePortfolio(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.profile.name).toBe("Bayu Purnomo Updated");
    expect(result.current.profile.title).toBe("Senior Backend Engineer");
  });

  it("should throw error when usePortfolio is used outside provider", () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    expect(() => {
      renderHook(() => usePortfolio());
    }).toThrow("usePortfolio must be used within a PortfolioProvider");

    consoleSpy.mockRestore();
  });
});
