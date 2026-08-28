<template>
  <div class="space-y-6">
    <!-- Welcome Banner -->
    <div class="rounded-2xl p-6 text-white relative overflow-hidden" style="background: var(--gradient-page-hero)">
      <div class="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p class="text-blue-200 text-sm mb-1">{{ greeting }} 👋</p>
          <h2 class="font-heading text-2xl font-bold mb-1">Welcome to GolaniSDA Admin</h2>
          <p class="text-blue-200 text-sm">{{ today }} · Here's what's happening with your church.</p>
        </div>
        <img src="@/assets/logos/logo.png" alt="GolaniSDA" class="h-14 w-auto opacity-90 self-start sm:self-auto" />
      </div>
    </div>

    <!-- Live Stats Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="stat in statsCards" :key="stat.label"
        class="card p-5 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between mb-3">
          <div class="w-11 h-11 rounded-xl flex items-center justify-center text-xl" :class="stat.bg">
            {{ stat.icon }}
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
            <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-lg" :class="action.bg">
              {{ action.icon }}
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
              <div v-else class="w-full h-full flex items-center justify-center text-lg opacity-30">🎙️</div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-navy-800 dark:text-white truncate">{{ sermon.title }}</p>
              <p class="text-xs text-gray-400">{{ sermon.speaker || 'Unknown' }} · {{ fmtDate(sermon.preach_date || sermon.date) }}</p>
            </div>
            <span class="text-xs text-gray-400 flex-shrink-0">👁 {{ (sermon.views_count || 0).toLocaleString() }}</span>
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
              <div v-else class="w-full h-full flex items-center justify-center text-lg">📅</div>
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
            <span v-if="ann.pdf_file_url" class="text-xs text-red-500">📄 PDF</span>
            <span v-if="ann.is_pinned" class="text-xs text-blue-700">📌</span>
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
  { label: 'Total Sermons',      value: liveStats.value.sermons,       icon: '🎙️', bg: 'bg-primary-100 dark:bg-primary-900/30', trend: 0 },
  { label: 'Gallery Albums',     value: liveStats.value.albums,        icon: '🖼️', bg: 'bg-emerald-100 dark:bg-emerald-900/30', trend: 0 },
  { label: 'Announcements',      value: liveStats.value.announcements, icon: '📢', bg: 'bg-blue-50 dark:bg-gold-900/30',     trend: 0 },
  { label: 'Upcoming Events',    value: liveStats.value.events,        icon: '📅', bg: 'bg-purple-100 dark:bg-purple-900/30', trend: 0 },
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
  { to: '/admin/announcements', icon: '📢', label: 'New Announcement',    sub: 'Publish with PDF & date',    bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { to: '/admin/sermons',       icon: '🎙️', label: 'Upload Sermon',       sub: 'Add audio, thumbnail & type', bg: 'bg-primary-100 dark:bg-primary-900/30' },
  { to: '/admin/events',        icon: '📅', label: 'Create Event',         sub: 'Set date, location & RSVP',   bg: 'bg-blue-50 dark:bg-gold-900/30' },
  { to: '/admin/gallery',       icon: '📸', label: 'Upload Gallery Photos', sub: 'Add by album & category',    bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
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
    const API = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1').replace(/\/$/, '')
    const res = await fetch(`${API}/gallery/albums/?page_size=1`).then(r => r.ok ? r.json() : { count: 0 })
    liveStats.value.albums = res.count ?? 0
  } catch { /* non-fatal */ }
}

onMounted(async () => {
  await Promise.all([loadSermons(), loadEvents(), loadAnnouncements(), loadGalleryCount()])
  statsLoading.value = false
})
</script>
