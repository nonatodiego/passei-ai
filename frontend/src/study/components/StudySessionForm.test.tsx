// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import 'fake-indexeddb/auto';

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { db } from '@/core/database/database';
import { StudySessionForm } from '@/study/components/StudySessionForm';

beforeEach(async () => {
  await db.delete();
  await db.open();
});

afterEach(async () => {
  cleanup();
  await db.delete();
});

async function fillValidSession(user: ReturnType<typeof userEvent.setup>) {
  await user.selectOptions(screen.getByLabelText('Disciplina'), 'banco');
  await user.type(screen.getByLabelText('Assunto'), 'Indices SQL');
}

describe('StudySessionForm DOM', () => {
  it('creates one persisted session with the official creation form', async () => {
    const onSaved = vi.fn();
    const user = userEvent.setup();
    render(<StudySessionForm onCancel={vi.fn()} onSaved={onSaved} />);

    expect(screen.getByLabelText('Hora inicial')).toBeInTheDocument();
    await fillValidSession(user);
    await user.click(screen.getByRole('button', { name: 'Salvar sessao' }));

    await waitFor(() => expect(onSaved).toHaveBeenCalledTimes(1));
    const sessions = await db.studySessions.toArray();
    expect(sessions).toHaveLength(1);
    expect(sessions[0]).toMatchObject({ disciplineName: 'Banco de Dados', subject: 'Indices SQL' });
  });

  it('does not persist invalid input, focuses the first invalid field and allows cancel', async () => {
    const onCancel = vi.fn();
    const user = userEvent.setup();
    render(<StudySessionForm onCancel={onCancel} />);

    await user.click(screen.getByRole('button', { name: 'Salvar sessao' }));
    expect(await screen.findByText('Disciplina obrigatoria.')).toBeVisible();
    await waitFor(() => expect(screen.getByRole('combobox', { name: /^Disciplina/ })).toHaveFocus());
    expect(await db.studySessions.count()).toBe(0);

    await user.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(await db.studySessions.count()).toBe(0);
  });
});
