# Valoir shop — planning docs

Valoir is a premium men's kurta house (India first, ₹6,000–₹10,000 per set). This repository currently holds **the plan**, not the storefront.

There is no application code yet. The GitHub repo was empty on 2026-10-20. Implementation is gated on **KUR-002** (architecture / MVP / cost) being approved by Rafsal.

## Read this first

| File | What it is |
|------|------------|
| [docs/overview.md](docs/overview.md) | Why this shape, constraints, what we will not do yet |
| [docs/architecture.md](docs/architecture.md) | Processes, Postgres connection, data flows |
| [docs/html/architecture.html](docs/html/architecture.html) | Visual: system + database connection diagrams |
| [docs/features.md](docs/features.md) | MVP vs later, mapped to tasks |
| [docs/epics.md](docs/epics.md) | Full epic plans: what each epic is, every KUR task in detail |
| [docs/html/epics.html](docs/html/epics.html) | Same, readable HTML |
| [docs/html/features.html](docs/html/features.html) | Feature list as HTML |
| [docs/html/index.html](docs/html/index.html) | HTML hub |
| [docs/cost-and-risks.md](docs/cost-and-risks.md) | ₹50k cash cap, recurring vs cash, risks |
| [docs/kanban.md](docs/kanban.md) | Board map, IDs, critical path |

Open `docs/html/index.html` locally if you want one place to click through.

## Status

- Kanban board: `valoir-shop` (not the Ideas board)
- Tasks: KUR-001 … KUR-026 plus 7 epic containers
- KUR-001 inspect: done
- Next: KUR-002 — you approve before any storefront or payment work

## Rules

- No purchases, DNS, production deploy, or real payments without explicit approval
- Secrets never go in this repo, in chat, or on the kanban board
- Existing Funnel landing (`valoir-site`) is not this project and must not be overwritten blindly
