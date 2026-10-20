# Epics and task breakdown

Hermes board: `valoir-shop`.
7 epic containers (blocked, not runnable) + 26 tasks **KUR-001 … KUR-026**.

Epic cards exist so the dashboard shows the shape. Work happens on KUR-* cards only.

Kanban IDs: see [kanban.md](kanban.md).

Effort is a **cap**, not a promise. P0 unless noted.

---

## EPIC-1 — Architecture and MVP gate

Phase 0–1. Nothing in E4+ is assigned until KUR-002 is approved.

### KUR-001 Inspect repo, landing, environment
- Effort: 4h. Deps: none. Status at docs time: **completed**
- Outcome: `/root/valoir-shop/INSPECT.md`
- Did: host, Funnel 502, valoir-site prototype, empty public git repo, missing docker/postgres/gh, Node 26 vs LTS
- Did not: start :8080, install packages, overwrite landing

### KUR-002 Architecture, MVP, ₹50k cost (approval gate)
- Effort: 1d. Deps: KUR-001. **You must approve.**
- Produce: ARCHITECTURE.md, MVP.md, COST.md with sources and dates
- Compare Option A (Medusa + Next.js) vs Option B (thin custom)
- Validate Medusa version + Razorpay compatibility + hosting ToS
- Lock brand language
- Worker: `kanban_request_review`. Do **not** complete

### KUR-003 PRD, ADRs, diagram, threat checklist
- Effort: 4h. Deps: KUR-002 approved
- Freeze the decision so later tasks stop re-litigating the stack

---

## EPIC-2 — Foundations

### KUR-004 Repo layout, env, secrets pattern
- Effort: 4h. Deps: 003
- Monorepo or apps/storefront + apps/backend. `.env.example` only. No real keys in git

### KUR-005 Boot Medusa + Postgres + Admin locally
- Effort: 1d. Deps: 004
- Pin versions. If Razorpay cannot attach to this Medusa, **block E4** and propose Option B

### KUR-006 CI stubs, staging/prod config, backup notes (P1)
- Effort: 4h. Deps: 005
- Lint/test on push. Full restore drill is KUR-025

---

## EPIC-3 — Catalogue and Medusa Admin

### KUR-007 Kurta-set product model
- Effort: 1d. Deps: 005
- Size × colour variants. Fabric / care / fit fields. SCHEMA.md

### KUR-008 Variant inventory and oversell protection
- Effort: 4h. Deps: 007
- Two concurrent checkouts against stock=1 → one success

### KUR-009 Image pipeline and sample catalogue
- Effort: 4h. Deps: 007
- Placeholders allowed. Real photography is outside the ₹50k software cap

### KUR-010 Admin RBAC and operator guide (P1)
- Effort: 4h. Deps: 005
- Owner vs operations. OPERATOR.md: add product, stock, fulfil, refund

---

## EPIC-4 — Storefront

Starts only after KUR-002 approval (enforced: 011 depends on 003 + 005).

### KUR-011 Storefront shell and design system
- Effort: 1–2d. Deps: 003, 005
- Tokens, landing, nav, footer, policy stubs
- Must not replace Funnel `/root/valoir-site` unless you ask

### KUR-012 Collections and PLP
- Effort: 1d. Deps: 011, 007

### KUR-013 PDP
- Effort: 1d. Deps: 012
- Gallery, variant picker, size chart, fabric, care, fit. Out-of-stock cannot add

### KUR-014 Cart and session
- Effort: 1d. Deps: 013
- Guest cart survives refresh. No wishlist

### KUR-015 SEO, accessibility, mobile performance (P1)
- Effort: 4h. Deps: 013

---

## EPIC-5 — Checkout, payments, fulfilment

Purchase path. Reporting UI is not in this epic.

### KUR-016 Checkout: India address and order create
- Effort: 1d. Deps: 014, 007
- Creates a pending order. No payment yet

### KUR-017 Razorpay: webhooks, verify, idempotency
- Effort: 1–2d. Deps: 016
- Test mode only. Browser success is not enough. No live keys
- Replay webhook must not double-pay

### KUR-018 Confirmation, history, email
- Effort: 4h. Deps: 017

### KUR-019 Refunds and failed payments
- Effort: 4h. Deps: 017

### KUR-020 Manual fulfilment and tracking
- Effort: 4h. Deps: 018
- Packed/shipped + tracking number. No aggregator

### KUR-021 Returns policy and operator process (P1)
- Effort: 4h. Deps: 018
- Pages + OPERATOR.md. No returns portal

---

## EPIC-6 — Security, compliance, quality

### KUR-022 Auth, sessions, rate limits, dependency scan
- Effort: 1d. Deps: 016

### KUR-023 Automated tests for purchase and refund
- Effort: 1d. Deps: 017, 019
- Launch gate needs a repeatable command, not a demo video only

### KUR-024 India e-commerce 2027 / GST / DPDP checklist
- Effort: 4h. Deps: 002
- Technical vs professional items. **Not legal advice.** Questions for CA/lawyer

### KUR-025 Backup restore drill and rollback
- Effort: 4h. Deps: 006
- Actually restore once. Launch gate requires proof

---

## EPIC-7 — Launch

### KUR-026 Staging e2e and production launch checklist
- Effort: 1d. Deps: 015, 020, 023, 024, 025
- Worker: `kanban_request_review`. Do **not** complete
- No DNS, no live Razorpay, no Funnel cutover without you

Launch gates:

- Checklist green or explicitly waived by you
- Staging purchase + refund evidence
- Restore + rollback referenced
- Remaining human steps listed: domain, GSTIN, live keys, photography

---

## Critical path

```
001 → 002 (APPROVAL) → 003 → 004 → 005 → 007 → 011 → 012 → 013 → 014 → 016 → 017 → 018 → 023 → 026
```

Parallel:

- After 005: 006, 010
- After 007: 008, 009
- After 002: 024 (research)
- After 017: 019

## What is blocked on you

| Gate | Task | You do |
|------|------|--------|
| Architecture / money / MVP | KUR-002 | Approve or request changes |
| Git auth / private repo | — | Do not paste tokens in chat or on cards |
| Paid services | any | Explicit yes |
| Production | KUR-026 | Explicit yes |
