import { expect, test } from '../fixtures/qualityTest';
import { BASELINE_SEED } from '../fixtures/seed';
import { openRoute } from '../helpers/app';

test.beforeEach(async ({ seedApp }) => {
  await seedApp(BASELINE_SEED);
});

test('Modal prende foco, fecha com Escape e devolve foco ao gatilho', async ({ page }) => {
  await openRoute(page, '/cronograma', 'Cronograma');
  const trigger = page.getByRole('main').getByRole('button', { name: 'Nova atividade' });
  await trigger.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Nova atividade' });
  await expect(dialog.getByLabel('Data planejada')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.locator(':focus')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('Sidebar mobile abre por Enter e Space, fecha por Escape e retorna foco', async ({ page }) => {
  await page.setViewportSize({ height: 844, width: 390 });
  await openRoute(page, '/', 'Hoje');
  const trigger = page.getByRole('button', { name: 'Abrir menu' });
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Fechar menu' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await page.keyboard.press('Space');
  await expect(page.getByRole('button', { name: 'Fechar menu' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
});

test('formulario pode ser percorrido e enviado pelo teclado', async ({ page }) => {
  await openRoute(page, '/revisoes', 'Revisoes');
  const discipline = page.getByLabel('Disciplina');
  await discipline.focus();
  await discipline.fill('E2E - Redes');
  await page.keyboard.press('Tab');
  await expect(page.getByLabel('Assunto')).toBeFocused();
  await page.getByLabel('Assunto').fill('E2E - Protocolos');
  await page.getByRole('button', { name: 'Criar revisao' }).focus();
  await page.keyboard.press('Space');
  await expect(page.getByText('Revisao criada com sucesso.')).toBeVisible();
});
