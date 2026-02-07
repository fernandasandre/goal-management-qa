import { test, expect } from '../fixtures/base.fixture';
import { financeGoalNames, extraFinanceGoal, employees, marketingGoal } from '../test-data/goals';

test.describe('Goal Assignment', () => {
  test('manager assigns 3 goals to a matching employee', async ({ goalAssignment }) => {
    await goalAssignment.goto();
    await goalAssignment.selectEmployee(employees.finance.name);

    for (const goalName of financeGoalNames.slice(0, 3)) {
      await goalAssignment.assignGoal(goalName);
    }

    await goalAssignment.save();

    await expect(goalAssignment.assignedGoals).toHaveCount(3);
    await expect(goalAssignment.toast).toHaveText(/goals assigned/i);
  });

  test('blocks the 6th goal assignment when employee already has 5', async ({ goalAssignment }) => {
    await goalAssignment.goto();
    await goalAssignment.selectEmployee(employees.finance.name);

    for (const goalName of financeGoalNames) {
      await goalAssignment.assignGoal(goalName);
    }
    await expect(goalAssignment.assignedGoals).toHaveCount(5);

    await goalAssignment.assignGoal(extraFinanceGoal);

    await expect(goalAssignment.errorBanner).toHaveText(/maximum.*5 goals/i);
    await expect(goalAssignment.assignedGoals).toHaveCount(5);
  });

  test('blocks assignment when employee function mismatches goal', async ({ goalAssignment }) => {
    await goalAssignment.goto();
    await goalAssignment.selectEmployee(employees.finance.name);
    await goalAssignment.assignGoal(marketingGoal.name);

    await expect(goalAssignment.errorBanner).toHaveText(/function.*mismatch/i);
  });
});
