# Epics — what each one is, and what we will actually do

This is the full implementation plan for board `valoir-shop`. Read this document if you want to understand the work, not the one-line task list.

Seven epics, 26 tasks **KUR-001 … KUR-026**. Epic cards on the board are **blocked containers** so the dashboard shows shape. Workers run only on KUR-* cards.

Status of this document: **proposal**. Storefront, payments, DNS, paid accounts, and production do not start until you approve **KUR-002**. Effort numbers are **caps**, not promises. P0 unless marked P1.

Kanban IDs: [kanban.md](kanban.md). Stack and money: [architecture.md](architecture.md), [cost-and-risks.md](cost-and-risks.md). Feature in/out: [features.md](features.md).

---

## How the seven epics fit together

Valoir needs a house website that can sell a kurta set in India for real money, then let a non-dev co-founder fulfil and refund it. That is one product. The epics are the phases of building it, in the order the dependencies force.

**EPIC-1** decides the stack, the MVP, and the ₹50k model, then freezes that decision so later work stops arguing. **EPIC-2** makes a real repo that boots Medusa + Postgres + Admin on a laptop/VPS. **EPIC-3** models a kurta set (not a T-shirt) and puts sample stock in Admin. **EPIC-4** is the customer-facing house: landing, collections, product page, cart. **EPIC-5** is the money path: India checkout, Razorpay, confirmation, refund, pack-and-ship. **EPIC-6** is the work that makes a launch honest: auth, tests, India checklist, backup restore. **EPIC-7** is one card: staging proof and a launch checklist you sign.

The critical path (the chain that determines calendar) is:

```
001 → 002 (YOU APPROVE) → 003 → 004 → 005 → 007 → 011 → 012 → 013 → 014 → 016 → 017 → 018 → 023 → 026
```

Work that can run beside that chain, once its parent exists:

- After 005: CI stubs (006), operator guide (010)
- After 007: oversell test (008), images (009)
- After 002: India compliance research (024) — research only, no legal claims
- After 017: refunds (019); after 018: fulfilment (020) and returns policy (021)
- After 016: auth/rate-limit (022)
- After 006: backup drill (025)

Nothing in EPIC-4 or later is assigned until KUR-002 is approved. That is enforced by leaving those cards unassigned, not by hoping workers read this file.

Working stack (pending that approval): Next.js storefront, Medusa v2 as commerce engine, PostgreSQL, Medusa Admin, Razorpay (our own payment provider, not a stale npm plugin), object storage for images, manual fulfilment. Fallback if Razorpay cannot attach to Medusa in test: thin custom order service (Option B). See [architecture.md](architecture.md).

---

## EPIC-1 — Architecture and MVP gate

### What this epic is

This epic is the **decision**, not the shop. It exists because the original brief asked for a custom e-commerce site under ₹50,000 cash, with a two-architecture comparison, and the execution board already had 26 tickets that assumed Medusa. Those tickets are not an approved plan. Building a storefront on an uncompared stack, or spending the cash cap on the wrong host, is the expensive mistake.

When this epic is finished we know: which architecture we are building, what “MVP” means in one sentence, what the ₹50k does and does not buy, which brand language is allowed, and the ADRs later tickets must obey. We still do not have a shop. We have permission to start one.

### Why it is a separate epic

If architecture, money, and MVP live as comments on a coding ticket, they get re-litigated on every card. A dedicated gate (KUR-002) forces a stop: you read three documents, you approve or send back, then KUR-003 freezes the decision into artifacts later workers cannot quietly change.

### In this epic

- Inspect the host, the empty git repo, the live Funnel landing, and the tool gaps
- Compare Option A (Medusa + Next.js) vs Option B (thin custom) with current versions, Razorpay status, hosting ToS, and INR costs
- Lock MVP in/out and brand language
- Freeze PRD, ADRs, diagram, deferred list, threat checklist

### Not in this epic

- Installing Docker/Postgres, writing app code, designing the storefront, creating Razorpay accounts, buying a domain, touching DNS, restarting Funnel, replacing `/root/valoir-site`

### Done when

KUR-001 is complete (it is). KUR-002 is in **Review** and you have commented approval (or requested changes that were applied and re-reviewed). KUR-003 has committed the frozen ADRs/PRD/diagram into this repo. Only then may EPIC-2 be assigned.

### KUR-001 — Inspect repo, landing, environment

| | |
|---|---|
| Effort cap | 4h |
| Priority | P0 |
| Depends on | none |
| Kanban | t_e3824947 |
| Status | **completed** 2026-10-20 |

This card exists so later work does not guess at the machine, the git remote, or the live URL.

What we did (already): recorded host facts (Ubuntu 26.04, 2 vCPU / 8 GiB, no swap, UFW DROP except Tailscale), runtimes (Python 3.14, Node **26** not LTS), missing tools (no `gh`, Docker, Postgres, gcc/make), Funnel `https://valoir.taile13d7b.ts.net` pointing at `:8080` which was down → 502, landing files at `/root/valoir-site` (static prototype, checkout “coming”, draft prices ₹2,450–₹3,850), GitHub `rafsalrahim/kurtha_initial_website` public and empty of app code, boards `ideas` vs `valoir-shop`.

What we explicitly did not do: start `:8080`, apt-install anything, overwrite the landing, ask for a GitHub token, clone with credentials.

