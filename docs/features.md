# Feature list

Mapped to KUR tasks. P0 = needed for first real purchase. P1 = should exist near launch but must not block the money path.

## MVP — in

### Storefront (customer)

| Feature | Priority | Task | Notes |
|---------|----------|------|-------|
| House landing (not a theme clone) | P0 | KUR-011 | Luxury / opaque language. Do not use knight names |
| Policy stubs (privacy, terms, shipping, contact, FAQ) | P0 | KUR-011 | Copy can be draft; pages must exist |
| Collections / PLP + size or colour filter | P0 | KUR-012 | From Medusa catalogue |
| PDP: gallery, variants, size chart, fabric, care, fit | P0 | KUR-013 | This is the hangtag on the web |
| Cart (guest + account) | P0 | KUR-014 | No wishlist |
| Checkout, India address, order create | P0 | KUR-016 | GST fields if KUR-024 says so, else stub the gap |
| Razorpay test payments | P0 | KUR-017 | Server verify + webhooks + idempotency |
| Order confirmation + history | P0 | KUR-018 | |
| Returns / exchange **pages** | P1 | KUR-021 | No customer portal |
| SEO, a11y, mobile performance | P1 | KUR-015 | PDP must work at 390px width |

### Commerce / admin

| Feature | Priority | Task | Notes |
|---------|----------|------|-------|
| Kurta-set product model | P0 | KUR-007 | Size × colour, fabric/care/fit |
| Variant inventory, no oversell | P0 | KUR-008 | Concurrent checkout test |
| Image pipeline + sample catalogue | P0 | KUR-009 | Placeholders OK. Real photos are a human cost |
| Medusa Admin boot | P0 | KUR-005 | |
| Operator guide + two roles | P1 | KUR-010 | Non-dev co-founders |
| Manual fulfilment + tracking number | P0 | KUR-020 | No Shiprocket |
| Refunds + failed payment handling | P0 | KUR-019 | Test mode |
| Email notification path | P0 | KUR-018 | Console/log until you approve a paid provider |

### Quality / launch

| Feature | Priority | Task |
|---------|----------|------|
| Auth, sessions, rate limits, dep scan | P0 | KUR-022 |
| Automated purchase + refund tests | P0 | KUR-023 |
| India 2027 / GST / DPDP checklist | P0 | KUR-024 |
| Backup restore drill + rollback | P0 | KUR-025 |
| Staging e2e + launch checklist | P0 | KUR-026 |

## Explicitly later (not MVP)

| Feature | Why later |
|---------|-----------|
| Wishlist | Not on the purchase path |
| Shipping aggregator (Shiprocket etc.) | Manual ship is enough for first orders |
| WhatsApp / SMS | Email (or log) first; paid messaging needs approval |
| Custom reporting / BI admin | Medusa Admin + CSV is enough |
| International checkout / FX | India first |
| Customer returns portal | Policy + operator process first |
| Heavy promotions engine | Simple discounts if Medusa already has them; no custom engine |
| Replacing Funnel landing automatically | Only when you say so |

## Prototype vs this plan

The existing Funnel site (`valoir-site`) already has:

- Lookbook photography (stock)
- Client-side cart drawer
- “Checkout — coming”
- Draft SKUs at ₹2,450–₹3,850

That prototype is **brand research**, not the shop. Prices, checkout, and catalogue will be rebuilt against Medusa at the ₹6k–₹10k band.

## Success for MVP

A customer on a phone can:

1. Browse a collection
2. Open a PDP and understand size / fabric / care
3. Add a variant that is in stock
4. Check out with an India address
5. Pay in Razorpay **test** mode
6. See a confirmation
7. A founder can fulfil and refund in Admin without SSH

Anything else waits.
