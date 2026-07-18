import { describe, expect, it } from 'vitest';

import {
  addLocalDays,
  differenceInLocalDays,
  endOfLocalDay,
  formatLocalDatePtBr,
  getLocalWeekRange,
  isValidLocalDateKey,
  startOfLocalDay,
  toLocalDateKey,
} from './date';

describe('local date utilities', () => {
  it('keeps the local calendar day close to midnight', () => {
    const localMidnight = new Date(2026, 0, 1, 0, 5);

    expect(toLocalDateKey(localMidnight)).toBe('2026-01-01');
    expect(startOfLocalDay(localMidnight).getHours()).toBe(0);
    expect(endOfLocalDay(localMidnight).getHours()).toBe(23);
  });

  it('crosses month and year boundaries without UTC shifts', () => {
    expect(addLocalDays('2026-01-31', 1)).toBe('2026-02-01');
    expect(addLocalDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(differenceInLocalDays('2026-12-31', '2027-01-02')).toBe(2);
  });

  it('builds a Monday-based local week', () => {
    expect(getLocalWeekRange(new Date(2026, 6, 18))).toEqual({
      end: '2026-07-19',
      start: '2026-07-13',
    });
  });

  it('validates and formats date-only values', () => {
    expect(isValidLocalDateKey('2026-02-28')).toBe(true);
    expect(isValidLocalDateKey('2026-02-30')).toBe(false);
    expect(formatLocalDatePtBr('2026-10-11')).toBe('11/10/2026');
  });
});
