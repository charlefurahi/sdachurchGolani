<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white">Sermons</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{{ items.length }} sermons · {{ featured }} featured</p>
      </div>
      <button @click="openCreate" class="btn-primary flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Add Sermon
      </button>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <div class="p-4 border-b border-gray-100 dark:border-navy-700 flex gap-3">
        <div class="relative flex-1">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"/>
          </svg>
          <input v-model="search" type="text" placeholder="Search sermons…"
            class="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"/>
        </div>
        <select v-model="filterCat" class="px-3 py-2 rounded-xl border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500">
          <option value="">All Types</option>
          <option v-for="c in CATEGORIES" :key="c.value" :value="c.value">{{ c.label }}</option>
        </select>
      </div>

      <div v-if="loading" class="p-8 text-center text-gray-400">
        <div class="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-2"></div>
        Loading…
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm min-w-[700px]">
          <thead>
            <tr class="bg-gray-50 dark:bg-navy-900 text-xs text-gray-500 uppercase tracking-wider">
              <th class="text-left px-5 py-3">Sermon</th>
              <th class="text-left px-5 py-3">Speaker</th>
              <th class="text-left px-5 py-3">Type</th>
              <th class="text-left px-5 py-3">Date</th>
              <th class="text-left px-5 py-3">Views</th>
              <th class="text-left px-5 py-3">Status</th>
              <th class="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-navy-700">
            <tr v-if="!filtered.length">
              <td colspan="7" class="px-5 py-10 text-center text-gray-400 text-xs">No sermons found.</td>
            </tr>
            <tr v-for="s in filtered" :key="s.id" class="hover:bg-gray-50 dark:hover:bg-navy-800/40 transition-colors">
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-navy-700 to-primary-800">
                    <img v-if="s.thumbnail_url || s.thumbnail" :src="s.thumbnail_url || s.thumbnail" :alt="s.title" class="w-full h-full object-cover"/>
<<<<<<< HEAD
                    <div v-else class="w-full h-full flex items-center justify-center text-white/70"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18.5v2.5m-5-8.5v1a5 5 0 0 0 10 0v-1m-5-8a4 4 0 0 0-4 4v5a4 4 0 0 0 8 0v-5a4 4 0 0 0-4-4z"/></svg></div>
