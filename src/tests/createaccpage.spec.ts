import { test, expect } from '@playwright/test';
import { AccountMenu } from '../pages/AccountMenu';

test('should navigate to create account page from account button', async ({ page }) => {
  // 1. Land on the website
  await page.goto('https://bike24.com');
  
  // 2. Access the account button
  await page.click('button[aria-label="Account"]');
  
  // 3. Wait for the section to appear and use the menu helper to navigate
  await page.waitForSelector('#header > div > section > div:nth-child(2) > aside > section');
  const menu = new AccountMenu(page);
  await menu.goToCreateAccount();

  // 5. Check it landed on the correct URL
  await expect(page).toHaveURL('https://bike24.com/create-account');
});
