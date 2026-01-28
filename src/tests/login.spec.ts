import { test, expect } from '@playwright/test';

test('should navigate to create account page from account button', async ({ page }) => {
  // 1. Land on the website
  await page.goto('https://bike24.com');
  
  // 2. Access the account button
  await page.click('button[aria-label="Account"]'); // or whatever selector matches your button
  
  // 3. Select the create an account button
  await page.click('a:has-text("Create an Account")'); // or the appropriate selector
  
  // 4. Check it landed on the correct URL
  await expect(page).toHaveURL('https://bike24.com/create-account');
});
