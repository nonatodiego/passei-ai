import AxeBuilder from '@axe-core/playwright';
import type { AxeResults, Result } from 'axe-core';
import type { TestInfo } from '@playwright/test';

import { expect, test } from '../fixtures/qualityTest';
import { BASELINE_SEED } from '../fixtures/seed';
import { openRoute, routes } from '../helpers/app';

const blockingImpacts = new Set(['critical', 'serious']);

async function expectNoBlockingViolations(
  results: AxeResults,
  testInfo: TestInfo,
): Promise<void> {
  const summary = results.violations.map(({ help, id, impact, nodes }) => ({ help, id, impact, nodes: nodes.length }));
  await testInfo.attach('axe-results', {
    body: JSON.stringify(summary, null, 2),
    contentType: 'application/json',
  });
  const impactCounts = ['critical', 'serious', 'moderate', 'minor'].map(
    (impact) => `${impact}=${summary.filter((violation) => violation.impact === impact).length}`,
  );
  console.info(`[axe] ${testInfo.title}: ${impactCounts.join(', ')}`);
  if (summary.length) console.info(`[axe-detail] ${JSON.stringify(summary)}`);
  const blocking = results.violations.filter((violation) => blockingImpacts.has(violation.impact ?? ''));
  expect(formatViolations(blocking)).toEqual([]);
}

function formatViolations(violations: Result[]): string[] {
  return violations.map((violation) => `${violation.impact}: ${violation.id} (${violation.nodes.length} nos) - ${violation.help}`);
}

test.beforeEach(async ({ seedApp }) => {
  await seedApp(BASELINE_SEED);
});

for (const route of routes) {
  test(`${route.path} sem violacoes critical ou serious`, async ({ page }, testInfo) => {
    await openRoute(page, route.path, route.heading);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    await expectNoBlockingViolations(results, testInfo);
  });
}

test('Modal e Drawer sem violacoes critical ou serious', async ({ page }, testInfo) => {
  await openRoute(page, '/cronograma', 'Cronograma');
  await page.getByRole('main').getByRole('button', { name: 'Nova atividade' }).click();
  await expectNoBlockingViolations(await new AxeBuilder({ page }).analyze(), testInfo);
  await page.keyboard.press('Escape');

  await openRoute(page, '/banco-de-erros', 'Banco de Erros');
  await page.getByRole('button', { name: 'Detalhes' }).click();
  await expectNoBlockingViolations(await new AxeBuilder({ page }).analyze(), testInfo);
});
