# Asteria

[Open the app](https://asteria-sand-nine.vercel.app) · [Verification record](docs/VERIFICATION.md)

A free astrology web app and installable PWA. Built with Next.js, TypeScript, Anime.js, shadcn/ui (Radix Nova), Better Auth, and Neon Postgres. A playful black-and-white interface pairs original learning material with calculated tropical charts and a private reflection space.

## Features

- Animated landing page, twelve zodiac profiles, searchable 48-article library, current sky and lunar phases, daily sign reflections.
- Browser-calculated birth charts: ten planets, eleven aspect types, whole-sign houses, Ascendant/Midheaven, retrograde flags, elements, and JSON export.
- Zodiac match percentages with a transparent symbolic scoring breakdown, and two-person planetary synastry.
- Life path, birthday, and personal-year numerology with visible calculation steps.
- Upcoming lunar quarters, sign ingresses, stations, seasonal markers, and global eclipse dates; public `/api/sky` JSON.
- Black/white light and dark themes; self-hosted Bricolage Grotesque and Nunito Sans.
- Three.js full-screen scroll chapters, pointer-responsive 3D geometry, Anime.js page/wizard transitions, and typewriter cartoon captions.
- Guided numerology, compatibility, and birth-chart flows; shadcn calendars, selects, navigation and mobile sheets.
- Email/password registration and signin, password recovery and email verification through Easymail, WebAuthn passkeys.
- Protected dashboard with saved charts, current transits, private mood journal, article bookmarks, profile/password/passkey management, data export, and account deletion.
- Installable PWA with custom SVG branding, PNG/maskable icons, and a lightweight offline fallback. Private pages and auth responses are never cached by the service worker.
- Responsive layouts, keyboard navigation, accessible Radix controls, reduced-motion support, bundled fonts, metadata, sitemap, and share image.

Asteria is for symbolic reflection and entertainment. Interpretations are original rule-based prose; they are not scientific forecasts or generated AI claims. The library introduces several traditions; only the documented tropical methods have working calculators. See [calculation scope](docs/ASTROLOGY.md) and [live-data and numerology methods](docs/DYNAMICS.md).

## Local setup

Use Node.js 22 or newer and npm. Create a Neon Postgres database and obtain its pooled connection string. Create a dedicated Easymail API key bound to a verified SMTP sender.

```sh
npm ci
cp .env.example .env.local
# Edit .env.local; never commit its contents.
npm run db:migrate
npm run dev
```

Open http://localhost:3000. `BETTER_AUTH_SECRET` must be a random secret of at least 32 characters; generate one with `openssl rand -base64 48`. `BETTER_AUTH_URL` must match the browser origin. Set `EASYMAIL_API_KEY` to enable signup verification and recovery email. Email/password access does not require verification; an unverified account is identified in settings.

Easymail sends from the verified sender attached to the key. This app uses `POST https://easymail-nu.vercel.app/api/v1/emails`, Bearer authentication, plain-text bodies, idempotency keys, and a request timeout. No sender password is stored in Asteria.

```sh
npm run lint
npm run typecheck
npm run check:astrology
npm run check:explorations
npm run build
npm start
```

`npm run db:generate` creates schema migrations. Review and commit generated SQL, then run `npm run db:migrate` against the intended database. Migrations use Neon's HTTP transport.

## Deployment

See [operations](docs/OPERATIONS.md) for Vercel, domains, environment variables, migrations, email, passkeys, and PWA behavior. Neon and Vercel offer free tiers with usage limits; no payment or premium feature is built into the app. The public application is free to use; hosting/mail usage still depends on the operator's service allowances.

## Structure

- `src/app`: public/auth/dashboard pages and authenticated API routes.
- `src/components`: interactive tools, Anime.js motion, shared layout and shadcn controls.
- `src/lib/astrology.ts`: calculations and chart/transit/synastry functions.
- `src/lib/knowledge.ts`: signs, planets, houses, aspects, articles and interpretations.
- `src/lib/auth.ts`, `email.ts`: Better Auth and Easymail integration.
- `src/db`, `drizzle`: Neon schema and versioned migrations.
- `public/sw.js`, `offline.html`, `icons`: PWA assets.
- `scripts`: database migration and meaningful astrology assertions.

## Design and attribution

[Design notes](docs/DESIGN.md) describe the palette, chosen preset, research references, accessibility, and motion. Logo and favicon are original vector artwork. Bricolage Grotesque and Nunito Sans use the SIL Open Font License. Earlier Cormorant Garamond and DM Sans files retain their licenses. Original AI-assisted illustrations and their prompts are recorded in [art notes](docs/ART.md). Astronomy Engine is MIT-licensed; see its upstream validation references in the calculation notes. shadcn/ui components are generated from the official registry.

## License

MIT. See [LICENSE](LICENSE). Never commit real API keys, auth secrets, connection strings, test passwords, or personal chart/journal data.

### Languages and dashboard navigation

English and Kiswahili switching covers public pages, account forms, the dashboard, reading content, the learning library, dates and numerology downloads. See [language maintenance](docs/LANGUAGES.md). Run `npm run check:i18n` to verify reading coverage.

Dashboard tools and article/detail pages stay inside the authenticated dashboard shell. The shadcn sidenav collapses from its header button or **⌘B / Ctrl+B**, with icon tooltips on desktop and a navigation sheet on mobile.
