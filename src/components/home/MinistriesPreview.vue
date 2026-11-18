<template>
  <section class="section bg-slate-50 dark:bg-navy-950">
    <div class="container-custom">
      <SectionTitle
        tag="Ministries"
        title="Find Your Place to Serve"
        subtitle="Our ministries create room for worship, growth, fellowship and practical service."
      />

      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="card overflow-hidden animate-pulse">
          <div class="h-52 skeleton rounded-none"></div>
          <div class="p-5 space-y-3">
            <div class="h-5 skeleton w-2/3"></div>
            <div class="h-3 skeleton w-full"></div>
            <div class="h-3 skeleton w-4/5"></div>
          </div>
        </div>
      </div>

      <div v-else-if="ministries.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="ministry in ministries"
          :key="ministry.id"
          class="ministry-card group"
        >
          <RouterLink :to="{ name: 'MinistryDetail', params: { id: ministry.id } }" class="block h-full no-underline">
            <div class="ministry-card__image">
              <img
                v-if="ministry.photo_url"
                :src="ministry.photo_url"
                :alt="ministry.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div v-else class="ministry-card__placeholder">
                <span>{{ initials(ministry.name) }}</span>
              </div>

              <div class="ministry-card__shade"></div>
              <div class="ministry-card__action">
                <span>Discover more</span>
                <span aria-hidden="true">→</span>
              </div>
            </div>

            <div class="p-5">
              <h3 class="font-heading text-2xl font-bold text-slate-900 dark:text-white group-hover:text-navy-500 dark:group-hover:text-blue-400 transition-colors">
                {{ ministry.name }}
              </h3>
              <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400 line-clamp-3">
                {{ ministry.description || 'Learn more about this ministry and how it serves our church family.' }}
              </p>
            </div>
          </RouterLink>
        </article>
      </div>

      <div v-else class="rounded-3xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 p-8 md:p-12 text-center">
        <div class="mx-auto mb-5 w-14 h-14 rounded-2xl bg-navy-50 dark:bg-gold-400/15 text-navy-700 dark:text-gold-400 grid place-items-center">
          <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M4 19.5V5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5m0-2a2.5 2.5 0 0 1 2.5-2.5H20"/>
          </svg>
        </div>
        <h3 class="font-heading text-2xl font-bold text-slate-900 dark:text-white">Ministries are being prepared</h3>
        <p class="max-w-xl mx-auto mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
          Ministry information will appear here once it is available from the church database.
        </p>
      </div>

      <div class="text-center mt-9">
        <RouterLink to="/ministries" class="btn-outline">
          Explore Ministries <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import SectionTitle from '@/components/common/SectionTitle.vue'
import ministryService from '@/services/ministryService'

// Demo/seed fallback — same pattern used everywhere else in the app
// (Home.vue's sermons/events/announcements, Ministries.vue). Without
// this, an unreachable backend made this section the only one on the
// homepage showing an empty state while every other section next to
// it was showing demo content.
import { ministryCatalog } from '@/data/ministries.js'

const ministries = ref([])
const loading = ref(true)

function initials(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase()
}

async function loadMinistries() {
  loading.value = true
  try {
    const response = await ministryService.getAll({ page_size: 6, ordering: 'order' })
    const list = response?.results ?? response
    ministries.value = Array.isArray(list) && list.length ? list.slice(0, 6) : demoFallback()
  } catch (error) {
    // Backend unreachable / not deployed yet — fall back to demo data
    // instead of showing an empty state.
    ministries.value = demoFallback()
  } finally {
    loading.value = false
  }
}

function demoFallback() {
  return Array.isArray(ministryCatalog) ? ministryCatalog.slice(0, 6) : []
}

onMounted(loadMinistries)
</script>

<style scoped>
.ministry-card {
  @apply bg-white dark:bg-navy-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-navy-700 shadow-sm transition-all duration-300;
}
.ministry-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.12);
}
.dark .ministry-card:hover {
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.28);
}
.ministry-card__image {
  @apply relative h-56 overflow-hidden bg-slate-100 dark:bg-navy-800;
}
.ministry-card__placeholder {
  @apply absolute inset-0 grid place-items-center bg-gradient-to-br from-navy-50 to-navy-200 text-navy-700;
}
.ministry-card__placeholder span {
  @apply text-4xl font-bold text-white/90 font-heading;
}
.ministry-card__shade {
  @apply absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-70 transition-opacity duration-300;
}
.ministry-card:hover .ministry-card__shade {
  @apply opacity-100;
}
.ministry-card__action {
  @apply absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-sm font-semibold opacity-0 translate-y-2 transition-all duration-300;
}
.ministry-card:hover .ministry-card__action {
  @apply opacity-100 translate-y-0;
}
</style>