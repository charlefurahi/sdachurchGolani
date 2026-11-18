<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-navy-800 dark:text-white">Church Leadership</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage pastors, elders, and other church officers.</p>
      </div>
      <div class="flex gap-2">
        <button @click="activeView = 'leaders'" :class="['px-4 py-2 rounded-xl text-sm font-medium transition-colors', activeView === 'leaders' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-navy-800 text-gray-600 dark:text-gray-300']">
<<<<<<< HEAD
          Leaders
        </button>
        <button @click="activeView = 'inquiries'; loadInquiries()" :class="['px-4 py-2 rounded-xl text-sm font-medium transition-colors relative', activeView === 'inquiries' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-navy-800 text-gray-600 dark:text-gray-300']">
          Inquiries
=======
          👑 Leaders
        </button>
        <button @click="activeView = 'inquiries'; loadInquiries()" :class="['px-4 py-2 rounded-xl text-sm font-medium transition-colors relative', activeView === 'inquiries' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-navy-800 text-gray-600 dark:text-gray-300']">
          💬 Inquiries
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
          <span v-if="unreadCount > 0" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">{{ unreadCount }}</span>
        </button>
        <button v-if="activeView === 'leaders'" @click="openCreate" class="btn-primary flex items-center gap-2">
          <span class="text-lg">+</span> Add Leader
        </button>
      </div>
    </div>

    <!-- ═══ LEADERS VIEW ═══ -->
    <template v-if="activeView === 'leaders'">
      <!-- Role filter tabs -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="['px-4 py-2 rounded-xl text-sm font-medium transition-colors', activeTab === tab.value ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-navy-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-700']"
        >
          {{ tab.label }} <span class="ml-1 opacity-70">({{ countFor(tab.value) }})</span>
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="n in 6" :key="n" class="card p-4 animate-pulse space-y-3">
          <div class="flex gap-3 items-center">
            <div class="w-16 h-16 rounded-full bg-gray-200 dark:bg-navy-700 flex-shrink-0"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-200 dark:bg-navy-700 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 dark:bg-navy-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="card p-8 text-center">
        <p class="text-red-500">{{ error }}</p>
        <button @click="loadLeaders" class="btn-primary mt-4">Retry</button>
      </div>

      <!-- Grid -->
      <div v-else-if="filtered.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="leader in filtered"
          :key="leader.id"
          class="card p-4 flex items-start gap-4 hover:shadow-md transition-shadow"
          :class="{ 'opacity-60': !leader.is_active }"
        >
          <!-- Avatar -->
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-primary-600 to-navy-700 flex-shrink-0 overflow-hidden">
            <img v-if="leader.photo_url" :src="leader.photo_url" :alt="leader.full_name" class="w-full h-full object-cover object-top" @error="$event.target.style.display='none'" />
            <div class="w-full h-full flex items-center justify-center text-white font-bold text-lg">
              {{ leader.full_name.split(' ').slice(0,2).map(w=>w[0]).join('') }}
            </div>
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <div>
                <p class="font-semibold text-navy-800 dark:text-white text-sm leading-tight">{{ leader.full_name }}</p>
                <p class="text-xs text-blue-700 dark:text-blue-500 font-medium mt-0.5">{{ leader.display_role }}</p>
                <p v-if="!leader.is_active" class="text-xs text-red-400 mt-0.5">Hidden</p>
              </div>
              <div class="flex gap-1 flex-shrink-0">
<<<<<<< HEAD
                <button @click="openEdit(leader)" class="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-navy-700 transition-colors" title="Edit"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="m14 5 5 5M4 20l4.5-1 11-11a2.1 2.1 0 0 0-3-3l-11 11L4 20z"/></svg></button>
                <button @click="confirmDelete(leader)" class="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" title="Delete"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16m-10 4v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3"/></svg></button>
=======
                <button @click="openEdit(leader)" class="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-navy-700 transition-colors" title="Edit">✏️</button>
                <button @click="confirmDelete(leader)" class="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" title="Delete">🗑️</button>
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
              </div>
            </div>
            <p v-if="leader.bio" class="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2">{{ leader.bio }}</p>
            <div v-if="leader.email || leader.phone" class="mt-1.5 flex gap-2 flex-wrap">
<<<<<<< HEAD
              <span v-if="leader.email" class="text-xs text-gray-500 dark:text-gray-400">{{ leader.email }}</span>
              <span v-if="leader.phone" class="text-xs text-gray-500 dark:text-gray-400">{{ leader.phone }}</span>
