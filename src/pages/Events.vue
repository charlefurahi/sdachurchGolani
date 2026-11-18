<template>
  <main class="events-page">

    <!-- =========================================================
         HERO
    ========================================================== -->
    <section class="page-hero events-page__hero">
      <div class="page-hero__inner">
        <div class="container-custom text-center">

          <p class="section-tag text-blue-200 mb-3">
            Church Calendar
          </p>

          <h1
            class="font-heading text-3xl md:text-4xl font-bold text-white mb-3"
          >
            Church Events
          </h1>

          <div class="divider-blue-center mb-4"></div>

          <p class="text-blue-200 max-w-2xl mx-auto leading-relaxed">
            Stay connected with upcoming gatherings, worship services,
            programs, and activities happening in our church community.
          </p>

        </div>
      </div>
    </section>


    <!-- =========================================================
         INTRODUCTION
    ========================================================== -->
    <section class="events-introduction">
      <div class="site-container">

        <div class="events-introduction__grid">

          <p class="text-kicker">
            Church Life
          </p>

          <div>
            <h2>
              Gather. Connect.
              <br />
              Grow Together.
            </h2>

            <p>
              Discover what's happening in our church family.
              Find upcoming services, meetings, programs, and special
              events where we can worship, fellowship, and serve together.
            </p>
          </div>

        </div>

      </div>
    </section>


    <!-- =========================================================
         PREVIEW SCHEDULE NOTICE
    ========================================================== -->
    <section
      v-if="usingFallbackData"
      class="events-notice-section"
    >
      <div class="site-container">

        <div class="events-notice">

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />

            <path
              stroke-linecap="round"
              d="M12 10v5"
            />

            <path
              stroke-linecap="round"
              d="M12 7h.01"
            />
          </svg>

          <p>
            Sample events are shown for preview. The church calendar will display
            live dates and details when the backend is connected.
          </p>

        </div>

      </div>
    </section>


    <!-- =========================================================
         FEATURED EVENT
    ========================================================== -->
    <section
      v-if="featuredEvent"
      class="featured-event-section"
    >
      <div class="container-custom">

        <p class="section-tag mb-4">
          Featured Event
        </p>

        <article class="featured-event">

          <!-- Media -->
          <div class="featured-event__media">

            <img
              v-if="getBannerUrl(featuredEvent)"
              :src="getBannerUrl(featuredEvent)"
              :alt="featuredEvent.title"
              @error="featuredImageFailed = true"
            />

            <div
              v-else
              class="featured-event__placeholder"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.4"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>

            <span class="featured-event__badge">
              Featured
            </span>

          </div>

          <!-- Content -->
          <div class="featured-event__content">

            <span class="featured-event__category">
              {{ getCategoryName(featuredEvent) }}
            </span>

            <h2>
              {{ featuredEvent.title }}
            </h2>

            <p
              v-if="featuredEvent.subtitle"
              class="featured-event__subtitle"
            >
              {{ featuredEvent.subtitle }}
            </p>

            <p
              v-if="featuredEvent.bible_verse"
              class="featured-event__verse"
            >
              {{ featuredEvent.bible_verse }}
            </p>

            <div class="featured-event__meta">

              <span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>

                {{ formatEventDate(featuredEvent.start_date) }}
              </span>

              <span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>

                {{ getTime(featuredEvent.start_date) }}
              </span>

              <span
                v-if="
                  featuredEvent.location ||
                  featuredEvent.is_online
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path
                    d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1116 0z"
                  />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>

                {{
                  featuredEvent.is_online
                    ? 'Online'
                    : featuredEvent.location
                }}
              </span>

            </div>

            <p
              v-if="featuredEvent.description"
              class="featured-event__description"
            >
              {{ featuredEvent.description }}
            </p>

            <div class="featured-event__actions">

              <button
                type="button"
                class="btn-primary"
                @click="viewEvent(featuredEvent)"
              >
                View Event
              </button>

              <button
                v-if="featuredEvent.rsvp_required"
                type="button"
                class="btn-outline"
                @click="openRSVP(featuredEvent)"
              >
                Register / RSVP
              </button>

            </div>

          </div>

        </article>

      </div>
    </section>


    <!-- =========================================================
         EVENT LIBRARY
    ========================================================== -->
    <section class="event-library-section">
      <div class="site-container">

        <!-- Heading -->
        <div class="event-library-heading">

          <div>
            <p class="text-kicker">
              Explore the calendar
            </p>

            <h2>
              Upcoming Events
            </h2>
          </div>

          <p>
            Search for an event by title, location, speaker,
            or category.
          </p>

        </div>


        <!-- =====================================================
             FILTERS
        ====================================================== -->
        <div class="event-filters">

          <!-- Search -->
          <div class="event-search">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="6" />
              <path
                stroke-linecap="round"
                d="m20 20-4.35-4.35"
              />
            </svg>

            <input
              v-model="search"
              type="search"
              placeholder="Search events, locations or speakers"
            />

            <button
              v-if="search"
              type="button"
              @click="search = ''"
              aria-label="Clear search"
            >
              ×
            </button>

          </div>


          <!-- Categories -->
          <div class="event-category-filter">

            <button
              type="button"
              :class="{
                active: activeCategory === 'All'
              }"
              @click="activeCategory = 'All'"
            >
              All
            </button>

            <button
              v-for="category in categoryObjects"
              :key="category.slug || category.id || category.name"
              type="button"
              :class="{
                active: activeCategory === category.name
              }"
              @click="activeCategory = category.name"
            >
              {{ category.name }}
            </button>

          </div>


          <!-- View -->
          <div class="event-view-toggle">

            <button
              type="button"
              :class="{ active: viewMode === 'grid' }"
              title="Grid view"
              @click="viewMode = 'grid'"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </button>

            <button
              type="button"
              :class="{ active: viewMode === 'list' }"
              title="List view"
              @click="viewMode = 'list'"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <rect x="3" y="4" width="18" height="2" />
                <rect x="3" y="11" width="18" height="2" />
                <rect x="3" y="18" width="18" height="2" />
              </svg>
            </button>

          </div>

        </div>


        <!-- Active filters -->
        <div
          v-if="search || activeCategory !== 'All'"
          class="active-filters"
        >
          <span>
            Filters:
          </span>

          <button
            v-if="activeCategory !== 'All'"
            type="button"
            @click="activeCategory = 'All'"
          >
            {{ activeCategory }} ×
          </button>

          <button
            v-if="search"
            type="button"
            @click="search = ''"
          >
            "{{ search }}" ×
          </button>

          <button
            type="button"
            class="clear-filters"
            @click="clearFilters"
          >
            Clear all
          </button>
        </div>


        <!-- =====================================================
             ERROR
        ====================================================== -->
        <div
          v-if="error && !loading && !usingFallbackData"
          class="event-error"
        >
          <strong>Unable to load events.</strong>

          <span>
            Please check your connection and try again.
          </span>

          <button
            type="button"
            @click="fetchEvents"
          >
            Try Again
          </button>
        </div>


        <!-- =====================================================
             LOADING
        ====================================================== -->
        <div
          v-if="loading"
          class="event-grid"
        >
          <div
            v-for="n in 6"
            :key="n"
            class="event-skeleton"
          >
            <div class="event-skeleton__image"></div>

            <div class="event-skeleton__content">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>


        <!-- =====================================================
             EVENTS
        ====================================================== -->
        <div
          v-else-if="filteredEvents.length"
          :class="[
            'event-grid',
            {
              'event-grid--list': viewMode === 'list'
            }
          ]"
        >
          <EventCard
            v-for="event in filteredEvents"
            :key="event.id"
            :event="event"
          />
        </div>


        <!-- =====================================================
             EMPTY
        ====================================================== -->
        <div
          v-else
          class="event-empty"
        >
          <div class="event-empty__icon">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.4"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>

          </div>

          <h3>
            No Events Found
          </h3>

          <p v-if="search || activeCategory !== 'All'">
            Try changing your search or selecting another category.
          </p>

          <p v-else>
            There are currently no events available.
            Please check back soon.
          </p>

          <button
            v-if="search || activeCategory !== 'All'"
            type="button"
            class="btn-outline"
            @click="clearFilters"
          >
            Clear Filters
          </button>
        </div>


        <!-- =====================================================
             PAGINATION
        ====================================================== -->
        <div
          v-if="!loading && totalPages > 1"
          class="event-pagination"
        >

          <button
            type="button"
            :disabled="currentPage === 1"
            @click="goPage(currentPage - 1)"
          >
            ← Previous
          </button>

          <div>
            <button
              v-for="pageNumber in totalPages"
              :key="pageNumber"
              type="button"
              :class="{
                active: currentPage === pageNumber
              }"
              @click="goPage(pageNumber)"
            >
              {{ pageNumber }}
            </button>
          </div>

          <button
            type="button"
            :disabled="currentPage === totalPages"
            @click="goPage(currentPage + 1)"
          >
            Next →
          </button>

        </div>

      </div>
    </section>


    <!-- =========================================================
         EVENT DETAILS MODAL
    ========================================================== -->
    <Teleport to="body">

      <Transition name="event-modal">

        <div
          v-if="showDetail && selectedEvent"
          class="modal-overlay"
          @click.self="closeDetail"
        >

          <div
            class="event-modal-card"
            role="dialog"
            aria-modal="true"
          >

            <button
              type="button"
              class="modal-close"
              aria-label="Close"
              @click="closeDetail"
            >
              ×
            </button>


            <!-- Header -->
            <div class="event-modal-card__header">

              <img
                v-if="getBannerUrl(selectedEvent)"
                :src="getBannerUrl(selectedEvent)"
                :alt="selectedEvent.title"
              />

              <div
                v-else
                class="event-modal-card__placeholder"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.4"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>

            </div>


            <!-- Content -->
            <div class="event-modal-card__content">

              <span class="event-modal-card__category">
                {{ getCategoryName(selectedEvent) }}
              </span>

              <h2>
                {{ selectedEvent.title }}
              </h2>

              <p
                v-if="selectedEvent.subtitle"
                class="modal-subtitle"
              >
                {{ selectedEvent.subtitle }}
              </p>

              <p
                v-if="selectedEvent.description"
                class="modal-description"
              >
                {{ selectedEvent.description }}
              </p>


              <!-- Details -->
              <div class="modal-details">

                <div>
                  <span>Date</span>
                  <strong>
                    {{ formatEventDate(selectedEvent.start_date) }}
                  </strong>
                </div>

                <div>
                  <span>Time</span>
                  <strong>
                    {{ getTime(selectedEvent.start_date) }}
                  </strong>
                </div>

                <div>
                  <span>Location</span>
                  <strong>
                    {{
                      selectedEvent.is_online
                        ? 'Online'
                        : selectedEvent.location || 'TBA'
                    }}
                  </strong>
                </div>

                <div v-if="selectedEvent.speaker_name">
                  <span>Speaker</span>
                  <strong>
                    {{ selectedEvent.speaker_name }}
                  </strong>
                </div>

                <div v-if="selectedEvent.organizer">
                  <span>Organizer</span>
                  <strong>
                    {{ selectedEvent.organizer }}
                  </strong>
                </div>

                <div v-if="selectedEvent.contact_email">
                  <span>Contact</span>

                  <a
                    :href="`mailto:${selectedEvent.contact_email}`"
                  >
                    {{ selectedEvent.contact_email }}
                  </a>
                </div>

              </div>


              <!-- Capacity -->
              <div
                v-if="selectedEvent.max_attendees"
                class="modal-capacity"
              >
                <div>
                  <span>Registration</span>

                  <strong>
                    {{ selectedEvent.rsvp_count ?? 0 }}
                    /
                    {{ selectedEvent.max_attendees }}
                  </strong>
                </div>

                <div class="modal-capacity__bar">
                  <div
                    :style="{
                      width: `${getCapacityPct(selectedEvent)}%`
                    }"
                  ></div>
                </div>
              </div>


              <!-- Actions -->
              <div class="modal-actions">

                <a
                  v-if="
                    selectedEvent.is_online &&
                    selectedEvent.online_url
                  "
                  :href="selectedEvent.online_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-primary"
                >
                  Join Online
                </a>

                <button
                  v-if="selectedEvent.rsvp_required"
                  type="button"
                  class="btn-primary"
                  @click="openRSVP(selectedEvent)"
                >
                  Register / RSVP
                </button>

                <button
                  type="button"
                  class="btn-outline"
                  @click="shareEvent(selectedEvent)"
                >
                  Share
                </button>

              </div>

            </div>

          </div>

        </div>

      </Transition>

    </Teleport>


    <!-- =========================================================
         RSVP MODAL
    ========================================================== -->
    <Teleport to="body">

      <Transition name="event-modal">

        <div
          v-if="showRSVP && rsvpEvent"
          class="modal-overlay"
          @click.self="closeRSVP"
        >

          <div
            class="rsvp-modal"
            role="dialog"
            aria-modal="true"
          >

            <div class="rsvp-modal__header">

              <div>
                <p class="text-kicker">
                  Event Registration
                </p>

                <h3>
                  {{ rsvpEvent.title }}
                </h3>
              </div>

              <button
                type="button"
                class="modal-close"
                @click="closeRSVP"
              >
                ×
              </button>

            </div>


            <div
              v-if="rsvpDone"
              class="rsvp-success"
            >

              <div class="rsvp-success__icon">
                ✓
              </div>

              <h4>
                Registration Successful
              </h4>

              <p>
                You have successfully registered for this event.
              </p>

            </div>


            <form
              v-else
              class="rsvp-form"
              @submit.prevent="submitRSVP"
            >

              <div class="rsvp-row">

                <label>
                  Full Name
                  <span>*</span>

                  <input
                    v-model.trim="rsvpForm.name"
                    type="text"
                    required
                    placeholder="Your full name"
                  />
                </label>

                <label>
                  Phone
                  <span>*</span>

                  <input
                    v-model.trim="rsvpForm.phone"
                    type="tel"
                    required
                    placeholder="+255 7xx xxx xxx"
                  />
                </label>

              </div>


              <label>
                Email
                <small>(optional)</small>

                <input
                  v-model.trim="rsvpForm.email"
                  type="email"
                  placeholder="you@example.com"
                />
              </label>


              <label>
                Additional Guests

                <select v-model.number="rsvpForm.guests">
                  <option
                    v-for="n in 10"
                    :key="n - 1"
                    :value="n - 1"
                  >
                    {{
                      n - 1 === 0
                        ? 'Just me'
                        : `${n - 1} guest${n - 1 > 1 ? 's' : ''}`
                    }}
                  </option>
                </select>
              </label>


              <label>
                Notes
                <small>(optional)</small>

                <textarea
                  v-model.trim="rsvpForm.notes"
                  rows="3"
                  placeholder="Any additional information..."
                ></textarea>
              </label>


              <p
                v-if="rsvpError"
                class="rsvp-error"
              >
                {{ rsvpError }}
              </p>


              <button
                type="submit"
                class="btn-primary rsvp-submit"
                :disabled="rsvpLoading"
              >
                {{
                  rsvpLoading
                    ? 'Submitting...'
                    : 'Confirm Registration'
                }}
              </button>

            </form>

          </div>

        </div>

      </Transition>

    </Teleport>

  </main>
