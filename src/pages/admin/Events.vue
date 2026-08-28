<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white">Events</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{{ items.length }} events · {{ upcoming }} upcoming</p>
      </div>
      <button @click="openCreate" class="btn-primary flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Add Event
      </button>
    </div>

    <div class="card overflow-hidden">
      <div class="p-4 border-b border-gray-100 dark:border-navy-700">
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"/>
          </svg>
          <input v-model="search" type="text" placeholder="Search events…"
            class="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"/>
        </div>
      </div>

      <div v-if="loading" class="p-8 text-center text-gray-400">
        <div class="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-2"></div>
        Loading…
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm min-w-[600px]">
          <thead>
            <tr class="bg-gray-50 dark:bg-navy-900 text-xs text-gray-500 uppercase tracking-wider">
              <th class="text-left px-5 py-3">Event</th>
              <th class="text-left px-5 py-3">Date</th>
              <th class="text-left px-5 py-3">Location</th>
              <th class="text-left px-5 py-3">Status</th>
              <th class="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-navy-700">
            <tr v-if="!filtered.length">
              <td colspan="5" class="px-5 py-10 text-center text-gray-400 text-xs">No events found.</td>
            </tr>
            <tr v-for="ev in filtered" :key="ev.id" class="hover:bg-gray-50 dark:hover:bg-navy-800/40 transition-colors">
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary-600 to-navy-800">
                    <img v-if="ev.banner_url || ev.banner" :src="ev.banner_url || ev.banner" :alt="ev.title" class="w-full h-full object-cover"/>
                    <div v-else class="w-full h-full flex items-center justify-center text-white/30">📅</div>
                  </div>
                  <div>
                    <p class="font-semibold text-navy-800 dark:text-white">{{ ev.title }}</p>
                    <p v-if="ev.speaker_name" class="text-xs text-gray-400">{{ ev.speaker_name }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-3.5 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {{ fmt(ev.start_date) }}
              </td>
              <td class="px-5 py-3.5 text-xs text-gray-600 dark:text-gray-300">
                {{ ev.location || (ev.is_online ? 'Online' : '—') }}
              </td>
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span v-if="ev.is_featured" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-gold-700 dark:bg-gold-900/30 dark:text-blue-400">⭐ Featured</span>
                  <span :class="['inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', isUpcoming(ev.start_date) ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-gray-100 text-gray-500 dark:bg-navy-700 dark:text-gray-400']">
                    {{ isUpcoming(ev.start_date) ? 'Upcoming' : 'Past' }}
                  </span>
                </div>
              </td>
              <td class="px-5 py-3.5">
                <div class="flex gap-2 justify-center">
                  <button @click="openEdit(ev)" class="text-xs text-primary-600 dark:text-blue-500 hover:underline font-medium">Edit</button>
                  <button @click="deleteEvent(ev)" class="text-xs text-red-500 hover:underline font-medium">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Event Form Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showForm" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" @click.self="showForm = false">
          <div class="bg-white dark:bg-navy-800 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
            <div class="sticky top-0 bg-white dark:bg-navy-800 border-b border-gray-100 dark:border-navy-700 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <h3 class="font-heading font-bold text-navy-800 dark:text-white text-lg">{{ editing ? 'Edit Event' : 'Add Event' }}</h3>
              <button @click="showForm = false" class="w-8 h-8 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors text-sm">✕</button>
            </div>
            <div class="p-6 space-y-5">
              <div>
                <label class="label">Title <span class="text-red-500">*</span></label>
                <input v-model="form.title" class="input" placeholder="Event title" required/>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="label">Start Date & Time <span class="text-red-500">*</span></label>
                  <input v-model="form.start_date" type="datetime-local" class="input" required/>
                </div>
                <div>
                  <label class="label">End Date & Time</label>
                  <input v-model="form.end_date" type="datetime-local" class="input"/>
                </div>
              </div>
              <div>
                <label class="label">Description</label>
                <textarea v-model="form.description" class="textarea" rows="3" placeholder="Event description…"></textarea>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="label">Location</label>
                  <input v-model="form.location" class="input" placeholder="Venue or address"/>
                </div>
                <div>
                  <label class="label">Speaker</label>
                  <input v-model="form.speaker_name" class="input" placeholder="Speaker name"/>
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="label">Bible Verse</label>
                  <input v-model="form.bible_verse" class="input" placeholder="e.g. John 3:16"/>
                </div>
                <div>
                  <label class="label">Max Attendees</label>
                  <input v-model="form.max_attendees" type="number" min="0" class="input" placeholder="Leave blank for unlimited"/>
                </div>
              </div>
              <!-- Banner upload -->
              <div>
                <label class="label">Event Banner / Poster</label>
                <div class="border-2 border-dashed border-gray-200 dark:border-navy-600 rounded-xl p-4 flex items-center gap-4">
                  <div v-if="bannerFile || form.banner_url" class="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img :src="bannerFile ? URL.createObjectURL(bannerFile) : form.banner_url" class="w-full h-full object-cover"/>
                  </div>
                  <label class="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 cursor-pointer transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                    </svg>
                    {{ bannerFile || form.banner_url ? 'Change banner' : 'Upload event banner' }}
                    <input type="file" accept="image/*" class="hidden" @change="e => bannerFile = e.target.files[0]"/>
                  </label>
                </div>
              </div>
              <div class="flex flex-wrap gap-5">
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                  <input v-model="form.is_featured" type="checkbox" class="w-4 h-4 accent-gold-500 rounded"/>
                  <span class="text-gray-700 dark:text-gray-200">⭐ Featured</span>
                </label>
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                  <input v-model="form.is_online" type="checkbox" class="w-4 h-4 accent-primary-600 rounded"/>
                  <span class="text-gray-700 dark:text-gray-200">🌐 Online Event</span>
                </label>
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                  <input v-model="form.rsvp_required" type="checkbox" class="w-4 h-4 accent-primary-600 rounded"/>
                  <span class="text-gray-700 dark:text-gray-200">RSVP Required</span>
                </label>
              </div>
              <p v-if="formError" class="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 px-4 py-2.5 rounded-xl">⚠️ {{ formError }}</p>
            </div>
            <div class="sticky bottom-0 bg-white dark:bg-navy-800 border-t border-gray-100 dark:border-navy-700 px-6 py-4 flex gap-3 rounded-b-2xl">
              <button @click="save" :disabled="saving" class="btn-primary flex-1 flex items-center justify-center gap-2">
                <svg v-if="saving" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                {{ saving ? 'Saving…' : editing ? 'Save Changes' : 'Create Event' }}
              </button>
              <button @click="showForm = false" class="btn-ghost">Cancel</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import eventService from '@/services/eventService'

const items    = ref([])
const loading  = ref(false)
const saving   = ref(false)
const showForm = ref(false)
const editing  = ref(null)
const search   = ref('')
const formError = ref('')
const bannerFile = ref(null)

const defaultForm = () => ({
  title: '', description: '', start_date: '', end_date: '',
  location: '', speaker_name: '', bible_verse: '',
  max_attendees: '', is_featured: false, is_online: false,
  rsvp_required: false, banner_url: null,
})
const form = ref(defaultForm())

const upcoming = computed(() => items.value.filter(e => isUpcoming(e.start_date)).length)
const filtered = computed(() => {
  const q = search.value.toLowerCase()
  return items.value.filter(e => !q || e.title.toLowerCase().includes(q) || (e.location || '').toLowerCase().includes(q))
})

function isUpcoming(d) { return d ? new Date(d) > new Date() : false }
function fmt(d) { if (!d) return '—'; return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) }

