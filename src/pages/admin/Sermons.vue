<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div><h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white">Manage Sermons</h2></div>
      <button @click="showForm = true" class="btn-primary">+ Add Sermon</button>
    </div>
    <div class="card overflow-hidden">
      <div class="p-4 border-b border-gray-100 dark:border-navy-700"><SearchBar v-model="search" placeholder="Search sermons..." /></div>
      <table class="w-full text-sm">
        <thead><tr class="bg-gray-50 dark:bg-navy-900 text-xs text-gray-500 uppercase tracking-wider">
          <th class="text-left px-5 py-3">Sermon</th><th class="text-left px-5 py-3">Speaker</th>
          <th class="text-left px-5 py-3">Topic</th><th class="text-left px-5 py-3">Views</th><th class="px-5 py-3">Actions</th>
        </tr></thead>
        <tbody class="divide-y divide-gray-50 dark:divide-navy-700">
          <tr v-for="s in filtered" :key="s.id" class="hover:bg-gray-50 dark:hover:bg-navy-800/50 transition-colors">
            <td class="px-5 py-3.5"><p class="font-medium text-navy-800 dark:text-white">{{ s.title }}</p><p class="text-xs text-gray-400">{{ s.date }} · {{ s.duration }}</p></td>
            <td class="px-5 py-3.5 text-gray-600 dark:text-gray-300 text-xs">{{ s.speaker }}</td>
            <td class="px-5 py-3.5"><span class="badge-primary text-xs">{{ s.topic }}</span></td>
            <td class="px-5 py-3.5 text-gray-600 dark:text-gray-300">{{ s.views.toLocaleString() }}</td>
            <td class="px-5 py-3.5"><div class="flex gap-2 justify-center"><button class="text-xs text-primary-600 dark:text-gold-400 hover:underline">Edit</button><button class="text-xs text-red-500 hover:underline">Delete</button></div></td>
          </tr>
        </tbody>
      </table>
    </div>
    <Modal v-model="showForm" title="Add New Sermon" size="lg">
      <form class="space-y-4">
        <div><label class="label">Title *</label><input class="input" placeholder="Sermon title" /></div>
        <div class="grid grid-cols-2 gap-4">
          <div><label class="label">Speaker</label><input class="input" /></div>
          <div><label class="label">Date</label><input type="date" class="input" /></div>
        </div>
        <div><label class="label">Scripture</label><input class="input" placeholder="e.g. John 3:16" /></div>
        <div><label class="label">Topic</label><input class="input" /></div>
        <div><label class="label">Description</label><textarea class="textarea" rows="3"></textarea></div>
        <div><label class="label">Audio File URL</label><input class="input" placeholder="https://..." /></div>
        <div><label class="label">Video URL (YouTube)</label><input class="input" placeholder="https://youtube.com/embed/..." /></div>
        <div class="flex gap-3"><button type="button" @click="showForm = false" class="btn-primary">Save Sermon</button><button type="button" @click="showForm = false" class="btn-ghost">Cancel</button></div>
      </form>
    </Modal>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { sermons } from '@/data/sermons.js'
import SearchBar from '@/components/common/SearchBar.vue'
import Modal from '@/components/common/Modal.vue'
const search = ref(''); const showForm = ref(false)
const filtered = computed(() => sermons.filter(s => !search.value || s.title.toLowerCase().includes(search.value.toLowerCase())))
</script>
