import { test as setup, type Page } from '@playwright/test';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        'Copy .env.example to .env and fill in the credentials.',
    );
  }
  return value;
}

const roles = {
  admin: {
    email: requireEnv('ADMIN_EMAIL'),
    password: requireEnv('ADMIN_PASSWORD'),
    landingUrl: '/admin/**',
  },
  manager: {
    email: requireEnv('MANAGER_EMAIL'),
    password: requireEnv('MANAGER_PASSWORD'),
    landingUrl: '/manager/**',
  },
  employee: {
    email: requireEnv('EMPLOYEE_EMAIL'),
    password: requireEnv('EMPLOYEE_PASSWORD'),
    landingUrl: '/employee/**',
  },
};

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
