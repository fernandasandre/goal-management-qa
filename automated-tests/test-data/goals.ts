export const validGoal = {
  name: 'Reduce Operational Costs by 12%',
  year: '2026',
  description: 'Target 12% cost reduction across departments',
  function: 'Finance',
};

export const goalRequiredFieldsOnly = {
  name: 'Implement Zero-Based Budgeting',
  year: '2026',
};

export const marketingGoal = {
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
