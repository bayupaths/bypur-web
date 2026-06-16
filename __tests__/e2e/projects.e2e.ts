// E2E Test: Projects Section Interaction
import { test, expect } from "@playwright/test";

test.describe("Projects Section E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator('a[href="#projects"]').first().click();
    await page.waitForSelector("section#projects");
  });

  test("should display projects section", async ({ page }) => {
    await expect(page.locator("section#projects")).toBeVisible();
    await expect(page.getByText(/Selected work/i)).toBeVisible();
  });

  test("should display project cards", async ({ page }) => {
    const projectCards = page.locator("section#projects article, section#projects > div > div > div > div");
    await expect(projectCards.first()).toBeVisible();
  });

  test("should filter projects by technology", async ({ page }) => {
    // Wait for filter buttons to load
    await page.waitForSelector('button:has-text("All")');

    // Click on "All" filter
    await page.locator('button:has-text("All")').click();

    // Get all visible project cards
    const allProjectsCount = await page
      .locator("section#projects article, section#projects > div > div > div > div")
      .count();

    // Check if we have any tech filter buttons (besides "All")
    const filterButtons = page.locator('button').filter({ hasText: /^(React|Vue|Laravel|TypeScript|Next)/ });
    const filterCount = await filterButtons.count();

    if (filterCount > 0) {
      // Click on first tech filter
      await filterButtons.first().click();
      await page.waitForTimeout(300); // Wait for filter animation

      // Count filtered projects
      const filteredCount = await page
        .locator("section#projects article, section#projects > div > div > div > div")
        .count();

      // Filtered count should be less than or equal to all projects
      expect(filteredCount).toBeLessThanOrEqual(allProjectsCount);
    }
  });

  test("should display project tech stack badges", async ({ page }) => {
    const badges = page.locator("section#projects span, section#projects badge");
    await expect(badges.first()).toBeVisible();
  });

  test("should have proper responsive layout", async ({ page }) => {
    // Desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator("section#projects")).toBeVisible();

    // Tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator("section#projects")).toBeVisible();

    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator("section#projects")).toBeVisible();
  });
});
