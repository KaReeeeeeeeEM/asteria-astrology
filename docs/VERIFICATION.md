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
