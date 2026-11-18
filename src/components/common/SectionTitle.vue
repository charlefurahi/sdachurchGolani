<template>
  <div class="mb-10 md:mb-14 text-center">
    <!-- Tag with decorative lines -->
    <div class="flex items-center justify-center gap-3 mb-3">
      <span :class="['flex-shrink-0 h-px w-8', dark ? 'bg-gradient-to-r from-transparent to-yellow-400' : 'bg-gradient-to-r from-transparent to-navy-300']" />
      <p :class="['section-tag', dark ? '!text-yellow-400' : '']">{{ tag }}</p>
      <span :class="['flex-shrink-0 h-px w-8', dark ? 'bg-gradient-to-l from-transparent to-yellow-400' : 'bg-gradient-to-l from-transparent to-navy-300']" />
    </div>

    <!-- Title -->
    <h2 :class="['section-heading section-title__heading mb-4', dark ? '!text-white' : '']">{{ title }}</h2>

    <!-- Yellow divider — solid, no gradient -->
    <div class="h-[3px] w-14 rounded-full mb-5 mx-auto bg-yellow-500" />

    <!-- Subtitle -->
    <p v-if="subtitle" :class="['section-subheading max-w-2xl mx-auto', dark ? '!text-white/70' : '']">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  tag:      { type: String,  default: 'GolaniSDA' },
  title:    { type: String,  required: true },
  subtitle: { type: String,  default: '' },
  center:   { type: Boolean, default: true },
  dark:     { type: Boolean, default: false },
})
</script>

<style scoped>
.section-title__heading {
  width: 100%;
  margin-inline: auto;
  text-align: center;
  text-wrap: balance;
}
</style>
