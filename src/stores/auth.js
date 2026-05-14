import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user      = ref(JSON.parse(localStorage.getItem('golanisda-user') || 'null'))
  const token     = ref(localStorage.getItem('golanisda-token') || null)
  const isLoading = ref(false)
  const error     = ref(null)

  const isAuthenticated = computed(() => !!token.value)
  const isLoggedIn      = computed(() => !!token.value)   // alias used in router
  const isAdmin         = computed(() => user.value?.role === 'admin' || user.value?.is_staff === true)
  const fullName        = computed(() =>
    user.value ? `${user.value.first_name} ${user.value.last_name}` : ''
  )

  async function login(credentials) {
    isLoading.value = true
    error.value = null
    try {
      const response = await authService.login(credentials)
      token.value = response.access
      user.value  = response.user
      localStorage.setItem('golanisda-token',   response.access)
      localStorage.setItem('golanisda-refresh', response.refresh)
      localStorage.setItem('golanisda-user',    JSON.stringify(response.user))
      return { success: true }
    } catch (err) {
      error.value = err.detail || err.error || err.message || 'Login failed'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  async function register(userData) {
    isLoading.value = true
    error.value = null
    try {
      const response = await authService.register(userData)
      token.value = response.access
      user.value  = response.user
      localStorage.setItem('golanisda-token',   response.access)
      localStorage.setItem('golanisda-refresh', response.refresh)
      localStorage.setItem('golanisda-user',    JSON.stringify(response.user))
      return { success: true }
    } catch (err) {
      error.value = err.detail || err.error || err.message || 'Registration failed'
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
      // silently ignore — still clear local state
    } finally {
      user.value  = null
      token.value = null
      localStorage.removeItem('golanisda-token')
      localStorage.removeItem('golanisda-refresh')
      localStorage.removeItem('golanisda-user')
    }
  }

  async function fetchUser() {
    if (!token.value) return
    try {
      const response = await authService.getProfile()
      user.value = response
      localStorage.setItem('golanisda-user', JSON.stringify(response))
    } catch {
      await logout()
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
      error.value = err.detail || err.message || 'Update failed'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  async function forgotPassword(email) {
    isLoading.value = true
    try {
      await authService.forgotPassword(email)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.detail || err.message }
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
      return { success: false, error: err.detail || err.message }
    } finally {
      isLoading.value = false
    }
  }

  return {
    user, token, isLoading, error,
    isAuthenticated, isLoggedIn, isAdmin, fullName,
    login, register, logout, fetchUser,
    updateProfile, forgotPassword, resetPassword
  }
})