export const colors = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceMuted: '#F1F5F9',
  primary: '#2563EB',
  primarySoft: '#DBEAFE',
  secondary: '#3B82F6',
  info: '#0EA5E9',
  success: '#16A34A',
  warning: '#F59E0B',
  danger: '#DC2626',
  text: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  focus: '#93C5FD',
  teal: '#0F766E',
} as const;

export const typography = {
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  sizes: {
    display: ['3rem', { lineHeight: '1.05', fontWeight: '700' }],
    h1: ['1.875rem', { lineHeight: '2.25rem', fontWeight: '700' }],
    h2: ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
    h3: ['1.125rem', { lineHeight: '1.75rem', fontWeight: '600' }],
    body: ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
    small: ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
    caption: ['0.75rem', { lineHeight: '1rem', fontWeight: '500' }],
  },
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  6: '1.5rem',
  8: '2rem',
  12: '3rem',
  16: '4rem',
} as const;

export const radii = {
  sm: '0.375rem',
  md: '0.625rem',
  lg: '1rem',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px rgba(15, 23, 42, 0.06)',
  panel: '0 16px 40px -30px rgba(15, 23, 42, 0.38)',
  floating: '0 24px 60px -32px rgba(15, 23, 42, 0.42)',
} as const;

export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
} as const;

export const zIndex = {
  base: 0,
  dropdown: 20,
  sticky: 30,
  drawer: 40,
  modal: 50,
  toast: 60,
} as const;

export const designTokens = {
  colors,
  typography,
  spacing,
  radii,
  shadows,
  breakpoints,
  zIndex,
} as const;
