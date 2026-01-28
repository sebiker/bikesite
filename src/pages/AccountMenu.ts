import { Page, Locator } from '@playwright/test';

export class AccountMenu {
  private readonly createAccountLink: Locator;
  private readonly loginLink: Locator;
  private readonly trackOrderLink: Locator;

  constructor(private readonly page: Page) {
    this.createAccountLink = page.getByRole('link', {
      name: /create an account/i,
    });

    this.loginLink = page.getByRole('link', { name: /log in/i });

    this.trackOrderLink = page.getByRole('link', {
      name: /track my order/i,
    });
  }

  async goToCreateAccount() {
    await this.createAccountLink.click();
  }

  async goToLogin() {
    await this.loginLink.click();
  }

  async goToTrackOrder() {
    await this.trackOrderLink.click();
  }
}
