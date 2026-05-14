<template>
  <button @click="appStore.toggleTheme()" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :class="['w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200', light ? 'text-white hover:bg-white/20' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-700']">
    <span class="text-lg">{{ isDark ? '☀️' : '🌙' }}</span>
  </button>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
const { isDark } = storeToRefs(appStore)
defineProps({ light: { type: Boolean, default: false } })
</script>
