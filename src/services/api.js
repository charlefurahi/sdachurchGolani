import axios from 'axios'
import { OFFLINE_DEMO, offlineAdapter } from './offline'

const configuredBase = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1').replace(/\/+$/, '')
// Accept either the API root (https://backend.example.com/api/v1) or just
// the backend origin (https://backend.example.com) in deployment settings.
const BASE = /\/api\/v1$/i.test(configuredBase) ? configuredBase : `${configuredBase}/api/v1`
export const API_ORIGIN = BASE.replace(/\/api\/v1$/i, '')

export const MEDIA_BASE = BASE.replace(/\/api\/v1\/?$/, '')

const api = axios.create({
  baseURL: BASE,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
  ...(OFFLINE_DEMO ? { adapter: offlineAdapter } : {}),
})

// Attach JWT access token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('golanisda-token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, error => Promise.reject(error))

// Auto-refresh on 401; redirect to login if refresh fails
api.interceptors.response.use(
  response => response.data,
  async error => {
    const original = error.config

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true

      // ── MOCK TOKEN GUARD ────────────────────────────────────────────────────
      // If the stored token is a demo/mock token (no real backend),
      // do NOT wipe localStorage or redirect — just reject silently.
      const storedToken = localStorage.getItem('golanisda-token')
      if (storedToken && storedToken.startsWith('mock-')) {
        return Promise.reject(error.response?.data || error)
      }
      // ───────────────────────────────────────────────────────────────────────

      const refresh = localStorage.getItem('golanisda-refresh')
      if (refresh) {
        try {
          const { data } = await axios.post(`${BASE}/auth/token/refresh/`, { refresh })
          localStorage.setItem('golanisda-token', data.access)
          original.headers.Authorization = `Bearer ${data.access}`
          return api(original)
        } catch {
          localStorage.removeItem('golanisda-token')
          localStorage.removeItem('golanisda-refresh')
          localStorage.removeItem('golanisda-user')
        }
      } else {
        localStorage.removeItem('golanisda-token')
      }
      if (!window.location.pathname.startsWith('/auth')) {
        window.location.href = '/auth/login'
      }
    }

    return Promise.reject(error.response?.data || error)
  }
)

export default api

export function resolveMedia(src) {
  if (!src) return null
  if (typeof src !== 'string') return null
  if (src.startsWith('http://') || src.startsWith('https://')) return src
  return MEDIA_BASE + (src.startsWith('/') ? src : '/' + src)
}
