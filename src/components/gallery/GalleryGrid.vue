<template>
  <div>
    <div class="masonry-grid">
      <div v-for="(photo, i) in photos" :key="i" class="masonry-item group cursor-pointer relative overflow-hidden rounded-2xl"
        @click="$emit('open', i)">
        <img :src="photo.url || `https://picsum.photos/seed/${i + 100}/600/${300 + (i % 3) * 100}`"
          :alt="photo.caption || `Photo ${i + 1}`"
          class="w-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl"
          loading="lazy" />
        <div class="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/50 transition-all duration-300 rounded-2xl flex items-center justify-center">
          <span class="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">🔍</span>
        </div>
        <div v-if="photo.caption" class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy-900/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-b-2xl">
          <p class="text-white text-sm">{{ photo.caption }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({ photos: { type: Array, default: () => [] } })
defineEmits(['open'])
</script>
