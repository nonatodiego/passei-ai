import { expect, type Locator, type Page } from '@playwright/test';

export const routes = [
  { heading: 'Hoje', path: '/' },
  { heading: 'Cronograma', path: '/cronograma' },
  { heading: 'Estudos', path: '/estudos' },
  { heading: 'Questoes', path: '/questoes' },
  { heading: 'Banco de Erros', path: '/banco-de-erros' },
  { heading: 'Revisoes', path: '/revisoes' },
  { heading: 'Metas', path: '/metas' },
  { heading: 'Evolucao', path: '/evolucao' },
  { heading: 'Configuracoes', path: '/configuracoes' },
] as const;

const routeContentMarkers: Record<string, string[]> = {
  '/': ['Plano do dia', 'Registre seus primeiros dados', 'Dia concluido'],
  '/banco-de-erros': ['Transforme erros em aprendizado'],
  '/configuracoes': ['Gerencie os dados salvos neste navegador'],
  '/cronograma': ['Suas alteracoes ficam guardadas neste navegador'],
  '/estudos': ['Sessoes de Estudo', 'Comece a registrar seus estudos'],
  '/evolucao': ['Indicadores calculados a partir dos seus dados locais'],
  '/metas': ['Objetivos editaveis; o progresso usa somente registros desta semana', 'Metas indisponiveis'],
  '/questoes': ['Registrar bloco de questoes'],
  '/revisoes': ['Agende e conclua reforcos com dados locais'],
};

export async function openRoute(page: Page, path: string, heading: string): Promise<void> {
  await page.goto(path);
  await page.waitForLoadState('networkidle');
  await expectRouteReady(page, heading);
  const markers = routeContentMarkers[path.split('?')[0]];
  if (markers) {
    const main = page.getByRole('main');
    await expect
      .poll(async () => {
        const content = normalize(await main.textContent());
        return markers.some((marker) => content.includes(normalize(marker)));
      }, { timeout: 15_000 })
      .toBe(true);
  }
}

export async function expectRouteReady(page: Page, heading: string): Promise<void> {
  const routeHeading = page.getByRole('banner').getByRole('heading').first();
  await expect(routeHeading).toBeVisible();
  await expect
    .poll(async () => normalize(await routeHeading.textContent()), { timeout: 15_000 })
    .toBe(normalize(heading));
  const main = page.getByRole('main');
  await expect(main.locator('.animate-pulse')).toHaveCount(0, { timeout: 15_000 });
  await expect(main.getByRole('heading').first()).toBeVisible({ timeout: 15_000 });
}

function normalize(value: string | null): string {
  return (value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export async function stabilizeVisualPage(page: Page): Promise<void> {
  await page.evaluate(async () => document.fonts.ready);
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        caret-color: transparent !important;
        transition-duration: 0s !important;
      }
    `,
  });

  if (await page.locator('.recharts-wrapper').count()) {
    await page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        }),
    );
    await page.waitForFunction(() => {
      const barSeries = document.querySelectorAll('.recharts-bar');
      const bars = Array.from(
        document.querySelectorAll<SVGGraphicsElement>('.recharts-bar-rectangle path'),
      );
      const lines = Array.from(
        document.querySelectorAll<SVGGraphicsElement>('.recharts-line-curve'),
      );
      if (barSeries.length && !bars.length) return false;

      const shapes = [...bars, ...lines];
      if (
        !shapes.length ||
        shapes.some((shape) => {
          const box = shape.getBBox();
          return box.width <= 0 || (bars.includes(shape) && box.height <= 0);
        })
      ) {
        return false;
      }

      const signature = shapes
        .map((shape) => {
          const box = shape.getBBox();
          return `${box.x}:${box.y}:${box.width}:${box.height}`;
        })
        .join('|');
      const key = '__e2eChartGeometry';
      const state = (window as typeof window & {
        [key]?: { signature: string; stableSince: number };
      })[key];
      const now = performance.now();

      if (!state || state.signature !== signature) {
        (window as typeof window & {
          [key]?: { signature: string; stableSince: number };
        })[key] = { signature, stableSince: now };
        return false;
      }

      return now - state.stableSince >= 300;
    });
  }

  const main = page.getByRole('main');
  await expect(main.locator('.animate-pulse')).toHaveCount(0, { timeout: 15_000 });
  await expect(main.getByRole('heading').first()).toBeVisible({ timeout: 15_000 });
}

export async function fillStudySession(
  page: Page | Locator,
  input: { duration?: number; subject?: string } = {},
): Promise<void> {
  await page.getByLabel('Disciplina').selectOption('e2e-discipline');
  await page.getByLabel('Assunto').fill(input.subject ?? 'E2E - Gestao de riscos');
  await page.getByLabel('Duracao').fill(String(input.duration ?? 60));
  await page.getByLabel('Questoes').fill('10');
  await page.getByLabel('Acertos').fill('7');
  await page.getByLabel('Erros').fill('3');
  await page.getByLabel('Origem').fill('E2E - registro automatizado');
  await page.getByLabel('Observacoes').fill('E2E - dados isolados');
}

export async function fillErrorRecord(page: Page, subject = 'E2E - COBIT'): Promise<void> {
  const dialog = page.getByRole('dialog', { name: 'Registrar erro manual' });
  await dialog.getByLabel('Disciplina').fill('E2E - Governanca de TI');
  await dialog.getByLabel('Assunto').fill(subject);
  await dialog.getByLabel('Categoria do erro').fill('E2E - Conceito');
  await dialog.getByLabel('Prioridade').selectOption('high');
  await dialog.getByLabel('Contexto ou enunciado').fill('E2E - Qual conceito deve ser aplicado?');
  await dialog.getByLabel('Motivo do erro').fill('E2E - Confusao entre conceitos');
  await dialog.getByLabel('Conceito ou resposta correta').fill('E2E - Conceito correto');
  await dialog.getByLabel('Acao corretiva').fill('E2E - Revisar material e resolver questoes');
  await dialog.getByLabel('Tags (separadas por virgula)').fill('E2E, governanca');
}
