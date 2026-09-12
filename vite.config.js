import { defineConfig, configDefaults } from 'vitest/config'
 
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js', // Extensión corregida a .js
    exclude: [...configDefaults.exclude, 'e2e/**', 'backend/**'], // Ignora Playwright y backend
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 50,
        statements: 60,
      },
    },
  },
})