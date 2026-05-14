import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})

// Attach access token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('golanisda-token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, error => Promise.reject(error))

// Auto-refresh token on 401, otherwise forward error
api.interceptors.response.use(
  response => response.data,
  async error => {
    const original = error.config

    // Try to refresh the access token once
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      const refresh = localStorage.getItem('golanisda-refresh')
      if (refresh) {
        try {
          const { data } = await axios.post(
            `${original.baseURL || 'http://127.0.0.1:8000/api/v1'}/auth/refresh`,
            { refresh }
          )
          localStorage.setItem('golanisda-token', data.access)
          original.headers.Authorization = `Bearer ${data.access}`
          return api(original)
        } catch {
          // Refresh failed — clear everything and redirect to login
          localStorage.removeItem('golanisda-token')
          localStorage.removeItem('golanisda-refresh')
          window.location.href = '/auth/login'
        }
      } else {
        localStorage.removeItem('golanisda-token')
        window.location.href = '/auth/login'
      }
    }

    return Promise.reject(error.response?.data || error)
  }
)

export default api