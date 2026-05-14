<template>
  <div :class="['min-h-screen transition-colors duration-300', isDark ? 'dark' : '']">
    <RouterView />
    <ScrollToTop />
    <Toast v-if="toast.show" :message="toast.message" :type="toast.type" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, provide } from 'vue'
import { RouterView } from 'vue-router'
import { useAppStore } from '@/stores/app'
import ScrollToTop from '@/components/common/ScrollToTop.vue'
import Toast from '@/components/common/Toast.vue'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { isDark, toast } = storeToRefs(appStore)

onMounted(() => {
  // Initialize theme from localStorage
  appStore.initTheme()
})
</script>
