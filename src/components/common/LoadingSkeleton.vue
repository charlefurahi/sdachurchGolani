<template>
  <div class="space-y-4">
    <div v-for="i in count" :key="i" class="card p-5 animate-pulse">
      <div class="skeleton h-48 w-full rounded-xl mb-4"></div>
      <div class="space-y-2">
        <div class="skeleton h-4 w-3/4 rounded"></div>
        <div class="skeleton h-4 w-1/2 rounded"></div>
        <div class="skeleton h-3 w-full rounded mt-3"></div>
        <div class="skeleton h-3 w-5/6 rounded"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({ count: { type: Number, default: 3 } })
</script>
