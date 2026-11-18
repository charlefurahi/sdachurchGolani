<template>
  <button
    @click="appStore.toggleTheme()"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    class="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-700 overflow-hidden"
  >
    <!-- Sun icon (shown in dark mode) -->
    <Transition name="theme-icon">
      <span v-if="isDark" key="sun" class="absolute inset-0 flex items-center justify-center">
        <svg class="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </span>
    </Transition>

    <!-- Moon icon (shown in light mode) -->
    <Transition name="theme-icon">
      <span v-if="!isDark" key="moon" class="absolute inset-0 flex items-center justify-center">
        <svg class="w-5 h-5 text-navy-700 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
        </svg>
      </span>
    </Transition>
  </button>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const { isDark } = storeToRefs(appStore)

defineProps({ light: { type: Boolean, default: false } })
</script>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.25s ease;
}
.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-30deg) scale(0.7);
}
.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(30deg) scale(0.7);
}
</style>