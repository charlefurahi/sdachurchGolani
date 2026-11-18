<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white">Manage Gallery</h2>
      <button @click="showForm = true" class="btn-primary">+ New Album</button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div v-for="album in albums" :key="album.id" class="card overflow-hidden group">
        <div class="h-36 bg-gradient-to-br from-primary-600 to-navy-800 relative flex items-center justify-center">
          <svg class="h-12 w-12 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path stroke-linecap="round" stroke-linejoin="round" d="m4 17 5-5 3 3 3-4 5 6"/></svg>
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            <button aria-label="Edit album" class="w-9 h-9 bg-white rounded-full flex items-center justify-center text-sm text-gray-700"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="m14 5 5 5M4 20l4.5-1 11-11a2.1 2.1 0 0 0-3-3l-11 11L4 20z"/></svg></button>
            <button aria-label="Delete album" class="w-9 h-9 bg-white rounded-full flex items-center justify-center text-sm text-gray-700"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16m-10 4v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3"/></svg></button>
          </div>
          <div class="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded">{{ album.photoCount }} photos</div>
        </div>
        <div class="p-3">
          <p class="font-medium text-navy-800 dark:text-white text-sm">{{ album.title }}</p>
          <p class="text-xs text-gray-400">{{ album.date }}</p>
        </div>
      </div>
      <div @click="showForm = true" class="border-2 border-dashed border-gray-200 dark:border-navy-600 rounded-2xl h-52 flex items-center justify-center cursor-pointer hover:border-primary-300 dark:hover:border-primary-600 transition-colors group">
        <div class="text-center text-gray-400 group-hover:text-primary-500 transition-colors">
          <div class="text-3xl mb-2">+</div><p class="text-sm font-medium">New Album</p>
        </div>
      </div>
    </div>
    <Modal v-model="showForm" title="Create New Album" size="md">
      <form class="space-y-4">
        <div><label class="label">Album Title *</label><input class="input" required /></div>
        <div><label class="label">Description</label><textarea class="textarea" rows="2"></textarea></div>
        <div><label class="label">Upload Photos</label><div class="border-2 border-dashed border-gray-200 dark:border-navy-600 rounded-xl p-8 text-center text-gray-500 dark:text-gray-400"><svg class="mx-auto mb-3 h-8 w-8 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16.5V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2.5M12 15V3m0 0L7.5 7.5M12 3l4.5 4.5"/></svg><p class="text-sm">Drag and drop photos here or choose files</p><p class="text-xs mt-1">JPG or WebP, up to 5 MB each</p></div></div>
        <div class="flex gap-3"><button type="button" @click="showForm = false" class="btn-primary">Create Album</button><button type="button" @click="showForm = false" class="btn-ghost">Cancel</button></div>
      </form>
    </Modal>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { galleryAlbums } from '@/data/index.js'
import Modal from '@/components/common/Modal.vue'
const albums = galleryAlbums; const showForm = ref(false)
</script>
