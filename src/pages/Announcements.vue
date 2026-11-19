<template>
  <div class="min-h-screen bg-gray-50 dark:bg-navy-950">
    <div class="page-hero">
      <div class="page-hero__inner">
        <div class="container-custom text-center">
          <p class="section-tag text-blue-400 mb-3">Church Updates</p>
          <h1 class="font-heading text-3xl md:text-4xl font-bold text-white mb-3">Announcements</h1>
          <div class="divider-blue-center mb-3"></div>
          <p class="text-blue-200 max-w-2xl mx-auto">
            Stay informed about the latest news, meetings, ministry updates, and important notices from Golani SDA Church.
          </p>
        </div>
      </div>
    </div>

    <section class="section bg-gray-50 dark:bg-navy-950">
      <div class="container-custom">
        <div class="max-w-6xl mx-auto">
          <!-- Search and filters -->
          <div class="announcement-toolbar mb-8">
            <div class="announcement-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7"></circle>
                <path stroke-linecap="round" d="m20 20-4-4"></path>
              </svg>
              <input
                v-model="search"
                type="search"
                placeholder="Search announcements..."
                aria-label="Search announcements"
              />
            </div>

            <select v-model="category" class="announcement-select" aria-label="Filter announcements by category">
              <option v-for="item in categories" :key="item" :value="item">
                {{ item === 'All' ? 'All Categories' : item }}
              </option>
            </select>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="n in 6" :key="n" class="announcement-skeleton animate-pulse">
              <div class="h-44 bg-gray-200 dark:bg-navy-700"></div>
              <div class="p-5 space-y-3">
                <div class="h-3 bg-gray-200 dark:bg-navy-700 rounded w-1/3"></div>
                <div class="h-5 bg-gray-200 dark:bg-navy-700 rounded w-5/6"></div>
                <div class="h-4 bg-gray-200 dark:bg-navy-700 rounded w-2/3"></div>
              </div>
            </div>
          </div>

          <!-- Announcements -->
          <div v-else-if="filteredAnnouncements.length" class="announcements-grid">
            <AnnouncementCard
              v-for="item in filteredAnnouncements"
              :key="item.id"
              :announcement="item"
              :link-to="`/announcements/${item.id}`"
              :pdf-url="getPdfUrl(item)"
            />
          </div>

          <!-- Empty -->
          <div v-else class="text-center py-20">
            <div class="text-5xl mb-5">📢</div>
            <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white mb-2">
              No Announcements Found
            </h2>
            <p class="text-gray-500 dark:text-gray-400 mb-6">
              Try a different search term or category.
            </p>
            <button type="button" class="btn-outline" @click="clearFilters">
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import AnnouncementCard from '@/components/home/AnnouncementCard.vue'
import announcementService from '@/services/announcementService'
import { API_ORIGIN } from '@/services/api'
import { announcements as demoAnnouncements, announcementCategories } from '@/data/announcements.js'

const loading = ref(true)
const announcements = ref([])
const search = ref('')
const category = ref('All')

const categories = computed(() => announcementCategories?.length
  ? announcementCategories
  : ['All', 'General', 'Urgent', 'Youth', 'Health', 'Finance', 'Ministry']
)

const filteredAnnouncements = computed(() => {
  const term = search.value.trim().toLowerCase()

  return announcements.value.filter((item) => {
    const matchesCategory = category.value === 'All' || item.category === category.value
    const matchesSearch = !term || [item.title, item.category, item.content, item.summary]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(term))

    return matchesCategory && matchesSearch
  })
})

function getPdfUrl(item) {
  const src = item?.pdf_file_url || item?.pdf_file
  if (!src) return null

  if (typeof src === 'object') {
    return src.url || src.file || null
  }

  if (/^(https?:|blob:|data:)/i.test(src)) return src

  // Demo PDFs live in /public and must stay on the frontend origin.
  if (src.startsWith('/demo/')) return src

  const base = API_ORIGIN
  return `${base}${src.startsWith('/') ? src : `/${src}`}`
}

function clearFilters() {
  search.value = ''
  category.value = 'All'
}

async function loadAnnouncements() {
  loading.value = true

  try {
    const response = await announcementService.getAll({
      ordering: '-is_pinned,-announcement_date,-created_at',
      page_size: 100,
    })

    const results = response?.results ?? (Array.isArray(response) ? response : [])
    announcements.value = results.length ? results : demoAnnouncements
  } catch (error) {
    console.warn('Unable to load announcements from API. Using demo data.', error)
    announcements.value = demoAnnouncements
  } finally {
    loading.value = false
  }
}

onMounted(loadAnnouncements)
</script>

<style scoped>
.announcement-toolbar {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 0.75rem;
}

.announcement-search { position: relative; }

.announcement-search svg {
  position: absolute;
  left: 1rem;
  top: 50%;
  width: 17px;
  height: 17px;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
}

.announcement-search input,
.announcement-select {
  width: 100%;
  min-height: 48px;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  background: #fff;
  color: var(--color-heading);
  outline: none;
  padding: 0.7rem 1rem;
  font: inherit;
}

.announcement-search input { padding-left: 2.75rem; }

.announcement-search input:focus,
.announcement-select:focus {
  border-color: #c9a227;
  box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.12);
}

:global(.dark) .announcement-search input,
:global(.dark) .announcement-select {
  background: #0f2233;
  border-color: rgba(255, 255, 255, 0.09);
  color: #fff;
}

.announcement-skeleton {
  min-height: 470px;
  overflow: hidden;
  border: 1px solid #e8edf2;
  border-radius: 1.2rem;
  background: #fff;
}

.announcement-skeleton > :first-child {
  height: 190px;
}

:global(.dark) .announcement-skeleton {
  border-color: rgba(255, 255, 255, 0.07);
  background: #0f2233;
}

.announcements-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;
  gap: 1.25rem;
}

.announcements-grid > * {
  min-width: 0;
  height: 100%;
}

@media (max-width: 900px) {
  .announcement-toolbar { grid-template-columns: 1fr; }
  .announcements-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 640px) {
  .announcements-grid { grid-template-columns: 1fr; }
}
</style>
