<template>
  <Transition name="fade-up">
    <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-medium text-white"
      :class="type === 'success' ? 'bg-emerald-600' : type === 'error' ? 'bg-red-600' : 'bg-primary-600'">
      <span>{{ type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ' }}</span>
      {{ message }}
    </div>
  </Transition>
</template>
<script setup>
defineProps({ message: String, type: { type: String, default: 'success' } })
</script>
