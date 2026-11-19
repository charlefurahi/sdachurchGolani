/**
 * Offline demo mode.
 *
 * When the Django backend is not running, set  VITE_OFFLINE_DEMO=true  in .env.
 * API calls are then rejected locally (no network request is sent), so every
 * page's existing `catch` falls straight back to the sample data in src/data/
 * and the browser console stays free of CORS / connection errors.
 *
 * Leave the variable unset (or false) when the backend is live.
 */
// Keep the local demo switch for development only. Production must use the live API.
export const OFFLINE_DEMO = !import.meta.env.PROD && import.meta.env.VITE_OFFLINE_DEMO === 'true'

function offlineError() {
  const err = new Error('Offline demo mode: using sample data')
  err.code = 'OFFLINE_DEMO'
  return err
}

/** axios adapter that never touches the network */
export const offlineAdapter = () => Promise.reject(offlineError())

/** Block direct fetch() calls to the API too (a few pages use fetch, not axios). */
export function installOfflineFetchGuard() {
  if (!OFFLINE_DEMO || typeof window === 'undefined') return
  const realFetch = window.fetch.bind(window)
  window.fetch = (input, init) => {
    const url = typeof input === 'string' ? input : input?.url || ''
    if (/\/api\/v\d+\//.test(url) || /127\.0\.0\.1:8000|localhost:8000/.test(url)) {
      return Promise.reject(offlineError())
    }
    return realFetch(input, init)
  }
}
