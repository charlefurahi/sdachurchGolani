<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-navy-950 p-8">
    <div class="text-center max-w-md">
      <div class="font-heading text-[8rem] font-bold text-primary-100 dark:text-navy-800 leading-none mb-0">404</div>
      <div class="-mt-8 mb-6">
        <h1 class="font-heading text-3xl font-bold text-navy-800 dark:text-white mb-3">Page Not Found</h1>
        <p class="text-gray-500 dark:text-gray-400">The page you're looking for doesn't exist or may have been moved.</p>
      </div>
      <div class="flex gap-3 justify-center">
        <RouterLink to="/" class="btn-primary">Go Home</RouterLink>
        <RouterLink to="/contact" class="btn-outline">Contact Us</RouterLink>
      </div>
    </div>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
</script>
