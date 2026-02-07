# Test Plan — Employee Goal Management System

## 1. Objective

Validate the three core modules of the employee goal management system: goal registration (Admin), goal assignment (Manager), and achievement definition (Employee). Ensure business rules are enforced, data integrity is maintained, and the user experience is consistent across all roles.

## 2. Scope

### In Scope

- Goal Registration: CRUD operations, field validation, dropdown behavior
- Goal Assignment: catalog validation, function/year matching, min/max goal limits
- Achievement Definition: per-goal input validation, total calculation logic, boundary enforcement
- Cross-module data consistency (goals created in registration are available for assignment)

### Out of Scope

- Authentication and authorization **testing** (e.g., invalid credentials, password reset, session expiration). Authentication **setup** (login per role and storageState persistence) is part of the automated test infrastructure — see Section 3.
- Performance and load testing
- Mobile responsiveness
- Accessibility compliance (WCAG)
- API-level testing (focus is on E2E)

## 3. Test Strategy

| Type | Approach | Coverage |
|------|----------|----------|
| Auth Setup | Playwright setup project (`auth.setup.ts`) | Login per role (Admin, Manager, Employee); storageState saved to `.auth/` and reused by all test projects |
| Functional | Manual test scenarios | All 3 modules, 7 scenarios each |
| E2E Automated | Playwright with TypeScript | 2-3 tests per module (happy path + negative) |
| Boundary | Included in manual scenarios | Min/max goals, 0%-100% range |
| Negative | Included in manual + automated | Missing fields, mismatched data, exceeded limits |

## 4. Test Environment

- **Browser:** Chromium (via Playwright)
- **Base URL:** Configurable via `BASE_URL` env variable (default: `http://localhost:3000`)
- **Test Data:** Centralized in `automated-tests/test-data/goals.ts`, consistent across manual and automated tests
- **Authentication:** Each role (Admin, Manager, Employee) authenticates once via `auth.setup.ts`. Session is persisted to `.auth/<role>.json` using Playwright's `storageState` and loaded automatically by each test project. Credentials are configurable via environment variables (see `.env.example`):

| Variable | Default | Description |
|----------|---------|-------------|
| `ADMIN_EMAIL` | `admin@company.com` | Admin login email |
| `ADMIN_PASSWORD` | `admin123` | Admin login password |
| `MANAGER_EMAIL` | `manager@company.com` | Manager login email |
| `MANAGER_PASSWORD` | `manager123` | Manager login password |
| `EMPLOYEE_EMAIL` | `employee@company.com` | Employee login email |
| `EMPLOYEE_PASSWORD` | `employee123` | Employee login password |

## 5. Test Scenarios Summary

### Goal Registration (Admin)

| ID | Scenario | Priority | Type |
|----|----------|----------|------|
| TC-GR-001 | Create goal with all fields | Critical | Positive |
| TC-GR-002 | Create goal with required fields only | High | Positive |
| TC-GR-003 | Submit without Name | High | Negative |
| TC-GR-004 | Submit without Year | High | Negative |
| TC-GR-005 | Submit empty form | Medium | Negative |
| TC-GR-006 | Verify dropdown options | Medium | Functional |
| TC-GR-007 | Verify created goal appears in catalog | Medium | Positive |

### Goal Assignment (Manager)

| ID | Scenario | Priority | Type |
|----|----------|----------|------|
| TC-GA-001 | Assign 3 goals (minimum) | Critical | Boundary |
| TC-GA-002 | Assign 5 goals (maximum) | Critical | Boundary |
| TC-GA-003 | Exceed max (6th goal) | High | Negative |
| TC-GA-004 | Below min (< 3 goals) | High | Negative |
| TC-GA-005 | Function mismatch | High | Negative |
| TC-GA-006 | Year mismatch | High | Negative |
| TC-GA-007 | Cross-module: incomplete catalog fields | Medium | Negative |

### Achievement Definition (Employee)

| ID | Scenario | Priority | Type |
|----|----------|----------|------|
| TC-AD-001 | Valid achievements + total calc | Critical | Positive |
| TC-AD-002 | All at 100% | High | Boundary |
| TC-AD-003 | All at 0% | High | Boundary |
| TC-AD-004 | Above 100% | High | Negative |
| TC-AD-005 | Negative value | High | Negative |
| TC-AD-006 | Fractional total result | Medium | Edge Case |
| TC-AD-007 | No assigned goals | High | Negative |

## 6. Entry Criteria

- [ ] All three modules are deployed and accessible in the test environment
- [ ] Test data (employees, goal catalog) is seeded or can be created through the Admin interface
- [ ] User accounts for Admin, Manager, and Employee roles are available
- [ ] Role credentials are configured in `.env` (or environment variables) matching the accounts above
- [ ] Login page is accessible at `/login` with email/password fields and sign-in button
- [ ] No critical blocking defects from previous test cycles

## 7. Exit Criteria

- [ ] All 21 manual test scenarios executed
- [ ] All 3 auth setup tests passing (one per role: Admin, Manager, Employee)
- [ ] All 8 Playwright spec tests passing (3 registration + 3 assignment + 2 achievement)
- [ ] No Critical or Major severity bugs remaining open
- [ ] All business rules validated (function match, year match, min/max goals, achievement range)
- [ ] Test results documented with pass/fail status

## 8. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Auth setup failure (invalid credentials, login page changes) | All automated tests blocked — no project runs without successful auth | Credentials externalized via env variables; auth runs as a dedicated Playwright project with clear error output; storageState files in `.auth/` can be inspected |
| Test environment instability | Blocked test execution | Retry strategy in Playwright config; manual tests can proceed independently |
| Missing test data / seed | Cannot execute assignment or achievement tests | Document seed data requirements; create setup script |
| Cross-module rule ambiguity (optional vs required fields) | Uncertain expected results | Documented in TC-GA-007 with explicit cross-module rationale |
| UI element changes | Automated tests break | Page Object Model isolates locator changes to a single file |
