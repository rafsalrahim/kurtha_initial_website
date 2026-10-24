# PRD — Valoir shop (frozen from KUR-002)

Date: 2026-10-24. Change only if Rafsal reopens KUR-002.

## One sentence

A guest in India can buy a labelled sample kurta set with Razorpay **test** keys; a co-founder can see the order in Medusa Admin, fulfil it, and refund it.

## Actors

| Actor | Can |
|---|---|
| Guest | Browse, bag, checkout with email + India address |
| Account customer | Same, plus order history (after KUR-016/018) |
| Operator | Medusa Admin: stock, orders, refunds, tracking |
| Owner | Keys, domain, go-live (never the agent) |

## In

Landing, collection, PDP (gallery, size, fabric/care/fit placeholders), bag, guest checkout UI, policy pages, sample catalogue, design system. Medusa is the commerce engine when booted (KUR-005). Until then the storefront uses an in-repo sample adapter, clearly labelled.

## Out

See `docs/deferred.md`. Wishlist, COD, international, Shiprocket, WhatsApp, journal until there is writing, Funnel cutover, live charges.

## Success

Staging: pay with Razorpay test → email → Admin → refund → restore last backup. Homepage beauty is not the metric.

## Non-goals this phase

Custom admin, 3D, AI styling, replacing `/root/valoir-site` on Funnel.
