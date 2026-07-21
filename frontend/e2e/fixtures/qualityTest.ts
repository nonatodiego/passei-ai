import { expect, test as base } from '@playwright/test';

import { FIXED_NOW, seedDatabase, type DatabaseSeed } from './seed';

type QualityFixtures = {
  seedApp: (seed: DatabaseSeed) => Promise<void>;
};

export const test = base.extend<QualityFixtures>({
  seedApp: async ({ page }, use) => {
    await page.clock.setFixedTime(new Date(FIXED_NOW));
    await use(async (seed) => seedDatabase(page, seed));
  },
  page: async ({ page }, use) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(`console: ${message.text()}`);
    });
    page.on('pageerror', (error) => errors.push(`page: ${error.message}`));
    await use(page);
    expect(errors, 'A pagina nao deve registrar erros criticos no console.').toEqual([]);
  },
});

export { expect };