Artifact: `/root/valoir-shop/INSPECT.md`.

Acceptance (met): a dated inspect file covering host, tools, Funnel, landing, git, boards; no side effects on production-looking URLs.

### KUR-002 — Architecture, MVP, ₹50k cost (approval gate)

| | |
|---|---|
| Effort cap | 1 day |
| Priority | P0 |
| Depends on | KUR-001 |
| Kanban | t_b1ed39e5 |
| Status | **your approval**. Worker must `kanban_request_review`, never complete. |

This is the only card that is allowed to choose the stack. Everything after it is execution of that choice.

What we will do, in order:

1. Write **ARCHITECTURE.md**: Option A vs Option B in one comparison table (what, why, cash, recurring, lock-in, ops, migration cost). Pin Medusa version, Node LTS (22 or 24 — not 26), Postgres, storefront (custom Next.js, not a theme), payment approach. Record that there is **no first-party Razorpay plugin** for Medusa v2; community packages are stale or buggy (amount×100×100, JSON-parsed webhook bodies). Recommendation: own a small in-repo `AbstractPaymentProvider` rather than depend on those packages. Kill criterion for A: if a test-mode UPI/card payment cannot go order → Checkout → signed webhook → Medusa captured → refund, time-box and switch to B. Do not spend a second week fighting a plugin.
2. Check **hosting ToS** with dates: Vercel Hobby forbids commercial checkout; a dedicated commercial VPS (new Hostinger KVM, not this Hermes box) is the default; this 2 vCPU agent VPS is not production.
3. Lock **brand language** before any UI: luxury / opaque / hangtag. Ban knight / chivalric / quest language in copy, SKUs, CSS tokens, folders, commits. Product names stay in the landing register (material and place, not character).
4. Write **MVP.md**: one purchase path that must work (browse → PDP → cart → India checkout → Razorpay test pay → webhook → confirmation → admin fulfil/refund). Explicit deferred table: wishlist, Shiprocket, WhatsApp, custom reporting, international, returns portal, COD, subscriptions, marketplace, Algolia, gift cards, paid fonts, Funnel cutover, live keys.
5. Write **COST.md** with dated public prices: ₹50k cash is software + domain + first prepaid host year. Photography is a separate envelope and is the likely breaker. Razorpay ~2.36% of GMV is usage, not cash. Recurring (VPS intro vs year-2 renewal, email, R2) listed so a cheap first year does not hide year two. Three AOV scenarios: ₹6k / ₹8k / ₹10k.
6. List **open questions only you can answer**: approve A or force B; brand lock; domain; production host size; make GitHub private before app code; legal entity / GSTIN; photography; which co-founder operates Admin; shipping geography; any reason for Vercel Pro.

What we will produce: `ARCHITECTURE.md`, `MVP.md`, `COST.md` with sources and fetch dates. Drafts already exist under `/root/valoir-shop/` for this gate; they land in git when you approve and KUR-003 freezes them.

What we will not do on this card: install packages, buy anything, create Razorpay/Hostinger/Cloudflare accounts, start storefront tickets, complete the kanban card.

Acceptance: three dated documents; A vs B compared (not rubber-stamped); Razorpay compatibility treated as a provider we own, not a plugin we hope for; hosting ToS cited; brand lock written; MVP in/out frozen; cost splits cash vs recurring vs photography vs gateway %; card in Review waiting on you.

Your job: comment approval or send back. Numbered answers to the questions in ARCHITECTURE.md are enough (`1 yes, 2 valoir.in, …`).

### KUR-003 — PRD, ADRs, diagram, threat checklist

| | |
|---|---|
| Effort cap | 4h |
| Priority | P0 |
| Depends on | KUR-002 **approved** |
| Kanban | t_a8afa09e |

After you approve, this card copies the decision into **frozen** repo artifacts so KUR-004…026 cannot quietly reopen A vs B, MVP scope, or brand language.

What we will do:

1. PRD: actors (guest, account customer, operator, owner), purchase flow, non-goals, success metric (staging purchase + refund + restore).
2. ADRs (one file or a small `docs/adr/` set): stack choice A (or B if you forced it); Node LTS pin; payments = in-repo Razorpay provider; hosting = dedicated commercial VPS; no card storage; India/INR only; Medusa Admin as the operator UI; Funnel landing not overwritten until cutover.
3. Architecture diagram updated to match the approved ADR (the current [html/architecture.html](html/architecture.html) is the working drawing).
4. Deferred list copied verbatim from MVP.md.
5. Threat checklist: webhook forgery, replay, oversell, secret leakage, admin session, dependency CVEs, public-repo secrets. This is a checklist, not a pentest.

What we will produce: `docs/prd.md`, `docs/adr/` (or `docs/adrs.md`), updated diagram, `docs/threats.md`, deferred list in-repo.

Acceptance: later tickets can cite an ADR instead of re-arguing. Brand ban is in an ADR. Kill criterion for Medusa+Razorpay is written where KUR-017 can find it.

Out: no application code, no CI, no Medusa install.

---

## EPIC-2 — Foundations

### What this epic is

This epic is **the factory floor**. After the decision is frozen, we still cannot write catalogue or UI until there is a repo layout, a secrets pattern, and a Medusa+Postgres+Admin process that boots on a pinned Node LTS.

