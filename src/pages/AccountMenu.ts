import { Page } from "@playwright/test";

export class AccountMenu {
    constructor(private readonly page: Page) {}

    async goToCreateAccount() {
        await this.page
            .getByRole('link', { name: /create an account/i })
            .click();
    }

    async goToLogin() {
        await this.page
            .getByRole('link', { name: /log in/i })
            .click();
    }

    async goToTrackMyOrder() {
        await this.page
            .getByRole('link', { name: /track my order/i })
            .click();
    }
}