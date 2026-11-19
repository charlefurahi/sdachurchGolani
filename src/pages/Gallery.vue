<template>
  <div>
    <!-- Hero -->
    <div class="page-hero">
      <div class="page-hero__inner">
        <div class="container-custom text-center">
          <p class="section-tag text-blue-400 mb-3">Visual Stories</p>
          <h1 class="font-heading text-4xl md:text-5xl font-bold text-white mb-3">Photo Gallery</h1>
          <div class="divider-blue-center mb-4"></div>
          <p class="text-blue-200 max-w-xl mx-auto">Moments of faith, fellowship, and community captured through our lens.</p>
        </div>
      </div>
    </div>

    <section class="section bg-gray-50 dark:bg-navy-950 min-h-screen">
      <div class="container-custom">

        <!-- Category Filter Pills -->
        <div v-if="view === 'grid'" class="flex gap-2 flex-wrap mb-8">
          <button @click="activeCategory = null"
            :class="['px-4 py-2 rounded-xl text-sm font-semibold transition-all border',
              !activeCategory ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                : 'bg-white dark:bg-navy-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-navy-700 hover:border-primary-400']">
            All Albums
          </button>
          <button v-for="cat in categories" :key="cat.id" @click="activeCategory = cat"
            :class="['px-4 py-2 rounded-xl text-sm font-semibold transition-all border',
              activeCategory?.id === cat.id ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                : 'bg-white dark:bg-navy-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-navy-700 hover:border-primary-400']">
            {{ cat.name }}
            <span class="ml-1 text-xs opacity-70">({{ cat.album_count ?? '' }})</span>
          </button>
        </div>

        <!-- Loading skeleton -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="n in 8" :key="n" class="bg-white dark:bg-navy-800 rounded-2xl overflow-hidden animate-pulse">
            <div class="h-44 bg-gray-200 dark:bg-navy-700"></div>
            <div class="p-4 space-y-2">
              <div class="h-4 bg-gray-200 dark:bg-navy-700 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 dark:bg-navy-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        <!-- Albums Grid -->
        <div v-else-if="view === 'grid'">
          <div class="flex items-center justify-between mb-6">
            <div>
              <p class="section-tag mb-1">{{ activeCategory ? activeCategory.name : 'All Albums' }}</p>
              <p class="text-xs text-gray-400">{{ filteredAlbums.length }} collection{{ filteredAlbums.length !== 1 ? 's' : '' }}</p>
            </div>
          </div>

          <div v-if="filteredAlbums.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div v-for="album in filteredAlbums" :key="album.id"
              class="group cursor-pointer bg-white dark:bg-navy-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-navy-700"
              @click="openAlbum(album)">
              <!-- Album Cover -->
              <div class="relative h-44 overflow-hidden bg-gradient-to-br from-primary-700 to-navy-900">
                <img v-if="getImageUrl(album.cover_photo_url || album.cover_photo)"
                  :src="getImageUrl(album.cover_photo_url || album.cover_photo)"
                  :alt="album.title"
                  class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105 transition-transform" />
                <div v-else :class="['absolute inset-0 bg-gradient-to-br flex items-center justify-center', albumGradients[album.id % albumGradients.length]]">
                  <div class="text-center text-white/30">
                    <div class="text-5xl">🖼️</div>
                  </div>
                </div>
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end p-4">
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                    <span class="inline-flex items-center gap-1.5 bg-white/90 text-navy-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                      🔍 View Album
                    </span>
                  </div>
                </div>
                <!-- Category badge -->
                <div v-if="album.category" class="absolute top-3 left-3 bg-primary-600/90 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {{ typeof album.category === 'object' ? album.category.name : album.category }}
                </div>
                <!-- Photo count -->
                <div class="absolute top-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full font-medium backdrop-blur-sm">
                  {{ album.photo_count ?? album.photos?.length ?? 0 }} photos
                </div>
              </div>
              <div class="p-4">
                <h3 class="font-bold text-navy-800 dark:text-white text-sm mb-1 group-hover:text-primary-600 dark:group-hover:text-blue-500 transition-colors leading-snug">{{ album.title }}</h3>
                <p class="text-xs text-gray-400 mb-2">{{ formatDate(album.event_date || album.created_at) }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{{ album.description }}</p>
              </div>
            </div>
          </div>

          <!-- Empty state -->
          <div v-else class="text-center py-20">
            <div class="text-6xl mb-4">🖼️</div>
            <p class="text-xl font-semibold text-gray-400 mb-2">No albums found</p>
            <p class="text-sm text-gray-400">No gallery albums have been uploaded yet.</p>
          </div>
        </div>

        <!-- Album Detail View -->
        <div v-else-if="view === 'album' && activeAlbum">
          <div class="flex items-center gap-3 mb-2">
            <button @click="view = 'grid'; activeAlbum = null"
              class="flex items-center gap-2 text-sm text-primary-600 dark:text-blue-500 hover:underline font-medium">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Back to Gallery
            </button>
          </div>
          <div class="flex items-start justify-between mb-6 gap-4">
            <div>
              <div v-if="activeAlbum.category" class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 mb-2">
                {{ typeof activeAlbum.category === 'object' ? activeAlbum.category.name : activeAlbum.category }}
              </div>
              <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white mb-1">{{ activeAlbum.title }}</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ activeAlbum.description }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ formatDate(activeAlbum.event_date || activeAlbum.created_at) }}</p>
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
              {{ albumPhotos.length }} photos
            </span>
          </div>

          <!-- Loading photos -->
          <div v-if="albumLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="n in 8" :key="n" class="aspect-square rounded-2xl bg-gray-200 dark:bg-navy-700 animate-pulse"></div>
          </div>

          <div v-else-if="albumPhotos.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="(photo, i) in albumPhotos" :key="photo.id"
              class="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative"
              @click="openLightbox(i)">
              <img v-if="getImageUrl(photo.image_url || photo.image)"
                :src="getImageUrl(photo.image_url || photo.image)"
                :alt="photo.caption || 'Gallery photo'"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              <div v-else :class="['w-full h-full bg-gradient-to-br flex items-center justify-center', gradients[i % gradients.length]]">
                <div class="text-4xl opacity-20">🖼️</div>
              </div>
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors rounded-2xl flex items-center justify-center">
                <div class="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center p-3">
                  <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"/>
                    </svg>
                  </div>
                  <p v-if="photo.caption" class="text-xs font-medium">{{ photo.caption }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-16">
            <div class="text-5xl mb-3">🖼️</div>
            <p class="text-gray-400">No photos in this album yet.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="lightboxOpen" class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" @click="lightboxOpen = false">
          <div class="relative max-w-5xl w-full max-h-full" @click.stop>
            <div class="relative flex items-center justify-center">
              <img v-if="currentPhoto && getImageUrl(currentPhoto.image_url || currentPhoto.image)"
                :src="getImageUrl(currentPhoto.image_url || currentPhoto.image)"
                :alt="currentPhoto.caption || 'Gallery photo'"
                class="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl" />
              <div v-else class="aspect-video w-full bg-gradient-to-br from-primary-700 to-navy-900 rounded-2xl flex items-center justify-center">
                <div class="text-center text-white/30">
                  <div class="text-8xl mb-3">🖼️</div>
                  <p class="text-sm">{{ currentPhoto?.caption }}</p>
                </div>
              </div>
            </div>
            <div v-if="currentPhoto?.caption" class="text-center text-white/70 text-sm mt-3">{{ currentPhoto.caption }}</div>
            <div class="text-center text-white/40 text-xs mt-1">{{ lightboxIndex + 1 }} / {{ albumPhotos.length }}</div>
            <button @click="lightboxOpen = false" class="absolute top-0 right-0 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors -translate-y-2 translate-x-2">✕</button>
            <button @click.stop="prevPhoto" class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl">‹</button>
            <button @click.stop="nextPhoto" class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl">›</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { formatDate } from '@/utils/index.js'
import galleryService from '@/services/galleryService'
import { API_ORIGIN } from '@/services/api'

const BASE_URL = API_ORIGIN

const albums         = ref([])
const categories     = ref([])
const activeCategory = ref(null)
const view           = ref('grid')
const activeAlbum    = ref(null)
const albumPhotos    = ref([])
const loading        = ref(false)
const albumLoading   = ref(false)
const lightboxOpen   = ref(false)
const lightboxIndex  = ref(0)

const gradients = [
  'from-primary-600 to-primary-800 bg-gradient-to-br',
  'from-navy-600 to-navy-800 bg-gradient-to-br',
  'from-primary-700 to-navy-700 bg-gradient-to-br',
  'from-navy-700 to-primary-900 bg-gradient-to-br',
  'from-primary-500 to-navy-800 bg-gradient-to-br',
]

const albumGradients = [
  'from-primary-600 to-primary-900',
  'from-navy-700 to-primary-800',
  'from-primary-700 to-navy-900',
  'from-navy-600 to-primary-700',
]

const filteredAlbums = computed(() => {
  if (!activeCategory.value) return albums.value
  return albums.value.filter(a => {
    const catId = typeof a.category === 'object' ? a.category?.id : a.category
    return catId === activeCategory.value.id
  })
})

const currentPhoto = computed(() => albumPhotos.value[lightboxIndex.value] ?? null)

function getImageUrl(url) {
  if (!url) return null
  if (typeof url !== 'string') return null
  if (url.startsWith('http')) return url
  return BASE_URL + (url.startsWith('/') ? url : '/' + url)
}

async function fetchAlbums() {
  loading.value = true
  try {
    const [albumsRes, catsRes] = await Promise.all([
      galleryService.getAlbums(),
      galleryService.getCategories(),
    ])
    albums.value     = albumsRes.results ?? albumsRes ?? []
    categories.value = Array.isArray(catsRes) ? catsRes : (catsRes.results ?? [])
  } catch {
    albums.value = []
  } finally {
    loading.value = false
  }
}

async function openAlbum(album) {
  activeAlbum.value = album
  view.value = 'album'
  albumLoading.value = true
  albumPhotos.value = []
  try {
    // Use getAlbumById (correct method name from galleryService)
    const full = await galleryService.getAlbumById(album.id)
    albumPhotos.value = full.photos ?? full.results ?? []
  } catch {
    // Fall back to photos embedded in the album listing
    albumPhotos.value = album.photos ?? []
  } finally {
    albumLoading.value = false
  }
}

function openLightbox(i) { lightboxIndex.value = i; lightboxOpen.value = true }
function nextPhoto() { lightboxIndex.value = (lightboxIndex.value + 1) % albumPhotos.value.length }
function prevPhoto() { lightboxIndex.value = (lightboxIndex.value - 1 + albumPhotos.value.length) % albumPhotos.value.length }

onMounted(fetchAlbums)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
