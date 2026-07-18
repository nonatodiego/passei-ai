// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { QuestionBlockForm } from './QuestionBlockForm';
import { QuestionBlockService } from '@/questions/services';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

async function fillValidBlock() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('Disciplina'), '  Tecnologia  ');
  await user.type(screen.getByLabelText('Assunto'), 'SQL');
  await user.clear(screen.getByLabelText('Quantidade'));
  await user.type(screen.getByLabelText('Quantidade'), '1');
  await user.clear(screen.getByLabelText('Acertos'));
  await user.type(screen.getByLabelText('Acertos'), '1');
  return user;
}

describe('QuestionBlockForm', () => {
  it('prevents duplicate submission while saving', async () => {
    let resolveSave: (() => void) | undefined;
    const save = vi.spyOn(QuestionBlockService, 'create').mockImplementation(() => new Promise((resolve) => {
      resolveSave = () => resolve({
        accuracyRate: 100,
        annulledAnswers: 0,
        bank: '',
        correctAnswers: 1,
        createdAt: '',
        date: '2026-07-18',
        difficulty: 'medium',
        discipline: 'Tecnologia',
        durationMinutes: 0,
        id: 'block-1',
        notes: '',
        platform: '',
        subject: 'SQL',
        totalQuestions: 1,
        updatedAt: '',
        wrongAnswers: 0,
      });
    }));
    render(<QuestionBlockForm />);
    await fillValidBlock();
    const submit = screen.getByRole('button', { name: 'Salvar bloco' });

    fireEvent.click(submit);
    fireEvent.click(submit);

    expect(save).toHaveBeenCalledTimes(1);
    expect(submit).toBeDisabled();
    resolveSave?.();
    await screen.findByText('Bloco de questoes salvo neste navegador.');
  });

  it('keeps entered values and shows a repository failure', async () => {
    vi.spyOn(QuestionBlockService, 'create').mockRejectedValueOnce(new Error('Falha local controlada.'));
    render(<QuestionBlockForm />);
    const user = await fillValidBlock();

    await user.click(screen.getByRole('button', { name: 'Salvar bloco' }));

    expect(await screen.findByText('Falha local controlada.')).toBeVisible();
    expect(screen.getByLabelText('Disciplina')).toHaveValue('  Tecnologia  ');
  });

  it('focuses the first invalid field without persisting', async () => {
    const save = vi.spyOn(QuestionBlockService, 'create');
    render(<QuestionBlockForm />);
    const discipline = screen.getByLabelText('Disciplina');

    fireEvent.click(screen.getByRole('button', { name: 'Salvar bloco' }));

    await waitFor(() => expect(discipline).toHaveFocus());
    expect(save).not.toHaveBeenCalled();
  });
});
