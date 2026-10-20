# Kanban map

Board slug: **valoir-shop**
Dashboard: http://valoir:9119 (Tailscale). Switch the board dropdown to **Valoir Shop**.
Do not use the **Ideas** board for this work (that board runs council, not build).

## IDs

| Key | Task id |
|-----|---------|
| EPIC-1 | t_343f763f |
| EPIC-2 | t_31e74302 |
| EPIC-3 | t_1c95cb60 |
| EPIC-4 | t_3af65914 |
| EPIC-5 | t_149082da |
| EPIC-6 | t_ad0f5d23 |
| EPIC-7 | t_080e42dd |
| KUR-001 | t_e3824947 |
| KUR-002 | t_b1ed39e5 |
| KUR-003 | t_a8afa09e |
| KUR-004 | t_5d8417be |
| KUR-005 | t_d985df86 |
| KUR-006 | t_24f4de32 |
| KUR-007 | t_fa23c6d5 |
| KUR-008 | t_3b39dc23 |
| KUR-009 | t_7e9b9e83 |
| KUR-010 | t_5d808e45 |
| KUR-011 | t_9ec658b3 |
| KUR-012 | t_2a47411c |
| KUR-013 | t_e641ea2c |
| KUR-014 | t_2f1eb6cb |
| KUR-015 | t_066f9750 |
| KUR-016 | t_2b15ea49 |
| KUR-017 | t_fbe69c8c |
| KUR-018 | t_4ee2a93e |
| KUR-019 | t_b802198f |
| KUR-020 | t_f02c1496 |
| KUR-021 | t_e1fe8006 |
| KUR-022 | t_f1f6ac33 |
| KUR-023 | t_6dca0f34 |
| KUR-024 | t_604255de |
| KUR-025 | t_a9d92dcd |
| KUR-026 | t_a7016323 |

Epic containers are **blocked** on purpose (not executable).

## Dispatch rules we set

- Only KUR-001 started immediately (inspect — completed)
- KUR-002 is assigned and waits on 001, then **Review** for you
- KUR-003…026 stay unassigned so storefront cannot start until you approve 002

## Critical path

001 → 002 (you) → 003 → 004 → 005 → 007 → 011 → 012 → 013 → 014 → 016 → 017 → 018 → 023 → 026

## Telegram (ideas only)

Shop work is this board. Idea dumps:

`/kanban --board ideas create --assignee default --skill idea-inbox "title"`

Type the full line even if Telegram’s slash menu does not list `/kanban`.
