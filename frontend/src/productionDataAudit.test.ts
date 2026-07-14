import { describe, expect, it } from 'vitest';

const sources = import.meta.glob([
  './pages/GoalsPage.tsx',
  './pages/MockExamsPage.tsx',
  './pages/SchedulePage.tsx',
  './questions/services/index.ts',
  './questions/hooks/index.ts',
  './questions/pages/QuestionBankPage.tsx',
  './today/services/index.ts',
  './pages/dashboard/DashboardPage.tsx',
], { eager: true, import: 'default', query: '?raw' }) as Record<string, string>;

describe('production data audit', () => {
  it('does not import mock directories in user-facing routes and services', () => {
    Object.values(sources).forEach((source) => expect(source).not.toMatch(/from\s+['"][^'"]*mocks/));
  });
});