=======
              <span v-if="leader.email" class="text-xs text-gray-400">✉ {{ leader.email }}</span>
              <span v-if="leader.phone" class="text-xs text-gray-400">📞 {{ leader.phone }}</span>
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
            </div>
          </div>
        </div>
      </div>

      <!-- Empty -->
      <div v-else class="card p-10 text-center">
<<<<<<< HEAD
        <svg class="mx-auto mb-3 h-8 w-8 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>
=======
        <p class="text-4xl mb-3">👑</p>
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
        <p class="text-gray-500 dark:text-gray-400">No leaders found for this filter.</p>
        <button @click="openCreate" class="btn-primary mt-4">Add First Leader</button>
      </div>
    </template>

    <!-- ═══ INQUIRIES VIEW ═══ -->
    <template v-if="activeView === 'inquiries'">
      <div v-if="inquiriesLoading" class="space-y-4">
        <div v-for="n in 4" :key="n" class="card p-5 animate-pulse space-y-3">
          <div class="h-4 bg-gray-200 dark:bg-navy-700 rounded w-1/3"></div>
          <div class="h-3 bg-gray-200 dark:bg-navy-700 rounded w-full"></div>
        </div>
      </div>

      <div v-else-if="!inquiries.length" class="card p-12 text-center">
<<<<<<< HEAD
        <svg class="mx-auto mb-3 h-8 w-8 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-3.7-.8L4 20l1.2-3.6A7.2 7.2 0 0 1 4 12c0-4.1 3.6-7.5 8-7.5s8 3.1 8 7z"/></svg>
