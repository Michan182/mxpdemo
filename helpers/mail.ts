import { MailSlurp } from 'mailslurp-client';

const apiKey = process.env.MAILSLURP_API_KEY;
if (!apiKey) {
    throw new Error('Не задан MAILSLURP_API_KEY: скопируйте .env.example в .env и укажите ключ');
}

const mailslurp = new MailSlurp({ apiKey });
const EMAIL_TIMEOUT = 60_000;

export type Mailbox = {
    id: string;
    emailAddress: string;
};

export async function createMailbox(): Promise<Mailbox> {
    const inbox = await mailslurp.createInbox();
    return { id: inbox.id, emailAddress: inbox.emailAddress };
}

export async function deleteMailbox(mailbox: Mailbox) {
    await mailslurp.inboxController.deleteInbox({ inboxId: mailbox.id });
}

export async function getEmail(mailbox: Mailbox, index: number) {
    const email = await mailslurp.waitForNthEmail(mailbox.id, index, EMAIL_TIMEOUT);
    const text = (email.body ?? '')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<[^>]+>|&nbsp;|&#\d+;|&\w+;/g, ' ')
        .replace(/\s+/g, ' ');

    return { subject: email.subject ?? '', from: email.from ?? '', text };
}

export async function getVerificationCode(mailbox: Mailbox): Promise<string> {
    const { text } = await getEmail(mailbox, 0);
    const match = text.match(/\b(\d{3})[\s\-–]?(\d{3})\b/);
    if (!match) {
        throw new Error(`Код не найден в письме: ${text.slice(0, 500)}`);
    }
    return match[1] + match[2];
}
