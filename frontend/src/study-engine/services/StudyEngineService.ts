import type { EngineResult } from '@/study-engine/types';

export interface StudyEngineProviderPort {
  getEngineResult: () => EngineResult;
}

const emptyEngineResult: EngineResult = {
  context: { availableMinutesToday: 0, examDate: '', targetScore: 0, weeklyGoalHours: 0 },
  dailyPlan: { date: '', focus: '', totalEstimatedMinutes: 0, sessions: [] },
  generatedAt: '', metrics: { accuracyRate: 0, completedReviews: 0, consistencyRate: 0, preparationIndex: 0, solvedQuestions: 0, studiedHours: 0 }, recommendations: [], reviews: [], sessions: [],
};

export const localStudyEngineService: StudyEngineProviderPort = { getEngineResult: () => emptyEngineResult };
