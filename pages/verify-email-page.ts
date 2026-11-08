import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class VerifyEmailPage extends BasePage {
    readonly heading: Locator;
    readonly progressBar: Locator;
    readonly codeGroup: Locator;
    readonly verifyButton: Locator;

    constructor(page: Page) {
        super(page);
        this.heading = page.getByRole('heading', { name: 'Verify Your Email' });
        this.progressBar = page.getByRole('progressbar');
        this.codeGroup = page.getByRole('group', { name: 'Verification code' });
        this.verifyButton = page.getByRole('button', { name: 'Verify & Continue' });
    }

    async verify(code: string) {
        for (let i = 0; i < code.length; i++) {
            await this.codeGroup.getByRole('textbox', { name: `${i + 1} / 6` }).fill(code[i]);
        }
        await this.verifyButton.click();
    }

    async expectOpenedFor(email: string) {
        await expect(this.heading).toBeVisible();
        await expect(this.page.getByText(email)).toBeVisible();
        await expect(this.progressBar).toHaveAttribute('aria-valuetext', 'Step 2 of 3');
    }
}
