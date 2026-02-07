# E2E Tests — Goal Management System

Playwright automated tests covering Goal Registration (Admin), Goal Assignment (Manager) and Achievement Definition (Employee).

## Prerequisites

- Node.js 20+
- Application running locally (or set `BASE_URL`)

## Setup

```bash
npm install
npx playwright install chromium
```

## Running

```bash
# Run all tests
npm test

# Run in headed mode (visible browser)
npm run test:headed

# Run a specific test file
npx playwright test tests/goal-registration.spec.ts

# View HTML report after run
npm run report
```

## Code Quality

```bash
# Run ESLint (static analysis)
npm run lint

# Format all files with Prettier
npm run format

# Check formatting without modifying files (useful in CI)
npm run format:check
```

## Test Evidence

Every test execution generates the following artifacts automatically:

| Artifact    | When                       | Location             |
| ----------- | -------------------------- | -------------------- |
| Screenshots | Every test (pass and fail) | `test-results/`      |
| Videos      | Every test (pass and fail) | `test-results/`      |
| Traces      | On failure only            | `test-results/`      |
| HTML Report | Always                     | `playwright-report/` |

All artifacts are attached to the HTML report and can be viewed with `npm run report`.

## Environment

Copy `.env.example` to `.env` and adjust values as needed.

| Variable         | Default                 | Description                  |
| ---------------- | ----------------------- | ---------------------------- |
| `BASE_URL`       | `http://localhost:3000` | Application URL              |
| `CI`             | —                       | Enables retries (2) when set |
| `ADMIN_EMAIL`    | `admin@company.com`     | Admin login email            |
| `MANAGER_EMAIL`  | `manager@company.com`   | Manager login email          |
| `EMPLOYEE_EMAIL` | `employee@company.com`  | Employee login email         |

Password variables follow the same pattern (`ADMIN_PASSWORD`, `MANAGER_PASSWORD`, `EMPLOYEE_PASSWORD`).

## Project Structure

```
automated-tests/
├── fixtures/
│   ├── auth.setup.ts   Authentication setup (runs once, saves storageState per role)
│   └── base.fixture.ts Custom fixtures (page object injection)
├── pages/              Page Object Models (BasePage + one per module)
├── test-data/          Centralized and typed test data (idempotent per run)
└── tests/              Test suites (one per module)
```
