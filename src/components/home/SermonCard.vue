<template>
  <div class="card-hover group">
    <div class="relative h-44 bg-gradient-to-br from-navy-700 to-primary-900 overflow-hidden">
      <div class="absolute inset-0 flex items-center justify-center text-6xl opacity-10">🎙️</div>
      <div v-if="sermon.featured" class="absolute top-3 left-3">
        <span class="badge bg-gold-500 text-white">Featured</span>
      </div>
      <div class="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-lg">{{ sermon.duration }}</div>
    </div>
    <div class="p-5">
      <span class="badge-primary text-xs mb-2 inline-block">{{ sermon.topic }}</span>
      <h3 class="font-heading text-lg font-semibold text-navy-800 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-gold-400 transition-colors line-clamp-2">{{ sermon.title }}</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">{{ sermon.speaker }} · {{ formatDate(sermon.date) }}</p>
      <p class="text-xs text-gold-600 dark:text-gold-400 italic mb-4">{{ sermon.scripture }}</p>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3 text-xs text-gray-400">
          <span>👁 {{ sermon.views.toLocaleString() }}</span>
          <span>⬇ {{ sermon.downloads }}</span>
        </div>
        <RouterLink :to="`/sermons/${sermon.id}`" class="text-primary-600 dark:text-gold-400 text-sm font-semibold hover:underline">
          Listen →
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { formatDate } from '@/utils/index.js'
defineProps({ sermon: { type: Object, required: true } })
</script>
