import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isDark = ref(false)
  const isMenuOpen = ref(false)
  const isLoading = ref(false)
  const toast = ref({ show: false, message: '', type: 'success' })
  let toastTimer = null

  function initTheme() {
    const saved = localStorage.getItem('golanisda-theme')
    if (saved) {
      isDark.value = saved === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  function toggleTheme() {
    isDark.value = !isDark.value
    localStorage.setItem('golanisda-theme', isDark.value ? 'dark' : 'light')
    applyTheme()
  }

  function applyTheme() {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
  }

  function closeMenu() {
    isMenuOpen.value = false
  }

  function showToast(message, type = 'success', duration = 4000) {
    if (toastTimer) clearTimeout(toastTimer)
    toast.value = { show: true, message, type }
    toastTimer = setTimeout(() => {
      toast.value.show = false
    }, duration)
  }

  function setLoading(val) {
    isLoading.value = val
  }

  return {
    isDark,
    isMenuOpen,
    isLoading,
    toast,
    initTheme,
    toggleTheme,
    toggleMenu,
    closeMenu,
    showToast,
    setLoading
  }
})
