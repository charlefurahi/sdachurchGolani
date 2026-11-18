<template>
  <div class="group bg-white dark:bg-navy-800 rounded-2xl border border-gray-100 dark:border-navy-700 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
    <!-- Icon header -->
    <div class="h-36 bg-gradient-to-br from-primary-700 to-navy-800 relative flex items-center justify-center overflow-hidden">
      <svg class="h-16 w-16 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 20s-8-4.5-8-10a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5.5-8 10-8 10z"/><path stroke-linecap="round" d="M12 8v7m-3.5-3.5h7"/></svg>
      <div class="absolute inset-0 bg-hero-pattern opacity-10"></div>
      <!-- Progress ring hint -->
      <div class="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div
          class="h-full bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-1000"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
    </div>

    <div class="p-5">
      <h3 class="font-heading text-base font-bold text-navy-800 dark:text-white mb-1.5 group-hover:text-navy-500 dark:group-hover:text-gold-500 transition-colors">{{ campaign.title }}</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">{{ campaign.description }}</p>

      <!-- Progress bar -->
      <div class="mb-4">
        <div class="flex justify-between text-xs mb-2">
          <span class="text-gray-500 dark:text-gray-400">{{ formatCurrency(campaign.raised, campaign.currency) }} raised</span>
          <span class="font-bold text-navy-700 dark:text-gold-500">{{ progress }}%</span>
        </div>
        <div class="h-2.5 bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-primary-500 to-gold-500 rounded-full transition-all duration-1000"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
        <p class="text-xs text-gray-400 mt-1.5">Goal: {{ formatCurrency(campaign.goal, campaign.currency) }}</p>
      </div>

      <RouterLink to="/give" class="btn-primary w-full text-center text-sm py-2.5">Give Now</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { formatCurrency, progressPercent } from '@/utils/index.js'
const props = defineProps({ campaign: { type: Object, required: true } })
const progress = computed(() => progressPercent(props.campaign.raised, props.campaign.goal))
</script>
