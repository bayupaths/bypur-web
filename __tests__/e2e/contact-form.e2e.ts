// E2E Test: Contact Form Flow
import { test, expect } from "@playwright/test";

test.describe("Contact Form E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator('a[href="#contact"]').first().click();
    await page.waitForSelector("section#contact");
  });

  test("should display contact form", async ({ page }) => {
    await expect(page.getByText(/Send me a message/i)).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test("should select project type", async ({ page }) => {
    const webAppOption = page.locator('input[value="Web app"]');
    await webAppOption.check();
    await expect(webAppOption).toBeChecked();

    const apiOption = page.locator('input[value="API / Backend"]');
    await apiOption.check();
    await expect(apiOption).toBeChecked();
    await expect(webAppOption).not.toBeChecked();
  });

  test("should validate required fields", async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // HTML5 validation should prevent submission
    const nameInput = page.locator('input[name="name"]');
    const isRequired = await nameInput.evaluate((el: HTMLInputElement) => el.required);
    expect(isRequired).toBe(true);
  });

  test("should fill and submit contact form", async ({ page }) => {
    await page.locator('input[name="name"]').fill("John Doe");
    await page.locator('input[name="email"]').fill("john@example.com");
    await page.locator('textarea[name="message"]').fill("Hello, I would like to work with you.");

    // Select project type
    await page.locator('input[value="Web app"]').check();

    // Note: Actual submission will open mailto link
    // We're just testing the form can be filled
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled();
  });

  test("should display contact information cards", async ({ page }) => {
    await expect(page.getByText(/bayupurnomo\.dev@gmail\.com/i)).toBeVisible();
    await expect(page.getByText(/Indonesia/i)).toBeVisible();
  });

  test("should copy email to clipboard", async ({ page }) => {
    const copyButton = page.locator('button[aria-label*="Copy"]').first();
    await copyButton.click();

    // Check if button shows "Copied" state
    await expect(page.locator('button[aria-label*="Copied"]').first()).toBeVisible();

    // Wait for state to reset
    await page.waitForTimeout(2100);
  });

  test("should count message characters", async ({ page }) => {
    const messageField = page.locator('textarea[name="message"]');
    const testMessage = "This is a test message";

    await messageField.fill(testMessage);

    // Check character counter
    const counter = page.locator('span:has-text("/1000")');
    await expect(counter).toContainText(`${testMessage.length}/1000`);
  });
});
