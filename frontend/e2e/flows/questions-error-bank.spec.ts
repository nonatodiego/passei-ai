import { expect, test } from '../fixtures/qualityTest';
import { BASELINE_SEED, EMPTY_USER_SEED, readStore } from '../fixtures/seed';
import { fillErrorRecord, openRoute } from '../helpers/app';

test('registra bloco de questoes com taxa correta e sem dupla contagem', async ({ page, seedApp }) => {
  await seedApp(EMPTY_USER_SEED);
  await openRoute(page, '/questoes', 'Questoes');
  await expect(page.getByRole('heading', { name: 'Nenhuma questao encontrada' })).toBeVisible();
  const blockForm = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Registrar bloco de questoes' }) });
  await blockForm.getByLabel('Disciplina').fill('E2E - Governanca de TI');
  await blockForm.getByLabel('Assunto').fill('E2E - COBIT');
  await blockForm.getByLabel('Quantidade').fill('20');
  await blockForm.getByLabel('Acertos').fill('14');
  await blockForm.getByLabel('Erros').fill('6');
  await blockForm.getByLabel('Anuladas').fill('0');
  const save = blockForm.getByRole('button', { name: 'Salvar bloco' });
  await save.dblclick();
  await expect(page.getByText('Bloco de questoes salvo neste navegador.')).toBeVisible();

  const blocks = await readStore(page, 'questionBlocks');
  expect(blocks).toHaveLength(1);
  expect(blocks[0]).toMatchObject({ accuracyRate: 70, correctAnswers: 14, totalQuestions: 20, wrongAnswers: 6 });
});

test('resposta incorreta preenche o Banco de Erros e respeita cancelamento', async ({ page, seedApp }) => {
  await seedApp(BASELINE_SEED);
  await openRoute(page, '/questoes', 'Questoes');
  await page.getByRole('button', { name: /^A\. E2E - alternativa incorreta$/ }).click();
  await expect(page.getByText('Resposta incorreta', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Adicionar ao Banco de Erros' }).click();
  const dialog = page.getByRole('dialog', { name: 'Registrar erro manual' });
  await expect(dialog.getByLabel('Disciplina')).toHaveValue('E2E - Governanca de TI');
  await expect(dialog.getByLabel('Assunto')).toHaveValue('E2E - COBIT');
  await expect(dialog.getByLabel('Contexto ou enunciado')).toHaveValue(/E2E - qual alternativa/);
  await dialog.getByRole('button', { name: 'Cancelar' }).click();
  expect(await readStore(page, 'errorRecords')).toHaveLength(1);

  await openRoute(page, '/questoes', 'Questoes');
  await page.getByRole('button', { name: /^A\. E2E - alternativa incorreta$/ }).click();
  await page.getByRole('button', { name: 'Adicionar ao Banco de Erros' }).click();
  await page.getByRole('dialog', { name: 'Registrar erro manual' }).getByRole('button', { name: 'Registrar erro' }).click();
  await expect(page.getByText('Erro registrado com sucesso.')).toBeVisible();
  const errors = await readStore(page, 'errorRecords');
  expect(errors).toHaveLength(2);
  expect(errors.some((item) => item.questionId === 'e2e-question-1')).toBe(true);
});

test('cria erro manual, consolida recorrencia e preserva contexto', async ({ page, seedApp }) => {
  await seedApp(EMPTY_USER_SEED);
  await openRoute(page, '/banco-de-erros', 'Banco de Erros');
  await page.getByRole('button', { name: 'Novo erro' }).click();
  await fillErrorRecord(page, 'E2E - ITIL');
  await page.getByRole('dialog', { name: 'Registrar erro manual' }).getByRole('button', { name: 'Registrar erro' }).click();
  await expect(page.getByText('Erro registrado com sucesso.')).toBeVisible();

  await page.getByRole('button', { name: 'Novo erro' }).click();
  await fillErrorRecord(page, 'E2E - ITIL');
  await page.getByRole('dialog', { name: 'Registrar erro manual' }).getByRole('button', { name: 'Registrar erro' }).click();
  await expect(page.getByText('Ocorrencia adicionada ao erro semelhante.')).toBeVisible();
  let records = await readStore(page, 'errorRecords');
  expect(records).toHaveLength(1);
  expect(records[0]).toMatchObject({ question: 'E2E - Qual conceito deve ser aplicado?', recurrence: 2 });

  await page.getByRole('button', { name: 'Detalhes' }).click();
  await page.getByRole('button', { name: 'Nova ocorrencia' }).click();
  await expect(page.getByRole('status').getByText('Nova ocorrencia registrada.')).toBeVisible();
  await page.getByRole('button', { name: 'Reagendar revisao' }).click();
  await page.getByLabel('Nova data da revisao').fill('2026-07-25');
  await page.getByRole('button', { name: 'Confirmar data' }).click();
  await page.reload();
  records = await readStore(page, 'errorRecords');
  expect(records[0]).toMatchObject({ nextReview: '2026-07-25', recurrence: 3 });
  expect(records[0]?.question).toBe('E2E - Qual conceito deve ser aplicado?');
});

test('permite revisar, dominar e arquivar registros persistidos', async ({ page, seedApp }) => {
  for (const [action, expectedStatus] of [
    ['Marcar revisado', 'reviewed'],
    ['Marcar dominado', 'mastered'],
    ['Arquivar', 'archived'],
  ] as const) {
    await seedApp(BASELINE_SEED);
    await openRoute(page, '/banco-de-erros', 'Banco de Erros');
    await page.getByRole('button', { name: 'Detalhes' }).click();
    await page.getByRole('button', { name: action }).click();
    const records = await readStore(page, 'errorRecords');
    expect(records[0]?.status).toBe(expectedStatus);
  }
});
