# QA Challenge — Employee Goal Management System

QA deliverable for a goal management system with three modules: Goal Registration (Admin), Goal Assignment (Manager), and Achievement Definition (Employee).

## Deliverables

| # | Deliverable | Location | Quantity |
|---|-------------|----------|----------|
| 1 | Manual Test Scenarios — Goal Registration | [`manual-tests/TC-GR-goal-registration.md`](manual-tests/TC-GR-goal-registration.md) | 7 scenarios |
| 2 | Manual Test Scenarios — Goal Assignment | [`manual-tests/TC-GA-goal-assignment.md`](manual-tests/TC-GA-goal-assignment.md) | 7 scenarios |
| 3 | Manual Test Scenarios — Achievement Definition | [`manual-tests/TC-AD-achievement.md`](manual-tests/TC-AD-achievement.md) | 7 scenarios |
| 4 | Playwright Automated Tests | [`automated-tests/`](automated-tests/) | 8 tests across 3 specs |
| 5 | Test Plan | [`Docs/test-plan.md`](Docs/test-plan.md) | — |

## Project Structure

```
├── manual-tests/                    21 manual test scenarios (7 per module)
│   ├── TC-GR-goal-registration.md
│   ├── TC-GA-goal-assignment.md
│   └── TC-AD-achievement.md
├── automated-tests/                 Playwright E2E test suite
│   ├── fixtures/                    Auth setup (storageState) + custom fixtures
│   ├── pages/                       Page Object Models
│   ├── test-data/                   Centralized test data
│   └── tests/                       Test specs (3 files, 8 tests)
└── Docs/
    └── test-plan.md                 Test plan with strategy, scope, and risk analysis
```

## Design Decisions

### Manual Tests

- **21 scenarios (7 per module)** instead of the minimum 15 (5 per module). Extra scenarios cover boundary values and cross-module interactions rather than padding with trivial cases.
- **TC-GA-007** validates a cross-module rule: goals created with only required fields (valid in Registration) cannot be assigned (invalid in Assignment). This tests the interaction between both modules, not each one in isolation.
- **Expected Results are assertive.** Where alternative implementations are possible (e.g., filtering vs error message), the expected result defines one behavior and a separate Note suggests the alternative. This avoids ambiguity while showing UX awareness.

### Automated Tests

- **Page Object Model** — each page encapsulates its locators (`private readonly`) and exposes only what tests need for assertions. Locator changes are isolated to one file.
- **Custom Playwright fixtures** inject Page Objects into tests, eliminating repeated `new PageObject(page)` in every `beforeEach`.
- **Authentication via `storageState`** — login runs once per role (not before every test) through a setup project. Session is saved to `.auth/*.json` and loaded by each test project. This mirrors production-grade test infrastructure.
- **No hardcoded credentials** — all sensitive data (emails, passwords) is loaded exclusively from environment variables via a `requireEnv()` helper. Missing variables cause an immediate, descriptive error instead of silent fallback. Credentials are documented in `.env.example`.
- **Centralized test data** in a single file (`test-data/goals.ts`) shared across all specs. No hardcoded values in tests.
- **Mixed selector strategies** — `getByTestId`, `getByRole`, `getByPlaceholder`, and CSS selectors chosen per element context, not a single approach for everything.

### Code Quality & Evidence

- **ESLint** — static analysis with `typescript-eslint` for catching code quality issues. Run with `npm run lint`.
- **Prettier** — automatic code formatting enforced across all files. Integrated with ESLint via `eslint-config-prettier` to avoid rule conflicts. Run with `npm run format` (write) or `npm run format:check` (CI validation).
- **Screenshots** — captured for every test (pass and fail), attached to the HTML report.
- **Video recording** — full video of every test execution, available in the HTML report for review and evidence.
- **Traces** — Playwright traces (DOM snapshots, network, actions timeline) retained on failure for debugging.
- **HTML Report** — interactive report with all results, screenshots, and videos. View with `npm run report`.

### What Is NOT Covered (and Why)

The challenge requirements describe registration, assignment, and achievement. The following are not explicitly specified and were intentionally excluded:

- **Goal editing/deletion** — no CRUD requirements beyond creation
- **Goal unassignment/removal** — requirements mention "assign" but not "remove"
- **Role-based access control testing** — authentication is assumed functional per challenge instructions

These are documented as identified gaps that would be validated with the business team in a real project.

## Running the Automated Tests

```bash
cd automated-tests
npm install
npx playwright install chromium
npm test
```

See [`automated-tests/README.md`](automated-tests/README.md) for detailed setup, environment variables, and available commands.
