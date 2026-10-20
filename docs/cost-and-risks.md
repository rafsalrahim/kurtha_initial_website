# Cost and risks

Numbers below are **planning fences**, not a quote. KUR-002 must replace this with dated official prices.

## Cash cap

Initial **cash** ≤ ₹50,000.

That is for software/hosting/domain-like spend you write a cheque for before the first order. It is **not**:

- Razorpay % (that is per order)
- Product photography
- Fabric, tailoring, inventory
- Paid fonts if we cannot use the prototype stack
- A year of bloated managed services

Photography is the likely breaker. Treat it as a separate human budget.

## Recurring (flag, do not hide inside the ₹50k)

| Line | Nature | Notes |
|------|--------|-------|
| Domain renewal | Annual | Buy only after you pick the name |
| VPS / app host | Monthly | Commercial ToS required. Hobby plans often forbid checkout |
| Postgres | Monthly or bundled on VPS | |
| Object storage + bandwidth | Usage | Images |
| Email API | Usage | Not until you approve |
| Razorpay | % + GST on GMV | Estimate in KUR-002 at ₹6k / ₹8k / ₹10k AOV |
| Hermes / AI tools | Optional | Not required to run the shop in production |

## Three scenarios KUR-002 must fill

1. Development and testing (this box + test Razorpay) — should be near ₹0 cash if we use what we already have
2. Initial production, low volume
3. Growth (more images, more orders, still one app)

Each line: verified price vs estimate, currency, billing period, date of research.

## Risks (ordered)

1. **Medusa v2 × Razorpay** — if the plugin does not exist or lags, cut to Option B before writing UI
2. **Node 26 vs LTS** — Medusa/Next may refuse this runtime; install Node 22 for the shop
3. **No Docker / Postgres / compiler on the agent VPS** — KUR-005 is blocked until installed or we develop elsewhere
4. **Hosting ToS** — free tiers are not a production plan
5. **2 vCPU / 8 GiB shared with Hermes** — do not assume this Hostinger box is the shop
6. **Empty public repo** — make private before app secrets exist
7. **Funnel 502** — public URL looks live and is not; do not confuse it with the shop
8. **Draft landing prices** — ₹2.4k–₹3.8k vs ₹6k–₹10k commercial band
9. **Brand language** — brief said chivalric; house rule is luxury/opaque
10. **Compliance** — KUR-024 is a checklist, not a lawyer
11. **Secrets in chat or kanban** — already happened once; rotate; never again
12. **Scope creep** — custom reporting, wishlist, WhatsApp will eat the cap and the calendar

## Smallest cuts if something blows

| If this fails | Cut |
|---------------|-----|
| Medusa + Razorpay | Option B thin order service |
| Hosting too expensive | Single small commercial VPS, Postgres on the same box |
| Email paid | Log + Razorpay receipt until approved |
| Images | Placeholders / existing lookbook with attribution until a shoot |
| Time | Drop P1 (KUR-006 polish, 010 polish, 015, 021) after a written waiver — not the money path |

## You must approve before money leaves

- Any paid signup
- Domain
- Live Razorpay keys
- DNS
- Production deploy
- Funnel cutover
