# Asteria design system

Asteria is a playful celestial atlas: lavender and white in light mode; midnight, lilac, and mint in dark mode. Soft peach and aqua support original cartoon illustrations. Both themes use semantic tokens for consistent cards, forms, charts, and dashboard surfaces. The original logo combines an orbit, a four-point star, and a satellite dot. It is drawn as SVG, works in one color, and remains recognizable as an app icon. No stock logo is reused.

## Research and references

- [Anime.js official showcase](https://animejs.com/): motion as explanation, SVG movement, restrained interaction, and staggered entrances.
- [Anime.js React guidance](https://animejs.com/documentation/getting-started/using-with-react/): scoped animation setup and cleanup.
- [Cosmos](https://www.cosmos.so/): calm discovery, generous spacing, and an editorial presentation of collections.
- [Astrodienst](https://www.astro.com/): breadth of astrological reference material and clear distinctions between calculation methods.
- [Astrology logo study on Behance](https://www.behance.net/gallery/26785505/Astrology-Logos): economical zodiac symbolism, used as category research, not copied artwork.
- [shadcn Nova](https://ui.shadcn.com/create): Radix primitives, compact controls, semantic tokens, and owned component source.

“Best UI” has no single objective winner. These references inform a coherent design selected for this audience rather than a claim that a particular template is universally best.

## Typography

Nunito Sans is self-hosted in weights 400, 700, and 900. Rounded, heavy headings suit the cartoon characters; readable body copy and visible form labels carry the tools. Theme selection persists across reloads, with color transitions disabled for reduced motion.

## Motion

Anime.js v4 handles initial page entrances, CSS perspective, tilted orbital planes, pointer-responsive 3D rotation, floating cartoon layers, star movement, and viewport reveals. Native scroll remains native. Animations revert on route changes. Reduced-motion preference skips Anime.js and disables CSS transitions. Content remains present without JavaScript; animation is progressive enhancement.

## UX decisions

- All public discovery tools work without registration.
- Primary calls to action name their outcome.
- Birth time uncertainty is visible; rising sign and houses are omitted when unknown.
- City search is optional, with manual coordinates/time-zone fallback.
- Form labels remain visible; error feedback is readable.
- Calculations stay local until a user explicitly saves a chart.
- Passkeys supplement email/password onboarding and can be managed after sign-in.
- Private features use account-scoped database queries and server-side session checks.
- Destructive account/data actions have explicit in-app confirmation.
- Match percentages expose their weights and are labeled as symbolic scores. Readings avoid deterministic personal event predictions.
- Navigation, chart wheel, library, and dashboard reflow for phones.
- The PWA offline experience avoids caching authenticated content.
