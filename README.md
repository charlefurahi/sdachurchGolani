# Golani SDA Frontend

Vue 3 + Vite + Tailwind CSS church website for GolaniSDA.

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Start the backend first
See `../golanisda_backend/README.md` — backend must run on `http://127.0.0.1:8000`

### 3. Run the frontend
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

> **Note:** The Vite dev server proxies `/api` and `/media` requests to `http://127.0.0.1:8000` automatically — no CORS issues.

## Environment

`.env` is already set up for local development:
```
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

## What pulls from the backend

| Section | Endpoint |
|---|---|
| Upcoming Events (Home + Events page) | `GET /api/v1/events/upcoming` |
| Latest Sermons (Home + Sermons page) | `GET /api/v1/sermons` |
| Announcements (Home + Announcements page) | `GET /api/v1/announcements` |
| Leadership (Home preview + Leadership page) | `GET /api/v1/leadership` |
| Donation Campaigns (Home) | `GET /api/v1/donations/campaigns` |
| Gallery | `GET /api/v1/gallery` |

All sections show a **loading skeleton** while fetching, and a **clean empty state** if no data exists — no white gaps.

## Build for production
```bash
npm run build
```
