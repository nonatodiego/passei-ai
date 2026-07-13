export type StudyMaterialType =
  | 'video'
  | 'pdf'
  | 'law'
  | 'summary'
  | 'questions'
  | 'review'
  | 'mockExam'
  | 'reading'
  | 'other';

export type StudyDifficulty = 'easy' | 'moderate' | 'hard';

export type StudySessionStatus = 'planned' | 'inProgress' | 'completed' | 'interrupted';

export type StudySessionViewStatus = 'loading' | 'empty' | 'error' | 'success';

export interface StudySession {
  id: string;
  date: string;
  disciplineId: string;
  disciplineName: string;
  subject: string;
  materialType: StudyMaterialType;
  durationMinutes: number;
  difficulty: StudyDifficulty;
  questionsAnswered: number;
  correctAnswers: number;
  wrongAnswers: number;
  notes: string;
  source: string;
  scheduleItemId?: string;
  startTime?: string;
  status: StudySessionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface StudySessionInput {
  date: string;
  disciplineId: string;
  disciplineName: string;
  subject: string;
  materialType: StudyMaterialType;
  durationMinutes: number;
  difficulty: StudyDifficulty;
  questionsAnswered: number;
  correctAnswers: number;
  wrongAnswers: number;
  notes: string;
  source: string;
  scheduleItemId?: string;
  startTime?: string;
  status: StudySessionStatus;
}

export interface StudySessionFilters {
  disciplineId: string;
  materialType: string;
  period: string;
  query: string;
  status: string;
}

export interface StudySessionSummary {
  averageDurationMinutes: number;
  mostStudiedDiscipline: string;
  sessionsCount: number;
  totalHours: number;
  totalQuestions: number;
  accuracyRate: number;
}

export interface StudyEngineStudyFacts {
  accuracyRate: number;
  disciplineIds: string[];
  frequencyDays: number;
  recentSessions: StudySession[];
  totalStudiedMinutes: number;
  totalQuestions: number;
}

export type StudyTimerStatus = 'idle' | 'running' | 'paused' | 'finished';

export interface StudyTimerState {
  elapsedSeconds: number;
  status: StudyTimerStatus;
}

export type StudyTimerAction =
  | { type: 'start' }
  | { type: 'pause' }
  | { type: 'resume' }
  | { type: 'finish' }
  | { type: 'discard' }
  | { type: 'tick'; seconds?: number };

export interface StudySessionValidationResult {
  errors: Partial<Record<keyof StudySessionInput, string>>;
  isValid: boolean;
}
