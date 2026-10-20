# Architecture — processes, data, and how Postgres is connected

Visual: [html/architecture.html](html/architecture.html) (system diagram + database connection diagram).

Option A is the locked stack (KUR-002): **Medusa v2.21.x + Next.js storefront + PostgreSQL + an in-repo Razorpay provider, on a dedicated commercial VPS.** Option B remains the kill-switch if test-mode Razorpay cannot complete during KUR-017. Domain, DNS, paid VPS, and live keys still need a later explicit yes.

This file is the detailed architecture. It is not application code. Nothing here opens a port or creates a database.

---

## One-sentence picture

A customer never talks to the database. The Next.js website never talks to the database. Founders in Admin never talk to the database. **Only the Medusa Node process opens PostgreSQL.** Images live in object storage. Card numbers never enter our machines.

---

## The boxes, and what each one is allowed to do

Production (after a later host purchase) is **one VPS**, not a cluster.

| Process | Bind | Job | Talks to Postgres? |
|---|---|---|---|
| Caddy | `:443` (public), `:80` redirect | TLS (Let’s Encrypt). Reverse-proxy only. Does not run shop logic. | **No** |
| Next.js storefront | `127.0.0.1:3000` | House UI: landing, collections, PDP, cart, checkout pages. Server-side render + client cart. | **No** |
| Medusa API + Admin | `127.0.0.1:9000` | Catalogue, cart, checkout, customers, orders, refunds, inventory. Admin UI at `/app`. | **Yes — the only client** |
| PostgreSQL 16+ | `127.0.0.1:5432` | System of record. All durable shop data. | Itself |
| Cloudflare R2 | cloud, S3 API | Product image bytes. Not SQL. | No |
| Razorpay | cloud | Checkout + money movement. We never see PAN/CVV. | No |
| Email (Resend or log) | cloud or stdout | Order paid / shipped notices. | No |

Not on this box: Kubernetes, a second “database server”, Redis (optional later if Admin is slow), this Hermes VPS (`srv2023249`) as production, Funnel `:8080` as the shop.

```
Internet
  │
  │ HTTPS :443
  ▼
Caddy  (TLS, reverse proxy)
  ├─ /            → Next.js :3000     (customers)
  ├─ /app         → Medusa  :9000     (founders, Admin)
  ├─ /store, /hooks → Medusa :9000    (Store API + Razorpay webhooks)
  │
  Next.js ── HTTP (JS SDK / REST) ──► Medusa
                                       │
                                       │ DATABASE_URL
                                       │ postgres://…@127.0.0.1:5432/valoir
                                       ▼
                                   PostgreSQL
                                       ▲
                                   nobody else
```

Medusa Admin is **not** a separate backend. It is a web UI served by the same Medusa process, talking to the same API, which then talks to Postgres. Founders do not get a `psql` login.

---

## Database connection — the whole path

### Who holds the connection string

One environment variable, on the **Medusa** process only:

```
DATABASE_URL=postgres://valoir:<password>@127.0.0.1:5432/valoir
```

Names, not secrets, also live in `.env.example` (KUR-004). The real password is never in git, never on kanban, never in chat.

| App | Has `DATABASE_URL`? | Has a Postgres driver? |
|---|---|---|
| Medusa | Yes | Yes (Medusa v2 / MikroORM → `pg`) |
| Next.js | **No** | **No** |
| Caddy | No | No |
| Browser | No | No |
| Medusa Admin (browser) | No | No — it calls Medusa HTTP |
| Razorpay | No | No |
| R2 | No | No |

If a storefront env file ever contains `DATABASE_URL`, that is a bug. The storefront’s backend URL looks like this instead:

```
MEDUSA_BACKEND_URL=http://127.0.0.1:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_…
```

That is an **HTTP** credential, not a database login. It can only do what the Store API allows (read catalogue, manage *this* cart, place *this* order). It cannot `SELECT` arbitrary tables.

### Network: Postgres is not on the internet

Postgres listens on **localhost only** (`listen_addresses = 127.0.0.1`, or a Docker bridge that Caddy/Next are not on).

| Path | Allowed? |
|---|---|
| Medusa → `127.0.0.1:5432` | Yes. This is the only path. |
| Next.js → `:5432` | No. Next.js has no client and no route. |
| Caddy → `:5432` | No. Caddy does not proxy 5432. |
| WAN / Tailscale → `:5432` | **No.** UFW default deny. 80/443 only on the shop VPS. |
| Founder laptop `psql` over the internet | No. Operators use Admin in a browser. |

Same-box Postgres is a deliberate MVP choice (cost + ops). We are **not** using a managed Postgres in year one unless KUR-002’s host decision is later overridden. Because it is same-box, TLS-to-Postgres is not required; the socket never leaves the machine. The public TLS is Caddy → browsers.

