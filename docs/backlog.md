# Backlog

Board: `valoir-shop`. IDs in `/root/valoir-shop/TASK_IDS.json`. Status here is the execution view as of 2026-10-24.

Priority: P0 launch blockers, P1 launch quality, P2 polish, P3 experiments (frozen).

| ID | Title | P | Deps | Status | Evidence |
|---|---|---|---|---|---|
| KUR-001 | Inspect | P0 | — | done | `/root/valoir-shop/INSPECT.md` |
| KUR-002 | Architecture/MVP/cost | P0 | 001 | done (approved) | ARCHITECTURE.md, MVP.md, COST.md |
| KUR-003 | PRD, ADRs, threats | P0 | 002 | in progress | `docs/prd.md`, `docs/adrs.md`, `docs/threats.md`, `docs/deferred.md`, `docs/research.md` |
| KUR-004 | Repo layout, env | P0 | 003 | next | `.env.example`, `storefront/` |
| KUR-005 | Boot Medusa+Postgres | P0 | 004 | blocked on Node 22 + Docker/Postgres on this host | |
| KUR-006 | CI stubs | P1 | 005 | todo | |
| KUR-007 | Product model | P0 | 005 | sample catalogue in storefront meantime | |
| KUR-008 | Oversell | P0 | 007 | todo | |
| KUR-009 | Images | P0 | 007 | placeholders | `docs/asset-inventory.md` |
| KUR-010 | Operator guide | P1 | 005 | todo | |
| KUR-011 | Storefront shell | P0 | 003, 005 | implementing against sample adapter | |
| KUR-012 | PLP | P0 | 011, 007 | implementing | |
| KUR-013 | PDP | P0 | 012 | implementing | |
| KUR-014 | Cart | P0 | 013 | implementing (local adapter) | |
| KUR-015 | SEO/a11y | P1 | 013 | partial with pages | |
| KUR-016–026 | Checkout → launch | P0/P1 | chain | not started; no live keys | |

Acceptance for the current increment: Next.js storefront builds, core pages render, sample banner visible, no secrets, Funnel `:8080` untouched.
