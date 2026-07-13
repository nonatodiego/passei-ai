import { db } from '@/core/database/database';
import { publishLocalDataChange } from '@/core/database/events';
import { completeScheduleItem } from '@/core/database/scheduleRepository';
import type { StudySession, StudySessionFilters, StudySessionInput } from '@/study/types';

import {
  calculateStudySessionSummary,
  createStudyEngineFacts,
  filterStudySessions,
  validateStudySessionInput,
} from './studySessionCalculations';

export interface StudySessionServicePort {
  createSession: (input: StudySessionInput, completeScheduleItem?: boolean) => Promise<StudySession>;
  deleteSession: (id: string) => Promise<void>;
  duplicateSession: (id: string) => Promise<StudySession>;
  getSessions: () => Promise<StudySession[]>;
  updateSession: (id: string, input: StudySessionInput) => Promise<StudySession>;
}

const now = () => new Date().toISOString();
const createId = () => globalThis.crypto?.randomUUID?.() ?? `study-session-${Date.now()}`;

export const StudySessionService: StudySessionServicePort = {
  createSession: async (input, shouldCompleteScheduleItem = false) => {
    const validation = validateStudySessionInput(input);

    if (!validation.isValid) {
      throw new Error('Invalid study session input.');
    }

    const session: StudySession = {
      ...input,
      createdAt: now(),
      id: createId(),
      updatedAt: now(),
    };
    await db.studySessions.put(session);
    if (shouldCompleteScheduleItem && session.scheduleItemId) {
      await completeScheduleItem(session.scheduleItemId);
    }
    publishLocalDataChange();
    return session;
  },
  deleteSession: async (id) => {
    await db.studySessions.delete(id);
    publishLocalDataChange();
  },
  duplicateSession: async (id) => {
    const session = await db.studySessions.get(id) as StudySession | undefined;
    if (!session) throw new Error('Sessao de estudo nao encontrada.');
    return StudySessionService.createSession({
      ...session,
      date: new Date().toISOString().slice(0, 10),
      scheduleItemId: undefined,
      startTime: undefined,
    });
  },
  getSessions: async () => ((await db.studySessions.toArray()) as StudySession[])
    .sort((left, right) => right.date.localeCompare(left.date) || right.updatedAt.localeCompare(left.updatedAt)),
  updateSession: async (id, input) => {
    const existing = await db.studySessions.get(id) as StudySession | undefined;
    if (!existing) throw new Error('Sessao de estudo nao encontrada.');
    const validation = validateStudySessionInput(input);
    if (!validation.isValid) throw new Error('Dados da sessao invalidos.');
    const session = { ...existing, ...input, id, updatedAt: now() };
    await db.studySessions.put(session);
    publishLocalDataChange();
    return session;
  },
};

export function getStudySessionData(allSessions: StudySession[], filters: StudySessionFilters) {
  const filteredSessions = filterStudySessions(allSessions, filters);

  return {
    allSessions,
    engineFacts: createStudyEngineFacts(allSessions),
    sessions: filteredSessions,
    summary: calculateStudySessionSummary(filteredSessions),
  };
}

export * from './studySessionCalculations';
