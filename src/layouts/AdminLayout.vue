<template>
  <div class="flex h-screen bg-gray-50 dark:bg-navy-950 overflow-hidden">
    <!-- Sidebar -->
<<<<<<< HEAD
    <aside :class="['admin-sidebar fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 flex flex-col', sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']">
      <!-- Logo -->
      <div class="flex items-center gap-3 px-4 py-4 border-b border-gray-200 dark:border-navy-700">
        <span class="site-brand__mark"><img src="@/assets/logos/logo.png" alt="" class="site-brand__logo" /></span>
        <div class="flex-1 min-w-0">
          <p class="text-navy-800 dark:text-white font-semibold text-sm font-accent">GolaniSDA</p>
          <p class="text-primary-700 dark:text-blue-300 text-xs font-medium">Admin Panel</p>
        </div>
        <button @click="sidebarOpen = false" class="ml-auto text-gray-500 hover:text-navy-800 dark:text-gray-400 dark:hover:text-white lg:hidden p-1 rounded" aria-label="Close menu">
=======
    <aside :class="['fixed inset-y-0 left-0 z-50 w-64 bg-navy-900 transform transition-transform duration-300 flex flex-col', sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']">
      <!-- Logo -->
      <div class="flex items-center gap-3 px-4 py-4 border-b border-navy-700">
        <img src="@/assets/logos/logo.png" alt="GolaniSDA Logo" class="h-8 w-auto object-contain flex-shrink-0" />
        <div class="flex-1 min-w-0">
          <p class="text-white font-semibold text-sm font-accent">GolaniSDA</p>
          <p class="text-blue-500 text-xs font-medium">Admin Panel</p>
        </div>
        <button @click="sidebarOpen = false" class="ml-auto text-gray-400 hover:text-white lg:hidden p-1 rounded" aria-label="Close menu">
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Nav items -->
      <nav class="flex-1 px-3 py-4 overflow-y-auto space-y-1">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to"
<<<<<<< HEAD
          class="admin-sidebar__link flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
          active-class="admin-sidebar__link--active">
          <svg class="h-[18px] w-[18px] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <template v-if="item.icon === 'dashboard'"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="5" rx="1.5"/><rect x="13" y="10" width="8" height="11" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/></template>
            <path v-else-if="item.icon === 'events'" d="M4 6h16v15H4zM8 3v6m8-6v6M4 11h16"/>
            <path v-else-if="item.icon === 'sermons'" d="M4 5h7a3 3 0 0 1 3 3v12a3 3 0 0 0-3-3H4zM20 5h-3a3 3 0 0 0-3 3v12a3 3 0 0 1 3-3h3z"/>
            <path v-else-if="item.icon === 'gallery'" d="M4 5h16v14H4zM7 15l3-3 2 2 3-4 3 5M9 9h.01"/>
            <path v-else-if="item.icon === 'announcements'" d="M4 10v4h3l9 4V6l-9 4H4zM7 14l2 6h4"/>
            <path v-else-if="item.icon === 'leadership' || item.icon === 'users'" d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm6-7.5a4 4 0 0 1 0 7.5m2 4a4 4 0 0 1 2 3.5V21"/>
            <path v-else d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm0-12v2m0 13v2m8-8h-2m-12 0H4m13.7-5.7-1.4 1.4m-8.6 8.6-1.4 1.4m11.4 0-1.4-1.4m-8.6-8.6L6.3 6.3"/>
          </svg>
=======
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-navy-700 transition-all duration-200"
          active-class="!bg-primary-600 !text-white">
          <span class="text-base w-5 text-center flex-shrink-0">{{ item.icon }}</span>
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- User info + footer -->
<<<<<<< HEAD
      <div class="px-4 py-4 border-t border-gray-200 dark:border-navy-700 space-y-2">
=======
      <div class="px-4 py-4 border-t border-navy-700 space-y-2">
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
        <div class="flex items-center gap-3 px-2 py-2">
          <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {{ initials }}
          </div>
          <div class="flex-1 min-w-0">
<<<<<<< HEAD
            <p class="text-navy-800 dark:text-white text-xs font-semibold truncate">{{ authStore.fullName }}</p>
            <p class="text-gray-400 text-xs truncate">{{ authStore.user?.email }}</p>
          </div>
        </div>
        <RouterLink to="/dashboard" class="admin-sidebar__utility flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/></svg> My Dashboard
        </RouterLink>
        <RouterLink to="/" class="admin-sidebar__utility flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg> Back to Website
        </RouterLink>
        <button @click="handleLogout" class="admin-sidebar__logout w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M10 17l5-5-5-5m5 5H3m9-9h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/></svg> Sign Out
=======
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
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
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
<<<<<<< HEAD
  { to: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { to: '/admin/events', icon: 'events', label: 'Events' },
  { to: '/admin/sermons', icon: 'sermons', label: 'Sermons' },
  { to: '/admin/gallery', icon: 'gallery', label: 'Gallery' },
  { to: '/admin/announcements', icon: 'announcements', label: 'Announcements' },
  { to: '/admin/leadership', icon: 'leadership', label: 'Leadership' },
  { to: '/admin/users', icon: 'users', label: 'Users' },
  { to: '/admin/settings', icon: 'settings', label: 'Settings' }
=======
  { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/admin/events', icon: '📅', label: 'Events' },
  { to: '/admin/sermons', icon: '🎙️', label: 'Sermons' },
  { to: '/admin/gallery', icon: '🖼️', label: 'Gallery' },
  { to: '/admin/announcements', icon: '📢', label: 'Announcements' },
  { to: '/admin/leadership', icon: '👑', label: 'Leadership' },
  { to: '/admin/users', icon: '👥', label: 'Users' },
  { to: '/admin/settings', icon: '⚙️', label: 'Settings' }
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
]

const currentTitle = computed(() => navItems.find(n => route.path.startsWith(n.to))?.label || 'Dashboard')

async function handleLogout() {
  await authStore.logout()
  router.push('/auth/login')
}
</script>
<<<<<<< HEAD

<style scoped>
.admin-sidebar { background:var(--color-surface); border-right:1px solid var(--color-border); color:var(--color-text-main); }
.admin-sidebar__link { color:var(--color-text-muted); }
.admin-sidebar__link:hover { background:var(--color-bg-alt); color:var(--color-heading); }
.admin-sidebar__link--active { background:rgba(237,198,75,.2); color:var(--color-heading); font-weight:700; }
.admin-sidebar__utility { color:var(--color-text-muted); }
.admin-sidebar__utility:hover { background:var(--color-bg-alt); color:var(--color-heading); }
.admin-sidebar__logout { color:#b94141; }
.admin-sidebar__logout:hover { background:rgba(185,65,65,.08); }
:global(.dark) .admin-sidebar__link--active { background:rgba(244,208,63,.13); color:#f4d03f; }
:global(.dark) .admin-sidebar__logout { color:#f09a9a; }
</style>
=======
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
