<template>
  <main class="sermons-page">

    <!-- Page Header — matched to the Photos/Gallery/Announcements style -->
    <section class="page-hero sermons-page__hero">
      <div class="page-hero__inner">
        <div class="container-custom text-center">
          <p class="section-tag text-blue-200 mb-3">Media Library</p>
          <h1 class="font-heading text-3xl md:text-4xl font-bold text-white mb-3">Sermons &amp; Messages</h1>
          <div class="divider-blue-center mb-4"></div>
          <p class="text-blue-200 max-w-2xl mx-auto leading-relaxed">
            Explore messages that inspire faith, deepen understanding, and help us grow together in Christ.
          </p>
        </div>
      </div>
    </section>


    <!-- Introduction -->
    <section class="sermons-introduction">
      <div class="site-container">

        <div class="sermons-introduction__grid">

          <p class="text-kicker">
            The Word of God
          </p>

          <div>
            <h2>
              Listen. Learn.
              <br />
              Grow in Christ.
            </h2>

            <p>
              Explore sermons and messages shared with our church family.
              Listen again, reflect on Scripture, and carry God's Word with
              you throughout the week.
            </p>
          </div>

        </div>

      </div>
    </section>


    <!-- Admin fallback notice -->
    <section
      v-if="usingFallbackData && isAdmin"
      class="sermons-notice-section"
    >
      <div class="site-container">

        <div class="sermons-notice">

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
            Showing demonstration sermons because the sermons API returned
            no content or could not be reached.
          </p>

        </div>

      </div>
    </section>

<!-- Featured / Upcoming Sermon -->
<section v-if="featuredSermon" class="featured-sermon-section">
  <div class="container-custom">

    <p class="section-tag mb-4">
      {{ isUpcoming(featuredSermon) ? 'Coming Soon' : 'Featured Message' }}
    </p>

    <div class="featured-sermon-card">
      <!-- Content -->
      <div class="featured-sermon-card__content">

        <span class="featured-sermon-card__category">
          {{ categoryName(featuredSermon) }}
        </span>

        <h2>
          {{ featuredSermon.title }}
        </h2>

        <p
          v-if="featuredSermon.scripture_reference || featuredSermon.scripture"
          class="featured-sermon-card__scripture"
        >
          {{ featuredSermon.scripture_reference || featuredSermon.scripture }}
        </p>

        <div class="featured-sermon-card__meta">
          <span>{{ speakerName(featuredSermon.speaker) }}</span>

          <span
            v-if="featuredSermon.preach_date || featuredSermon.sermon_date || featuredSermon.date"
          >
            {{ fmt(featuredSermon.preach_date || featuredSermon.sermon_date || featuredSermon.date) }}
          </span>
        </div>

        <p
          v-if="featuredSermon.description"
          class="featured-sermon-card__description"
        >
          {{ featuredSermon.description }}
        </p>

        <div class="featured-sermon-card__actions">

          <button
            v-if="featuredSermon.audio_file_url || featuredSermon.audio_file"
            @click="openPlayer(featuredSermon)"
            class="btn-primary"
          >
            Listen Now
          </button>

          <button
            v-if="featuredSermon.video_url"
            @click="openVideo(featuredSermon)"
            class="btn-outline-white"
          >
            Watch Video
          </button>

          <RouterLink
            :to="`/sermons/${featuredSermon.id}`"
            class="featured-sermon-card__details"
          >
            View Details
          </RouterLink>

        </div>

      </div>

      <!-- Media -->
      <div class="featured-sermon-card__media">

        <img
          v-if="getMediaUrl(featuredSermon.thumbnail_url || featuredSermon.thumbnail)"
          :src="getMediaUrl(featuredSermon.thumbnail_url || featuredSermon.thumbnail)"
          :alt="featuredSermon.title"
        />

        <div
          v-else-if="featuredSermon.speaker_photo"
          class="featured-sermon-card__speaker"
        >
          <img
            :src="getMediaUrl(featuredSermon.speaker_photo)"
            :alt="speakerName(featuredSermon.speaker)"
          />
        </div>

        <div
          v-else
          class="featured-sermon-card__placeholder"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <rect x="9" y="3" width="6" height="12" rx="3" />
            <path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8" />
          </svg>
        </div>

        <span
          v-if="featuredSermon.duration || featuredSermon.duration_display"
          class="featured-sermon-card__duration"
        >
          {{ featuredSermon.duration_display || featuredSermon.duration }}
        </span>

        <div
          v-if="featuredDate"
          class="featured-sermon-card__date-badge"
          aria-hidden="true"
        >
          <span class="featured-sermon-card__date-badge-day">
            {{ featuredDate.day }}
          </span>
          <span class="featured-sermon-card__date-badge-month">
            {{ featuredDate.month }}
          </span>
          <span class="featured-sermon-card__date-badge-year">
            {{ featuredDate.year }}
          </span>
        </div>

      </div>

    </div>
  </div>
</section>

<!-- Featured Sermon — loading skeleton -->
<section
  v-else-if="loading"
  class="featured-sermon-section"
>
  <div class="container-custom">

    <p class="section-tag mb-4">
      Featured Message
    </p>

    <div class="featured-sermon-card featured-sermon-card--skeleton">

      <div class="featured-sermon-card__content">
        <span class="featured-skeleton-line featured-skeleton-line--tag"></span>
        <span class="featured-skeleton-line featured-skeleton-line--title-1"></span>
        <span class="featured-skeleton-line featured-skeleton-line--title-2"></span>
        <span class="featured-skeleton-line featured-skeleton-line--scripture"></span>
        <span class="featured-skeleton-line featured-skeleton-line--meta"></span>
        <span class="featured-skeleton-line featured-skeleton-line--desc-1"></span>
        <span class="featured-skeleton-line featured-skeleton-line--desc-2"></span>

        <div class="featured-skeleton-actions">
          <span class="featured-skeleton-btn"></span>
          <span class="featured-skeleton-btn featured-skeleton-btn--outline"></span>
        </div>
      </div>

      <div class="featured-sermon-card__media featured-skeleton-media">
        <div class="featured-sermon-card__date-badge featured-skeleton-badge"></div>
      </div>

    </div>
  </div>
