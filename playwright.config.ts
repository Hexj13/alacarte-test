import dotenv from 'dotenv';
import { defineConfig, devices } from '@playwright/test';
import { expectTimeout } from '@constants';

dotenv.config();

export default defineConfig({
  testDir: './src/specs',
  testMatch: '**/*.spec.ts',
  tsconfig: './tsconfig.json',
  reporter: [
    ['list'],
    [
      'allure-playwright',
      { detail: false, outputFolder: 'allure-results', suiteTitle: false },
    ],
  ],
  timeout: 60000,
  expect: {
    timeout: expectTimeout,
  },
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: process.env.BASE_URL,
    headless: process.env.HEADLESS !== 'false',
    permissions: ['clipboard-write', 'clipboard-read'],
    screenshot: 'only-on-failure',
    testIdAttribute: 'data-test-id',
    video: 'retain-on-failure',
  },
  snapshotPathTemplate: 'src/fixtures/pixel_perfect_patterns/{arg}{ext}',
  workers: process.env.WORKERS ? parseInt(process.env.WORKERS!, 10) : 4,
  fullyParallel: true,
  globalSetup: require.resolve('./global-setup'),
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});