=======
        <p class="text-4xl mb-3">💬</p>
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
        <p class="text-gray-500 dark:text-gray-400">No inquiries yet.</p>
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="inq in inquiries"
          :key="inq.id"
          class="card p-5 hover:shadow-md transition-shadow cursor-pointer"
          :class="!inq.is_read ? 'border-l-4 border-primary-500' : ''"
          @click="openInquiry(inq)"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span v-if="!inq.is_read" class="inline-flex px-2 py-0.5 rounded-full text-xs font-bold bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">New</span>
                <span v-if="inq.replied" class="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">Replied</span>
                <p class="font-semibold text-sm text-navy-800 dark:text-white">{{ inq.subject }}</p>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">From: <strong>{{ inq.name }}</strong> &lt;{{ inq.email }}&gt;</p>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-2">{{ inq.message }}</p>
            </div>
            <div class="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
              {{ formatDate(inq.created_at) }}
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- ══════════════ MODALS ══════════════ -->
    <Teleport to="body">
      <!-- Leader Create / Edit Modal -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white dark:bg-navy-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-navy-700">
            <h2 class="font-bold text-navy-800 dark:text-white">{{ isEditing ? 'Edit Leader' : 'Add Leader' }}</h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl w-8 h-8 flex items-center justify-center">✕</button>
          </div>

          <form class="p-6 space-y-4" @submit.prevent="saveLeader">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
              <input v-model="form.full_name" required class="input w-full" placeholder="e.g. Pastor John Mwangi" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role *</label>
                <select v-model="form.role" class="input w-full">
                  <option value="pastor">Pastor</option>
                  <option value="elder">Elder</option>
                  <option value="treasurer">Treasurer</option>
                  <option value="secretary">Secretary</option>
                  <option value="deacon">Deacon</option>
                  <option value="deaconess">Deaconess</option>
                  <option value="head_deacon">Head Deacon</option>
                  <option value="youth_leader">Youth Leader</option>
                  <option value="women_ministry">Women Ministry</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Custom Title</label>
                <input v-model="form.role_title" class="input w-full" placeholder="e.g. 1st Elder" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
              <textarea v-model="form.bio" rows="3" class="textarea w-full" placeholder="Brief description or testimony..."></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input v-model="form.email" type="email" class="input w-full" placeholder="email@church.org" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                <input v-model="form.phone" class="input w-full" placeholder="+255 7xx xxx xxx" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Order</label>
                <input v-model.number="form.order" type="number" min="0" class="input w-full" placeholder="0" />
              </div>
              <div class="flex items-end pb-1">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" v-model="form.is_active" class="w-4 h-4 accent-primary-600" />
                  <span class="text-sm text-gray-700 dark:text-gray-300">Visible on website</span>
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Photo</label>
              <!-- Preview current photo -->
              <div v-if="isEditing && form.photo_url && !newPhotoPreview" class="mb-2 flex items-center gap-3">
                <img :src="form.photo_url" class="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-navy-600" />
                <span class="text-xs text-gray-500">Current photo</span>
              </div>
              <div v-if="newPhotoPreview" class="mb-2 flex items-center gap-3">
                <img :src="newPhotoPreview" class="w-14 h-14 rounded-full object-cover border-2 border-primary-300" />
                <span class="text-xs text-gray-500">New photo selected</span>
              </div>
              <input type="file" @change="onPhoto" accept="image/*" class="text-sm text-gray-600 dark:text-gray-300" />
            </div>

            <div class="flex gap-3 pt-2">
              <button type="submit" :disabled="saving" class="btn-primary flex-1">
                {{ saving ? 'Saving…' : (isEditing ? 'Update Leader' : 'Add Leader') }}
              </button>
              <button type="button" @click="closeModal" class="btn-outline">Cancel</button>
            </div>

            <p v-if="formError" class="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">{{ formError }}</p>
          </form>
        </div>
      </div>

      <!-- Delete confirm -->
      <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white dark:bg-navy-800 rounded-2xl shadow-2xl w-full max-w-sm p-6">
          <h3 class="font-bold text-navy-800 dark:text-white mb-2">Delete Leader</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Are you sure you want to remove <strong>{{ deleteTarget?.full_name }}</strong>? This cannot be undone.
          </p>
          <div class="flex gap-3">
            <button @click="deleteLeader" :disabled="deleting" class="btn-primary bg-red-600 hover:bg-red-700 flex-1">
              {{ deleting ? 'Deleting…' : 'Delete' }}
            </button>
            <button @click="showDeleteConfirm = false" class="btn-outline flex-1">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Inquiry Detail Modal -->
      <div v-if="showInquiryModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white dark:bg-navy-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-navy-700">
            <h2 class="font-bold text-navy-800 dark:text-white">Inquiry Details</h2>
            <button @click="showInquiryModal = false" class="text-gray-400 hover:text-gray-600 text-xl w-8 h-8 flex items-center justify-center">✕</button>
          </div>
          <div v-if="selectedInquiry" class="p-6 space-y-4">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-500 dark:text-gray-400 block text-xs uppercase tracking-wide mb-1">From</span>
                <p class="font-semibold text-navy-800 dark:text-white">{{ selectedInquiry.name }}</p>
              </div>
              <div>
                <span class="text-gray-500 dark:text-gray-400 block text-xs uppercase tracking-wide mb-1">Date</span>
                <p class="text-gray-700 dark:text-gray-200">{{ formatDate(selectedInquiry.created_at) }}</p>
              </div>
              <div>
                <span class="text-gray-500 dark:text-gray-400 block text-xs uppercase tracking-wide mb-1">Email</span>
                <a :href="'mailto:' + selectedInquiry.email" class="text-primary-600 dark:text-blue-500 hover:underline">{{ selectedInquiry.email }}</a>
              </div>
              <div v-if="selectedInquiry.phone">
                <span class="text-gray-500 dark:text-gray-400 block text-xs uppercase tracking-wide mb-1">Phone</span>
                <p class="text-gray-700 dark:text-gray-200">{{ selectedInquiry.phone }}</p>
              </div>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400 block text-xs uppercase tracking-wide mb-1">Subject</span>
              <p class="font-semibold text-navy-800 dark:text-white">{{ selectedInquiry.subject }}</p>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400 block text-xs uppercase tracking-wide mb-1">Message</span>
              <p class="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line bg-gray-50 dark:bg-navy-900/50 p-3 rounded-xl text-sm">{{ selectedInquiry.message }}</p>
            </div>
            <div class="flex gap-3 pt-2">
              <a :href="'mailto:' + selectedInquiry.email + '?subject=Re: ' + selectedInquiry.subject"
                class="btn-primary flex-1 text-center">
<<<<<<< HEAD
                Reply via Email
