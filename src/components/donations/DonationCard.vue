<template>
  <article class="card-hover group">
    <div class="relative aspect-video overflow-hidden bg-gradient-to-br from-primary-100 to-gold-100 dark:from-navy-700 dark:to-navy-600">
      <img v-if="campaign.image" :src="campaign.image" :alt="campaign.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy" @error="e => e.target.style.display = 'none'" />
      <div class="absolute top-3 left-3">
        <span class="badge badge-primary">{{ campaign.category }}</span>
      </div>
      <div v-if="campaign.featured" class="absolute top-3 right-3">
        <span class="badge bg-blue-700 text-white">⭐ Featured</span>
      </div>
    </div>
    <div class="p-5">
      <h3 class="font-heading text-xl font-semibold text-navy-800 dark:text-white mb-2">{{ campaign.title }}</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-5">{{ campaign.description }}</p>
      <!-- Progress -->
      <div class="mb-4">
        <div class="flex justify-between text-sm mb-1.5">
          <span class="font-semibold text-primary-600 dark:text-blue-500">{{ formatCurrency(campaign.raised, campaign.currency) }}</span>
          <span class="text-gray-500">of {{ formatCurrency(campaign.goal, campaign.currency) }}</span>
        </div>
        <div class="h-2.5 bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-primary-500 to-gold-500 rounded-full transition-all duration-700"
            :style="{ width: calcProgress(campaign.raised, campaign.goal) + '%' }" />
        </div>
        <p class="text-xs text-gray-500 mt-1 text-right">{{ calcProgress(campaign.raised, campaign.goal) }}% funded</p>
      </div>
      <div v-if="campaign.deadline" class="text-xs text-gray-400 mb-4">
        Deadline: {{ formatDate(campaign.deadline) }}
      </div>
      <button class="btn btn-primary w-full justify-center" @click="$emit('donate', campaign)">
        Donate Now 🙏
      </button>
    </div>
  </article>
</template>
<script setup>
import { formatCurrency, calcProgress, formatDate } from '@/utils'
defineProps({ campaign: Object })
defineEmits(['donate'])
</script>