When this epic is finished a developer can clone the repo, copy `.env.example`, start Postgres + Medusa + Admin, log into Admin, and see an empty catalogue. CI lint/test stubs exist. Staging vs prod config is named. We still have no products and no public storefront.

### Why it is a separate epic

Mixing “boot the engine” with “design the PDP” is how you get a theme clone running on unpinned Node 26 with secrets in git. Foundations are deliberately boring and blocked on KUR-003 so we do not scaffold the wrong stack.

### In this epic

- Monorepo (or `apps/storefront` + `apps/backend`) with `.env.example` only
- Node 22 or 24 LTS for the shop (not Hermes Node 26)
- Medusa 2.21.x pinned, Postgres 16+, Admin at `/app`
- CI stubs and env names for local / staging / prod
- Backup **notes** (the restore drill is KUR-025)

### Not in this epic

- Product schema, images, storefront UI, Razorpay keys, production VPS purchase, Funnel cutover

### Done when

`README` has a local boot that a second person can follow. Admin loads. Versions are pinned. No real secrets in git. If Medusa cannot even boot, we stop and do not start EPIC-4.

### KUR-004 — Repo layout, env, secrets pattern

| | |
|---|---|
| Effort cap | 4h |
| Priority | P0 |
| Depends on | KUR-003 |
| Kanban | t_5d8417be |

What we will do:

1. Turn this git repo from planning-docs-only into an app monorepo **without deleting the docs**. Likely `apps/backend` (Medusa), `apps/storefront` (Next.js), `docs/`, `scripts/`. Exact tree written in README.
2. `.gitignore` for `.env`, `node_modules`, build output, Postgres data, keys.
3. `.env.example` with **names only**: `DATABASE_URL`, `STORE_CORS`, `ADMIN_CORS`, `JWT_SECRET`, `COOKIE_SECRET`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `S3_*` / R2, `RESEND_API_KEY`. Values stay local.
4. Document: secrets live in env / vault. Never in git, never on kanban, never in chat. Make the GitHub repo **private** before any real env exists (you do that on GitHub; we do not paste tokens).
5. `package.json` workspaces or equivalent so one install boots both apps.
6. Editor/Node pin: `.nvmrc` or `engines` field = 22 or 24 LTS.

Acceptance: clone + copy example env + install instructions in README; `git grep` finds no live keys; docs from EPIC-1 still in the tree.

Out: not installing Medusa yet (that is 005); not creating cloud accounts.

### KUR-005 — Boot Medusa + Postgres + Admin locally

| | |
|---|---|
| Effort cap | 1 day |
| Priority | P0 |
| Depends on | KUR-004 |
| Kanban | t_d985df86 |

This is the first real engineering risk after approval. If this card fails, the rest of Option A is fantasy.

What we will do:

1. Install what this agent box is missing **for local spike only** (Docker or native Postgres, compiler if node-gyp needs it, Node 22/24 via nvm/fnm). Not a production install. Not opening WAN ports.
2. Scaffold Medusa v2 at the **pinned** version from the ADR (working pin: `@medusajs/medusa` 2.21.x).
3. Postgres 16+; migrate; create an admin user.
4. Prove Admin loads in a browser (`/app`). Screenshot or URL in the card comment.
5. List plugins/modules we will actually use: product, inventory, cart, order, payment, fulfillment, auth. Redis optional at MVP.
6. Stub the Razorpay provider module **enough to register** (identifier `razorpay`). Full webhook/capture is KUR-017. If the module cannot register on this Medusa version, **block EPIC-4 and EPIC-5**, comment the failure, propose Option B. Do not start the storefront.
7. Pin lockfiles. Record Node, Medusa, Postgres versions in README.

Acceptance: one command (or a short documented sequence) boots API + Admin; Admin login works; versions pinned; Razorpay module either registers or we have formally switched to B.

Out: no catalogue data beyond Medusa defaults; no Next.js UI; no test Razorpay keys required yet; this Hermes VPS is not declared production.

### KUR-006 — CI stubs, staging/prod config, backup notes (P1)

| | |
|---|---|
| Effort cap | 4h |
| Priority | P1 |
| Depends on | KUR-005 |
| Kanban | t_24f4de32 |

What we will do:

1. GitHub Actions (or equivalent) on push: install, lint, unit test stub. No deploy-on-push.
2. Name three configs: `local`, `staging`, `production`. Different env files, same code. Staging uses Razorpay **test** keys. Production keys do not exist until KUR-026 + you.
3. Backup **notes**: what to dump (`pg_dump`), where it will go (R2 or equivalent), retention. This is documentation. The actual restore drill is KUR-025.
4. Do not buy a second host for staging in year one; staging is a second compose project / hostname on the future shop VPS, or local.

Acceptance: a failing lint would fail CI; README describes the three envs; backup notes exist.

Out: not the restore proof; not production deploy.

---

## EPIC-3 — Catalogue and Medusa Admin

### What this epic is

This epic is **the product, as data**. A Valoir SKU is a kurta **set**: named cloth with a fabric story, care, fit, size chart, then variants of size × colour, each with its own stock. If we model this as a generic T-shirt, every later page (PDP, inventory, returns) will lie.

