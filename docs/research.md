# Design research — Valoir storefront

Fetched 2026-10-24. Principles only. Do not copy layouts, copy, photography, or brand marks.

Inspected via live HTML extract. Screenshots were not required for the matrix. Limitations called out per source.

Creative mix (posture, not collage): 40% The Row restraint, 25% ZEGNA masculine editorial, 20% Raw Mango material identity, 15% Jacquemus composition surprise. Brand voice stays luxury / opaque / hangtag (ADR-0002). The brief’s “chivalry” section is interpreted as character, dignity, integrity, confidence — banned words stay banned.

## Matrix

### MR PORTER — https://www.mrporter.com/

- **First screen:** Full-bleed campaign film/still (“Made to weather it”), one seasonal line, one Shop now. Then a dense “What’s new today” product rail (brand name as the card title).
- **Nav / type / colour:** Department-store chrome. High product density. Editorial journal below the fold.
- **Shop:** 3:4 crop rails, brand-first cards, live shopping + messenger widgets.
- **Transfer:** Editorial hero → product rail → journal. One primary CTA. Product photography as the interface.
- **Risk:** Multi-brand density, trend widgets, chat, Doubleclick. Wrong for a five-person house with eight sets. Do not clone the rail-of-399-new-SKUs.

### COS — https://www.cos.com/

- **First screen:** Gender split (Shop Women / Shop Men) with campaign photography. Cookie wall before shopping.
- **Transfer:** Campaign photography as the only first-screen content. Quiet merchandising.
- **Risk:** Gender-split homepage is wrong (men’s only). Cookie-wall-before-content is a conversion tax — keep consent later and quiet. Extract was consent-gated; campaign art direction confirmed, inner pages not fully walked.

### Aesop — https://www.aesop.com/

- **First screen:** Skip links, then a named story (“The Fragrant Fables”), one Explore CTA. Product kits below with price, one-size, add. Literary quote in the footer region. Store-as-neighbour copy.
- **Transfer:** Story named like a chapter, not a promo. Product cards: name, one line, price. Care/material voice. Skip-to-content. No fake urgency.
- **Risk:** Long-read library and store-locator are later. Do not fake a journal until there is writing. Do not copy Aesop’s amber-bottle art.

### The Row — https://www.therow.com/

- **First screen:** Country gate, then a single campaign still (W26), almost no chrome. Bag / Saved / Login. Empty-bag copy is a sentence, not a graphic.
- **Transfer:** Whitespace is the luxury. One image. Wordmark. Quiet bag. Country/language is a real ops problem — we ship India-only, so skip the gate.
- **Risk:** Country modal is hostile. Wishlist is deferred. Do not copy the Shopify/Shop.app bag chrome.

### ZEGNA — https://www.zegna.com/

- **First screen:** Cinematic stills, short all-caps kicker (“LEGACY IN MOTION”), one garment named (Falcon Jacket), Discover + Shop. Services (made-to-measure, fittings) as a second chapter.
- **Transfer:** One garment as the story. Tailoring language. Dark, paced photography. Secondary “at your service” only when we can actually serve it (we cannot — no MTM in MVP).
- **Risk:** Fragrance/eyewear sprawl. Appointment CTAs we cannot honour. Do not add services we do not run.

### Raw Mango — https://www.rawmango.com/

- **First screen:** Full-bleed collection banners (Bhitti Chitra, Diwali Edit, Ready to Ship) with a small Shop now. Collection name is the identity. Shopify + Razorpay (India checkout is normal here).
- **Transfer:** Collection named after cloth/place, not a muse. India checkout path. Material as merchandising.
- **Risk:** Festival-edit stacking and shouty SHOP NOW. Wedding-catalogue density. Do not imply GI/village crafts until contracts exist. Banner carousel fatigue on mobile.

### Jacquemus — https://www.jacquemus.com/

- **First screen:** Two giant gendered campaign stills with a collection nickname (“Sapin”). Then a product with many colourways and a high price in the open. Accessibility shortcut advertised.
- **Transfer:** Unexpected crop/scale. Collection has a name. Colour as a row of facts, not swatch jewellery. Price visible.
- **Risk:** Playful fashion-house volume (personalisation, 13 colourways) is not our catalogue. Do not borrow campaign names or the split-gender splash.

### Awwwards fashion / e-commerce — https://www.awwwards.com/websites/fashion/ · /e-commerce/

- **Recent, dated:** Coutumes (men’s jewellery, HM 5 Sep 2026, https://www.coutumes.com/) — variable type, large photography, quiet product page. Miu Miu “A House that we shaped” SOTD 25 Aug 2026 — house story, not a grid. Decathlon Yestalgia SOTD 28 Aug 2026 — campaign microsite, not a shop. DICH™ Fashion SOTD — futurist, wrong register.
- **Transfer from Coutumes only:** Quiet product page, type as texture, photography over UI chrome.
- **Risk:** Award sites from 2024 are not contemporary. WebGL, forced intros, 3D garments (VERO Italy) are P3 and forbidden for launch. Awwwards listing pages are ad/recaptcha-heavy; individual site pages were used.

### CSS Design Awards — https://www.cssdesignawards.com/

- **Today (24 Oct 2026):** WOTD “Half the Sky” is a memorial, not commerce. Recent winners are portfolios and experiments (Grids, NOTHIN’, Arc Marumo).
- **Transfer:** None for the shop. Confirms that award-chasing interaction is not our job.
- **Risk:** Copying experimental scroll/WebGL from WOTDs.

### The FWA — https://thefwa.com/

- Extract returned cookie shell only. Not used as a design source.

### Godly — https://godly.website/

- Redirects to recent.design, a mixed feed (posters, motion, product UI). No stable fashion-commerce pattern. Not used.

### Commerce Cream — https://commercecream.com/

- Blocked (private/internal from this host). Not inspected.

## What we take

1. First screen = one photograph + one line + one action. No overlay essay.
2. Product cards: garment name, price, one material word. 3:4 stills. Consistent ratio.
3. House story as a short chapter, not a manifesto.
4. Materials/craft as facts once we have them; labelled placeholders until then.
5. India, INR, quiet checkout. No live-shopping widgets.
6. Motion under 300ms, no intro reel, no 3D.

## What we refuse

Shopify-theme chrome, gold ornaments, glass pills, fake reviews, countdown urgency, gender-split splash, country gate, WebGL, award-site scroll theatre, GI/village claims, copying Bluorng’s dock or any reference’s campaign stills.

## Journeys (MVP)

1. Land → hero → featured sets → collection grid → PDP → size → bag → checkout (boundary until Razorpay test keys).
2. Land → Philosophy / Materials → collection.
3. Direct PDP (SEO) → bag.
4. Policy / size / care from PDP and footer.

Conversion goal: a founder can complete a **test** purchase of a labelled sample set. Success metric is KUR-026, not homepage bounce.

## Limitations

- COS, The Row, Raw Mango, Jacquemus: consent/geo/Shop.app overlays truncated the extract. Observations are first-screen + IA, not full PDP audits.
- FWA and Commerce Cream: not inspectable from this host.
- No production photography exists. All product stills on the storefront are licensed stock, labelled placeholders.
