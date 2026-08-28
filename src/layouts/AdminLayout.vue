<template>
  <div class="flex h-screen bg-gray-50 dark:bg-navy-950 overflow-hidden">
    <!-- Sidebar -->
    <aside :class="['fixed inset-y-0 left-0 z-50 w-64 bg-navy-900 transform transition-transform duration-300 flex flex-col', sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']">
      <!-- Logo -->
      <div class="flex items-center gap-3 px-4 py-4 border-b border-navy-700">
        <img src="@/assets/logos/logo.png" alt="GolaniSDA Logo" class="h-8 w-auto object-contain flex-shrink-0" />
        <div class="flex-1 min-w-0">
          <p class="text-white font-semibold text-sm font-accent">GolaniSDA</p>
          <p class="text-blue-500 text-xs font-medium">Admin Panel</p>
        </div>
        <button @click="sidebarOpen = false" class="ml-auto text-gray-400 hover:text-white lg:hidden p-1 rounded" aria-label="Close menu">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Nav items -->
      <nav class="flex-1 px-3 py-4 overflow-y-auto space-y-1">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-navy-700 transition-all duration-200"
          active-class="!bg-primary-600 !text-white">
          <span class="text-base w-5 text-center flex-shrink-0">{{ item.icon }}</span>
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- User info + footer -->
      <div class="px-4 py-4 border-t border-navy-700 space-y-2">
        <div class="flex items-center gap-3 px-2 py-2">
          <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {{ initials }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-white text-xs font-semibold truncate">{{ authStore.fullName }}</p>
            <p class="text-gray-400 text-xs truncate">{{ authStore.user?.email }}</p>
          </div>
        </div>
        <RouterLink to="/dashboard" class="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-navy-700 rounded-lg text-xs transition-colors">
          <span>🏠</span> My Dashboard
        </RouterLink>
        <RouterLink to="/" class="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-navy-700 rounded-lg text-xs transition-colors">
          <span>🌐</span> Back to Website
        </RouterLink>
        <button @click="handleLogout" class="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg text-xs transition-colors">
          <span>🚪</span> Sign Out
        </button>
      </div>
    </aside>

    <!-- Overlay -->
    <div v-if="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 bg-black/50 z-40 lg:hidden"></div>

    <!-- Main content -->
    <div class="flex-1 flex flex-col lg:ml-64 overflow-hidden">
      <!-- Top bar -->
      <header class="bg-white dark:bg-navy-900 border-b border-gray-200 dark:border-navy-700 px-4 lg:px-6 py-4 flex items-center gap-4 flex-shrink-0">
        <button @click="sidebarOpen = true" class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-800 text-gray-600 dark:text-gray-300" aria-label="Open menu">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <div class="flex-1">
          <h1 class="font-semibold text-gray-900 dark:text-white text-lg">{{ currentTitle }}</h1>
          <p class="text-xs text-gray-400 dark:text-gray-500">Admin · GolaniSDA Church</p>
        </div>
        <ThemeToggle />
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-4 lg:p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
import { useAuthStore } from '@/stores/auth'

const sidebarOpen = ref(false)
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const initials = computed(() => {
  const u = authStore.user
  if (!u) return 'AD'
  return `${u.first_name?.[0] || ''}${u.last_name?.[0] || ''}`.toUpperCase() || 'AD'
})

const navItems = [
  { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/admin/events', icon: '📅', label: 'Events' },
  { to: '/admin/sermons', icon: '🎙️', label: 'Sermons' },
  { to: '/admin/gallery', icon: '🖼️', label: 'Gallery' },
  { to: '/admin/announcements', icon: '📢', label: 'Announcements' },
  { to: '/admin/leadership', icon: '👑', label: 'Leadership' },
  { to: '/admin/users', icon: '👥', label: 'Users' },
  { to: '/admin/settings', icon: '⚙️', label: 'Settings' }
]

const currentTitle = computed(() => navItems.find(n => route.path.startsWith(n.to))?.label || 'Dashboard')

async function handleLogout() {
  await authStore.logout()
  router.push('/auth/login')
}
</script>