=======
                    <div v-else class="w-full h-full flex items-center justify-center text-white/30 text-lg">🎙️</div>
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
                  </div>
                  <div>
                    <p class="font-semibold text-navy-800 dark:text-white">{{ s.title }}</p>
                    <p v-if="s.scripture || s.scripture_reference" class="text-xs text-blue-700 dark:text-blue-500 italic">{{ s.scripture || s.scripture_reference }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-3.5 text-xs text-gray-600 dark:text-gray-300">{{ s.speaker }}</td>
              <td class="px-5 py-3.5">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                  {{ s.category_display || s.category || 'General' }}
                </span>
              </td>
              <td class="px-5 py-3.5 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {{ fmt(s.preach_date || s.sermon_date || s.date) }}
              </td>
              <td class="px-5 py-3.5 text-xs text-gray-600 dark:text-gray-300">
<<<<<<< HEAD
                {{ (s.views_count || 0).toLocaleString() }} views
              </td>
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span v-if="s.is_featured" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">Featured</span>
=======
                👁 {{ (s.views_count || 0).toLocaleString() }}
              </td>
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span v-if="s.is_featured" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-gold-700 dark:bg-gold-900/30 dark:text-blue-400">⭐ Featured</span>
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
                  <span v-if="!s.is_published" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 dark:bg-navy-700 dark:text-gray-400">Draft</span>
                  <span v-if="s.is_published && !s.is_featured" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">Live</span>
                </div>
              </td>
              <td class="px-5 py-3.5">
                <div class="flex gap-2 justify-center">
                  <button @click="openEdit(s)" class="text-xs text-primary-600 dark:text-blue-500 hover:underline font-medium">Edit</button>
                  <button @click="deleteSermon(s)" class="text-xs text-red-500 hover:underline font-medium">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create / Edit Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showForm" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" @click.self="showForm = false">
          <div class="bg-white dark:bg-navy-800 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
            <div class="sticky top-0 bg-white dark:bg-navy-800 border-b border-gray-100 dark:border-navy-700 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <h3 class="font-heading font-bold text-navy-800 dark:text-white text-lg">{{ editing ? 'Edit Sermon' : 'Add Sermon' }}</h3>
              <button @click="showForm = false" class="w-8 h-8 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors text-sm">✕</button>
            </div>
            <div class="p-6 space-y-5">
              <div>
                <label class="label">Title <span class="text-red-500">*</span></label>
                <input v-model="form.title" class="input" placeholder="Sermon title" required/>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="label">Speaker</label>
                  <input v-model="form.speaker" class="input" placeholder="Pastor / Speaker name"/>
                </div>
                <div>
                  <label class="label">Date <span class="text-red-500">*</span></label>
                  <input v-model="form.preach_date" type="date" class="input" required/>
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="label">Scripture Reference</label>
                  <input v-model="form.scripture" class="input" placeholder="e.g. John 3:16"/>
                </div>
                <div>
                  <label class="label">Sermon Type</label>
                  <select v-model="form.category" class="select">
                    <option v-for="c in CATEGORIES" :key="c.value" :value="c.value">{{ c.label }}</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="label">Description</label>
                <textarea v-model="form.description" class="textarea" rows="3" placeholder="Brief description…"></textarea>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="label">Duration</label>
                  <input v-model="form.duration" class="input" placeholder="e.g. 45:30"/>
                </div>
                <div>
                  <label class="label">Video URL (YouTube / Vimeo)</label>
                  <input v-model="form.video_url" class="input" placeholder="https://youtube.com/watch?v=…"/>
                </div>
              </div>
              <!-- Audio Upload -->
              <div>
                <label class="label">Audio File</label>
                <div class="border-2 border-dashed border-gray-200 dark:border-navy-600 rounded-xl p-4">
                  <div v-if="audioFile" class="flex items-center gap-3 mb-2">
<<<<<<< HEAD
                  <svg class="h-6 w-6 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 18V5l12-2v13M9 18c0 1.1-1.6 2-3.5 2S2 19.1 2 18s1.6-2 3.5-2S9 16.9 9 18zm12-2c0 1.1-1.6 2-3.5 2S14 17.1 14 16s1.6-2 3.5-2 3.5.9 3.5 2z"/></svg>
=======
                    <span class="text-2xl">🎵</span>
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
                    <p class="text-sm font-medium text-navy-800 dark:text-white flex-1 truncate">{{ audioFile.name }}</p>
                    <button @click="audioFile = null" class="text-xs text-red-500 hover:underline">Remove</button>
                  </div>
                  <div v-else-if="form.audio_file_url" class="flex items-center gap-3 mb-2">
<<<<<<< HEAD
                  <svg class="h-6 w-6 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 18V5l12-2v13M9 18c0 1.1-1.6 2-3.5 2S2 19.1 2 18s1.6-2 3.5-2S9 16.9 9 18zm12-2c0 1.1-1.6 2-3.5 2S14 17.1 14 16s1.6-2 3.5-2 3.5.9 3.5 2z"/></svg>
=======
                    <span class="text-2xl">🎵</span>
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
                    <p class="text-sm text-navy-800 dark:text-white flex-1">Current audio attached</p>
                    <button @click="form.audio_file_url = null" class="text-xs text-red-500 hover:underline">Remove</button>
                  </div>
                  <label class="flex items-center gap-2 cursor-pointer text-sm text-gray-500 hover:text-primary-600 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                    </svg>
                    {{ audioFile || form.audio_file_url ? 'Change audio' : 'Upload audio (MP3/M4A)' }}
                    <input type="file" accept="audio/*" class="hidden" @change="e => audioFile = e.target.files[0]"/>
                  </label>
                </div>
              </div>
              <!-- Thumbnail Upload -->
              <div>
                <label class="label">Thumbnail / Speaker Photo</label>
                <div class="border-2 border-dashed border-gray-200 dark:border-navy-600 rounded-xl p-4">
                  <div v-if="thumbnailFile || form.thumbnail_url" class="flex items-center gap-3 mb-2">
                    <img :src="thumbnailFile ? URL.createObjectURL(thumbnailFile) : form.thumbnail_url" class="w-12 h-12 rounded-lg object-cover"/>
                    <button @click="thumbnailFile = null; form.thumbnail_url = null" class="text-xs text-red-500 hover:underline ml-auto">Remove</button>
                  </div>
                  <label class="flex items-center gap-2 cursor-pointer text-sm text-gray-500 hover:text-primary-600 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                    </svg>
                    {{ thumbnailFile || form.thumbnail_url ? 'Change image' : 'Upload thumbnail/poster (JPG, PNG)' }}
                    <input type="file" accept="image/*" class="hidden" @change="e => thumbnailFile = e.target.files[0]"/>
                  </label>
                </div>
              </div>
              <!-- Flags -->
              <div class="flex flex-wrap gap-5">
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                  <input v-model="form.is_featured" type="checkbox" class="w-4 h-4 accent-gold-500 rounded"/>
<<<<<<< HEAD
                  <span class="text-gray-700 dark:text-gray-200">Mark as featured</span>
=======
                  <span class="text-gray-700 dark:text-gray-200">⭐ Mark as Featured</span>
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
                </label>
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                  <input v-model="form.is_published" type="checkbox" class="w-4 h-4 accent-primary-600 rounded"/>
                  <span class="text-gray-700 dark:text-gray-200">Publish immediately</span>
                </label>
              </div>
<<<<<<< HEAD
              <p v-if="formError" class="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 px-4 py-2.5 rounded-xl">{{ formError }}</p>
=======
              <p v-if="formError" class="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 px-4 py-2.5 rounded-xl">⚠️ {{ formError }}</p>
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
            </div>
            <div class="sticky bottom-0 bg-white dark:bg-navy-800 border-t border-gray-100 dark:border-navy-700 px-6 py-4 flex gap-3 rounded-b-2xl">
              <button @click="save" :disabled="saving" class="btn-primary flex-1 flex items-center justify-center gap-2">
                <svg v-if="saving" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                {{ saving ? 'Saving…' : editing ? 'Save Changes' : 'Add Sermon' }}
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
import sermonService from '@/services/sermonService'

const CATEGORIES = [
  { value: 'sabbath',   label: 'Sabbath' },
  { value: 'salvation', label: 'Salvation' },
  { value: 'faith',     label: 'Faith' },
  { value: 'prayer',    label: 'Prayer' },
  { value: 'prophecy',  label: 'Prophecy' },
  { value: 'holiness',  label: 'Holiness' },
  { value: 'family',    label: 'Family' },
  { value: 'worship',   label: 'Worship' },
  { value: 'general',   label: 'General' },
]

const items    = ref([])
const loading  = ref(false)
const saving   = ref(false)
const showForm = ref(false)
const editing  = ref(null)
const search   = ref('')
const filterCat = ref('')
const formError = ref('')
const audioFile = ref(null)
const thumbnailFile = ref(null)

const defaultForm = () => ({
  title: '', speaker: '', preach_date: new Date().toISOString().split('T')[0],
  scripture: '', category: 'general', description: '',
  duration: '', video_url: '', is_featured: false, is_published: true,
  audio_file_url: null, thumbnail_url: null,
})
const form = ref(defaultForm())

const featured = computed(() => items.value.filter(s => s.is_featured).length)
const filtered = computed(() =>
  items.value.filter(s => {
    const q = search.value.toLowerCase()
    const matchQ = !q || s.title.toLowerCase().includes(q) || (s.speaker || '').toLowerCase().includes(q)
    const matchC = !filterCat.value || s.category === filterCat.value
    return matchQ && matchC
  })
)

function fmt(d) {
  if (!d) return '—'
  return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

async function load() {
  loading.value = true
  try {
    const res = await sermonService.getAll({ page_size: 100 })
    items.value = res.results ?? res
  } catch { items.value = [] }
  finally { loading.value = false }
}

function openCreate() {
  editing.value = null; form.value = defaultForm(); audioFile.value = null; thumbnailFile.value = null; formError.value = ''; showForm.value = true
}
function openEdit(s) {
  editing.value = s.id
  form.value = {
    title: s.title, speaker: s.speaker || '',
    preach_date: s.preach_date || s.sermon_date || '',
    scripture: s.scripture || s.scripture_reference || '',
    category: s.category || 'general', description: s.description || '',
    duration: s.duration || '', video_url: s.video_url || '',
    is_featured: s.is_featured || false, is_published: s.is_published !== false,
    audio_file_url: s.audio_file_url || null, thumbnail_url: s.thumbnail_url || null,
  }
  audioFile.value = null; thumbnailFile.value = null; formError.value = ''; showForm.value = true
}

async function save() {
  if (!form.value.title.trim()) { formError.value = 'Title is required.'; return }
  if (!form.value.preach_date) { formError.value = 'Date is required.'; return }
  saving.value = true; formError.value = ''
  try {
    const fd = new FormData()
    const { audio_file_url, thumbnail_url, ...rest } = form.value
    Object.entries(rest).forEach(([k, v]) => { if (v !== null && v !== undefined) fd.append(k, v) })
    if (audioFile.value) fd.append('audio_file', audioFile.value)
    if (thumbnailFile.value) fd.append('thumbnail', thumbnailFile.value)

    if (editing.value) {
      await sermonService.update(editing.value, fd)
    } else {
      await sermonService.create(fd)
    }
    showForm.value = false; await load()
  } catch (err) {
    formError.value = err?.detail || err?.title?.[0] || 'An error occurred.'
  } finally {
    saving.value = false
  }
}

async function deleteSermon(s) {
  if (!confirm(`Delete "${s.title}"? This cannot be undone.`)) return
  try {
    await sermonService.delete(s.id)
    items.value = items.value.filter(x => x.id !== s.id)
  } catch { alert('Could not delete. Please try again.') }
}

onMounted(load)
</script>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity .2s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>
