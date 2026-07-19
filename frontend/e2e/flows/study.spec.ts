import { expect, test } from '../fixtures/qualityTest';
import { EMPTY_USER_SEED, readStore } from '../fixtures/seed';
import { fillStudySession, openRoute } from '../helpers/app';

test('registra, edita e persiste uma unica sessao', async ({ page, seedApp }) => {
  await seedApp(EMPTY_USER_SEED);
  await openRoute(page, '/estudos?create=1', 'Estudos');
  const modal = page.getByRole('dialog', { name: 'Nova sessao de estudo' });
  await fillStudySession(modal, { duration: 60, subject: 'E2E - Gestao de riscos' });
  const save = modal.getByRole('button', { name: 'Salvar sessao' });
  await save.dblclick();
  await expect(page.getByText('Sessao registrada com sucesso.')).toBeVisible();
  await expect(page.getByText('E2E - Gestao de riscos')).toBeVisible();

  let sessions = await readStore(page, 'studySessions');
  expect(sessions).toHaveLength(1);
  expect(sessions[0]).toMatchObject({ durationMinutes: 60, questionsAnswered: 10 });

  await page.getByRole('button', { name: 'Editar sessao E2E - Gestao de riscos' }).click();
  const duration = page.getByRole('spinbutton', { name: 'Duracao' });
  await duration.fill('90');
  await page.getByRole('button', { name: 'Salvar alteracoes' }).click();
  await expect(page.getByRole('cell', { name: '90 min' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('cell', { name: '90 min' })).toBeVisible();
  sessions = await readStore(page, 'studySessions');
  expect(sessions).toHaveLength(1);
  expect(sessions[0]?.durationMinutes).toBe(90);

  await page.getByRole('button', { name: 'Editar sessao E2E - Gestao de riscos' }).click();
  await page.getByRole('button', { name: 'Cancelar' }).click();
  expect(await readStore(page, 'studySessions')).toHaveLength(1);
});

test('bloqueia duracao e totais invalidos', async ({ page, seedApp }) => {
  await seedApp(EMPTY_USER_SEED);
  await openRoute(page, '/estudos?create=1', 'Estudos');
  const modal = page.getByRole('dialog', { name: 'Nova sessao de estudo' });
  await fillStudySession(modal, { duration: 0 });
  await modal.getByLabel('Questoes').fill('5');
  await modal.getByLabel('Acertos').fill('4');
  await modal.getByLabel('Erros').fill('2');
  await modal.getByRole('button', { name: 'Salvar sessao' }).click();
  await expect(modal.getByText('Duracao deve ser maior que zero.')).toBeVisible();
  await expect(modal.getByText('Acertos e erros nao podem superar o total de questoes.')).toBeVisible();
  expect(await readStore(page, 'studySessions')).toHaveLength(0);
});

test('sessao vinculada conclui o cronograma sem reabrir a atividade', async ({ page, seedApp }) => {
  await seedApp(EMPTY_USER_SEED);
  await openRoute(page, '/cronograma', 'Cronograma');
  await page.getByRole('button', { name: 'Registrar estudo de E2E - Fundamentos de governanca' }).click();
  const modal = page.getByRole('dialog', { name: 'Nova sessao de estudo' });
  await modal.getByLabel('Duracao').fill('45');
  await modal.getByRole('button', { name: 'Salvar sessao' }).click();
  await page.waitForURL(/\/estudos$/);

  const schedule = await readStore(page, 'scheduleItems');
  expect(String(schedule[0]?.status).normalize('NFD').replace(/[\u0300-\u036f]/g, '')).toContain('Conclu');
  await page.reload();
  const persisted = await readStore(page, 'scheduleItems');
  expect(String(persisted[0]?.status).normalize('NFD').replace(/[\u0300-\u036f]/g, '')).toContain('Conclu');
});
