import { test, expect } from '@playwright/test';
import { AccountMenu } from '../pages/AccountMenu';

test('should log in through the account side menu', async ({ page }) => {
  //Land on the website
  await page.goto('https://bike24.com');
  
  //Access the account button and wait for the sidebar to expand
  await page.click('button[aria-label="Account"]');

  //Initialize the menu object and dismiss any banner that appears.  We
  //check both the normal modal and the iframe variant because the consent
  //widget could load inside either.
  const menu = new AccountMenu(page);
  await menu.acceptIfVisible();
  await menu.acceptFrameIfVisible();

  // fill the login form and submit; the helper takes care of waiting for
  // the panel itself to be ready.
  await menu.login('sebastian_bia@yahoo.com', 'Playwright12!');

  //Check it landed on the correct URL
  await expect(page).toHaveURL('https://bike24.com/my-account');
});
