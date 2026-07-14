import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { getLocalStudyAnalytics } from '@/analytics/services';
import { ErrorBankService } from '@/error-bank/services';
import { QuestionBlockService } from '@/questions/services/questionBlockService';
import { ReviewService } from '@/reviews/services';
import { StudySessionService } from '@/study/services';
import { getLocalDecisionEngineResult } from '@/study-engine/services/DecisionEngineService';
import { db } from './database';
import { exportBackup, importBackup, resetDatabase } from './backup';

describe('persistent MVP journey', () => {
  beforeEach(async () => { await db.delete(); await db.open(); });

  it('keeps a real study journey after backup restoration', async () => {
    const now = new Date().toISOString();
    await db.scheduleItems.put({ id: 'schedule-1', plannedDate: now.slice(0, 10), disciplineName: 'Governanca de TI', title: 'APO06', activityType: 'PDF', status: 'planned', outsideExamWindow: false, createdAt: now, updatedAt: now });
    await StudySessionService.createSession({ date: now.slice(0, 10), disciplineId: 'gov', disciplineName: 'Governanca de TI', subject: 'APO06', materialType: 'pdf', durationMinutes: 60, difficulty: 'moderate', questionsAnswered: 0, correctAnswers: 0, wrongAnswers: 0, notes: '', source: 'Cronograma', scheduleItemId: 'schedule-1', status: 'completed' }, true);
    await QuestionBlockService.create({ date: now.slice(0, 10), discipline: 'Governanca de TI', subject: 'APO06', bank: 'FGV', difficulty: 'medium', durationMinutes: 30, totalQuestions: 10, correctAnswers: 6, wrongAnswers: 4, annulledAnswers: 0, platform: 'Local', notes: '' });
    const { record } = await ErrorBankService.create({ discipline: 'Governanca de TI', subject: 'APO06', category: 'Conceito', context: 'Questao APO06', reason: 'Confusao', correctConcept: 'Conceito correto', correctiveAction: 'Revisar resumo', priority: 'high', tags: '', notes: '', selectedAnswer: '', source: 'Bloco de questoes', nextReview: now.slice(0, 10), complementaryNotes: '' });
    const review = await ReviewService.create({ sourceType: 'error', sourceId: record.id, disciplineId: 'gov', disciplineName: record.discipline, subject: record.subject, scheduledAt: now.slice(0, 10), estimatedMinutes: 30, priority: 'high', notes: '' });
    await ReviewService.complete(review, 'good');
    expect((await db.scheduleItems.get('schedule-1'))?.status).toMatch(/conclu|completed/i);
    expect((await getLocalStudyAnalytics('today')).totals).toMatchObject({ minutes: 90, questions: 10, completedActivities: 1, completedReviews: 1 });
    expect((await getLocalDecisionEngineResult()).dataSufficiency.isSufficient).toBe(true);
    const backup = await exportBackup(); await resetDatabase(); expect(await db.studySessions.count()).toBe(0); await importBackup(backup);
    expect(await db.studySessions.count()).toBe(1); expect(await db.questionBlocks.count()).toBe(1); expect(await db.errorRecords.count()).toBe(1); expect(await db.reviews.count()).toBe(1);
  });
});
