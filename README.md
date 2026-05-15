# Divergency AI — Design System

> **IA que actúa, no promete.** — Divergency AI's north‑star promise.
> Soluciones de IA adaptativa que transforman la capacidad de ejecución de una organización, no la automatizan y ya.

This design system captures the visual, typographic and tonal language of Divergency AI's marketing site and product surfaces. Everything here was reconstructed from the Figma source attached to this project.

## Sources

- **Figma** — `Divergency Website.fig` (mounted as a virtual FS).
  - Page: `/Propuesta/MoodBoard-1` → curated moodboard (the real reference is Prototipo‑Inicial)
  - Page: `/Prototipo-Inicial/Main-Page` → the canonical marketing site, ~8300px tall (hero → "Quiénes somos" → "Confían en nosotros" → "Ecosistema" → "Ética de datos" → Planes/pricing → Footer)
  - Page: `/Prototipo-Inicial/Hero-Banner`, `/Portfolio`, `/Market-Place`, `/Servicios-y-soluciones`, `/Perfil-Profesional-Animación`, `/Main-Page-Responsive`
  - `/Propuesta` contains moodboard frames + section‑label overlays, not final screens.
- **Uploads** — `Fuentes Tipograficas`, `Logos`, `Manual de marca`.
  - **Fonts confirmed:** brand face is **Montserrat** (full family, weights 100–900 incl. italics), installed under `fonts/` and wired via `@font-face` in `colors_and_type.css`.
  - **Still outstanding:** if `Manual de marca` contains formal color chips or logo‑clear‑space rules, please share — current color tokens are reverse‑engineered from the Figma only.
  - `JetBrains Mono` remains via Google Fonts for the rare mono/audit‑log usage.

## Product context

Divergency AI is a Latin‑American B2B AI studio (copy in **Spanish**, formal «usted» register) that pitches adaptive‑AI services to organisations. The sub‑brands discovered in the Figma:

| Product     | What it is                                                                                   |
|-------------|----------------------------------------------------------------------------------------------|
| **SapioLab**       | Data‑driven psychometrics platform — vocational, leadership, sales, innovation tests. "El cerebro de su empresa." |
| **Formación Pro**  | Adaptive learning routes + workshops + certifications in applied AI. "El combustible del equipo." |
| **Realidad Aumentada Pro** | Immersive AR experiences & integrations. "El futuro en tus manos." |
| **IA Empresarial** | Bespoke adaptive‑AI solutions for commercial operations.                                                 |
| **Equipos & Staff**| AI‑training bootcamps for leadership teams.                                                              |

The public marketing site is the only surface we have enough Figma fidelity to recreate; the codebase, app UI and docs were not provided.

## Files

| Path                          | What                                                                 |
|-------------------------------|----------------------------------------------------------------------|
| `README.md`                   | You are here — brand, content & visual fundamentals.                 |
| `colors_and_type.css`         | Foundational CSS vars (colors, type, spacing, radii, shadows, motion). |
| `SKILL.md`                    | Agent SKILL manifest — for Claude Code download.                     |
| `assets/logos/`               | Wordmark + icon lockup (white‑on‑dark).                              |
| `assets/icons/`               | Feature icons extracted from the site (SVG).                         |
| `assets/images/`              | Hero‑scene, AR portfolio photos.                                     |
| `preview/`                    | Swatch / specimen cards shown in the Design System tab.              |
| `ui_kits/website/`            | React recreation of the marketing site, page + components.           |
| `fonts/`                      | Montserrat family (9 weights × roman+italic), `.ttf`, self‑hosted.  |

---

## CONTENT FUNDAMENTALS

**Language.** 100% Spanish (LatAm, neutral). No English mixing outside product names (`SapioLab`, `Marketplace`, `Workshops`).

**Register.** Formal **usted** throughout — "Transforme su organización", "Su información nunca se comparte". Never «tú»/«vos». This is a business‑to‑executive voice, not a consumer app.

**Tone.** Confident, terse, action‑oriented. The hero alone is a thesis:
> "IA que actúa, no promete. Rompe el patrón, crea el futuro."

