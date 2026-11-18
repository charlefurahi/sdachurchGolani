<template>
  <Transition name="scale">
    <button v-if="isVisible" @click="scrollTop" aria-label="Scroll to top"
      class="fixed bottom-6 right-6 z-30 w-12 h-12 bg-primary-600 hover:bg-blue-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 animate-pulse-gold">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/></svg>
    </button>
  </Transition>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const isVisible = ref(false)
const handleScroll = () => isVisible.value = window.scrollY > 400
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
