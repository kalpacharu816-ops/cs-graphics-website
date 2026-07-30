# CS Graphics — Content Customization Guide

Use this guide to replace images, text, and media without editing React code.

---

## Folder structure

| Folder | Purpose |
|--------|---------|
| `public/content/collaborators/` | Partner logo SVG/PNG files |
| `public/content/gallery/` | Service gallery images (optional overrides) |
| `public/content/payments/` | Bank & crypto QR code images |
| `public/content/profile/` | Founder photo (`kalpa.jpg` or `.svg`) |
| `public/content/hero/` | Hero poster or fallback images |
| `lib/seasonal-popup.config.ts` | Default popup copy (before admin override) |
| `lib/hero.config.ts` | Default hero title, tagline, subtitle |
| `lib/payment-methods.config.ts` | Payment page instructions & details |
| `lib/services-data.ts` | Service descriptions & gallery placeholders |
| `lib/constants.ts` | Services list, static reviews, social URLs |

---

## Collaborator logos

1. Add your logo to `public/content/collaborators/` (SVG or PNG).
2. Match filenames in `lib/collaborators.ts`, or edit paths in the **Admin Panel**.

**Current partners:** INFOTEL, MOMENT Photography, Oshadha Ekanayake Films, South Side, LMG, GAMMIRIS, MSI Sri Lanka, Brother & Sister Productions, triple A, GROW MORE, MaxMedia, Maximum E-Sports.

---

## Reviews

- Visitors submit reviews on the homepage (below About Me).
- Approve/reject in the **Admin Panel** (reviews appear after approval).
- Edit default reviews in `lib/constants.ts` → `TESTIMONIALS`.

---

## Seasonal popup & offer bar

- Defaults: `lib/seasonal-popup.config.ts` and `lib/constants.ts` → `OFFER_MESSAGES`.
- Live overrides: **Admin Panel** → Popup / Offers tabs (saved in browser storage).

---

## Payment pages

- Edit copy: `lib/payment-methods.config.ts`
- QR images: `public/content/payments/` (e.g. `bank-qr.png`, `crypto-qr.png`)
- Update paths in the config file `qrImage` fields.

---

## Hero section

- Defaults: `lib/hero.config.ts`
- Overrides: **Admin Panel** → Hero tab
- Background: Three.js particles (no video file required)
- Optional poster: `public/content/hero/`

---

## Social links

Edit URLs in `lib/constants.ts` → `SOCIALS` and `CONTACT.whatsappUrl`.

---

## Admin panel (hidden)

1. Copy `.env.example` to `.env.local`
2. Set `ADMIN_PASSWORD=your-secure-password`
3. Visit: **`/studio/control`** (not linked on the public site)
4. Log in → manage reviews, hero, offers, popup, collaborators

> Admin changes to hero/offers/popup/collaborators are stored in the browser’s localStorage on the machine where you save them. For permanent defaults, update the `lib/*.config.ts` files.

---

## Gallery images (service pages)

1. Add images to `public/content/gallery/<service-slug>/`
2. Or update gradients/paths in `lib/services-data.ts`
3. Admin gallery tab (future) or manual config per service slug

---

## Brand colors (advanced)

Global styles: `app/globals.css`  
Design tokens: `--cs-violet`, `--cs-neon`, `--cs-gold`, `--cs-silver`