Body copy then *earns* the claim with one short, technical detail:
> "Utilizamos cifrado AES‑256 para datos en reposo y TLS 1.3 para datos en tránsito, gestionados por HSM."

The rhythm is always **BOLD PROMISE → PRACTICAL PROOF**. Never marketing puffery without a concrete mechanism beside it.

**Casing.**
- `ALL CAPS` for eyebrow labels: `PLANES Y PRECIOS`, `QUIÉNES SOMOS`, `LAS UNIDADES DE POTENCIA`, with **0.4em letter‑spacing** and cyan color.
- `Sentence case` for headings — "Inversión que se paga sola", never "Inversión Que Se Paga Sola".
- Product names always capitalized ("SapioLab", "Formación Pro", "Realidad Aumentada Pro").
- Section headers in the Figma style overlays (`Animación inicial`, `Que pensamos`) use Montserrat Medium 57px in cyan — these are curatorial labels, not screen copy.

**Rhetorical devices**
- Contrast‑pairs: "No solo automatizamos; transformamos."
- Metaphors of machinery/body: "El cerebro de su empresa", "El combustible del equipo", "Las unidades de potencia".
- Call‑outs as pull‑quotes with a left cyan border and 1px letter: `"IA que actúa, no promete."`
- Numerals and price always explicit: `$11 USD /prueba`, `AES‑256`, `TLS 1.3`.

**Length targets.**
- Hero H1: 8–14 words, two lines.
- Section H2: 3–7 words.
- Lead paragraph: ≤ 2 sentences / ≤ 220 characters.
- Card description: 1 short sentence.
- Card proof line: 1 sentence, technical.
- Eyebrow: 2–4 uppercase words.

**CTAs.** Short imperative — "Agendar demo", "Comenzar ahora", "Ver en Marketplace", "Explorar planes". The arrow glyph "→" follows "Ver en Marketplace" links.

**Emoji.** Never. Unicode symbols only for math/currency (`$`, `×`, `→`).

---

## VISUAL FOUNDATIONS

### Overall mood
Deep‑space, near‑black canvas (**`#03052C` — Void**, never pure black) with a single electric cyan (**`#02F3FE`**) as the accent. Large radial cyan **glow blooms** (blur + opacity 30–40%) float behind the content in the lower half of each section. Everything else is restraint — no secondary hue, no rainbow gradients, no decorative shapes. The feel is sci‑fi‑editorial: generous whitespace, translucent glass cards, sparse glow, confident type.

### Color vibe
- **Official palette (from the brand manual `Colores.png`):**
  - `#03052C` — **Void.** Page background. Never use pure black.
  - `#010D73` — **Deep Blue.** Section fills and the second step in the darkness scale.
  - `#1D19AB` — **Electric Indigo.** Accent bars, press states, hero cards, pricing fills.
  - `#02F3FE` — **Cyan (signature).** CTAs, eyebrows, icons, links, edge sheens, glows.
- **Primary accent** is always the cyan — one hue, applied with discipline.
- **Neutrals:** cool blue‑greys (`#CBD5E1`, `#B9CAC9`, `#94A3B8`). Never warm greys.
- **Imagery:** cool‑toned portrait photography, dark palette, **no warm grain, no sepia**, no stylized illustrations. When light is present in an image it's typically blue or neutral.

### Typography
- **Montserrat is the ONLY brand typeface.** It pulls double duty across display and body — no secondary sans. The full 9‑weight family is installed so the system can lean on weight contrast instead of family contrast.
- **Brand hierarchy (per the user):**
  - **Títulos — Black 900 / ExtraBold 800** at 38–72px, `-0.02em` tracking, line‑height 1.0–1.1. Black is the shout, ExtraBold is the default headline weight.
  - **Subtítulos — SemiBold 600** at 18–28px, line‑height 1.2. The bridge weight between headline and body.
  - **Párrafos — Regular 400** at 15–18px, line‑height 1.55–1.65. Never Light; Regular is the committed body weight.
