import { useEffect, useMemo, useReducer, useState } from 'react';

import { getStudySessionData, StudySessionService, studyTimerReducer } from '@/study/services';
import { useLocalData } from '@/core/providers/useLocalData';
import { toLocalDateKey } from '@/shared/utils/date';
import type {
  StudySessionFilters,
  StudySessionInput,
  StudySession,
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
  date: toLocalDateKey(),
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
  const { revision, status: databaseStatus } = useLocalData();
  const [allSessions, setAllSessions] = useState<StudySession[]>([]);
  const [status, setStatus] = useState<StudySessionViewStatus>('loading');

  useEffect(() => {
    if (databaseStatus === 'loading') return;
    if (databaseStatus === 'error') return;
    let active = true;
    void StudySessionService.getSessions()
      .then((sessions) => { if (active) { setAllSessions(sessions); setStatus('success'); } })
      .catch(() => active && setStatus('error'));
    return () => { active = false; };
  }, [databaseStatus, revision]);

  const data = useMemo(() => getStudySessionData(allSessions, filters), [allSessions, filters]);

  return {
    ...data,
    filters,
    setFilters,
    setStatus,
    status: databaseStatus === 'error' ? 'error' : status === 'success' && allSessions.length === 0 ? 'empty' : status,
  };
}

export function useStudyTimer() {
  const [timer, dispatchTimer] = useReducer(studyTimerReducer, initialTimerState);

  useEffect(() => {
    if (timer.status !== 'running') return;
    const interval = window.setInterval(() => dispatchTimer({ type: 'tick' }), 1000);
    return () => window.clearInterval(interval);
  }, [timer.status]);

  return {
    dispatchTimer,
    timer,
  };
}
