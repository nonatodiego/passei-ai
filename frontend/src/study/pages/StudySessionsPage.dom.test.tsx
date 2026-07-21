// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import 'fake-indexeddb/auto';

import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { db } from '@/core/database/database';
import { LocalDataProvider } from '@/core/providers/LocalDataProvider';
import { defaultStudySessionInput } from '@/study/hooks';
import { StudySessionsPage } from '@/study/pages/StudySessionsPage';
import { StudySessionService } from '@/study/services';

describe('StudySessionsPage deletion flow', () => {
  beforeEach(async () => {
    await db.delete();
    await db.open();
    await StudySessionService.createSession({
      ...defaultStudySessionInput,
      disciplineId: 'database',
      disciplineName: 'Banco de Dados',
      subject: 'SQL aplicado',
    });
  });

  afterEach(async () => {
    cleanup();
    await db.delete();
  });

  it('confirms deletion before removing a persisted session', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/estudos']}>
        <LocalDataProvider>
          <StudySessionsPage />
        </LocalDataProvider>
      </MemoryRouter>,
    );

    const deleteButton = await screen.findByRole('button', { name: 'Excluir sessao SQL aplicado' });
    await user.click(deleteButton);
    const confirmation = screen.getByRole('dialog', { name: 'Excluir sessao de estudo' });
    expect(confirmation).toBeVisible();

    await user.click(within(confirmation).getByRole('button', { name: 'Cancelar' }));
    expect(await db.studySessions.count()).toBe(1);

    await user.click(screen.getByRole('button', { name: 'Excluir sessao SQL aplicado' }));
    await user.click(
      within(screen.getByRole('dialog', { name: 'Excluir sessao de estudo' })).getByRole('button', {
        name: /^Excluir sessao$/,
      }),
    );

    await waitFor(() => expect(db.studySessions.count()).resolves.toBe(0));
    expect(await screen.findByText('Sessao excluida com sucesso.')).toBeVisible();
  });
});
