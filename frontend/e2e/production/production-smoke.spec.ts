import { expect, test, type Page } from '@playwright/test';

import { expectRouteReady, openRoute, routes } from '../helpers/app';

const productionUrl = 'https://passei-ai.vercel.app';
const protectedStores = ['scheduleItems', 'studySessions', 'questionBlocks', 'questions', 'questionAttempts', 'errorRecords', 'reviews', 'mockExams', 'goals'];
const runtimeErrors = new WeakMap<Page, string[]>();

test.beforeEach(async ({ baseURL, page }) => {
  expect(baseURL).toBe(productionUrl);
  const errors: string[] = [];
  runtimeErrors.set(page, errors);
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => errors.push(`page: ${error.message}`));
});

test.afterEach(async ({ page }) => {
  expect(runtimeErrors.get(page) ?? [], 'Producao nao deve emitir erros criticos no runtime.').toEqual([]);
});

test('rotas diretas retornam o fallback SPA e carregam sem erros', async ({ page }) => {
  const failedAssets: string[] = [];
  const loadedAssets = new Set<string>();
  page.on('requestfailed', (request) => {
    if (!request.failure()?.errorText.includes('ERR_ABORTED')) failedAssets.push(request.url());
  });
  page.on('response', (response) => {
    if (/\.(?:css|js)(?:\?|$)/.test(response.url()) && response.ok()) loadedAssets.add(response.url());
  });

  for (const route of routes) {
    const response = await page.goto(route.path);
    expect(response?.status(), `${route.path} deve retornar HTTP 200`).toBe(200);
    await expectRouteReady(page, route.heading);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#root')).not.toBeEmpty();
  }

  expect(failedAssets).toEqual([]);
  expect([...loadedAssets].some((url) => url.includes('.js'))).toBe(true);
  expect([...loadedAssets].some((url) => url.includes('.css'))).toBe(true);
});

test('formularios abrem e cancelam sem alterar o IndexedDB isolado', async ({ page }) => {
  await openRoute(page, '/cronograma', 'Cronograma');
  await expect.poll(async () => (await countStores(page)).scheduleItems).toBe(956);
  const before = await countStores(page);
  await page.getByRole('main').getByRole('button', { name: 'Nova atividade' }).click();
  await expect(page.getByRole('dialog', { name: 'Nova atividade' })).toBeVisible();
  await page.getByRole('dialog', { name: 'Nova atividade' }).getByRole('button', { name: 'Cancelar' }).click();

  await openRoute(page, '/banco-de-erros', 'Banco de Erros');
  await page.getByRole('button', { name: 'Novo erro' }).click();
  await expect(page.getByRole('dialog', { name: 'Registrar erro manual' })).toBeVisible();
  await page.getByRole('dialog', { name: 'Registrar erro manual' }).getByRole('button', { name: 'Cancelar' }).click();
  expect(await countStores(page)).toEqual(before);
});

async function countStores(page: Page): Promise<Record<string, number>> {
  return page.evaluate(async (storeNames) => {
    const request = indexedDB.open('passei-ai-local');
    const database = await new Promise<IDBDatabase>((resolve, reject) => {
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
    const transaction = database.transaction(storeNames, 'readonly');
    const counts = await Promise.all(storeNames.map((name) => new Promise<[string, number]>((resolve, reject) => {
      const countRequest = transaction.objectStore(name).count();
      countRequest.onerror = () => reject(countRequest.error);
      countRequest.onsuccess = () => resolve([name, countRequest.result]);
    })));
    database.close();
    return Object.fromEntries(counts);
  }, protectedStores);
}
