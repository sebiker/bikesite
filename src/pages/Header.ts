import { Page, Locator } from "@playwright/test";

export class Header {
    private readonly accountButton: Locator;

    constructor(private readonly page: Page) {
        this.accountButton = page.getByTestId('account-btn');
    }

    async openAccountMenu() {
        await this.accountButton.click();
    }
}