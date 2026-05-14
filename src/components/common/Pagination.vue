<template>
  <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-10">
    <button @click="$emit('change', currentPage - 1)" :disabled="currentPage === 1"
      class="w-10 h-10 rounded-xl border border-gray-200 dark:border-navy-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:border-primary-400 hover:text-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
      ‹
    </button>
    <button v-for="page in pages" :key="page" @click="page !== '...' && $emit('change', page)"
      :class="['w-10 h-10 rounded-xl text-sm font-medium transition-all', page === currentPage ? 'bg-primary-600 text-white shadow-md' : page === '...' ? 'text-gray-400 cursor-default' : 'border border-gray-200 dark:border-navy-600 text-gray-600 dark:text-gray-300 hover:border-primary-400 hover:text-primary-600']">
      {{ page }}
    </button>
    <button @click="$emit('change', currentPage + 1)" :disabled="currentPage === totalPages"
      class="w-10 h-10 rounded-xl border border-gray-200 dark:border-navy-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:border-primary-400 hover:text-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
      ›
    </button>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({ currentPage: Number, totalPages: Number })
defineEmits(['change'])
const pages = computed(() => {
  const arr = []
  for (let i = 1; i <= props.totalPages; i++) {
    if (i === 1 || i === props.totalPages || Math.abs(i - props.currentPage) <= 1) arr.push(i)
    else if (arr[arr.length - 1] !== '...') arr.push('...')
  }
  return arr
})
</script>