=======
                ✉️ Reply via Email
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
              </a>
              <button @click="markInquiryRead(selectedInquiry)" class="btn-outline">
                {{ selectedInquiry.is_read ? '✓ Read' : 'Mark Read' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import leadershipService from '@/services/leadershipService'
import { formatDate } from '@/utils/index.js'

// ── View toggle ─────────────────────────────────────────────────
const activeView = ref('leaders')

// ── LEADERS ──────────────────────────────────────────────────────
const leaders = ref([])
const loading = ref(true)
const error   = ref(null)

const activeTab = ref('all')
const tabs = [
  { value: 'all',           label: 'All'           },
  { value: 'pastor',        label: 'Pastors'       },
  { value: 'elder',         label: 'Elders'        },
  { value: 'treasurer',     label: 'Treasurer'     },
  { value: 'secretary',     label: 'Secretary'     },
  { value: 'deacon',        label: 'Deacons'       },
  { value: 'deaconess',     label: 'Deaconesses'   },
  { value: 'head_deacon',   label: 'Head Deacon'   },
  { value: 'youth_leader',  label: 'Youth Leaders' },
  { value: 'women_ministry',label: 'Women Ministry'},
  { value: 'other',         label: 'Others'        },
]

const filtered = computed(() => {
  if (activeTab.value === 'all') return leaders.value
  return leaders.value.filter(l => l.role === activeTab.value)
})

function countFor(tabValue) {
  if (tabValue === 'all') return leaders.value.length
  return leaders.value.filter(l => l.role === tabValue).length
}

async function loadLeaders() {
  loading.value = true
  error.value = null
  try {
    const res = await leadershipService.getAll()
    leaders.value = res.results ?? res ?? []
  } catch (e) {
    error.value = 'Failed to load leaders.'
  } finally {
    loading.value = false
  }
}

// ── Modal ─────────────────────────────────────────────────────────
const showModal       = ref(false)
const isEditing       = ref(false)
const saving          = ref(false)
const formError       = ref(null)
const editId          = ref(null)
const photoFile       = ref(null)
const newPhotoPreview = ref(null)

const defaultForm = () => ({
  full_name: '', role: 'elder', role_title: '', bio: '',
  email: '', phone: '', order: 0, is_active: true, photo_url: null,
})
const form = ref(defaultForm())

function openCreate() {
  isEditing.value       = false
  editId.value          = null
  form.value            = defaultForm()
  photoFile.value       = null
  newPhotoPreview.value = null
  formError.value       = null
  showModal.value       = true
}

function openEdit(leader) {
  isEditing.value       = true
  editId.value          = leader.id
  form.value            = { ...leader }
  photoFile.value       = null
  newPhotoPreview.value = null
  formError.value       = null
  showModal.value       = true
}

function closeModal() { showModal.value = false }

function onPhoto(e) {
  const file = e.target.files[0] || null
  photoFile.value = file
  newPhotoPreview.value = file ? URL.createObjectURL(file) : null
}

async function saveLeader() {
  saving.value = true
  formError.value = null
  try {
    const fd = new FormData()
    Object.entries(form.value).forEach(([k, v]) => {
      if (k !== 'photo_url' && v !== null && v !== undefined) fd.append(k, v)
    })
    if (photoFile.value) fd.append('photo', photoFile.value)

    if (isEditing.value) {
      const updated = await leadershipService.update(editId.value, fd)
      const idx = leaders.value.findIndex(l => l.id === editId.value)
      if (idx !== -1) leaders.value[idx] = updated
    } else {
      const created = await leadershipService.create(fd)
      leaders.value.unshift(created)
    }
    closeModal()
  } catch (e) {
    formError.value = e?.detail || e?.message || 'Save failed. Please try again.'
  } finally {
    saving.value = false
  }
}

// ── Delete ─────────────────────────────────────────────────────────
const showDeleteConfirm = ref(false)
const deleteTarget      = ref(null)
const deleting          = ref(false)

function confirmDelete(leader) {
  deleteTarget.value = leader
  showDeleteConfirm.value = true
}

async function deleteLeader() {
  deleting.value = true
  try {
    await leadershipService.delete(deleteTarget.value.id)
    leaders.value = leaders.value.filter(l => l.id !== deleteTarget.value.id)
    showDeleteConfirm.value = false
  } catch {
    alert('Delete failed. Please try again.')
  } finally {
    deleting.value = false
  }
}

// ── INQUIRIES ─────────────────────────────────────────────────────
const inquiries        = ref([])
const inquiriesLoading = ref(false)
const unreadCount      = ref(0)
const showInquiryModal = ref(false)
const selectedInquiry  = ref(null)

async function loadInquiries() {
  inquiriesLoading.value = true
  try {
    const res = await leadershipService.getInquiries()
    inquiries.value = res.results ?? res ?? []
    unreadCount.value = inquiries.value.filter(i => !i.is_read).length
  } catch (e) {
    console.warn('Inquiries fetch failed:', e)
  } finally {
    inquiriesLoading.value = false
  }
}

function openInquiry(inq) {
  selectedInquiry.value = inq
  showInquiryModal.value = true
  // Mark read locally
  if (!inq.is_read) {
    inq.is_read = true
    unreadCount.value = Math.max(0, unreadCount.value - 1)
    leadershipService.markInquiryRead(inq.id).catch(() => {})
  }
}

function markInquiryRead(inq) {
  inq.is_read = !inq.is_read
  leadershipService.markInquiryRead(inq.id).catch(() => {})
}

onMounted(() => {
  loadLeaders()
  // Load inquiries count badge
  leadershipService.getInquiries().then(res => {
    const list = res.results ?? res ?? []
    unreadCount.value = list.filter(i => !i.is_read).length
  }).catch(() => {})
})
</script>
