import type { Page, Locator } from '@playwright/test';

export class GoalRegistrationPage {
  private readonly nameInput: Locator;
  private readonly yearDropdown: Locator;
  private readonly descriptionInput: Locator;
  private readonly functionDropdown: Locator;
  private readonly saveButton: Locator;
  readonly toast: Locator;
  readonly validationError: Locator;

  constructor(private readonly page: Page) {
    this.nameInput = page.getByTestId('goal-name');
    this.yearDropdown = page.getByTestId('goal-year');
    this.descriptionInput = page.getByTestId('goal-description');
    this.functionDropdown = page.getByTestId('goal-function');
    this.saveButton = page.getByRole('button', { name: /save/i });
    this.toast = page.getByRole('alert');
    this.validationError = page.locator('[data-testid$="-error"]');
  }

  async goto() {
    await this.page.goto('/admin/goals/new');
  }

  async fill(goal: { name: string; year: string; description?: string; function?: string }) {
    await this.nameInput.fill(goal.name);
    await this.yearDropdown.selectOption(goal.year);
    if (goal.description) await this.descriptionInput.fill(goal.description);
    if (goal.function) await this.functionDropdown.selectOption(goal.function);
  }

  async save() {
    await this.saveButton.click();
  }
}
