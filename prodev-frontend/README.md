# MK E‑Shop (Frontend) — Next.js + TypeScript + Tailwind CSS

A modern, responsive e‑commerce frontend for **MK E‑Shop**. Users can browse, search, filter, sort, and paginate products, add items to **Cart** or **Wishlist**, and complete a demo **Checkout** — all with a polished UI built using Tailwind CSS and React patterns that scale.

**Project by:** Mohamed KADI (ALX – ProDev FE)  
**Stack:** Next.js (App Router) · TypeScript · Redux Toolkit · Tailwind CSS · REST API

---

## ✨ Features

- **Dynamic Product Catalog** with API integration
- **Filtering, Sorting, Pagination** (+ optional Infinite Scroll)
- **Wishlist** (add/remove) with **move to Cart**
- **Cart** with quantity management & **Checkout Modal**
- **Responsive** design (desktop, tablet, mobile)
- **Polished UI**: hero section, CTA, navbar, footer, product cards
- **Persistent state** (localStorage) for cart/wishlist
- Image handling that avoids SVG issues (uses JPG/PNG placeholders)

---

## 🚀 Quick Start

```bash
# 1) Install deps
npm install

# 2) Copy env and set API base
cp .env.example .env.local

# 3) Run dev server
npm run dev    # http://localhost:3000

# 4) Lint (optional)
npm run lint

# 5) Build & start (prod)
npm run build && npm run start
```

> Requires Node 18+ (or the version in `.nvmrc` if present).

---

## 🔧 Configuration

Create **`.env.local`** (example):

```env
# Base URL of your Django backend (no trailing slash)
NEXT_PUBLIC_API_BASE=http://127.0.0.1:8000/api
# For Vercel, set this in the Project Settings -> Environment Variables
```

If you host the backend elsewhere, update the value accordingly.

---

## 📦 Scripts

```jsonc
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 🗂 Project Structure (example)

```
src/
  app/
    layout.tsx
    page.tsx                 # Home (hero, CTA, featured links)
    catalog/
      page.tsx               # Product grid (filters/sort/pagination)
  components/
    Navbar.tsx
    Footer.tsx
    ProductCard.tsx
    CartModal.tsx
    WishlistModal.tsx
    CheckoutModal.tsx
  lib/
    store.ts                 # Redux store
    hooks.ts                 # Typed hooks
    slices/
      cartSlice.ts
      wishlistSlice.ts
    api/
      client.ts              # fetch wrapper
      products.ts            # product list/fetch helpers
  styles/
    globals.css
  types/
    product.ts               # TS interfaces
public/
  favicon.ico
  icons/*
```

> Your folder names may differ; the above shows a clean modular layout.

---

## 🔌 API Integration

All requests use `NEXT_PUBLIC_API_BASE`. Example fetch helper:

```ts
// src/lib/api/client.ts
export const api = async <T>(path: string, init: RequestInit = {}) => {
  const base = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000/api";
  const res = await fetch(`${base}${path}`, { ...init, cache: "no-store" });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as T;
};
```

Typical endpoints (from the backend README):

```
GET /products/?page=1&ordering=-price
GET /products/?search=Sample
GET /products/?category=1
```

---

## 🛒 State (Redux Toolkit)

- `cartSlice.ts` — `{ id, title, price, image, qty }` with add/remove/setQuantity/clear
- `wishlistSlice.ts` — `{ id, title, price, image }` with add/remove/moveToCart
- State persisted in `localStorage` via simple subscribe middleware (optional)

**Example add to cart:**

```ts
dispatch(addToCart({ id, title, price, image, qty: 1 }));
```

---

## 🎨 UI / UX Notes

- **ProductCard**: premium look (shadow, hover, rating, price emphasis, quick actions)
- **Modals** (Cart / Wishlist / Checkout): centered panel with backdrop, ESC to close, focus traps (basic), scroll lock
- **Images**: use JPG/PNG placeholders (e.g., `https://picsum.photos/seed/1/600/450.jpg`)
  - If using `next/image`, add `unoptimized` prop or provide remotePatterns in `next.config.js`.
  - To avoid `dangerouslyAllowSVG` issues, prefer PNG/JPG placeholders.

**Remote image example (`next.config.js`):**

```js
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
};
```

Or opt out per image: `<Image unoptimized {...props} />`.

---

## 🧪 Testing the Flow

1. Open `/` — check **Hero** + **CTA**
2. Open `/catalog` — scroll grid, try:
   - **Search:** type in and press enter
   - **Filter:** by category (select)
   - **Sort:** price asc/desc
   - **Pagination:** next/prev (or infinite scroll)
3. **Add to Wishlist** → open Wishlist modal → **Move to Cart**
4. **Add to Cart** → open Cart modal → change **Qty** → **Checkout**
5. In **Checkout**, fill the form → Confirm (demo success state)

---

## 🚢 Deployment

### Vercel

- Import repo → Framework preset: **Next.js**
- Set env `NEXT_PUBLIC_API_BASE=https://your-backend-domain/api`
- Deploy

### Netlify

- Build command: `npm run build`
- Publish directory: `.next`
- Add env var `NEXT_PUBLIC_API_BASE`

---

## 🧰 Troubleshooting

- **Infinite loading**: ensure `NEXT_PUBLIC_API_BASE` is correct and server is up.
- **CORS error**: whitelist your frontend origin in Django (`CORS_ALLOWED_ORIGINS`).
- **SVG image error**: use JPG/PNG placeholders or `unoptimized` on `<Image>`.
- **Hydration mismatch**: avoid random values during SSR (e.g., `Math.random` in render).

---

## 🏷️ Commit Style (suggestion)

```
feat(ui): add hero section and CTA
feat(catalog): filter/sort/pagination + API wiring
feat(modal): cart + checkout modal interactions
fix(card): svg placeholder error using png/jpg
chore: configure tailwind and base styles
docs: update README with setup and env
```

---

## 📄 License

MIT (or your preferred license)

---

## 📣 Credits

Frontend by **Mohamed KADI** for **ALX ProDev**.  
Pairs with **MK E‑Shop API** (Django backend).
