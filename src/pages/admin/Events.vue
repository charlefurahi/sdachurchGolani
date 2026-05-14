<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white">Manage Events</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ events.length }} total events</p>
      </div>
      <button @click="showForm = true; editing = null; resetForm()" class="btn-primary">+ Add Event</button>
    </div>
    <div class="card overflow-hidden">
      <div class="p-4 border-b border-gray-100 dark:border-navy-700">
        <SearchBar v-model="search" placeholder="Search events..." />
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead><tr class="bg-gray-50 dark:bg-navy-900 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <th class="text-left px-5 py-3">Event</th><th class="text-left px-5 py-3">Date</th>
            <th class="text-left px-5 py-3">Category</th><th class="text-left px-5 py-3">Registered</th>
            <th class="text-left px-5 py-3">Actions</th>
          </tr></thead>
          <tbody class="divide-y divide-gray-50 dark:divide-navy-700">
            <tr v-for="event in filteredEvents" :key="event.id" class="hover:bg-gray-50 dark:hover:bg-navy-800/50 transition-colors">
              <td class="px-5 py-3.5">
                <p class="font-medium text-navy-800 dark:text-white">{{ event.title }}</p>
                <p class="text-xs text-gray-400">📍 {{ event.location }}</p>
              </td>
              <td class="px-5 py-3.5 text-gray-600 dark:text-gray-300">{{ event.date }}<br><span class="text-xs text-gray-400">{{ event.time }}</span></td>
              <td class="px-5 py-3.5"><span class="badge-primary text-xs">{{ event.category }}</span></td>
              <td class="px-5 py-3.5 text-gray-600 dark:text-gray-300">{{ event.registered }}/{{ event.capacity }}</td>
              <td class="px-5 py-3.5">
                <div class="flex gap-2">
                  <button @click="editEvent(event)" class="text-xs text-primary-600 dark:text-gold-400 hover:underline">Edit</button>
                  <button @click="deleteEvent(event.id)" class="text-xs text-red-500 hover:underline">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Modal v-model="showForm" :title="editing ? 'Edit Event' : 'Add New Event'" size="lg">
      <form @submit.prevent="saveEvent" class="space-y-4">
        <div><label class="label">Event Title *</label><input v-model="form.title" class="input" required /></div>
        <div class="grid grid-cols-2 gap-4">
          <div><label class="label">Date *</label><input v-model="form.date" type="date" class="input" required /></div>
          <div><label class="label">Time *</label><input v-model="form.time" type="time" class="input" required /></div>
        </div>
        <div><label class="label">Location *</label><input v-model="form.location" class="input" required /></div>
        <div><label class="label">Category</label><select v-model="form.category" class="select"><option v-for="c in categories" :key="c">{{ c }}</option></select></div>
        <div><label class="label">Description</label><textarea v-model="form.description" class="textarea" rows="3"></textarea></div>
        <div class="grid grid-cols-2 gap-4">
          <div><label class="label">Capacity</label><input v-model.number="form.capacity" type="number" class="input" /></div>
          <div><label class="label">Organizer</label><input v-model="form.organizer" class="input" /></div>
        </div>
        <div class="flex gap-3 pt-2">
          <button type="submit" class="btn-primary">{{ editing ? 'Update Event' : 'Create Event' }}</button>
          <button type="button" @click="showForm = false" class="btn-ghost">Cancel</button>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { events as eventsData, eventCategories } from '@/data/index.js'
import SearchBar from '@/components/common/SearchBar.vue'
import Modal from '@/components/common/Modal.vue'
const events = ref([...eventsData])
const search = ref('')
const showForm = ref(false)
const editing = ref(null)
const categories = eventCategories.filter(c => c !== 'All')
const form = ref({ title: '', date: '', time: '', location: '', category: 'Spiritual', description: '', capacity: 100, organizer: '' })
const filteredEvents = computed(() => events.value.filter(e => !search.value || e.title.toLowerCase().includes(search.value.toLowerCase())))
function resetForm() { form.value = { title: '', date: '', time: '', location: '', category: 'Spiritual', description: '', capacity: 100, organizer: '' } }
function editEvent(event) { editing.value = event.id; form.value = { ...event }; showForm.value = true }
function saveEvent() { if (editing.value) { const i = events.value.findIndex(e => e.id === editing.value); if (i !== -1) events.value[i] = { ...events.value[i], ...form.value } } else { events.value.unshift({ ...form.value, id: Date.now(), registered: 0, tags: [], featured: false }) }; showForm.value = false }
function deleteEvent(id) { events.value = events.value.filter(e => e.id !== id) }
</script>
