<template>
  <div class="card p-5 flex gap-4 group hover:shadow-md transition-shadow">
    <div class="w-2 rounded-full flex-shrink-0" :class="announcement.isUrgent ? 'bg-red-500' : 'bg-gold-500'"></div>
    <div class="flex-1 min-w-0">
      <div class="flex items-start gap-2 mb-1.5">
        <span v-if="announcement.isUrgent" class="badge bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 text-xs flex-shrink-0">Urgent</span>
        <span v-if="announcement.isPinned" class="badge bg-gold-100 text-gold-700 dark:bg-gold-900/40 dark:text-gold-300 text-xs flex-shrink-0">📌 Pinned</span>
      </div>
      <h3 class="font-semibold text-navy-800 dark:text-white text-sm leading-snug mb-1 group-hover:text-primary-600 dark:group-hover:text-gold-400 transition-colors">{{ announcement.title }}</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">{{ formatDate(announcement.date) }} · {{ announcement.category }}</p>
      <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">{{ announcement.summary }}</p>
      <button @click="$emit('read-more', announcement)" class="text-primary-600 dark:text-gold-400 text-xs font-semibold mt-2 hover:underline">Read more →</button>
    </div>
  </div>
</template>
<script setup>
import { formatDate } from '@/utils/index.js'
defineProps({ announcement: { type: Object, required: true } })
defineEmits(['read-more'])
</script>
