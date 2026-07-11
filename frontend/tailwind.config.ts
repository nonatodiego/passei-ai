import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        app: {
          background: '#F8FAFC',
          card: '#FFFFFF',
          primary: '#1D4ED8',
          primarySoft: '#DBEAFE',
          secondary: '#3B82F6',
          text: '#0F172A',
          muted: '#64748B',
          border: '#E2E8F0',
          success: '#16A34A',
          warning: '#F59E0B',
          danger: '#DC2626',
          ink: '#111827',
          teal: '#0F766E',
        },
      },
      boxShadow: {
        panel: '0 16px 40px -30px rgba(15, 23, 42, 0.38)',
      },
    },
  },
  plugins: [],
} satisfies Config;