</section>


    <!-- Sermon Library -->
    <section class="sermon-library-section">

      <div class="site-container">

        <!-- Section heading -->
        <div class="sermon-library-heading">

          <div>
            <p class="text-kicker">
              Explore the library
            </p>

            <h2>
              Recent Messages
            </h2>
          </div>

          <p>
            Search for a message by topic, speaker, or category.
          </p>

        </div>


        <!-- Filters -->
        <div class="sermon-filters">

          <!-- Search -->
          <div class="sermon-search">

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
              placeholder="Search sermons, speakers or Scripture"
            />

          </div>


          <!-- Category -->
          <select v-model="filterCategory">

            <option value="">
              All Categories
            </option>

            <option
              v-for="category in categories"
              :key="category.slug || category.id || category"
              :value="category.slug || category"
            >
              {{ category.name || category }}
            </option>

          </select>


          <!-- Speaker -->
          <select v-model="filterSpeaker">

            <option value="">
              All Speakers
            </option>

            <option
              v-for="speaker in speakers"
              :key="speaker.id || speaker"
              :value="speaker.id || speaker"
            >
              {{ speaker.full_name || speaker }}
            </option>

          </select>

        </div>


        <!-- Loading -->
        <div
          v-if="loading"
          class="sermon-grid sermon-grid--loading"
        >

          <div
            v-for="n in 6"
            :key="n"
            class="sermon-skeleton"
          >
            <div class="sermon-skeleton__image"></div>

            <div class="sermon-skeleton__content">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

        </div>


        <!-- Sermon Cards -->
        <div
          v-else-if="sermonGrid.length"
          class="sermon-grid"
        >

          <article
            v-for="sermon in sermonGrid"
            :key="sermon.id"
            class="sermon-card"
          >

            <!-- Image -->
            <button
              type="button"
              class="sermon-card__media"
              @click="openPlayer(sermon)"
            >

              <img
                v-if="
                  getMediaUrl(
                    sermon.thumbnail_url ||
                    sermon.thumbnail
                  )
                "
                :src="
                  getMediaUrl(
                    sermon.thumbnail_url ||
                    sermon.thumbnail
                  )
                "
                :alt="sermon.title"
              />

              <img
                v-else-if="sermon.speaker_photo"
                :src="getMediaUrl(sermon.speaker_photo)"
                :alt="speakerName(sermon.speaker)"
                class="sermon-card__speaker-image"
              />

              <div
                v-else
                class="sermon-card__placeholder"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.4"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 18.5v2.5m-5-8.5v1a5 5 0 0010 0v-1m-5-8a4 4 0 00-4 4v5a4 4 0 008 0v-5a4 4 0 00-4-4z"
                  />
                </svg>
              </div>


              <!-- Status -->
              <span
                v-if="isUpcoming(sermon)"
                class="sermon-card__status"
              >
                Upcoming
              </span>

              <span
                v-else-if="sermon.is_featured || sermon.featured"
                class="sermon-card__status sermon-card__status--featured"
              >
                Featured
              </span>


              <!-- Duration -->
              <span
                v-if="
                  sermon.duration ||
                  sermon.duration_display
                "
                class="sermon-card__duration"
              >
                {{
                  sermon.duration_display ||
                  sermon.duration
                }}
              </span>


              <!-- Play -->
              <span class="sermon-card__play">

                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>

              </span>

            </button>


            <!-- Content -->
            <div class="sermon-card__content">

              <span class="sermon-card__category">
                {{ categoryName(sermon) }}
              </span>

              <h3>
                {{ sermon.title }}
              </h3>

              <p class="sermon-card__speaker">
                {{ speakerName(sermon.speaker) }}
              </p>

              <p
                v-if="
                  sermon.scripture_reference ||
                  sermon.scripture
                "
                class="sermon-card__scripture"
              >
                {{
                  sermon.scripture_reference ||
                  sermon.scripture
                }}
              </p>

              <p class="sermon-card__date">
                {{
                  fmt(
                    sermon.preach_date ||
                    sermon.sermon_date ||
                    sermon.date
                  )
                }}
              </p>


              <!-- Footer -->
              <div class="sermon-card__footer">

                <span class="sermon-card__views">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
                    />
                    <circle cx="12" cy="12" r="2.5" />
                  </svg>

                  {{ viewCount(sermon) }}

                </span>

                <div class="sermon-card__actions">

                  <button
                    type="button"
                    class="sermon-card__listen"
                    @click="openPlayer(sermon)"
                  >
                    Listen
                  </button>

                  <RouterLink
                    :to="`/sermons/${sermon.id}`"
                    class="sermon-card__details"
                  >
                    Details
                  </RouterLink>

                </div>

              </div>

            </div>

          </article>

        </div>


        <!-- Empty -->
        <div
          v-else
          class="sermon-empty"
        >

          <div class="sermon-empty__icon">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.4"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 18.5v2.5m-5-8.5v1a5 5 0 0010 0v-1m-5-8a4 4 0 00-4 4v5a4 4 0 008 0v-5a4 4 0 00-4-4z"
              />
            </svg>

          </div>

          <h3>
            No Sermons Found
          </h3>

          <p>
            Try changing your search or selecting different filters.
          </p>

          <button
            type="button"
            class="btn-outline"
            @click="clearFilters"
          >
            Clear Filters
          </button>

        </div>


        <!-- Pagination -->
        <Pagination
          v-if="!loading && totalPages > 1"
          :current-page="page"
          :total-pages="totalPages"
          @change="goPage"
        />

      </div>

    </section>


    <!-- Audio Player -->
    <Teleport to="body">

      <Transition name="fade">

        <div
          v-if="showPlayer && current"
          class="sermon-modal"
          @click.self="closePlayer"
        >

          <div
            class="sermon-player"
            role="dialog"
            aria-modal="true"
          >

            <button
              type="button"
              class="sermon-modal__close"
              aria-label="Close player"
              @click="closePlayer"
            >
              ×
            </button>


            <div class="sermon-player__image">

              <img
                v-if="
                  getMediaUrl(
                    current.thumbnail_url ||
                    current.thumbnail
                  )
                "
                :src="
                  getMediaUrl(
                    current.thumbnail_url ||
                    current.thumbnail
                  )
                "
                :alt="current.title"
              />

              <div
                v-else
                class="sermon-player__placeholder"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.4"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 18.5v2.5m-5-8.5v1a5 5 0 0010 0v-1m-5-8a4 4 0 00-4 4v5a4 4 0 008 0v-5a4 4 0 00-4-4z"
                  />
                </svg>
              </div>

            </div>


            <div class="sermon-player__content">

              <span class="sermon-card__category">
                {{ categoryName(current) }}
              </span>

              <h3>
                {{ current.title }}
              </h3>

              <p>
                {{ speakerName(current.speaker) }}
              </p>

              <p
                v-if="
                  current.scripture_reference ||
                  current.scripture
                "
                class="sermon-player__scripture"
              >
                {{
                  current.scripture_reference ||
                  current.scripture
                }}
              </p>

              <audio
                v-if="
                  getMediaUrl(
                    current.audio_file_url ||
                    current.audio_file
                  )
                "
                controls
                class="sermon-player__audio"
                :src="
                  getMediaUrl(
                    current.audio_file_url ||
                    current.audio_file
                  )
                "
              ></audio>

              <p
                v-else
                class="sermon-player__unavailable"
              >
                Audio for this message is not available yet.
              </p>


              <div class="sermon-player__actions">

                <a
                  v-if="
                    getMediaUrl(
                      current.audio_file_url ||
                      current.audio_file
                    )
                  "
                  :href="
                    getMediaUrl(
                      current.audio_file_url ||
                      current.audio_file
                    )
                  "
                  download
                  class="btn-outline"
                >
                  Download Audio
                </a>

                <a
                  v-if="
                    getMediaUrl(
                      current.notes_pdf_url ||
                      current.notes_pdf
                    )
                  "
                  :href="
                    getMediaUrl(
                      current.notes_pdf_url ||
                      current.notes_pdf
                    )
                  "
                  target="_blank"
                  rel="noopener"
                  class="btn-outline"
                >
                  View Notes
                </a>

                <RouterLink
                  :to="`/sermons/${current.id}`"
                  class="btn-primary"
                  @click="closePlayer"
                >
                  Full Details
                </RouterLink>

              </div>

            </div>

          </div>

        </div>

      </Transition>

    </Teleport>


    <!-- Video Modal -->
    <Teleport to="body">

      <Transition name="fade">

        <div
          v-if="showVideo && current"
          class="sermon-modal"
          @click.self="closeVideo"
        >

          <div
            class="sermon-video"
            role="dialog"
            aria-modal="true"
          >

            <button
              type="button"
              class="sermon-modal__close"
              aria-label="Close video"
              @click="closeVideo"
            >
              ×
            </button>

            <div class="sermon-video__header">

              <p class="text-kicker">
                Sermon Message
              </p>

              <h3>
                {{ current.title }}
              </h3>

            </div>

            <div
              v-if="embedUrl"
              class="sermon-video__frame"
            >
              <iframe
                :src="embedUrl"
                :title="current.title"
                allowfullscreen
              ></iframe>
            </div>

            <div
              v-else
              class="sermon-video__unavailable"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.4"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                />
                <path d="m10 9 5 3-5 3z" />
              </svg>

              <p>
                Video is not available for this message.
              </p>

            </div>

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
  onMounted,
  watch
} from 'vue'

