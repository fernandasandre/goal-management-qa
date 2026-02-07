import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AchievementPage extends BasePage {
  readonly totalScore: Locator;

  constructor(page: Page) {
    super(page, '/employee/achievements');
    this.totalScore = page.getByTestId('total-achievement');
  }

  achievementError(goalIndex: number): Locator {
    return this.page.getByTestId(`achievement-${goalIndex}-error`);
  }

  async setAchievement(goalIndex: number, value: number) {
    await this.page.getByTestId(`achievement-${goalIndex}`).fill(String(value));
  }
}
