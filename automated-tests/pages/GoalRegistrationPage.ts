import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export type GoalData = {
  name: string;
  year: string;
  description?: string;
  function?: string;
};

export class GoalRegistrationPage extends BasePage {
  private readonly nameInput: Locator;
  private readonly yearDropdown: Locator;
  private readonly descriptionInput: Locator;
  private readonly functionDropdown: Locator;
  readonly nameError: Locator;
  readonly yearError: Locator;

  constructor(page: Page) {
    super(page, '/admin/goals/new');
    this.nameInput = page.getByTestId('goal-name');
    this.yearDropdown = page.getByTestId('goal-year');
    this.descriptionInput = page.getByTestId('goal-description');
    this.functionDropdown = page.getByTestId('goal-function');
    this.nameError = page.getByTestId('goal-name-error');
    this.yearError = page.getByTestId('goal-year-error');
  }

  async fill(goal: GoalData) {
    await this.nameInput.fill(goal.name);
    await this.yearDropdown.selectOption(goal.year);
    if (goal.description) await this.descriptionInput.fill(goal.description);
    if (goal.function) await this.functionDropdown.selectOption(goal.function);
  }
}
