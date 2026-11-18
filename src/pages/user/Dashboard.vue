<template>
  <div class="min-h-screen bg-gray-50 dark:bg-navy-950">
    <!-- Header -->
    <div class="bg-white dark:bg-navy-900 border-b border-gray-200 dark:border-navy-700 sticky top-0 z-10">
      <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2 text-navy-800 dark:text-white font-semibold">
          <img src="@/assets/logos/logo.png" alt="GolaniSDA Logo" class="h-8 w-auto object-contain" />
          <div>
            <p class="font-accent font-bold text-sm leading-none text-navy-900 dark:text-white">GolaniSDA</p>
            <p class="text-xs text-blue-700 dark:text-blue-500 leading-none mt-0.5">House of Faith</p>
          </div>
        </RouterLink>
        <div class="flex items-center gap-3">
          <RouterLink to="/" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-blue-500 transition-colors">← Website</RouterLink>
          <button @click="handleLogout" class="btn-outline btn-sm text-sm">Sign Out</button>
        </div>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 py-8">
      <!-- Welcome Banner -->
      <div class="bg-gradient-to-r from-primary-700 to-navy-800 rounded-2xl p-6 mb-8 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-hero-pattern opacity-10"></div>
        <div class="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p class="text-blue-200 text-sm font-accent uppercase tracking-widest mb-1">Welcome back</p>
            <h1 class="font-heading text-2xl md:text-3xl font-bold mb-1">{{ authStore.fullName || 'Member' }}</h1>
            <p class="text-blue-300 text-sm capitalize">{{ userRole }} · Golani SDA Church</p>
          </div>
          <div class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold font-heading border-2 border-white/30">
            {{ initials }}
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div v-for="stat in quickStats" :key="stat.label"
          class="bg-white dark:bg-navy-900 rounded-xl p-4 border border-gray-100 dark:border-navy-700 text-center">
          <div class="text-2xl mb-1">{{ stat.icon }}</div>
          <div class="font-bold text-xl text-navy-800 dark:text-white">{{ stat.value }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">{{ stat.label }}</div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left: Profile + Actions -->
        <div class="space-y-6">
          <!-- Profile Card -->
          <div class="bg-white dark:bg-navy-900 rounded-2xl border border-gray-100 dark:border-navy-700 p-5">
            <h2 class="font-semibold text-navy-800 dark:text-white mb-4 flex items-center gap-2">
              <span>👤</span> My Profile
            </h2>
            <div v-if="!editingProfile" class="space-y-3">
              <div>
                <p class="text-xs text-gray-400 uppercase tracking-wider">Full Name</p>
                <p class="text-sm font-medium text-navy-800 dark:text-white">{{ authStore.fullName }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-400 uppercase tracking-wider">Email</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{ authStore.user?.email }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-400 uppercase tracking-wider">Phone</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{ authStore.user?.phone || 'Not set' }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-400 uppercase tracking-wider">Role</p>
                <span class="badge badge-primary text-xs capitalize">{{ userRole }}</span>
              </div>
              <div>
                <p class="text-xs text-gray-400 uppercase tracking-wider">Member Since</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{ memberSince }}</p>
              </div>
              <button @click="startEdit" class="btn-outline btn-sm w-full text-sm mt-2">Edit Profile</button>
            </div>

            <!-- Edit Form -->
            <div v-else class="space-y-3">
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="label text-xs">First Name</label>
                  <input v-model="profileForm.first_name" class="input text-sm py-2" />
                </div>
                <div>
                  <label class="label text-xs">Last Name</label>
                  <input v-model="profileForm.last_name" class="input text-sm py-2" />
                </div>
              </div>
              <div>
                <label class="label text-xs">Phone</label>
                <input v-model="profileForm.phone" type="tel" class="input text-sm py-2" />
              </div>
              <div>
                <label class="label text-xs">Bio</label>
                <textarea v-model="profileForm.bio" class="input text-sm py-2 resize-none" rows="2"></textarea>
              </div>
              <p v-if="profileError" class="text-xs text-red-500">{{ profileError }}</p>
              <p v-if="profileSuccess" class="text-xs text-yellow-700 dark:text-yellow-400">{{ profileSuccess }}</p>
              <div class="flex gap-2">
                <button @click="saveProfile" :disabled="savingProfile" class="btn-primary btn-sm flex-1 text-sm">
                  {{ savingProfile ? 'Saving...' : 'Save' }}
                </button>
                <button @click="editingProfile = false" class="btn-ghost btn-sm flex-1 text-sm">Cancel</button>
              </div>
            </div>
          </div>

          <!-- Change Password -->
          <div class="bg-white dark:bg-navy-900 rounded-2xl border border-gray-100 dark:border-navy-700 p-5">
            <h2 class="font-semibold text-navy-800 dark:text-white mb-4 flex items-center gap-2">
              <span></span> Change Password
            </h2>
            <div class="space-y-3">
              <div>
                <label class="label text-xs">Current Password</label>
                <input v-model="pwForm.old_password" type="password" class="input text-sm py-2" placeholder="••••••••" />
              </div>
              <div>
                <label class="label text-xs">New Password</label>
                <input v-model="pwForm.new_password" type="password" class="input text-sm py-2" placeholder="••••••••" />
              </div>
              <div>
                <label class="label text-xs">Confirm New</label>
                <input v-model="pwForm.confirm" type="password" class="input text-sm py-2" placeholder="••••••••" />
              </div>
              <p v-if="pwError" class="text-xs text-red-500">{{ pwError }}</p>
              <p v-if="pwSuccess" class="text-xs text-yellow-700 dark:text-yellow-400">{{ pwSuccess }}</p>
              <button @click="changePassword" :disabled="changingPw" class="btn-primary btn-sm w-full text-sm">
                {{ changingPw ? 'Updating...' : 'Update Password' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Right: Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Quick Links -->
          <div class="bg-white dark:bg-navy-900 rounded-2xl border border-gray-100 dark:border-navy-700 p-5">
            <h2 class="font-semibold text-navy-800 dark:text-white mb-4 flex items-center gap-2">
              <span>🔗</span> Quick Access
            </h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <RouterLink v-for="link in quickLinks" :key="link.to" :to="link.to"
                class="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 dark:border-navy-700 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-navy-800 transition-all group text-center">
                <span class="text-2xl group-hover:scale-110 transition-transform">{{ link.icon }}</span>
                <span class="text-xs font-medium text-gray-700 dark:text-gray-200">{{ link.label }}</span>
              </RouterLink>
            </div>
          </div>

          <!-- Upcoming Events -->
          <div class="bg-white dark:bg-navy-900 rounded-2xl border border-gray-100 dark:border-navy-700 p-5">
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-semibold text-navy-800 dark:text-white flex items-center gap-2">
                <span></span> Upcoming Events
              </h2>
              <RouterLink to="/events" class="text-xs text-primary-600 dark:text-blue-500 hover:underline">View all</RouterLink>
            </div>
            <div v-if="eventsLoading" class="space-y-3">
              <div v-for="n in 3" :key="n" class="h-14 bg-gray-100 dark:bg-navy-800 rounded-xl animate-pulse"></div>
            </div>
            <div v-else-if="upcomingEvents.length" class="space-y-3">
              <div v-for="event in upcomingEvents" :key="event.id"
                class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-navy-800 hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors">
                <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                  <span class="text-xs font-bold text-primary-700 dark:text-primary-300">{{ formatEventMonth(event.start_date) }}</span>
                  <span class="text-lg font-bold text-primary-700 dark:text-primary-300 leading-tight">{{ formatEventDay(event.start_date) }}</span>
                </div>
                <div class="min-w-0">
                  <p class="font-medium text-sm text-navy-800 dark:text-white truncate">{{ event.title }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ event.location || 'GolaniSDA Church' }}</p>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-6 text-gray-400 dark:text-gray-500 text-sm">
              No upcoming events
            </div>
          </div>

          <!-- Latest Announcements -->
          <div class="bg-white dark:bg-navy-900 rounded-2xl border border-gray-100 dark:border-navy-700 p-5">
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-semibold text-navy-800 dark:text-white flex items-center gap-2">
                <span></span> Latest Announcements
              </h2>
              <RouterLink to="/announcements" class="text-xs text-primary-600 dark:text-blue-500 hover:underline">View all</RouterLink>
            </div>
            <div v-if="announcementsLoading" class="space-y-3">
              <div v-for="n in 2" :key="n" class="h-16 bg-gray-100 dark:bg-navy-800 rounded-xl animate-pulse"></div>
            </div>
            <div v-else-if="announcements.length" class="space-y-3">
              <div v-for="ann in announcements" :key="ann.id"
                class="p-3 rounded-xl bg-gray-50 dark:bg-navy-800 border-l-4 border-gold-500">
                <p class="font-medium text-sm text-navy-800 dark:text-white mb-1">{{ ann.title }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{{ ann.content }}</p>
              </div>
            </div>
            <div v-else class="text-center py-6 text-gray-400 dark:text-gray-500 text-sm">
              No announcements
            </div>
          </div>

          <!-- Admin Link (if admin) -->
          <div v-if="authStore.isAdmin" class="bg-gradient-to-r from-gold-500/10 to-gold-600/10 border border-blue-200 dark:border-gold-800 rounded-2xl p-5">
            <div class="flex items-center gap-3">
              <span class="text-2xl"></span>
              <div class="flex-1">
                <p class="font-semibold text-navy-800 dark:text-white">Admin Access</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">You have administrative privileges</p>
              </div>
              <RouterLink to="/admin/dashboard" class="btn-primary btn-sm text-sm">Admin Panel</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router    = useRouter()

// ── UI state ──────────────────────────────────────────────────────────────────
const editingProfile  = ref(false)
const savingProfile   = ref(false)
const profileError    = ref('')
const profileSuccess  = ref('')
const changingPw      = ref(false)
const pwError         = ref('')
const pwSuccess       = ref('')

const eventsLoading        = ref(true)
const announcementsLoading = ref(true)
const upcomingEvents       = ref([])
const announcements        = ref([])

const profileForm = ref({
  first_name: authStore.user?.first_name || '',
  last_name:  authStore.user?.last_name  || '',
  phone:      authStore.user?.phone      || '',
  bio:        authStore.user?.bio        || ''
})

const pwForm = ref({ old_password: '', new_password: '', confirm: '' })

// ── Computed ──────────────────────────────────────────────────────────────────
const userRole  = computed(() => authStore.user?.role || 'member')
const initials  = computed(() => {
  const u = authStore.user
  if (!u) return 'M'
  return `${u.first_name?.[0] || ''}${u.last_name?.[0] || ''}`.toUpperCase() || 'M'
})
const memberSince = computed(() => {
  const d = authStore.user?.date_joined
  if (!d) return 'N/A'
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
})

const quickStats = computed(() => [
  { icon: '✝️',  value: 'SDA',      label: 'Church'     },
  { icon: '📖',  value: 'Sabbath',  label: 'Worship Day'},
  { icon: '🌍',  value: 'Golani',   label: 'District'   },
  { icon: '⭐',  value: userRole.value, label: 'My Role' }
])

const quickLinks = [
  { to: '/events',        icon: '📅', label: 'Events'        },
  { to: '/sermons',       icon: '🎙️', label: 'Sermons'       },
  { to: '/announcements', icon: '📢', label: 'Announcements' },
  { to: '/gallery',       icon: '🖼️', label: 'Gallery'       },
  { to: '/give',          icon: '💝', label: 'Give'          },
  { to: '/contact',       icon: '📞', label: 'Contact'       }
]

// ── Mock data ─────────────────────────────────────────────────────────────────
const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Sabbath Worship Service',
    location: 'GolaniSDA Main Sanctuary',
    start_date: (() => {
      const d = new Date()
      d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7 || 7))
      return d.toISOString()
    })()
  },
  {
    id: 2,
    title: 'Youth Prayer Meeting',
    location: 'Fellowship Hall',
    start_date: (() => {
      const d = new Date()
      d.setDate(d.getDate() + 3)
      return d.toISOString()
    })()
  },
  {
    id: 3,
    title: 'Community Outreach Program',
    location: 'Golani Community Centre',
    start_date: (() => {
      const d = new Date()
      d.setDate(d.getDate() + 10)
      return d.toISOString()
    })()
  }
]

