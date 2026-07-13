import 'fake-indexeddb/auto';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { db } from '@/core/database/database';
import { QuestionBlockService, validateQuestionBlock } from './questionBlockService';

const input = { annulledAnswers: 1, bank: 'FGV', correctAnswers: 7, date: '2026-07-13', difficulty: 'medium' as const, discipline: 'Banco de Dados', durationMinutes: 30, notes: '', platform: 'QConcursos', subject: 'SQL', totalQuestions: 10, wrongAnswers: 2 };

describe('question blocks', () => {
  beforeEach(async () => { await db.delete(); await db.open(); });
  afterEach(async () => { await db.delete(); });

  it('persists a validated external question block', async () => {
    const block = await QuestionBlockService.create(input);
    expect(block.accuracyRate).toBe(70);
    expect(await QuestionBlockService.getAll()).toHaveLength(1);
  });

  it('rejects totals that do not match the block size', () => {
    expect(validateQuestionBlock({ ...input, wrongAnswers: 1 })).toContain('totalizar');
  });
});