</template>


<script setup>
import {
  ref,
  computed,
  onMounted
} from 'vue'

import { formatDate } from '@/utils/index.js'
import eventService from '@/services/eventService'
import { OFFLINE_DEMO } from '@/services/offline'
import EventCard from '@/components/events/EventCard.vue'

/*
|--------------------------------------------------------------------------
| Optional demo data
|--------------------------------------------------------------------------
|
| IMPORTANT:
| Demo data is used in local preview mode or if the backend is unavailable.
| A live response, including an empty list, is the source of truth.
|
| If demoEvents is empty, the page simply shows the empty state.
|--------------------------------------------------------------------------
*/
import {
  events as demoEvents,
  eventCategories as demoCategories
} from '@/data/events.js'

const safeDemoEvents = Array.isArray(demoEvents) ? demoEvents : []
const safeDemoCategories = Array.isArray(demoCategories)
  ? demoCategories
  : []
/* =========================================================
   API
========================================================= */

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') ||
  'http://127.0.0.1:8000'


/* =========================================================
   STATE
========================================================= */

const search = ref('')
const activeCategory = ref('All')
const viewMode = ref('grid')

const loading = ref(false)
const error = ref(null)

const currentPage = ref(1)
const totalPages = ref(1)

const apiEvents = ref([])
const apiCategories = ref([])

