<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white">Announcements</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{{ total }} total · {{ pinned }} pinned</p>
      </div>
      <button @click="openCreate" class="btn-primary flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        New Announcement
      </button>
    </div>

    <!-- Table Card -->
    <div class="card overflow-hidden">
      <div class="p-4 border-b border-gray-100 dark:border-navy-700 flex gap-3">
        <div class="relative flex-1">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"/>
          </svg>
          <input v-model="search" type="text" placeholder="Search announcements..."
            class="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"/>
        </div>
        <select v-model="filterPriority" class="px-3 py-2 rounded-xl border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500">
          <option value="">All</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="normal">Normal</option>
          <option value="low">Low</option>
        </select>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="p-8 text-center text-gray-400">
        <div class="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-2"></div>
        Loading…
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm min-w-[600px]">
          <thead>
            <tr class="bg-gray-50 dark:bg-navy-900 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <th class="text-left px-5 py-3">Title</th>
              <th class="text-left px-5 py-3">Date</th>
              <th class="text-left px-5 py-3">Priority</th>
              <th class="text-left px-5 py-3">PDF</th>
              <th class="text-left px-5 py-3">Status</th>
              <th class="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-navy-700">
            <tr v-if="!filtered.length">
              <td colspan="6" class="px-5 py-10 text-center text-gray-400 text-xs">No announcements found.</td>
            </tr>
            <tr v-for="ann in filtered" :key="ann.id" class="hover:bg-gray-50 dark:hover:bg-navy-800/40 transition-colors">
              <td class="px-5 py-3.5">
                <p class="font-semibold text-navy-800 dark:text-white">{{ ann.title }}</p>
                <p class="text-xs text-gray-400 line-clamp-1 mt-0.5">{{ ann.content }}</p>
              </td>
              <td class="px-5 py-3.5 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {{ formatDate(ann.announcement_date || ann.created_at) }}
              </td>
              <td class="px-5 py-3.5">
                <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', priorityBadge(ann.priority)]">
                  {{ ann.priority || 'normal' }}
                </span>
              </td>
              <td class="px-5 py-3.5">
                <a v-if="ann.pdf_file_url" :href="ann.pdf_file_url" target="_blank"
                  class="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400 hover:underline font-medium">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
                  </svg>
                  View PDF
                </a>
                <span v-else class="text-xs text-gray-300 dark:text-navy-600">—</span>
              </td>
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span v-if="ann.is_pinned" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-gold-700 dark:bg-gold-900/30 dark:text-blue-400">📌 Pinned</span>
                  <span v-if="!ann.is_published" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 dark:bg-navy-700 dark:text-gray-400">Draft</span>
                  <span v-if="ann.is_published && !ann.is_pinned" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">Published</span>
                </div>
              </td>
              <td class="px-5 py-3.5">
                <div class="flex gap-2 justify-center">
                  <button @click="openEdit(ann)" class="text-xs text-primary-600 dark:text-blue-500 hover:underline font-medium">Edit</button>
                  <button @click="deleteAnn(ann)" class="text-xs text-red-500 hover:underline font-medium">Delete</button>
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
              <h3 class="font-heading font-bold text-navy-800 dark:text-white text-lg">
                {{ editing ? 'Edit Announcement' : 'New Announcement' }}
              </h3>
              <button @click="showForm = false" class="w-8 h-8 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors text-sm">✕</button>
            </div>
            <div class="p-6 space-y-5">
              <!-- Title -->
              <div>
                <label class="label">Title <span class="text-red-500">*</span></label>
                <input v-model="form.title" class="input" placeholder="Announcement title" required/>
              </div>
              <!-- Announcement Date -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="label">Announcement Date <span class="text-red-500">*</span></label>
                  <input v-model="form.announcement_date" type="date" class="input" required/>
                </div>
                <div>
                  <label class="label">Priority</label>
                  <select v-model="form.priority" class="select">
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <!-- Content -->
              <div>
                <label class="label">Content <span class="text-red-500">*</span></label>
                <textarea v-model="form.content" class="textarea" rows="5" placeholder="Full announcement text…" required></textarea>
              </div>
              <!-- PDF Upload -->
              <div>
                <label class="label">PDF Attachment</label>
                <div class="border-2 border-dashed border-gray-200 dark:border-navy-600 rounded-xl p-5">
                  <div v-if="form.pdf_file_url && !pdfFile" class="flex items-center gap-3 mb-3">
                    <svg class="w-8 h-8 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
                    </svg>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-navy-800 dark:text-white">Current PDF attached</p>
                      <a :href="form.pdf_file_url" target="_blank" class="text-xs text-primary-600 dark:text-blue-500 hover:underline">View PDF →</a>
                    </div>
                    <button @click="form.pdf_file_url = null" class="text-xs text-red-500 hover:underline">Remove</button>
                  </div>
                  <div v-else-if="pdfFile" class="flex items-center gap-3 mb-3">
                    <svg class="w-8 h-8 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
                    </svg>
                    <p class="text-sm font-medium text-navy-800 dark:text-white flex-1 truncate">{{ pdfFile.name }}</p>
                    <button @click="pdfFile = null" class="text-xs text-red-500 hover:underline">Remove</button>
                  </div>
                  <label class="flex flex-col items-center cursor-pointer text-center gap-2">
                    <svg class="w-8 h-8 text-gray-300 dark:text-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                    </svg>
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      {{ pdfFile ? 'Change PDF' : 'Upload PDF' }}
                    </span>
                    <span class="text-xs text-gray-400">PDF only · Max 20MB</span>
                    <input type="file" accept="application/pdf" class="hidden" @change="onPdfSelect"/>
                  </label>
                </div>
              </div>
              <!-- Flags -->
              <div class="flex flex-wrap gap-5">
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                  <input v-model="form.is_pinned" type="checkbox" class="w-4 h-4 accent-gold-500 rounded"/>
                  <span class="text-gray-700 dark:text-gray-200">📌 Pin this announcement</span>
                </label>
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                  <input v-model="form.is_published" type="checkbox" class="w-4 h-4 accent-primary-600 rounded"/>
                  <span class="text-gray-700 dark:text-gray-200">Publish immediately</span>
                </label>
              </div>
              <!-- Expire Date -->
              <div>
                <label class="label">Expiry Date <span class="text-xs text-gray-400">(optional)</span></label>
                <input v-model="form.expire_date" type="datetime-local" class="input"/>
              </div>
              <!-- Error -->
              <p v-if="formError" class="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 px-4 py-2.5 rounded-xl">⚠️ {{ formError }}</p>
            </div>
            <div class="sticky bottom-0 bg-white dark:bg-navy-800 border-t border-gray-100 dark:border-navy-700 px-6 py-4 flex gap-3 rounded-b-2xl">
              <button @click="save" :disabled="saving"
                class="btn-primary flex-1 flex items-center justify-center gap-2">
                <svg v-if="saving" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                {{ saving ? 'Saving…' : editing ? 'Save Changes' : 'Publish' }}
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
import announcementService from '@/services/announcementService'
import { formatDate } from '@/utils/index.js'

