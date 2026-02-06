import { test as setup, type Page } from '@playwright/test';

const roles = {
  admin: {
    email: process.env.ADMIN_EMAIL ?? 'admin@company.com',
    password: process.env.ADMIN_PASSWORD ?? 'admin123',
    landingUrl: '/admin/**',
  },
  manager: {
    email: process.env.MANAGER_EMAIL ?? 'manager@company.com',
    password: process.env.MANAGER_PASSWORD ?? 'manager123',
    landingUrl: '/manager/**',
  },
  employee: {
    email: process.env.EMPLOYEE_EMAIL ?? 'employee@company.com',
    password: process.env.EMPLOYEE_PASSWORD ?? 'employee123',
    landingUrl: '/employee/**',
  },
} as const;

async function authenticateAs(page: Page, role: keyof typeof roles) {
  const { email, password, landingUrl } = roles[role];
  await page.goto('/login');
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(password);
  await page.getByRole('button', { name: /sign in/i }).click();
  await page.waitForURL(landingUrl);
  await page.context().storageState({ path: `.auth/${role}.json` });
}

setup('authenticate as admin', async ({ page }) => authenticateAs(page, 'admin'));
setup('authenticate as manager', async ({ page }) => authenticateAs(page, 'manager'));
setup('authenticate as employee', async ({ page }) => authenticateAs(page, 'employee'));