This Hermes agent VPS is **not** that shop box. Local spike (KUR-005) may run Docker Postgres on the agent machine for development. That is still `127.0.0.1` inside the spike, still not production.

### How Medusa actually opens it

On boot Medusa reads `DATABASE_URL`, creates a **connection pool** (one Node process, several borrowed TCP connections, default pool size on the order of 10 — not a connection per HTTP request, not PgBouncer at MVP volume). Each Store/Admin request that needs data: borrow connection → query → release.

There is no second pool in Next.js. There is no Prisma in the storefront. There is no `pg` import in the storefront.

If Medusa is down, the website can still *render* chrome, but catalogue, cart, and checkout fail. That is correct: the storefront is not allowed to cache a shadow copy of orders in its own DB, because it does not have one.

### Migrations — who is allowed to change tables

Medusa owns the schema.

1. We pin `@medusajs/medusa` (working pin 2.21.x).
2. `medusa db:migrate` (or the compose equivalent) runs Medusa’s migrations against `valoir`.
3. Our extra fields (fabric, care, fit, size chart) go on Medusa product **metadata / attributes**, not on random new databases. Locked in KUR-007 `SCHEMA.md`.
4. Next.js never runs a migration.

We do not hand-edit production tables. We do not point two Medusa versions at one DB.

### What lives in Postgres vs what does not

**In PostgreSQL (system of record):**

- Products (named kurta sets) and variants (size × colour)
- Options, metadata: fabric, care, fit, size chart
- Inventory levels per variant
- Carts and line items (guest cart id is a cookie; the rows are in Postgres)
- Customers / auth identities (emails, password hashes — not cards)
- Orders, payments, refunds, fulfillments, tracking number
- Regions, sales channels, API keys (hashed)
- Our Razorpay order id / payment id on the payment session (for idempotency)

**Not in PostgreSQL:**

- Image **files** — object storage (R2). Postgres stores the URL / file id only.
- Card numbers, CVV, expiry — Razorpay only. Storing them is out of scope and illegal for us.
- Next.js page cache — memory / Next cache, disposable.
- TLS certificates — Caddy.
- Backups at rest — `pg_dump` files in R2 (KUR-025), not git.

### Pooling, load, and what we are not building

MVP volume is tens-to-low-hundreds of orders, not a marketplace. One Medusa process + one Postgres on a KVM 4 is the plan. We do not put PgBouncer, read replicas, or “Postgres in another region” on the board. If Admin search feels slow, Redis is the first optional add-on (still not a second source of truth).

### Backup and restore (the database’s other connection)

Daily `pg_dump` of `valoir` to R2 (KUR-006 notes, KUR-025 drill). Restore is: create empty DB → apply dump → boot Medusa against it. Next.js does not participate. Launch is blocked until a restore has been **done once**, not until a README mentions dumps.

---

## How the storefront talks to Medusa (HTTP, not SQL)

Next.js uses Medusa’s JS SDK / REST against `MEDUSA_BACKEND_URL`.

Typical calls:

| Customer action | Storefront does | Medusa does | Postgres |
|---|---|---|---|
| Open collection | `GET /store/products` (filtered) | Read products + variants + stock | `SELECT` |
| Open PDP | `GET /store/products/:id` | Read set + variants + metadata + images | `SELECT` |
| Add to cart | `POST /store/carts/.../line-items` | Create/update cart row, check stock | `INSERT/UPDATE` |
| Refresh page | Send cart cookie / id | Load that cart | `SELECT` |
| Start checkout | `POST` cart → address + email + phone | Update cart, create payment session | `UPDATE` |
| Pay | Open Razorpay Checkout with **server-created** order id | Create Razorpay order via our provider | `INSERT` payment session |
| “Thank you” | `GET /store/orders/...` | Return order **if paid** | `SELECT` |

Publishable key: public, in the browser, scoped to the Store API. It cannot hit Admin routes, cannot dump the customer table, cannot set stock.

Any **server** Next.js route we add (e.g. to keep secrets off the client) still talks HTTP to Medusa. It still does not get `DATABASE_URL`.

---

## How Admin talks to the database (it doesn’t)

Founder browser → Caddy `/app` → Medusa Admin JS → Medusa Admin API → Postgres.

Same Medusa process, different route prefix, different cookie, **role** (owner vs operations, KUR-010).

What founders do in Admin that becomes SQL:

- Create a kurta set and variants → product / variant rows
- Set stock on size M / colour Soot → inventory level row
- Upload an image → file module writes **bytes to R2**, URL into Postgres
- Mark shipped + tracking → fulfillment row
- Refund → payment refund row + Razorpay API call

They never see `DATABASE_URL`. OPERATOR.md is the interface, not `psql`.

---

## Money path (why the browser is not trusted)