const items         = ref([])
const loading       = ref(false)
const saving        = ref(false)
const showForm      = ref(false)
const editing       = ref(null)
const search        = ref('')
const filterPriority = ref('')
const formError     = ref('')
const pdfFile       = ref(null)

const defaultForm = () => ({
  title: '', content: '', priority: 'normal',
  announcement_date: new Date().toISOString().split('T')[0],
  is_pinned: false, is_published: true,
  expire_date: '', pdf_file_url: null,
})
const form = ref(defaultForm())

const total  = computed(() => items.value.length)
const pinned = computed(() => items.value.filter(a => a.is_pinned).length)

const filtered = computed(() =>
  items.value.filter(a => {
    const q = search.value.toLowerCase()
    const matchQ = !q || a.title.toLowerCase().includes(q) || (a.content || '').toLowerCase().includes(q)
    const matchP = !filterPriority.value || a.priority === filterPriority.value
    return matchQ && matchP
  })
)

function priorityBadge(p) {
  return {
    urgent: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    high:   'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    normal: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
    low:    'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400',
  }[p] || 'bg-gray-100 text-gray-600'
}

async function load() {
  loading.value = true
  try {
    const res = await announcementService.getAll({ ordering: '-is_pinned,-created_at', page_size: 100 })
    items.value = res.results ?? res
  } catch { items.value = [] }
  finally { loading.value = false }
}

function openCreate() {
  editing.value = null; form.value = defaultForm(); pdfFile.value = null; formError.value = ''; showForm.value = true
}
function openEdit(ann) {
  editing.value = ann.id
  form.value = {
    title: ann.title, content: ann.content || '',
    priority: ann.priority || 'normal',
    announcement_date: ann.announcement_date || new Date().toISOString().split('T')[0],
    is_pinned: ann.is_pinned, is_published: ann.is_published,
    expire_date: ann.expire_date ? ann.expire_date.slice(0, 16) : '',
    pdf_file_url: ann.pdf_file_url || null,
  }
  pdfFile.value = null; formError.value = ''; showForm.value = true
}

function onPdfSelect(e) {
  const f = e.target.files[0]
  if (!f) return
  if (f.type !== 'application/pdf') { formError.value = 'Only PDF files are allowed.'; return }
  if (f.size > 20 * 1024 * 1024) { formError.value = 'PDF must be under 20MB.'; return }
  formError.value = ''; pdfFile.value = f
}

async function save() {
  if (!form.value.title.trim()) { formError.value = 'Title is required.'; return }
  if (!form.value.announcement_date) { formError.value = 'Date is required.'; return }
  saving.value = true; formError.value = ''
  try {
    const fd = new FormData()
    Object.entries(form.value).forEach(([k, v]) => {
      if (v !== null && v !== undefined && k !== 'pdf_file_url') fd.append(k, v)
    })
    if (pdfFile.value) fd.append('pdf_file', pdfFile.value)
    if (!pdfFile.value && form.value.pdf_file_url === null && editing.value) {
      fd.append('pdf_file', '')
    }

    if (editing.value) {
      await announcementService.updateMultipart(editing.value, fd)
    } else {
      await announcementService.createMultipart(fd)
    }
    showForm.value = false
    await load()
  } catch (err) {
    formError.value = err?.detail || err?.title?.[0] || 'An error occurred. Please try again.'
  } finally {
    saving.value = false
  }
}

async function deleteAnn(ann) {
  if (!confirm(`Delete "${ann.title}"? This cannot be undone.`)) return
  try {
    await announcementService.delete(ann.id)
    items.value = items.value.filter(a => a.id !== ann.id)
  } catch {
    alert('Could not delete. Please try again.')
  }
}

onMounted(load)
</script>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity .2s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>
