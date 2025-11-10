// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.spec.ts'],
    exclude: ['tests/e2e.spec.ts'], // Excluir tests de Playwright
    coverage: { 
      reporter: ['text', 'html'],
      exclude: ['tests/e2e.spec.ts']
    }
  },
});
