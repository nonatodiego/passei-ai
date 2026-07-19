import { expect, test } from '../fixtures/qualityTest';
import { createScheduleItems, EMPTY_USER_SEED, readStore } from '../fixtures/seed';
import { openRoute } from '../helpers/app';

test('cria, edita, conclui e persiste uma atividade sem duplicacao', async ({ page, seedApp }) => {
  await seedApp({ ...EMPTY_USER_SEED, scheduleItems: createScheduleItems(35) });
  await openRoute(page, '/cronograma', 'Cronograma');
  await expect(page.getByText('Mostrando 1-30 de 35')).toBeVisible();
  await page.getByRole('button', { name: 'Proxima' }).click();
  await expect(page.getByText('Mostrando 31-35 de 35')).toBeVisible();
  await page.getByRole('button', { name: 'Anterior' }).click();

  await page.getByRole('main').getByRole('button', { name: 'Nova atividade' }).click();
  const dialog = page.getByRole('dialog', { name: 'Nova atividade' });
  await dialog.getByLabel('Data planejada').fill('2026-10-12');
  await dialog.getByLabel('Disciplina').fill('E2E - Seguranca da Informacao');
  await dialog.getByLabel('Conteudo').fill('E2E - Criptografia aplicada');
  await dialog.getByLabel('Tipo de atividade').selectOption('PDF');
  await dialog.getByLabel('Prioridade').selectOption('Alta');
  await dialog.getByLabel('Duracao estimada (minutos)').fill('45');
  await dialog.getByRole('button', { name: 'Salvar atividade' }).click();
  await expect(page.getByText('Atividade criada com sucesso.')).toBeVisible();

  const search = page.getByLabel('Pesquisa');
  await search.fill('Criptografia aplicada');
  await expect(page.getByText('E2E - Criptografia aplicada')).toBeVisible();
  await expect(page.getByText('Fora da janela atual da prova')).toBeVisible();
  await page.getByLabel('Visao').selectOption('outsideExam');
  await expect(page.getByText('E2E - Criptografia aplicada')).toBeVisible();
  await page.getByLabel('Visao').selectOption('all');

  await page.getByRole('button', { name: 'Editar E2E - Criptografia aplicada' }).click();
  const editDialog = page.getByRole('dialog', { name: 'Editar atividade' });
  await editDialog.getByLabel('Data planejada').fill('2026-09-15');
  await editDialog.getByLabel('Duracao estimada (minutos)').fill('60');
  await editDialog.getByRole('button', { name: 'Salvar alteracoes' }).click();
  await expect(page.getByText('Atividade atualizada com sucesso.')).toBeVisible();
  await page.getByRole('button', { name: 'Concluir E2E - Criptografia aplicada' }).click();
  await expect(page.getByText('Atividade concluida com sucesso.')).toBeVisible();
  await page.reload();
  await expect(page.getByLabel('Pesquisa')).toHaveValue('');
  await page.getByLabel('Pesquisa').fill('Criptografia aplicada');
  await expect(page.getByText('E2E - Criptografia aplicada')).toBeVisible();

  const items = await readStore(page, 'scheduleItems');
  const created = items.filter((item) => item.title === 'E2E - Criptografia aplicada');
  expect(created).toHaveLength(1);
  expect(items).toHaveLength(36);
  expect(items.some((item) => item.title === 'E2E - Atividade 01')).toBe(true);
  expect(created[0]).toMatchObject({ actualMinutes: 60, outsideExamWindow: false, plannedDate: '2026-09-15' });
  expect(String(created[0]?.status).normalize('NFD').replace(/[\u0300-\u036f]/g, '')).toContain('Conclu');
});

test('valida campos e cancela sem persistir', async ({ page, seedApp }) => {
  await seedApp(EMPTY_USER_SEED);
  await openRoute(page, '/cronograma', 'Cronograma');
  const initialCount = (await readStore(page, 'scheduleItems')).length;

  await page.getByRole('main').getByRole('button', { name: 'Nova atividade' }).click();
  const dialog = page.getByRole('dialog', { name: 'Nova atividade' });
  await dialog.getByLabel('Duracao estimada (minutos)').fill('-1');
  await dialog.getByRole('button', { name: 'Salvar atividade' }).click();
  await expect(dialog.getByText('A disciplina e obrigatoria.')).toBeVisible();
  await expect(dialog.getByText('A duracao nao pode ser negativa.')).toBeVisible();
  await dialog.getByRole('button', { name: 'Cancelar' }).click();
  expect(await readStore(page, 'scheduleItems')).toHaveLength(initialCount);
});
