import type { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  readonly toast: Locator;
  private readonly saveButton: Locator;

  constructor(
    protected readonly page: Page,
    private readonly route: string,
  ) {
    this.toast = page.getByRole('alert');
    this.saveButton = page.getByRole('button', { name: /save/i });
  }

  async goto() {
    await this.page.goto(this.route);
  }

  async save() {
    await this.saveButton.click();
  }
}
