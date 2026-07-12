export type QuestionDifficulty = 'easy' | 'medium' | 'hard';
export type QuestionStatus = 'unanswered' | 'correct' | 'incorrect';
export type QuestionViewStatus = 'loading' | 'empty' | 'error' | 'success';

export interface QuestionAlternative {
  id: string;
  text: string;
}

export interface Question {
  alternatives: QuestionAlternative[];
  bank: string;
  correctAlternativeId: string;
  createdAt: string;
  difficulty: QuestionDifficulty;
  discipline: string;
  explanation: string;
  favorite: boolean;
  id: string;
  statement: string;
  status: QuestionStatus;
  subject: string;
  tags: string[];
  year: number;
}

export interface QuestionFilters {
  difficulty: QuestionDifficulty | 'all';
  discipline: string;
  query: string;
  status: QuestionStatus | 'all';
  subject: string;
}

export interface QuestionAnswerResult {
  correctAlternativeId: string;
  explanation: string;
  isCorrect: boolean;
  questionId: string;
  selectedAlternativeId: string;
}

export interface QuestionStats {
  accuracyRate: number;
  correct: number;
  favorites: number;
  incorrect: number;
  total: number;
  unanswered: number;
}

export interface StudyEngineQuestionFacts {
  accuracyRate: number;
  answeredQuestions: number;
  difficultSubjects: string[];
  recentQuestionIds: string[];
}

export interface ErrorBankQuestionCandidate {
  discipline: string;
  explanation: string;
  questionId: string;
  subject: string;
  tags: string[];
}

export interface AnalyticsQuestionEvent {
  difficulty: QuestionDifficulty;
  discipline: string;
  isCorrect: boolean;
  questionId: string;
  subject: string;
}