When this epic is finished Admin can create a set, give it sizes and colours, set stock, attach images (placeholders allowed), and a concurrent checkout cannot sell the same last piece twice. An operator guide exists so a co-founder does not need SSH.

### Why it is a separate epic

Storefront tickets will invent a schema if one does not exist. Inventory and images are cheaper to get right on an empty catalogue than after 011–014 have hardcoded field names.

### In this epic

- Product model + `SCHEMA.md`
- Variant inventory + oversell test
- Image pipeline + sample catalogue
- Owner vs operations roles + `OPERATOR.md`

### Not in this epic

- Customer-facing pages (EPIC-4)
- Payments (EPIC-5)
- Real photography (human cost, outside ₹50k)

### Done when

A sample drop of a few sets exists in Admin, stock is per variant, oversell test passes, images render from object storage or a documented local stand-in, operator guide covers add / stock / fulfil / refund.

### KUR-007 — Kurta-set product model

| | |
|---|---|
| Effort cap | 1 day |
| Priority | P0 |
| Depends on | KUR-005 |
| Kanban | t_fa23c6d5 |

What we will do:

1. Define the sellable unit: **Product** = named set (title, story, fabric, care, fit notes, size chart). **Variant** = size × colour (optional fit). **Inventory** = per variant. **Images** = gallery on the product, optional per colour.
2. Map that onto Medusa product + variant + option + metadata/attributes. Do not invent a parallel table if Medusa fields suffice; do not cram fabric/care into the title.
3. Size scale: lock one chart for MVP (e.g. S–XXL or the house chart from the landing). Do not ship three competing charts.
4. Price: INR, in the **₹6,000–₹10,000** band for sample data. Do not copy Funnel draft prices ₹2,450–₹3,850 into Medusa as if they were the offer.
5. Write `docs/SCHEMA.md`: fields, option names, metadata keys, what the PDP will read. This file is the contract for KUR-012/013.

Acceptance: Admin can create a set with at least two sizes and two colours; SCHEMA.md lists every field the storefront is allowed to show; sample prices are in the commercial band.

Out: not the PDP; not image hosting (009); not oversell test (008).

### KUR-008 — Variant inventory and oversell protection

| | |
|---|---|
| Effort cap | 4h |
| Priority | P0 |
| Depends on | KUR-007 |
| Kanban | t_3b39dc23 |

What we will do:

1. Stock lives on the **variant**, not the product. Colour “Soot” size M is a different number from size L.
2. Reservation/commit behaviour: adding to cart may reserve; payment success commits; failed/abandoned checkout releases. Exact Medusa inventory module behaviour documented in SCHEMA.md.
3. **Acceptance test**: variant stock = 1; two checkouts start at the same time; only one order can become paid; the other sees out-of-stock or payment refused. Evidence in the card comment (test output, not a story).
4. Out-of-stock variants cannot be added (API-level, not only CSS hiding the button).

Acceptance: the concurrent test is repeatable; Admin stock matches reality after both attempts.

Out: not a warehouse system; not multi-location; not preorders.

### KUR-009 — Image pipeline and sample catalogue

| | |
|---|---|
| Effort cap | 4h |
| Priority | P0 |
| Depends on | KUR-007 |
| Kanban | t_7e9b9e83 |

What we will do:

1. Images go to S3-compatible object storage (R2 planned; local MinIO or filesystem only for spike). Not git LFS, not VPS disk as the production story.
2. Pipeline: upload in Admin → stored object → URL on the product. Document max size, formats (JPEG/WebP), and that we do not run a paid image CDN without approval.
3. Seed a **sample catalogue** of a handful of sets so PLP/PDP have something to render. Placeholder or existing lookbook images are allowed. Attribution if stock photos.
4. Real photography is **out of the ₹50k software cap**. This card does not commission a shoot and does not block on one.

Acceptance: at least one product has a gallery of 2+ images served from the pipeline; seed script or Admin steps documented; no binary dump of a lookbook in git.

Out: retouching, model booking, paid Unsplash, CDN signup.

### KUR-010 — Admin RBAC and operator guide (P1)

| | |
|---|---|
| Effort cap | 4h |
| Priority | P1 |
| Depends on | KUR-005 |
| Kanban | t_5d808e45 |

Co-founders will not SSH. If Admin is unusable, fulfilment happens in Telegram screenshots.

What we will do:

1. Two roles at minimum: **owner** (users, secrets-adjacent settings, refunds) and **operations** (products, stock, pack, tracking). Exact Medusa invite/role mapping documented.
2. Write `docs/OPERATOR.md` in plain language: log in; add a set; change stock; mark packed/shipped; enter tracking; issue a refund; what to do when payment shows paid in Razorpay but not in Admin.
3. No custom reporting UI. Razorpay dashboard + Medusa order list + CSV if native.

Acceptance: a non-dev can follow OPERATOR.md without a terminal; roles exist; owner ≠ operations.

Out: BI dashboards, WhatsApp alerts, mobile admin app.

---

## EPIC-4 — Storefront

### What this epic is

This epic is **the house, as a website**. It is the only part a customer sees before checkout. It must look like Valoir (ink / ivory / gold, quiet, hangtag copy), not like a Medusa starter or a Shopify fashion theme. It must work on a phone.

