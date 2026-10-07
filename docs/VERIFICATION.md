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

## Black-and-white immersive edition

Verified October 7, 2026, production code revision `e23bdda`:

- Self-hosted Bricolage Grotesque display typography and Nunito Sans body text; black/white light and dark semantic tokens, grayscale cartoons, and refreshed PWA branding.
- Browser confirmed two real Three.js WebGL canvases on the landing page. Native scrolling selected all three full-screen story chapters correctly.
- Guided numerology produced life path 7 for 1990-07-17. Guided zodiac comparison displayed its percentage. The two-step birth form calculated and displayed a chart on the canonical production origin.
- Local browser selected July 17, 1990 through the shadcn Calendar and month/year Select controls. Native date/time pickers and the time-zone datalist were replaced.
- Active navigation and animated hover underline, focus-trapping mobile Sheet, and eight production routes at 390px passed. Additional local zodiac-profile, daily-reading, and signup layouts passed.
- Dark mode persisted after a production reload. Reduced-motion mode created no WebGL canvases and exposed all three story chapters as ordinary content.
- PWA Install remained present and the production service worker was activated. Health check reported the database connected; email delivery remains unconfigured.
- Production browser checks recorded zero console errors. ESLint, TypeScript, calculation assertions, optimized build and GitHub Application checks passed.

Two issues found during this revision were corrected: overly broad reveal observers mutated server-rendered nodes before hydration, and early clicks on server-rendered buttons could be lost before handlers attached. Reveals now avoid that race; shadcn action/text/select controls use a shared readiness guard. A browser test with client JavaScript deliberately delayed confirmed the guard was disabled initially and the first interaction completed correctly.

## Responsive polish — 7 October 2026

- Signup email and password now share shadcn InputGroup structure; browser measurements confirm matching 48px height, width, radius and padding. Password visibility toggle remains functional.
- Shared accessible shadcn Spinner replaces auth Suspense text and route skeletons.
- Mobile public and dashboard headers contain the logo, theme toggle and menu. Dashboard installation moved to the footer; account creation remains available in the mobile menu.
- Nine public/auth routes checked at 320, 390, 430, 1024, 1440 and 1920px (54 viewport checks): rendered card grids use one mobile column and two desktop columns, with no horizontal overflow.
- Dashboard shell independently rendered with sample cards at the same six widths; menu opening/closing, footer installation and spinner accessibility checked. The temporary verification route was removed before publication.
- ESLint and optimized Next.js build passed.

## Calendar containment — 7 October 2026

- Scoped calendar button dimensions prevent global form-button padding from expanding the date grid. Popup width respects the viewport, and excessive height can scroll.
- All seven weekday columns and navigation buttons remain inside the panel at 320, 390, 768 and 1440px. Month/year selection, February 29, 2000 selection, reopening and next-month navigation passed.
- ESLint and production build passed after clearing a stale generated development type from the removed verification route.

## Numerology reader’s desk — 7 October 2026

- Replaced identical short meanings with distinct life-path, birthday-talent and personal-year readings. Added original editorial profiles for 1–9 and 11/22/33, strengths, development, growth, relationships, work, practices and questions.
- Added combined interpretation, a six-lesson handbook (also searchable in the library), twelve-number reference, year exploration, ephemeral session notes and Markdown report download. The UI explains notes are not saved and should be downloaded before changing birthdays or leaving.
- Automated checks cover all 1,188 supported life-path/birthday/year combinations, distinct role paragraphs, unchanged birth-date numbers when the year changes, and report content/notes export.
- Browser checks: full report, 2027 year change, tab/accordion interactions, preserved notes across tabs, actual file download, handbook route and a 33/6 master-number explanation. Grids remain one column at 320/390px and two at 768/1440px without horizontal overflow.
- ESLint, exploration assertions, TypeScript and optimized Next.js build passed; no browser console errors during the new flows.
- Further-study references describe conventions and curricula; interpretations and teaching exercises are original Asteria content, not copied source reports.
