import type { Config } from 'tailwindcss';
import { breakpoints, colors, radii, shadows, typography, zIndex } from './src/design-system/tokens';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        app: {
          background: colors.background,
          card: colors.surface,
          surfaceMuted: colors.surfaceMuted,
          primary: colors.primary,
          primarySoft: colors.primarySoft,
          secondary: colors.secondary,
          info: colors.info,
          text: colors.text,
          muted: colors.textMuted,
          border: colors.border,
          success: colors.success,
          warning: colors.warning,
          danger: colors.danger,
          focus: colors.focus,
          teal: colors.teal,
        },
      },
      borderRadius: radii,
      boxShadow: {
        ...shadows,
      },
      fontFamily: {
        sans: [typography.fontFamily],
      },
      fontSize: typography.sizes,
      screens: {
        mobile: breakpoints.mobile,
        tablet: breakpoints.tablet,
        desktop: breakpoints.desktop,
        wide: breakpoints.wide,
      },
      zIndex,
    },
  },
  plugins: [],
} satisfies Config;