When this epic is finished a customer can land, browse a collection, open a set, understand size / fabric / care / fit, pick an in-stock variant, and hold it in a cart that survives refresh. They cannot pay yet (that is EPIC-5). Policy pages exist as stubs.

### Why it is a separate epic

UI work expands to fill the calendar. Keeping it behind KUR-002/003 and behind a booted catalogue stops us from designing pages against imaginary fields, and stops Funnel `/root/valoir-site` from being overwritten “to see how it looks”.

### In this epic

- Design tokens, landing, nav, footer, policy stubs
- Collections / PLP with size or colour filter
- PDP: gallery, variant picker, size chart, fabric, care, fit
- Cart + guest/account session
- SEO / a11y / mobile performance (P1)

### Not in this epic

- Checkout, Razorpay, email, Admin (already exists)
- Replacing the Funnel landing on `valoir.taile13d7b.ts.net` unless you ask
- Wishlist, search-as-a-product, internationalization

### Done when

Phone-width walkthrough: landing → collection → PDP → add to cart → cart persists after refresh. Out-of-stock cannot add. Copy is luxury/opaque, not chivalric. Funnel origin still serves `/root/valoir-site`.

### KUR-011 — Storefront shell and design system

| | |
|---|---|
| Effort cap | 1–2 days |
| Priority | P0 |
| Depends on | KUR-003, KUR-005 |
| Kanban | t_9ec658b3 |

What we will do:

1. Next.js App Router storefront, **custom UI**. Steal tokens from the existing landing (ink / ivory / gold, Bodoni Moda + Plus Jakarta Sans or the same OFL pair). Do not ship Medusa starter chrome. Do not introduce knight/chivalric names in CSS or routes.
2. Global shell: header (wordmark, shop, about/contact as needed), footer (policies, contact), 404.
3. House **landing** in the storefront app. This is a second site in code, not a silent replace of Funnel. Bind it to a dev port, not `:8080`.
4. Policy **stubs** that must exist as routes even if copy is draft: privacy, terms, shipping, contact, FAQ. Returns page can wait for KUR-021 or be a stub here.
5. Brand lock enforced: grep for banned words in the storefront.

Acceptance: `/` renders at 390px width without horizontal scroll; nav and footer present; policy routes return 200; Funnel `/root/valoir-site` untouched.

Out: PLP/PDP content (012/013); checkout; production DNS.

### KUR-012 — Collections and PLP

| | |
|---|---|
| Effort cap | 1 day |
| Priority | P0 |
| Depends on | KUR-011, KUR-007 |
| Kanban | t_2a47411c |

What we will do:

1. Collection pages driven by Medusa collections/categories (e.g. the drop, or colour stories). Not hardcoded HTML products.
2. Product list card: image, name, price in INR, colourway hint. Price format `₹8,000`, not `$` or `Rs. 2450`.
3. Minimal filters: size, colour. No Algolia, no faceted search engine.
4. Empty and loading states. Sold-out badge from variant stock, not a manual flag if we can avoid it.

Acceptance: seeded catalogue from 007/009 appears; filter by size actually reduces the list; a missing collection is a clean empty state, not a crash.

Out: merchandising CMS, infinite scroll as a product, wishlist heart.

### KUR-013 — PDP (product detail)

| | |
|---|---|
| Effort cap | 1 day |
| Priority | P0 |
| Depends on | KUR-012 |
| Kanban | t_e641ea2c |

This page **is** the hangtag. If it only shows a photo and a price, the house is not on the internet yet.

What we will do:

1. Gallery (main + thumbs), variant picker (size, colour) that switches image when a colour image exists.
2. Size chart, fabric, care, fit — fields from SCHEMA.md, not lorem. If a field is empty, hide the section; do not print “TODO”.
3. Price of the selected variant. Add-to-cart enabled only when that variant is in stock. Out-of-stock: visible, not a silent disable.
4. Mobile: gallery swipeable or stacked; picker usable with a thumb; no hover-only information.

Acceptance: every SCHEMA.md customer-facing field has a place; cannot add stock=0; 390px usable.

Out: reviews, related-products ML, 3D/AR, size recommender.

### KUR-014 — Cart and session

| | |
|---|---|
| Effort cap | 1 day |
| Priority | P0 |
| Depends on | KUR-013 |
| Kanban | t_2f1eb6cb |

What we will do:

1. Cart line items are variants, with qty, line price, remove, update qty (cannot exceed stock).
2. **Guest cart** survives refresh (cookie/session via Medusa). Logging in merges or adopts the cart (document the chosen rule).
3. Account: email/password or whatever Medusa auth we enabled. No social login in MVP.
4. Cart drawer or page — one is enough. Empty cart state. No wishlist.

Acceptance: add on PDP → refresh → item still there; qty cannot exceed stock; guest path works without an account.

Out: save-for-later, abandoned-cart email (email comes in 018 for orders, not for carts).

### KUR-015 — SEO, accessibility, mobile performance (P1)

| | |
|---|---|
| Effort cap | 4h |
| Priority | P1 |
| Depends on | KUR-013 |
| Kanban | t_066f9750 |

What we will do:

1. Per-page title + description; Open Graph on PDP; `sitemap.xml` + `robots.txt`.
2. Images with width/height and alt from product name.
3. Keyboard access to picker and add-to-cart; contrast against ivory/ink; focus states.
4. Performance budget: PDP usable on a mid-range phone; no multi-megabyte hero without compression. Lighthouse as a guide, not a religion.

