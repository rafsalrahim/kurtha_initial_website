# Valoir Shop — technical implementation plan

Source of truth for board `valoir-shop`.
Brand: Valoir, premium men's kurta / kurta-set house. India first. ₹6,000–₹10,000 per set.
Repo: https://github.com/rafsalrahim/kurtha_initial_website.git
Existing public landing: /root/valoir-site (Funnel). Do not replace it blindly.
Cash cap: ₹50,000 one-time. Recurring costs flagged separately. No purchase, DNS, production deploy, or real payment without explicit human approval.
Secrets never go on the board.

This plan was authored 2026-10-20 because the execution spec referenced an “approved plan” (KUR-001–KUR-026, seven epics) that was not attached. KUR-002 is the human approval gate. Until KUR-002 is in Review and Rafsal approves, no storefront/payment work is assigned.

## Architect issues (read before building)

1. The execution spec assumes Medusa. The original brief requires a two-architecture comparison. KUR-002 must still compare Medusa+Next.js vs a thinner custom stack, then recommend. Medusa is the working assumption, not a rubber stamp.
2. GitHub repo is private. `gh` is not installed. A GitHub token was previously pasted onto the ideas card — that token must be rotated. Workers must not ask for tokens on the board. Human authenticates `gh` / git via the vault or a profile `.env`.
3. Ideas board runs `idea-inbox` (council, not build). All implementation lives on `valoir-shop`.
4. Brief says brand is “chivalric”. House preference is luxury/opaque/hangtag-ready, not knight names. KUR-002 must lock brand language before UI work.
5. ₹50k cash does not cover photography, paid fonts, or a year of naive managed hosting. Photography is the likely budget breaker — flag as a separate human cost, not a software line.
6. Medusa v2 + Razorpay compatibility is the highest technical risk. Validate plugin/version before any storefront.
7. Free/hobby hosts often forbid commercial checkout. Confirm ToS in KUR-002. Prefer a small commercial VPS over a hobby PaaS if ToS is unclear.
8. Custom admin/reporting is deferred. MVP uses Medusa Admin. Purchase flow beats dashboards.
9. Jan 2027 Indian e-commerce rule changes, GST invoicing, DPDP: KUR-024 is a checklist + questions for a professional, not legal advice.
10. Do not store cards, CVV, or raw gateway secrets. Server-side webhook verify + idempotency is mandatory.
11. Non-dev operators (co-founders) need Medusa Admin, not a terminal. Operator guide is P1, not optional.
12. Wishlist, shipping aggregator, WhatsApp, international, custom reporting: out of MVP.

## Recommended architecture (pending KUR-002)

Working assumption:
- Medusa (current v2) + Postgres — catalogue, cart, orders, inventory, admin.
- Next.js storefront — premium fashion house UI, not a theme clone.
- Razorpay — UPI/cards/netbanking. Never a custom processor.
- Object storage for images (cheap, commercial-ok).
- Transactional email: cheapest commercial SMTP/API after approval.
- Fulfilment: manual in Medusa Admin + tracking number field. No Shiprocket until post-MVP.
- Hosting: decide in KUR-002 after ToS + ₹50k model. Likely a single VPS (app + Postgres) or managed Postgres + small app host.
- Analytics: privacy-light, free tier.

Alternative to beat in KUR-002: Next.js + a minimal custom order service (still Razorpay). Only win if Medusa+Razorpay is incompatible or ops-heavy.

## MVP vs later

MVP (end-to-end purchase):
Landing, collections, PDP (gallery, size, fabric, care, fit), cart, guest+account checkout, Razorpay (verified), order confirmation + email, Medusa Admin (products, stock, orders), policy pages, mobile-first, basic SEO, backup/restore drill, refund path.

Later:
Wishlist, shipping aggregator, WhatsApp/SMS, custom reporting UI, international, returns portal, promotions engine beyond simple discounts.

## Budget rules

- Initial cash ≤ ₹50,000. Recurring (hosting, email, image bandwidth, domain renewal, Razorpay %) listed separately.
- Razorpay is usage-based — estimate at ₹6k / ₹8k / ₹10k AOV in KUR-002. Not a cash purchase.
- No paid account without approval.

## Seven epics

