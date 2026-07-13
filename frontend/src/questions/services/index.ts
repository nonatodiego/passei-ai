import { questionMocks } from '@/questions/mocks';
import type {
  AnalyticsQuestionEvent,
  ErrorBankQuestionCandidate,
  Question,
  QuestionAnswerResult,
  QuestionFilters,
  QuestionStats,
  StudyEngineQuestionFacts,
} from '@/questions/types';

export const defaultQuestionFilters: QuestionFilters = {
  difficulty: 'all',
  discipline: 'all',
  query: '',
  status: 'all',
  subject: 'all',
};

export function filterQuestions(
  questions: Question[],
  filters: QuestionFilters,
): Question[] {
  const query = filters.query.trim().toLowerCase();

  return questions.filter((question) => {
    const matchesQuery =
      query.length === 0 ||
      question.statement.toLowerCase().includes(query) ||
      question.tags.some((tag) => tag.toLowerCase().includes(query));
    const matchesDiscipline =
      filters.discipline === 'all' || question.discipline === filters.discipline;
    const matchesSubject =
      filters.subject === 'all' || question.subject === filters.subject;
    const matchesDifficulty =
      filters.difficulty === 'all' || question.difficulty === filters.difficulty;
    const matchesStatus = filters.status === 'all' || question.status === filters.status;

    return (
      matchesQuery &&
      matchesDiscipline &&
      matchesSubject &&
      matchesDifficulty &&
      matchesStatus
    );
  });
}

export function answerQuestion(
  question: Question,
  selectedAlternativeId: string,
): QuestionAnswerResult {
  return {
    correctAlternativeId: question.correctAlternativeId,
    explanation: question.explanation,
    isCorrect: selectedAlternativeId === question.correctAlternativeId,
    questionId: question.id,
    selectedAlternativeId,
  };
}

export function calculateQuestionStats(questions: Question[]): QuestionStats {
  const correct = questions.filter((question) => question.status === 'correct').length;
  const incorrect = questions.filter((question) => question.status === 'incorrect').length;
  const unanswered = questions.filter((question) => question.status === 'unanswered').length;
  const answered = correct + incorrect;

  return {
    accuracyRate: answered > 0 ? Math.round((correct / answered) * 100) : 0,
    correct,
    favorites: questions.filter((question) => question.favorite).length,
    incorrect,
    total: questions.length,
    unanswered,
  };
}

export function createStudyEngineQuestionFacts(
  questions: Question[],
): StudyEngineQuestionFacts {
  const stats = calculateQuestionStats(questions);
  const difficultSubjects = questions
    .filter((question) => question.status === 'incorrect' || question.difficulty === 'hard')
    .map((question) => question.subject);

  return {
    accuracyRate: stats.accuracyRate,
    answeredQuestions: stats.correct + stats.incorrect,
    difficultSubjects: [...new Set(difficultSubjects)],
    recentQuestionIds: questions.slice(0, 5).map((question) => question.id),
  };
}

export function createErrorBankCandidate(
  question: Question,
): ErrorBankQuestionCandidate {
  return {
    discipline: question.discipline,
    explanation: question.explanation,
    questionId: question.id,
    subject: question.subject,
    tags: question.tags,
  };
}

export function createAnalyticsQuestionEvent(
  question: Question,
  result: QuestionAnswerResult,
): AnalyticsQuestionEvent {
  return {
    difficulty: question.difficulty,
    discipline: question.discipline,
    isCorrect: result.isCorrect,
    questionId: question.id,
    subject: question.subject,
  };
}

export interface QuestionServicePort {
  getQuestions: () => Question[];
}

export const QuestionService: QuestionServicePort = {
  getQuestions: () => questionMocks,
};

export function getQuestionBankData(filters: QuestionFilters) {
  const questions = QuestionService.getQuestions();
  const filteredQuestions = filterQuestions(questions, filters);

  return {
    allQuestions: questions,
    engineFacts: createStudyEngineQuestionFacts(questions),
    filteredQuestions,
    stats: calculateQuestionStats(questions),
  };
}
export * from './questionBlockService';
