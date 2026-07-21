import { routes, openRoute } from '../helpers/app';
import { expect, test } from '../fixtures/qualityTest';
import { BASELINE_SEED } from '../fixtures/seed';

test.beforeEach(async ({ seedApp }) => {
  await seedApp(BASELINE_SEED);
});

for (const route of routes) {
  test(`${route.path} carrega sem pagina em branco`, async ({ page }) => {
    await openRoute(page, route.path, route.heading);
    await expect(page.locator('#root')).not.toBeEmpty();
    await expect(page.locator('main')).toBeVisible();
  });
}

test('navegacao lateral preserva a rota ativa', async ({ page }) => {
  await openRoute(page, '/', 'Hoje');

  const menuButton = page.getByRole('button', { name: 'Abrir menu' });
  const compactNavigation = await menuButton.isVisible();
  if (compactNavigation) {
    await menuButton.focus();
    await page.keyboard.press('Enter');
  }

  const navigation = page.getByRole('navigation', { name: 'Navegacao principal' });
  await navigation.getByRole('link', { name: 'Estudos' }).click();
  await expect(page).toHaveURL(/\/estudos$/);
  if (compactNavigation) await menuButton.click();
  await expect(navigation.getByRole('link', { name: 'Estudos' })).toHaveAttribute('aria-current', 'page');
});
