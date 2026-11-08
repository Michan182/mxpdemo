import { test, expect } from '../fixtures/fixtures';
import { getVerificationCode, getEmail } from '../helpers/mail';
import { buildContact, buildCompany } from '../test-data/factories';

test('Заявка на демо: контакты, подтверждение email, данные компании', async ({
    demoPage,
    verifyEmailPage,
    companyPage,
    successPage,
    mailbox,
}) => {
    test.slow();

    const contact = buildContact();
    const company = buildCompany();
    await test.info().attach('test-data', {
        body: JSON.stringify({ contact, company }, null, 2),
        contentType: 'application/json',
    });

    await test.step('Шаг 1: заполнить контактные данные', async () => {
        await demoPage.fillForm({ ...contact, email: mailbox.emailAddress });
        await demoPage.submit();
        await verifyEmailPage.expectOpenedFor(mailbox.emailAddress);
    });

    await test.step('Шаг 2: ввести код из письма', async () => {
        const code = await getVerificationCode(mailbox);
        await verifyEmailPage.verify(code);
        await companyPage.expectOpened();
    });

    await test.step('Шаг 3: заполнить данные компании', async () => {
        await companyPage.fillForm(company);
        await companyPage.expectFilledWith(company);
        await companyPage.submit();
        await successPage.expectOpened();
    });

    await test.step('Шаг 4: проверить письмо-подтверждение заявки', async () => {
        const confirmation = await getEmail(mailbox, 1);
        expect(confirmation.subject).toBe('We received your request');
        expect(confirmation.from).toContain('noreply@mxp.net');
        expect(confirmation.text).toContain(`Hi ${contact.name}`);
        expect(confirmation.text).toContain('Thank you for reaching out to MXP');
    });
});
