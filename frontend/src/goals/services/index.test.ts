import { describe, expect, it } from 'vitest';

import type { GoalRecord } from '@/goals/types';

import { getGoalTarget, normalizeGoals } from './index';

describe('goal normalization', () => {
  it('preserves a persisted target instead of returning the default', () => {
    const stored: GoalRecord = {
      createdAt: '2026-07-01T00:00:00.000Z',
      id: 'saved-hours',
      kind: 'hours',
      name: 'Horas de estudo por semana',
      target: 8,
      updatedAt: '2026-07-18T00:00:00.000Z',
    };

    expect(getGoalTarget([stored], 'hours', 15)).toBe(8);
    expect(normalizeGoals([stored]).find((goal) => goal.kind === 'hours')).toMatchObject({ id: 'saved-hours', target: 8 });
  });

  it('repairs invalid legacy targets with the official default', () => {
    const hours = normalizeGoals([{ id: 'legacy', kind: 'hours', name: 'Horas', target: Number.NaN }])
      .find((goal) => goal.kind === 'hours');

    expect(hours?.target).toBe(15);
  });
});
