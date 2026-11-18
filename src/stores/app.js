import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isDark = ref(false)
  const isMenuOpen = ref(false)
  const isSidebarOpen = ref(false)
  const isSidebarPinned = ref(false)   // desktop pin
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

    // Restore sidebar pin preference
    const pinned = localStorage.getItem('golanisda-sidebar-pinned')
    if (pinned === 'true') isSidebarPinned.value = true
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
<<<<<<< HEAD

    const favicon = document.getElementById('site-favicon')
    if (favicon) {
      favicon.href = `${import.meta.env.BASE_URL}favicon${isDark.value ? '-dark' : ''}.svg`
    }

    const themeColor = document.getElementById('site-theme-color')
    if (themeColor) themeColor.content = isDark.value ? '#102638' : '#fafbfc'
=======
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  }

  function toggleMenu() { isMenuOpen.value = !isMenuOpen.value }
  function closeMenu()  { isMenuOpen.value = false }

  function toggleSidebar() { isSidebarOpen.value = !isSidebarOpen.value }
  function openSidebar()   { isSidebarOpen.value = true }
  function closeSidebar()  { isSidebarOpen.value = false }

  function toggleSidebarPin() {
    isSidebarPinned.value = !isSidebarPinned.value
    localStorage.setItem('golanisda-sidebar-pinned', isSidebarPinned.value)
    if (!isSidebarPinned.value) isSidebarOpen.value = false
  }

  function showToast(message, type = 'success', duration = 4000) {
    if (toastTimer) clearTimeout(toastTimer)
    toast.value = { show: true, message, type }
    toastTimer = setTimeout(() => { toast.value.show = false }, duration)
  }

  function setLoading(val) { isLoading.value = val }

  return {
    isDark, isMenuOpen, isSidebarOpen, isSidebarPinned,
    isLoading, toast,
    initTheme, toggleTheme,
    toggleMenu, closeMenu,
    toggleSidebar, openSidebar, closeSidebar, toggleSidebarPin,
    showToast, setLoading,
  }
})
