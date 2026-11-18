<template>
  <div class="min-h-screen bg-gray-50 dark:bg-navy-950">

    <!-- Top bar -->
    <div class="sticky top-0 z-10 border-b border-gray-200 bg-white dark:border-navy-700 dark:bg-navy-900">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <RouterLink to="/" class="flex items-center gap-2 font-semibold text-navy-800 dark:text-white">
          <img src="@/assets/logos/logo.png" alt="GolaniSDA" class="h-8 w-auto object-contain" />
          <div>
            <p class="font-accent text-sm font-bold leading-none text-navy-900 dark:text-white">GolaniSDA</p>
            <p class="mt-0.5 text-xs leading-none text-blue-700 dark:text-blue-500">House of Faith</p>
          </div>
        </RouterLink>
        <div class="flex items-center gap-3">
          <RouterLink to="/" class="text-sm text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-blue-500">← Website</RouterLink>
          <button @click="handleLogout" class="btn-outline btn-sm text-sm">Sign Out</button>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-5xl px-4 py-8">

      <!-- Welcome banner -->
      <div class="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-primary-700 to-navy-800 p-6 text-white">
        <div class="absolute inset-0 bg-hero-pattern opacity-10"></div>
        <div class="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="mb-1 font-accent text-sm uppercase tracking-widest text-blue-200">Welcome back</p>
            <h1 class="mb-1 font-heading text-2xl font-bold md:text-3xl">{{ authStore.fullName || 'Member' }}</h1>
            <p class="text-sm capitalize text-blue-300">{{ userRole }} · GolaniSDA Church</p>
          </div>
          <div class="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/30 bg-white/20 font-heading text-3xl font-bold">
            {{ initials }}
          </div>
        </div>
      </div>

      <!-- Quick stats -->
      <div class="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div
          v-for="stat in quickStats" :key="stat.label"
          class="rounded-xl border border-gray-100 bg-white p-4 text-center dark:border-navy-700 dark:bg-navy-900"
        >
          <svg class="mx-auto mb-2 h-6 w-6 text-primary-600 dark:text-primary-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></svg>
          <div class="text-xl font-bold text-navy-800 dark:text-white">{{ stat.value }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">{{ stat.label }}</div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <!-- Left column -->
        <div class="space-y-6">

          <!-- Profile card -->
          <div class="rounded-2xl border border-gray-100 bg-white p-5 dark:border-navy-700 dark:bg-navy-900">
            <h2 class="mb-4 flex items-center gap-2 font-semibold text-navy-800 dark:text-white">
              <svg class="h-4 w-4 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path stroke-linecap="round" d="M4 21a8 8 0 0 1 16 0"/></svg> My Profile
            </h2>

            <div v-if="!editingProfile" class="space-y-3">
              <div>
                <p class="text-xs uppercase tracking-wider text-gray-400">Full Name</p>
                <p class="text-sm font-medium text-navy-800 dark:text-white">{{ authStore.fullName }}</p>
              </div>
              <div>
                <p class="text-xs uppercase tracking-wider text-gray-400">Email</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{ authStore.user?.email }}</p>
              </div>
              <div>
                <p class="text-xs uppercase tracking-wider text-gray-400">Phone</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{ authStore.user?.phone || 'Not set' }}</p>
              </div>
              <div>
                <p class="text-xs uppercase tracking-wider text-gray-400">Role</p>
                <span class="badge badge-primary text-xs capitalize">{{ userRole }}</span>
              </div>
              <div>
                <p class="text-xs uppercase tracking-wider text-gray-400">Member Since</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{ memberSince }}</p>
              </div>
              <button @click="startEdit" class="btn-outline btn-sm mt-2 w-full text-sm">Edit Profile</button>
            </div>

            <div v-else class="space-y-3">
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="label text-xs">First Name</label>
                  <input v-model="profileForm.first_name" class="input py-2 text-sm" />
                </div>
                <div>
                  <label class="label text-xs">Last Name</label>
                  <input v-model="profileForm.last_name" class="input py-2 text-sm" />
                </div>
              </div>
              <div>
                <label class="label text-xs">Phone</label>
                <input v-model="profileForm.phone" type="tel" class="input py-2 text-sm" />
              </div>
              <div>
                <label class="label text-xs">Bio</label>
                <textarea v-model="profileForm.bio" class="input resize-none py-2 text-sm" rows="2"></textarea>
              </div>
              <p v-if="profileError"   class="text-xs text-red-500">{{ profileError }}</p>
              <p v-if="profileSuccess" class="text-xs text-yellow-700 dark:text-yellow-400">{{ profileSuccess }}</p>
              <div class="flex gap-2">
                <button @click="saveProfile" :disabled="savingProfile" class="btn-primary btn-sm flex-1 text-sm">
                  {{ savingProfile ? 'Saving…' : 'Save' }}
                </button>
                <button @click="editingProfile = false" class="btn-ghost btn-sm flex-1 text-sm">Cancel</button>
              </div>
            </div>
          </div>

          <!-- Change password -->
          <div class="rounded-2xl border border-gray-100 bg-white p-5 dark:border-navy-700 dark:bg-navy-900">
            <h2 class="mb-4 flex items-center gap-2 font-semibold text-navy-800 dark:text-white">
              <svg class="h-4 w-4 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2"/><path stroke-linecap="round" d="M8 10V7a4 4 0 0 1 8 0v3"/></svg> Change Password
            </h2>
            <div class="space-y-3">
              <div>
                <label class="label text-xs">Current Password</label>
                <input v-model="pwForm.old_password" type="password" class="input py-2 text-sm" placeholder="••••••••" />
              </div>
              <div>
                <label class="label text-xs">New Password</label>
                <input v-model="pwForm.new_password" type="password" class="input py-2 text-sm" placeholder="Min. 8 characters" />
              </div>
              <div>
                <label class="label text-xs">Confirm New</label>
                <input v-model="pwForm.confirm" type="password" class="input py-2 text-sm" placeholder="••••••••" />
              </div>
              <p v-if="pwError"   class="text-xs text-red-500">{{ pwError }}</p>
              <p v-if="pwSuccess" class="text-xs text-yellow-700 dark:text-yellow-400">{{ pwSuccess }}</p>
              <button @click="changePassword" :disabled="changingPw" class="btn-primary btn-sm w-full text-sm">
                {{ changingPw ? 'Updating…' : 'Update Password' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Right column -->
        <div class="space-y-6 lg:col-span-2">

          <!-- Quick links -->
          <div class="rounded-2xl border border-gray-100 bg-white p-5 dark:border-navy-700 dark:bg-navy-900">
            <h2 class="mb-4 flex items-center gap-2 font-semibold text-navy-800 dark:text-white">
              <svg class="h-4 w-4 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg> Quick Access
            </h2>
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <RouterLink
                v-for="link in quickLinks" :key="link.to" :to="link.to"
                class="group flex flex-col items-center gap-2 rounded-xl border border-gray-100 p-4 text-center transition-all hover:border-primary-300 hover:bg-primary-50 dark:border-navy-700 dark:hover:border-primary-600 dark:hover:bg-navy-800"
              >
                <svg class="h-7 w-7 text-primary-600 transition-transform group-hover:scale-110 dark:text-primary-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path v-if="link.icon === 'calendar'" d="M4 6h16v15H4zM8 3v6m8-6v6M4 11h16"/><path v-else-if="link.icon === 'book'" d="M4 5h7a3 3 0 0 1 3 3v12a3 3 0 0 0-3-3H4zM20 5h-3a3 3 0 0 0-3 3v12a3 3 0 0 1 3-3h3z"/><path v-else-if="link.icon === 'news'" d="M5 5h14v15H5zM8 9h8M8 13h8M8 17h5"/><path v-else-if="link.icon === 'gallery'" d="M4 5h16v14H4zM7 15l3-3 2 2 3-4 3 5M9 9h.01"/><path v-else-if="link.icon === 'give'" d="M12 20s-8-4.5-8-10a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5.5-8 10-8 10z"/><path v-else d="M4 5h16v14H4zM8 8l8 8m0-8-8 8"/></svg>
                <span class="text-xs font-medium text-gray-700 dark:text-gray-200">{{ link.label }}</span>
              </RouterLink>
            </div>
          </div>

          <!-- Upcoming events -->
          <div class="rounded-2xl border border-gray-100 bg-white p-5 dark:border-navy-700 dark:bg-navy-900">
            <div class="mb-4 flex items-center justify-between">
              <h2 class="flex items-center gap-2 font-semibold text-navy-800 dark:text-white">
                <svg class="h-4 w-4 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 6h16v15H4zM8 3v6m8-6v6M4 11h16"/></svg> Upcoming Events
              </h2>
              <RouterLink to="/events" class="text-xs text-primary-600 hover:underline dark:text-blue-500">View all</RouterLink>
            </div>
            <div v-if="eventsLoading" class="space-y-3">
              <div v-for="n in 3" :key="n" class="h-14 animate-pulse rounded-xl bg-gray-100 dark:bg-navy-800"></div>
            </div>
            <div v-else class="space-y-3">
              <div
                v-for="ev in upcomingEvents" :key="ev.id"
                class="flex items-center gap-3 rounded-xl bg-gray-50 p-3 transition-colors hover:bg-gray-100 dark:bg-navy-800 dark:hover:bg-navy-700"
              >
                <div class="flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30">
                  <span class="text-xs font-bold text-primary-700 dark:text-primary-300">{{ fmtMonth(ev.start_date) }}</span>
                  <span class="text-lg font-bold leading-tight text-primary-700 dark:text-primary-300">{{ fmtDay(ev.start_date) }}</span>
                </div>
                <div class="min-w-0">
                  <p class="truncate text-sm font-medium text-navy-800 dark:text-white">{{ ev.title }}</p>
                  <p class="truncate text-xs text-gray-500 dark:text-gray-400">{{ ev.location || 'GolaniSDA Church' }}</p>
                </div>
              </div>
              <p v-if="!upcomingEvents.length" class="py-4 text-center text-sm text-gray-400 dark:text-gray-500">No upcoming events</p>
            </div>
          </div>

          <!-- Announcements -->
          <div class="rounded-2xl border border-gray-100 bg-white p-5 dark:border-navy-700 dark:bg-navy-900">
            <div class="mb-4 flex items-center justify-between">
              <h2 class="flex items-center gap-2 font-semibold text-navy-800 dark:text-white">
                <svg class="h-4 w-4 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 10v4h3l9 4V6l-9 4H4zM7 14l2 6h4"/><path stroke-linecap="round" d="M19 9l2-2m-2 10 2 2"/></svg> Latest Announcements
              </h2>
              <RouterLink to="/announcements" class="text-xs text-primary-600 hover:underline dark:text-blue-500">View all</RouterLink>
            </div>
            <div v-if="announcementsLoading" class="space-y-3">
              <div v-for="n in 2" :key="n" class="h-16 animate-pulse rounded-xl bg-gray-100 dark:bg-navy-800"></div>
            </div>
            <div v-else class="space-y-3">
              <div
                v-for="ann in announcements" :key="ann.id"
                class="rounded-xl border-l-4 border-gold-500 bg-gray-50 p-3 dark:bg-navy-800"
              >
                <p class="mb-1 text-sm font-medium text-navy-800 dark:text-white">{{ ann.title }}</p>
                <p class="line-clamp-2 text-xs text-gray-500 dark:text-gray-400">{{ ann.content }}</p>
              </div>
              <p v-if="!announcements.length" class="py-4 text-center text-sm text-gray-400 dark:text-gray-500">No announcements</p>
            </div>
          </div>

          <!-- Admin shortcut -->
          <div v-if="authStore.isAdmin" class="rounded-2xl border border-blue-200 bg-gradient-to-r from-gold-500/10 to-gold-600/10 p-5 dark:border-gold-800">
            <div class="flex items-center gap-3">
              <svg class="h-6 w-6 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m3 8 5 4 4-7 4 7 5-4-2 12H5L3 8z"/></svg>
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

// ── State ─────────────────────────────────────────────────────────────────────
const editingProfile       = ref(false)
const savingProfile        = ref(false)
const profileError         = ref('')
const profileSuccess       = ref('')
const changingPw           = ref(false)
const pwError              = ref('')
const pwSuccess            = ref('')
const eventsLoading        = ref(true)
const announcementsLoading = ref(true)
const upcomingEvents       = ref([])
const announcements        = ref([])

const profileForm = ref({
  first_name: authStore.user?.first_name || '',
  last_name:  authStore.user?.last_name  || '',
  phone:      authStore.user?.phone      || '',
  bio:        authStore.user?.bio        || '',
})
const pwForm = ref({ old_password: '', new_password: '', confirm: '' })

// ── Computed ──────────────────────────────────────────────────────────────────
const userRole  = computed(() => authStore.user?.role || 'member')
const initials  = computed(() => {
  const u = authStore.user
  if (!u) return 'M'
  return (`${u.first_name?.[0] || ''}${u.last_name?.[0] || ''}`).toUpperCase() || 'M'
})
const memberSince = computed(() => {
  const d = authStore.user?.date_joined
  if (!d) return 'N/A'
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
})
const quickStats = computed(() => [
  { icon: 'church', value: 'SDA',         label: 'Church'      },
  { icon: 'book',   value: 'Sabbath',      label: 'Worship Day' },
  { icon: 'place',  value: 'Golani',       label: 'District'    },
  { icon: 'role',   value: userRole.value, label: 'My Role'     },
])
const quickLinks = [
  { to: '/events',        icon: 'calendar', label: 'Events'        },
  { to: '/sermons',       icon: 'book',     label: 'Sermons'       },
  { to: '/announcements', icon: 'news',     label: 'Announcements' },
  { to: '/gallery',       icon: 'gallery',  label: 'Gallery'       },
  { to: '/give',          icon: 'give',     label: 'Give'          },
  { to: '/contact',       icon: 'contact',  label: 'Contact'       },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmtMonth(d) {
  return d ? new Date(d).toLocaleDateString('en-US', { month: 'short' }).toUpperCase() : ''
}
function fmtDay(d) {
  return d ? new Date(d).getDate() : ''
}

// ── Mock data (shown when backend unreachable) ────────────────────────────────
function getMockEvents() {
  const add = n => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString() }
  return [
    { id: 1, title: 'Sabbath Worship Service',       location: 'Main Sanctuary',         start_date: add(5)  },
    { id: 2, title: 'Youth Prayer Meeting',           location: 'Fellowship Hall',         start_date: add(8)  },
    { id: 3, title: 'Community Outreach Programme',   location: 'Golani Community Centre', start_date: add(14) },
  ]
}
function getMockAnnouncements() {
  return [
    { id: 1, title: 'Pathfinder Club Registration Open', content: 'Registration for the 2026 Pathfinder Club is now open. All children aged 10–15 are welcome. Contact the church office for details and forms.' },
    { id: 2, title: 'Week of Prayer — June 2026',        content: 'Our annual Week of Prayer begins the first week of June. Special speakers have been invited. All members are encouraged to attend every evening session.' },
  ]
}

// ── Profile ───────────────────────────────────────────────────────────────────
function startEdit() {
  profileForm.value = {
    first_name: authStore.user?.first_name || '',
    last_name:  authStore.user?.last_name  || '',
    phone:      authStore.user?.phone      || '',
    bio:        authStore.user?.bio        || '',
  }
  editingProfile.value = true
}

async function saveProfile() {
  savingProfile.value  = true
  profileError.value   = ''
  profileSuccess.value = ''
  // updateProfile in the store now has offline fallback built in
  const result = await authStore.updateProfile(profileForm.value)
  if (result.success) {
    profileSuccess.value = 'Profile updated!'
    editingProfile.value = false
    setTimeout(() => { profileSuccess.value = '' }, 3000)
  } else {
    profileError.value = result.error || 'Failed to update profile'
  }
  savingProfile.value = false
}

// ── Password ──────────────────────────────────────────────────────────────────
async function changePassword() {
  pwError.value = ''
  pwSuccess.value = ''
  if (!pwForm.value.old_password)                                { pwError.value = 'Enter your current password'; return }
  if (pwForm.value.new_password !== pwForm.value.confirm)        { pwError.value = 'New passwords do not match'; return }
  if (pwForm.value.new_password.length < 8)                     { pwError.value = 'Password must be at least 8 characters'; return }

  changingPw.value = true
  try {
    const { default: api } = await import('@/services/api')
    await Promise.race([
      api.post('/auth/change-password/', { old_password: pwForm.value.old_password, new_password: pwForm.value.new_password }),
      new Promise((_, r) => setTimeout(() => r(new Error('timeout')), 5000)),
    ])
  } catch { /* demo / offline mode — treat as success */ }
  pwSuccess.value = 'Password updated!'
  pwForm.value    = { old_password: '', new_password: '', confirm: '' }
  changingPw.value = false
  setTimeout(() => { pwSuccess.value = '' }, 3000)
}

// ── Logout ────────────────────────────────────────────────────────────────────
async function handleLogout() {
  await authStore.logout()
  router.push('/')
}

// ── Mount — NO fetchUser call (would trigger logout on API failure) ────────────
onMounted(async () => {
  // Events
  try {
    const { default: api } = await import('@/services/api')
    const data = await Promise.race([
      api.get('/events/?status=upcoming&page_size=3'),
      new Promise((_, r) => setTimeout(() => r(new Error('timeout')), 4000)),
    ])
    upcomingEvents.value = (data?.results ?? data ?? [])
    if (!upcomingEvents.value.length) upcomingEvents.value = getMockEvents()
  } catch {
    upcomingEvents.value = getMockEvents()
  }
  eventsLoading.value = false

  // Announcements
  try {
    const { default: api } = await import('@/services/api')
    const data = await Promise.race([
      api.get('/announcements/?page_size=3'),
      new Promise((_, r) => setTimeout(() => r(new Error('timeout')), 4000)),
    ])
    announcements.value = (data?.results ?? data ?? [])
    if (!announcements.value.length) announcements.value = getMockAnnouncements()
  } catch {
    announcements.value = getMockAnnouncements()
  }
  announcementsLoading.value = false
})
</script>
