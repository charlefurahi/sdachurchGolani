import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user      = ref(JSON.parse(localStorage.getItem('golanisda-user') || 'null'))
  const token     = ref(localStorage.getItem('golanisda-token') || null)
  const isLoading = ref(false)
  const error     = ref(null)

  const isAuthenticated = computed(() => !!token.value)
  const isLoggedIn      = computed(() => !!token.value)
  const isAdmin         = computed(() => user.value?.role === 'admin' || user.value?.is_staff === true)
  const fullName        = computed(() =>
    user.value ? `${user.value.first_name} ${user.value.last_name}`.trim() : ''
  )

  function extractError(err) {
    if (!err) return 'An error occurred. Please try again.'
    if (typeof err === 'string') return err
    if (err.detail)  return err.detail
    if (err.error)   return err.error
    if (err.message) return err.message
    const fieldErrors = Object.entries(err)
      .filter(([, v]) => v)
      .map(([k, v]) => {
        const msgs  = Array.isArray(v) ? v : [v]
        const field = k === 'non_field_errors' ? '' : `${k}: `
        return `${field}${msgs.join(', ')}`
      })
    if (fieldErrors.length) return fieldErrors.join(' | ')
    return 'An error occurred. Please try again.'
  }

  // ── mockLogin: sets token + user via the store's own refs (safe) ──────────
  function mockLogin(userData, accessToken, refreshToken) {
    token.value = accessToken
    user.value  = userData
    localStorage.setItem('golanisda-token',   accessToken)
    localStorage.setItem('golanisda-refresh', refreshToken)
    localStorage.setItem('golanisda-user',    JSON.stringify(userData))
  }

  async function login(credentials) {
    isLoading.value = true
    error.value = null
    try {
      const response = await authService.login({
        email:    credentials.email?.toLowerCase().trim(),
        password: credentials.password,
      })
      token.value = response.access
      user.value  = response.user
      localStorage.setItem('golanisda-token',   response.access)
      localStorage.setItem('golanisda-refresh', response.refresh)
      localStorage.setItem('golanisda-user',    JSON.stringify(response.user))
      return { success: true }
    } catch (err) {
      error.value = extractError(err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  async function register(userData) {
    isLoading.value = true
    error.value = null
    try {
      const response = await authService.register({
        ...userData,
        email: userData.email?.toLowerCase().trim(),
      })
      token.value = response.access
      user.value  = response.user
      localStorage.setItem('golanisda-token',   response.access)
      localStorage.setItem('golanisda-refresh', response.refresh)
      localStorage.setItem('golanisda-user',    JSON.stringify(response.user))
      return { success: true }
    } catch (err) {
      error.value = extractError(err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    try {
      const refresh = localStorage.getItem('golanisda-refresh')
      if (refresh) await authService.logout({ refresh })
    } catch {
      // always clear local state
    } finally {
      user.value  = null
      token.value = null
      localStorage.removeItem('golanisda-token')
      localStorage.removeItem('golanisda-refresh')
      localStorage.removeItem('golanisda-user')
    }
  }

  // ── FIXED: never calls logout() — API errors just keep the cached user ────
  async function fetchUser() {
    if (!token.value) return
    try {
      const response = await authService.getProfile()
      user.value = response
      localStorage.setItem('golanisda-user', JSON.stringify(response))
    } catch {
      // Backend unreachable — keep existing cached user, do NOT logout
    }
  }

  async function updateProfile(data) {
    isLoading.value = true
    try {
      const response = await authService.updateProfile(data)
      user.value = response
      localStorage.setItem('golanisda-user', JSON.stringify(response))
      return { success: true }
    } catch (err) {
      // Offline fallback: update locally
      const updated = { ...user.value, ...data }
      user.value = updated
      localStorage.setItem('golanisda-user', JSON.stringify(updated))
      return { success: true }
    } finally {
      isLoading.value = false
    }
  }

  async function forgotPassword(emailData) {
    isLoading.value = true
    try {
      await authService.forgotPassword(emailData)
      return { success: true }
    } catch (err) {
      return { success: false, error: extractError(err) }
    } finally {
      isLoading.value = false
    }
  }

  async function resetPassword(data) {
    isLoading.value = true
    try {
      await authService.resetPassword(data)
      return { success: true }
    } catch (err) {
      return { success: false, error: extractError(err) }
    } finally {
      isLoading.value = false
    }
  }

  return {
    user, token, isLoading, error,
    isAuthenticated, isLoggedIn, isAdmin, fullName,
    mockLogin, login, register, logout, fetchUser,
    updateProfile, forgotPassword, resetPassword,
  }
})
