// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { errorBankMocks } from '@/error-bank/mocks';
import { ErrorBankPage } from '@/error-bank/pages/ErrorBankPage';
import {
  ErrorBankService,
  calculateErrorStats,
  createErrorBankFacts,
  defaultErrorFilters,
  filterErrorRecords,
  toAnalyticsEvent,
  toRecommendationFact,
  toReviewFact,
  toTodaySignal,
  validateErrorRecord,
} from '@/error-bank/services';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

async function openForm() {
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: 'Novo erro' }));
  return user;
}

async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Disciplina'), 'Redes');
  await user.type(screen.getByLabelText('Assunto'), 'TCP');
  await user.type(screen.getByLabelText('Categoria do erro'), 'Conceito');
  await user.selectOptions(screen.getByLabelText('Prioridade'), 'high');
  await user.type(screen.getByLabelText('Contexto ou enunciado'), 'Questao sobre conexao');
  await user.type(screen.getByLabelText('Motivo do erro'), 'Confusao entre estados');
  await user.type(screen.getByLabelText('Conceito ou resposta correta'), 'Three-way handshake');
  await user.type(screen.getByLabelText('Acao corretiva'), 'Revisar diagrama TCP');
}

describe('ErrorBankPage DOM', () => {
  it('opens, validates, preserves values and focuses the first invalid field', async () => {
    render(<ErrorBankPage />);
    const user = await openForm();
    const discipline = screen.getByLabelText('Disciplina');
    await user.type(discipline, '   ');
    await user.click(screen.getByRole('button', { name: 'Registrar erro' }));
    expect(await screen.findAllByText('Este campo e obrigatorio.')).not.toHaveLength(0);
    expect(discipline).toHaveValue('   ');
    await waitFor(() => expect(discipline).toHaveFocus());
    expect(screen.getByRole('dialog', { name: 'Registrar erro manual' })).toBeVisible();
  });

  it('submits valid data, closes and clears the form after success', async () => {
    render(<ErrorBankPage />);
    const user = await openForm();
    await fillRequiredFields(user);
    await user.click(screen.getByRole('button', { name: 'Registrar erro' }));
    expect(await screen.findByText('Erro registrado com sucesso.')).toBeVisible();
    expect(screen.queryByRole('dialog', { name: 'Registrar erro manual' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Novo erro' }));
    expect(screen.getByLabelText('Disciplina')).toHaveValue('');
  });

  it('closes the form by cancel and Escape and returns focus to the trigger', async () => {
    render(<ErrorBankPage />);
    const user = await openForm();
    await user.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(screen.getByRole('button', { name: 'Novo erro' })).toHaveFocus();
    await user.click(screen.getByRole('button', { name: 'Novo erro' }));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: 'Registrar erro manual' })).not.toBeInTheDocument();
  });

  it('opens accessible details, supports actions and returns focus', async () => {
    render(<ErrorBankPage />);
    const user = userEvent.setup();
    const details = screen.getAllByRole('button', { name: 'Detalhes' })[0]!;
    await user.click(details);
    expect(screen.getByRole('dialog', { name: 'Detalhes do erro' })).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Marcar revisado' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Erro marcado como revisado.');
    await user.click(screen.getByRole('button', { name: 'Nova ocorrencia' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Nova ocorrencia registrada.');
    await user.keyboard('{Escape}');
    expect(details).toHaveFocus();
  });

  it('marks an error as mastered and shows service failures', async () => {
    render(<ErrorBankPage />);
    const user = userEvent.setup();
    await user.click(screen.getAllByRole('button', { name: 'Detalhes' })[0]!);
    await user.click(screen.getByRole('button', { name: 'Marcar dominado' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Assunto marcado como dominado.');
    vi.spyOn(ErrorBankService, 'runAction').mockImplementationOnce(() => {
      throw new Error('mock failure');
    });
    await user.click(screen.getByRole('button', { name: 'Arquivar' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Nao foi possivel concluir a acao.');
  });
});

describe('ErrorBank domain and contracts', () => {
  it('filters recurring records and calculates KPIs', () => {
    expect(filterErrorRecords(errorBankMocks, { ...defaultErrorFilters, recurringOnly: true })).toHaveLength(1);
    expect(calculateErrorStats(errorBankMocks)).toMatchObject({ active: 1, recurring: 1, mastered: 1 });
  });

  it('validates whitespace and past review dates', () => {
    const errors = validateErrorRecord({
      discipline: ' ', subject: '', category: '', context: '', reason: '', correctConcept: '',
      correctiveAction: '', priority: '', tags: '', notes: '', selectedAnswer: '', source: '',
      nextReview: '2026-01-01', complementaryNotes: '',
    }, new Date('2026-07-12T12:00:00'));
    expect(errors.discipline).toBe('Este campo e obrigatorio.');
    expect(errors.nextReview).toContain('anterior');
  });

  it('produces typed facts without local recommendation rules', () => {
    const record = errorBankMocks[0]!;
    expect(createErrorBankFacts(errorBankMocks).pendingReviewIds).toContain(record.id);
    expect(toReviewFact(record)).toEqual({ errorId: record.id, subject: record.subject, nextReview: record.nextReview });
    expect(toRecommendationFact(record).correctiveAction).toBe(record.correctiveAction);
    expect(toAnalyticsEvent(record).recurrence).toBe(record.recurrence);
    expect(toTodaySignal(record)).toEqual({ errorId: record.id, correctiveAction: record.correctiveAction });
  });
});