| Epic | Name | Tasks |
|------|------|-------|
| E1 | Architecture & MVP gate | KUR-001, 002, 003 |
| E2 | Foundations | KUR-004, 005, 006 |
| E3 | Catalogue & Medusa Admin | KUR-007, 008, 009, 010 |
| E4 | Storefront | KUR-011, 012, 013, 014, 015 |
| E5 | Checkout, payments, fulfilment | KUR-016, 017, 018, 019, 020, 021 |
| E6 | Security, compliance, quality | KUR-022, 023, 024, 025 |
| E7 | Launch | KUR-026 |

## Task list

P0 unless noted. Effort is a cap, not a target.

KUR-001 Inspect repo, landing, host, tools. 4h. Deps: none.
KUR-002 Architecture + MVP + ₹50k cost model. Human approval. 1d. Deps: 001.
KUR-003 PRD, ADRs, diagram, deferred list, threat checklist. 4h. Deps: 002 approved.
KUR-004 Repo layout, env/secrets pattern, no secrets on board. 4h. Deps: 003.
KUR-005 Boot Medusa+Postgres+Admin locally; pin version; list plugins. 1d. Deps: 004.
KUR-006 CI lint/test stubs, staging/prod config, backup notes. 4h. P1. Deps: 005.
KUR-007 Product model: kurta set, size/colour, fabric/fit/care attrs. 1d. Deps: 005.
KUR-008 Variant inventory + oversell protection. 4h. Deps: 007.
KUR-009 Image pipeline + sample catalogue (placeholder images ok). 4h. Deps: 007.
KUR-010 Admin RBAC + operator guide for non-devs. 4h. P1. Deps: 005.
KUR-011 Storefront shell: design tokens, landing, nav, footer, policy stubs. 1–2d. Deps: 003, 005.
KUR-012 Collections / PLP filters. 1d. Deps: 011, 007.
KUR-013 PDP: gallery, variants, size chart, fabric, care, fit. 1d. Deps: 012.
KUR-014 Cart + guest/account session. 1d. Deps: 013.
KUR-015 SEO, a11y, mobile performance budget. 4h. P1. Deps: 013.
KUR-016 Checkout: India address, order create, GST fields as required. 1d. Deps: 014, 007.
KUR-017 Razorpay: server verify, signed webhooks, idempotency, no card storage. 1–2d. Deps: 016.
KUR-018 Order confirmation, history, email. 4h. Deps: 017.
KUR-019 Refunds, failed payments, reconciliation notes. 4h. Deps: 017.
KUR-020 Manual fulfilment: status + tracking field + customer notice. 4h. Deps: 018.
KUR-021 Returns/exchange policy + operator process (no portal). 4h. P1. Deps: 018.
KUR-022 Auth/session, rate limit, validation, dependency scan. 1d. Deps: 016.
KUR-023 Automated tests: purchase + refund path. 1d. Deps: 017, 019.
KUR-024 India e-commerce Jan 2027 / GST / DPDP checklist (flag legal). 4h. Deps: 002.
KUR-025 Backup restore drill, rollback runbook, monitoring. 4h. Deps: 006.
KUR-026 Staging e2e + launch checklist. Launch gate. 1d. Deps: 015, 020, 023, 024, 025.

## Critical path

001 → 002 (APPROVAL) → 003 → 004 → 005 → 007 → 011 → 012 → 013 → 014 → 016 → 017 → 018 → 023 → 026

Parallel after 005: 006, 010.
Parallel after 007: 008, 009.
Parallel after 002: 024 (research only).
Parallel after 017: 019.

## First milestone (approval)

KUR-001 inspects. KUR-002 publishes architecture, MVP, cost, risks. Stop. Rafsal approves or requests changes. No storefront until then.

## Launch gates (KUR-026)

- Release checklist green.
- Jan 2027 e-commerce notes reviewed (KUR-024).
- Payment + refund flows verified in test, then approval for live keys.
- Backup restore + rollback proven.
- No real-money charge without approval.

## Worker rules

- Board: valoir-shop. Profile: default.
- Complete only when acceptance criteria are verified. Comment evidence.
- KUR-002 and KUR-026: `kanban_request_review`. Do not complete.
- If estimate blows, dependency fails, or an integration is missing: comment, block, propose the smallest scope cut.
- Never paste secrets, never purchase, never touch DNS/production.
