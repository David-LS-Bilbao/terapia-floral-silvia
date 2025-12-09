// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // Changed to jsdom for HTML parsing
    include: ['tests/**/*.spec.ts'],
    exclude: ['tests/e2e.spec.ts', 'tests/e2e-basic.spec.ts'], // Excluir tests de Playwright
    coverage: { 
      reporter: ['text', 'html'],
      exclude: ['tests/e2e.spec.ts', 'tests/e2e-basic.spec.ts']
    }
  },
});
