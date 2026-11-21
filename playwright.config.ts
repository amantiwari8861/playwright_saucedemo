import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

// UI and API run against different origins, so each project carries its own
// baseURL. A single global baseURL cannot serve both, and leaving it unset
// makes every relative request (page.goto("/"), request.get("/api/v1/..."))
// throw before a request is ever sent.
const UI_BASE_URL = process.env.UI_BASE_URL ?? "https://www.saucedemo.com";

// testMatch is matched against the absolute file path. On Windows that path
// uses backslashes, so a "/tests/ui/" pattern silently never matches.
const UI_SPECS = /[\\/]tests[\\/]ui[\\/]/;

// Specs living directly in tests/ (siblings of the ui/ folder) are excluded by
// UI_SPECS, so they get their own project. This matches only direct children.
const ROOT_SPECS = /[\\/]tests[\\/][^\\/]+\.spec\.ts$/;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    // API tests need a base URL and JSON headers, but never a browser. Keeping
    // them in their own project stops them running 4x across the browser
    // projects below.
    {
      name: "chromium",
      testMatch: UI_SPECS,
      use: { ...devices["Desktop Chrome"], baseURL: UI_BASE_URL },
    },

    {
      name: "firefox",
      testMatch: UI_SPECS,
      use: { ...devices["Desktop Firefox"], baseURL: UI_BASE_URL },
    },

    {
      name: "webkit",
      testMatch: UI_SPECS,
      use: { ...devices["Desktop Safari"], baseURL: UI_BASE_URL },
    },
    {
      name: "mobile-chromium",
      testMatch: UI_SPECS,
      use: { ...devices["Pixel 5"], baseURL: UI_BASE_URL },
    },

    // Root-level specs (tests/*.spec.ts) are not under tests/ui/, so the four
    // UI projects above ignore them. Run them once, in Chromium only.
    {
      name: "chromium-root",
      testMatch: ROOT_SPECS,
      use: { ...devices["Desktop Chrome"], baseURL: UI_BASE_URL },
    },

    // Same specs as chromium-root, but visibly slowed down for manual analysis.
    // slowMo time counts toward the test timeout, so long specs need a bigger one.
    {
      name: "chromium-root-slow",
      testMatch: ROOT_SPECS,
      timeout: 60000,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: UI_BASE_URL,
        headless: false,
        launchOptions: { slowMo: 1000 },
      },
    },
  ],
});
