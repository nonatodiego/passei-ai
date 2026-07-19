import { expect, test } from '../fixtures/qualityTest';
import { BASELINE_SEED, EMPTY_USER_SEED, readStore } from '../fixtures/seed';
import { openRoute } from '../helpers/app';

test('cria, impede duplicata, inicia e conclui revisao sem dominar o erro', async ({ page, seedApp }) => {
  await seedApp(EMPTY_USER_SEED);
  await openRoute(page, '/revisoes', 'Revisoes');
  await page.getByLabel('Disciplina').fill('E2E - Governanca de TI');
  await page.getByLabel('Assunto').fill('E2E - COBIT');
  await page.getByRole('button', { name: 'Criar revisao' }).click();
  await expect(page.getByText('Revisao criada com sucesso.')).toBeVisible();

  await page.getByLabel('Disciplina').fill('E2E - Governanca de TI');
  await page.getByLabel('Assunto').fill('E2E - COBIT');
  await page.getByRole('button', { name: 'Criar revisao' }).click();
  await expect(page.getByText('Ja existe uma revisao pendente equivalente nesta data.')).toBeVisible();
  expect(await readStore(page, 'reviews')).toHaveLength(1);

  await page.getByRole('button', { name: 'Iniciar' }).click();
  await page.getByRole('button', { name: 'Concluir' }).click();
  const reviews = await readStore(page, 'reviews');
  expect(reviews[0]).toMatchObject({ result: 'good', reviewSequence: 1, status: 'completed' });

  await page.getByLabel('Disciplina').fill('E2E - Banco de Dados');
  await page.getByLabel('Assunto').fill('E2E - SQL');
  await page.getByRole('button', { name: 'Criar revisao' }).click();
  await page.getByRole('button', { name: 'Cancelar' }).click();
  expect((await readStore(page, 'reviews')).some((item) => item.status === 'cancelled')).toBe(true);
});

test('revisao ligada a erro atualiza o historico sem dominar automaticamente', async ({ page, seedApp }) => {
  await seedApp(BASELINE_SEED);
  await openRoute(page, '/revisoes', 'Revisoes');
  await page.getByRole('button', { name: 'Iniciar' }).click();
  await page.getByRole('button', { name: 'Concluir' }).click();
  const errors = await readStore(page, 'errorRecords');
  expect(errors[0]).toMatchObject({ reviewResult: 'good', status: 'active' });
  await openRoute(page, '/metas', 'Metas');
  await expect(page.getByText('1 de 7')).toBeVisible();
});

test('edita metas e preserva progresso calculado a partir dos fatos locais', async ({ page, seedApp }) => {
  await seedApp(BASELINE_SEED);
  await openRoute(page, '/metas', 'Metas');
  await expect(page.getByText('1 de 15 horas')).toBeVisible();
  await expect(page.getByText('20 de 300')).toBeVisible();
  await expect(page.getByText('70 de 85 %')).toBeVisible();
  const hours = page.getByLabel('Horas de estudo por semana');
  await hours.fill('12');
  await page.getByRole('button', { name: 'Salvar metas' }).click();
  await expect(page.getByText('Metas salvas neste navegador.')).toBeVisible();
  await page.reload();
  await expect(page.getByLabel('Horas de estudo por semana')).toHaveValue('12');
  expect((await readStore(page, 'goals')).find((item) => item.kind === 'hours')?.target).toBe(12);
});

test('mostra metas sem dados e Hoje com evidencia e acao', async ({ page, seedApp }) => {
  await seedApp(EMPTY_USER_SEED);
  await openRoute(page, '/metas', 'Metas');
  await expect(page.getByText('Sem dados')).toBeVisible();
  await openRoute(page, '/', 'Hoje');
  await expect(page.getByRole('heading', { name: 'Plano do dia' })).toBeVisible();
  await expect(page.getByText('Continue o cronograma com E2E - Fundamentos de governanca', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /Comecar|Estudar|Revisar/ }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'O que melhorar nesta semana' })).toBeVisible();
});

test('Evolucao alterna periodos, KPIs, graficos e estado vazio', async ({ page, seedApp }) => {
  await seedApp(BASELINE_SEED);
  await openRoute(page, '/evolucao', 'Evolucao');
  const period = page.getByLabel('Periodo de evolucao');
  for (const value of ['today', '7d', '30d', 'all']) {
    await period.selectOption(value);
    await expect(page.getByRole('heading', { name: 'Saude do Plano' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Comparacao com o periodo anterior' })).toBeVisible();
  }
  await expect(page.getByText('1.5h')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Tempo estudado por dia' })).toBeVisible();

  await seedApp(EMPTY_USER_SEED);
  await openRoute(page, '/evolucao', 'Evolucao');
  await expect(page.getByRole('heading', { name: 'Evolucao em formacao' })).toBeVisible();
});

test('editar sessao atualiza Evolucao sem duplicar o registro', async ({ page, seedApp }) => {
  await seedApp(BASELINE_SEED);
  await openRoute(page, '/estudos', 'Estudos');
  await page.getByRole('button', { name: 'Editar sessao E2E - COBIT' }).click();
  await page.getByRole('spinbutton', { name: 'Duracao' }).fill('90');
  await page.getByRole('button', { name: 'Salvar alteracoes' }).click();
  expect(await readStore(page, 'studySessions')).toHaveLength(1);
  await openRoute(page, '/evolucao', 'Evolucao');
  await expect(page.getByText('2h')).toBeVisible();
});