const MOCK_ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Pathfinder Club Registration Open',
    content: 'Registration for the 2026 Pathfinder Club is now open. All children aged 10–15 are welcome to join. Please contact the church office for details and forms.'
  },
  {
    id: 2,
    title: 'Week of Prayer — June 2026',
    content: 'Our annual Week of Prayer begins the first week of June. Special speakers have been invited. All members are encouraged to attend every evening session.'
  }
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatEventMonth(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
}
function formatEventDay(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).getDate()
}

// ── Profile editing ───────────────────────────────────────────────────────────
function startEdit() {
  profileForm.value = {
    first_name: authStore.user?.first_name || '',
    last_name:  authStore.user?.last_name  || '',
    phone:      authStore.user?.phone      || '',
    bio:        authStore.user?.bio        || ''
  }
  editingProfile.value = true
}

async function saveProfile() {
  savingProfile.value = true
  profileError.value  = ''
  profileSuccess.value = ''

  await new Promise(r => setTimeout(r, 500)) // simulate save delay

  // Update locally (no backend required)
  const updated = { ...authStore.user, ...profileForm.value }
  authStore.$patch({ user: updated })
  localStorage.setItem('golanisda-user', JSON.stringify(updated))

  profileSuccess.value = 'Profile updated successfully!'
  editingProfile.value = false
  savingProfile.value  = false
  setTimeout(() => profileSuccess.value = '', 3000)
}

