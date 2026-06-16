// E2E Test: Portfolio Navigation Flow
import { test, expect } from "@playwright/test";

test.describe("Portfolio Navigation E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load homepage successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/Bayu Purnomo/i);
    await expect(page.locator("section#hero")).toBeVisible();
  });

  test("should navigate through all sections", async ({ page }) => {
    // Check Hero section
    await expect(page.locator("section#hero")).toBeVisible();
    await expect(page.getByText(/Hi, I'm Bayu/i)).toBeVisible();

    // Scroll to About section
    await page.locator('a[href="#about"]').first().click();
    await expect(page.locator("section#about")).toBeInViewport();

    // Scroll to Skills section
    await page.locator('a[href="#skills"]').first().click();
    await expect(page.locator("section#skills")).toBeInViewport();

    // Scroll to Experience section
    await page.locator('a[href="#experience"]').first().click();
    await expect(page.locator("section#experience")).toBeInViewport();

    // Scroll to Projects section
    await page.locator('a[href="#projects"]').first().click();
    await expect(page.locator("section#projects")).toBeInViewport();

    // Scroll to Contact section
    await page.locator('a[href="#contact"]').first().click();
    await expect(page.locator("section#contact")).toBeInViewport();
  });

  test("should display navigation header with theme toggle", async ({ page }) => {
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("button[aria-label*='theme']")).toBeVisible();
  });

  test("should toggle dark/light theme", async ({ page }) => {
    const themeToggle = page.locator("button[aria-label*='theme']");
    await themeToggle.click();

    // Wait for theme transition
    await page.waitForTimeout(300);

    // Click again to toggle back
    await themeToggle.click();
    await page.waitForTimeout(300);
  });

  test("should display social links in footer", async ({ page }) => {
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect(page.locator("footer")).toBeVisible();

    // Check for social links
    const socialLinks = page.locator('footer a[href*="github"], a[href*="linkedin"]');
    await expect(socialLinks.first()).toBeVisible();
  });
});
