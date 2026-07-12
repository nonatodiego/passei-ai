import { studySessionMocks } from '@/study/mocks';
import type { StudySession, StudySessionFilters, StudySessionInput } from '@/study/types';

import {
  calculateStudySessionSummary,
  createStudyEngineFacts,
  filterStudySessions,
  validateStudySessionInput,
} from './studySessionCalculations';

export interface StudySessionServicePort {
  createSession: (input: StudySessionInput) => StudySession;
  getSessions: () => StudySession[];
}

let sessions = [...studySessionMocks];

export const StudySessionService: StudySessionServicePort = {
  createSession: (input) => {
    const validation = validateStudySessionInput(input);

    if (!validation.isValid) {
      throw new Error('Invalid study session input.');
    }

    const now = '2026-07-11T12:00:00';
    const session: StudySession = {
      ...input,
      createdAt: now,
      id: `study-session-${sessions.length + 1}`,
      updatedAt: now,
    };

    sessions = [session, ...sessions];
    return session;
  },
  getSessions: () => sessions,
};

export function getStudySessionData(filters: StudySessionFilters) {
  const allSessions = StudySessionService.getSessions();
  const filteredSessions = filterStudySessions(allSessions, filters);

  return {
    allSessions,
    engineFacts: createStudyEngineFacts(allSessions),
    sessions: filteredSessions,
    summary: calculateStudySessionSummary(filteredSessions),
  };
}

export * from './studySessionCalculations';