import { RouterLink } from 'vue-router'

import Pagination from '@/components/common/Pagination.vue'

import { useAuthStore } from '@/stores/auth'
import { sermons as demoSermons } from '@/data/sermons.js'


const API = (
  import.meta.env.VITE_API_BASE_URL ||
  'http://127.0.0.1:8000/api/v1'
).replace(/\/$/, '')

const BASE_URL = API.replace(/\/api\/v\d+$/, '')


const authStore = useAuthStore()

const isAdmin = computed(() => authStore.isAdmin)


const allSermons = ref([])
const categories = ref([])
const speakers = ref([])

const loading = ref(false)
const usingFallbackData = ref(false)

const page = ref(1)
const totalPages = ref(1)

const search = ref('')
const filterCategory = ref('')
const filterSpeaker = ref('')

const showPlayer = ref(false)
const showVideo = ref(false)
const current = ref(null)

const viewCountMap = ref({})


const featuredSermon = computed(() => {
  return (
    allSermons.value.find(
      sermon => sermon.is_featured || sermon.featured
    ) ||
    allSermons.value.find(
      sermon => isUpcoming(sermon)
    ) ||
    allSermons.value[0] ||
    null
  )
})


const featuredDate = computed(() => {
  const sermon = featuredSermon.value

  if (!sermon) return null

  // The badge shows when the sermon was UPLOADED, not the date it was
  // preached — so a creation timestamp is checked first. Field name
  // guesses cover common backend conventions (created_at is the Django
  // REST default); confirm the real field name against the API and
  // trim this list to just that field once known. The preach-date
  // fields at the end are only a fallback so demo content (which has
  // no upload timestamp) still renders a badge during development.
  const raw =
    sermon.created_at ||
    sermon.uploaded_at ||
    sermon.date_uploaded ||
    sermon.upload_date ||
    sermon.created ||
    sermon.preach_date ||
    sermon.sermon_date ||
    sermon.date

  if (!raw) return null

  // Creation timestamps are usually full ISO datetimes already, so
  // only append a synthetic time if the value looks like a bare date
  // (YYYY-MM-DD) with no time component.
  const parsed = /^\d{4}-\d{2}-\d{2}$/.test(raw)
    ? new Date(`${raw}T00:00:00`)
    : new Date(raw)

  if (Number.isNaN(parsed.getTime())) return null

  return {
    day: parsed.getDate(),
    month: parsed.toLocaleDateString('en-GB', { month: 'long' }),
    year: parsed.getFullYear()
  }
})


const sermonGrid = computed(() => {
  if (!featuredSermon.value) {
    return allSermons.value
  }

  return allSermons.value.filter(
    sermon => sermon.id !== featuredSermon.value.id
  )
})


