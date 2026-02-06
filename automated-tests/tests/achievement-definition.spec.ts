import { test, expect } from '../fixtures/base.fixture';

test.describe('Achievement Definition', () => {
  test('employee sets achievements and total is calculated correctly', async ({ achievement }) => {
    await achievement.goto();

    await achievement.setAchievement(0, 80);
    await achievement.setAchievement(1, 60);
    await achievement.setAchievement(2, 100);
    await achievement.save();

    await expect(achievement.toast).toBeVisible();
    await expect(achievement.totalScore).toContainText('80%');
  });

  test('rejects achievement value above 100%', async ({ achievement }) => {
    await achievement.goto();
    await achievement.setAchievement(0, 150);
    await achievement.save();

    await expect(achievement.validationError).toBeVisible();
  });
});
