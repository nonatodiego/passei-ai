import { db } from '@/core/database/database';
import type { ScheduleItem } from '@/core/database/types';
import type { ErrorRecord } from '@/error-bank/types';
import type { QuestionBlock } from '@/questions/types';
import type { ReviewRecord } from '@/reviews/types';
import type { StudySession } from '@/study/types';

export type RecommendationUrgency = 'low' | 'medium' | 'high' | 'critical';
export type DecisionRuleId =
  | 'overdue-review'
  | 'overdue-schedule'
  | 'today-schedule'
  | 'recurring-error'
  | 'low-performance'
  | 'weekly-goal-risk'
  | 'inactive-discipline'
  | 'schedule-backlog';

export interface RecommendationEvidence { label: string; value: string; }
export interface StudyRecommendation {
  id: string; ruleId: DecisionRuleId; title: string; problem: string; reason: string;
  evidence: RecommendationEvidence[]; impact: string; actionLabel: string; actionRoute: string;
  urgency: RecommendationUrgency; estimatedMinutes: number; disciplineId?: string;
  disciplineName?: string; subject?: string; relatedEntityId?: string;
}
export interface DailyPlanItem {
  id: string; title: string; reason: string; evidence: string; estimatedMinutes: number;
  urgency: RecommendationUrgency; actionRoute: string; actionLabel: string; disciplineName?: string;
}
export interface DecisionEngineInput {
  now: string; examDate?: string; scheduleItems: ScheduleItem[]; studySessions: StudySession[];
  questionBlocks: QuestionBlock[]; errors: ErrorRecord[]; reviews: ReviewRecord[];
  weeklyGoalMinutes: number; materialEstimates: Record<string, number>;
}
export interface DecisionEngineResult {
  generatedAt: string; dailyPlan: DailyPlanItem[]; recommendations: StudyRecommendation[];
  dataSufficiency: { isSufficient: boolean; message?: string }; summary: { overdueReviews: number; overdueActivities: number; weeklyMinutes: number; };
}

const urgencyRank: Record<RecommendationUrgency, number> = { critical: 4, high: 3, medium: 2, low: 1 };
const isoDate = (value: string) => value.slice(0, 10);
const isCompleted = (status: string) => status.toLowerCase().includes('conclu') || status === 'completed';
const daysBetween = (from: string, to: string) => Math.max(0, Math.floor((new Date(`${to}T00:00:00`).getTime() - new Date(`${from}T00:00:00`).getTime()) / 86400000));
const startOfWeek = (date: string) => { const value = new Date(`${date}T00:00:00`); const day = value.getDay() || 7; value.setDate(value.getDate() - day + 1); return isoDate(value.toISOString()); };
const recommendation = (value: StudyRecommendation): StudyRecommendation => value;

