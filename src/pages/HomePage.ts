import { Page } from '@playwright/test';

export class HomePage {
    constructor(private readonly page: Page) {}

    async open() {
        await this.page.goto('https://bike24.com');
    }
}