import { test as base } from '@playwright/test';
import { GoalRegistrationPage } from '../pages/GoalRegistrationPage';
import { GoalAssignmentPage } from '../pages/GoalAssignmentPage';
import { AchievementPage } from '../pages/AchievementPage';

type Pages = {
  goalRegistration: GoalRegistrationPage;
  goalAssignment: GoalAssignmentPage;
  achievement: AchievementPage;
};

export const test = base.extend<Pages>({
  goalRegistration: async ({ page }, use) => {
    await use(new GoalRegistrationPage(page));
  },
  goalAssignment: async ({ page }, use) => {
    await use(new GoalAssignmentPage(page));
  },
  achievement: async ({ page }, use) => {
    await use(new AchievementPage(page));
  },
});

export { expect } from '@playwright/test';
