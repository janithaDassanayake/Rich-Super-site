# 🛒 Rich Super

A Next.js 14 + TypeScript + Tailwind storefront for **Rich Super**.
Customers browse aisles, build a cart, and submit their order to the shop
owner over WhatsApp — with a 6-digit OTP and QR code as confirmation.

Catalog data is seeded from the sibling `keells-super-scraper/` project
(1,383 real product listings across 6 active aisles).

## Tech

- **Next.js 14** App Router + React 18 + TypeScript (strict)
- **Tailwind CSS** with a custom green brand palette
- **Zustand** for the cart store (with `persist` for refresh-safe carts)
- **qrcode** for QR generation on the OTP modal
- **lucide-react** for icons

## Project layout

```
rich-super/
├── public/
│   └── items/            # product images (one per product, copied from the scraper)
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Header + Footer + CartDrawer
│   │   ├── page.tsx                   # Landing
│   │   ├── products/[category]/page.tsx
│   │   └── checkout/page.tsx
│   ├── components/
│   │   ├── layout/   {Header, Footer}
│   │   ├── home/     {HeroBanner, CategoryQuickLinks, TrendingItems, PromoSection}
│   │   ├── products/ {ProductCard, ProductGrid, CategorySidebar}
│   │   ├── cart/     {CartDrawer, CartItem}
│   │   └── checkout/ {OrderForm, OTPModal}
│   ├── data/
│   │   ├── products.json              # 1,383 products with promo/MRP
│   │   └── categories.ts
│   ├── store/cartStore.ts             # Zustand + persist
│   ├── lib/   {whatsapp, otp, format}
│   └── types/index.ts
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

## Setup

```powershell
# from the repo root
cd rich-super
npm install
copy .env.example .env.local      # then edit if you want a different WhatsApp number
npm run dev
```

Open <http://localhost:3000>.

## Environment

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `94717233803` | International digits-only number that receives orders. |
| `NEXT_PUBLIC_SHOP_NAME`       | `Rich Super` | Shown in the order message header. |

## Features

- Sliding hero banner with three rotating promos
- 8-tile category grid (2 marked "Coming soon" until vegetables / frozen
  catalogs are added)
- Horizontally-scrollable "Trending now" strip
- Promo deals grid (badge-flagged products)
- Catalog page: sticky left sidebar with category counts + responsive
  2/3/4-column grid
- Product cards: image, name, MRP strikethrough in red, promo price in
  large green, "SAVE %" badge, qty selector with minimum-5 enforcement
- Slide-in cart drawer with line totals and a persisted Zustand store
- Checkout page with validated customer form
- **Place order via WhatsApp** opens `https://wa.me/<number>?text=…` with a
  formatted message and pops the OTP modal
- OTP modal shows 6-digit code + QR (`RICHSUPER-ORDER-<ref>-<otp>`) and a
  "screenshot this" instruction

## Sample WhatsApp message

```
🛒 *NEW ORDER — Rich Super*
──────────────────────────
🧾 Ref: RS-2605240213-7421
👤 Customer: Kasun Perera
📞 Phone: +94 77 123 4567
📍 Address: 42/B, Main Street, Negombo

📦 *Order Items:*
• Munchee Marie Biscuit 200g (200g) × 5 — Rs. 750
• Sunlight Detergent Powder 1kg (1kg) × 5 — Rs. 2,475
• Highland Full Cream Milk Powder 400g (400g) × 5 — Rs. 4,250

──────────────────────────
💰 *Total: Rs. 7,475*
🔐 *OTP: 482951*
──────────────────────────
Received via Rich Super
```

## Where the product data comes from

`src/data/products.json` is generated from
`../keells-super-scraper/output/products.csv` by `../_prep_data.py`. To
refresh it:

```powershell
# from the repo root
.\venv\Scripts\python.exe _prep_data.py
```

The script remaps Keells categories to the six Rich Super aisles:

| Keells category | Rich Super |
| --- | --- |
| Biscuits, Snacks, Noodles | snacks |
| Rice                       | rice |
| Tea, Coffee, Soft Drinks   | beverages |
| Milk Powder, Yoghurt       | dairy |
| Soap, Shampoo, Toothpaste  | soap |
| Detergent                  | household |

It also parses the price string, synthesises a small MRP markup when the
scrape didn't capture an original price, and copies each image into
`public/items/`.

## Deploy

```powershell
npm i -g vercel
vercel --prod
```

Remember to set `NEXT_PUBLIC_WHATSAPP_NUMBER` (and optionally
`NEXT_PUBLIC_SHOP_NAME`) in the Vercel dashboard.

## Notes

- Minimum order quantity is enforced **everywhere** — the qty selector on
  product cards refuses to go below `minQty`, and the cart row's decrement
  button disables at the floor.
- Cart state survives reloads thanks to Zustand `persist`. Use the cart's
  trash icon or "clear" action to reset.
- The OTP and order ref are generated client-side. They're shown only to
  the customer — there's no server component (yet). If you want server-side
  order persistence, wire `handlePlace` in `src/app/checkout/page.tsx` up
  to your API or Vercel Edge Function.
