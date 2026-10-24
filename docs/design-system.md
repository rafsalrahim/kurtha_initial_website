# Design system — Valoir

Locked with ADR-0002 (voice) and `docs/research.md`. Tokens live in `storefront/app/globals.css` as CSS variables and are imported by components. Do not introduce a second palette.

## Surface

Primary surface is **Explore** (catalogue) with a **Decide** homepage. Never a SaaS feature-grid.

## Colour

Warm paper, charcoal ink, one earth accent. Gold is a hairline, not a fill.

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#F3EEE4` | Page background |
| `--paper-2` | `#E8E1D4` | Alternate band, cards |
| `--stone` | `#D4CBBA` | Rules, disabled |
| `--ink` | `#1A1714` | Text, icons |
| `--ink-soft` | `#5C564E` | Secondary text |
| `--rule` | `#C9C0B0` | 1px borders |
| `--earth` | `#8A5A3C` | Laterite accent, focus ring |
| `--mark` | `#9C8158` | Wordmark hairline only |
| `--sold` | `#8A4032` | Error / out of stock |

Contrast: ink on paper exceeds 7:1. Soft ink on paper exceeds 4.5:1. Do not put body text on photography.

## Type

OFL Google Fonts already used on the Funnel landing. No paid fonts in MVP.

- Display: **Bodoni Moda** 400/500. Wordmark, hero line, product names on PDP.
- Interface: **Plus Jakarta Sans** 400/500. Nav, prices, body, forms.
- Numeric prices: Jakarta, tabular lining if available (`font-variant-numeric: tabular-nums`).

Scale (desktop → mobile):

| Role | Desktop | Mobile |
|---|---|---|
| Wordmark | 22px / 1 | 18px |
| Hero line | 56–72px / 1.05 | 36px |
| Section title | 32px | 26px |
| Product name | 16px | 15px |
| Body | 16px / 1.55 | 15px |
| Price | 14px | 14px |
| Caption | 12px / 1.4 | 12px |

Letter-spacing: wordmark +0.18em uppercase. Hero tracking −0.02em. Never all-small-caps body.

## Grid and space

- Desktop: 12 columns, max 1280px, side gutter 48px.
- Tablet: 8 columns, gutter 32px.
- Mobile: 4 columns, gutter 20px.
- Vertical rhythm: 8px base. Section padding 96/64/48.
- Product grid: 2 col mobile, 3 col desktop. Gap 16/24. Image ratio **3:4**.
- Radius: 0 on chrome. 2px on inputs. No 16px cards.

## Imagery

- Campaign: full-bleed, one subject, no text on the photo.
- Product: 3:4, garment-led, same crop, no lifestyle clutter on PLP.
- Detail: collar, placket, cuff — only when we have real close-ups.
- Placeholders must be labelled in the asset inventory. Never pass stock as the product.

## Motion

- Duration 180–240ms, `cubic-bezier(0.22, 1, 0.36, 1)`.
- Hover: opacity 1 → 0.85 on image, underline on text links. No lift/shadow.
- Respect `prefers-reduced-motion: reduce` (instant).
- No page-load intro, no smooth-scroll hijack, no parallax.

## Components

- **Header:** wordmark left; Shop, Philosophy, Materials as text; search later; bag count right. On mobile: wordmark + bag, links in a full-height panel (not a hamburger of icons).
- **Button:** text-underline primary (“Discover the collection”). Solid ink fill only for Add to bag. Height ≥ 44px.
- **Product card:** image, name, price. No badges, no “new”, no wishlist heart.
- **PDP:** gallery left (stack on mobile), name/price/size/add sticky on desktop below the title. Size is a real control; disabled sizes say so.
- **Bag:** slide-over on desktop, full page on mobile.
- **Focus:** 2px earth ring, offset 2px.

## Interaction rules

- One primary action per view.
- Do not invent stock. Sample catalogue is marked SAMPLE in the UI chrome (banner), not on every card.
- Empty bag is a sentence, not an illustration.
- Error text is specific (“Select a size”) not “Oops”.

## Ban list

Gold fills, crowns, glassmorphism, gradients, Inter, Playfair-on-everything, 3-feature icon rows, fake reviews, countdown timers, chatbot bubble, bottom app-dock.
