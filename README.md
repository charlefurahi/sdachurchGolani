# GolaniSDA — Church Website

A complete, production-ready Vue.js frontend for the **Golani Seventh-day Adventist Church**.

Built with Vue 3 + Vite + TailwindCSS + Pinia.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (recommended: 20 LTS)
- npm 9+

### Installation

```bash
# 1. Clone / extract the project
cd golanisda

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env

# 4. Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 📦 Production Build

```bash
npm run build
npm run preview   # Preview production build locally
```

---

## 🗂️ Project Structure

```
golanisda/
├── public/                 # Static assets (favicon, robots.txt)
├── src/
│   ├── assets/             # Images, audio, video (see ASSETS_GUIDE.md)
│   │   ├── images/
│   │   ├── banners/
│   │   ├── pastors/
│   │   ├── gallery/
│   │   ├── audio/
│   │   └── ASSETS_GUIDE.md
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Navbar, Footer, Modal, etc.
│   │   └── home/           # Home page sections
│   ├── composables/        # Reusable Vue composables
│   ├── data/               # Mock JSON data (replace with API)
│   ├── layouts/            # Page layout wrappers
│   ├── pages/              # Route-level page components
│   │   ├── admin/          # Admin dashboard pages
│   │   └── auth/           # Authentication pages
│   ├── router/             # Vue Router configuration
│   ├── services/           # API service layer (Axios)
│   ├── stores/             # Pinia state management
│   ├── styles/             # Global CSS (Tailwind + custom)
│   └── utils/              # Utility functions
├── .env.example
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 📄 Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Full landing with hero, events, sermons, announcements |
| `/about` | About | History, beliefs, leadership, service times |
| `/events` | Events | Event listing, filtering, RSVP |
| `/events/:id` | Event Detail | Individual event detail + RSVP |
| `/sermons` | Sermons | Sermon listing, audio/video player |
| `/sermons/:id` | Sermon Detail | Full sermon page |
| `/announcements` | Announcements | Church news and notices |
| `/gallery` | Gallery | Photo albums + lightbox |
| `/give` | Donate | Donation campaigns + payment forms |
| `/contact` | Contact | Contact form, map, FAQs |
| `/auth/login` | Login | Member sign in |
| `/auth/register` | Register | New account |
| `/auth/forgot-password` | Forgot Password | Password recovery |
| `/admin/dashboard` | Admin Dashboard | Analytics, quick stats |
| `/admin/events` | Admin Events | CRUD for events |
| `/admin/sermons` | Admin Sermons | CRUD for sermons |
| `/admin/gallery` | Admin Gallery | Album management |
| `/admin/announcements` | Admin Announcements | CRUD for announcements |
| `/admin/users` | Admin Users | User management |
| `/admin/settings` | Settings | Church config |

---

## 🎨 Design System

### Colors
```js
primary: '#1e3a8a'   // Deep blue
gold: '#c8971a'      // Gold accent
navy: '#0f172a'      // Dark navy
```

### Typography
- **Headings**: Cormorant Garamond (elegant serif)
- **Body**: DM Sans (clean sans-serif)
- **Accent/Logo**: Cinzel (decorative)

### Dark Mode
Toggle in the navbar or top bar. Preference saved to `localStorage`.

---

## 🔌 Backend Integration

All API calls are organized in `src/services/`:

```js
// Example: connect to your REST API
// src/services/api.js — base Axios instance

// src/services/sermonService.js
export default {
  getAll: (params) => api.get('/sermons', { params }),
  getById: (id) => api.get(`/sermons/${id}`),
  ...
}
```

Set your API base URL in `.env`:
```
VITE_API_BASE_URL=https://api.yourchurchdomain.org/api/v1
```

Replace mock data in `src/data/index.js` and `src/data/sermons.js` with live API calls.

---

## 🌍 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Backend API base URL |
| `VITE_GOOGLE_MAPS_KEY` | Google Maps embed key |
| `VITE_YOUTUBE_API_KEY` | YouTube Data API key |
| `VITE_STRIPE_PUBLIC_KEY` | Stripe payments |
| `VITE_PAYPAL_CLIENT_ID` | PayPal integration |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics |

---

## 🖼️ Adding Images

1. See `src/assets/ASSETS_GUIDE.md` for all required images
2. Optimize before adding: use [squoosh.app](https://squoosh.app)
3. Reference in components: `import img from '@/assets/images/church-hero.jpg'`

---

## 🛡️ Accessibility

- WCAG 2.1 AA compliant structure
- Keyboard navigable
- `aria-label` on all icon-only buttons
- Proper heading hierarchy (h1 → h2 → h3)
- Focus-visible ring on all interactive elements
- Reduced motion: add `@media (prefers-reduced-motion)` overrides as needed

---

## 📱 Responsive Breakpoints

| Breakpoint | Size |
|-----------|------|
| `xs` | 480px |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

---

## 🤝 SDA Church Affiliation

GolaniSDA is affiliated with:
- **East Africa Division (EAD)**
- **General Conference of Seventh-day Adventists**
- Official resources: [adventist.org](https://www.adventist.org)

---

## 📝 License

© 2024 GolaniSDA Church. All rights reserved.

Built with ❤️ for the glory of God.

---

*"To make disciples of all nations." — Matthew 28:19*
