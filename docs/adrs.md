# ADRs

## ADR-0001 — Stack (KUR-002)

**Status:** Accepted 2026-10-20 (Rafsal).

Medusa v2.21.x + Next.js App Router storefront + Postgres 16+ + in-repo Razorpay `AbstractPaymentProvider` on a **dedicated** commercial VPS.

Storefront never holds `DATABASE_URL`. Only Medusa talks to Postgres.

Fallback B (thin Next order service) only if KUR-017 kill criterion fires: test-mode pay cannot complete order → Checkout → signed webhook → captured → refund.

Rejected: Shopify/Woo, Medusa Cloud, Stripe, Vercel Hobby (commercial checkout forbidden), this Hermes VPS as production.

## ADR-0002 — Voice

Luxury / opaque / hangtag. Atelier, house, cloth, cut, week, fabric, fit.

Banned in copy, SKUs, tokens, folders, commits: knight, knighthood, chivalry, chivalric, crusade, squire, armour/armor, quest, liege, realm, heraldry-as-brand.

The 2026-10-24 design brief’s “chivalry” section is implemented as character, dignity, integrity, confidence — without those words.

Product names stay in the landing register: Undyed Week, Soot, Indigo, Laterite, Atelier Bundi, Lamppost Grey, Grove, Noon Soot.

## ADR-0003 — Node

Shop runtimes: Node **22 or 24 LTS**. Not Hermes Node 26. Medusa docs: v20.19+ or v22.12+; Next starter wants ≤ 24. Pin in `.nvmrc` as 22.

## ADR-0004 — Payments

In-repo provider, identifier `razorpay`. HMAC on raw body. Amounts in paise. No card/CVV storage. Community plugins are reference only (amount×100×100 bug). Live keys need a later explicit yes.

## ADR-0005 — Hosting and Funnel

Production = new commercial VPS, not `srv2023249`. Funnel `https://valoir.taile13d7b.ts.net` stays on `/root/valoir-site` until an approved cutover. Shop must not bind `:8080`.

## ADR-0006 — Catalogue source

Until Medusa boots, the storefront reads `storefront/lib/catalogue.ts` (sample). UI must show a sample banner. Switching to Medusa Store API is an adapter swap, not a rewrite of pages.

## ADR-0007 — India / INR

MVP is India, INR, prepaid. No multi-currency, no COD.
