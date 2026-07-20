import { expect, test } from '../fixtures/qualityTest';
import { BASELINE_SEED, EMPTY_USER_SEED } from '../fixtures/seed';
import { openRoute, routes, stabilizeVisualPage } from '../helpers/app';

const stateProjects = new Set(['visual-1440', 'visual-390']);

test.setTimeout(45_000);

async function expectVisualSnapshot(page: Parameters<typeof stabilizeVisualPage>[0], name: string) {
  const screenshot = await page.screenshot({ animations: 'allow', caret: 'hide' });
  expect(screenshot).toMatchSnapshot(name, { maxDiffPixelRatio: 0.005, threshold: 0.2 });
}

test.beforeEach(async ({ seedApp }) => {
  await seedApp(BASELINE_SEED);
});

for (const route of routes) {
  const slug = route.path === '/' ? 'hoje' : route.path.slice(1);
  test(`${slug} - estado inicial`, async ({ page }) => {
    await openRoute(page, route.path, route.heading);
    await stabilizeVisualPage(page);
    await expectVisualSnapshot(page, `${slug}-initial.png`);
  });
}

test('cronograma - formulario aberto', async ({ page }, testInfo) => {
  test.skip(!stateProjects.has(testInfo.project.name));
  await openRoute(page, '/cronograma', 'Cronograma');
  await page.getByRole('main').getByRole('button', { name: 'Nova atividade' }).click();
  await stabilizeVisualPage(page);
  await expectVisualSnapshot(page, 'cronograma-form.png');
});

test('estudos - formulario aberto', async ({ page }, testInfo) => {
  test.skip(!stateProjects.has(testInfo.project.name));
  await openRoute(page, '/estudos?create=1', 'Estudos');
  await stabilizeVisualPage(page);
  await expectVisualSnapshot(page, 'estudos-form.png');
});

test('questoes - estado vazio', async ({ page, seedApp }, testInfo) => {
  test.skip(!stateProjects.has(testInfo.project.name));
  await seedApp(EMPTY_USER_SEED);
  await openRoute(page, '/questoes', 'Questoes');
  await stabilizeVisualPage(page);
  await expectVisualSnapshot(page, 'questoes-empty.png');
});

test('banco de erros - drawer aberto', async ({ page }, testInfo) => {
  test.skip(!stateProjects.has(testInfo.project.name));
  await openRoute(page, '/banco-de-erros', 'Banco de Erros');
  await page.getByRole('button', { name: 'Detalhes' }).click();
  await stabilizeVisualPage(page);
  await expectVisualSnapshot(page, 'banco-de-erros-drawer.png');
});
