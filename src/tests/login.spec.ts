import { test, expect } from '@playwright/test';
import { AccountMenu } from '../pages/AccountMenu';

test('should log in through the account side menu', async ({ page }) => {
  const accountMenu = new AccountMenu(page);

  // Land on the website and accept cookies before any account interactions.
  await page.goto('https://bike24.com');
  await accountMenu.acceptCookies();

  // Access the account button and wait for the sidebar to expand
  await accountMenu.openAccountMenu();

  // fill the login form and submit; the helper takes care of waiting for
  // the panel itself to be ready and submitting the form.
  await accountMenu.login('sebastian_bia@yahoo.com', 'Playwright12!');

  // Check it landed on the correct URL
  await expect(page).toHaveURL('https://www.bike24.com/my-account');
});
