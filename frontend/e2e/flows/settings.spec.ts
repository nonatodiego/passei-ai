import { expect, test } from '../fixtures/qualityTest';
import { BASELINE_SEED, readStore } from '../fixtures/seed';
import { openRoute } from '../helpers/app';

test('exporta, valida e restaura backup somente no contexto isolado', async ({ page, seedApp }) => {
  await seedApp(BASELINE_SEED);
  await openRoute(page, '/configuracoes', 'Configuracoes');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exportar backup' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/^passei-ai-backup-.*\.json$/);
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  const content = Buffer.concat(chunks).toString('utf8');
  const backup = JSON.parse(content) as { metadata: { app: string; schemaVersion: number }; studySessions: unknown[] };
  expect(backup.metadata).toMatchObject({ app: 'Passei AI', schemaVersion: 1 });
  expect(backup.studySessions).toHaveLength(1);

  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles({ buffer: Buffer.from(content), mimeType: 'application/json', name: 'e2e-backup.json' });
  const restore = page.getByRole('dialog', { name: 'Restaurar backup' });
  await expect(restore.getByText('Cronograma: 2; sessoes: 1; blocos: 1; erros: 1; revisoes: 1.')).toBeVisible();
  await restore.getByRole('button', { name: 'Cancelar' }).click();
  expect(await readStore(page, 'studySessions')).toHaveLength(1);

  await fileInput.setInputFiles({ buffer: Buffer.from(content), mimeType: 'application/json', name: 'e2e-backup.json' });
  await page.getByRole('dialog', { name: 'Restaurar backup' }).getByRole('button', { name: 'Substituir dados atuais' }).click();
  await expect(page.getByText('Backup restaurado com sucesso.')).toBeVisible();
  expect(await readStore(page, 'studySessions')).toHaveLength(1);
});

test('rejeita arquivo invalido e exige confirmacao explicita para limpeza', async ({ page, seedApp }) => {
  await seedApp(BASELINE_SEED);
  await openRoute(page, '/configuracoes', 'Configuracoes');
  const initialSessions = (await readStore(page, 'studySessions')).length;
  await page.locator('input[type="file"]').setInputFiles({ buffer: Buffer.from('{"invalid":true}'), mimeType: 'application/json', name: 'e2e-invalid.json' });
  await expect(page.getByText('Arquivo invalido ou incompativel. Nenhum dado foi alterado.')).toBeVisible();
  expect(await readStore(page, 'studySessions')).toHaveLength(initialSessions);

  await page.getByRole('button', { name: 'Apagar dados locais' }).click();
  const reset = page.getByRole('dialog', { name: 'Apagar dados locais' });
  await expect(reset.getByRole('button', { name: 'Apagar definitivamente' })).toBeDisabled();
  await reset.getByLabel('Digite APAGAR MEUS DADOS para confirmar').fill('E2E - NAO APAGAR');
  await expect(reset.getByRole('button', { name: 'Apagar definitivamente' })).toBeDisabled();
  await reset.getByRole('button', { name: 'Cancelar' }).click();
  expect(await readStore(page, 'studySessions')).toHaveLength(initialSessions);
});
