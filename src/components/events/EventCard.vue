<template>
  <article class="card-hover group cursor-pointer" @click="$emit('click', event)">
    <div class="relative overflow-hidden aspect-video bg-gradient-to-br from-primary-100 to-primary-200 dark:from-navy-700 dark:to-navy-600">
      <img v-if="event.image" :src="event.image" :alt="event.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy" @error="handleImgError" />
      <div v-else class="w-full h-full flex items-center justify-center">
        <span class="text-4xl">📅</span>
      </div>
      <div class="absolute top-3 left-3 flex gap-2">
        <span class="badge badge-gold">{{ event.category }}</span>
        <span v-if="event.featured" class="badge bg-primary-500 text-white">Featured</span>
      </div>
      <div class="absolute top-3 right-3 bg-white dark:bg-navy-900 text-center rounded-xl px-3 py-2 shadow-lg">
        <p class="font-accent text-primary-600 dark:text-gold-400 text-xs font-bold uppercase">
          {{ formatDate(event.date, { month: 'short' }) }}
        </p>
        <p class="font-heading text-navy-900 dark:text-white text-2xl font-bold leading-none">
          {{ new Date(event.date).getDate() }}
        </p>
      </div>
    </div>
    <div class="p-5">
      <h3 class="font-heading text-lg font-semibold text-navy-800 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-gold-400 transition-colors line-clamp-2">
        {{ event.title }}
      </h3>
      <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
        <span class="flex items-center gap-1">🕐 {{ event.time }}</span>
        <span class="flex items-center gap-1">📍 {{ event.location }}</span>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">{{ event.description }}</p>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1 text-xs text-gray-500">
          <span>👥</span>
          <span>{{ event.registered }}/{{ event.capacity }} registered</span>
        </div>
        <button class="btn btn-primary btn-sm">RSVP</button>
      </div>
      <!-- Capacity bar -->
      <div class="mt-3 h-1.5 bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-primary-400 to-gold-500 rounded-full transition-all duration-500"
          :style="{ width: Math.min((event.registered / event.capacity) * 100, 100) + '%' }" />
      </div>
    </div>
  </article>
</template>
<script setup>
import { formatDate } from '@/utils'
defineProps({ event: Object })
defineEmits(['click'])
const handleImgError = (e) => { e.target.style.display = 'none' }
</script>
