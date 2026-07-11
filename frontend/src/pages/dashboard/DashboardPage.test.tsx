import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import { emptyDashboardMock, dashboardMock } from '@/mocks/dashboard';
import { DashboardView } from '@/pages/dashboard/DashboardPage';

describe('DashboardPage', () => {
  it('renders the executive study overview with KPIs and sections', () => {
    const html = renderToStaticMarkup(
      <DashboardView data={dashboardMock} status="success" />,
    );

    expect(html).toContain('Dias até a prova');
    expect(html).toContain('Índice de preparação');
    expect(html).toContain('Plano de Hoje');
    expect(html).toContain('Evolução semanal');
    expect(html).toContain('Ranking de disciplinas');
    expect(html).toContain('Atividades recentes');
  });

  it('renders the empty state when there is no dashboard data', () => {
    const html = renderToStaticMarkup(
      <DashboardView data={emptyDashboardMock} status="empty" />,
    );

    expect(html).toContain('Dashboard sem dados');
    expect(html).toContain('Ainda não há indicadores');
  });

  it('renders the error state with retry affordance', () => {
    const retry = vi.fn();
    const html = renderToStaticMarkup(
      <DashboardView
        data={emptyDashboardMock}
        onRetry={retry}
        status="error"
      />,
    );

    expect(html).toContain('Não foi possível carregar os dados');
    expect(html).toContain('Tentar novamente');
  });
});
