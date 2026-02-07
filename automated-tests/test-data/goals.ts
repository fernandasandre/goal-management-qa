import type { GoalData } from '../pages/GoalRegistrationPage';

/** Unique suffix per test run to ensure registration data idempotency. */
const runId = Date.now().toString(36);

// Registration data — creates new records, names unique per run

export const validGoal: GoalData = {
  name: `Reduce Operational Costs by 12% [${runId}]`,
  year: '2026',
  description: 'Target 12% cost reduction across departments',
  function: 'Finance',
};

export const goalRequiredFieldsOnly: GoalData = {
  name: `Implement Zero-Based Budgeting [${runId}]`,
  year: '2026',
};

// Assignment data — references pre-existing catalog entries

export const marketingGoal: GoalData = {
  name: 'Launch Summer Brand Campaign',
  year: '2026',
  description: 'National campaign targeting 18-35 demographic',
  function: 'Marketing',
};

export const financeGoalNames = [
  'Reduce Operational Costs by 12%',
  'Implement Zero-Based Budgeting',
  'Increase Gross Margin to 65%',
  'Automate Financial Reporting',
  'Optimize Working Capital',
] as const;

export const extraFinanceGoal = 'Reduce Days Sales Outstanding';

export const employees = {
  finance: { name: 'Carlos Silva', function: 'Finance' },
} as const;
