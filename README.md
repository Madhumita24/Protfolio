# Madhumita's portfolio

Current public app: https://protfolio1.madhumitakolukuluri24.workers.dev/

## Notes and private pages

Visitors can view the portfolio and submit notes without signing in. Notes are saved to Cloudflare D1 and emailed through Resend to the owner's configured account, `madhumitakolukuluri24@gmail.com`. The sender and API key are Worker secrets (`RESEND_FROM`, `RESEND_API_KEY`), never source code.

- `/inbox`: private notes and unanswered questions.
- `/manage`: private draft editor and publishing dashboard.
- `/owner-login`: sends a six-digit code to the fixed owner email. Codes expire after five minutes, allow five attempts, and are single use. Sessions expire after 24 hours and use a Secure, HttpOnly cookie. Sign out revokes the session.

The independent Cloudflare Worker does not trust ChatGPT identity headers supplied by visitors. Private APIs validate the server-side owner session. Note submissions have input validation, a honeypot, origin checks, and an hourly submission limit.

## Development and deployment

Install dependencies with `npm ci`; run `npm run dev`. Cloudflare configuration is in `wrangler.jsonc`; Vite generates the deployable Worker and assets in `dist/`.

1. `npm run build`
2. `npx wrangler d1 migrations apply DB --remote --config wrangler.jsonc`
3. `npx wrangler deploy --config dist/server/wrangler.json`

Set Worker secrets through the Cloudflare dashboard or `wrangler secret put`; never commit credentials. Resend's test sender can only send to the verified account address. The existing design is preserved.
