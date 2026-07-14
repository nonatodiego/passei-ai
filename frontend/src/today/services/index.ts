import { db } from '@/core/database/database';
import { getLocalDecisionEngineResult } from '@/study-engine/services/DecisionEngineService';
import type { TodayData } from '@/today/types';

type Session = { date: string; durationMinutes: number; questionsAnswered: number; correctAnswers: number };
type Block = { date: string; totalQuestions: number; correctAnswers: number };
type Review = { scheduledAt: string; status: string; disciplineName: string; subject: string; estimatedMinutes: number };
type ErrorRecord = { status: string; recurrence: number };
const today = () => new Date().toISOString().slice(0, 10);

export const TodayService = {
  async getToday(): Promise<TodayData> {
    const date = today();
    const [sessions, blocks, reviews, errors, decision] = await Promise.all([
      db.studySessions.toArray(), db.questionBlocks.toArray(), db.reviews.toArray(), db.errorRecords.toArray(), getLocalDecisionEngineResult(),
    ]);
    const daySessions = (sessions as unknown as Session[]).filter((item) => item.date === date);
    const dayBlocks = (blocks as unknown as Block[]).filter((item) => item.date === date);
    const minutes = daySessions.reduce((sum, item) => sum + item.durationMinutes, 0);
    const questions = daySessions.reduce((sum, item) => sum + item.questionsAnswered, 0) + dayBlocks.reduce((sum, item) => sum + item.totalQuestions, 0);
    const correct = daySessions.reduce((sum, item) => sum + item.correctAnswers, 0) + dayBlocks.reduce((sum, item) => sum + item.correctAnswers, 0);
    const next = (reviews as unknown as Review[]).find((item) => item.scheduledAt === date && !['completed', 'cancelled'].includes(item.status));
    const plannedMinutes = decision.dailyPlan.reduce((sum, item) => sum + item.estimatedMinutes, 0);
    return {
      greeting: 'Hoje', motivation: minutes ? 'Indicadores calculados a partir dos seus registros locais.' : 'Registre estudos e questoes para tornar as recomendacoes mais precisas.',
      availableMinutes: plannedMinutes, plannedMinutes, remainingMinutes: Math.max(0, plannedMinutes - minutes), preparationIndex: 0,
      preparationMessage: decision.dataSufficiency.message ?? 'Indice em formacao com seus dados locais.', preparationTrend: '', weeklyStudiedHours: Math.round(decision.summary.weeklyMinutes / 6) / 10, weeklyGoalHours: 15,
      activities: decision.dailyPlan.map((item) => ({ id: item.id, type: 'study' as const, discipline: item.disciplineName ?? 'Plano de estudo', subject: item.title, estimatedMinutes: item.estimatedMinutes, priority: item.urgency === 'critical' || item.urgency === 'high' ? 'high' as const : item.urgency === 'medium' ? 'medium' as const : 'low' as const, status: 'pending' as const, recommendationReason: `${item.reason} ${item.evidence}`, actionRoute: item.actionRoute, actionLabel: item.actionLabel })),
      nextReview: next ? { discipline: next.disciplineName, subject: next.subject, time: 'Hoje', estimatedMinutes: next.estimatedMinutes } : { discipline: 'Sem revisoes pendentes', subject: '', time: '', estimatedMinutes: 0 },
      recommendedQuestions: { quantity: 0, discipline: '', reason: 'Registre um bloco de questoes para acompanhar seu desempenho.' },
      alerts: [`${(errors as unknown as ErrorRecord[]).filter((item) => item.status === 'active').length} erros ativos`, `${(errors as unknown as ErrorRecord[]).filter((item) => item.recurrence > 1).length} erros recorrentes`],
      quickSummary: { answeredQuestions: questions, studiedHours: Math.round(minutes / 6) / 10, remainingMinutes: Math.max(0, plannedMinutes - minutes), accuracyRate: questions ? Math.round((correct / questions) * 100) : 0 },
    };
  },
};
