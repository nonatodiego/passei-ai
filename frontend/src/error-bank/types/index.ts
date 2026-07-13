export type ErrorPriority = 'high' | 'medium' | 'low';
export type ErrorStatus = 'active' | 'reviewed' | 'mastered' | 'archived';
export type ErrorViewStatus = 'loading' | 'empty' | 'error' | 'success' | 'mastered';
export interface ErrorRecord { id: string; discipline: string; subject: string; category: string; priority: ErrorPriority; status: ErrorStatus; source: string; question: string; selectedAnswer: string; correctAnswer: string; explanation: string; reason: string; correctiveAction: string; recurrence: number; nextReview: string; notes: string; tags: string[]; history: string[]; createdAt: string; updatedAt: string; questionBlockId?: string; questionId?: string; lastReviewedAt?: string; reviewResult?: string; occurrences: string[]; }
export interface ErrorFilters { discipline: string; subject: string; category: string; priority: ErrorPriority | 'all'; status: ErrorStatus | 'all'; source: string; query: string; recurringOnly: boolean; pendingOnly: boolean; }
export interface ErrorBankStats { active: number; recurring: number; mastered: number; pendingReview: number; predominantCategory: string; criticalDiscipline: string; }
export interface ErrorRecordInput {
  discipline: string;
  subject: string;
  category: string;
  context: string;
  reason: string;
  correctConcept: string;
  correctiveAction: string;
  priority: ErrorPriority | '';
  tags: string;
  notes: string;
  selectedAnswer: string;
  source: string;
  nextReview: string;
  complementaryNotes: string;
  questionBlockId?: string;
  questionId?: string;
}
export type ErrorRecordValidationErrors = Partial<Record<keyof ErrorRecordInput, string>>;
export type ErrorAction = 'review' | 'master' | 'archive' | 'reschedule' | 'recur';
export interface ErrorBankFacts { activeErrors: number; recurringErrorSubjects: string[]; pendingReviewIds: string[]; }
export interface ReviewEngineErrorFact { errorId: string; subject: string; nextReview: string; }
export interface RecommendationEngineErrorFact { errorId: string; correctiveAction: string; }
export interface AnalyticsEngineErrorEvent { errorId: string; category: string; recurrence: number; }
export interface TodayErrorSignal { errorId: string; correctiveAction: string; }
