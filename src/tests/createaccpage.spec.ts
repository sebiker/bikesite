import { test, expect } from '@playwright/test';
import { AccountMenu } from '../pages/AccountMenu';
import { CreateAccountPage } from '../pages/CreateAccountPage';
import { getUrlRegex } from '../../playwright.config';



test('should navigate to create account page from account button', async ({ page }) => {
  const accountMenu = new AccountMenu(page);
  const createAccountPage = new CreateAccountPage(page);

  // 1. Land on the website and accept cookies before any account interactions.
  await page.goto('https://bike24.com');
  await accountMenu.acceptCookies();

    // 2. Access the account button and wait for the sidebar to expand
  await accountMenu.openAccountMenu();

  // 3. Open the account menu and navigate to create account.
  await accountMenu.goToCreateAccount();

  // 4. Check it landed on the correct URL
  await expect(page).toHaveURL(getUrlRegex('/create-account'));
});
