import { describe, expect, it } from 'vitest';

import type { StudySession, StudySessionFilters, StudySessionInput } from '@/study/types';

import { filterStudySessions, validateStudySessionInput } from './studySessionCalculations';

const session = (id: string, date: string): StudySession => ({
  correctAnswers: 0,
  createdAt: '',
  date,
  difficulty: 'moderate',
  disciplineId: 'ti',
  disciplineName: 'TI',
  durationMinutes: 30,
  id,
  materialType: 'pdf',
  notes: '',
  questionsAnswered: 0,
  source: 'Manual',
  status: 'completed',
  subject: 'SQL',
  updatedAt: '',
  wrongAnswers: 0,
});

const filters = (period: StudySessionFilters['period']): StudySessionFilters => ({
  disciplineId: 'all',
  materialType: 'all',
  period,
  query: '',
  status: 'all',
});

describe('study session calculations', () => {
  it('filters the current local week across a month boundary', () => {
    const sessions = [session('sunday', '2026-07-26'), session('monday', '2026-07-27'), session('saturday', '2026-08-01')];

    expect(filterStudySessions(sessions, filters('week'), new Date(2026, 7, 1, 23, 30)).map((item) => item.id))
      .toEqual(['monday', 'saturday']);
  });

  it('filters only current-month records up to the local reference date', () => {
    const sessions = [session('july', '2026-07-31'), session('august', '2026-08-01'), session('future', '2026-08-02')];

    expect(filterStudySessions(sessions, filters('month'), new Date(2026, 7, 1, 23, 30)).map((item) => item.id))
      .toEqual(['august']);
  });

  it('rejects non-finite and fractional facts', () => {
    const input: StudySessionInput = { ...session('new', '2026-08-01'), durationMinutes: Number.NaN, questionsAnswered: 1.5 };

    expect(validateStudySessionInput(input)).toMatchObject({
      isValid: false,
      errors: {
        durationMinutes: 'Duracao deve ser maior que zero.',
        questionsAnswered: 'Questoes devem ser inteiras e nao negativas.',
      },
    });
  });
});