- **UI labels & tabs:** Montserrat **500 / Medium** at 13–14px.
- **Eyebrows (`PLANES Y PRECIOS` etc.):** Montserrat **700 / Bold** uppercase at 11–12px with 0.25–0.4em letter‑spacing in cyan.
- **Mono — JetBrains Mono:** reserved for audit‑log rows, code, and numeric tables. Not a brand face — keep it off marketing pages.
- Line‑heights run tight on display (1.0–1.1) and generous on body (1.55–1.65).
- Eyebrows: **0.4em tracking**, uppercase, 10–11px, cyan.

### Backgrounds
- Page background is **void‑dark, flat**, never an image.
- Section‑level ambience comes from **blurred radial gradients** (`radial-gradient(circle, rgba(0,249,249,0.6), rgba(0,249,249,0.1), transparent)`) placed at the edges of a section, 800×800, opacity ~0.3.
- One "trusted by" band uses a thin **horizontal line‑gradient** `transparent → #004D85 → transparent`.
- No patterns, no hand illustrations, no noise texture, no SVG backdrops.

### Cards
- Feature cards: `backgroundColor: rgba(255,255,255,0.05)`, `border: 1px solid rgba(255,255,255,0.1)`, `backdrop-filter: blur(40px)`, `border-radius: 32px`.
- Pricing cards: `backgroundColor: rgba(16,28,71,0.4)`, `border: 1px solid rgba(34,211,238,0.2)`, `border-radius: 40px`, `box-shadow: 0 0 50px rgba(0,249,249,0.05)` plus a top‑edge cyan line.
- Product cards (Formación/SapioLab) carry a subtle **internal gradient** from cyan‑5% at top to a cool lavender‑10% at bottom.
- Every card has a glass hairline border, never a solid stroke.

### Icon tiles
`56×56` rounded‑16 tile, `rgba(22,78,99,0.3)` teal fill, `1px solid rgba(34,211,238,0.2)` border, `box-shadow: 0 0 15px rgba(0,249,249,0.2)` glow. Icon itself is stroked / filled in cyan.

### Shadows & glows
- Subtle drop for photos: `0 4px 4px rgba(0,0,0,0.25)`.
- Signature glow — always cyan, always blurred, always ≤ 0.5 opacity. Three tiers: `0 0 15px / 0.2`, `0 0 30px / 0.3`, `0 0 50px / 0.5`.
- Nav bar uses a very faint outer glow (`0 0 30px rgba(0,249,249,0.05)`) plus `backdrop-filter: blur(24px)`.

### Transparency & blur
Used constantly. The design *is* a layered glass stack. Nav, cards, dividers and price badges all use `backdrop-filter` (12–40px). Never use solid surfaces for cards on dark.

### Borders
Always 1px. Colors: `rgba(255,255,255,0.05)` (hairline), `rgba(255,255,255,0.1)` (card), `rgba(34,211,238,0.2)` (accent tile), `rgba(34,211,238,0.3)` (accent divider). No 2px, no dashed.

### Corner radii
`6 / 12 / 16 / 20 / 32 / 40 / 9999`. Feature cards use 32; pricing uses 40; icon tiles 16; images 20; pills for buttons 9999.

### Buttons
- **Primary:** pill (`border-radius: 9999px`), `background: #22D3EE`, text `#003737`, weight 700, 14–16px, 10–20px vertical padding, ≥ 24px horizontal. Hover: `opacity .9` + optional soft glow `0 0 20px rgba(0,249,249,0.25)`.
- **Secondary / Ghost:** outlined pill, `1px solid rgba(255,255,255,0.1)` with `backdrop-filter: blur(12px)`, white text.
- **Link:** cyan + trailing arrow `→`, 14px, weight 700.

### Dividers
Vertical gradient line with a cyan‑bordered circle (with a chevron) exactly mid‑point — used between two columns in pricing.

### Layout rules
- Max content width 1280px (nav) / 1232px (inner grid), with 64px side padding on desktop.
- Grid uses an **asymmetric 60/40 "brick" pattern** for feature rows — row 1 = large‑left/small‑right, row 2 = small‑left/large‑right. The seam across rows stays intentional.
- Large modules use 40px internal padding; small cards use 40–48px.
- Vertical rhythm: 24 / 40 / 96 / 128 between blocks.
- The top nav stays fixed, 80px tall, full‑width, glass‑blurred.

