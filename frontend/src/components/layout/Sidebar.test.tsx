// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import 'fake-indexeddb/auto';

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { db } from '@/core/database/database';

import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  beforeEach(async () => {
    await db.delete();
    await db.open();
    const timestamp = new Date().toISOString();
    await db.contestProfiles.put({
      board: 'CESGRANRIO',
      createdAt: timestamp,
      examDate: '2027-12-31',
      id: 'dataprev-2026',
      name: 'DATAPREV',
      role: 'Analista',
      targetAccuracy: 85,
      updatedAt: timestamp,
    });
    await db.scheduleItems.bulkPut([
      { activityType: 'PDF', createdAt: timestamp, disciplineName: 'TI', id: 'one', outsideExamWindow: false, plannedDate: '2026-07-18', status: 'Concluída', title: 'SQL', updatedAt: timestamp },
      { activityType: 'PDF', createdAt: timestamp, disciplineName: 'TI', id: 'two', outsideExamWindow: false, plannedDate: '2026-07-19', status: 'Não iniciado', title: 'Redes', updatedAt: timestamp },
    ]);
  });

  afterEach(async () => {
    cleanup();
    await db.delete();
  });

  it('renders persisted plan facts and no fictitious account metrics', async () => {
    render(<MemoryRouter><Sidebar isOpen onClose={() => undefined} /></MemoryRouter>);

    expect(await screen.findByText('1 de 2 concluidas')).toBeVisible();
    expect(screen.getByText('DATAPREV')).toBeVisible();
    expect(screen.queryByText('Plano Premium')).not.toBeInTheDocument();
    expect(screen.queryByText('Índice de preparação')).not.toBeInTheDocument();
  });

  it('removes the closed mobile navigation from visibility', () => {
    const { container } = render(<MemoryRouter><Sidebar isOpen={false} onClose={() => undefined} /></MemoryRouter>);

    expect(container.querySelector('aside')).toHaveClass('invisible');
  });

  it('moves focus into the mobile menu and closes it with Escape', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<MemoryRouter><Sidebar isOpen onClose={onClose} /></MemoryRouter>);

    await waitFor(() => expect(screen.getByRole('button', { name: 'Fechar menu' })).toHaveFocus());
    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
