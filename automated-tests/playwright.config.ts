import 'dotenv/config';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'auth-setup', testDir: './fixtures', testMatch: 'auth.setup.ts' },
    {
      name: 'admin',
      testDir: './tests',
      testMatch: 'goal-registration.spec.ts',
      dependencies: ['auth-setup'],
      use: { storageState: '.auth/admin.json' },
    },
    {
      name: 'manager',
      testDir: './tests',
      testMatch: 'goal-assignment.spec.ts',
      dependencies: ['auth-setup'],
      use: { storageState: '.auth/manager.json' },
    },
    {
      name: 'employee',
      testDir: './tests',
      testMatch: 'achievement-definition.spec.ts',
      dependencies: ['auth-setup'],
      use: { storageState: '.auth/employee.json' },
    },
  ],
});
