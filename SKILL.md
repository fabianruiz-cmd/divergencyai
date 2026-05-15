---
name: divergency-ai-design
description: Use this skill to generate well-branded interfaces and assets for Divergency AI — the LatAm B2B adaptive‑AI studio (SapioLab, Formación Pro, Realidad Aumentada Pro). Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping marketing sites, decks, and sales collateral.
user-invocable: true
---

Read `README.md` first — it captures the brand voice, content fundamentals, visual foundations, layout rules and iconography.

Then explore the rest of the skill:

- `colors_and_type.css` — every CSS variable (color, type, spacing, radii, shadow, motion). Import this as the foundation of any new artifact.
- `fonts/` — the brand typeface, **Montserrat** (weights 100 / 200 / 300 / 400 / 500 / 600 / 700 / 800 / 900, roman + italic, `.ttf`). Self‑hosted via `@font-face` declarations in `colors_and_type.css`.
- `assets/logos/` — Divergency AI wordmark (white‑on‑dark) and the "D" isotype.
- `assets/icons/` — feature‑row SVG icons (shield, lock, eye, check‑badge, book, brain, ar). 24px line icons, 1.5–2px strokes.
- `assets/images/` — hero/portfolio photography and the Amornia sphere.
- `preview/` — static HTML specimen cards for typography, color scales, buttons, pricing, etc. Look here before building a new component — there's almost always a reference.
- `ui_kits/website/` — a React (JSX) recreation of the marketing site with a nav, hero, pull‑quote, ecosystem section, ethics grid, pricing and footer. Pull components from here for any new page.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and build static HTML files that the user can open directly. If working on production code, use `colors_and_type.css` and the component patterns as a guide, not a literal copy‑paste.

If the user invokes this skill without any other guidance:

1. Ask what they want to build (landing page section, pitch deck, product tour, investor one‑pager, product feature page, etc.).
2. Ask for the target audience (C‑suite executive, HR lead, IT director, end user).
3. Ask for the tone bias: more "sales pitch" vs. more "technical proof" (Divergency's house style sits in the middle — bold promise → practical proof).
4. Confirm copy language — default to **Spanish, formal «usted»** unless told otherwise.
5. Then act as an expert brand designer for Divergency AI: output HTML artifacts for quick exploration, or production‑quality React components for durable work.

## Voice cheat‑sheet

- Spanish, formal usted. Never «tú».
- **BOLD PROMISE → PRACTICAL PROOF.** "IA que actúa, no promete" → "AES‑256 en reposo, TLS 1.3 en tránsito".
- ALL CAPS eyebrows with 0.25–0.4em tracking, in cyan (`--brand-cyan`).
- Sentence case for headings. Product names always capitalized.
- Zero emoji. Iconography is reserved and teal‑glowing.

## Visual cheat‑sheet

- Background: **void** `#010512`. Never pure black, never white.
- Primary: electric cyan `#22D3EE`, with radial cyan blooms behind sections.
- Cards: glass (rgba white .05, blur 40, 1px white hairline, 32–40px radius).
- Icon tile: 56×56, 16px radius, teal‑900 fill, cyan hairline, soft 15px glow.
- Typography: Montserrat Black for display, Light for body. Weight contrast is the story.
- Layout: asymmetric 60/40 brick grid for feature rows; 1200px max‑width; 80px fixed glass nav.
