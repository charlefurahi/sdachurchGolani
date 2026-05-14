<template>
  <div class="min-h-screen bg-gradient-to-br from-navy-900 via-primary-900 to-navy-950 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <RouterLink to="/" class="inline-block">
          <div class="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <span class="text-white font-accent text-2xl font-bold">G</span>
          </div>
          <h1 class="font-heading text-2xl font-bold text-white">GolaniSDA</h1>
          <p class="text-gray-400 text-sm mt-1">House of Faith</p>
        </RouterLink>
      </div>
      <div class="bg-white dark:bg-navy-800 rounded-3xl shadow-2xl overflow-hidden">
        <RouterView />
      </div>
      <p class="text-center text-gray-500 text-xs mt-6">
        © {{ new Date().getFullYear() }} GolaniSDA Church. All rights reserved.
      </p>
    </div>
  </div>
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