Acceptance: sitemap lists landing, collections, PDPs, policies; PDP has unique title; 390px still holds after gallery.

Out: blog, structured-data rabbit hole, AMP.

---

## EPIC-5 — Checkout, payments, fulfilment

### What this epic is

This epic is **the purchase**. Everything before it can be a lookbook. After it, money can move (in **test** mode) and a founder can pack a box.

When this epic is finished: a customer enters an India address, an order is created pending, Razorpay Checkout takes UPI/card/netbanking, a **signed webhook** (not the browser) marks the order paid, stock commits, a confirmation page and email go out, Admin can refund and can mark shipped with a tracking number. Returns are a **policy + operator process**, not a customer portal.

### Why it is a separate epic

Payments have a different failure mode from UI: silent double-charge, unsigned webhooks, oversell at pay time, keys in git. Isolating this epic lets KUR-017 be the kill-switch for Option A without dragging the whole storefront down with a plugin fight.

### In this epic

- India checkout + pending order
- Razorpay provider: order, Checkout, webhook HMAC on raw body, idempotent capture, amounts in paise
- Confirmation, history, email
- Refunds and failed payments
- Manual fulfilment + tracking
- Returns policy pages + operator steps (P1)

### Not in this epic

- Live Razorpay keys
- COD
- Shiprocket / Delhivery API
- Customer returns portal
- Reporting UI
- Storing PAN/CVV

### Done when

Staging (or local) test keys: pay, see confirmation, see order in Admin, refund, see stock restored or marked refunded, enter tracking. Replay of the same webhook does not double-pay. Browser “success” alone never marks an order paid.

### KUR-016 — Checkout: India address and order create

| | |
|---|---|
| Effort cap | 1 day |
| Priority | P0 |
| Depends on | KUR-014, KUR-007 |
| Kanban | t_2b15ea49 |

What we will do:

1. Checkout fields: email, phone, name, India address (line, city, **state**, PIN), guest or account. Phone is required (Razorpay wants contact; “same as shipping” must still send a number).
2. GST/invoice fields: implement what KUR-024 has already flagged as **technical** hooks; if 024 is not done, stub clearly labelled gaps rather than invent a GSTIN scheme.
3. Create a Medusa order (or payment session) in **pending** / not-paid. No charge yet.
4. Validate PIN/state enough to avoid empty addresses; do not build a full address-master database.
5. Failed validation stays on the page. No payment widget until the order/session exists server-side.

Acceptance: a guest with a Bengaluru address can create a pending order; refresh does not duplicate it; no Razorpay charge happens on this card.

Out: coupons engine (simple native discount only if already cheap); international address forms.

### KUR-017 — Razorpay: webhooks, verify, idempotency

| | |
|---|---|
| Effort cap | 1–2 days |
| Priority | P0 |
| Depends on | KUR-016 |
| Kanban | t_fbe69c8c |

Highest technical risk in the programme. Test mode only. No live keys.

What we will do:

1. In-repo Medusa payment provider `razorpay` implementing initiate / authorize / capture / refund against Razorpay Orders + Checkout. Amounts in **paise**, once (never ×100×100).
2. Server creates the Razorpay order; browser opens Checkout with that order id. Browser success is **ignored** as a source of truth.
3. Webhook path (Medusa convention `/hooks/payment/razorpay_razorpay` or the ADR’s path): HMAC on **raw body**, not on `JSON.parse` then re-stringify. Reject bad signatures.
4. Idempotency: unique Razorpay order id / payment id; replaying the webhook does not double-capture or double-stock-decrement.
5. Do not log PAN, CVV, full card, or raw secrets. Do not store cards.
6. **Kill criterion** (from KUR-003): if test UPI or card cannot complete the loop (create → Checkout → signed webhook → Medusa captured → refund) inside this card’s cap, stop, block remaining payment polish, propose Option B. Do not start a second week.

Acceptance: test payment in comment with ids (Razorpay test payment id + Medusa order id); replay test; refund test can live here or on 019 but capture must work here. Card comment includes “browser success without webhook does not mark paid”.

Out: live KYC, live keys, EMI, international cards, tokenised saved cards as a product.

### KUR-018 — Confirmation, history, email

| | |
|---|---|
| Effort cap | 4h |
| Priority | P0 |
| Depends on | KUR-017 |
| Kanban | t_4ee2a93e |

What we will do:

1. Confirmation page for a paid order: order id, items, address, “what happens next” (we pack, we email tracking). Failed/cancelled Checkout pages exist (from MVP.md).
2. Logged-in order history. Guest gets the confirmation page + email only (no magic order portal unless Medusa gives it cheaply).
3. Transactional email: order paid. Until you approve a paid provider, **log to console / file** or use Resend free tier if you have already approved that line in COST. No silent paid signup.
4. Do not send marketing mail.

Acceptance: paying in test lands on confirmation; a second visit to that URL still shows the order; an email or a captured log line exists for the same order id.

Out: SMS, WhatsApp, branded HTML newsletter.

### KUR-019 — Refunds and failed payments

| | |
|---|---|
| Effort cap | 4h |
| Priority | P0 |
| Depends on | KUR-017 |
| Kanban | t_b802198f |

