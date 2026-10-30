# Custom CMS — Phase 1 setup

This branch introduces the initial custom CMS foundation. The live `main` branch is unchanged.

## Included

- Cloudflare Worker entry point for API requests.
- Better Auth email/password sign-in and sessions.
- Cloudflare D1 authentication schema and SQL migration.
- Admin login page and session-checked dashboard shell.
- One-time first-administrator registration gate.
- Existing public site remains a static asset.

## Important: not ready for production deployment

This is a development scaffold, not a completed, security-audited CMS. Do not merge into `main` or deploy to the live Worker yet. The Better Auth / Drizzle adapter versions and Worker runtime must be installed, built and tested; Cloudflare D1 must be provisioned and bound; secrets must be configured; and the authentication flow must be verified in a staging Worker first.

## Cloudflare setup

1. Create a D1 database named `ai-knowledge-hub-cms`.
2. Copy its generated database ID into `wrangler.jsonc` under the `DB` binding.
3. Apply the migration:

```bash
npm install
npx wrangler d1 migrations apply ai-knowledge-hub-cms --remote
```

4. Set secrets (never commit them):

```bash
npx wrangler secret put BETTER_AUTH_SECRET
npx wrangler secret put CMS_BOOTSTRAP_TOKEN
```

Use separate random values. Keep the auth secret private and stable.

## First administrator

The initial signup endpoint requires the temporary `x-cms-bootstrap-token` header and an empty `user` table. The first account is not yet assigned an explicit Owner role; role-based access control is a later milestone.

After creating the first administrator, remove the `CMS_BOOTSTRAP_TOKEN` secret. Public sign-up should remain disabled.

## Current limitations

- No content CRUD yet.
- No image uploads yet.
- No invitations, user roles or audit log yet.
- No password reset or email verification delivery yet.
- The dashboard cards are placeholders.
- The initial bootstrap gate must be tested for race conditions before production.
