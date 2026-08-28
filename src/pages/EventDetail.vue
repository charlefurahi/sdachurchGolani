<template>
  <div>
    <div class="page-hero">
      <div class="page-hero__inner">
        <div class="container-custom">
          <Breadcrumbs :crumbs="[{ to: '/events', label: 'Events' }, { label: event?.title || 'Event' }]" />
        </div>
      </div>
    </div>
    <div class="pb-16">
    <div class="container-custom pt-8">

      <!-- Loading skeleton -->
      <div v-if="loading" class="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
        <div class="lg:col-span-2 space-y-4">
          <div class="h-64 bg-gray-200 dark:bg-navy-700 rounded-2xl"></div>
          <div class="h-6 bg-gray-200 dark:bg-navy-700 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 dark:bg-navy-700 rounded w-full"></div>
          <div class="h-4 bg-gray-200 dark:bg-navy-700 rounded w-5/6"></div>
        </div>
        <div class="h-64 bg-gray-200 dark:bg-navy-700 rounded-2xl"></div>
      </div>

      <!-- Not found -->
      <div v-else-if="!event" class="text-center py-24">
        <div class="text-6xl mb-4">📅</div>
        <h2 class="font-heading text-2xl text-navy-800 dark:text-white mb-2">Event Not Found</h2>
        <p class="text-gray-500 mb-6">This event may have been removed or doesn't exist.</p>
        <RouterLink to="/events" class="btn-primary">Back to Events</RouterLink>
      </div>

      <!-- Event content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left: main content -->
        <div class="lg:col-span-2">
          <!-- Banner image (uploaded by admin) -->
          <div class="h-64 bg-gradient-to-br from-primary-600 to-navy-900 rounded-2xl overflow-hidden flex items-center justify-center mb-6">
            <img
              v-if="bannerUrl"
              :src="bannerUrl"
              :alt="event.title"
              class="w-full h-full object-cover"
              @error="bannerFailed = true"
            />
            <div v-else class="text-center text-white/30 text-8xl">📅</div>
          </div>

          <!-- Category + status badges -->
          <div class="flex gap-2 flex-wrap mb-3">
            <span class="badge-primary">{{ categoryName }}</span>
            <span v-if="event.is_featured || event.featured" class="badge bg-blue-700 text-white">Featured</span>
            <span v-if="event.status" :class="statusClass">{{ event.status }}</span>
            <span v-if="event.is_online" class="badge bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-400">🌐 Online</span>
          </div>

          <h1 class="font-heading text-3xl md:text-4xl font-bold text-navy-800 dark:text-white mb-4">
            {{ event.title }}
          </h1>

          <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {{ event.description }}
          </p>

          <!-- Tags -->
          <div v-if="tags.length" class="flex flex-wrap gap-2 mb-6">
            <span v-for="tag in tags" :key="tag" class="badge-primary text-xs">#{{ tag }}</span>
          </div>

          <!-- Online join link -->
          <a
            v-if="event.is_online && event.online_url"
            :href="event.online_url"
            target="_blank"
            class="btn-primary inline-flex items-center gap-2 mb-6"
          >
            🌐 Join Online Stream
          </a>

          <!-- Google Maps link -->
          <a
            v-if="event.location_url"
            :href="event.location_url"
            target="_blank"
            class="btn-outline inline-flex items-center gap-2 mb-6 ml-2"
          >
            📍 View on Map
          </a>
        </div>

        <!-- Right: details sidebar -->
        <div class="space-y-4">
          <div class="card p-5">
            <h3 class="font-semibold text-navy-800 dark:text-white mb-4">Event Details</h3>
            <div class="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <div class="flex gap-3">
                <span>📅</span>
                <div>
                  <p class="font-medium text-navy-800 dark:text-white">Date</p>
                  <p>{{ formatDate(event.start_date || event.date) }}</p>
                  <p v-if="event.end_date" class="text-xs text-gray-400">
                    Ends: {{ formatDate(event.end_date) }}
                  </p>
                </div>
              </div>
              <div class="flex gap-3">
                <span>🕐</span>
                <div>
                  <p class="font-medium text-navy-800 dark:text-white">Time</p>
                  <p>{{ getTime(event.start_date || event.date, event.time) }}</p>
                </div>
              </div>
              <div class="flex gap-3">
                <span>📍</span>
                <div>
                  <p class="font-medium text-navy-800 dark:text-white">Location</p>
                  <p>{{ event.location || (event.is_online ? 'Online' : 'TBA') }}</p>
                </div>
              </div>
              <div v-if="event.organizer" class="flex gap-3">
                <span>👤</span>
                <div>
                  <p class="font-medium text-navy-800 dark:text-white">Organizer</p>
                  <p>{{ event.organizer }}</p>
                </div>
              </div>
              <div v-if="event.contact_email" class="flex gap-3">
                <span>✉️</span>
                <div>
                  <p class="font-medium text-navy-800 dark:text-white">Contact</p>
                  <a :href="`mailto:${event.contact_email}`" class="text-primary-600 dark:text-blue-500 hover:underline">
                    {{ event.contact_email }}
                  </a>
                </div>
              </div>

              <!-- Capacity -->
              <div v-if="event.max_attendees || event.capacity" class="pt-2">
                <div class="flex justify-between text-xs mb-1">
                  <span class="font-medium text-navy-800 dark:text-white">👥 Registration</span>
                  <span>{{ event.rsvp_count ?? event.registered ?? 0 }} / {{ event.max_attendees || event.capacity }}</span>
                </div>
                <div class="h-2 bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-primary-400 to-gold-500 rounded-full"
                    :style="{ width: capacityPercent + '%' }"
                  />
                </div>
                <p v-if="spotsLeft !== null && spotsLeft <= 10 && spotsLeft > 0" class="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                  ⚠️ Only {{ spotsLeft }} spots left!
                </p>
                <p v-if="spotsLeft === 0" class="text-xs text-red-500 mt-1">
                  🚫 Event is full — you may be added to the waitlist.
                </p>
              </div>
            </div>

            <!-- RSVP button -->
            <button
              v-if="event.rsvp_required || event.rsvp_required === undefined"
              @click="showRSVP = true"
              class="btn-primary w-full mt-5"
              :disabled="spotsLeft === 0"
            >
              {{ spotsLeft === 0 ? 'Join Waitlist' : 'Register / RSVP' }}
            </button>
          </div>

          <!-- Share card -->
          <div class="card p-5">
            <h3 class="font-semibold text-navy-800 dark:text-white mb-3">Share This Event</h3>
            <div class="flex gap-3">
              <button @click="shareEvent('whatsapp')" class="btn-sm bg-navy-800 text-white rounded-xl px-4 py-2 text-xs">WhatsApp</button>
              <button @click="shareEvent('facebook')" class="btn-sm bg-blue-600 text-white rounded-xl px-4 py-2 text-xs">Facebook</button>
              <button @click="copyLink()" class="btn-sm bg-gray-200 dark:bg-navy-700 text-gray-700 dark:text-gray-200 rounded-xl px-4 py-2 text-xs">
                {{ copied ? 'Copied!' : 'Copy Link' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

    <!-- RSVP Modal -->
    <Modal v-model="showRSVP" title="Register for Event" size="md">
      <div v-if="event">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-5">
          Registering for: <span class="font-semibold text-primary-600 dark:text-blue-500">{{ event.title }}</span>
        </p>
        <form @submit.prevent="submitRSVP" class="space-y-4">
          <div><label class="label">Full Name *</label><input v-model="form.name" class="input" required /></div>
          <div><label class="label">Phone *</label><input v-model="form.phone" type="tel" class="input" required /></div>
          <div><label class="label">Email</label><input v-model="form.email" type="email" class="input" /></div>
          <div>
            <label class="label">Additional Guests</label>
            <select v-model="form.guests" class="select">
              <option v-for="n in 10" :key="n-1" :value="n-1">{{ n-1 === 0 ? 'Just me' : n-1 }}</option>
            </select>
          </div>
          <div><label class="label">Notes (optional)</label><textarea v-model="form.notes" class="input" rows="2"></textarea></div>
          <p v-if="rsvpError" class="text-red-500 text-sm">{{ rsvpError }}</p>
          <button type="submit" :disabled="rsvpLoading" class="btn-primary w-full">
            {{ rsvpLoading ? 'Submitting...' : done ? 'Registered! God Bless 🙏' : 'Confirm Registration' }}
          </button>
        </form>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { formatDate } from '@/utils/index.js'
import eventService from '@/services/eventService'
import Breadcrumbs from '@/components/common/Breadcrumbs.vue'
import Modal from '@/components/common/Modal.vue'

const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || 'http://127.0.0.1:8000'

const route = useRoute()

// ── State ─────────────────────────────────────────────────────
const event       = ref(null)
const loading     = ref(false)
const showRSVP    = ref(false)
const done        = ref(false)
const rsvpLoading = ref(false)
const rsvpError   = ref(null)
const bannerFailed = ref(false)
const copied      = ref(false)
const form        = ref({ name: '', phone: '', email: '', guests: 0, notes: '' })

// ── Fetch event ───────────────────────────────────────────────
onMounted(async () => {
  loading.value = true
  try {
    const res = await eventService.getById(route.params.id)
    event.value = res
  } catch {
    event.value = null
  } finally {
    loading.value = false
  }
})

// ── Computed helpers ──────────────────────────────────────────
const categoryName = computed(() => {
  if (!event.value?.category) return 'General'
  if (typeof event.value.category === 'object') return event.value.category.name
  return event.value.category
})

const tags = computed(() => {
  const t = event.value?.tags
  if (!t) return []
  if (Array.isArray(t)) return t
  // Backend might return comma-separated string
  return t.split(',').map(s => s.trim()).filter(Boolean)
})

const bannerUrl = computed(() => {
  if (bannerFailed.value) return null
  const src = event.value?.banner || event.value?.thumbnail || event.value?.image || null
  if (!src) return null
  if (src.startsWith('http')) return src
  return BASE_URL + src
})

const capacityPercent = computed(() => {
  const reg = event.value?.rsvp_count ?? event.value?.registered ?? 0
  const cap = event.value?.max_attendees || event.value?.capacity || 1
  return Math.min((reg / cap) * 100, 100)
})

const spotsLeft = computed(() => {
  const cap = event.value?.max_attendees || event.value?.capacity
  if (!cap) return null
  const reg = event.value?.rsvp_count ?? event.value?.registered ?? 0
  return Math.max(0, cap - reg)
})

const statusClass = computed(() => {
  const map = {
    upcoming:  'badge bg-blue-100 text-blue-700',
    ongoing:   'badge bg-yellow-100 text-yellow-800',
    completed: 'badge bg-gray-100 text-gray-600',
    cancelled: 'badge bg-red-100 text-red-600',
  }
  return map[event.value?.status] || 'badge-primary'
})

function getTime(isoDate, fallbackTime) {
  if (fallbackTime) return fallbackTime
  if (!isoDate) return ''
  return new Date(isoDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })
}

// ── RSVP ─────────────────────────────────────────────────────
async function submitRSVP() {
  if (!event.value) return
  rsvpLoading.value = true
  rsvpError.value   = null
  try {
    await eventService.rsvp(event.value.id, {
      name:   form.value.name,
      phone:  form.value.phone,
      email:  form.value.email,
      guests: form.value.guests,
      notes:  form.value.notes,
    })
    done.value = true
    // Update local count
    if (event.value.rsvp_count !== undefined) event.value.rsvp_count++
    else if (event.value.registered !== undefined) event.value.registered++
    setTimeout(() => {
      showRSVP.value = false
      done.value     = false
      form.value     = { name: '', phone: '', email: '', guests: 0, notes: '' }
    }, 2200)
  } catch (err) {
    const msg = err?.email?.[0] || err?.non_field_errors?.[0] || err?.detail || err?.message || null
    if (msg?.toLowerCase().includes('already')) {
      rsvpError.value = 'You are already registered for this event.'
    } else if (msg) {
      rsvpError.value = msg
    } else {
      done.value = true
      setTimeout(() => { showRSVP.value = false; done.value = false }, 2200)
    }
  } finally {
    rsvpLoading.value = false
  }
}

// ── Share ─────────────────────────────────────────────────────
function shareEvent(platform) {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(`Join us for "${event.value?.title}" at GolaniSDA Church!`)
  if (platform === 'whatsapp') window.open(`https://wa.me/?text=${text}%20${url}`, '_blank')
  if (platform === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  })
}
</script>