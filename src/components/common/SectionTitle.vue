<template>
  <div :class="['mb-10 md:mb-14', center ? 'text-center' : '']">
    <p class="section-tag mb-3">{{ tag }}</p>
    <h2 class="section-heading mb-4">{{ title }}</h2>
    <div :class="['divider-gold mb-5', center ? 'mx-auto' : '']"></div>
    <p v-if="subtitle" class="section-subheading max-w-2xl" :class="center ? 'mx-auto' : ''">{{ subtitle }}</p>
  </div>
</template>
<script setup>
defineProps({
  tag: { type: String, default: 'GolaniSDA' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  center: { type: Boolean, default: true }
})
</script>
