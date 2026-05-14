<template>
  <div class="card-hover group">
    <div class="relative h-44 bg-gradient-to-br from-primary-700 to-navy-800 overflow-hidden">
      <!-- Banner image if available -->
      <img
        v-if="event.thumbnail || event.banner"
        :src="event.thumbnail || event.banner"
        :alt="event.title"
        class="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div class="absolute inset-0 flex items-center justify-center text-6xl opacity-20">📅</div>
      <div class="absolute top-3 left-3">
        <span :class="['badge', getCategoryClass(categoryName)]">{{ categoryName }}</span>
      </div>
      <div class="absolute bottom-3 right-3 bg-white/90 dark:bg-navy-900/90 rounded-xl px-3 py-1.5 text-center">
        <p class="font-bold text-primary-600 dark:text-gold-400 text-lg leading-none">{{ getDay(event.start_date) }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">{{ getMonth(event.start_date) }}</p>
      </div>
    </div>
    <div class="p-5">
      <h3 class="font-heading text-lg font-semibold text-navy-800 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-gold-400 transition-colors line-clamp-2">
        {{ event.title }}
      </h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-4">
        <span>🕐 {{ getTime(event.start_date) }}</span>
        <span v-if="event.location">📍 {{ event.location }}</span>
        <span v-else-if="event.is_online">🌐 Online</span>
      </p>
      <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2 mb-4">
        {{ event.short_description || event.description }}
      </p>
      <div class="flex items-center justify-between">
        <div v-if="event.max_attendees" class="text-xs text-gray-400">
          <span class="text-primary-600 dark:text-gold-400 font-semibold">{{ event.rsvp_count || 0 }}</span>/{{ event.max_attendees }} registered
        </div>
        <RouterLink
          :to="`/events/${event.id}`"
          class="text-primary-600 dark:text-gold-400 text-sm font-semibold hover:underline ml-auto"
        >
          Details →
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  event: { type: Object, required: true }
})

// category can be an object { id, name, slug, color } or a plain string
const categoryName = computed(() => {
  if (!props.event.category) return 'General'
  if (typeof props.event.category === 'object') return props.event.category.name
  return props.event.category
})

function getDay(d) {
  if (!d) return '--'
  return new Date(d).getDate()
}

function getMonth(d) {
  if (!d) return '---'
  return new Date(d).toLocaleString('en', { month: 'short' }).toUpperCase()
}

function getTime(d) {
  if (!d) return ''
  return new Date(d).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })
}

function getCategoryClass(cat) {
  const map = {
    'Worship Service':    'badge-primary',
    'Youth Program':      'badge-gold',
    'Community Outreach': 'bg-emerald-100 text-emerald-700',
    'Bible Study':        'bg-purple-100 text-purple-700',
    'Sabbath School':     'bg-orange-100 text-orange-700',
    'Evangelism':         'bg-rose-100 text-rose-700',
    'Prayer Meeting':     'bg-teal-100 text-teal-700',
    'Camp Meeting':       'bg-pink-100 text-pink-700',
    'Social':             'bg-yellow-100 text-yellow-700',
  }
  return map[cat] || 'badge-primary'
}
</script>