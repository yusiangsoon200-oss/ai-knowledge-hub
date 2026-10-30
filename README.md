# AI Knowledge Hub — static website

A responsive, single-page public AI knowledge portal built with plain HTML, CSS and JavaScript.
No build step, server, database, login, or framework dependency is required.

## Deploy to Cloudflare Pages (free static hosting)

1. In Cloudflare, open **Workers & Pages → Create → Pages → Connect to Git**.
2. Select this repository.
3. Set **Framework preset: None**.
4. Leave **Build command** empty.
5. Set **Build output directory** to `/` (or `.` if the UI requests a relative path).
6. Deploy. Cloudflare will provide a `*.pages.dev` URL.

## Newsletter integration — not yet connected

The page includes a validated email field and user feedback, but it intentionally does not transmit or store addresses. Before collecting real subscriptions, select an approved email marketing provider and integrate its hosted signup form or supported embed. Configure double opt-in, unsubscribe, privacy notice, spam protection and retention. Never put private API keys in browser-side JavaScript.

## Before public launch

- Replace sample content with approved articles and links.
- Confirm permission to publish company branding, names, logos and employee case studies.
- Add a privacy notice and contact details.
- Review accessibility, links and mobile layout.
- Confirm IT/security approval for any company-related public content.

## Files

- `index.html` — complete responsive website.
