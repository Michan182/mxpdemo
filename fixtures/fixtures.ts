import { test as base } from '@playwright/test';
import { DemoPage } from '../pages/demo-page';
import { VerifyEmailPage } from '../pages/verify-email-page';
import { CompanyPage } from '../pages/company-page';
import { SuccessPage } from '../pages/success-page';
import { createMailbox, deleteMailbox, Mailbox } from '../helpers/mail';

type Fixtures = {
    demoPage: DemoPage;
    verifyEmailPage: VerifyEmailPage;
    companyPage: CompanyPage;
    successPage: SuccessPage;
    mailbox: Mailbox;
};

export const test = base.extend<Fixtures>({
    demoPage: async ({ page }, use) => {
        const demoPage = new DemoPage(page);
        await demoPage.goTo();
        await use(demoPage);
    },

    verifyEmailPage: async ({ page }, use) => use(new VerifyEmailPage(page)),
    companyPage: async ({ page }, use) => use(new CompanyPage(page)),
    successPage: async ({ page }, use) => use(new SuccessPage(page)),

    mailbox: async ({}, use) => {
        const mailbox = await createMailbox();
        await use(mailbox);
        await deleteMailbox(mailbox);
    },
});

export { expect } from '@playwright/test';
