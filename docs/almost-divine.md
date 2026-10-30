# Almost Divine — storefront prototype

Branch: `feat/almost-divine-storefront`
App: `/almost-divine`
Status: prototype. Not wired to Medusa. Not a live shop.

## Why this exists

Rafsal asked for a React house site for a premium kurta company, named **Almost Divine**, taking *modules and motion* from [almostgods.com](https://almostgods.com/) — not their identity, photos, or type.

This is a separate UI experiment from the Valoir Next.js sample in `/storefront`. It does not replace Funnel (`/root/valoir-site`) and does not change the locked Medusa architecture.

## What was taken from the reference

Chrome first: Almost Gods uses a **centered wordmark** header (`header--center-logo`) — hamburger left, wordmark center, Search/Cart right. No top tabs.

Homepage modules, in their order:

1. Full-viewport **media banners**, stacked sticky (`sticky-section`), overlay copy (kicker, title, Discover, scroll hint)
2. Footer

No product grid on home. No announcement bar cloned.

Motion: as you scroll, the next banner covers the last; the stuck image scales slightly and copy fades. Page changes fade. Drawers slide.

Colour posture only: light page, black ink, black buttons, `#f4f4f4` secondary. Not Inter. Not their −0.3em heading tracking. Not their photography.

## What was not taken

- Almost Gods product shots or Shopify CDN files
- “Time / Order / Ritual”, Chapters, mysticism copy
- Inter / compressed display tracking
- Wishlist as a product line, “Bag” chrome
- Announcement bar

## House rules on this prototype

- Men’s weekday kurtas. Not wedding sherwani.
- Cart chrome says **cart**. Checkout button is disabled.
- Prices ₹7,400–₹9,200 are draft. Footer says so.
- No GI, village, or loom-ID claims.
- Wordmark: Bodoni Moda. UI: Plus Jakarta Sans.

## App map

```
almost-divine/
  src/data.js            catalogue + banner list
  src/store.jsx          cart, bookmark, drawers
  src/pages/Home.jsx     sticky campaign stack
  src/pages/Shop.jsx     2-col cards + overlapping deck
  src/pages/Product.jsx  hangtag PDP
  src/pages/About.jsx
  src/components/        Header, drawers, search, footer
  serve.py               no-cache SPA server on :8081
```

## How to run

See `almost-divine/README.md`.

Marker in `index.html`: `almost-divine-v2`. After a visual change, bump that comment and the `?v=` query.

## Relation to Valoir shop plan

`PLAN.md` / KUR-011 still owns the Medusa storefront. This branch is a visual base: if the house keeps the name Almost Divine, lift tokens and modules into the Next.js storefront later. If the name stays Valoir, keep this as a motion study and do not merge over `/storefront`.
