# Academia Semente — Website

Professional luxury website for **Academia Semente**, an English language academy in Angola.

## Stack
- Pure HTML / CSS / JS
- No build step required
- Ready for **Cloudflare Pages** + GitHub

## Features
- Mobile-first, fully responsive
- Portuguese (default) + English language toggle
- Luxury visual style: thin 1–1.5px lines, generous whitespace, light typography
- Transparent → solid header on scroll (fixed dark-text state)
- Thin-line hamburger with elegant X animation
- Left slide-in mobile drawer
- Announcement bar that hides on scroll
- Hero with ambassador image (desktop split layout)
- Services & pricing section (Online / Presencial / Domiciliar)
- Service cards link to contact form and pre-select the course
- Physical products shop with **shopping cart**
  - Add to cart, quantity +/−, remove item
  - Clear all, total, checkout via WhatsApp
  - Cart drawer slides from the right
  - Swipe right to close on mobile
  - Cart persists in localStorage
- Contact form that opens WhatsApp with pre-filled message
- Smooth scroll navigation

## Contact data
- WhatsApp: +244 945 574 700
- Email: academiasemente@gmail.com
- Location: Kilamba, Ed R29, Andar 6, Ap 63
- Instagram: https://www.instagram.com/academiasemente
- Facebook: https://www.facebook.com/profile.php?id=61584786747541

## Project structure
```
academia-semente-website/
├── index.html
├── css/styles.css
├── js/main.js
├── assets/
│   └── hero.jpg       ← reception / brand hero photo
└── README.md
```

## Deploy to Cloudflare Pages

1. Push this folder to a GitHub repository
2. In Cloudflare Dashboard → Pages → Create project → Connect to Git
3. Select the repository
4. Build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/` (or the folder containing `index.html`)
5. Deploy

Alternatively, drag-and-drop the folder into Cloudflare Pages for a quick deploy.

## Local preview
```bash
npx serve .
# or
python3 -m http.server 8080
```

## Customisation
- Brand colours → CSS variables in `css/styles.css` (`:root`)
- All text content → `js/main.js` (`translations` object)
- Prices & product details → `index.html`
- Hero image → `assets/hero.jpg`

## Changelog

### 2026-10-01 — Cart, hero image & header fix
**Files changed:**
- `index.html` — hero image, enroll links to form, product “Adicionar” buttons, cart drawer markup, cart icon in header
- `css/styles.css` — fixed scrolled header text colours, hero split layout + image, cart drawer styles, header-actions
- `js/main.js` — full cart logic (localStorage, +/−, clear, WhatsApp checkout, swipe-to-close), enroll pre-select, updated translations
- `assets/hero.jpg` — added ambassador hero image
- `README.md` — updated features and changelog

### 2026-10-01 — Hero man cutout on brand green
**Files changed:**
- `assets/hero-man.png` — green background removed; only the ambassador remains (transparent PNG)
- `index.html` — hero uses `hero-man.png` instead of full artwork
- `css/styles.css` — hero image sizing/shadow tuned for cutout on solid green
- `README.md` — updated structure and changelog

The site hero keeps the original solid brand green; only the man is overlaid.

### 2026-10-01 — Hero man visible on mobile
**Files changed:**
- `css/styles.css` — hero image now shows on mobile (below text), sized for small screens; desktop unchanged
- `assets/hero-man.png` — confirmed cutout in use (full shoulders)
- `README.md` — changelog

### 2026-10-01 — Better hero portrait (full shoulders)
**Files changed:**
- `assets/hero-man.png` — replaced with new full-shoulder cutout (white bg removed via flood-fill)
- `README.md` — changelog

### 2026-10-01 — Mobile hero: text over the man
**Files changed:**
- `css/styles.css` — on mobile, man is positioned behind the hero text (absolute, bottom-aligned); text stays in front with light gradient for readability. Desktop split layout unchanged.
- `README.md` — changelog

### 2026-10-01 — Reception desk as hero image
**Files changed:**
- `assets/hero.jpg` — new reception desk photo (previous hero images deleted)
- `assets/hero-man.png` — **deleted**
- `index.html` — simplified hero (full-bleed background + text overlay)
- `css/styles.css` — hero uses cover background image with green tint overlay
- `README.md` — structure + changelog

### 2026-10-01 — Real product images in shop
**Files changed:**
- `assets/products/caderno.jpg` — notebook
- `assets/products/polo-front.jpg` — official polo (front)
- `assets/products/polo-back.jpg` — official polo (back, available)
- `assets/products/canetas.jpg` — pen kit
- `assets/products/manual.jpg` — student manual
- `index.html` — product cards use real photos; renamed Camiseta → Polo Oficial
- `css/styles.css` — product image cover + hover zoom
- `js/main.js` — PT/EN product title & description updated
- `README.md` — changelog

### 2026-10-01 — Contact section background
**Files changed:**
- `assets/contact-bg.jpg` — blurred lobby / reception background
- `index.html` — contact section bg layer
- `css/styles.css` — full-cover contact background + soft white/green overlay; form glass panel
- `README.md` — changelog

### 2026-10-01 — Porquê nós section background
**Files changed:**
- `assets/diff-bg.jpg` — soft mint leaf abstract background
- `index.html` — diferenciais bg layer
- `css/styles.css` — full-cover background; cards semi-transparent with blur
- `README.md` — changelog

### 2026-10-01 — Porquê nós card icons
**Files changed:**
- `assets/icons/metodologia.jpg`
- `assets/icons/empregabilidade.jpg`
- `assets/icons/tecnologia.jpg`
- `assets/icons/ambiente.jpg`
- `index.html` — numbers replaced with icon images on diff cards
- `css/styles.css` — `.diff-icon` styles
- `README.md` — changelog

### 2026-10-01 — Diff icons fill card squares
**Files changed:**
- `css/styles.css` — `.diff-icon` now full-width square (fills the card top), `object-fit: cover`
- `README.md` — changelog

### 2026-10-01 — Revert diff icon size
**Files changed:**
- `css/styles.css` — icons back to compact 72×72 squares (previous preferred style)
- `README.md` — changelog

