# Almost Divine

Vite + React prototype for a premium men’s kurta house.

Not a live shop. Prices, copy, and stills are draft. Checkout is disabled.

## Run

```bash
cd almost-divine
npm install
npm run dev
```

Dev server: http://127.0.0.1:8081

Production:

```bash
npm run build
python3 serve.py
```

`serve.py` binds `0.0.0.0:8081`, sends `Cache-Control: no-store`, and falls unknown paths back to `index.html` so `/shop` works.

Do not point Tailscale Funnel at this app unless this brand should replace the live root. On the agent box it is served on port 8081; Valoir Funnel stays on `:8080`.

## Stack

- React 19 + Vite 8
- React Router 7
- Framer Motion 14
- No backend. Catalogue is `src/data.js`.

## Pages

| Path | What |
|---|---|
| `/` | Five sticky full-bleed campaign banners |
| `/shop` | Two-column listing + collection deck |
| `/shop/:id` | PDP: gallery, size, fabric, fit, care |
| `/about` | Short house copy |

Cart, search, and menu are overlays. Escape closes them.

## Images

Stills in `public/img/` are licensed Pexels/Unsplash downloads plus a few already-cleared product crops. They are placeholders, not house photography. Do not hotlink Almost Gods CDN files.
