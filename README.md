# mxpdemo

E2E-тест формы заявки на демо [mxp.net/get-a-demo](https://mxp.net/get-a-demo) на Playwright + TypeScript: контакты → код из письма (MailSlurp) → данные компании → письмо-подтверждение.

```bash
npm ci && npx playwright install chromium
cp .env.example .env   # указать MAILSLURP_API_KEY
npm test               # отчёт: npm run report
```
