import { Page, Locator } from '@playwright/test';

export class AccountMenu {
  private readonly acceptCookiesButton: Locator;
  private readonly accountButton: Locator;
  // fields that appear in the login side panel
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly createAccountLink: Locator;
  // optional modal acceptance button that can appear when using account menu
  private readonly trackOrderLink: Locator;
  // account menu (side panel) after login;
  private readonly account: Locator;
  private readonly orders: Locator;
  private readonly wishList: Locator;
  private readonly deliveryAddress: Locator;
  private readonly personalInformation: Locator;
  private readonly changePassword: Locator;

  constructor(private readonly page: Page) {
    // the accept button is not always on screen; it is usually part of a Cookies modal;
    this.acceptCookiesButton = page.getByTestId('cookie-consent-accept-all-button');

    // prefer the stable account button testid for the header button
    this.accountButton = page.locator('button[data-testid="account-btn"]');

    this.trackOrderLink = page.getByRole('link', { name: /track your order/i });

    // core fields that appear inside the side panel when the login form is
    // presented. Use label-based selectors to handle the live site form.
    this.emailInput = page.getByLabel(/e-mail address|email address/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.loginButton = page.getByRole('button', { name: /log in|login|sign in/i });

    // the create account control is a button in the account overlay.
    this.createAccountLink = page.locator('button:has-text("Create an account")');

    // links for account menu and account page after login;
    this.account = page.locator('a[href="/my-account"]');
    this.orders = page.locator('a[href="/my-account/orderlist"]');
    this.wishList = page.locator('a[href="/my-account/wishlist"]');
    this.deliveryAddress = page.locator('a[href="/my-account/delivery-addresses"]');
    this.personalInformation = page.locator('a[href="/my-account/edit-personal-information"]');
    this.changePassword = page.locator('a[href="/my-account/change-password"]');
  }
  async acceptCookies() {
    try {
      await this.acceptCookiesButton.first().waitFor({ state: 'visible', timeout: 10000 });
      await this.acceptCookiesButton.first().click();
      await this.acceptCookiesButton.first().waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
      return;
    } catch {
      // ignore initial visibility failures and fallback below
    }

    const cookieButtons = [
      this.page.getByRole('button', { name: /accept all|accept cookies|agree|allow all|ok/i }),
      this.page.getByRole('button', { name: /accept/i }),
    ];

    for (const button of cookieButtons) {
      try {
        if (await button.count() > 0 && (await button.isVisible())) {
          await button.first().click();
          return;
        }
      } catch {
        // ignore missing or invisible fallback buttons
      }
    }

    try {
      const generic = this.page.locator('button', { hasText: /accept|agree|allow|ok/i });
      if (await generic.count() > 0 && await generic.first().isVisible()) {
        await generic.first().click();
      }
    } catch {
      // ignore if no consent button is shown
    }
  }
  async openAccountMenu() {
    await this.accountButton.first().waitFor({ state: 'visible', timeout: 20000 });
    await this.accountButton.first().click();
    // Wait directly for the expected login panel controls.
    await Promise.race([
      this.emailInput.waitFor({ state: 'visible', timeout: 30000 }),
      this.createAccountLink.waitFor({ state: 'visible', timeout: 30000 }),
      this.loginButton.waitFor({ state: 'visible', timeout: 30000 })
    ]);
  }
  async login(email: string, password: string) {
    await this.openAccountMenu();
    await this.emailInput.waitFor({ state: 'visible', timeout: 30000 });
    await this.passwordInput.waitFor({ state: 'visible', timeout: 30000 });
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    const loginBtn = this.page.getByRole('button', { name: /log in|login|sign in/i }).first();
    await loginBtn.waitFor({ state: 'visible', timeout: 30000 });
    await Promise.all([
      this.page.waitForURL('**/my-account*', { timeout: 30000 }),
      loginBtn.click(),
    ]);
  }
  async createAccount() {
    await this.openAccountMenu();
    await this.createAccountLink.first().waitFor({ state: 'visible', timeout: 30000 });
    await this.createAccountLink.first().click();
  }
  async goToCreateAccount() {
    await this.createAccount();
  }
    async trackOrder() {
      await this.trackOrderLink.click();
  }
    async openAccount() {
    if (this.page.url().includes('/my-account')) {
      return;
    }
    await this.account.click();
  }
  async openOrders() {
    await this.orders.click();
  }
    async openWishList() {
      await this.wishList.click();
  }
    async openDeliveryAddress() {
      await this.deliveryAddress.click();
  }
    async openPersonalInformation() {
      await this.personalInformation.click();
  }
    async openChangePassword() {
      await this.changePassword.click();
  }
}
