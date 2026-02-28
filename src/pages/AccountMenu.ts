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

    // button that opens the create account page; this is a link in the menu;
    this.accountButton = page.getByTestId('account-btn');

    this.trackOrderLink = page.getByRole('link', {name: /track my order/i,});

    // core fields that appear inside the side panel when the login form is
    // presented. Unlike the links above these selectors may not exist until
    // after the panel is displayed, so callers should make sure the menu is
    // visible (e.g. by clicking the account button) before using them.
    this.emailInput = page.getByRole('textbox', { name: /e-mail address/i });
    this.passwordInput = page.getByRole('textbox', { name: /password/i });
    this.loginButton = page.getByRole('button', { name: /log in/i });

    // the accept button is not always on screen; it is usually part of a Cookies modal;
    this.createAccountLink = page.getByRole('link', { name: /create account/i });

    // buttons for account menu (side panel) after login;
    this.account = page.getByRole('link', { name: /login account/i });
    this.orders = page.getByRole('link', { name: /account-order orders/i });
    this.wishList = page.getByRole('link', { name: /heart wishlist/i });
    this.deliveryAddress = page.getByRole('link', { name: /delivery addresses/i });
    this.personalInformation = page.getByRole('link', { name: /account-information personal/i });
    this.changePassword = page.getByRole('link', { name: /change password/i });
  }
    async acceptCookies() {
      await this.acceptCookiesButton.click();
  }
    async openAccountMenu() {
      await this.accountButton.click();
  }
    async login(email: string, password: string) {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
  }
    async createAccount() {
      await this.createAccountLink.click();
  }
    async trackOrder() {
      await this.trackOrderLink.click();
  }
    async openAccount() {
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
