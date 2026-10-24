# Valoir shop

Premium men’s kurta house. India first. Planned ₹6,000–₹10,000 per set.

This repository is now **docs + a sample storefront**. It is not a live shop.

## Layout

| Path | What |
|---|---|
| `docs/` | Research, ADRs, PRD, design system, backlog |
| `storefront/` | Next.js 15 house UI, sample catalogue |
| `backend/` | Reserved for Medusa (not booted) |
| `.env.example` | Names only |

## Run the storefront

```
cd storefront && npm install && npm run dev
```

Open http://127.0.0.1:3000. Do **not** point Funnel at it. Funnel stays on `/root/valoir-site`.

## Locked decisions

- Stack A: Medusa v2.21 + Next.js + Postgres + in-repo Razorpay. `docs/adrs.md`
- Voice: luxury / hangtag. No knight language.
- No live payments, DNS, or production VPS without a later yes.
- GitHub repo should be made **private** off-board (it was public when empty).

## Status 2026-10-24

KUR-001 and KUR-002 done. Storefront shell (KUR-011–014) is running against sample data. Medusa boot (KUR-005) is blocked on Node 22 + Postgres/Docker on this agent box.
