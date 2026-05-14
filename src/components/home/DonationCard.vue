<template>
  <div class="card-hover overflow-hidden group">
    <div class="h-48 bg-gradient-to-br from-primary-700 to-navy-800 relative flex items-center justify-center">
      <div class="text-6xl opacity-20">{{ category === 'Infrastructure' ? '🏛️' : category === 'Education' ? '🎓' : '🤝' }}</div>
      <span class="absolute top-3 left-3 badge-gold text-xs">{{ campaign.category }}</span>
    </div>
    <div class="p-5">
      <h3 class="font-heading text-lg font-semibold text-navy-800 dark:text-white mb-2">{{ campaign.title }}</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{{ campaign.description }}</p>
      <div class="mb-3">
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
          <span>{{ formatCurrency(campaign.raised, campaign.currency) }} raised</span>
          <span class="font-semibold text-primary-600 dark:text-gold-400">{{ progress }}%</span>
        </div>
        <div class="h-2 bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-primary-500 to-gold-500 rounded-full transition-all duration-1000" :style="{ width: progress + '%' }"></div>
        </div>
        <p class="text-xs text-gray-400 mt-1">Goal: {{ formatCurrency(campaign.goal, campaign.currency) }}</p>
      </div>
      <RouterLink to="/give" class="btn-primary w-full text-center mt-2">Donate Now</RouterLink>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { formatCurrency, progressPercent } from '@/utils/index.js'
const props = defineProps({ campaign: { type: Object, required: true } })
const category = computed(() => props.campaign.category)
const progress = computed(() => progressPercent(props.campaign.raised, props.campaign.goal))
</script>
