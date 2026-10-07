# English and Kiswahili

Asteria supports English (`en`) and Kiswahili (`sw`) throughout public tools, account forms, the dashboard, the learning library and reading reports. The language icon switches immediately; the language selector also names both choices. The preference persists for a year in the `asteria_language` cookie. The server uses that cookie for HTML language, initial translations and page metadata. Local storage carries the preference into the offline PWA guide.

## Rendering and data

`LanguageProvider` loads the local Swahili catalogue when requested. There is no runtime translation API, per-reading fee or translation network dependency. `Text` translates prose without adding DOM wrappers. Owned shadcn primitives translate placeholders, tooltips and accessible labels. Dates use `Intl.DateTimeFormat` with `sw-TZ` or English. Typewriter captions translate their complete sentence before animation.

The catalogue contains article content, detailed numerology sections, sign descriptions, daily reflections, calendar events and messages. Dynamic readings use named numeric placeholders such as `{0}`; calculations and stored records continue using the same stable identifiers in both languages. Switching languages preserves client form state and reading results. User names, email addresses, chart names, journal text and reading notes remain as entered. Downloaded numerology prose uses the selected language while preserving personal notes and reference URLs. JSON data exports preserve their schema.

## Maintaining translations

1. Use `Text` for visible copy, and the owned shadcn controls for inputs and actions.
2. Run `npm run i18n:extract` after adding copy. This lists source strings and dynamic templates.
3. Add reviewed translations to `src/i18n/sw-overrides.json` and new catalogue entries to `src/i18n/sw.json`. Keep placeholders intact. Technical names, URLs, IANA time zones and bibliographic proper names remain unchanged.
4. Run `npm run i18n:catalog` to merge reviewed copy and check missing entries.
5. Run `npm run check:i18n`, TypeScript, lint and a browser pass in both languages.

The initial long-form catalogue was drafted offline using [OPUS-MT English–Swahili](https://huggingface.co/Helsinki-NLP/opus-mt-en-sw), with a [CTranslate2 conversion](https://huggingface.co/Sams200/opus-mt-en-sw). The model and its drafting environment are not shipped with Asteria. Reviewed overrides correct interface wording, domain terms, factual numbers and dynamic placeholders. Further editorial improvements should go into the override catalogue rather than relying on automatic drafting to replace reviewed text.

`check:i18n` exercises 49 articles, twelve zodiac descriptions, daily-reading templates, 252 numerology date/year combinations, downloaded reports and every zodiac pair. It checks translation coverage and corrupted placeholders; it does not certify linguistic quality.