### Animation / motion
- Entry: gentle fade + 12–16px upward translate, 480ms, `cubic-bezier(0.22, 1, 0.36, 1)`.
- Hover on links: `opacity: 0.85` over 120ms — **no color swap**.
- Hover on CTAs: add a cyan glow over 240ms.
- Press: `scale(0.98)` over 120ms, no color change.
- The footer + hero are animated in Figma ("Animación inicial", "Footer Animation 1", "Cards Animation") with a stroked‑logo trace + drifting cyan blooms — document but do not re‑draw by hand; use Lottie/SVG when available.

### Light mode
One "Versión light" label frame exists but no actual light‑mode screens were finalised. A planned light palette should invert to `#F4FEFE` background, `#003737` ink, keep cyan as accent. Treat as future work — flag to user.

---

## ICONOGRAPHY

### Approach
Line‑based, single‑weight, cyan‑filled glyphs. Icons always appear inside the **56×56 rounded teal tile** described above — they never sit on their own on the page.

The Figma's feature‑strip uses seven extracted SVGs, all stroke‑filled in `#22D3EE`:

| Name in Figma | Copied to | Represents |
|---------------|-----------|------------|
| `Icon.svg`    | `assets/icons/shield.svg`      | Datos 100% Privados |
| `Icon-2.svg`  | `assets/icons/lock.svg`        | Cifrado End‑to‑End  |
| `Icon-3.svg`  | `assets/icons/eye.svg`         | Auditoría Transparente |
| `Icon-4.svg`  | `assets/icons/check-badge.svg` | Cumplimiento Normativo |
| `Icon-5.svg`  | `assets/icons/book.svg`        | Formación Pro |
| `Icon-6.svg`  | `assets/icons/brain.svg`       | SapioLab |
| `Icon-7.svg`  | `assets/icons/ar.svg`          | Realidad Aumentada Pro |

Plus a handful of inline SVG primitives in the JSX (chevron‑right, arrow‑right) that are better kept as pure inline SVG.

### Usage rules
- **Always** in a teal tile (don't place icons on the raw background).
- **Always** cyan fill/stroke — no alternate colors.
- No emoji, ever.
- No Unicode glyphs other than `→` (link affordance) and currency `$`.
- The lib uses a 16‑stroke grid — visually matches **Lucide** at `strokeWidth={2}` if additional icons are needed.
- **Substitute rule:** if a required icon isn't in `assets/icons/`, use [Lucide](https://lucide.dev/) via CDN (`https://unpkg.com/lucide@latest/dist/umd/lucide.js`) at stroke‑width 2, color `var(--brand-cyan)`. Flag the substitution.

### Logo
- Wordmark: `assets/logos/divergency-logo-wordmark.png` — white transparent PNG, 1045×294, ratio ≈ 3.55:1.
- Icon lockup: `assets/logos/divergency-icon.png` — 160×48.
- **Usage:** dark backgrounds only (the asset is white on transparent). If placing on light, flag to user for a dark variant.
- Margin: clear‑space equal to the height of the mark on every side.
- Minimum size: 96px wide on screen.

---

## Index

- **Foundations:** `colors_and_type.css`
- **Preview cards** (populate the Design System tab): `preview/*.html`
- **UI kit — marketing site:** `ui_kits/website/`
  - `index.html` — clickable recreation of the main page
  - `components.jsx` — Nav, Hero, FeatureCard, ProductCard, PricingCard, Footer, etc.
- **Agent skill manifest:** `SKILL.md`

### Known caveats / open asks
1. Brand fonts + logo variants + brand manual zips arrived empty. **Please re‑attach** — we're using Google Fonts stand‑ins that match the Figma families by name.
2. No product UI (app / dashboard) was provided. Only the marketing site was recreated.
3. No light mode exists in the source; the "Versión light" frame in Figma is just a placeholder label.
4. Entry/footer animations are referenced but not included as Lottie/MP4 — static recreation only.
