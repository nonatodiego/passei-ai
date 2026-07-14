import { describe, expect, it } from 'vitest';
import { calculateStudyAnalytics } from '@/analytics/services';

describe('Dashboard analytics', () => {
  it('returns an honest empty result when there are no local records', () => {
    const result = calculateStudyAnalytics({ period: '7d', now: '2026-07-13T12:00:00.000Z', sessions: [], blocks: [], schedule: [], reviews: [], errors: [] });
    expect(result.totals.minutes).toBe(0);
    expect(result.series).toEqual([]);
  });
});
