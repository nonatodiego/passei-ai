export type StudyPriority = 'low' | 'medium' | 'high' | 'critical';

export type StudyActivityType = 'study' | 'questions' | 'review' | 'mockExam' | 'reading';

export type StudySessionStatus = 'pending' | 'inProgress' | 'completed' | 'overdue';

export interface StudyContext {
  availableMinutesToday: number;
  examDate: string;
  targetScore: number;
  weeklyGoalHours: number;
}

export interface StudyMetrics {
  accuracyRate: number;
  completedReviews: number;
  consistencyRate: number;
  preparationIndex: number;
  solvedQuestions: number;
  studiedHours: number;
}

export interface StudySession {
  id: string;
  discipline: string;
  subject: string;
  type: StudyActivityType;
  estimatedMinutes: number;
  priority: StudyPriority;
  status: StudySessionStatus;
  weight: number;
  source: string;
  scheduledFor: string;
}

export interface StudyRecommendation {
  id: string;
  discipline: string;
  subject: string;
  reason: string;
  priority: StudyPriority;
  estimatedMinutes: number;
  type: StudyActivityType;
}

export interface ReviewRecommendation {
  id: string;
  discipline: string;
  subject: string;
  dueDate: string;
  reason: string;
  priority: StudyPriority;
}

export interface DailyPlan {
  date: string;
  focus: string;
  totalEstimatedMinutes: number;
  sessions: StudySession[];
}

export interface EngineResult {
  context: StudyContext;
  dailyPlan: DailyPlan;
  metrics: StudyMetrics;
  recommendations: StudyRecommendation[];
  reviews: ReviewRecommendation[];
  sessions: StudySession[];
  generatedAt: string;
}
