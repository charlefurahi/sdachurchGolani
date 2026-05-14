<template>
  <section class="py-12 bg-gradient-to-r from-primary-800 to-navy-900 relative overflow-hidden">
    <div class="absolute inset-0 bg-hero-pattern opacity-10"></div>
    <div class="container-custom relative">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <div class="text-3xl mb-1">{{ stat.icon }}</div>
          <div class="font-heading text-3xl md:text-4xl font-bold text-white mb-1">
            <span ref="countRef">{{ stat.value }}</span>{{ stat.suffix }}
          </div>
          <p class="text-xs text-blue-200 tracking-wide">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { churchStats } from '@/data/index.js'
const stats = churchStats
</script>
