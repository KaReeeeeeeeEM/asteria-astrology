# Operations

## Vercel and Neon

Deploy as a Next.js project with `npm run build`. Add the pooled `DATABASE_URL`, random `BETTER_AUTH_SECRET`, exact canonical `BETTER_AUTH_URL`, and `EASYMAIL_API_KEY` to production environment variables. Keep credentials server-only (never prefix them with `NEXT_PUBLIC_`). Run reviewed migrations before enabling new application code that depends on a schema change.

A Neon free-tier resource is sufficient for a small personal/public launch. Use separate branches/databases for development and production once real users join. Database free-tier limits, email sender quotas, and Vercel Hobby eligibility/limits are controlled by their providers. Monitor usage; free public access does not guarantee unlimited infrastructure.

The canonical domain matters: cookies, callback URLs and passkeys must use that origin. Preview deployments can use Vercel's `VERCEL_URL` fallback when `BETTER_AUTH_URL` is absent. A passkey registered at one hostname does not automatically work at a different hostname. Choose a stable domain before encouraging passkey enrollment.

## Email

Easymail needs a verified SMTP sender and an active API key bound to it. Set the dedicated key in server environments. Sender rotation happens in Easymail. A missing key makes recovery/verification delivery fail; the health endpoint exposes `emailConfigured`, never the credential itself. Mail errors propagate to auth forms; signup verification is sent only when a key is configured. Check Easymail delivery logs and SMTP inbox/spam folders before calling recovery verified.

## Authentication and data

Better Auth stores sessions in Neon, uses secure cookies on HTTPS, validates trusted origins, and rate-limits signin/signup/reset attempts in the database. API mutations require same-origin requests. Chart/journal/bookmark queries are scoped to the session user. Foreign-key cascades remove account-owned data on deletion.

Saved charts are limited to 20 per account. The dashboard and account export return the most recent 200 journal entries; bookmarks and charts are included in export. Extend pagination before claiming unlimited history exports. Avoid logging payloads or credentials. Review Neon retention/backups before promising immediate removal from backups.

## PWA and privacy

The manifest has 192/512 icons and a maskable icon. The worker precaches only a generic offline page and icon; public navigation gets an offline fallback. Auth, APIs, private dashboard and journal/chart responses are not placed in worker caches. The app requires network access for account data and email. Browser install UI varies by platform; iOS uses Safari's Share → Add to Home Screen.

When updating worker assets, increment its cache version. Ensure `sw.js` is served without stale caching. Deletion and password changes ask for user confirmation in the interface. No analytics or paid AI service is installed.

## Verification and release

Run lint, typecheck, calculation assertions, migration validation, and a production build. Then verify browser signup/signin, chart save/reload, journal and bookmark persistence, access isolation, passkey enrollment/signin, email verification/reset delivery, responsive layouts, reduced motion, PWA registration and offline fallback. Verify against the canonical deployed origin, not only localhost.

`/api/health` reports app status, database connectivity, and whether email is configured. It does not disclose database identifiers or credentials. If local Node networking stalls on this workstation, `NODE_OPTIONS=--no-network-family-autoselection` worked around its address-selection problem; it is not an application requirement.

## Dependency advisories

The launch audit found upstream advisories in the CLI/lint/migration tool chain (`braces` through globbing tools and older esbuild through drizzle-kit's legacy loader). These tools do not process public requests in Asteria's deployed routes. The audit's proposed forced changes downgrade major packages; they were not applied blindly. Track upstream patches and rerun `npm audit` before future releases. Do not expose tooling dev servers or run registry/pattern inputs from untrusted users. This is a documented remaining tooling limitation, not a claim of a clean audit.
