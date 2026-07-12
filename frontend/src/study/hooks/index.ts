import { useMemo, useReducer, useState } from 'react';

import { getStudySessionData, studyTimerReducer } from '@/study/services';
import type {
  StudySessionFilters,
  StudySessionInput,
  StudySessionViewStatus,
  StudyTimerState,
} from '@/study/types';

export const defaultStudySessionFilters: StudySessionFilters = {
  disciplineId: 'all',
  materialType: 'all',
  period: 'all',
  query: '',
  status: 'all',
};

export const defaultStudySessionInput: StudySessionInput = {
  correctAnswers: 0,
  date: '2026-07-11',
  difficulty: 'moderate',
  disciplineId: '',
  disciplineName: '',
  durationMinutes: 60,
  materialType: 'video',
  notes: '',
  questionsAnswered: 0,
  source: '',
  status: 'completed',
  subject: '',
  wrongAnswers: 0,
};

const initialTimerState: StudyTimerState = {
  elapsedSeconds: 0,
  status: 'idle',
};

export function useStudySessions(initialFilters = defaultStudySessionFilters) {
  const [filters, setFilters] = useState<StudySessionFilters>(initialFilters);
  const [status, setStatus] = useState<StudySessionViewStatus>('success');
  const data = useMemo(() => getStudySessionData(filters), [filters]);

  return {
    ...data,
    filters,
    setFilters,
    setStatus,
    status: status === 'success' && data.sessions.length === 0 ? 'empty' : status,
  };
}

export function useStudyTimer() {
  const [timer, dispatchTimer] = useReducer(studyTimerReducer, initialTimerState);

  return {
    dispatchTimer,
    timer,
  };
}
