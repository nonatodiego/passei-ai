import { defineConfig, devices, type Project } from '@playwright/test';

const localBaseUrl = 'http://127.0.0.1:4173';
const isCi = Boolean(process.env.CI);

const visualViewports = [
  { name: 'visual-1440', viewport: { height: 900, width: 1440 } },
  { name: 'visual-1024', viewport: { height: 768, width: 1024 } },
  { name: 'visual-768', viewport: { height: 1024, width: 768 } },
  { name: 'visual-390', viewport: { height: 844, width: 390 } },
  { name: 'visual-320', viewport: { height: 800, width: 320 } },
] as const;

const visualProjects: Project[] = visualViewports.map(({ name, viewport }) => ({
  name,
  testMatch: '**/visual/**/*.spec.ts',
  use: {
    ...devices['Desktop Chrome'],
    viewport,
  },
}));

export default defineConfig({
  expect: {
    timeout: 7_000,
    toHaveScreenshot: {
      animations: 'allow',
      caret: 'hide',
      maxDiffPixelRatio: 0.035,
    },
  },
  forbidOnly: isCi,
  fullyParallel: false,
  outputDir: 'test-results',
  projects: [
    {
      name: 'chromium',
      testMatch: ['**/flows/**/*.spec.ts', '**/cross-browser/**/*.spec.ts'],
      use: { ...devices['Desktop Chrome'], viewport: { height: 900, width: 1440 } },
    },
    {
      name: 'firefox',
      testMatch: '**/cross-browser/**/*.spec.ts',
      use: { ...devices['Desktop Firefox'], viewport: { height: 900, width: 1440 } },
    },
    {
      name: 'webkit',
      testMatch: '**/cross-browser/**/*.spec.ts',
      use: { ...devices['Desktop Safari'], viewport: { height: 900, width: 1440 } },
    },
    {
      name: 'mobile-chromium',
      testMatch: '**/cross-browser/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'], viewport: { height: 844, width: 390 } },
    },
    {
      name: 'accessibility',
      testMatch: '**/accessibility/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'], viewport: { height: 900, width: 1440 } },
    },
    ...visualProjects,
  ],
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],
  retries: isCi ? 1 : 0,
  snapshotPathTemplate: '{testDir}/visual/__screenshots__/{projectName}/{arg}{ext}',
  testDir: './e2e',
  testIgnore: '**/production/**/*.spec.ts',
  timeout: 30_000,
  use: {
    baseURL: localBaseUrl,
    colorScheme: 'light',
    locale: 'pt-BR',
    reducedMotion: 'reduce',
    screenshot: 'only-on-failure',
    timezoneId: 'America/Sao_Paulo',
    trace: 'retain-on-failure',
    video: 'off',
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4173',
    reuseExistingServer: !isCi,
    stderr: 'pipe',
    stdout: 'pipe',
    timeout: 120_000,
    url: localBaseUrl,
  },
  workers: 1,
});