async function load() {
  loading.value = true
  try {
    const res = await eventService.getAll({ page_size: 100, ordering: '-start_date' })
    items.value = res.results ?? res
  } catch (e) {
    console.error('Events load error:', e)
    items.value = []
  }
  finally { loading.value = false }
}

function openCreate() { editing.value = null; form.value = defaultForm(); bannerFile.value = null; formError.value = ''; showForm.value = true }
function openEdit(ev) {
  editing.value = ev.id
  form.value = {
    title: ev.title, description: ev.description || '',
    start_date: ev.start_date ? ev.start_date.slice(0, 16) : '',
    end_date: ev.end_date ? ev.end_date.slice(0, 16) : '',
    location: ev.location || '', speaker_name: ev.speaker_name || '',
    bible_verse: ev.bible_verse || '', max_attendees: ev.max_attendees || '',
    is_featured: ev.is_featured || false, is_online: ev.is_online || false,
    rsvp_required: ev.rsvp_required || false,
    banner_url: ev.banner_url || ev.banner || null,
  }
  bannerFile.value = null; formError.value = ''; showForm.value = true
}

async function save() {
  if (!form.value.title.trim() || !form.value.start_date) { formError.value = 'Title and start date are required.'; return }
  saving.value = true; formError.value = ''
  try {
    const fd = new FormData()
    const { banner_url, ...rest } = form.value

    Object.entries(rest).forEach(([k, v]) => {
      if (v === null || v === undefined) return
      if (typeof v === 'boolean') {
        // FormData needs string booleans; Django REST Framework reads them correctly
        fd.append(k, v ? 'true' : 'false')
      } else if (k === 'start_date' || k === 'end_date') {
        // datetime-local gives "2026-06-02T10:00" — Django needs seconds too
        if (v !== '') fd.append(k, v.length === 16 ? v + ':00' : v)
      } else if (v !== '') {
        fd.append(k, v)
      }
    })

    if (bannerFile.value) fd.append('banner', bannerFile.value)

    if (editing.value) {
      await eventService.update(editing.value, fd)
    } else {
      await eventService.create(fd)
    }
    showForm.value = false; await load()
  } catch (err) {
    const d = err?.response?.data || err
    formError.value = d?.detail || d?.title?.[0] || d?.start_date?.[0] || JSON.stringify(d) || 'An error occurred.'
  } finally { saving.value = false }
}

async function deleteEvent(ev) {
  if (!confirm(`Delete "${ev.title}"?`)) return
  try {
    await eventService.delete(ev.id)
    items.value = items.value.filter(x => x.id !== ev.id)
  } catch { alert('Could not delete.') }
}

onMounted(load)
</script>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity .2s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>