What we will do:

1. Admin refund of a captured test order → Razorpay refund → Medusa order state updated. Document whether gateway fee is returned (assume not).
2. Failed / cancelled Checkout: order does not stay “paid”; stock released; customer sees a recoverable error.
3. Reconciliation notes in OPERATOR.md: if Razorpay says captured and Medusa says pending, what the operator does (do not “just mark paid” without the webhook signature path).
4. No partial-refund UI unless Medusa already makes it easy; full refund is enough for MVP.

Acceptance: one recorded test refund; one failed-payment path; operator note written.

Out: chargebacks product, automatic retry queue as a platform.

### KUR-020 — Manual fulfilment and tracking

| | |
|---|---|
| Effort cap | 4h |
| Priority | P0 |
| Depends on | KUR-018 |
| Kanban | t_f02c1496 |

First orders are packed by a person. An aggregator is later.

What we will do:

1. Admin statuses: at least packed / shipped (names per Medusa fulfillment). 
2. Tracking number field on the fulfillment. Carrier name as text (India Post / DTDC / whatever they used), not an API.
3. Customer notice: email (or log) with tracking when marked shipped.
4. OPERATOR.md steps: print/pack, enter tracking, send.

Acceptance: an order can go paid → shipped with a tracking string; customer-facing notice exists; no Shiprocket account.

Out: label printing integration, pickup scheduling, COD.

### KUR-021 — Returns policy and operator process (P1)

| | |
|---|---|
| Effort cap | 4h |
| Priority | P1 |
| Depends on | KUR-018 |
| Kanban | t_e1fe8006 |

What we will do:

1. Public pages: returns / exchange policy (draft copy you can edit). Shipping page already stubbed in 011, aligned here.
2. Operator process in OPERATOR.md: customer writes to contact email; operator decides; refund via 019 or replacement order; no self-serve portal.
3. Do not build return-merchandise authorisation software.

Acceptance: `/returns` (or equivalent) returns 200; operator steps written; no customer login flow for “start a return”.

Out: reverse-pickup API, warehouse returns queue.

---

## EPIC-6 — Security, compliance, quality

### What this epic is

This epic is **why a launch is not a demo**. A founder clicking through Checkout once is not evidence. Neither is a README that says “we should back up Postgres”.

When this epic is finished: sessions and rate limits exist, dependencies have been scanned, there is a command that buys and refunds in test without a human, India 2027 / GST / DPDP is a **checklist with questions for a CA/lawyer** (not a claim that we are compliant), and we have actually restored a backup once.

### Why it is a separate epic

If this work is “polish on the launch card”, it will be skipped. It is also mostly parallel: 024 can start after 002; 022 after checkout exists; 023 after pay+refund exist; 025 after backup notes exist.

### In this epic

- Auth, session hardening, rate limits, validation, dep scan
- Automated purchase + refund tests
- India e-commerce / GST / DPDP checklist
- Backup restore drill + rollback runbook

### Not in this epic

- Legal advice, CA work, GST registration, DPDP notice drafting by a lawyer
- A pentest firm
- Production monitoring SaaS without approval

### Done when

`npm test` (or documented equivalent) covers pay+refund; `docs/compliance.md` lists technical vs professional items; a restore has been performed and the notes say so with a date; secrets still not in git.

### KUR-022 — Auth, sessions, rate limits, dependency scan

| | |
|---|---|
| Effort cap | 1 day |
| Priority | P0 |
| Depends on | KUR-016 |
| Kanban | t_f1f6ac33 |

What we will do:

1. Cookie/session flags: Secure, HttpOnly, SameSite as appropriate behind Caddy TLS. Admin not exposed without auth.
2. Rate limit: checkout, login, webhook URL (webhook still must verify HMAC).
3. Input validation on address and qty (no negative qty, no 10k-char names).
4. Dependency scan (`npm audit` or `osv-scanner`) on the lockfiles; high/critical either fixed or waived in writing on the card.
5. Confirm we never log secrets or card data (grep + a note in threats.md).

Acceptance: unauthenticated Admin is denied; webhook with a bad signature is 4xx; audit output attached or waived.

Out: WAF purchase, bot management product, SSO.

### KUR-023 — Automated tests for purchase and refund

| | |
|---|---|
| Effort cap | 1 day |
| Priority | P0 |
| Depends on | KUR-017, KUR-019 |
| Kanban | t_6dca0f34 |

Launch gate needs a **command**, not a Loom.

What we will do:

1. Automated path: seed variant with stock → create cart → checkout → **simulate or test-mode pay** → order paid → refund → stock/order state asserted.
2. Webhook replay test: same event twice → one capture.
3. Oversell test from 008 kept green.
4. Document the exact command in README. CI runs it if credentials for Razorpay test can be injected as secrets (GitHub Actions secrets, not the board). If CI cannot hold secrets yet, the command still runs locally and 026 records the output.

Acceptance: one command, repeatable, exit 0; evidence pasted on the card.

Out: full Playwright suite of every marketing page; visual regression.

### KUR-024 — India e-commerce 2027 / GST / DPDP checklist

| | |
|---|---|
| Effort cap | 4h |
| Priority | P0 |
| Depends on | KUR-002 |
| Kanban | t_604255de |

Research card. **Not legal advice.** Can run in parallel as soon as 002 is approved.

