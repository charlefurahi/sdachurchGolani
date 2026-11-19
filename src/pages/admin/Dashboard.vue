<template>
  <div class="space-y-6">
    <!-- Welcome Banner -->
    <div class="admin-welcome rounded-2xl p-6 relative overflow-hidden">
      <div class="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p class="admin-welcome__eyebrow text-sm mb-1">{{ greeting }}</p>
          <h2 class="font-heading text-2xl font-bold mb-1">Welcome to GolaniSDA Admin</h2>
          <p class="admin-welcome__copy text-sm">{{ today }} · Here's what's happening with your church.</p>
        </div>
        <span class="site-brand__mark"><img src="@/assets/logos/logo.png" alt="Golani SDA Church" class="site-brand__logo" /></span>
      </div>
    </div>

    <!-- Live Stats Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="stat in statsCards" :key="stat.label"
        class="card p-5 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between mb-3">
          <div class="w-11 h-11 rounded-xl flex items-center justify-center" :class="stat.bg">
            <svg class="h-5 w-5 text-primary-700 dark:text-primary-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path v-if="stat.icon === 'sermon'" d="M4 5h7a3 3 0 0 1 3 3v12a3 3 0 0 0-3-3H4zM20 5h-3a3 3 0 0 0-3 3v12a3 3 0 0 1 3-3h3z"/>
              <path v-else-if="stat.icon === 'gallery'" d="M4 5h16v14H4zM7 15l3-3 2 2 3-4 3 5M9 9h.01"/>
              <path v-else-if="stat.icon === 'announcement'" d="M4 10v4h3l9 4V6l-9 4H4zM7 14l2 6h4"/>
              <path v-else d="M4 6h16v15H4zM8 3v6m8-6v6M4 11h16"/>
            </svg>
          </div>
          <span v-if="!statsLoading"
            :class="['text-xs font-bold', stat.trend > 0 ? 'text-emerald-600 dark:text-emerald-400' : stat.trend < 0 ? 'text-red-500' : 'text-gray-400']">
            {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend !== 0 ? stat.trend + '%' : '—' }}
          </span>
        </div>
        <div v-if="statsLoading" class="animate-pulse">
          <div class="h-7 w-16 bg-gray-200 dark:bg-navy-700 rounded mb-1"></div>
          <div class="h-3 w-24 bg-gray-200 dark:bg-navy-700 rounded"></div>
        </div>
        <template v-else>
          <p class="text-2xl font-bold text-navy-800 dark:text-white mb-0.5">{{ stat.value }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
        </template>
      </div>
    </div>

    <!-- Sermon Views Chart + Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Sermon views bar chart -->
      <div class="lg:col-span-2 card p-5">
        <div class="flex items-center justify-between mb-5">
          <h3 class="font-semibold text-navy-800 dark:text-white">Sermon Views (Last 6 Months)</h3>
        </div>
        <div class="h-48 flex items-end gap-2 px-2">
          <div v-for="(bar, i) in viewsBars" :key="i" class="flex-1 flex flex-col items-center gap-1 group">
            <span class="text-xs text-gray-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{{ bar.val }}</span>
            <div class="w-full rounded-t-lg overflow-hidden bg-gray-100 dark:bg-navy-700 relative" style="height:120px">
              <div
                class="w-full bg-gradient-to-t from-primary-700 to-primary-400 rounded-t-lg absolute bottom-0 transition-all duration-700"
                :style="{ height: bar.pct + '%' }"></div>
            </div>
            <p class="text-xs text-gray-400">{{ bar.label }}</p>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card p-5">
        <h3 class="font-semibold text-navy-800 dark:text-white mb-4">Quick Actions</h3>
        <div class="space-y-2.5">
          <RouterLink v-for="action in quickActions" :key="action.to" :to="action.to"
            class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors group">
            <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" :class="action.bg">
              <svg class="h-[18px] w-[18px] text-primary-700 dark:text-primary-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path v-if="action.icon === 'announcement'" d="M4 10v4h3l9 4V6l-9 4H4zM7 14l2 6h4"/>
                <path v-else-if="action.icon === 'sermon'" d="M4 5h7a3 3 0 0 1 3 3v12a3 3 0 0 0-3-3H4zM20 5h-3a3 3 0 0 0-3 3v12a3 3 0 0 1 3-3h3z"/>
                <path v-else-if="action.icon === 'gallery'" d="M4 5h16v14H4zM7 15l3-3 2 2 3-4 3 5M9 9h.01"/>
                <path v-else d="M4 6h16v15H4zM8 3v6m8-6v6M4 11h16"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-navy-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-blue-500 transition-colors">{{ action.label }}</p>
              <p class="text-xs text-gray-400">{{ action.sub }}</p>
            </div>
            <svg class="w-4 h-4 text-gray-300 dark:text-navy-600 group-hover:text-primary-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Recent Sermons + Upcoming Events -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Sermons (live) -->
      <div class="card p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-navy-800 dark:text-white">Recent Sermons</h3>
          <RouterLink to="/admin/sermons" class="text-xs text-primary-600 dark:text-blue-500 hover:underline font-medium">View all →</RouterLink>
        </div>
        <div v-if="sermonsLoading" class="space-y-3">
          <div v-for="n in 4" :key="n" class="flex items-center gap-3 animate-pulse">
            <div class="w-10 h-10 bg-gray-200 dark:bg-navy-700 rounded-xl flex-shrink-0"></div>
            <div class="flex-1 space-y-1.5">
              <div class="h-3 bg-gray-200 dark:bg-navy-700 rounded w-3/4"></div>
              <div class="h-2 bg-gray-200 dark:bg-navy-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>
        <div v-else-if="recentSermons.length" class="space-y-1">
          <div v-for="sermon in recentSermons" :key="sermon.id"
            class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors cursor-pointer"
            @click="$router.push('/admin/sermons')">
            <div class="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-navy-700 to-primary-800">
              <img v-if="sermon.thumbnail_url || sermon.thumbnail"
                :src="sermon.thumbnail_url || sermon.thumbnail" :alt="sermon.title"
                class="w-full h-full object-cover"/>
              <div v-else class="w-full h-full flex items-center justify-center text-primary-600/50"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18.5v2.5m-5-8.5v1a5 5 0 0 0 10 0v-1m-5-8a4 4 0 0 0-4 4v5a4 4 0 0 0 8 0v-5a4 4 0 0 0-4-4z"/></svg></div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-navy-800 dark:text-white truncate">{{ sermon.title }}</p>
              <p class="text-xs text-gray-400">{{ sermon.speaker || 'Unknown' }} · {{ fmtDate(sermon.preach_date || sermon.date) }}</p>
            </div>
            <span class="inline-flex items-center gap-1 text-xs text-gray-400 flex-shrink-0"><svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"/><circle cx="12" cy="12" r="2.5"/></svg>{{ (sermon.views_count || 0).toLocaleString() }}</span>
          </div>
        </div>
        <p v-else class="text-xs text-gray-400 text-center py-8">No sermons yet. <RouterLink to="/admin/sermons" class="text-primary-600 hover:underline">Add one →</RouterLink></p>
      </div>

      <!-- Upcoming Events (live) -->
      <div class="card p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-navy-800 dark:text-white">Upcoming Events</h3>
          <RouterLink to="/admin/events" class="text-xs text-primary-600 dark:text-blue-500 hover:underline font-medium">Manage →</RouterLink>
        </div>
        <div v-if="eventsLoading" class="space-y-3">
          <div v-for="n in 4" :key="n" class="flex items-center gap-3 animate-pulse">
            <div class="w-10 h-10 bg-gray-200 dark:bg-navy-700 rounded-xl flex-shrink-0"></div>
            <div class="flex-1 space-y-1.5">
              <div class="h-3 bg-gray-200 dark:bg-navy-700 rounded w-3/4"></div>
              <div class="h-2 bg-gray-200 dark:bg-navy-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>
        <div v-else-if="upcomingEvents.length" class="space-y-1">
          <div v-for="event in upcomingEvents" :key="event.id"
            class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors cursor-pointer"
            @click="$router.push('/admin/events')">
            <div class="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-gold-500/30 to-gold-700/30">
              <img v-if="event.banner_url || event.banner"
                :src="event.banner_url || event.banner" :alt="event.title"
                class="w-full h-full object-cover"/>
              <div v-else class="w-full h-full flex items-center justify-center text-primary-700/60"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 6h16v15H4zM8 3v6m8-6v6M4 11h16"/></svg></div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-navy-800 dark:text-white truncate">{{ event.title }}</p>
              <p class="text-xs text-gray-400">{{ fmtDate(event.start_date) }} · {{ event.location || 'Church' }}</p>
            </div>
            <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0',
              daysUntil(event.start_date) <= 3 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300']">
              {{ daysUntil(event.start_date) === 0 ? 'Today' : `in ${daysUntil(event.start_date)}d` }}
            </span>
          </div>
        </div>
        <p v-else class="text-xs text-gray-400 text-center py-8">No upcoming events. <RouterLink to="/admin/events" class="text-primary-600 hover:underline">Add one →</RouterLink></p>
      </div>
    </div>

    <!-- Recent Announcements -->
    <div class="card p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-navy-800 dark:text-white">Recent Announcements</h3>
        <RouterLink to="/admin/announcements" class="text-xs text-primary-600 dark:text-blue-500 hover:underline font-medium">Manage →</RouterLink>
      </div>
      <div v-if="annsLoading" class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div v-for="n in 3" :key="n" class="p-3 rounded-xl bg-gray-50 dark:bg-navy-900 animate-pulse space-y-2">
          <div class="h-3 bg-gray-200 dark:bg-navy-700 rounded w-1/3"></div>
          <div class="h-4 bg-gray-200 dark:bg-navy-700 rounded w-3/4"></div>
          <div class="h-3 bg-gray-200 dark:bg-navy-700 rounded w-full"></div>
        </div>
      </div>
      <div v-else-if="recentAnnouncements.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div v-for="ann in recentAnnouncements" :key="ann.id"
          class="p-3.5 rounded-xl bg-gray-50 dark:bg-navy-900/50 border border-gray-100 dark:border-navy-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors cursor-pointer"
          @click="$router.push('/admin/announcements')">
          <div class="flex items-center gap-2 mb-1.5">
            <span :class="['inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold', priorityBadge(ann.priority)]">
              {{ ann.priority || 'normal' }}
            </span>
            <span v-if="ann.pdf_file_url" class="text-xs text-red-500">PDF</span>
            <svg v-if="ann.is_pinned" class="h-3.5 w-3.5 text-blue-700 dark:text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-label="Pinned"><path stroke-linecap="round" stroke-linejoin="round" d="m16 3 5 5-4 1-4 4-1 7-2-6-6-2 7-1 4-4z"/></svg>
          </div>
          <p class="text-sm font-medium text-navy-800 dark:text-white line-clamp-1">{{ ann.title }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5">{{ ann.content }}</p>
          <p class="text-xs text-gray-400 mt-1.5">{{ fmtDate(ann.announcement_date || ann.created_at) }}</p>
        </div>
      </div>
      <p v-else class="text-xs text-gray-400 text-center py-6">No announcements yet.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import sermonService from '@/services/sermonService'
import eventService from '@/services/eventService'
import announcementService from '@/services/announcementService'
import { API_BASE_URL } from '@/services/api'

const $router = useRouter()

// ── Greeting ────────────────────────────────────────────────────────
const hour = new Date().getHours()
const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

// ── State ───────────────────────────────────────────────────────────
const statsLoading   = ref(true)
const sermonsLoading = ref(true)
const eventsLoading  = ref(true)
const annsLoading    = ref(true)

const recentSermons       = ref([])
const upcomingEvents      = ref([])
const recentAnnouncements = ref([])

const liveStats = ref({ sermons: 0, events: 0, announcements: 0, albums: 0 })

// ── Stats Cards (dynamic once loaded) ───────────────────────────────
const statsCards = computed(() => [
  { label: 'Total Sermons',      value: liveStats.value.sermons,       icon: 'sermon',       bg: 'bg-primary-100 dark:bg-primary-900/30', trend: 0 },
  { label: 'Gallery Albums',     value: liveStats.value.albums,        icon: 'gallery',      bg: 'bg-emerald-100 dark:bg-emerald-900/30', trend: 0 },
  { label: 'Announcements',      value: liveStats.value.announcements, icon: 'announcement', bg: 'bg-blue-50 dark:bg-gold-900/30',     trend: 0 },
  { label: 'Upcoming Events',    value: liveStats.value.events,        icon: 'events',       bg: 'bg-purple-100 dark:bg-purple-900/30', trend: 0 },
])

// ── Fake attendance bars (visual only - no real attendance tracking yet) ─
const viewsBars = [
  { label: 'Jan', val: 320, pct: 49 },
  { label: 'Feb', val: 410, pct: 63 },
  { label: 'Mar', val: 390, pct: 60 },
  { label: 'Apr', val: 480, pct: 74 },
  { label: 'May', val: 520, pct: 80 },
  { label: 'Jun', val: 650, pct: 100 },
]

const quickActions = [
  { to: '/admin/announcements', icon: 'announcement', label: 'New Announcement',     sub: 'Publish with PDF & date',    bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { to: '/admin/sermons',       icon: 'sermon',       label: 'Upload Sermon',         sub: 'Add audio, thumbnail & type', bg: 'bg-primary-100 dark:bg-primary-900/30' },
  { to: '/admin/events',        icon: 'events',       label: 'Create Event',          sub: 'Set date, location & RSVP',   bg: 'bg-blue-50 dark:bg-gold-900/30' },
  { to: '/admin/gallery',       icon: 'gallery',      label: 'Upload Gallery Photos', sub: 'Add by album & category',    bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
]

function priorityBadge(p) {
  return {
    urgent: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    high:   'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    normal: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
    low:    'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  }[p] || 'bg-gray-100 text-gray-600'
}

function fmtDate(d) {
  if (!d) return '—'
  return new Date(d + (d.includes('T') ? '' : 'T00:00:00')).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function daysUntil(d) {
  if (!d) return 999
  const diff = new Date(d) - new Date()
  return Math.max(0, Math.floor(diff / 86400000))
}

// ── Data Loading ─────────────────────────────────────────────────────
async function loadSermons() {
  sermonsLoading.value = true
  try {
    const res = await sermonService.getAll({ page_size: 4, ordering: '-sermon_date,-created_at' })
    const all = res.results ?? res
    recentSermons.value = all.slice(0, 4)
    liveStats.value.sermons = res.count ?? all.length
  } catch { recentSermons.value = [] }
  finally { sermonsLoading.value = false }
}

async function loadEvents() {
  eventsLoading.value = true
  try {
    let res
    try { res = await eventService.getUpcoming({ page_size: 4 }) }
    catch { res = await eventService.getAll({ page_size: 4, ordering: 'start_date' }) }
    const all = res.results ?? res
    upcomingEvents.value = all.slice(0, 4)
    liveStats.value.events = all.filter(e => new Date(e.start_date) > new Date()).length
  } catch { upcomingEvents.value = [] }
  finally { eventsLoading.value = false }
}

async function loadAnnouncements() {
  annsLoading.value = true
  try {
    const res = await announcementService.getAll({ page_size: 3, ordering: '-created_at' })
    const all = res.results ?? res
    recentAnnouncements.value = all.slice(0, 3)
    liveStats.value.announcements = res.count ?? all.length
  } catch { recentAnnouncements.value = [] }
  finally { annsLoading.value = false }
}

async function loadGalleryCount() {
  try {
    const API = API_BASE_URL
    const res = await fetch(`${API}/gallery/albums/?page_size=1`).then(r => r.ok ? r.json() : { count: 0 })
    liveStats.value.albums = res.count ?? 0
  } catch { /* non-fatal */ }
}

onMounted(async () => {
  await Promise.all([loadSermons(), loadEvents(), loadAnnouncements(), loadGalleryCount()])
  statsLoading.value = false
})
</script>

<style scoped>
.admin-welcome { border:1px solid var(--color-border); background:linear-gradient(125deg,#fffdf7 0%,#edf3f3 100%); box-shadow:var(--shadow-soft); }
.admin-welcome h2 { color:var(--color-heading); }
.admin-welcome__eyebrow { color:var(--color-gold-dark); font-weight:700; letter-spacing:.04em; }
.admin-welcome__copy { color:var(--color-text-muted); }
:global(.dark) .admin-welcome { background:linear-gradient(125deg,#172f45 0%,#1e3d53 100%); border-color:var(--color-border); }
:global(.dark) .admin-welcome h2 { color:#f2f6f8; }
:global(.dark) .admin-welcome__eyebrow { color:#f4d03f; }
:global(.dark) .admin-welcome__copy { color:#d9e3e9; }
</style>
