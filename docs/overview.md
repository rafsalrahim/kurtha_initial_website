# Overview — what we are actually planning

Date: 2026-10-20.
Status: **proposal**. Not approved. KUR-002 is the approval gate.

## The business

Valoir is a premium men's kurta / kurta-set house.

- Price band: ₹6,000–₹10,000 per set (the live Funnel prototype still shows draft prices of ₹2,450–₹3,850 — those are not the offer)
- Market: India first, international later
- Channel: our own website, not Shopify/Wix as the system of record
- Ownership: source, customer data, domain, production accounts stay ours
- Operators: Rafsal is technical. Co-founders are not all developers. Admin must be usable without a terminal
- Brand: luxury house, opaque, hangtag-ready. Not café. Not knight / “chivalric” names. The original brief used “chivalric”; that language is rejected unless you reverse it in KUR-002

## What “custom e-commerce” means here

Not “write a payment processor”. Not “rebuild Shopify admin”.

It means:

1. A storefront that looks like a house, not a theme
2. A commerce engine we host and can leave (catalogue, cart, orders, stock)
3. Razorpay for money movement
4. An admin the team can operate
5. A cost shape that can launch under ₹50,000 **cash**, with recurring fees called out separately

## Working technical recommendation (pending KUR-002)

**Option A (preferred until proven wrong):**

- Next.js storefront (TypeScript)
- Medusa v2 as the commerce backend
- PostgreSQL
- Medusa Admin for operators (no custom reporting UI in MVP)
- Razorpay (UPI / cards / netbanking), server-side verify + signed webhooks
- Object storage for product images
- Manual fulfilment in admin (tracking number field). No courier aggregator in MVP

**Option B (fallback):** Next.js + a thin custom order service + Razorpay + Postgres. Only if Medusa v2 cannot talk to Razorpay cleanly, or ops cost blows the cap.

KUR-002 must still **compare both**, with sources and dates. Do not treat Medusa as rubber-stamped.

## What already exists

| Thing | Where | Notes |
|-------|--------|------|
| Funnel landing | `/root/valoir-site`, https://valoir.taile13d7b.ts.net | Static prototype. Checkout says “coming”. At inspect, Funnel was 502 because nothing listened on :8080 |
| This git repo | `kurtha_initial_website` | Public, **empty** of application code as of 2026-10-20 |
| Kanban | Hermes board `valoir-shop` | 7 epics + KUR-001…026 |
| Ideas board | Hermes board `ideas` | Council dumps only. Do not put shop build work there |

## What we will not do in MVP

- Wishlist
- Shiprocket / courier aggregator
- WhatsApp / SMS
- Custom sales dashboard / reporting UI
- International checkout
- Customer returns portal (policy pages + operator process only)
- Microservices, Kubernetes, or a second “platform team”
- Storing cards or CVV
- Buying anything without a yes from you

## Sequence you should expect

1. **KUR-001** inspect host + repo — done
2. **KUR-002** architecture, MVP, ₹50k model — **you approve or send back**
3. **KUR-003** freeze ADRs / PRD / diagram
4. Foundations (repo, Medusa boot, CI)
5. Catalogue + admin
6. Storefront (only after step 2)
7. Checkout + Razorpay
8. Hardening, tests, India compliance checklist
9. Staging e2e — **you launch** (KUR-026)

Critical path:

`001 → 002 (you) → 003 → 004 → 005 → 007 → 011 → 012 → 013 → 014 → 016 → 017 → 018 → 023 → 026`

## Open decisions only you can make

- Domain
- Legal entity and merchant of record
- GSTIN / invoicing
- Photography (likely larger than the software cash cap)
- Confirm brand language lock
- Whether this GitHub repo stays public (should be private before secrets/app code)
- Razorpay KYC
- Where production actually runs (this VPS is the agent box, not an approved shop host)
- Who in the founding group operates admin day to day
