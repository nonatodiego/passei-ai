import { describe, expect, it } from 'vitest';

import { dashboardSummary, disciplines } from '@/mocks/data';

describe('mock data', () => {
  it('uses DATAPREV 2026 as the default contest', () => {
    expect(dashboardSummary.contest.name).toBe('DATAPREV 2026');
    expect(dashboardSummary.contest.board).toBe('FGV');
    expect(dashboardSummary.contest.approvalTarget).toBe(85);
  });

  it('contains the initial disciplines required for the MVP', () => {
    expect(disciplines).toHaveLength(9);
    expect(disciplines.map((discipline) => discipline.name)).toContain(
      'Gestão e Governança de TI',
    );
  });
});
