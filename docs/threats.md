# Threat checklist (not a pentest)

| ID | Threat | Mitigation now | Later |
|---|---|---|---|
| T1 | Webhook forgery | HMAC on raw body; ignore JSON-parsed body | KUR-017 |
| T2 | Replay | Idempotency key = Razorpay payment id unique in Postgres | KUR-017 |
| T3 | Oversell | Decrement in the same transaction as capture | KUR-008 |
| T4 | Secret leakage | `.env` gitignored; `.env.example` names only; public GitHub should be made private off-board | KUR-004 |
| T5 | Admin session | Medusa Admin only on `/app`; not on Funnel | KUR-010 |
| T6 | Public-repo secrets | No keys in this repo. Human: make `kurtha_initial_website` private | off-board |
| T7 | Card data | Never touch PAN/CVV; Razorpay Checkout hosted | ADR-0004 |
| T8 | Dependency CVE | `npm audit` in CI once CI exists | KUR-022 |
| T9 | Sample/real confusion | SAMPLE banner until Medusa + real photos | storefront |
| T10 | Agent box as shop | Do not expose Medusa/Postgres on WAN/Funnel | ADR-0005 |
