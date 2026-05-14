<template>
  <div>
    <div class="relative pt-24 pb-16 bg-gradient-to-br from-navy-900 via-primary-800 to-navy-900 overflow-hidden">
      <div class="absolute inset-0 bg-hero-pattern opacity-20"></div>
      <div class="container-custom relative z-10 text-center">
        <p class="section-tag text-gold-300 mb-3">Calendar</p>
        <h1 class="font-heading text-4xl md:text-5xl font-bold text-white mb-3">Church Events</h1>
        <div class="divider-gold-center mb-4"></div>
        <p class="text-blue-200 max-w-xl mx-auto">Stay connected with everything happening in our church community.</p>
      </div>
    </div>

    <section class="section bg-white dark:bg-navy-900">
      <div class="container-custom">
        <!-- Filter & Search -->
        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <SearchBar v-model="search" placeholder="Search events..." class="flex-1" />
          <div class="flex gap-2 flex-wrap">
            <button v-for="cat in categories" :key="cat" @click="activeCategory = cat"
              :class="['px-4 py-2 rounded-xl text-sm font-medium transition-all', activeCategory === cat ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-navy-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-navy-700']">
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Events Grid -->
        <div v-if="filteredEvents.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="event in filteredEvents" :key="event.id" class="card-hover group" @click="viewEvent(event)">
            <div class="relative h-48 bg-gradient-to-br from-primary-700 to-navy-800 overflow-hidden cursor-pointer">
              <div class="absolute inset-0 flex items-center justify-center text-8xl opacity-10">📅</div>
              <div class="absolute top-3 left-3">
                <span class="badge-primary text-xs">{{ event.category }}</span>
              </div>
              <div v-if="event.featured" class="absolute top-3 right-3">
                <span class="badge bg-gold-500 text-white text-xs">Featured</span>
              </div>
              <div class="absolute bottom-3 right-3 bg-white/90 dark:bg-navy-900/90 rounded-xl px-3 py-2 text-center">
                <p class="font-bold text-primary-600 dark:text-gold-400 text-xl leading-none">{{ getDay(event.date) }}</p>
                <p class="text-xs text-gray-500">{{ getMonth(event.date) }}</p>
              </div>
            </div>
            <div class="p-5">
              <h3 class="font-heading text-lg font-semibold text-navy-800 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-gold-400 transition-colors">{{ event.title }}</h3>
              <div class="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                <span>🕐 {{ event.time }}</span>
                <span>📍 {{ event.location }}</span>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{{ event.description }}</p>
              <div class="flex items-center justify-between">
                <div v-if="event.capacity" class="text-xs text-gray-400">
                  <div class="h-1 w-24 bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
                    <div class="h-full bg-primary-500 rounded-full" :style="{ width: (event.registered/event.capacity*100) + '%' }"></div>
                  </div>
                  <span class="mt-1 block">{{ event.registered }}/{{ event.capacity }} registered</span>
                </div>
                <button class="btn-primary btn-sm ml-auto" @click.stop="rsvpEvent = event; showRSVP = true">RSVP</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-20">
          <div class="text-5xl mb-3">📅</div>
          <p class="text-gray-400 dark:text-gray-500">No events found for "{{ search }}"</p>
        </div>
      </div>
    </section>

    <!-- Event Detail Modal -->
    <Modal v-model="showDetail" :title="selectedEvent?.title || ''" size="lg">
      <div v-if="selectedEvent">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="space-y-3 text-sm">
            <div class="flex gap-3 p-3 bg-gray-50 dark:bg-navy-900 rounded-xl">📅 <div><p class="font-medium text-gray-800 dark:text-white">Date</p><p class="text-gray-500">{{ formatDate(selectedEvent.date) }}</p></div></div>
            <div class="flex gap-3 p-3 bg-gray-50 dark:bg-navy-900 rounded-xl">🕐 <div><p class="font-medium text-gray-800 dark:text-white">Time</p><p class="text-gray-500">{{ selectedEvent.time }}</p></div></div>
            <div class="flex gap-3 p-3 bg-gray-50 dark:bg-navy-900 rounded-xl">📍 <div><p class="font-medium text-gray-800 dark:text-white">Location</p><p class="text-gray-500">{{ selectedEvent.location }}</p></div></div>
            <div class="flex gap-3 p-3 bg-gray-50 dark:bg-navy-900 rounded-xl">👤 <div><p class="font-medium text-gray-800 dark:text-white">Organizer</p><p class="text-gray-500">{{ selectedEvent.organizer }}</p></div></div>
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{{ selectedEvent.description }}</p>
            <div class="flex flex-wrap gap-1">
              <span v-for="tag in selectedEvent.tags" :key="tag" class="badge-primary text-xs">#{{ tag }}</span>
            </div>
          </div>
        </div>
        <button @click="showDetail = false; rsvpEvent = selectedEvent; showRSVP = true" class="btn-gold w-full">Register / RSVP for This Event</button>
      </div>
    </Modal>

    <!-- RSVP Modal -->
    <Modal v-model="showRSVP" title="Register for Event" size="md">
      <div v-if="rsvpEvent">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-5">Registering for: <span class="font-semibold text-primary-600 dark:text-gold-400">{{ rsvpEvent.title }}</span></p>
        <form @submit.prevent="submitRSVP" class="space-y-4">
          <div><label class="label">Full Name *</label><input v-model="rsvpForm.name" class="input" required /></div>
          <div><label class="label">Phone Number *</label><input v-model="rsvpForm.phone" type="tel" class="input" required /></div>
          <div><label class="label">Email Address</label><input v-model="rsvpForm.email" type="email" class="input" /></div>
          <div><label class="label">Number of Attendees</label><select v-model="rsvpForm.attendees" class="select"><option v-for="n in 10" :key="n" :value="n">{{ n }}</option></select></div>
          <button type="submit" class="btn-primary w-full btn-lg">{{ rsvpSubmitted ? 'Registered! God Bless You 🙏' : 'Confirm Registration' }}</button>
        </form>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { events, eventCategories } from '@/data/index.js'
import { formatDate } from '@/utils/index.js'
import SearchBar from '@/components/common/SearchBar.vue'
import Modal from '@/components/common/Modal.vue'

const search = ref('')
const activeCategory = ref('All')
const categories = eventCategories
const showDetail = ref(false)
const showRSVP = ref(false)
const selectedEvent = ref(null)
const rsvpEvent = ref(null)
const rsvpSubmitted = ref(false)
const rsvpForm = ref({ name: '', phone: '', email: '', attendees: 1 })

const filteredEvents = computed(() => events.filter(e => {
  const matchCat = activeCategory.value === 'All' || e.category === activeCategory.value
  const matchSearch = !search.value || e.title.toLowerCase().includes(search.value.toLowerCase()) || e.description.toLowerCase().includes(search.value.toLowerCase())
  return matchCat && matchSearch
}))

function viewEvent(event) { selectedEvent.value = event; showDetail.value = true }
function getDay(d) { return new Date(d).getDate() }
function getMonth(d) { return new Date(d).toLocaleString('en', { month: 'short' }).toUpperCase() }
function submitRSVP() { rsvpSubmitted.value = true; setTimeout(() => { showRSVP.value = false; rsvpSubmitted.value = false; rsvpForm.value = { name: '', phone: '', email: '', attendees: 1 } }, 2000) }
</script>
