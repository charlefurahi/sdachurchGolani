<template>
  <section class="section bg-white dark:bg-navy-900">
    <div class="container-custom">
      <SectionTitle tag="Testimonials" title="What Our Members Say" subtitle="Stories of faith, transformation, and God's grace in our community." />
      <div class="relative overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="t in testimonials" :key="t.id" class="card p-6 relative">
            <div class="text-5xl text-blue-200 dark:text-blue-900 font-heading leading-none mb-3">"</div>
            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5 italic">{{ t.text }}</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {{ t.name.charAt(0) }}
              </div>
              <div>
                <p class="font-semibold text-sm text-navy-800 dark:text-white">{{ t.name }}</p>
                <p class="text-xs text-gray-400">{{ t.role }}</p>
              </div>
            </div>
            <div class="absolute top-5 right-5 flex gap-0.5">
              <span v-for="s in t.rating" :key="s" class="text-blue-500 text-xs">★</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import SectionTitle from '@/components/common/SectionTitle.vue'
import { testimonials } from '@/data/index.js'
</script>
