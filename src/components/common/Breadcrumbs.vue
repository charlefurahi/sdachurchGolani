<template>
  <nav class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6" aria-label="Breadcrumb">
    <RouterLink to="/" class="hover:text-primary-600 dark:hover:text-gold-400 transition-colors">Home</RouterLink>
    <span v-for="(crumb, i) in crumbs" :key="i" class="flex items-center gap-2">
      <span class="text-gray-300 dark:text-gray-600">›</span>
      <RouterLink v-if="crumb.to" :to="crumb.to" class="hover:text-primary-600 dark:hover:text-gold-400 transition-colors">{{ crumb.label }}</RouterLink>
      <span v-else class="text-gray-900 dark:text-white font-medium">{{ crumb.label }}</span>
    </span>
  </nav>
</template>
<script setup>
import { RouterLink } from 'vue-router'
defineProps({ crumbs: { type: Array, default: () => [] } })
</script>
