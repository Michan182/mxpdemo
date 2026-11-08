import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

export const COMPANY_SIZES = ['1–20', '21–100', '100+'] as const;

export type CompanyData = {
    name: string;
    size: (typeof COMPANY_SIZES)[number];
    address: string;
    taxId: string;
    role: string;
    message: string;
};

export class CompanyPage extends BasePage {
    readonly heading: Locator;
    readonly progressBar: Locator;
    readonly companyNameInput: Locator;
    readonly companySizeSelect: Locator;
    readonly companySizeList: Locator;
    readonly legalAddressInput: Locator;
    readonly taxIdInput: Locator;
    readonly roleInput: Locator;
    readonly messageInput: Locator;
    readonly requestDemoButton: Locator;

    constructor(page: Page) {
        super(page);
        this.heading = page.getByRole('heading', { name: 'Tell Us About Your Company' });
        this.progressBar = page.getByRole('progressbar');
        this.companyNameInput = page.getByPlaceholder('Enter your company name');
        this.companySizeSelect = page.locator('#v-0-6');
        this.companySizeList = page.locator('#v-0-6-list');
        this.legalAddressInput = page.getByPlaceholder("Enter your company's registered address");
        this.taxIdInput = page.getByPlaceholder("Please enter your company's tax ID");
        this.roleInput = page.getByPlaceholder('Enter your role');
        this.messageInput = page.getByPlaceholder("Tell us what you'd like to discuss");
        this.requestDemoButton = page.getByRole('button', { name: 'Request a Demo' });
    }

    async fillForm(data: CompanyData) {
        await this.companyNameInput.fill(data.name);
        await this.companySizeSelect.click();
        await this.companySizeList.getByRole('option', { name: data.size, exact: true }).click();
        await this.legalAddressInput.fill(data.address);
        await this.taxIdInput.fill(data.taxId);
        await this.roleInput.fill(data.role);
        await this.messageInput.fill(data.message);
    }

    async submit() {
        await this.requestDemoButton.click();
    }

    async expectOpened() {
        await expect(this.heading).toBeVisible();
        await expect(this.progressBar).toHaveAttribute('aria-valuetext', 'Step 3 of 3');
    }

    async expectFilledWith(data: CompanyData) {
        await expect(this.companyNameInput).toHaveValue(data.name);
        await expect(this.companySizeSelect).toContainText(data.size);
        await expect(this.legalAddressInput).toHaveValue(data.address);
        await expect(this.taxIdInput).toHaveValue(data.taxId);
        await expect(this.roleInput).toHaveValue(data.role);
        await expect(this.messageInput).toHaveValue(data.message);
    }
}
