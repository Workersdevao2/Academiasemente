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
- Transparent → solid header on scroll
- Thin-line hamburger with elegant X animation
- Left slide-in mobile drawer
- Announcement bar that hides on scroll
- Services & pricing section (Online / Presencial / Domiciliar)
- Physical products shop section
- Contact form that opens WhatsApp with pre-filled message
- Smooth scroll navigation

## Contact data
- WhatsApp: +244 945 574 700
- Email: academiasemente@gmail.com
- Location: Kilamba, Ed R29, Andar 6, Ap 63
- Instagram: https://www.instagram.com/academiasemente
- Facebook: https://www.facebook.com/profile.php?id=61584786747541

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
Simply open `index.html` in a browser, or use any static server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## Customisation
- Brand colours are defined as CSS variables in `css/styles.css` (`:root`)
- All text content is managed in `js/main.js` under the `translations` object
- Prices and product details can be edited directly in `index.html`
