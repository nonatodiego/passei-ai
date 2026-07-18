import 'fake-indexeddb/auto';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { db } from '@/core/database/database';
import type { ReviewInput } from '@/reviews/types';

import { ReviewService, suggestNextReviewDate } from './index';

const input: ReviewInput = {
  disciplineId: 'ti',
  disciplineName: 'Tecnologia da Informacao',
  estimatedMinutes: 30,
  notes: '',
  priority: 'medium',
  scheduledAt: '2026-07-20',
  sourceType: 'manual',
  subject: 'Banco de Dados',
};

describe('review persistence', () => {
  beforeEach(async () => {
    await db.delete();
    await db.open();
  });

  afterEach(async () => {
    await db.delete();
  });

  it('allows different manual subjects on the same day', async () => {
    await ReviewService.create(input);
    await ReviewService.create({ ...input, subject: 'Redes' });

    expect(await db.reviews.count()).toBe(2);
  });

  it('rejects an equivalent pending review on the same day', async () => {
    await ReviewService.create(input);

    await expect(ReviewService.create({ ...input, subject: '  banco de dados  ' }))
      .rejects.toThrow('Ja existe uma revisao pendente equivalente nesta data.');
  });

  it('updates a linked error atomically without marking it as mastered', async () => {
    const timestamp = new Date().toISOString();
    await db.errorRecords.put({ id: 'error-1', createdAt: timestamp, updatedAt: timestamp, history: [] } as never);
    const review = await ReviewService.create({ ...input, sourceId: 'error-1', sourceType: 'error' });

    const completed = await ReviewService.complete(review, 'good');
    const linkedError = await db.errorRecords.get('error-1') as unknown as Record<string, unknown>;

    expect(completed).toMatchObject({ result: 'good', status: 'completed' });
    expect(linkedError.reviewResult).toBe('good');
    expect(linkedError.status).toBeUndefined();
  });

  it('suggests local dates across a month boundary', () => {
    expect(suggestNextReviewDate(1, 'good', new Date(2026, 6, 31, 23, 30))).toBe('2026-08-07');
    expect(suggestNextReviewDate(3, 'forgot', new Date(2026, 6, 31, 23, 30))).toBe('2026-08-01');
  });
});
