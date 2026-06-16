// E2E Tests Setup with Playwright
import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./__tests__/e2e",
  testMatch: /.*\.e2e\.ts/,
  
  // Timeout settings
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  
  // Retry on CI
  retries: process.env.CI ? 2 : 0,
  
  // Run tests in parallel
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter for CI and local
  reporter: process.env.CI 
    ? [["list"], ["junit", { outputFile: "test-results/junit.xml" }]]
    : "html",
  
  use: {
    // Base URL
    baseURL: "http://localhost:3000",
    
    // Browser options
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  
  // Configure projects for different browsers
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
    {
      name: "firefox",
      use: { browserName: "firefox" },
    },
    {
      name: "webkit",
      use: { browserName: "webkit" },
    },
  ],
  
  // Web server configuration
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
};

export default config;