This is the architecture that KUR-017 must implement. If it cannot, we switch to Option B; we do not “just mark paid”.

1. Checkout page collects India address, email, phone. Next.js sends them to Medusa. Medusa writes a **pending** order / payment session. **No charge.**
2. Medusa’s Razorpay provider calls Razorpay `orders` API with amount in **paise** (once, never ×100×100). Razorpay returns `order_id`. That id is stored on the payment session in Postgres.
3. Browser opens Razorpay Checkout with that `order_id`. Customer pays UPI/card/netbanking **on Razorpay’s page**. PAN/CVV never hit Next.js or Medusa.
4. Browser may redirect to `/confirmation`. That page is **not** allowed to mark the order paid.
5. Razorpay sends a **signed webhook** to `https://<shop>/hooks/payment/razorpay_razorpay` (Caddy → Medusa). Medusa verifies HMAC on the **raw body**. On success: order captured, stock committed, same Razorpay payment id cannot capture twice (unique constraint / idempotency key in Postgres).
6. Confirmation page then reads the order and finds it paid. Email fires (or logs, until you approve a provider).

Replay of the same webhook: one capture. Forged webhook: 4xx. Browser `?razorpay_payment_id=` without a valid webhook: order stays pending.

Refund: Admin button → Medusa → Razorpay refund API → payment row updated. Not a SQL `UPDATE status='refunded'` by a human.

---

## Product model the database must support

A T-shirt schema will break the PDP. Locked in KUR-007.

**Product** (one row per named set): title, story, fabric, care, fit notes, size chart, gallery.

**Variant** (one row per sellable SKU): size × colour (optional fit), INR price in the ₹6,000–₹10,000 band, SKU.

**Inventory**: integer on the variant, not on the product. Concurrent checkout of stock=1 → one paid order (KUR-008).

**Images**: bytes in R2; product/variant holds the file id or URL.

Draft Funnel prices ₹2,450–₹3,850 are **not** loaded as the offer.

---

## Secrets and env (names only)

| Variable | Lives on | Purpose |
|---|---|---|
| `DATABASE_URL` | Medusa | Postgres login |
| `JWT_SECRET` / `COOKIE_SECRET` | Medusa | Session signing |
| `RAZORPAY_KEY_ID` | Medusa (id may be public in Checkout) | Razorpay |
| `RAZORPAY_KEY_SECRET` | Medusa only | Razorpay API |
| `RAZORPAY_WEBHOOK_SECRET` | Medusa only | HMAC |
| `S3_*` / R2 keys | Medusa file module | Images |
| `RESEND_API_KEY` | Medusa (after you approve) | Mail |
| `MEDUSA_BACKEND_URL` | Next.js | HTTP to Medusa |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Next.js (public) | Store API |

Production `.env` is on the shop VPS, mode `600`, not in this repo.

---

## Environments

| Env | Postgres | Razorpay | Who |
|---|---|---|---|
| Local spike (KUR-005) | Docker or native on the **agent** box, localhost | Test keys if present, else provider stub | Developers |
| Staging | Second database or compose project on the **future shop VPS** | Test keys | Launch proof |
| Production | `valoir` on the shop VPS, localhost | Live keys only after KUR-026 + you | Customers |

Same code. Different env files. Staging is not a second paid host in year one. This Hermes box is not production.

---

## Ports and firewall (shop VPS, once it exists)

| Port | Public? |
|---|---|
| 80 / 443 | Yes (Caddy) |
| 3000, 9000 | No — localhost, Caddy proxies |
| 5432 | No — localhost |
| 22 | Admin only, key auth, not password; not a shop feature |
| 8080 | Unused by the shop. Funnel landing stays on the Hermes box until you cut over |

UFW: default deny in, allow 80/443. Postgres not in the allow list.

---

## Option B — only if A’s kill criterion fires

If KUR-017 cannot complete test pay → signed webhook → captured → refund, we stop using Medusa as the engine.

Then: Next.js still has **no** customer-facing SQL for fun; a small order service **does** get `DATABASE_URL` (we would write that service). We would also have to write a tiny Admin. Postgres remains localhost. Razorpay remains the processor. The connection rule is the same: **one backend process talks to Postgres; the browser does not.**

We do not run A and B against the same database.

---

## What this architecture refuses

- Next.js `prisma` / `pg` / `drizzle` against shop orders
- Prisma in the storefront “just for the blog”
- Exposing `:5432` on WAN or Tailscale “so I can inspect”
- Storing cards “for faster checkout”
- Shopify/Woo as system of record
- Vercel Hobby (ToS forbids commercial checkout)
- Production on the Hermes 2 vCPU box
- Kubernetes, multi-region, a data warehouse
- Funnel `valoir.taile13d7b.ts.net` silently becoming the shop
