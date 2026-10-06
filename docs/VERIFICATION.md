# Verification record

Launch checks on 6 October 2026:

- TypeScript, ESLint, astrology assertions and optimized Next.js build passed.
- Neon HTTP migrations applied successfully; authenticated application data persisted.
- API signup, session lookup, signin, incorrect-password rejection, signout, input validation, chart/journal/bookmark write and reload passed.
- Browser email/password signin reached the protected dashboard.
- Browser WebAuthn registration and signin passed with a Chromium virtual CTAP2 authenticator, resident credentials and user verification.
- Browser birth chart calculation and aspect-tab navigation passed. Desktop and 390-pixel mobile layouts were visually reviewed.
- Library search and reduced-motion mode exercised.
- Vercel production build completed; public health endpoint returned database connected.

Email delivery, verification links and recovery delivery are awaiting the dedicated Easymail credential. They are not claimed as verified. Passkey browser coverage uses an emulated authenticator; physical device prompt UX still varies by browser/OS.

Calculation tests cover normalized angular separation, known solar signs, valid/invalid dates and coordinates, daylight-saving gaps, unknown-time house omission, future lunar phases, cross-chart aspects and unique library slugs. Educational methods and remaining calculation limits are listed separately in ASTROLOGY.md.

Public-origin follow-up: signup/signin/session/signout and private data persistence checks also passed at `https://asteria-sand-nine.vercel.app`. Browser password signin reached the deployed dashboard. The service worker was active and controlled public navigation; disabling network returned the branded offline guide. GitHub's Application checks workflow passed. The Vercel project is connected to the repository's `feature/asteria` production branch.

Production passkey registration and signin passed on the canonical public origin with the virtual WebAuthn authenticator. The browser reached the deployed dashboard after passkey signin without an email/password submission.

## Animated redesign and exploration tools

Verified on October 6, 2026, production code revision `046a4a6`:

| User flow | Evidence |
| --- | --- |
| Theme selection → persistent page appearance | Light/dark toggle and reload assertions passed on the canonical production origin. |
| Birth date → numerology calculation → displayed result | 1990-07-17 displayed life path 7; browser submission and deterministic calculation tests passed. |
| Zodiac selection → scoring rules → updated percentage | Changing Libra to Leo updated the rendered percentage; all 144 ordered pairs passed symmetry, range, and weight checks. |
| Sky page/API → Astronomy Engine → event output | Production `/api/sky` returned 11 upcoming events and a calculated timestamp; future-event and changing-reading assertions passed. |
| Public pages → responsive layouts | Landing, numerology, compatibility, sky, zodiac, and signin passed 390-pixel overflow checks with animations enabled. |
| Pointer movement → Anime.js perspective transforms | Pointer rotation produced stage transforms; reduced-motion preference suppressed cartoon animation on reload. |
| PWA controls → manifest/service worker | Install control remained present; production manifest returned standalone display and three icons; service worker was activated. Native installation prompts remain browser/OS-controlled. |

ESLint, TypeScript, existing astrology checks, new exploration checks, and optimized build passed. GitHub Application checks passed for both redesign commits. Production browser checks recorded no console errors. Local and production screenshots are kept outside Git in `output/`.

Artwork composition/mode is documented in ART.md; dynamic-data and scoring methods are documented in DYNAMICS.md. Email delivery remains pending the dedicated Easymail credential, as recorded above.
