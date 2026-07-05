// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { createRequire } from 'module';

// 1. Check which environment was requested in the terminal. Default to 'dev'.
const environment = process.env.NODE_ENV || 'dev';

// 2. Dynamically load the correct environment file configuration
const require = createRequire(import.meta.url);
const envConfig = require(`./config-environments/${environment}.env.js`).default;

// 3. Inject those values into the system process environment variables
process.env.BASE_URL = envConfig.BASE_URL;
process.env.TEST_USER_EMAIL = envConfig.TEST_USER_EMAIL;
process.env.TEST_USER_PASSWORD = envConfig.TEST_USER_PASSWORD;
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
     // This grabs the Rabelani Express link from your vault!
    baseURL: process.env.BASE_URL,
    video: 'on',
    screenshot: 'on',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // Gives page loads up to 15 seconds before failing independently
    navigationTimeout: 30000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    //{
     // name: 'firefox',
     // use: { ...devices['Desktop Firefox'] },
    //},

    //{
     // name: 'webkit',
     // use: { ...devices['Desktop Safari'] },
    //},

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

