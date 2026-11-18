# erke shop

Online store for **erke**, a warm-toned, unisex streetwear brand. Bouclé, brushed fleece and loose track cuts in clay, cocoa and ember.

Built with Next.js 16 (App Router), React 19 and TypeScript. Styling is plain CSS with no UI framework.

## Features

- **Home**: editorial cover, shop by wearer, a scroll-driven horizontal lookbook, new arrivals and journal stories
- **Shop**: filter by wearer, category and new-in, and sort by price or newest. Filters live in the URL, so they can be shared.
- **Product pages**: image gallery, colourway switcher, size picker, add to bag, wishlist, and "styled with" suggestions
- **Lookbook and journal**: every look and story links to the pieces in it
- **Bag and checkout**: slide-out bag, free-shipping progress bar, quantity controls, shipping options, inline form validation and an order confirmation page
- **Account and wishlist**: sign in / create account, order history and saved items
- Responsive down to 375px, keyboard accessible, and respects reduced-motion settings

## Getting started

Requires Node.js 20.9 or newer.

```bash
git clone https://github.com/erkenazzz07/erke_shop.git
cd erke_shop
npm install
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (pre-renders every page) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home |
| `/shop` | All products with filters and sorting |
| `/shop/[slug]` | Product page |
| `/lookbook` | Every look with its shoppable pieces |
| `/journal`, `/journal/[slug]` | Stories with "shop the story" |
| `/wishlist` | Saved items |
| `/cart`, `/checkout`, `/checkout/success` | Bag, checkout and confirmation |
| `/account` | Sign in, create account, order history |

## Project structure

```
app/            routes (one folder per page) and globals.css
components/     UI components (header, bag drawer, product card, checkout form…)
lib/
  products.ts       product catalogue
  journal.ts        journal stories
  lookbook.ts       lookbook looks
  pricing.ts        free-shipping threshold and shipping methods
  store.ts          bag, wishlist, account and orders (browser localStorage)
  image-loader.ts   builds image URLs for next/image
```

- To change or add products, edit `lib/products.ts`.
- Colours and fonts are set as CSS variables at the top of `app/globals.css`.

## Status: preview, not production-ready

- **Product photos are placeholders** hotlinked from adidas.com for layout only. Before going public, replace them with erke's own photography by updating `images` in `lib/products.ts` and pointing `lib/image-loader.ts` at your own CDN or `/public`.
- **Payments are not connected.** Checkout validates the form but charges nothing, and card details are never stored or sent. Connect a payment provider (e.g. Stripe Checkout) before taking orders.
- **Accounts are front-end only.** They're kept in the browser and no password is stored. A real auth backend is needed.
- **Orders and the newsletter** are only saved locally or shown as confirmations.