const usingFallbackData = ref(false)

const selectedEvent = ref(null)
const showDetail = ref(false)

const rsvpEvent = ref(null)
const showRSVP = ref(false)

const rsvpDone = ref(false)
const rsvpLoading = ref(false)
const rsvpError = ref(null)

const copied = ref(false)

const featuredImageFailed = ref(false)

const rsvpForm = ref({
  name: '',
  phone: '',
  email: '',
  guests: 0,
  notes: ''
})


/* =========================================================
   DATA
========================================================= */

const events = computed(() => {
  return apiEvents.value
})

const categoryObjects = computed(() => {
  return apiCategories.value
})


/* =========================================================
   FILTERED EVENTS
========================================================= */

const filteredEvents = computed(() => {

  const query = search.value.trim().toLowerCase()

  return events.value.filter(event => {

    const category =
      typeof event.category === 'object'
        ? event.category?.name
        : event.category

    const matchesCategory =
      activeCategory.value === 'All' ||
      category === activeCategory.value

    if (!query) {
      return matchesCategory
    }

    const searchableText = [
      event.title,
      event.subtitle,
      event.description,
      event.short_description,
      event.location,
      event.speaker_name,
      event.bible_verse
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return (
      matchesCategory &&
      searchableText.includes(query)
    )
  })
})


/* =========================================================
   FEATURED
========================================================= */

const featuredEvent = computed(() => {

  return (
    events.value.find(event => {
      return event.is_featured === true
    }) || null
  )
})


/* =========================================================
   BACKEND-FIRST FETCH
========================================================= */

async function fetchEvents() {

  loading.value = true
  error.value = null
  usingFallbackData.value = false

  try {

    const params = {
      page: currentPage.value,
      page_size: 24,
      ordering: 'start_date'
    }

    if (search.value.trim()) {
      params.search = search.value.trim()
    }


    /*
    |--------------------------------------------------------------------------
    | BACKEND IS ALWAYS FIRST
    |--------------------------------------------------------------------------
    */

    let response = null

    const endpoints = [
      () =>
        eventService.getAll({
          ...params,
          ordering: 'start_date'
        }),

      () =>
        eventService.getAllEvents({
          ...params,
          ordering: 'start_date'
        }),

      () =>
        eventService.getUpcoming(params)
    ]


    for (const request of endpoints) {

      try {

        response = await request()

        if (
          response !== undefined &&
          response !== null
        ) {
          break
        }

      } catch {
        // Try the next supported endpoint.
      }
    }


    if (
      response === null ||
      response === undefined
    ) {
      throw new Error(
        'Events API is unavailable.'
      )
    }


    /*
    |--------------------------------------------------------------------------
    | NORMALISE RESPONSE
    |--------------------------------------------------------------------------
    */

    const raw =
      response?.results ??
      response?.data ??
      response

    const backendEvents =
      Array.isArray(raw)
        ? raw
        : []


    /*
    |--------------------------------------------------------------------------
    | GET CATEGORIES
    |--------------------------------------------------------------------------
    */

    let backendCategories = []

    try {

      const categoriesResponse =
        await eventService.getCategories()

      const categoriesRaw =
        categoriesResponse?.results ??
        categoriesResponse?.data ??
        categoriesResponse

      if (Array.isArray(categoriesRaw)) {
        backendCategories = categoriesRaw
      }

    } catch {
      // Categories are optional.
    }


    /*
    |--------------------------------------------------------------------------
    | REAL BACKEND DATA
    |--------------------------------------------------------------------------
    */

    if (backendEvents.length > 0) {

      apiEvents.value = backendEvents

      apiCategories.value =
        backendCategories.length
          ? backendCategories
          : buildCategoriesFromEvents(
              backendEvents
            )

      totalPages.value =
        response?.count
          ? Math.max(
              1,
              Math.ceil(
                response.count / 24
              )
            )
          : 1

      usingFallbackData.value = false

      return
    }


    /* Demo content belongs to local preview mode. A live backend's empty
       response is authoritative and should stay empty. */
    if (
      OFFLINE_DEMO &&
      Array.isArray(demoEvents) &&
      demoEvents.length > 0
    ) {

      apiEvents.value = demoEvents

      apiCategories.value =
        demoCategories?.length
          ? demoCategories
          : buildCategoriesFromEvents(
              demoEvents
            )

      totalPages.value = 1

      usingFallbackData.value = true

      return
    }


    /*
    |--------------------------------------------------------------------------
    | NO BACKEND DATA + NO DEMO DATA
    |--------------------------------------------------------------------------
    */

    apiEvents.value = []

    apiCategories.value =
      backendCategories.length
        ? backendCategories
        : []

    totalPages.value = 1

    usingFallbackData.value = false

  } catch (err) {

    console.warn(
      'Events API error:',
      err
    )


    /*
    |--------------------------------------------------------------------------
    | API FAILED
    |--------------------------------------------------------------------------
    |
    | Try demo data ONLY if it exists.
    |
    */

    if (
      Array.isArray(demoEvents) &&
      demoEvents.length > 0
    ) {

      apiEvents.value = demoEvents

      apiCategories.value =
        demoCategories?.length
          ? demoCategories
          : buildCategoriesFromEvents(
              demoEvents
            )

      totalPages.value = 1

      usingFallbackData.value = true

      /*
       * Do not show a scary server error to
       * visitors when demo content is available.
       */
      error.value = null

    } else {

      /*
       * No demo data.
       *
       * Keep the page functional and show
       * the proper empty/error state.
       */
      apiEvents.value = []
      apiCategories.value = []
      totalPages.value = 1

      usingFallbackData.value = false

      error.value =
        err?.message ||
        'Could not load events.'

    }

  } finally {

    loading.value = false

  }
}


/* =========================================================
   BUILD CATEGORIES WHEN API DOES NOT PROVIDE THEM
========================================================= */

function buildCategoriesFromEvents(eventList) {

  const map = new Map()

  eventList.forEach(event => {

    const category =
      typeof event.category === 'object'
        ? event.category
        : null

    const name =
      category?.name ||
      event.category

    if (!name) return

    if (!map.has(name)) {

      map.set(name, {
        id: category?.id || name,
        slug: category?.slug || name
          .toLowerCase()
          .replace(/\s+/g, '-'),
        name,
        color: category?.color || null
      })

    }

  })

  return Array.from(map.values())
}


/* =========================================================
   SEARCH / FILTER
========================================================= */

function clearFilters() {

  search.value = ''
  activeCategory.value = 'All'
  currentPage.value = 1

  fetchEvents()
}


/* =========================================================
   PAGINATION
========================================================= */

function goPage(page) {

  if (
    page < 1 ||
    page > totalPages.value ||
    page === currentPage.value
  ) {
    return
  }

  currentPage.value = page

  fetchEvents()

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}


/* =========================================================
   IMAGE HELPERS
========================================================= */

function getBannerUrl(event) {

  const src =
    event?.banner_url ||
    event?.thumbnail_url ||
    event?.banner ||
    event?.thumbnail ||
    event?.image ||
    null

  if (!src) return null

  if (src.startsWith('http')) {
    return src
  }

  return BASE_URL + src
}


/* =========================================================
   CATEGORY
========================================================= */

function getCategoryName(event) {

  if (!event?.category) {
    return 'General'
  }

  return typeof event.category === 'object'
    ? event.category?.name || 'General'
    : event.category
}


/* =========================================================
   DATE
========================================================= */

function formatEventDate(date) {

  if (!date) {
    return 'Date TBA'
  }

  try {
    return formatDate(date)
  } catch {

    return new Date(date)
      .toLocaleDateString('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })

  }
}


function getTime(date) {

  if (!date) {
    return 'Time TBA'
  }

  const value = new Date(date)

  if (Number.isNaN(value.getTime())) {
    return 'Time TBA'
  }

  return value.toLocaleTimeString('en', {
    hour: '2-digit',
    minute: '2-digit'
  })
}


/* =========================================================
   CAPACITY
========================================================= */

function getCapacityPct(event) {

  const registered =
    Number(event?.rsvp_count ?? 0)

  const capacity =
    Number(event?.max_attendees ?? 0)

  if (!capacity) {
    return 0
  }

  return Math.min(
    Math.max(
      (registered / capacity) * 100,
      0
    ),
    100
  )
}


/* =========================================================
   DETAIL MODAL
========================================================= */

function viewEvent(event) {

  selectedEvent.value = event
  showDetail.value = true

  document.body.classList.add(
    'modal-open'
  )
}


function closeDetail() {

  showDetail.value = false
  selectedEvent.value = null

  document.body.classList.remove(
    'modal-open'
  )
}


/* =========================================================
   RSVP
========================================================= */

function openRSVP(event) {

  closeDetail()

  rsvpEvent.value = event

  rsvpDone.value = false
  rsvpError.value = null

  rsvpForm.value = {
    name: '',
    phone: '',
    email: '',
    guests: 0,
    notes: ''
  }

  showRSVP.value = true

  document.body.classList.add(
    'modal-open'
  )
}


function closeRSVP() {

  showRSVP.value = false
  rsvpEvent.value = null

  document.body.classList.remove(
    'modal-open'
  )
}


async function submitRSVP() {

  if (!rsvpEvent.value) {
    return
  }

  if (
    !rsvpForm.value.name ||
    !rsvpForm.value.phone
  ) {

    rsvpError.value =
      'Full name and phone number are required.'

    return
  }

  rsvpLoading.value = true
  rsvpError.value = null

  try {

    await eventService.rsvp(
      rsvpEvent.value.id,
      {
        ...rsvpForm.value
      }
    )

    rsvpDone.value = true

    setTimeout(() => {

      closeRSVP()

      rsvpDone.value = false

    }, 2500)

  } catch (err) {

    const data =
      err?.response?.data ||
      err

    const message =
      data?.email?.[0] ||
      data?.detail ||
      data?.message ||
      null

    if (
      message &&
      message.toLowerCase().includes(
        'already'
      )
    ) {

      rsvpError.value =
        'You are already registered for this event.'

    } else {

      rsvpError.value =
        message ||
        'Registration failed. Please try again.'

    }

  } finally {

    rsvpLoading.value = false

  }
}


/* =========================================================
   SHARE
========================================================= */

async function shareEvent(event) {

  const url =
    `${window.location.origin}/events/${event.id}`

  const text =
    `Join us for "${event.title}" at Golani Adventist Church!`

  if (
    navigator.share
  ) {

    try {

      await navigator.share({
        title: event.title,
        text,
        url
      })

      return

    } catch {
      // User cancelled share.
    }

  }


  try {

    await navigator.clipboard.writeText(url)

    copied.value = true

    setTimeout(() => {
      copied.value = false
    }, 2000)

  } catch {

    window.prompt(
      'Copy this event link:',
      url
    )

  }
}


/* =========================================================
   INITIAL LOAD
========================================================= */

onMounted(() => {
  fetchEvents()
})
</script>


<style scoped>
/* =========================================================
   PAGE
========================================================= */

.events-page {
  --navy: #102638;
  --navy-light: #315d78;

  --gold: #c9a227;
  --gold-dark: #a67c00;

  --cream: #f5f3ed;
  --off-white: #faf9f6;

  --border: rgba(13, 33, 55, 0.09);

  color: var(--navy);
}


/* =========================================================
   HERO
========================================================= */

.events-page__hero {
  background: linear-gradient(135deg, #fffdf7, #edf3f3);
}


/* =========================================================
   INTRODUCTION
========================================================= */

.events-introduction {
  padding: 5rem 0;

  background: #ffffff;
}

.events-introduction__grid {
  display: grid;

  grid-template-columns:
    minmax(140px, 0.45fr)
    minmax(0, 1.55fr);

  gap: 4rem;

  align-items: start;
}

.events-introduction__grid h2 {
  margin: 0;

  color: var(--navy);

  font-family:
    'Cormorant Garamond',
    Georgia,
    serif;

  font-size:
    clamp(2rem, 4vw, 3.2rem);

  line-height: 1.08;
}

.events-introduction__grid p:not(.text-kicker) {
  max-width: 650px;

  margin-top: 1.2rem;

  color: var(--color-text-muted);

  font-size: 0.95rem;

  line-height: 1.8;
}


/* =========================================================
   FALLBACK NOTICE
========================================================= */

.events-notice-section {
  padding: 0 0 2rem;

  background: #ffffff;
}

.events-notice {
  display: flex;
  align-items: flex-start;

  gap: 0.75rem;

  padding: 1rem 1.2rem;

  border-left:
    3px solid var(--gold);

  background: #f5f3ed;

  color: var(--color-text-muted);

  font-size: 0.8rem;

  line-height: 1.6;
}

.events-notice svg {
  width: 18px;
  height: 18px;

  flex-shrink: 0;

  margin-top: 0.1rem;

  color: var(--gold-dark);
}

.events-notice p {
  margin: 0;
}


/* =========================================================
   FEATURED EVENT
========================================================= */

.featured-event-section {
  padding: 2.5rem 0 4rem;

  background: #ffffff;
}

.featured-event {
  display: grid;

  grid-template-columns:
    minmax(300px, 0.9fr)
    minmax(0, 1.1fr);

  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 1.25rem;

  overflow: hidden;

  box-shadow:
    0 20px 55px rgba(13, 33, 55, 0.16);
}

.featured-event__media {
  position: relative;

  min-height: 390px;

  background: #16324a;
}

.featured-event__media img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  opacity: 0.82;
}

.featured-event__placeholder {
  width: 100%;
  height: 100%;

  display: grid;
  place-items: center;

  color: rgba(255, 255, 255, 0.16);
}

.featured-event__placeholder svg {
  width: 90px;
  height: 90px;
}

.featured-event__badge {
  position: absolute;

  top: 1.2rem;
  left: 1.2rem;

  padding: 0.45rem 0.8rem;

  background: var(--gold);
  color: var(--navy);

  font-size: 0.65rem;
  font-weight: 800;

  letter-spacing: 0.08em;

  text-transform: uppercase;
}

.featured-event__content {
  padding:
    clamp(2rem, 5vw, 3.5rem);
}

.featured-event__category {
  display: block;

  margin-bottom: 0.8rem;

  color: var(--gold-dark);

  font-size: 0.68rem;
  font-weight: 700;

  letter-spacing: 0.1em;

  text-transform: uppercase;
}

.featured-event h2 {
  margin: 0;

  color: var(--color-footer);

  font-family:
    'Cormorant Garamond',
    Georgia,
    serif;

  font-size:
    clamp(2rem, 4vw, 3.2rem);

  line-height: 1.1;
}

.featured-event__subtitle {
  margin: 0.7rem 0 0;

  color: var(--color-text-muted);

  font-size: 0.85rem;
}

.featured-event__verse {
  margin: 1rem 0 0;

  color: var(--gold-dark);

  font-size: 0.85rem;

  font-style: italic;
}

.featured-event__meta {
  display: flex;
  flex-wrap: wrap;

  gap: 0.8rem 1.2rem;

  margin-top: 1.4rem;
}

.featured-event__meta span {
  display: inline-flex;
  align-items: center;

  gap: 0.4rem;

  color: var(--color-text-muted);

  font-size: 0.73rem;
}

.featured-event__meta svg {
  width: 15px;
  height: 15px;
}

.featured-event__description {
  margin-top: 1.3rem;

  color: var(--color-text-muted);

  font-size: 0.84rem;

  line-height: 1.7;
}

.featured-event__actions {
  display: flex;
  flex-wrap: wrap;

  gap: 0.7rem;

  margin-top: 1.5rem;
}


/* =========================================================
   LIBRARY
========================================================= */

.event-library-section {
  padding: 5rem 0 6rem;

  background: var(--off-white);
}

.event-library-heading {
  display: flex;

  align-items: end;
  justify-content: space-between;

  gap: 2rem;

  margin-bottom: 2rem;
}

.event-library-heading h2 {
  margin: 0.5rem 0 0;

  color: var(--navy);

  font-family:
    'Cormorant Garamond',
    Georgia,
    serif;

  font-size:
    clamp(2rem, 4vw, 2.8rem);
}

.event-library-heading > p {
  max-width: 350px;

  margin: 0;

  color: var(--color-text-muted);

  font-size: 0.82rem;

  line-height: 1.7;
}


/* =========================================================
   FILTERS
========================================================= */

.event-filters {
  display: flex;
  align-items: center;

  gap: 1rem;

  flex-wrap: wrap;

  margin-bottom: 1.5rem;
}

.event-search {
  position: relative;

  flex: 1;

  min-width: 250px;
}

.event-search svg {
  position: absolute;

  left: 1rem;
  top: 50%;

  width: 16px;
  height: 16px;

  transform: translateY(-50%);

  color: var(--color-text-faint);

  pointer-events: none;
}

.event-search input {
  width: 100%;

  min-height: 44px;

  padding:
    0 2.5rem
    0 2.8rem;

  border:
    1px solid var(--border);

  border-radius: 0;

  background: #ffffff;

  color: var(--navy);

  font-family: inherit;
  font-size: 0.8rem;

  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.event-search input:focus {
  border-color: var(--navy);

  box-shadow:
    0 0 0 3px rgba(13, 33, 55, 0.06);
}

.event-search input::placeholder {
  color: var(--color-text-faint);
}

.event-search button {
  position: absolute;

  right: 0.8rem;
  top: 50%;

  transform: translateY(-50%);

  border: 0;

  background: none;

  color: var(--color-text-faint);

  font-size: 1rem;

  cursor: pointer;
}

.event-category-filter {
  display: flex;

  gap: 0.35rem;

  flex-wrap: wrap;
}

.event-category-filter button {
  min-height: 36px;

  padding:
    0 0.85rem;

  border:
    1px solid var(--border);

  background: #ffffff;

  color: var(--color-text-muted);

  font-family: inherit;

  font-size: 0.7rem;
  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.event-category-filter button:hover,
.event-category-filter button.active {
  background: var(--navy);
  border-color: var(--navy);
  color: #ffffff;
}

.event-view-toggle {
  display: flex;

  border:
    1px solid var(--border);
}

.event-view-toggle button {
  width: 38px;
  height: 36px;

  display: grid;
  place-items: center;

  border: 0;

  background: #ffffff;

  color: var(--color-text-faint);

  cursor: pointer;
}

.event-view-toggle button + button {
  border-left:
    1px solid var(--border);
}

.event-view-toggle button.active {
  background: var(--navy);
  color: #ffffff;
}

.event-view-toggle svg {
  width: 14px;
  height: 14px;
}


/* =========================================================
   ACTIVE FILTERS
========================================================= */

.active-filters {
  display: flex;
  align-items: center;

  gap: 0.5rem;

  flex-wrap: wrap;

  margin-bottom: 1.5rem;

  font-size: 0.7rem;
}

.active-filters > span {
  color: var(--color-text-faint);

  font-weight: 600;
}

.active-filters button {
  padding: 0.35rem 0.65rem;

  border:
    1px solid var(--border);

  background: #ffffff;

  color: var(--navy);

  font-size: 0.68rem;

  cursor: pointer;
}

.active-filters .clear-filters {
  border: 0;

  background: transparent;

  font-weight: 700;
}


/* =========================================================
   ERROR
========================================================= */

.event-error {
  display: flex;
  align-items: center;

  gap: 0.7rem;

  flex-wrap: wrap;

  margin-bottom: 1.5rem;

  padding: 0.9rem 1rem;

  border-left:
    3px solid #b45309;

  background: #fff7ed;

  color: #7c2d12;

  font-size: 0.78rem;
}

.event-error strong {
  font-weight: 700;
}

.event-error span {
  flex: 1;
}

.event-error button {
  border: 0;

  background: transparent;

  color: #7c2d12;

  font-weight: 700;

  cursor: pointer;
}


/* =========================================================
   GRID
========================================================= */

.event-grid {
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 1.5rem;
}

.event-grid--list {
  grid-template-columns: 1fr;
}


/* =========================================================
   SKELETON
========================================================= */

.event-skeleton {
  overflow: hidden;

  border:
    1px solid var(--border);

  background: #ffffff;
}

.event-skeleton__image {
  height: 220px;

  background:
    linear-gradient(
      90deg,
      #eceae4 25%,
      #f5f3ed 50%,
      #eceae4 75%
    );

  background-size: 200% 100%;

  animation:
    event-shimmer 1.5s infinite;
}

.event-skeleton__content {
  padding: 1.35rem;
}

.event-skeleton__content span {
  display: block;

  height: 11px;

  margin-bottom: 0.8rem;

  background:
    linear-gradient(
      90deg,
      #eceae4 25%,
      #f5f3ed 50%,
      #eceae4 75%
    );

  background-size: 200% 100%;

  animation:
    event-shimmer 1.5s infinite;
}

.event-skeleton__content span:nth-child(1) {
  width: 35%;
}

.event-skeleton__content span:nth-child(2) {
  width: 85%;
  height: 18px;
}

.event-skeleton__content span:nth-child(3) {
  width: 55%;
}

.event-skeleton__content span:nth-child(4) {
  width: 100%;
}

@keyframes event-shimmer {
  to {
    background-position: -200% 0;
  }
}


/* =========================================================
   EMPTY
========================================================= */

.event-empty {
  padding: 5rem 1rem;

  text-align: center;
}

.event-empty__icon {
  width: 72px;
  height: 72px;

  display: grid;
  place-items: center;

  margin:
    0 auto 1.5rem;

  border-radius: 50%;

  background:
    rgba(201, 162, 39, 0.1);

  color: var(--gold);
}

.event-empty__icon svg {
  width: 36px;
  height: 36px;
}

.event-empty h3 {
  margin: 0;

  color: var(--navy);

  font-family:
    'Cormorant Garamond',
    Georgia,
    serif;

  font-size: 1.5rem;
}

.event-empty p {
  max-width: 450px;

  margin:
    0.7rem auto 1.5rem;

  color: var(--color-text-muted);

  font-size: 0.85rem;

  line-height: 1.6;
}


/* =========================================================
   BUTTONS
========================================================= */

.btn-primary,
.btn-outline {
  min-height: 44px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding:
    0 1.15rem;

  font-family: inherit;

  font-size: 0.76rem;
  font-weight: 700;

  text-decoration: none;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.btn-primary {
  border:
    1px solid var(--gold);

  background: var(--gold);
  color: var(--navy);
}

.btn-primary:hover {
  background: #b9901d;
  border-color: #b9901d;

  transform: translateY(-1px);
}

.btn-outline {
  border:
    1px solid rgba(13, 33, 55, 0.18);

  background: transparent;
  color: var(--navy);
}

.btn-outline:hover {
  border-color: var(--gold);

  color: var(--gold-dark);
}


/* =========================================================
   PAGINATION
========================================================= */

.event-pagination {
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 0.5rem;

  margin-top: 3rem;
}

.event-pagination > button {
  min-height: 38px;

  padding:
    0 1rem;

  border:
    1px solid var(--border);

  background: #ffffff;

  color: var(--navy);

  font-family: inherit;

  font-size: 0.7rem;
  font-weight: 600;

  cursor: pointer;
}

.event-pagination > button:disabled {
  opacity: 0.4;

  cursor: not-allowed;
}

.event-pagination > div {
  display: flex;

  gap: 0.25rem;
}

.event-pagination > div button {
  width: 36px;
  height: 36px;

  border:
    1px solid var(--border);

  background: #ffffff;

  color: var(--color-text-muted);

  cursor: pointer;
}

.event-pagination > div button.active {
  background: var(--navy);

  border-color: var(--navy);

  color: #ffffff;
}


/* =========================================================
   MODAL
========================================================= */

.modal-overlay {
  position: fixed;

  inset: 0;

  z-index: 1000;

  display: flex;

  align-items: center;
  justify-content: center;

  padding: 1rem;

  background:
    rgba(8, 20, 34, 0.78);

  backdrop-filter: blur(8px);

  overflow-y: auto;
}

.event-modal-card,
.rsvp-modal {
  position: relative;

  width: min(100%, 850px);

  max-height: calc(100vh - 2rem);

  overflow-y: auto;

  background: #ffffff;

  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.3);
}

.event-modal-card__header {
  height: 280px;

  background: var(--navy);
}

.event-modal-card__header img {
  width: 100%;
  height: 100%;

  object-fit: cover;
}

.event-modal-card__placeholder {
  width: 100%;
  height: 100%;

  display: grid;
  place-items: center;

  color: rgba(255, 255, 255, 0.15);
}

.event-modal-card__placeholder svg {
  width: 75px;
  height: 75px;
}

.modal-close {
  position: absolute;

  right: 1rem;
  top: 1rem;

  z-index: 5;

  width: 38px;
  height: 38px;

  display: grid;
  place-items: center;

  border: 0;

  border-radius: 50%;

  background: rgba(13, 33, 55, 0.9);

  color: #ffffff;

  font-size: 1.4rem;

  line-height: 1;

  cursor: pointer;
}

.event-modal-card__content {
  padding:
    clamp(1.5rem, 4vw, 2.5rem);
}

.event-modal-card__category {
  color: var(--gold-dark);

  font-size: 0.68rem;
  font-weight: 700;

  letter-spacing: 0.08em;

  text-transform: uppercase;
}

.event-modal-card h2 {
  margin: 0.5rem 0 0;

  color: var(--navy);

  font-family:
    'Cormorant Garamond',
    Georgia,
    serif;

  font-size:
    clamp(1.8rem, 4vw, 2.5rem);

  line-height: 1.15;
}

.modal-subtitle {
  margin: 0.6rem 0 0;

  color: var(--color-text-muted);

  font-size: 0.82rem;
}

.modal-description {
  margin: 1.2rem 0 0;

  color: var(--color-text-muted);

  font-size: 0.88rem;

  line-height: 1.8;
}

.modal-details {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 0.8rem;

  margin-top: 1.5rem;
}

.modal-details > div {
  padding: 0.9rem 1rem;

  background: #f5f3ed;
}

.modal-details span {
  display: block;

  margin-bottom: 0.25rem;

  color: var(--color-text-faint);

  font-size: 0.62rem;
  font-weight: 700;

  letter-spacing: 0.07em;

  text-transform: uppercase;
}

.modal-details strong,
.modal-details a {
  color: var(--navy);

  font-size: 0.78rem;

  text-decoration: none;
}

.modal-capacity {
  margin-top: 1.2rem;
}

.modal-capacity > div:first-child {
  display: flex;
  justify-content: space-between;

  margin-bottom: 0.4rem;

  color: var(--color-text-muted);

  font-size: 0.7rem;
}

.modal-capacity strong {
  color: var(--navy);
}

.modal-capacity__bar {
  height: 6px;

  overflow: hidden;

  background: #eceae4;
}

.modal-capacity__bar div {
  height: 100%;

  background: var(--navy);
}

.modal-actions {
  display: flex;

  flex-wrap: wrap;

  gap: 0.6rem;

  margin-top: 1.5rem;
}


/* =========================================================
   RSVP
========================================================= */

.rsvp-modal {
  width: min(100%, 600px);
}

.rsvp-modal__header {
  display: flex;

  justify-content: space-between;
  align-items: flex-start;

  gap: 1rem;

  padding: 1.5rem;

  border-bottom:
    1px solid var(--border);
}

.rsvp-modal__header h3 {
  margin: 0.4rem 0 0;

  color: var(--navy);

  font-family:
    'Cormorant Garamond',
    Georgia,
    serif;

  font-size: 1.6rem;
}

.rsvp-form {
  display: flex;

  flex-direction: column;

  gap: 1rem;

  padding: 1.5rem;
}

.rsvp-row {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 1rem;
}

.rsvp-form label {
  display: flex;

  flex-direction: column;

  gap: 0.35rem;

  color: var(--navy);

  font-size: 0.72rem;
  font-weight: 700;
}

.rsvp-form label span {
  color: #b91c1c;
}

.rsvp-form label small {
  color: var(--color-text-faint);

  font-weight: 400;
}

.rsvp-form input,
.rsvp-form select,
.rsvp-form textarea {
  width: 100%;

  padding: 0.75rem 0.8rem;

  border:
    1px solid var(--border);

  background: #ffffff;

  color: var(--navy);

  font-family: inherit;

  font-size: 0.8rem;

  outline: none;

  resize: vertical;
}

.rsvp-form input:focus,
.rsvp-form select:focus,
.rsvp-form textarea:focus {
  border-color: var(--navy);

  box-shadow:
    0 0 0 3px rgba(13, 33, 55, 0.05);
}

.rsvp-submit {
  width: 100%;
}

.rsvp-submit:disabled {
  opacity: 0.6;

  cursor: not-allowed;
}

.rsvp-error {
  margin: 0;

  color: #991b1b;

  font-size: 0.75rem;
}

.rsvp-success {
  padding: 3rem 1.5rem;

  text-align: center;
}

.rsvp-success__icon {
  width: 64px;
  height: 64px;

  display: grid;
  place-items: center;

  margin: 0 auto 1rem;

  border-radius: 50%;

  background: #dcfce7;

  color: #166534;

  font-size: 1.6rem;
  font-weight: 700;
}

.rsvp-success h4 {
  margin: 0;

  color: var(--navy);

  font-family:
    'Cormorant Garamond',
    Georgia,
    serif;

  font-size: 1.5rem;
}

.rsvp-success p {
  margin-top: 0.5rem;

  color: var(--color-text-muted);

  font-size: 0.8rem;
}

/* Warm, open calendar surfaces that match the rest of the church site. */
.events-introduction, .events-notice-section, .featured-event-section { background: var(--color-bg); }
.events-introduction__grid h2, .event-library-heading h2, .event-empty h3 { font-family: var(--font-display); }
.event-library-section { background: var(--color-bg-alt); }
.event-filters { padding: 1rem; border: 1px solid var(--color-border); border-radius: 1rem; background: var(--color-surface); box-shadow: var(--shadow-soft); }
.event-search input { min-height: 48px; border-color: var(--color-border-strong); border-radius: .7rem; background: var(--color-surface); color: var(--color-text-main); }
.featured-event { overflow: hidden; border: 1px solid var(--color-border); border-radius: 1.25rem; background: var(--color-surface); box-shadow: var(--shadow-lift); }
.featured-event__media { background: #e8efeb; }
.featured-event__media img { opacity: 1; }
.featured-event__placeholder { color: #6b8790; }
.featured-event__content { color: var(--color-text-main); }
.featured-event h2 { color: var(--color-footer); font-family: var(--font-display); font-weight: 700; }
.featured-event__category { color: var(--color-gold-dark); }
.featured-event__subtitle, .featured-event__description { color: var(--color-text-muted); }
.featured-event__verse { color: #98700f; }
.featured-event__meta span { color: var(--color-text-muted); }
.featured-event__meta svg { color: #98700f; }
.events-notice { border-radius: .75rem; }
.event-empty { border: 1px dashed var(--color-border-strong); border-radius: 1rem; background: var(--color-surface); }

:global(.dark) .events-introduction,
:global(.dark) .events-notice-section,
:global(.dark) .featured-event-section { background: var(--color-bg); }
:global(.dark) .events-page__hero { background: linear-gradient(135deg, #172f45, #203d51); }
:global(.dark) .events-page { color: var(--color-text-main); }
:global(.dark) .featured-event { border-color: var(--color-border); background: var(--color-surface); }
:global(.dark) .featured-event h2 { color: var(--color-heading); }
:global(.dark) .featured-event__subtitle,
:global(.dark) .featured-event__description,
:global(.dark) .featured-event__meta span { color: var(--color-text-muted); }
:global(.dark) .event-filters,
:global(.dark) .event-empty { border-color: var(--color-border); background: var(--color-surface); }
:global(.dark) .event-search input { border-color: var(--color-border-strong); background: var(--color-surface-alt); color: var(--color-text-main); }
:global(.dark) .events-introduction__grid h2,
:global(.dark) .event-library-heading h2,
:global(.dark) .event-empty h3 { color: #f2f6f8; }
:global(.dark) .events-introduction__grid p:not(.text-kicker),
:global(.dark) .event-library-heading > p { color: var(--color-text-muted); }
:global(.dark) .event-library-section { background: var(--color-bg-alt); }
:global(.dark) .events-notice { border-color: #c6a84e; background: var(--color-surface); color: var(--color-text-muted); }
:global(.dark) .event-category-filter button:not(.active),
:global(.dark) .event-view-toggle button:not(.active) { border-color: var(--color-border-strong); background: var(--color-surface); color: var(--color-text-main); }
:global(.dark) .event-modal-card, :global(.dark) .rsvp-modal { border-color: var(--color-border); background: var(--color-surface); color: var(--color-text-main); }
:global(.dark) .event-modal-card__content, :global(.dark) .rsvp-modal__header { color: var(--color-text-main); }
:global(.dark) .rsvp-modal__header h3, :global(.dark) .rsvp-success h4 { color: #f2f6f8; }
:global(.dark) .rsvp-form label { color: #eef3f7; }
:global(.dark) .rsvp-form input, :global(.dark) .rsvp-form select, :global(.dark) .rsvp-form textarea { border-color: var(--color-border-strong); background: var(--color-surface-alt); color: #f2f6f8; }
:global(.dark) .event-error { border-color: #8d3c45; background: #3a2027; color: #fecdd3; }


/* =========================================================
   TRANSITION
========================================================= */

.event-modal-enter-active,
.event-modal-leave-active {
  transition: opacity 0.2s ease;
}

.event-modal-enter-from,
.event-modal-leave-to {
  opacity: 0;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 1024px) {

  .event-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .featured-event {
    grid-template-columns: 1fr 1fr;
  }

}

@media (max-width: 768px) {

  .events-introduction__grid {
    grid-template-columns: 1fr;

    gap: 1.2rem;
  }

  .event-library-heading {
    align-items: flex-start;

    flex-direction: column;
  }

  .featured-event {
    grid-template-columns: 1fr;
  }

  .featured-event__media {
    min-height: 250px;
  }

  .event-filters {
    align-items: stretch;

    flex-direction: column;
  }

  .event-search {
    width: 100%;
  }

  .event-category-filter {
    width: 100%;
  }

  .event-view-toggle {
    align-self: flex-start;
  }

  .modal-details {
    grid-template-columns: 1fr;
  }

  .rsvp-row {
    grid-template-columns: 1fr;
  }

}

@media (max-width: 640px) {

  .event-grid {
    grid-template-columns: 1fr;
  }

  .event-pagination {
    flex-wrap: wrap;
  }

  .event-pagination > div {
    order: 3;

    width: 100%;

    justify-content: center;
  }

  .event-modal-card__header {
    height: 210px;
  }

}

:global(.dark) .events-page { --navy:#eef3f7; --navy-light:#b8c8d5; --gold:#f4d03f; --gold-dark:#f4d03f; --cream:#172f45; --off-white:#12263a; --border:rgba(255,255,255,.13); color:#eef3f7; }
:global(.dark) .events-introduction,:global(.dark) .events-notice-section,:global(.dark) .featured-event-section { background:#0e1b27; }
:global(.dark) .events-introduction__grid h2,:global(.dark) .event-library-heading h2 { color:#fff; }
:global(.dark) .events-notice { background:#172f45; color:#d5e0e8; }
:global(.dark) .featured-event { background:#172f45; }
:global(.dark) .featured-event h2 { color:#fff; }
:global(.dark) .featured-event__category,:global(.dark) .featured-event__verse { color:#f4d03f; }
:global(.dark) .event-library-section { background:#12263a; }
:global(.dark) .event-search input,:global(.dark) .event-category-filter button,:global(.dark) .event-view-toggle button,:global(.dark) .event-card,:global(.dark) .event-modal-card { background:#172f45; color:#eef3f7; border-color:rgba(255,255,255,.14); }
:global(.dark) .event-card h3,:global(.dark) .event-card h4,:global(.dark) .event-library-heading p { color:#eef3f7; }
:global(.dark) .event-search input:focus { border-color:#f4d03f; box-shadow:0 0 0 3px rgba(244,208,63,.12); }
</style>
