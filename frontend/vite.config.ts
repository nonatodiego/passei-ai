import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    watch: {
      ignored: [
        '**/e2e/visual/__screenshots__/**',
        '**/playwright-report/**',
        '**/test-results/**',
      ],
    },
  },
});
