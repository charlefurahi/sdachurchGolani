<template>
  <nav class="flex items-center gap-1.5 text-sm mb-6 flex-wrap" aria-label="Breadcrumb">

    <!-- Home -->
    <RouterLink
      to="/"
      class="flex items-center gap-1 text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-blue-500 transition-colors duration-200 font-medium"
    >
      <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      Home
    </RouterLink>

    <!-- Crumbs -->
    <span v-for="(crumb, i) in crumbs" :key="i" class="flex items-center gap-1.5">

      <!-- Separator -->
      <svg class="w-3 h-3 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>

      <!-- Link crumb -->
      <RouterLink
        v-if="crumb.to"
        :to="crumb.to"
        class="text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-blue-500 transition-colors duration-200 font-medium"
      >
        {{ crumb.label }}
      </RouterLink>

      <!-- Current page crumb -->
      <span
        v-else
        class="text-navy-900 dark:text-white font-semibold"
      >
        {{ crumb.label }}
      </span>

    </span>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  crumbs: { type: Array, default: () => [] }
})
</script>