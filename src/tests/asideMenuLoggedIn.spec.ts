import { test, expect } from '@playwright/test';
import { AccountMenu } from '../pages/AccountMenu';

test('manage account menu through aside panel', async ({ page }) => {
  const accountMenu = new AccountMenu(page);

      //Land on the website
  await page.goto('https://bike24.com');

  //Accept the Cookie consent banner if it appears 
  await accountMenu.acceptCookies();

    //Access the account button and wait for the sidebar to expand
  await accountMenu.openAccountMenu();

  // fill the login form and submit; the helper takes care of waiting for
  // the panel itself to be ready.
  await accountMenu.login('sebastian_bia@yahoo.com', 'Playwright12!');

  //Check it landed on the correct URL
  await expect(page).toHaveURL('https://www.bike24.com/my-account');

    //Access the account button and wait for the sidebar to expand
  await accountMenu.openAccountMenu();

    // access the Account details link in the side panel and check it goes to the right URL
  await accountMenu.openAccount();
    await expect(page).toHaveURL('https://www.bike24.com/my-account');

    await accountMenu.openAccountMenu();

    // access the Orders link in the side panel and check it goes to the right URL
  await accountMenu.openOrders();
    await expect(page).toHaveURL('https://www.bike24.com/my-account/orderlist');

    await accountMenu.openAccountMenu();
    
    // access the Wish List link in the side panel and check it goes to the right URL
  await accountMenu.openWishList();
    await expect(page).toHaveURL('https://www.bike24.com/my-account/wishlist');

    await accountMenu.openAccountMenu();
    
    // access the Delivery Address link in the side panel and check it goes to the right URL
  await accountMenu.openDeliveryAddress();
    await expect(page).toHaveURL('https://www.bike24.com/my-account/delivery-addresses');

    await accountMenu.openAccountMenu();
    
    // access the Personal Information link in the side panel and check it goes to the right URL
  await accountMenu.openPersonalInformation();
    await expect(page).toHaveURL('https://www.bike24.com/my-account/edit-personal-information');

    await accountMenu.openAccountMenu();
    
    // access the Change Password link in the side panel and check it goes to the right URL
  await accountMenu.openChangePassword();
    await expect(page).toHaveURL('https://www.bike24.com/my-account/change-password');
});