export function generateDecisionEngineResult(input: DecisionEngineInput): DecisionEngineResult {
  const today = isoDate(input.now);
  const recommendations: StudyRecommendation[] = [];
  const overdueReviews = input.reviews.filter((item) => item.status === 'pending' && item.scheduledAt < today);
  if (overdueReviews.length) {
    const oldest = overdueReviews.reduce((oldestItem, item) => item.scheduledAt < oldestItem.scheduledAt ? item : oldestItem);
    recommendations.push(recommendation({ id: 'overdue-reviews', ruleId: 'overdue-review', title: 'Conclua suas revisoes atrasadas', problem: 'Revisoes vencidas', reason: 'Revisoes atrasadas acumulam conteudo que precisa ser retomado.', evidence: [{ label: 'Revisoes vencidas', value: String(overdueReviews.length) }, { label: 'Atraso maximo', value: `${daysBetween(oldest.scheduledAt, today)} dias` }], impact: 'Reduz o risco de esquecimento do conteudo ja estudado.', actionLabel: 'Abrir revisoes', actionRoute: '/revisoes', urgency: 'critical', estimatedMinutes: overdueReviews.reduce((sum, item) => sum + item.estimatedMinutes, 0), relatedEntityId: oldest.id }));
  }
  const overdueByDiscipline = input.scheduleItems.filter((item) => !isCompleted(item.status) && item.plannedDate < today).reduce<Record<string, ScheduleItem[]>>((groups, item) => { (groups[item.disciplineName] ??= []).push(item); return groups; }, {});
  Object.entries(overdueByDiscipline).forEach(([disciplineName, items]) => {
    const oldest = items.sort((a, b) => a.plannedDate.localeCompare(b.plannedDate))[0];
    recommendations.push(recommendation({ id: `overdue-schedule-${oldest.id}`, ruleId: 'overdue-schedule', title: `Recupere ${disciplineName}`, problem: 'Atividades atrasadas', reason: 'Atividades do cronograma passaram da data planejada.', evidence: [{ label: 'Atividades atrasadas', value: String(items.length) }, { label: 'Atraso maximo', value: `${daysBetween(oldest.plannedDate, today)} dias` }], impact: 'Ajuda a reduzir o acumulo do cronograma.', actionLabel: 'Iniciar atividade mais antiga', actionRoute: `/estudos?scheduleItemId=${oldest.id}`, urgency: items.length >= 3 ? 'high' : 'medium', estimatedMinutes: items.reduce((sum, item) => sum + (item.actualMinutes ?? input.materialEstimates[item.activityType] ?? 45), 0), disciplineName, relatedEntityId: oldest.id }));
  });
  input.scheduleItems.filter((item) => !isCompleted(item.status) && item.plannedDate === today).forEach((item) => recommendations.push(recommendation({ id: `today-schedule-${item.id}`, ruleId: 'today-schedule', title: `Continue o cronograma com ${item.title}`, problem: 'Atividade prevista para hoje', reason: 'Esta atividade esta planejada para hoje.', evidence: [{ label: 'Data planejada', value: today }], impact: 'Mantem a aderencia ao seu plano de estudo.', actionLabel: 'Iniciar atividade', actionRoute: `/estudos?scheduleItemId=${item.id}`, urgency: 'medium', estimatedMinutes: item.actualMinutes ?? input.materialEstimates[item.activityType] ?? 45, disciplineName: item.disciplineName, relatedEntityId: item.id })));
  input.errors.filter((item) => item.status === 'active' && item.recurrence >= 2).forEach((item) => recommendations.push(recommendation({ id: `recurring-error-${item.id}`, ruleId: 'recurring-error', title: `Revise ${item.subject}`, problem: 'Erro recorrente', reason: 'O mesmo assunto voltou a aparecer no Banco de Erros.', evidence: [{ label: 'Ocorrencias', value: String(item.recurrence) }], impact: 'Ataca uma lacuna de conhecimento que se repete.', actionLabel: 'Abrir erro', actionRoute: '/banco-de-erros', urgency: item.recurrence >= 4 ? 'high' : 'medium', estimatedMinutes: input.materialEstimates.review ?? 30, disciplineName: item.discipline, subject: item.subject, relatedEntityId: item.id })));
  const performance = input.studySessions.reduce<Record<string, { answered: number; correct: number }>>((bySubject, item) => { const key = `${item.disciplineName}::${item.subject}`; const current = bySubject[key] ?? { answered: 0, correct: 0 }; current.answered += item.questionsAnswered; current.correct += item.correctAnswers; bySubject[key] = current; return bySubject; }, {});
  input.questionBlocks.forEach((item) => { const key = `${item.discipline}::${item.subject}`; const current = performance[key] ?? { answered: 0, correct: 0 }; current.answered += item.totalQuestions; current.correct += item.correctAnswers; performance[key] = current; });
  Object.entries(performance).forEach(([key, value]) => { const accuracy = value.answered ? value.correct / value.answered : 1; if (value.answered >= 10 && accuracy < .8) { const [disciplineName, subject] = key.split('::'); recommendations.push(recommendation({ id: `low-performance-${key}`, ruleId: 'low-performance', title: `Pratique ${subject}`, problem: 'Desempenho abaixo da meta', reason: 'O desempenho recente em questoes merece reforco direcionado.', evidence: [{ label: 'Questoes no recorte', value: String(value.answered) }, { label: 'Taxa de acertos', value: `${Math.round(accuracy * 100)}%` }], impact: 'Mais pratica guiada melhora a seguranca no assunto.', actionLabel: 'Resolver questoes', actionRoute: '/questoes', urgency: accuracy < .7 ? 'high' : 'medium', estimatedMinutes: input.materialEstimates.questions ?? 40, disciplineName, subject })) } });
  const weekStart = startOfWeek(today); const weeklyMinutes = input.studySessions.filter((item) => item.date >= weekStart && item.date <= today).reduce((sum, item) => sum + item.durationMinutes, 0);
  const remainingDays = Math.max(1, 7 - (new Date(`${today}T00:00:00`).getDay() || 7)); const remainingMinutes = Math.max(0, input.weeklyGoalMinutes - weeklyMinutes);
  if (remainingMinutes > 0 && weeklyMinutes < input.weeklyGoalMinutes) recommendations.push(recommendation({ id: 'weekly-goal-risk', ruleId: 'weekly-goal-risk', title: 'Proteja sua meta semanal', problem: 'Meta semanal em risco', reason: 'Ainda faltam minutos para chegar a sua meta de estudo da semana.', evidence: [{ label: 'Minutos realizados', value: `${weeklyMinutes} min` }, { label: 'Necessario por dia', value: `${Math.ceil(remainingMinutes / remainingDays)} min` }], impact: 'Distribuir o esforco evita concentrar o estudo no fim da semana.', actionLabel: 'Registrar estudo', actionRoute: '/estudos', urgency: remainingMinutes / remainingDays > 90 ? 'high' : 'medium', estimatedMinutes: Math.ceil(remainingMinutes / remainingDays) }));
  const studiedDisciplines = new Set(input.studySessions.map((item) => item.disciplineName));
  if (studiedDisciplines.size >= 2) {
    const cutoff = new Date(`${today}T00:00:00`); cutoff.setDate(cutoff.getDate() - 14);
    const lastByDiscipline = input.studySessions.reduce<Record<string, string>>((acc, item) => { if (!acc[item.disciplineName] || item.date > acc[item.disciplineName]) acc[item.disciplineName] = item.date; return acc; }, {});
    Object.entries(lastByDiscipline).filter(([, date]) => date < isoDate(cutoff.toISOString())).forEach(([disciplineName, date]) => {
      recommendations.push(recommendation({ id: `inactive-${disciplineName}`, ruleId: 'inactive-discipline', title: `Retome ${disciplineName}`, problem: 'Disciplina sem estudo recente', reason: 'Esta disciplina tem historico, mas ficou sem novos registros recentemente.', evidence: [{ label: 'Ultimo registro', value: date }], impact: 'Retomar o contato reduz a perda de continuidade.', actionLabel: 'Registrar estudo', actionRoute: '/estudos', urgency: 'low', estimatedMinutes: 45, disciplineName }));
    });
  }
  const overdueItems = Object.values(overdueByDiscipline).flat(); if (overdueItems.length >= 5) recommendations.push(recommendation({ id: 'schedule-backlog', ruleId: 'schedule-backlog', title: 'Reduza o acumulo do cronograma', problem: 'Carga atrasada relevante', reason: 'Ha varias atividades atrasadas antes da data da prova.', evidence: [{ label: 'Atividades atrasadas', value: String(overdueItems.length) }, { label: 'Carga estimada', value: `${overdueItems.reduce((sum, item) => sum + (item.actualMinutes ?? 45), 0)} min` }], impact: 'Uma recuperacao gradual melhora a visibilidade do plano.', actionLabel: 'Ver cronograma', actionRoute: '/cronograma', urgency: 'high', estimatedMinutes: 45 }));
  const ordered = recommendations.sort((a, b) => urgencyRank[b.urgency] - urgencyRank[a.urgency] || b.estimatedMinutes - a.estimatedMinutes).slice(0, 5);
  const hasHistory = input.studySessions.length > 0 || input.questionBlocks.length > 0;
  return { generatedAt: input.now, dailyPlan: ordered.map((item) => ({ id: item.id, title: item.title, reason: item.reason, evidence: item.evidence.map((e) => `${e.label}: ${e.value}`).join(' - '), estimatedMinutes: item.estimatedMinutes, urgency: item.urgency, actionRoute: item.actionRoute, actionLabel: item.actionLabel, disciplineName: item.disciplineName })), recommendations: ordered, dataSufficiency: { isSufficient: hasHistory, message: hasHistory ? undefined : 'Registre estudos e questoes para receber recomendacoes mais precisas.' }, summary: { overdueReviews: overdueReviews.length, overdueActivities: overdueItems.length, weeklyMinutes } };
}

export const defaultMaterialEstimates = { video: 45, pdf: 60, review: 30, questions: 40, mockExam: 120, reading: 45, other: 45 };
export async function getLocalDecisionEngineResult(now = new Date().toISOString()): Promise<DecisionEngineResult> {
  const [profiles, scheduleItems, studySessions, questionBlocks, errors, reviews, goals] = await Promise.all([db.contestProfiles.toArray(), db.scheduleItems.toArray(), db.studySessions.toArray(), db.questionBlocks.toArray(), db.errorRecords.toArray(), db.reviews.toArray(), db.goals.toArray()]);
  const weeklyGoal = (goals as Array<{ name?: string }>).find((goal) => goal.name?.includes('horas'))?.name?.match(/\d+/)?.[0];
  return generateDecisionEngineResult({ now, examDate: profiles[0]?.examDate, scheduleItems, studySessions: studySessions as unknown as StudySession[], questionBlocks: questionBlocks as unknown as QuestionBlock[], errors: errors as unknown as ErrorRecord[], reviews: reviews as unknown as ReviewRecord[], weeklyGoalMinutes: Number(weeklyGoal ?? 15) * 60, materialEstimates: defaultMaterialEstimates });
}
