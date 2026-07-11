import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import { createScheduleData } from '@/services/ScheduleService';
import { createEngineResult } from '@/study-engine';
import { ScheduleView } from '@/pages/SchedulePage';
import type { ScheduleData, ScheduleFiltersState } from '@/types/schedule';

const filters: ScheduleFiltersState = {
  discipline: 'all',
  priority: 'all',
  query: '',
  status: 'all',
  type: 'all',
};

const emptyScheduleData: ScheduleData = {
  activities: [],
  engineFocus: 'Sem atividades para exibir.',
  engineGeneratedAt: '2026-07-11T09:00:00',
  stats: {
    completedActivities: 0,
    overdueActivities: 0,
    plannedHours: 0,
    todayActivities: 0,
    weeklyActivities: 0,
  },
};

describe('SchedulePage', () => {
  it('renders the intelligent schedule with study engine data', () => {
    const data = createScheduleData(createEngineResult(), filters);
    const html = renderToStaticMarkup(
      <ScheduleView
        allActivities={data.activities}
        data={data}
        filters={filters}
        onFiltersChange={vi.fn()}
        status="success"
      />,
    );

    expect(html).toContain('Cronograma Inteligente');
    expect(html).toContain('Study Engine');
    expect(html).toContain('Agenda semanal');
    expect(html).toContain('Calendario');
    expect(html).toContain('Gestao e Governanca de TI');
  });

  it('renders an empty state when filters remove all activities', () => {
    const html = renderToStaticMarkup(
      <ScheduleView
        allActivities={[]}
        data={emptyScheduleData}
        filters={filters}
        onFiltersChange={vi.fn()}
        status="empty"
      />,
    );

    expect(html).toContain('Cronograma sem atividades');
    expect(html).toContain('Ajuste os filtros');
  });

  it('renders an error state when schedule data cannot be loaded', () => {
    const html = renderToStaticMarkup(
      <ScheduleView
        allActivities={[]}
        data={emptyScheduleData}
        filters={filters}
        onFiltersChange={vi.fn()}
        status="error"
      />,
    );

    expect(html).toContain('Nao foi possivel carregar o cronograma');
    expect(html).toContain('cronograma mockado');
  });
});
