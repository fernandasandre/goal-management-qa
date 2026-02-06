import type { Page, Locator } from '@playwright/test';

export class AchievementPage {
  private readonly saveButton: Locator;
  readonly totalScore: Locator;
  readonly toast: Locator;
  readonly validationError: Locator;

  constructor(private readonly page: Page) {
    this.saveButton = page.getByRole('button', { name: /save/i });
    this.totalScore = page.getByTestId('total-achievement');
    this.toast = page.getByRole('alert');
    this.validationError = page.locator('[data-testid$="-error"]');
  }

  async goto() {
    await this.page.goto('/employee/achievements');
  }

  async setAchievement(goalIndex: number, value: number) {
    await this.page.getByTestId(`achievement-${goalIndex}`).fill(String(value));
  }

  async save() {
    await this.saveButton.click();
  }
}
