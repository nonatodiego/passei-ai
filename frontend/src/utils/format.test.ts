import { describe, expect, it } from 'vitest';

import { formatDate, formatHours, getDaysUntil, percentage } from '@/utils/format';

describe('format utilities', () => {
  it('formats dates for pt-BR users', () => {
    expect(formatDate('2026-10-11')).toBe('11/10/2026');
  });

  it('formats study hours and percentages', () => {
    expect(formatHours(15)).toBe('15h');
    expect(percentage(85)).toBe('85%');
  });

  it('never returns negative days until a past date', () => {
    expect(getDaysUntil('2000-01-01')).toBe(0);
  });
});
