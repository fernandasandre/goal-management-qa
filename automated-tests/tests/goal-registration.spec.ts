import { test, expect } from '../fixtures/base.fixture';
import { validGoal, goalRequiredFieldsOnly } from '../test-data/goals';

test.describe('Goal Registration', () => {
  test('admin creates a new goal with all fields', async ({ goalRegistration }) => {
    await goalRegistration.goto();
    await goalRegistration.fill(validGoal);
    await goalRegistration.save();

    await expect(goalRegistration.toast).toHaveText(/goal created/i);
  });

  test('admin creates a goal with only required fields', async ({ goalRegistration }) => {
    await goalRegistration.goto();
    await goalRegistration.fill(goalRequiredFieldsOnly);
    await goalRegistration.save();

    await expect(goalRegistration.toast).toHaveText(/goal created/i);
  });

  test('blocks submission when required field Name is empty', async ({ goalRegistration }) => {
    await goalRegistration.goto();
    await goalRegistration.fill({ name: '', year: '2026' });
    await goalRegistration.save();

    await expect(goalRegistration.validationError).toBeVisible();
    await expect(goalRegistration.toast).not.toBeVisible();
  });
});
