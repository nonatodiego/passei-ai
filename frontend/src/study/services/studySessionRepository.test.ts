import 'fake-indexeddb/auto';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { db } from '@/core/database/database';
import { seedDataprevSchedule } from '@/core/database/seed';

import { StudySessionService } from './index';
import type { StudySessionInput } from '@/study/types';

const input: StudySessionInput = {
  correctAnswers: 8,
  date: '2026-07-13',
  difficulty: 'moderate',
  disciplineId: 'dataprev-lingua-portuguesa',
  disciplineName: 'Língua Portuguesa',
  durationMinutes: 60,
  materialType: 'questions',
  notes: '',
  questionsAnswered: 10,
  scheduleItemId: 'f811c965e37084e591a5',
  source: 'Registro manual',
  status: 'completed',
  subject: 'Interpretação de texto',
  wrongAnswers: 2,
};

describe('persistent study sessions', () => {
  beforeEach(async () => {
    await db.delete();
    await db.open();
    await seedDataprevSchedule();
  });

  afterEach(async () => {
    await db.delete();
  });

  it('persists a session and completes its linked schedule activity', async () => {
    const session = await StudySessionService.createSession(input, true);

    expect((await StudySessionService.getSessions()).map((item) => item.id)).toContain(session.id);
    expect((await db.scheduleItems.get(input.scheduleItemId!))?.status).toBe('Concluída');
  });

  it('duplicates a session without copying the schedule link', async () => {
    const saved = await StudySessionService.createSession(input);
    const copy = await StudySessionService.duplicateSession(saved.id);

    expect(copy.id).not.toBe(saved.id);
    expect(copy.scheduleItemId).toBeUndefined();
  });

  it('rolls back the session when its linked activity does not exist', async () => {
    await expect(StudySessionService.createSession({
      ...input,
      scheduleItemId: 'missing-schedule-item',
    }, true)).rejects.toThrow('Atividade vinculada nao encontrada.');

    expect(await db.studySessions.count()).toBe(0);
  });
});
