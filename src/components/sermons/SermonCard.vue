<template>
  <article class="card-hover group">
    <div class="relative overflow-hidden aspect-video bg-gradient-to-br from-navy-700 to-primary-800">
      <img v-if="sermon.thumbnail" :src="sermon.thumbnail" :alt="sermon.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
        loading="lazy" @error="handleImgError" />
      <div class="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button class="w-14 h-14 bg-gold-500 hover:bg-gold-400 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110">
          <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>
      <div class="absolute top-3 left-3">
        <span class="badge badge-gold">{{ sermon.topic }}</span>
      </div>
      <div class="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-lg">
        {{ sermon.duration }}
      </div>
      <div v-if="sermon.featured" class="absolute top-3 right-3">
        <span class="badge bg-gold-500 text-white">Featured</span>
      </div>
    </div>
    <div class="p-5">
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2 font-accent tracking-wide">{{ sermon.scripture }}</p>
      <h3 class="font-heading text-lg font-semibold text-navy-800 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-gold-400 transition-colors line-clamp-2">
        {{ sermon.title }}
      </h3>
      <div class="flex items-center gap-2 mb-3">
        <div class="w-7 h-7 bg-primary-100 dark:bg-primary-900/40 rounded-full flex items-center justify-center">
          <span class="text-primary-600 text-xs">🎙</span>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ sermon.speaker }}</p>
          <p class="text-xs text-gray-500">{{ formatDate(sermon.date) }}</p>
        </div>
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{{ sermon.description }}</p>
      <div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-navy-700">
        <div class="flex gap-3 text-xs text-gray-400">
          <span>👁 {{ sermon.views.toLocaleString() }}</span>
          <span>⬇ {{ sermon.downloads }}</span>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-ghost btn-sm text-xs">Audio</button>
          <RouterLink :to="`/sermons/${sermon.id}`" class="btn btn-primary btn-sm text-xs">Watch</RouterLink>
        </div>
      </div>
    </div>
  </article>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { formatDate } from '@/utils'
defineProps({ sermon: Object })
const handleImgError = (e) => { e.target.style.display = 'none' }
</script>
