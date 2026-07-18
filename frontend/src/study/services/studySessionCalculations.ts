import type {
  StudyEngineStudyFacts,
  StudySession,
  StudySessionFilters,
  StudySessionInput,
  StudySessionSummary,
  StudySessionValidationResult,
  StudyTimerAction,
  StudyTimerState,
} from '@/study/types';
import { getLocalWeekRange, isValidLocalDateKey, toLocalDateKey } from '@/shared/utils/date';

export function calculateAccuracyRate(correctAnswers: number, questionsAnswered: number): number {
  if (questionsAnswered <= 0) {
    return 0;
  }

  return Math.round((correctAnswers / questionsAnswered) * 100);
}

export function calculateStudySessionSummary(sessions: StudySession[]): StudySessionSummary {
  const totalMinutes = sessions.reduce((total, session) => total + session.durationMinutes, 0);
  const totalQuestions = sessions.reduce((total, session) => total + session.questionsAnswered, 0);
  const correctAnswers = sessions.reduce((total, session) => total + session.correctAnswers, 0);
  const disciplineMinutes = sessions.reduce<Record<string, number>>((totals, session) => {
    totals[session.disciplineName] = (totals[session.disciplineName] ?? 0) + session.durationMinutes;
    return totals;
  }, {});
  const mostStudiedDiscipline =
    Object.entries(disciplineMinutes).sort(([, left], [, right]) => right - left)[0]?.[0] ?? 'Sem dados';

  return {
    accuracyRate: calculateAccuracyRate(correctAnswers, totalQuestions),
    averageDurationMinutes: sessions.length > 0 ? Math.round(totalMinutes / sessions.length) : 0,
    mostStudiedDiscipline,
    sessionsCount: sessions.length,
    totalHours: Math.round((totalMinutes / 60) * 10) / 10,
    totalQuestions,
  };
}

export function filterStudySessions(
  sessions: StudySession[],
  filters: StudySessionFilters,
  referenceDate = new Date(),
): StudySession[] {
  const query = filters.query.trim().toLowerCase();
  const today = toLocalDateKey(referenceDate);
  const weekStart = getLocalWeekRange(referenceDate).start;
  const monthStart = `${today.slice(0, 7)}-01`;

  return sessions.filter((session) => {
    const matchesDiscipline =
      filters.disciplineId === 'all' || session.disciplineId === filters.disciplineId;
    const matchesMaterial =
      filters.materialType === 'all' || session.materialType === filters.materialType;
    const matchesStatus = filters.status === 'all' || session.status === filters.status;
    const matchesQuery = query.length === 0 || session.subject.toLowerCase().includes(query);
    const matchesPeriod =
      filters.period === 'all' ||
      (filters.period === 'week' && session.date >= weekStart && session.date <= today) ||
      (filters.period === 'month' && session.date >= monthStart && session.date <= today);

    return matchesDiscipline && matchesMaterial && matchesStatus && matchesQuery && matchesPeriod;
  });
}

export function validateStudySessionInput(
  input: StudySessionInput,
): StudySessionValidationResult {
  const errors: StudySessionValidationResult['errors'] = {};

  if (!input.disciplineId || !input.disciplineName.trim()) {
    errors.disciplineId = 'Disciplina obrigatoria.';
  }

  if (!input.subject.trim()) {
    errors.subject = 'Assunto obrigatorio.';
  }

  if (!isValidLocalDateKey(input.date)) {
    errors.date = 'Informe uma data valida.';
  }

  if (!Number.isFinite(input.durationMinutes) || input.durationMinutes <= 0) {
    errors.durationMinutes = 'Duracao deve ser maior que zero.';
  }

  if (!Number.isInteger(input.questionsAnswered) || input.questionsAnswered < 0) {
    errors.questionsAnswered = 'Questoes devem ser inteiras e nao negativas.';
  }

  if (!Number.isInteger(input.correctAnswers) || input.correctAnswers < 0) {
    errors.correctAnswers = 'Acertos devem ser inteiros e nao negativos.';
  }

  if (!Number.isInteger(input.wrongAnswers) || input.wrongAnswers < 0) {
    errors.wrongAnswers = 'Erros devem ser inteiros e nao negativos.';
  }

  if (input.correctAnswers + input.wrongAnswers > input.questionsAnswered) {
    errors.correctAnswers = 'Acertos e erros nao podem superar o total de questoes.';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

export function createStudyEngineFacts(sessions: StudySession[]): StudyEngineStudyFacts {
  const summary = calculateStudySessionSummary(sessions);
  const uniqueDays = new Set(sessions.map((session) => session.date));
  const disciplineIds = Array.from(new Set(sessions.map((session) => session.disciplineId)));

  return {
    accuracyRate: summary.accuracyRate,
    disciplineIds,
    frequencyDays: uniqueDays.size,
    recentSessions: sessions.slice(0, 5),
    totalQuestions: summary.totalQuestions,
    totalStudiedMinutes: sessions.reduce((total, session) => total + session.durationMinutes, 0),
  };
}

export function studyTimerReducer(
  state: StudyTimerState,
  action: StudyTimerAction,
): StudyTimerState {
  switch (action.type) {
    case 'start':
      return { elapsedSeconds: 0, status: 'running' };
    case 'pause':
      return state.status === 'running' ? { ...state, status: 'paused' } : state;
    case 'resume':
      return state.status === 'paused' ? { ...state, status: 'running' } : state;
    case 'finish':
      return { ...state, status: 'finished' };
    case 'discard':
      return { elapsedSeconds: 0, status: 'idle' };
    case 'tick':
      return state.status === 'running'
        ? { ...state, elapsedSeconds: state.elapsedSeconds + (action.seconds ?? 1) }
        : state;
    default:
      return state;
  }
}

export function timerSecondsToMinutes(seconds: number): number {
  return Math.max(1, Math.ceil(seconds / 60));
}
