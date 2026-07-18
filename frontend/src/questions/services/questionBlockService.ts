import { db } from '@/core/database/database';
import { publishLocalDataChange } from '@/core/database/events';

import type { QuestionBlock, QuestionBlockInput } from '@/questions/types';
import { isValidLocalDateKey } from '@/shared/utils/date';

export function validateQuestionBlock(input: QuestionBlockInput): string | undefined {
  if (!input.discipline.trim()) return 'Disciplina obrigatoria.';
  if (!input.subject.trim()) return 'Assunto obrigatorio.';
  if (!isValidLocalDateKey(input.date)) return 'Informe uma data valida.';
  if (!Number.isInteger(input.totalQuestions) || input.totalQuestions <= 0) return 'A quantidade de questoes deve ser maior que zero.';
  if ([input.correctAnswers, input.wrongAnswers, input.annulledAnswers].some((value) => !Number.isInteger(value) || value < 0) || !Number.isFinite(input.durationMinutes) || input.durationMinutes < 0) return 'Os numeros devem ser inteiros e nao negativos.';
  if (input.correctAnswers + input.wrongAnswers + input.annulledAnswers !== input.totalQuestions) return 'Acertos, erros e anuladas devem totalizar a quantidade de questoes.';
  return undefined;
}

export const QuestionBlockService = {
  async create(input: QuestionBlockInput): Promise<QuestionBlock> {
    const validationError = validateQuestionBlock(input);
    if (validationError) throw new Error(validationError);
    const now = new Date().toISOString();
    const block: QuestionBlock = {
      ...input,
      bank: input.bank.trim(),
      discipline: input.discipline.trim(),
      notes: input.notes.trim(),
      platform: input.platform.trim(),
      subject: input.subject.trim(),
      accuracyRate: input.totalQuestions === 0 ? 0 : Math.round((input.correctAnswers / input.totalQuestions) * 100),
      createdAt: now,
      id: globalThis.crypto?.randomUUID?.() ?? `question-block-${Date.now()}`,
      updatedAt: now,
    };
    await db.questionBlocks.put(block);
    publishLocalDataChange();
    return block;
  },
  async getAll(): Promise<QuestionBlock[]> {
    return ((await db.questionBlocks.toArray()) as QuestionBlock[]).sort((left, right) => right.date.localeCompare(left.date));
  },
};
