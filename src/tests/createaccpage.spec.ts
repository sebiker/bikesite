import { test, expect } from '@playwright/test';
import { AccountMenu } from '../pages/AccountMenu';

test('should navigate to create account page from account button', async ({ page }) => {
  const menu = new AccountMenu(page);

  // 1. Land on the website and accept cookies before interacting.
  await page.goto('https://bike24.com', { waitUntil: 'load' });
  await menu.acceptCookies();

  // 2. Open the account menu and navigate to create account.
  await menu.goToCreateAccount();

  // 3. Check it landed on the correct URL
  await expect(page).toHaveURL('https://bike24.com/create-account');
});
