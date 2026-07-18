import { db } from '@/core/database/database';
import { publishLocalDataChange } from '@/core/database/events';
import { addLocalDays, isValidLocalDateKey, toLocalDateKey } from '@/shared/utils/date';
import type { ReviewInput, ReviewRecord, ReviewResult } from '@/reviews/types';

export function suggestNextReviewDate(sequence: number, result: ReviewResult, from = new Date()): string | undefined {
  const start = toLocalDateKey(from);
  if (result === 'mastered') return addLocalDays(start, 60);
  if (result === 'forgot') return addLocalDays(start, 1);
  const intervals = [1, 7, 15, 30, 60];
  const base = intervals[Math.min(sequence, intervals.length - 1)]!;
  return addLocalDays(start, result === 'partial' ? Math.max(1, Math.floor(base / 2)) : base);
}

function validateReviewInput(input: ReviewInput): void {
  if (!input.disciplineName.trim() || !input.subject.trim()) throw new Error('Informe disciplina e assunto.');
  if (!isValidLocalDateKey(input.scheduledAt)) throw new Error('Informe uma data valida.');
  if (!Number.isFinite(input.estimatedMinutes) || input.estimatedMinutes <= 0) throw new Error('Informe uma duracao valida.');
}

function samePendingReview(record: ReviewRecord, input: ReviewInput): boolean {
  if (record.status !== 'pending' || record.scheduledAt !== input.scheduledAt) return false;
  if (input.sourceType === 'error' && input.sourceId) return record.sourceType === 'error' && record.sourceId === input.sourceId;
  return record.sourceType === 'manual' && record.disciplineId === input.disciplineId && record.subject.trim().toLowerCase() === input.subject.trim().toLowerCase();
}

async function updateReview(review: ReviewRecord): Promise<ReviewRecord> {
  const updated = { ...review, updatedAt: new Date().toISOString() };
  await db.reviews.put(updated);
  publishLocalDataChange();
  return updated;
}

export const ReviewService = {
  async getAll(): Promise<ReviewRecord[]> {
    return ((await db.reviews.toArray()) as ReviewRecord[])
      .filter((item) => !item.deletedAt)
      .sort((left, right) => left.scheduledAt.localeCompare(right.scheduledAt));
  },
  async create(input: ReviewInput): Promise<ReviewRecord> {
    validateReviewInput(input);
    const reviews = (await db.reviews.toArray()) as ReviewRecord[];
    if (reviews.some((record) => samePendingReview(record, input))) throw new Error('Ja existe uma revisao pendente equivalente nesta data.');
    const timestamp = new Date().toISOString();
    const review: ReviewRecord = {
      ...input,
      disciplineName: input.disciplineName.trim(),
      id: globalThis.crypto?.randomUUID?.() ?? `review-${Date.now()}`,
      notes: input.notes.trim(),
      reviewSequence: 0,
      status: 'pending',
      subject: input.subject.trim(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    await db.reviews.put(review);
    publishLocalDataChange();
    return review;
  },
  update: updateReview,
  start: async (review: ReviewRecord) => updateReview({ ...review, status: 'inProgress' }),
  reschedule: async (review: ReviewRecord, scheduledAt: string) => {
    if (!isValidLocalDateKey(scheduledAt)) throw new Error('Informe uma data valida.');
    return updateReview({ ...review, scheduledAt, status: 'pending' });
  },
  cancel: async (review: ReviewRecord) => updateReview({ ...review, status: 'cancelled' }),
  async complete(review: ReviewRecord, result: ReviewResult): Promise<ReviewRecord> {
    const completedAt = new Date().toISOString();
    const completed: ReviewRecord = {
      ...review,
      completedAt,
      result,
      reviewSequence: review.reviewSequence + 1,
      status: 'completed',
      updatedAt: completedAt,
    };
    await db.transaction('rw', db.reviews, db.errorRecords, async () => {
      await db.reviews.put(completed);
      if (review.sourceType !== 'error' || !review.sourceId) return;
      const error = await db.errorRecords.get(review.sourceId) as { id: string; createdAt: string; lastReviewedAt?: string; reviewResult?: string; updatedAt?: string; history?: string[] } | undefined;
      if (error) await db.errorRecords.put({ ...error, lastReviewedAt: completedAt, reviewResult: result, updatedAt: completedAt, history: [...(error.history ?? []), 'Revisao concluida.'] } as never);
    });
    publishLocalDataChange();
    return completed;
  },
};
