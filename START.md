# GolaniSDA Frontend — Quick Start

## Setup & Run

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Set backend URL (edit if backend is on different host)
echo "VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1" > .env.local

# 3. Start development server
npm run dev
```

Frontend runs at: http://localhost:5173

## Build for Production

```bash
npm run build
```

## Notes
- Make sure the backend is running first (see backend/setup.sh)
- Admin panel: log in with an admin account, you'll be redirected automatically
- Regular users go to /dashboard after login
