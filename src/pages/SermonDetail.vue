<template>
  <div class="pt-24 pb-16">
    <div class="container-custom">
      <Breadcrumbs :crumbs="[{ to: '/sermons', label: 'Sermons' }, { label: sermon?.title || 'Sermon' }]" />
      <div v-if="sermon" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <span class="badge-primary mb-3 inline-block">{{ sermon.topic }}</span>
          <h1 class="font-heading text-3xl md:text-4xl font-bold text-navy-800 dark:text-white mb-3">{{ sermon.title }}</h1>
          <p class="text-gold-600 dark:text-gold-400 italic mb-2">{{ sermon.scripture }}</p>
          <p class="text-sm text-gray-500 mb-6">{{ sermon.speaker }} · {{ formatDate(sermon.date) }} · {{ sermon.duration }}</p>
          <div class="h-64 bg-navy-900 rounded-2xl flex items-center justify-center mb-6">
            <div class="text-center text-white/40"><div class="text-5xl mb-2">📺</div><p class="text-sm">Video Player — Ready for YouTube Integration</p></div>
          </div>
          <div class="bg-gray-50 dark:bg-navy-800 rounded-2xl p-5 mb-6">
            <p class="text-sm font-semibold text-navy-800 dark:text-white mb-3">Audio Player</p>
            <div class="flex items-center gap-4">
              <button class="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center">▶</button>
              <div class="flex-1"><div class="h-1 bg-gray-200 dark:bg-navy-600 rounded-full"><div class="h-1 bg-primary-500 w-1/3 rounded-full"></div></div></div>
              <span class="text-xs text-gray-400">{{ sermon.duration }}</span>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ sermon.description }}</p>
        </div>
        <div class="space-y-4">
          <div class="card p-5">
            <h3 class="font-semibold text-navy-800 dark:text-white mb-4 text-sm">Sermon Details</h3>
            <div class="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <div>Speaker: <span class="font-medium text-navy-800 dark:text-white">{{ sermon.speaker }}</span></div>
              <div>Date: <span class="font-medium text-navy-800 dark:text-white">{{ formatDate(sermon.date) }}</span></div>
              <div>Duration: <span class="font-medium text-navy-800 dark:text-white">{{ sermon.duration }}</span></div>
              <div>Views: <span class="font-medium text-navy-800 dark:text-white">{{ sermon.views.toLocaleString() }}</span></div>
            </div>
            <div class="flex flex-col gap-2 mt-5">
              <a :href="sermon.audioUrl" download class="btn-primary btn-sm text-center">⬇ Download Audio</a>
              <RouterLink to="/sermons" class="btn-outline btn-sm text-center">← All Sermons</RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-20 text-gray-400">Sermon not found.</div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { sermons } from '@/data/sermons.js'
import { formatDate } from '@/utils/index.js'
import Breadcrumbs from '@/components/common/Breadcrumbs.vue'
const route = useRoute()
const sermon = computed(() => sermons.find(s => s.id === Number(route.params.id)))
</script>
