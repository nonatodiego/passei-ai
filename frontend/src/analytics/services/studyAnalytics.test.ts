import { describe, expect, it } from 'vitest';
import { calculateStudyAnalytics } from './studyAnalytics';

const args = () => ({ period: '7d' as '7d' | 'today', now: '2026-07-13T12:00:00.000Z', examDate: '2026-08-13', sessions: [{ id: 's1', date: '2026-07-13', disciplineName: 'TI', subject: 'Redes', durationMinutes: 60, questionsAnswered: 10, correctAnswers: 8, wrongAnswers: 2 }, { id: 's2', date: '2026-07-12', disciplineName: 'Direito', subject: 'Lei', durationMinutes: 30, questionsAnswered: 0, correctAnswers: 0, wrongAnswers: 0 }], blocks: [], schedule: [{ id: 'a1', plannedDate: '2026-07-10', status: 'Concluida', completedAt: '2026-07-13', outsideExamWindow: false, actualMinutes: 45 }], reviews: [{ id: 'r1', status: 'completed', completedAt: '2026-07-13' }], errors: [{ status: 'active' }, { status: 'mastered' }] });
describe('study analytics', () => {
  it('aggregates totals, rates and discipline data without artificial points', () => { const result = calculateStudyAnalytics(args() as never); expect(result.totals).toMatchObject({ minutes: 90, questions: 10, accuracyRate: 80, completedActivities: 1, completedReviews: 1, streak: 2 }); expect(result.disciplines).toHaveLength(2); expect(result.series).toHaveLength(2); });
  it('treats zero denominators and an empty previous period honestly', () => { const input = args(); input.period = 'today'; input.sessions = []; input.blocks = []; const result = calculateStudyAnalytics(input as never); expect(result.totals.accuracyRate).toBe(0); expect(result.comparison.minutes.percentage).toBeUndefined(); });
  it('calculates plan health from the contest window', () => { const result = calculateStudyAnalytics(args() as never); expect(result.planHealth).toMatchObject({ withinWindow: 1, completed: 1, overdue: 0 }); });
});
