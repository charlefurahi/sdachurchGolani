<template>
  <AppPreloader />
  <RouterView />
  <ScrollToTop />
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import ScrollToTop from '@/components/common/ScrollToTop.vue'
import AppPreloader from '@/components/common/AppPreloader.vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

onMounted(() => {
  // Apply saved dark mode preference
  appStore.initTheme()
})
</script>