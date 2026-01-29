import {Page, Locator} from '@playwright/test';

export class CreateAccountPage {
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly emailImput: Locator;
    private readonly passwordInput: Locator;
    private readonly submitButton: Locator;

    constructor(private readonly page: Page) {
        this.firstName = page.getByRole('textbox', { name: /first name/i });
        this.lastName = page.getByRole('textbox', { name: /last name/i });
        this.emailImput = page.getByRole('textbox', { name: /e-mail address/i });
        this.passwordInput = page.getByRole('textbox', { name: /password/i });
        this.submitButton = page.getByRole('button', { name: /create account/i });
    }

    async fillForm(
        firstName: string,
        lastName: string, 
        email: string, 
        password: string) 
        {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.emailImput.fill(email);
        await this.passwordInput.fill(password);
    }

    async submit() {
        await this.submitButton.click();
    }
}