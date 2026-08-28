<template>
  <Transition name="fade-up">
    <div
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-semibold text-white min-w-[220px] max-w-sm border border-white/10"
      :class="{
        'bg-navy-800 shadow-navy-800/30':       type === 'success',
        'bg-red-600 shadow-red-600/30':         type === 'error',
        'bg-primary-700 shadow-primary-700/30': type === 'info'
      }"
    >
      <!-- Icon -->
      <span
        class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
        :class="type === 'success' ? 'bg-yellow-400 text-navy-900' : 'bg-white/20'"
      >
        <!-- Success checkmark -->
        <svg v-if="type === 'success'" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <!-- Error X -->
        <svg v-else-if="type === 'error'" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <!-- Info -->
        <svg v-else class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
        </svg>
      </span>

      <!-- Message -->
      <span class="flex-1 leading-snug">{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  message: String,
  type: { type: String, default: 'success' }
})
</script>