const embedUrl = computed(() => {
  const url = current.value?.video_url

  if (!url) return null

  const youtubeMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?/]+)/
  )

  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`
  }

  const vimeoMatch = url.match(
    /vimeo\.com\/(\d+)/
  )

  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }

  return url
})


function isUpcoming(sermon) {
  const date =
    sermon.preach_date ||
    sermon.sermon_date ||
    sermon.date

  if (!date) return false

  return new Date(date) > new Date()
}


function getMediaUrl(url) {
  if (!url || typeof url !== 'string') {
    return null
  }

  if (url.startsWith('http')) {
    return url
  }

  return `${BASE_URL}${url}`
}


function viewCount(sermon) {
  const extra =
    viewCountMap.value[sermon.id] || 0

  const total =
    (sermon.views_count || sermon.views || 0) + extra

  return total.toLocaleString()
}


async function fetchSermons() {
  loading.value = true

  try {
    const params = new URLSearchParams({
      page: page.value
    })

    if (search.value) {
      params.set('search', search.value)
    }

    if (filterCategory.value) {
      params.set('category', filterCategory.value)
    }

    if (filterSpeaker.value) {
      params.set('speaker', filterSpeaker.value)
    }

    // Give the API a short window to respond — if it's unreachable
    // (no backend deployed, DNS/proxy hang, etc.) don't leave the page
    // stuck on the skeleton forever; fall through to demo data below.
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 6000)

    const response = await fetch(
      `${API}/sermons/?${params}`,
      { signal: controller.signal }
    )

    clearTimeout(timer)

    if (!response.ok) {
      throw new Error('Unable to load sermons')
    }

    const data = await response.json()

    const list =
      data.results ??
      (Array.isArray(data) ? data : [])

    if (list.length) {
      allSermons.value = list

      totalPages.value = data.count
        ? Math.ceil(data.count / 12)
        : 1

      usingFallbackData.value = false
    } else {
      // Backend is alive but has nothing uploaded yet (e.g. admin
      // hasn't added sermons) — fall back to demo content so the
      // page still shows the intended layout.
      useDemoSermons()
    }
  } catch (error) {
    // Backend unreachable or timed out — use demo content instead.
    console.warn(
      'Sermons API unavailable, showing demo content:',
      error
    )

    useDemoSermons()
  } finally {
    loading.value = false
  }
}


function useDemoSermons() {
  const noActiveFilters =
    !search.value &&
    !filterCategory.value &&
    !filterSpeaker.value

  allSermons.value = noActiveFilters
    ? demoSermons
    : filterDemoSermons()

  totalPages.value = 1
  usingFallbackData.value = true
}



// Client-side search/category/speaker matching over the demo set, used
// whenever the real API can't be reached — keeps filtering functional
// even with zero backend connectivity.
function filterDemoSermons() {
  const q = search.value.trim().toLowerCase()

  return demoSermons.filter(sermon => {
    const matchesSearch =
      !q ||
      sermon.title.toLowerCase().includes(q) ||
      (sermon.description || '').toLowerCase().includes(q) ||
      speakerName(sermon.speaker).toLowerCase().includes(q) ||
      (sermon.scripture_reference || sermon.scripture || '').toLowerCase().includes(q)

    const matchesCategory =
      !filterCategory.value ||
      categoryName(sermon).toLowerCase() === filterCategory.value.toLowerCase() ||
      (sermon.topic || '').toLowerCase() === filterCategory.value.toLowerCase()

    const matchesSpeaker =
      !filterSpeaker.value ||
      speakerName(sermon.speaker) === filterSpeaker.value

    return matchesSearch && matchesCategory && matchesSpeaker
  })
}


// Categories/speakers derived from the demo set — used whenever the API
// is unreachable so the filter dropdowns are never empty.
const demoCategoryNames = [
  ...new Set(demoSermons.map(s => s.topic).filter(Boolean))
]
const demoSpeakerNames = [
  ...new Set(demoSermons.map(s => speakerName(s.speaker)).filter(Boolean))
]

async function fetchCategories() {
  categories.value = demoCategoryNames

  try {
    const response = await fetch(
      `${API}/sermons/categories/`
    )

    if (!response.ok) return

    const data = await response.json()

    const list = data.results ?? data ?? []

    if (Array.isArray(list) && list.length) {
      categories.value = list
    }
  } catch {
    // Demo categories set above already cover this.
  }
}


async function fetchSpeakers() {
  speakers.value = demoSpeakerNames

  try {
    const response = await fetch(
      `${API}/sermons/speakers/`
    )

    if (!response.ok) return

    const data = await response.json()

    const list = data.results ?? data ?? []

    if (Array.isArray(list) && list.length) {
      speakers.value = list
    }
  } catch {
    // Demo speakers set above already cover this.
  }
}


function goPage(newPage) {
  if (
    newPage < 1 ||
    newPage > totalPages.value ||
    newPage === page.value
  ) {
    return
  }

  page.value = newPage

  fetchSermons()

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}


function clearFilters() {
  search.value = ''
  filterCategory.value = ''
  filterSpeaker.value = ''
  page.value = 1

  fetchSermons()
}


function openPlayer(sermon) {
  current.value = sermon
  showPlayer.value = true

  viewCountMap.value[sermon.id] =
    (viewCountMap.value[sermon.id] || 0) + 1

  fetch(
    `${API}/sermons/${sermon.id}/view/`,
    {
      method: 'POST'
    }
  ).catch(() => {})
}


function closePlayer() {
  showPlayer.value = false
}


function openVideo(sermon) {
  current.value = sermon
  showVideo.value = true
}


function closeVideo() {
  showVideo.value = false
}


function speakerName(speaker) {
  if (!speaker) return ''

  if (typeof speaker === 'object') {
    return (
      speaker.full_name ||
      `${speaker.first_name || ''} ${speaker.last_name || ''}`.trim()
    )
  }

  return speaker
}


function categoryName(sermon) {
  if (!sermon) return 'General'

  if (sermon.category_display) {
    return sermon.category_display
  }

  if (
    sermon.category &&
    typeof sermon.category === 'object'
  ) {
    return sermon.category.name
  }

  return (
    sermon.topic ||
    sermon.category ||
    'General'
  )
}


function fmt(date) {
  if (!date) return ''

  return new Date(
    `${date}T00:00:00`
  ).toLocaleDateString(
    'en-GB',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  )
}


onMounted(() => {
  fetchSermons()
  fetchCategories()
  fetchSpeakers()
})


let debounce = null

watch(search, () => {
  clearTimeout(debounce)

  debounce = setTimeout(() => {
    page.value = 1
    fetchSermons()
  }, 400)
})


watch(
  [filterCategory, filterSpeaker],
  () => {
    page.value = 1
    fetchSermons()
  }
)
</script>


<style scoped>
/* =========================================================
   PAGE
========================================================= */

.sermons-page {
  background: #f5f4f0;
  color: var(--color-navy-deep, #0d2137);
}


/* =========================================================
   INTRODUCTION
========================================================= */

.sermons-introduction {
  padding: clamp(3rem, 6vw, 5rem) 0;
  background: var(--color-white, #ffffff);
}

.sermons-introduction__grid {
  display: grid;
  grid-template-columns:
    minmax(140px, 0.32fr)
    minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;
}

.sermons-introduction__grid h2 {
  max-width: 620px;
  margin: 0;

  font-family:
    var(
      --font-heading,
      'Cormorant Garamond',
      Georgia,
      serif
    );

  font-size: clamp(2rem, 3.4vw, 3.1rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;

  color: var(--color-navy-deep, #0d2137);
}

.sermons-introduction__grid p:not(.text-kicker) {
  max-width: 570px;
  margin: 1.25rem 0 0;

  color: rgba(13, 33, 55, 0.65);

  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  line-height: 1.8;
}


/* =========================================================
   ADMIN NOTICE
========================================================= */

.sermons-notice-section {
  padding-top: 1.5rem;
  background: #ffffff;
}

.sermons-notice {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;

  padding: 1rem 1.1rem;

  border-left: 3px solid var(--color-gold, #c9a227);
  background: #fbf8ec;

  color: rgba(13, 33, 55, 0.75);
  font-size: 0.88rem;
  line-height: 1.6;
}

.sermons-notice svg {
  width: 19px;
  height: 19px;
  flex-shrink: 0;
  color: var(--color-gold, #c9a227);
}


/* =========================================================
   FEATURED SERMON
========================================================= */

.featured-sermon-section {
  padding: 3.5rem 0 4rem;
  background: linear-gradient(180deg, #faf7ee 0%, #f6f0df 100%);
  border-top: 1px solid rgba(201, 162, 39, 0.18);
  border-bottom: 1px solid rgba(201, 162, 39, 0.18);
}

.featured-sermon-card__date-badge {
  position: absolute;
  left: 1.1rem;
  bottom: 1.1rem;
  z-index: 5;

  width: 96px;
  height: 96px;
  border-radius: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.05rem;

  background: var(--color-navy-deep, #0d2137);
  border: 3px solid var(--color-white, #ffffff);

  box-shadow: 0 12px 28px rgba(13, 33, 55, 0.4);

  transition:
    transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1),
    box-shadow 0.4s ease;
}

.featured-sermon-card:hover .featured-sermon-card__date-badge {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 18px 36px rgba(13, 33, 55, 0.48);
}

.featured-sermon-card__date-badge-day {
  color: #ffffff;

  font-family:
    var(
      --font-heading,
      'Cormorant Garamond',
      Georgia,
      serif
    );

  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1;
}

.featured-sermon-card__date-badge-month {
  color: var(--color-gold, #f4d03f);

  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.featured-sermon-card__date-badge-year {
  color: rgba(255, 255, 255, 0.6);

  font-size: 0.66rem;
  font-weight: 500;
}

.featured-sermon-card {
  position: relative;

  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
  min-height: 310px;

  overflow: hidden;

  background: var(--color-navy-deep, #0d2137);
  border-radius: 16px;
  border: 1px solid transparent;

  box-shadow: 0 12px 35px rgba(13, 33, 55, 0.12);

  transition:
    transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1),
    box-shadow 0.45s ease,
    border-color 0.45s ease;
}

/* Thin gold accent line that grows outward from center on hover */
.featured-sermon-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 6;

  width: 0;
  height: 3px;

  background: linear-gradient(
    90deg,
    transparent,
    var(--color-gold, #f4d03f),
    transparent
  );

  transform: translateX(-50%);
  transition: width 0.55s cubic-bezier(0.2, 0.7, 0.2, 1);

  pointer-events: none;
}

.featured-sermon-card:hover {
  transform: translateY(-8px);
  border-color: rgba(244, 208, 63, 0.4);
  box-shadow:
    0 28px 60px rgba(13, 33, 55, 0.28),
    0 0 0 1px rgba(244, 208, 63, 0.12);
}

.featured-sermon-card:hover::before {
  width: 100%;
}

/* LEFT CONTENT */

.featured-sermon-card__content {
  padding: clamp(1.5rem, 3vw, 2.5rem);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.featured-sermon-card__category {
  display: inline-flex;
  align-items: center;

  margin-bottom: 0.85rem;

  color: var(--color-gold, #f4d03f);

  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  line-height: 1.4;
  text-transform: uppercase;
}

.featured-sermon-card__content h2 {
  max-width: 520px;

  margin: 0;

  color: var(--color-white, #ffffff);

  font-family: var(
    --font-heading,
    "Cormorant Garamond",
    Georgia,
    serif
  );

  font-size: clamp(1.65rem, 2.5vw, 2.35rem);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.025em;
}

.featured-sermon-card__scripture {
  margin: 0.75rem 0 0;

  color: var(--color-gold, #f4d03f);

  font-size: 0.9rem;
  font-style: italic;
  font-weight: 600;
}

.featured-sermon-card__meta {
  display: flex;
  flex-wrap: wrap;

  gap: 0.5rem 1.25rem;

  margin-top: 1rem;

  color: rgba(255, 255, 255, 0.65);

  font-size: 0.8rem;
  line-height: 1.5;
}

.featured-sermon-card__meta span + span::before {
  content: "•";

  margin-right: 1.25rem;

  color: var(--color-gold, #f4d03f);
}

.featured-sermon-card__description {
  max-width: 600px;

  margin: 1rem 0 0;

  color: rgba(255, 255, 255, 0.72);

  font-size: 0.9rem;
  line-height: 1.7;
}

/* Prevent the featured card from becoming too tall */
.featured-sermon-card__description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;

  -webkit-line-clamp: 3;
  line-clamp: 3;
}

.featured-sermon-card__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  gap: 0.75rem;

  margin-top: 1.5rem;
}

/* RIGHT MEDIA */

.featured-sermon-card__media {
  position: relative;

  min-height: 310px;

  overflow: hidden;

  background:
    linear-gradient(
      135deg,
      rgba(21, 50, 78, 0.96),
      rgba(13, 33, 55, 1)
    );
}

.featured-sermon-card__media > img {
  width: 100%;
  height: 100%;

  position: absolute;
  inset: 0;

  object-fit: cover;

  opacity: 0.68;

  transition:
    transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1),
    opacity 0.45s ease;
}

.featured-sermon-card:hover .featured-sermon-card__media > img {
  transform: scale(1.06);
  opacity: 0.52;
}

/*
 * Slide-up color fill on the image area only, same technique as
 * the ministry/sermon cards. This card had no hover state at all
 * before, so the trigger below is new; everything else (content,
 * layout) is untouched. Explicit z-index here because the photo,
 * overlay, speaker circle/placeholder and duration badge all need
 * a clear order: photo < wash < overlay < speaker/placeholder <
 * duration.
 */
.featured-sermon-card__media::before {
  content: "";

  position: absolute;
  inset: 0;

  z-index: 1;

  background:
    linear-gradient(
      160deg,
      rgba(21, 50, 78, 0.85),
      rgba(13, 33, 55, 0.92)
    );

  transform: translateY(100%);

  transition:
    transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);

  pointer-events: none;
}

.featured-sermon-card:hover .featured-sermon-card__media::before {
  transform: translateY(0);
}

.featured-sermon-card__media::after {
  content: "";

  position: absolute;
  inset: 0;

  z-index: 2;

  background: linear-gradient(
    90deg,
    rgba(13, 33, 55, 0.35),
    rgba(13, 33, 55, 0.05)
  );

  pointer-events: none;
}

.featured-sermon-card__speaker {
  position: absolute;
  inset: 0;

  z-index: 3;

  display: flex;
  align-items: center;
  justify-content: center;
}

.featured-sermon-card__speaker img {
  width: 105px;
  height: 105px;

  border: 3px solid rgba(244, 208, 63, 0.55);
  border-radius: 50%;

  object-fit: cover;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  transition: transform 0.4s ease, border-color 0.4s ease;
}

.featured-sermon-card:hover .featured-sermon-card__speaker img {
  transform: scale(1.06);
  border-color: rgba(244, 208, 63, 0.85);
}

.featured-sermon-card__placeholder {
  position: absolute;
  inset: 0;

  z-index: 3;

  display: flex;
  align-items: center;
  justify-content: center;

  color: rgba(255, 255, 255, 0.12);
}

.featured-sermon-card__placeholder svg {
  width: 70px;
  height: 70px;
}

.featured-sermon-card__duration {
  position: absolute;
  right: 1rem;
  top: 1rem;

  z-index: 4;

  padding: 0.45rem 0.7rem;

  background: rgba(8, 24, 40, 0.85);

  color: rgba(255, 255, 255, 0.85);

  font-size: 0.78rem;
  font-weight: 700;

  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* DETAILS LINK */

.featured-sermon-card__details {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;

  padding-bottom: 0.2rem;

  color: var(--color-white, #ffffff);

  font-size: 0.82rem;
  font-weight: 600;

  text-decoration: none;

  border-bottom: 1px solid rgba(255, 255, 255, 0.3);

  transition:
    color 0.2s ease,
    border-color 0.2s ease;
}

.featured-sermon-card__details::after {
  content: "\2192";
  transition: transform 0.25s ease;
}

.featured-sermon-card__details:hover {
  color: var(--color-gold, #f4d03f);
  border-color: var(--color-gold, #f4d03f);
}

.featured-sermon-card__details:hover::after {
  transform: translateX(4px);
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 760px) {
  .featured-sermon-section {
    padding: 2rem 0 2.5rem;
  }

  .featured-sermon-card {
    grid-template-columns: 1fr;
  }

  .featured-sermon-card__content {
    padding: 1.5rem;
  }

  .featured-sermon-card__content h2 {
    font-size: 1.8rem;
  }

  .featured-sermon-card__media {
    min-height: 220px;
    order: -1;
  }

  .featured-sermon-card__description {
    font-size: 0.88rem;
  }

  .featured-sermon-card__date-badge {
    width: 74px;
    height: 74px;
    left: 0.9rem;
    bottom: 0.9rem;
    border-width: 2px;
  }

  .featured-sermon-card__date-badge-day {
    font-size: 1.4rem;
  }

  .featured-sermon-card__date-badge-month {
    font-size: 0.58rem;
  }

  .featured-sermon-card__date-badge-year {
    font-size: 0.54rem;
  }
}

/* =========================================================
   LIBRARY
========================================================= */

.sermon-library-section {
  padding: clamp(4rem, 7vw, 6.5rem) 0;
  background:
    radial-gradient(
      circle,
      rgba(13, 33, 55, 0.045) 1px,
      transparent 1px
    )
    0 0 / 24px 24px,
    #f5f4f0;
}

.sermon-library-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;

  margin-bottom: 2rem;
}

.sermon-library-heading h2 {
  margin: 0.65rem 0 0;

  font-family:
    var(
      --font-heading,
      'Cormorant Garamond',
      Georgia,
      serif
    );

  font-size: clamp(2rem, 3vw, 2.8rem);
  line-height: 1.1;

  color: var(--color-navy-deep, #0d2137);
}

.sermon-library-heading h2::before {
  content: "";
  display: block;
  width: 46px;
  height: 3px;
  margin-bottom: 0.9rem;
  background: var(--color-gold, #c9a227);
}

.sermon-library-heading > p {
  max-width: 350px;
  margin: 0;

  color: rgba(13, 33, 55, 0.6);

  font-size: 0.92rem;
  line-height: 1.7;
}


/* =========================================================
   FILTERS
========================================================= */

.sermon-filters {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) 180px 180px;
  gap: 0.8rem;

  margin-bottom: 2.5rem;
}

.sermon-search {
  position: relative;
}

.sermon-search svg {
  position: absolute;
  left: 1rem;
  top: 50%;

  width: 17px;
  height: 17px;

  transform: translateY(-50%);

  color: rgba(13, 33, 55, 0.45);

  pointer-events: none;
}

.sermon-search input,
.sermon-filters select {
  width: 100%;
  min-height: 48px;

  border: 1px solid rgba(13, 33, 55, 0.12);
  border-radius: 0;

  outline: none;

  background: #ffffff;

  color: var(--color-navy-deep, #0d2137);

  font-family: inherit;
  font-size: 0.86rem;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.sermon-search input {
  padding: 0 1rem 0 2.9rem;
}

.sermon-filters select {
  padding: 0 1rem;
}

.sermon-search input:focus,
.sermon-filters select:focus {
  border-color: var(--color-gold, #c9a227);

  box-shadow:
    0 0 0 3px
    rgba(201, 162, 39, 0.12);
}


/* =========================================================
   SERMON GRID
========================================================= */

.sermon-grid {
  display: grid;
  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: clamp(1.2rem, 2vw, 1.75rem);
}

.sermon-card {
  display: flex;
  flex-direction: column;

  overflow: hidden;

  border: 1px solid rgba(13, 33, 55, 0.1);

  background: #ffffff;

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.sermon-card:hover {
  transform: translateY(-5px);

  border-color: rgba(201, 162, 39, 0.45);

  box-shadow:
    0 18px 45px
    rgba(13, 33, 55, 0.1);
}


/* =========================================================
   CARD MEDIA
========================================================= */

.sermon-card__media {
  position: relative;

  width: 100%;
  height: 220px;

  border: 0;
  padding: 0;

  overflow: hidden;

  background:
    linear-gradient(
      135deg,
      #132f4c,
      #0d2137
    );

  cursor: pointer;
}

.sermon-card__media > img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  transition:
    transform 0.45s ease,
    filter 0.45s ease;
}

.sermon-card:hover .sermon-card__media > img {
  transform: scale(1.06);
  filter: brightness(0.85);
}

/*
 * Slide-up color fill on the image area only, same technique as
 * the ministry cards: a full-size layer starts translated below
 * the box and slides up to cover it on hover. No z-index needed —
 * as a generated ::before it naturally paints below the existing
 * ::after overlay and below the badges/play button.
 */
.sermon-card__media::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      160deg,
      rgba(21, 50, 78, 0.85),
      rgba(13, 33, 55, 0.92)
    );
  transform: translateY(100%);
  transition:
    transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
  pointer-events: none;
}

.sermon-card:hover .sermon-card__media::before {
  transform: translateY(0);
}

.sermon-card__placeholder {
  width: 100%;
  height: 100%;

  display: grid;
  place-items: center;

  color: rgba(255, 255, 255, 0.18);
}

.sermon-card__placeholder svg {
  width: 72px;
  height: 72px;
}

.sermon-card__speaker-image {
  object-fit: cover;
}

.sermon-card__media::after {
  content: "";

  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      180deg,
      rgba(13, 33, 55, 0.05),
      rgba(13, 33, 55, 0.45)
    );

  pointer-events: none;
}

.sermon-card__status {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 2;

  padding: 0.4rem 0.7rem;

  background: var(--color-gold, #c9a227);

  color: var(--color-navy-deep, #0d2137);

  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.sermon-card__status--featured {
  background: #ffffff;
}

.sermon-card__duration {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  z-index: 2;

  padding: 0.35rem 0.6rem;

  background: rgba(13, 33, 55, 0.88);

  color: #ffffff;

  font-size: 0.68rem;
  font-weight: 600;
}

.sermon-card__play {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 3;

  width: 52px;
  height: 52px;

  display: grid;
  place-items: center;

  transform:
    translate(-50%, -50%)
    scale(0.85);

  opacity: 0;

  border-radius: 50%;

  background: var(--color-gold, #c9a227);

  color: var(--color-navy-deep, #0d2137);

  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.sermon-card__play svg {
  width: 19px;
  height: 19px;

  margin-left: 2px;
}

.sermon-card:hover .sermon-card__play {
  opacity: 1;

  transform:
    translate(-50%, -50%)
    scale(1);
}


/* =========================================================
   CARD CONTENT
========================================================= */

.sermon-card__content {
  display: flex;
  flex-direction: column;
  flex: 1;

  padding: 1.35rem;
}

.sermon-card__category {
  display: inline-block;

  width: fit-content;

  margin-bottom: 0.85rem;

  color: var(--color-gold, #a67c00);

  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.sermon-card h3 {
  margin: 0;

  color: var(--color-navy-deep, #0d2137);

  font-size: 1rem;
  font-weight: 700;
  line-height: 1.45;

  display: -webkit-box;
  overflow: hidden;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.sermon-card__speaker {
  margin: 0.8rem 0 0;

  color: rgba(13, 33, 55, 0.65);

  font-size: 0.82rem;
}

.sermon-card__scripture {
  margin: 0.45rem 0 0;

  color: var(--color-gold, #a67c00);

  font-size: 0.78rem;
  font-style: italic;
  line-height: 1.5;
}

.sermon-card__date {
  margin: 0.6rem 0 1.2rem;

  color: rgba(13, 33, 55, 0.45);

  font-size: 0.72rem;
}


/* =========================================================
   CARD FOOTER
========================================================= */

.sermon-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  margin-top: auto;
  padding-top: 1rem;

  border-top:
    1px solid rgba(13, 33, 55, 0.08);
}

.sermon-card__views {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;

  color: rgba(13, 33, 55, 0.45);

  font-size: 0.72rem;
}

.sermon-card__views svg {
  width: 15px;
  height: 15px;
}

.sermon-card__actions {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.sermon-card__listen,
.sermon-card__details {
  min-height: 34px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0 0.75rem;

  border: 1px solid transparent;

  font-family: inherit;
  font-size: 0.7rem;
  font-weight: 700;

  cursor: pointer;
  text-decoration: none;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.sermon-card__listen {
  background: var(--color-navy-deep, #0d2137);

  color: #ffffff;
}

.sermon-card__listen:hover {
  background: var(--color-gold, #c9a227);

  color: var(--color-navy-deep, #0d2137);
}

.sermon-card__details {
  border-color: rgba(13, 33, 55, 0.15);

  color: var(--color-navy-deep, #0d2137);
}

.sermon-card__details:hover {
  border-color: var(--color-gold, #c9a227);

  color: var(--color-gold, #a67c00);
}


/* =========================================================
   BUTTONS
========================================================= */

.btn-primary {
  min-height: 46px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;

  padding: 0 1.15rem;

  border: 1px solid var(--color-gold, #c9a227);

  background: var(--color-gold, #c9a227);

  color: var(--color-navy-deep, #0d2137);

  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 700;

  cursor: pointer;
  text-decoration: none;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.btn-primary:hover {
  background: #b9901d;
  border-color: #b9901d;

  transform: translateY(-1px);
}

.btn-primary svg {
  width: 15px;
  height: 15px;
}

.btn-featured-secondary,
.btn-outline {
  min-height: 46px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0 1.15rem;

  border: 1px solid rgba(13, 33, 55, 0.18);

  background: transparent;

  color: var(--color-navy-deep, #0d2137);

  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;

  cursor: pointer;
  text-decoration: none;

  transition:
    border-color 0.2s ease,
    color 0.2s ease,
    background 0.2s ease;
}

.btn-featured-secondary {
  border-color: rgba(255, 255, 255, 0.35);

  color: #ffffff;
}

.btn-featured-secondary:hover {
  border-color: var(--color-gold, #c9a227);

  color: var(--color-gold, #c9a227);
}

.btn-outline:hover {
  border-color: var(--color-gold, #c9a227);

  color: var(--color-gold, #a67c00);
}

.featured-sermon__details {
  padding-bottom: 3px;

  border-bottom:
    1px solid rgba(255, 255, 255, 0.35);

  color: #ffffff;

  font-size: 0.8rem;
  font-weight: 600;

  text-decoration: none;

  transition:
    color 0.2s ease,
    border-color 0.2s ease;
}

.featured-sermon__details:hover {
  border-color: var(--color-gold, #c9a227);

  color: var(--color-gold, #c9a227);
}


/* =========================================================
   LOADING
========================================================= */

.sermon-skeleton {
  overflow: hidden;

  border:
    1px solid rgba(13, 33, 55, 0.08);

  background: #ffffff;
}

.sermon-skeleton__image {
  height: 220px;

  background:
    linear-gradient(
      90deg,
      #eceae4 25%,
      #f5f3ed 50%,
      #eceae4 75%
    );

  background-size: 200% 100%;

  animation: shimmer 1.5s infinite;
}

.sermon-skeleton__content {
  padding: 1.35rem;
}

.sermon-skeleton__content span {
  display: block;
  height: 12px;

  margin-bottom: 0.8rem;

  background:
    linear-gradient(
      90deg,
      #eceae4 25%,
      #f5f3ed 50%,
      #eceae4 75%
    );

  background-size: 200% 100%;

  animation: shimmer 1.5s infinite;
}

.sermon-skeleton__content span:nth-child(1) {
  width: 35%;
}

.sermon-skeleton__content span:nth-child(2) {
  width: 85%;
  height: 17px;
}

.sermon-skeleton__content span:nth-child(3) {
  width: 55%;
}

@keyframes shimmer {
  to {
    background-position: -200% 0;
  }
}


/* =========================================================
   FEATURED SKELETON
========================================================= */

.featured-sermon-card--skeleton {
  box-shadow: 0 12px 35px rgba(13, 33, 55, 0.12);
}

.featured-sermon-card--skeleton:hover {
  transform: none;
  box-shadow: 0 12px 35px rgba(13, 33, 55, 0.12);
}

.featured-skeleton-line {
  display: block;

  height: 12px;
  margin-bottom: 0.85rem;

  border-radius: 2px;

  background:
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.08) 25%,
      rgba(255, 255, 255, 0.16) 50%,
      rgba(255, 255, 255, 0.08) 75%
    );

  background-size: 200% 100%;

  animation: shimmer 1.5s infinite;
}

.featured-skeleton-line--tag {
  width: 30%;
  height: 10px;
  margin-bottom: 1.1rem;
}

.featured-skeleton-line--title-1 {
  width: 88%;
  height: 26px;
}

.featured-skeleton-line--title-2 {
  width: 62%;
  height: 26px;
  margin-bottom: 1.1rem;
}

.featured-skeleton-line--scripture {
  width: 40%;
  margin-bottom: 1.3rem;
}

.featured-skeleton-line--meta {
  width: 50%;
  margin-bottom: 1.3rem;
}

.featured-skeleton-line--desc-1 {
  width: 95%;
}

.featured-skeleton-line--desc-2 {
  width: 70%;
  margin-bottom: 1.6rem;
}

.featured-skeleton-actions {
  display: flex;
  gap: 0.75rem;
}

.featured-skeleton-btn {
  width: 140px;
  height: 44px;

  background:
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.08) 25%,
      rgba(255, 255, 255, 0.16) 50%,
      rgba(255, 255, 255, 0.08) 75%
    );

  background-size: 200% 100%;

  animation: shimmer 1.5s infinite;
}

.featured-skeleton-btn--outline {
  width: 130px;
}

.featured-skeleton-media {
  background:
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.05) 25%,
      rgba(255, 255, 255, 0.12) 50%,
      rgba(255, 255, 255, 0.05) 75%
    );

  background-size: 200% 100%;

  animation: shimmer 1.8s infinite;
}

.featured-skeleton-badge {
  background:
    linear-gradient(
      90deg,
      #16375a 25%,
      #1d4670 50%,
      #16375a 75%
    );

  background-size: 200% 100%;

  animation: shimmer 1.8s infinite;
}


/* =========================================================
   EMPTY
========================================================= */

.sermon-empty {
  padding: 5rem 1rem;

  text-align: center;
}

.sermon-empty__icon {
  width: 72px;
  height: 72px;

  display: grid;
  place-items: center;

  margin: 0 auto 1.5rem;

  border-radius: 50%;

  background: rgba(201, 162, 39, 0.1);

  color: var(--color-gold, #c9a227);
}

.sermon-empty__icon svg {
  width: 36px;
  height: 36px;
}

.sermon-empty h3 {
  margin: 0;

  color: var(--color-navy-deep, #0d2137);

  font-size: 1.25rem;
}

.sermon-empty p {
  margin: 0.7rem 0 1.5rem;

  color: rgba(13, 33, 55, 0.55);

  font-size: 0.9rem;
}


/* =========================================================
   MODALS
========================================================= */

.sermon-modal {
  position: fixed;
  inset: 0;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1.25rem;

  background: rgba(8, 20, 34, 0.78);
  backdrop-filter: blur(8px);
}

.sermon-player,
.sermon-video {
  position: relative;

  width: min(100%, 720px);
  max-height: calc(100vh - 2.5rem);

  overflow: auto;

  background: #ffffff;

  box-shadow:
    0 30px 80px
    rgba(0, 0, 0, 0.3);
}

.sermon-modal__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 5;

  width: 38px;
  height: 38px;

  display: grid;
  place-items: center;

  border: 0;
  border-radius: 50%;

  background: rgba(13, 33, 55, 0.9);

  color: #ffffff;

  font-size: 1.25rem;
  line-height: 1;

  cursor: pointer;
}

.sermon-player__image {
  height: 230px;

  background:
    linear-gradient(
      135deg,
      #132f4c,
      #0d2137
    );
}

.sermon-player__image img {
  width: 100%;
  height: 100%;

  object-fit: cover;
}

.sermon-player__placeholder {
  width: 100%;
  height: 100%;

  display: grid;
  place-items: center;

  color: rgba(255, 255, 255, 0.15);
}

.sermon-player__placeholder svg {
  width: 80px;
  height: 80px;
}

.sermon-player__content {
  padding: clamp(1.5rem, 4vw, 2.5rem);
}

.sermon-player__content h3 {
  margin: 0;

  color: var(--color-navy-deep, #0d2137);

  font-family:
    var(
      --font-heading,
      'Cormorant Garamond',
      Georgia,
      serif
    );

  font-size: clamp(1.6rem, 3vw, 2.2rem);
  line-height: 1.15;
}

.sermon-player__content > p:not(.sermon-player__scripture):not(.sermon-player__unavailable) {
  margin: 0.55rem 0 0;

  color: rgba(13, 33, 55, 0.6);

  font-size: 0.88rem;
}

.sermon-player__scripture {
  margin: 0.65rem 0 1.5rem;

  color: var(--color-gold, #a67c00);

  font-size: 0.88rem;
  font-style: italic;
}

.sermon-player__audio {
  width: 100%;

  margin: 1rem 0 1.5rem;
}

.sermon-player__unavailable {
  padding: 1rem;

  margin: 1.5rem 0;

  background: #f5f4f0;

  color: rgba(13, 33, 55, 0.55);

  font-size: 0.85rem;
}

.sermon-player__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.sermon-video {
  max-width: 900px;

  padding: clamp(1.5rem, 4vw, 2.5rem);
}

.sermon-video__header {
  padding-right: 3rem;

  margin-bottom: 1.5rem;
}

.sermon-video__header h3 {
  margin: 0.65rem 0 0;

  color: var(--color-navy-deep, #0d2137);

  font-size: 1.3rem;
  line-height: 1.4;
}

.sermon-video__frame {
  position: relative;

  width: 100%;
  aspect-ratio: 16 / 9;

  background: var(--color-navy-deep, #0d2137);
}

.sermon-video__frame iframe {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  border: 0;
}

.sermon-video__unavailable {
  min-height: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  background: #f5f4f0;

  color: rgba(13, 33, 55, 0.5);

  text-align: center;
}

.sermon-video__unavailable svg {
  width: 55px;
  height: 55px;
}


/* =========================================================
   TRANSITION
========================================================= */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 1000px) {
  .featured-sermon {
    grid-template-columns: 1fr;
  }

  .featured-sermon__media {
    min-height: 360px;
    order: -1;
  }

  .sermon-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .sermon-filters {
    grid-template-columns: 1fr 1fr;
  }

  .sermon-search {
    grid-column: 1 / -1;
  }
}

@media (max-width: 800px) {
  .sermons-introduction__grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .sermon-library-heading {
    display: block;
  }

  .sermon-library-heading > p {
    margin-top: 1rem;
  }
}

@media (max-width: 640px) {
  .sermons-introduction {
    padding: 3.5rem 0;
  }

  .featured-sermon__media {
    min-height: 280px;
  }

  .sermon-grid {
    grid-template-columns: 1fr;
  }

  .sermon-filters {
    grid-template-columns: 1fr;
  }

  .sermon-search {
    grid-column: auto;
  }

  .sermon-card__media {
    height: 230px;
  }

  .sermon-card__footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .featured-sermon__actions {
    align-items: stretch;
  }

  .featured-sermon__actions .btn-primary,
  .featured-sermon__actions .btn-featured-secondary {
    width: 100%;
  }

  .featured-sermon__details {
    width: fit-content;
  }

  .sermon-player__actions {
    flex-direction: column;
  }

  .sermon-player__actions .btn-primary,
  .sermon-player__actions .btn-outline {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>