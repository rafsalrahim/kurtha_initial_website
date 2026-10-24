# Valoir storefront

Next.js App Router house UI. Sample catalogue only. Does not talk to Postgres.

```
cd storefront
npm install
npm run dev    # :3000 — not Funnel, not :8080
npm run build
npm test
```

Node 22 or 24 LTS is the pin (`.nvmrc`). Hermes Node 26 may run the storefront; it must not run Medusa.

`NEXT_PUBLIC_CATALOGUE_MODE=SAMPLE` until Medusa Store API is wired. Checkout is a documented boundary: no charges.

Do not bind `:8080`. Do not replace `/root/valoir-site`.
