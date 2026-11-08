import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class SuccessPage extends BasePage {
    readonly thankYouHeading: Locator;
    readonly receivedText: Locator;
    readonly nextStepsTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.thankYouHeading = page.getByRole('heading', { name: /Thank you!/ });
        this.receivedText = page.getByText("We've received your request.");
        this.nextStepsTitle = page.getByText('What happens next?');
    }

    async expectOpened() {
        await expect(this.thankYouHeading).toBeVisible();
        await expect(this.receivedText).toBeVisible();
        await expect(this.nextStepsTitle).toBeVisible();
    }
}
