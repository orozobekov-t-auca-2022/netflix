import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    pool: 'threads',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.module.css',
        '**/*.css',
        'src/types/**',
      ],
      thresholds: {
        lines: 80,
        statements: 80,
        functions: 75,
        branches: 80,
      },
    },
  },
});