What we will do:

1. Read, with dates, the January 2027 Indian e-commerce rule changes as publicly described, GST invoicing for online goods, DPDP obligations that a small house site might touch (privacy notice, consent, data minimisation, no card storage).
2. Split every item: **we can implement in code** vs **you need a CA/lawyer/GSTIN**. Examples of technical: invoice fields, privacy page, retention of order PII, not storing cards. Examples of professional: entity, GST registration, legal terms, grievance officer if required.
3. Write `docs/compliance.md` as a checklist with sources. Questions for the CA/lawyer listed at the bottom, unanswered.
4. Feed field requirements back into 016 if 016 has not started; if 016 already shipped, open a gap list rather than silently inventing GSTIN on the PDP.

Acceptance: checklist exists; every line is tagged technical vs professional; document says it is not legal advice.

Out: filing GST, drafting the real Terms of Sale, claiming “DPDP compliant” on the website.

### KUR-025 — Backup restore drill and rollback

| | |
|---|---|
| Effort cap | 4h |
| Priority | P0 |
| Depends on | KUR-006 |
| Kanban | t_a9d92dcd |

Notes are not a drill. This card restores once.

What we will do:

1. Take a `pg_dump` of the spike/staging DB. Store it where the runbook says (object storage or a dated file **outside git**).
2. Restore onto a throwaway database. Prove a known order or product reappears. Record command + timestamp on the card.
3. Rollback runbook: how to put the previous app version back (container tag / git SHA) and how to refuse a bad migrate.
4. Monitoring: process up, TLS, disk. Cheap: Caddy + a cron ping. No paid APM unless you approve.

Acceptance: restore evidence with date; runbook in `docs/runbook.md`; launch checklist in 026 can tick this.

Out: multi-region replica, PITR as a product for MVP.

---

## EPIC-7 — Launch

### What this epic is

This epic is **one gate**, not a marketing campaign. It exists so “we should go live” is a checklist you sign, not a feeling after a good demo.

When this epic is finished you have a written list of what is green, what you waived, what only you can still do (domain, GSTIN, live keys, photography, Funnel cutover), and a staging e2e that was run that day. The site is still not live until you say so.

### Why it is a separate epic

If launch is mixed into KUR-017, someone will put live keys in `.env` to “just try”. This card is Review-only. The worker cannot complete it.

### In this epic

- Staging end-to-end on test keys
- Launch checklist
- Explicit remaining human steps

### Not in this epic

- DNS, live Razorpay, Funnel cutover, domain purchase, announcing the shop
- Any of those without a separate yes from you

### Done when

You have approved the checklist (or waived lines in writing). Production still does not happen on this card.

### KUR-026 — Staging e2e and production launch checklist

| | |
|---|---|
| Effort cap | 1 day |
| Priority | P0 |
| Depends on | KUR-015, KUR-020, KUR-023, KUR-024, KUR-025 |
| Kanban | t_a7016323 |
| Worker | `kanban_request_review`. **Do not complete.** |

What we will do:

1. Run the full staging path the same day: browse → PDP → cart → pay (test) → confirmation → Admin fulfil with tracking → refund. Attach evidence (order ids, test command output, restore date from 025).
2. Write `docs/LAUNCH.md` checklist:

| Check | Evidence |
|---|---|
| Automated pay+refund command green | KUR-023 output |
| Oversell test green | KUR-008/023 |
| Webhook signature + replay | KUR-017 |
| Backup restored once | KUR-025 date |
| Compliance checklist reviewed (not “we are legal”) | KUR-024 |
| No live keys in git | grep |
| Funnel landing still independent | `/root/valoir-site` |
| Brand lock (no chivalric) | grep |
| OPERATOR.md usable | 010/020 |
| Hosting is not this Hermes VPS | ADR |

3. Remaining **human** steps, not done by the worker: domain name and buy; DNS; GitHub private if still public; Razorpay KYC + live keys; GSTIN / entity; photography decision; who is Admin owner; whether to cut Funnel to the storefront; production VPS purchase.

Acceptance: LAUNCH.md committed; card in Review; every remaining human step listed; **no DNS change, no live key, no Funnel cutover** on this card.

Your job: tick or waive, then give a separate explicit yes for each irreversible step.

---

## What “done” means for the whole programme (MVP)

A customer on a phone can browse a collection, understand a set’s size/fabric/care/fit, add an in-stock variant, check out with an India address, pay in Razorpay **test** mode, and see a confirmation. A founder can fulfil and refund in Admin without SSH. We have restored a backup once. Live money, live DNS, and photography are still your calls.

That is the end of KUR-001…026. Wishlist, Shiprocket, WhatsApp, custom reporting, international, and a returns portal are **not** how this programme finishes. They are later programmes.

---

## What is blocked on you

| Gate | Task | You do |
|---|---|---|
| Architecture / MVP / money | KUR-002 | Approve A (or force B), brand lock, answer the numbered questions |
| GitHub visibility | before app secrets | Make `kurtha_initial_website` private; do not paste tokens |
| Paid services | any | Explicit yes per signup |
| Domain, DNS, live Razorpay, Funnel cutover | after KUR-026 | Explicit yes per action |
| Photography, GSTIN, legal entity | parallel, not software | Your envelope, not the ₹50k software cap |
