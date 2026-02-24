import { Page, Locator } from '@playwright/test';

export class AccountMenu {
  private readonly createAccountLink: Locator;
  private readonly loginLink: Locator;
  // fields that appear in the login side panel
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  // optional modal acceptance button that can appear when using account menu
  private readonly trackOrderLink: Locator;
  private readonly acceptButton: Locator;
  // Known names for frames that host the T&C / cookie accept button

  constructor(private readonly page: Page) {
    this.createAccountLink = page.getByRole('link', {
      name: /create an account/i,
    });

    // link or button that opens the login side panel; the UI changed over
    // time so we treat it as a generic role query.
    this.loginLink = page.getByRole('link', { name: /log in/i });

    this.trackOrderLink = page.getByRole('link', {
      name: /track my order/i,
    });

    // core fields that appear inside the side panel when the login form is
    // presented. Unlike the links above these selectors may not exist until
    // after the panel is displayed, so callers should make sure the menu is
    // visible (e.g. by clicking the account button) before using them.
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: /log in/i });

    // the accept button is not always on screen; it is usually part of a Cookies modal
    // we still query for it so tests can interact when it appears
    this.acceptButton = page.getByRole('button', { name: /accept/i });

  }

  async goToCreateAccount() {
    await this.createAccountLink.click();
    // sometimes a consent iframe appears immediately after clicking; dismiss it
    await this.acceptFrameIfVisible();
  }

  /**
   * Look through every frame attached to the page and click an "Accept"
   * button if we find one. We no longer depend on hard‑coded frame names
   * because the vendor sometimes changes them; this method is intentionally
   * forgiving so the presence or absence of a consent iframe doesn't break
   * the test.
   */
  async acceptFrameIfVisible() {
    // Give the iframe a chance to be attached and rendered since some
    // consent widgets load a fraction of a second after the parent page
    // interaction happens.
    const maxWait = 5_000;
    const pollInterval = 250;
    const end = Date.now() + maxWait;

    while (Date.now() < end) {
      for (const frame of this.page.frames()) {
        try {
          const button = frame.locator('button', { hasText: /^Accept$/i });
          if (await button.count()) {
            await button.first().waitFor({ state: 'visible', timeout: 2000 });
            await button.first().click();
            return;
          }
        } catch {
          // ignore and continue scanning other frames
        }
      }
      // not found yet; give things a moment before rechecking
      await this.page.waitForTimeout(pollInterval);
    }
  }

  /**
   * If a modal with an "Accept" button is visible (e.g. T&C or cookie banner),
   * click it.
   */
  async acceptIfVisible() {
    if (await this.acceptButton.isVisible()) {
      await this.acceptButton.click();
    }
  }

  /**
   * Open the login panel (by clicking the "log in" link) then fill and
   * submit the form. The side panel contains the email/password fields.
   *
   * @param email - user email address
   * @param password - user password
   */
  async login(email: string, password: string) {
    // wait for the panel element that contains the login form; this mirrors
    // the wait used in the create-account test and gives the site time to
    // animate the sidebar open.
    await this.page.waitForSelector('#header > div > section > div:nth-child(2) > aside > section');

    // fill the credentials once the inputs are visible
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    // the panel's submit button is labelled "Log in", which we already
    // captured as `loginButton` above.
    await this.loginButton.click();

    // handle any cookie/terms banner that might pop up right after
    await this.acceptFrameIfVisible();
  }

  async goToTrackOrder() {
    await this.trackOrderLink.click();
  }
}
