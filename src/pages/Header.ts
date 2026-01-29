import { Page, Locator } from "@playwright/test";

export class Header {
    private readonly accountButton: Locator;

    constructor(private readonly page: Page) {
        this.accountButton = page.getByRole('button', { name: /account/i });
    }

    async openAccountMenu() {
        await this.accountButton.click();
    }
}