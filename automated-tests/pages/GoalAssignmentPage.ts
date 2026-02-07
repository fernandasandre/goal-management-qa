import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class GoalAssignmentPage extends BasePage {
  private readonly employeeDropdown: Locator;
  private readonly goalSearch: Locator;
  readonly assignedGoals: Locator;
  readonly errorBanner: Locator;

  constructor(page: Page) {
    super(page, '/manager/assignments');
    this.employeeDropdown = page.getByTestId('employee-select');
    this.goalSearch = page.getByPlaceholder(/search goal/i);
    this.assignedGoals = page.getByTestId('assigned-goals').locator('li');
    this.errorBanner = page.getByTestId('assignment-error');
  }

  async selectEmployee(name: string) {
    await this.employeeDropdown.selectOption({ label: name });
  }

  async assignGoal(goalName: string) {
    await this.goalSearch.fill(goalName);
    await this.page.getByRole('option', { name: goalName }).click();
  }
}
