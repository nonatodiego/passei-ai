import 'fake-indexeddb/auto';

import { beforeEach, describe, expect, it } from 'vitest';

import type { GoalRecord } from '@/goals/types';
import { db } from './database';
import { auditDataIntegrity, auditLocalDatabase, type IntegritySnapshot } from './integrity';
import { seedDataprevSchedule } from './seed';

const emptySnapshot = (): IntegritySnapshot => ({
  appSettings: [], contestProfiles: [], disciplines: [], scheduleItems: [], studySessions: [], questionBlocks: [], questions: [], questionAttempts: [], errorRecords: [], reviews: [], mockExams: [], goals: [],
});

describe('local data integrity audit', () => {
  beforeEach(async () => { await db.delete(); await db.open(); });

  it('reports invalid values without changing the source records', () => {
    const snapshot = emptySnapshot();
    snapshot.studySessions.push({ id: 'session-1', date: '2026-02-30', disciplineName: '', subject: 'SQL', status: 'completed', durationMinutes: Number.NaN, questionsAnswered: 2, correctAnswers: 2, wrongAnswers: 1, createdAt: '', updatedAt: '' });
    const original = structuredClone(snapshot);

    const report = auditDataIntegrity(snapshot);

    expect(report.issues.map((issue) => issue.code)).toEqual(expect.arrayContaining(['invalid-date', 'invalid-number', 'inconsistent-question-count', 'missing-required-text']));
    expect(snapshot).toEqual(original);
  });

  it('reports broken references and duplicate pending reviews', () => {
    const snapshot = emptySnapshot();
    snapshot.studySessions.push({ id: 'session-1', date: '2026-07-18', disciplineName: 'TI', subject: 'SQL', status: 'completed', durationMinutes: 30, questionsAnswered: 0, correctAnswers: 0, wrongAnswers: 0, scheduleItemId: 'missing', createdAt: '', updatedAt: '' });
    const review = { id: 'review-1', sourceType: 'manual', disciplineName: 'TI', subject: 'SQL', scheduledAt: '2026-07-20', status: 'pending', estimatedMinutes: 20, createdAt: '', updatedAt: '' };
    snapshot.reviews.push(review, { ...review, id: 'review-2' });

    const report = auditDataIntegrity(snapshot);

    expect(report.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ code: 'broken-reference', entity: 'studySessions' }),
      expect.objectContaining({ code: 'duplicate-pending-review', severity: 'warning' }),
    ]));
  });

  it('flags semantic duplicates without changing archived records', () => {
    const snapshot = emptySnapshot();
    const session = { id: 'session-1', date: '2026-07-18', disciplineName: 'TI', subject: 'SQL', status: 'completed', durationMinutes: 30, questionsAnswered: 5, correctAnswers: 4, wrongAnswers: 1, createdAt: '', updatedAt: '' };
    snapshot.studySessions.push(session, { ...session, id: 'session-2' }, { ...session, id: 'session-3', deletedAt: '2026-07-19T00:00:00.000Z' });

    const report = auditDataIntegrity(snapshot);

    expect(report.issues.filter((issue) => issue.code === 'duplicate-study-session')).toHaveLength(1);
    expect(report.issues).toContainEqual(expect.objectContaining({ id: 'session-2', severity: 'warning' }));
  });

  it('audits the database without mutating persisted data', async () => {
    const goal: GoalRecord = { id: 'goal-1', name: 'Horas', kind: 'hours', target: 10, createdAt: '', updatedAt: '' };
    await db.goals.put(goal);

    const report = await auditLocalDatabase();

    expect(report.summary).toMatchObject({ errors: 0, records: 1 });
    expect(await db.goals.count()).toBe(1);
  });

  it('accepts the official DATAPREV seed without integrity errors', async () => {
    await seedDataprevSchedule();

    const report = await auditLocalDatabase();

    expect(report.summary.records).toBeGreaterThan(956);
    expect(report.summary.errors).toBe(0);
  });
});
