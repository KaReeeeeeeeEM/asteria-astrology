# Dynamic sky and exploration methods

## Free live data

Asteria calculates the current sky with the MIT-licensed [Astronomy Engine](https://github.com/cosinekitty/astronomy). This avoids an external horoscope service's credentials and request quotas. `/api/sky` returns planetary positions, Moon phase, aspects, and upcoming events as JSON; it revalidates hourly. Pages calculate their sky data at rendering time.

The event calendar searches precise lunar quarter times, next global solar/lunar eclipses, and seasonal markers. Sign ingresses and changes in apparent retrograde motion use six-hour samples over the next fourteen days, so their displayed times are explicitly approximate. Eclipse listings do not assert local visibility.

Daily sign reflections combine actual Sun/Moon positions, phase, tight planetary aspects, and a whole-sign house lens relative to each Sun sign. Original element-based prompts vary with the date. This provides changing content without a paid model. It is rule-based symbolic prose, not a trained system or an evidence-based prediction of personal events. Personal natal transits remain a separate dashboard feature.

[FreeAstroAPI](https://www.freeastroapi.com/docs) was evaluated. Its [pricing](https://www.freeastroapi.com/pricing), checked October 6, 2026, offers 80 free requests per day and a limited AI trial. That is unsuitable as the default dependency for a publicly free app. An operator could integrate another provider later; no third-party horoscope key is required now.

## Numerology

The life-path calculator uses the component-reduction convention: reduce month, day, and year separately, preserving 11, 22, and 33, then reduce their sum with those master numbers retained. Other numerology schools use different conventions and can disagree for some dates. Calculation steps are shown rather than hiding this choice.

Birthday number reduces the calendar day with master numbers retained. Personal year uses month, day, and the current UTC calendar year, reducing to 1–9; this implementation uses a calendar-year boundary. All inputs are validated as real dates from 1900 through today. Public date inputs stay in the browser.

## Zodiac match percentages

This app-specific symbolic scale weights elemental flow at 55%, sign geometry at 30%, and modality at 15%. Scores are deterministic and symmetric, covering all 144 ordered pairs. They are not survey results or relationship success probabilities. The UI displays every component and weight. Two-chart synastry continues to calculate actual cross-chart planetary longitude aspects.

## Verification

`npm run check:explorations` checks master-number reductions, a known-date trace, invalid dates, all zodiac pairs and weights, future events and ordering, and readings changing across sky dates. Browser checks exercise actual form submission, select changes, persistent themes, reduced motion, mobile layout, and the production JSON endpoint.
