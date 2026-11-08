import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class DemoPage extends BasePage {
    readonly heading: Locator;
    readonly fullNameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly agreeCheckbox: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.heading = page.getByRole('heading', { name: 'Share Your Contact Details' });
        this.fullNameInput = page.locator('#v-0-0');
        this.emailInput = page.locator('#v-0-1');
        this.phoneInput = page.locator('#v-0-2');
        this.agreeCheckbox = page.locator('#v-0-3');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }

    async fillForm(data: { name: string; email: string; phone: string }) {
        await this.fullNameInput.fill(data.name);
        await this.emailInput.fill(data.email);
        await this.phoneInput.fill(data.phone);
        await this.agreeCheckbox.check();
    }

    async submit() {
        await this.continueButton.click();
    }
}
