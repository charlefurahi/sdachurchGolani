<template>
  <section class="section bg-gray-50 dark:bg-navy-950">
    <div class="container-custom">
      <SectionTitle tag="Our Ministries" title="Serving Through Every Season" subtitle="Discover the diverse ways we grow, serve, and worship together as a church family." />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="ministry in ministries" :key="ministry.id"
          class="card-hover p-6 group cursor-pointer border border-transparent hover:border-primary-100 dark:hover:border-navy-600">
          <div :class="['w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110', ministry.color]">
            {{ ministry.icon }}
          </div>
          <h3 class="font-heading text-xl font-semibold text-navy-800 dark:text-white mb-2">{{ ministry.name }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{{ ministry.description }}</p>
          <div class="flex items-center justify-between text-xs text-gray-400">
            <span>Led by {{ ministry.leader }}</span>
            <span class="text-gold-500 font-medium">{{ ministry.meetingTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import SectionTitle from '@/components/common/SectionTitle.vue'
import { ministries } from '@/data/index.js'
</script>