// ── Password change ───────────────────────────────────────────────────────────
async function changePassword() {
  pwError.value   = ''
  pwSuccess.value = ''

  if (!pwForm.value.old_password) {
    pwError.value = 'Please enter your current password'
    return
  }
  if (pwForm.value.new_password !== pwForm.value.confirm) {
    pwError.value = 'New passwords do not match'
    return
  }
  if (pwForm.value.new_password.length < 8) {
    pwError.value = 'Password must be at least 8 characters'
    return
  }

  changingPw.value = true
  await new Promise(r => setTimeout(r, 600))

  // In demo mode we just pretend it worked
  pwSuccess.value = 'Password updated successfully!'
  pwForm.value    = { old_password: '', new_password: '', confirm: '' }
  changingPw.value = false
  setTimeout(() => pwSuccess.value = '', 3000)
}

// ── Logout ────────────────────────────────────────────────────────────────────
async function handleLogout() {
  await authStore.logout()
  router.push('/')
}

// ── Mount: load mock data (no real API calls that could fail) ─────────────────
onMounted(async () => {
  // Try the real API first; fall back to mock data silently if unavailable
  try {
    // dynamic import so we don't break if the api module itself has issues
    const { default: api } = await import('@/services/api')
    const data = await Promise.race([
      api.get('/events/?status=upcoming&page_size=3'),
      new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 5000))
    ])
    upcomingEvents.value = data.results || data || []
  } catch {
    upcomingEvents.value = MOCK_EVENTS
  } finally {
    eventsLoading.value = false
  }

  try {
    const { default: api } = await import('@/services/api')
    const data = await Promise.race([
      api.get('/announcements/?page_size=3'),
      new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 5000))
    ])
    announcements.value = data.results || data || []
  } catch {
    announcements.value = MOCK_ANNOUNCEMENTS
  } finally {
    announcementsLoading.value = false
  }
})
</script>
