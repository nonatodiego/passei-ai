import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { getLocalStudyAnalytics } from '@/analytics/services';
import { ErrorBankService } from '@/error-bank/services';
import { QuestionBlockService } from '@/questions/services/questionBlockService';
import { ReviewService } from '@/reviews/services';
import { StudySessionService } from '@/study/services';
import { getLocalDecisionEngineResult } from '@/study-engine/services/DecisionEngineService';
import { toLocalDateKey } from '@/shared/utils/date';
import { TodayService } from '@/today/services';
import { db } from './database';
import { exportBackup, importBackup, resetDatabase } from './backup';

describe('persistent MVP journey', () => {
  beforeEach(async () => { await db.delete(); await db.open(); });

  it('keeps a real study journey after backup restoration', async () => {
    const now = new Date().toISOString();
    const today = toLocalDateKey();
    await db.scheduleItems.put({ id: 'schedule-1', plannedDate: today, disciplineName: 'Governanca de TI', title: 'APO06', activityType: 'PDF', status: 'planned', outsideExamWindow: false, createdAt: now, updatedAt: now });
    await StudySessionService.createSession({ date: today, disciplineId: 'gov', disciplineName: 'Governanca de TI', subject: 'APO06', materialType: 'pdf', durationMinutes: 60, difficulty: 'moderate', questionsAnswered: 0, correctAnswers: 0, wrongAnswers: 0, notes: '', source: 'Cronograma', scheduleItemId: 'schedule-1', status: 'completed' }, true);
    await QuestionBlockService.create({ date: today, discipline: 'Governanca de TI', subject: 'APO06', bank: 'FGV', difficulty: 'medium', durationMinutes: 30, totalQuestions: 10, correctAnswers: 6, wrongAnswers: 4, annulledAnswers: 0, platform: 'Local', notes: '' });
    const { record } = await ErrorBankService.create({ discipline: 'Governanca de TI', subject: 'APO06', category: 'Conceito', context: 'Questao APO06', reason: 'Confusao', correctConcept: 'Conceito correto', correctiveAction: 'Revisar resumo', priority: 'high', tags: '', notes: '', selectedAnswer: '', source: 'Bloco de questoes', nextReview: today, complementaryNotes: '' });
    const review = await ReviewService.create({ sourceType: 'error', sourceId: record.id, disciplineId: 'gov', disciplineName: record.discipline, subject: record.subject, scheduledAt: today, estimatedMinutes: 30, priority: 'high', notes: '' });
    await ReviewService.complete(review, 'good');
    expect((await db.scheduleItems.get('schedule-1'))?.status).toMatch(/conclu|completed/i);
    expect((await getLocalStudyAnalytics('today')).totals).toMatchObject({ minutes: 90, questions: 10, completedActivities: 1, completedReviews: 1 });
    expect((await getLocalDecisionEngineResult()).dataSufficiency.isSufficient).toBe(true);
    const backup = await exportBackup(); await resetDatabase(); expect(await db.studySessions.count()).toBe(0); await importBackup(backup);
    expect(await db.studySessions.count()).toBe(1); expect(await db.questionBlocks.count()).toBe(1); expect(await db.errorRecords.count()).toBe(1); expect(await db.reviews.count()).toBe(1);
  });

  it('updates one linked session without duplication and preserves it in backup', async () => {
    const now = new Date().toISOString(); const today = toLocalDateKey();
    await db.scheduleItems.put({ id: 'schedule-edit', plannedDate: today, disciplineName: 'Direito', title: 'Lei de Acesso', activityType: 'PDF', status: 'planned', outsideExamWindow: false, createdAt: now, updatedAt: now });
    const created = await StudySessionService.createSession({ date: today, disciplineId: 'direito', disciplineName: 'Direito', subject: 'Lei de Acesso', materialType: 'pdf', durationMinutes: 60, difficulty: 'moderate', questionsAnswered: 5, correctAnswers: 3, wrongAnswers: 2, notes: '', source: 'Cronograma', scheduleItemId: 'schedule-edit', status: 'completed' }, true);
    const updated = await StudySessionService.updateSession(created.id, { ...created, disciplineId: 'ti', disciplineName: 'Tecnologia da Informacao', subject: 'Governanca', durationMinutes: 90, questionsAnswered: 10, correctAnswers: 7, wrongAnswers: 3, notes: 'Sessao revisada' });
    expect(updated).toMatchObject({ id: created.id, createdAt: created.createdAt, scheduleItemId: 'schedule-edit', durationMinutes: 90, disciplineName: 'Tecnologia da Informacao', subject: 'Governanca', notes: 'Sessao revisada' });
    expect(await db.studySessions.count()).toBe(1);
    expect((await db.scheduleItems.get('schedule-edit'))?.status).toMatch(/conclu|completed/i);
    expect((await getLocalStudyAnalytics('today')).totals).toMatchObject({ minutes: 90, questions: 10, correct: 7 });
    expect((await TodayService.getToday()).quickSummary).toMatchObject({ studiedHours: 1.5, answeredQuestions: 10, accuracyRate: 70 });
    const backup = await exportBackup(); const exported = backup.studySessions[0] as typeof updated;
    expect(exported).toMatchObject({ id: created.id, createdAt: created.createdAt, durationMinutes: 90, scheduleItemId: 'schedule-edit' });
    await resetDatabase(); await importBackup(backup);
    expect(await db.studySessions.get(created.id)).toMatchObject({ id: created.id, createdAt: created.createdAt, durationMinutes: 90, scheduleItemId: 'schedule-edit' });
    expect(await db.studySessions.count()).toBe(1);
  });
});
