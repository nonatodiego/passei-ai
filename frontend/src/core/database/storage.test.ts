import { describe, expect, it } from 'vitest';

import { getAppEnvironment } from './storage';

describe('storage environment', () => {
  it('distinguishes the production domain from Vercel previews', () => {
    expect(getAppEnvironment('passei-ai.vercel.app')).toBe('production');
    expect(getAppEnvironment('passei-ai-git-hardening.vercel.app')).toBe('preview');
    expect(getAppEnvironment('localhost')).toBe('local');
  });
});
