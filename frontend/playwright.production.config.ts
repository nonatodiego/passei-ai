import { defineConfig, devices } from '@playwright/test';

const productionUrl = 'https://passei-ai.vercel.app';

export default defineConfig({
  expect: { timeout: 10_000 },
  forbidOnly: true,
  fullyParallel: true,
  outputDir: 'test-results/production',
  projects: [
    {
      name: 'production-desktop',
      use: { ...devices['Desktop Chrome'], viewport: { height: 900, width: 1440 } },
    },
    {
      name: 'production-mobile',
      use: { ...devices['Desktop Chrome'], viewport: { height: 844, width: 390 } },
    },
  ],
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report/production' }],
  ],
  retries: 1,
  testDir: './e2e/production',
  timeout: 30_000,
  use: {
    baseURL: productionUrl,
    colorScheme: 'light',
    locale: 'pt-BR',
    reducedMotion: 'reduce',
    screenshot: 'only-on-failure',
    timezoneId: 'America/Sao_Paulo',
    trace: 'retain-on-failure',
    video: 'off',
  },
  workers: 2,
});
