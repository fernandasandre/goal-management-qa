import type { Page, Locator } from '@playwright/test';

export class GoalAssignmentPage {
  private readonly employeeDropdown: Locator;
  private readonly goalSearch: Locator;
  private readonly saveButton: Locator;
  readonly assignedGoals: Locator;
  readonly toast: Locator;
  readonly errorBanner: Locator;

  constructor(private readonly page: Page) {
    this.employeeDropdown = page.getByTestId('employee-select');
    this.goalSearch = page.getByPlaceholder(/search goal/i);
    this.saveButton = page.getByRole('button', { name: /save/i });
    this.assignedGoals = page.getByTestId('assigned-goals').locator('li');
    this.toast = page.getByRole('alert');
    this.errorBanner = page.getByTestId('assignment-error');
  }

  async goto() {
    await this.page.goto('/manager/assignments');
  }

  async selectEmployee(name: string) {
    await this.employeeDropdown.selectOption({ label: name });
  }

  async assignGoal(goalName: string) {
    await this.goalSearch.fill(goalName);
    await this.page.getByRole('option', { name: goalName }).click();
  }

  async save() {
    await this.saveButton.click();
  }
}
