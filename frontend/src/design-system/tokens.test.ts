import { describe, expect, it } from 'vitest';

import { breakpoints, colors, radii, shadows, spacing, zIndex } from '@/design-system/tokens';

describe('design tokens', () => {
  it('centralizes the core light theme colors', () => {
    expect(colors.background).toBe('#F8FAFC');
    expect(colors.primary).toBe('#2563EB');
    expect(colors.text).toBe('#0F172A');
  });

  it('defines structural scales used by components', () => {
    expect(spacing[4]).toBe('1rem');
    expect(radii.md).toBe('0.625rem');
    expect(shadows.panel).toContain('rgba');
    expect(breakpoints.desktop).toBe('1024px');
    expect(zIndex.modal).toBeGreaterThan(zIndex.drawer);
  });
});
