<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white">Manage Gallery</h2>
      <button @click="showForm = true" class="btn-primary">+ New Album</button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div v-for="album in albums" :key="album.id" class="card overflow-hidden group">
        <div class="h-36 bg-gradient-to-br from-primary-600 to-navy-800 relative flex items-center justify-center">
          <div class="text-4xl opacity-20">🖼️</div>
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            <button class="w-9 h-9 bg-white rounded-full flex items-center justify-center text-sm">✏️</button>
            <button class="w-9 h-9 bg-white rounded-full flex items-center justify-center text-sm">🗑️</button>
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
        <div><label class="label">Upload Photos</label><div class="border-2 border-dashed border-gray-200 dark:border-navy-600 rounded-xl p-8 text-center text-gray-400"><div class="text-3xl mb-2">📸</div><p class="text-sm">Drag & drop photos here or click to upload</p><p class="text-xs mt-1">JPG, WebP — Max 5MB each</p></div></div>
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
