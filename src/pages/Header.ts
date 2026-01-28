import { Page } from "@playwright/test";

export class Header {
    constructor(private readonly page: Page) {}

    async openAccountMenu() {
        await this.page
            .getByRole('button', { name: 'account/i' })
            .click();
    }
}
