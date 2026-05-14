<template>
  <div class="flex h-screen bg-gray-50 dark:bg-navy-950 overflow-hidden">
    <aside :class="['fixed inset-y-0 left-0 z-50 w-64 bg-navy-900 transform transition-transform duration-300 flex flex-col', sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']">
      <div class="flex items-center gap-3 px-6 py-5 border-b border-navy-700">
        <div class="w-9 h-9 bg-gold-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <span class="text-white font-accent font-bold text-lg">G</span>
        </div>
        <div>
          <p class="text-white font-semibold text-sm">GolaniSDA</p>
          <p class="text-gray-400 text-xs">Admin Panel</p>
        </div>
        <button @click="sidebarOpen = false" class="ml-auto text-gray-400 hover:text-white lg:hidden">x</button>
      </div>
      <nav class="flex-1 px-3 py-4 overflow-y-auto space-y-1">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-navy-700 transition-all duration-200"
          active-class="!bg-primary-600 !text-white">
          <span class="text-lg">{{ item.icon }}</span>
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="px-4 py-4 border-t border-navy-700">
        <RouterLink to="/" class="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
          <span>Back to Website</span>
        </RouterLink>
      </div>
    </aside>
    <div v-if="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 bg-black/50 z-40 lg:hidden"></div>
    <div class="flex-1 flex flex-col lg:ml-64 overflow-hidden">
      <header class="bg-white dark:bg-navy-900 border-b border-gray-200 dark:border-navy-700 px-4 lg:px-6 py-4 flex items-center gap-4">
        <button @click="sidebarOpen = true" class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-800">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <h1 class="font-semibold text-gray-900 dark:text-white text-lg flex-1">{{ currentTitle }}</h1>
        <ThemeToggle />
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
            <span class="text-white text-xs font-bold">AD</span>
          </div>
        </div>
      </header>
      <main class="flex-1 overflow-y-auto p-4 lg:p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
const sidebarOpen = ref(false)
const route = useRoute()
const navItems = [
  { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/admin/events', icon: '📅', label: 'Events' },
  { to: '/admin/sermons', icon: '🎙️', label: 'Sermons' },
  { to: '/admin/gallery', icon: '🖼️', label: 'Gallery' },
  { to: '/admin/announcements', icon: '📢', label: 'Announcements' },
  { to: '/admin/users', icon: '👥', label: 'Users' },
  { to: '/admin/settings', icon: '⚙️', label: 'Settings' }
]
const currentTitle = computed(() => navItems.find(n => n.to === route.path)?.label || 'Dashboard')
</script>
