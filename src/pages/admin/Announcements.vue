<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white">Manage Announcements</h2>
      <button @click="showForm = true" class="btn-primary">+ New Announcement</button>
    </div>
    <div class="card overflow-hidden">
      <table class="w-full text-sm">
        <thead><tr class="bg-gray-50 dark:bg-navy-900 text-xs text-gray-500 uppercase">
          <th class="text-left px-5 py-3">Title</th><th class="text-left px-5 py-3">Category</th>
          <th class="text-left px-5 py-3">Date</th><th class="text-left px-5 py-3">Status</th><th class="px-5 py-3">Actions</th>
        </tr></thead>
        <tbody class="divide-y divide-gray-50 dark:divide-navy-700">
          <tr v-for="ann in announcements" :key="ann.id" class="hover:bg-gray-50 dark:hover:bg-navy-800/50">
            <td class="px-5 py-3.5">
              <p class="font-medium text-navy-800 dark:text-white">{{ ann.title }}</p>
              <p class="text-xs text-gray-400 line-clamp-1">{{ ann.summary }}</p>
            </td>
            <td class="px-5 py-3.5"><span class="badge-primary text-xs">{{ ann.category }}</span></td>
            <td class="px-5 py-3.5 text-xs text-gray-500">{{ ann.date }}</td>
            <td class="px-5 py-3.5">
              <span v-if="ann.isPinned" class="badge-gold text-xs">📌 Pinned</span>
              <span v-else-if="ann.isUrgent" class="badge bg-red-100 text-red-700 text-xs">Urgent</span>
              <span v-else class="text-xs text-gray-400">Normal</span>
            </td>
            <td class="px-5 py-3.5"><div class="flex gap-2 justify-center"><button class="text-xs text-primary-600 dark:text-gold-400 hover:underline">Edit</button><button class="text-xs text-red-500 hover:underline">Delete</button></div></td>
          </tr>
        </tbody>
      </table>
    </div>
    <Modal v-model="showForm" title="New Announcement" size="lg">
      <form class="space-y-4">
        <div><label class="label">Title *</label><input class="input" required /></div>
        <div><label class="label">Category</label><select class="select"><option>Administrative</option><option>Finance</option><option>Youth</option><option>Compassion</option><option>Events</option></select></div>
        <div><label class="label">Summary *</label><textarea class="textarea" rows="2" required></textarea></div>
        <div><label class="label">Full Body</label><textarea class="textarea" rows="4"></textarea></div>
        <div class="flex gap-4">
          <label class="flex items-center gap-2 text-sm"><input type="checkbox" class="accent-primary-600" /> Pin this announcement</label>
          <label class="flex items-center gap-2 text-sm"><input type="checkbox" class="accent-red-500" /> Mark as Urgent</label>
        </div>
        <div class="flex gap-3"><button type="button" @click="showForm = false" class="btn-primary">Publish</button><button type="button" @click="showForm = false" class="btn-ghost">Cancel</button></div>
      </form>
    </Modal>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { announcements } from '@/data/index.js'
import Modal from '@/components/common/Modal.vue'
const showForm = ref(false)
</script>
