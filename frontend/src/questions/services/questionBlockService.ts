import { db } from '@/core/database/database';
import { publishLocalDataChange } from '@/core/database/events';

import type { QuestionBlock, QuestionBlockInput } from '@/questions/types';

export function validateQuestionBlock(input: QuestionBlockInput): string | undefined {
  if (!input.discipline.trim()) return 'Disciplina obrigatoria.';
  if (!input.subject.trim()) return 'Assunto obrigatorio.';
  if (input.totalQuestions <= 0) return 'A quantidade de questoes deve ser maior que zero.';
  if ([input.correctAnswers, input.wrongAnswers, input.annulledAnswers, input.durationMinutes].some((value) => value < 0)) return 'Os numeros nao podem ser negativos.';
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
