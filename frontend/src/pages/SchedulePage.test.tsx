// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import 'fake-indexeddb/auto';

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { db } from '@/core/database/database';
import { createScheduleData } from '@/services/ScheduleService';
import { createEngineResult } from '@/study-engine';
import { ScheduleActivityModal, SchedulePage, ScheduleView } from '@/pages/SchedulePage';
import type { ScheduleData, ScheduleFiltersState } from '@/types/schedule';

vi.mock('@/schedule/hooks', () => ({
  useScheduleItems: () => ({ error: undefined, isLoading: false, items: [] }),
}));

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

beforeEach(async () => {
  await db.delete();
  await db.open();
});

afterEach(async () => {
  cleanup();
  await db.delete();
});

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
    expect(html).toContain('Atividades planejadas na semana');
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

  it('creates a valid activity locally and calculates the exam window', async () => {
    const onSaved = vi.fn();
    const user = userEvent.setup();
    render(<ScheduleActivityModal isOpen onClose={vi.fn()} onSaved={onSaved} />);

    await user.type(screen.getByLabelText('Disciplina'), 'Banco de Dados');
    await user.type(screen.getByLabelText('Conteudo'), 'Indices compostos');
    await user.clear(screen.getByLabelText('Data planejada'));
    await user.type(screen.getByLabelText('Data planejada'), '2026-11-01');
    await user.click(screen.getByRole('button', { name: 'Salvar atividade' }));

    await waitFor(() => expect(onSaved).toHaveBeenCalledWith('Atividade criada com sucesso.'));
    const [created] = await db.scheduleItems.toArray();
    expect(created).toMatchObject({
      disciplineName: 'Banco de Dados',
      outsideExamWindow: true,
      title: 'Indices compostos',
    });
    expect(created?.id).toBeTruthy();
    expect(created?.createdAt).toBeTruthy();
  });

  it('keeps the schedule unchanged when validation fails or creation is canceled', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ScheduleActivityModal isOpen onClose={onClose} onSaved={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Salvar atividade' }));
    expect(await screen.findByText('A disciplina e obrigatoria.')).toBeVisible();
    await waitFor(() =>
      expect(screen.getByRole('textbox', { name: /^Disciplina/ })).toHaveFocus(),
    );
    expect(await db.scheduleItems.count()).toBe(0);

    await user.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(await db.scheduleItems.count()).toBe(0);
  });

  it('opens the official activity form from the creation route', () => {
    render(<MemoryRouter initialEntries={['/cronograma?create=1']}><SchedulePage /></MemoryRouter>);

    expect(screen.getByRole('dialog', { name: 'Nova atividade' })).toBeVisible();
  });
});
