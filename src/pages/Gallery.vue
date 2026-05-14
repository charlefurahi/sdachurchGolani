<template>
  <div>
    <div class="relative pt-24 pb-16 bg-gradient-to-br from-navy-900 via-primary-800 to-navy-900 overflow-hidden">
      <div class="absolute inset-0 bg-hero-pattern opacity-20"></div>
      <div class="container-custom relative z-10 text-center">
        <p class="section-tag text-gold-300 mb-3">Visual Stories</p>
        <h1 class="font-heading text-4xl md:text-5xl font-bold text-white mb-3">Photo Gallery</h1>
        <div class="divider-gold-center mb-4"></div>
        <p class="text-blue-200 max-w-xl mx-auto">Moments of faith, fellowship, and community captured through our lens.</p>
      </div>
    </div>

    <section class="section bg-white dark:bg-navy-900">
      <div class="container-custom">
        <!-- Albums -->
        <div class="mb-12">
          <p class="section-tag mb-4">Albums</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div v-for="album in albums" :key="album.id"
              class="card-hover group cursor-pointer"
              @click="activeAlbum = album; view = 'album'">
              <div class="h-44 bg-gradient-to-br from-primary-600 to-navy-800 relative overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center text-6xl opacity-20">🖼️</div>
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div class="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-navy-800 text-lg">👁</div>
                  </div>
                </div>
                <div class="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-lg">{{ album.photoCount }} photos</div>
              </div>
              <div class="p-4">
                <h3 class="font-semibold text-navy-800 dark:text-white text-sm mb-1 group-hover:text-primary-600 dark:group-hover:text-gold-400 transition-colors">{{ album.title }}</h3>
                <p class="text-xs text-gray-400">{{ formatDate(album.date) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Masonry Grid (All Photos) -->
        <div v-if="view === 'grid'">
          <p class="section-tag mb-6">Recent Photos</p>
          <div class="masonry-grid">
            <div v-for="(photo, i) in allPhotos" :key="i"
              class="masonry-item group cursor-pointer relative overflow-hidden rounded-2xl"
              @click="openLightbox(i)">
              <div :class="['bg-gradient-to-br rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105',
                i % 3 === 0 ? 'h-64' : i % 3 === 1 ? 'h-48' : 'h-80',
                gradients[i % gradients.length]]">
                <div class="text-6xl opacity-20">🖼️</div>
              </div>
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 rounded-2xl flex items-center justify-center">
                <div class="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center p-4">
                  <div class="text-2xl mb-1">🔍</div>
                  <p class="text-xs">{{ photo.caption }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Album Detail View -->
        <div v-if="view === 'album' && activeAlbum">
          <div class="flex items-center gap-3 mb-6">
            <button @click="view = 'grid'; activeAlbum = null" class="btn-outline btn-sm">← Back</button>
            <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white">{{ activeAlbum.title }}</h2>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">{{ activeAlbum.description }}</p>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="(photo, i) in activeAlbum.photos" :key="i"
              class="aspect-square bg-gradient-to-br from-primary-600 to-navy-800 rounded-2xl flex items-center justify-center cursor-pointer group relative overflow-hidden"
              @click="openLightbox(i)">
              <div class="text-4xl opacity-20">🖼️</div>
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors rounded-2xl flex items-center justify-center">
                <div class="opacity-0 group-hover:opacity-100 text-white text-sm">{{ photo.caption }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="lightboxOpen" class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" @click="lightboxOpen = false">
          <div class="relative max-w-4xl w-full" @click.stop>
            <div class="aspect-video bg-gradient-to-br from-primary-700 to-navy-900 rounded-2xl flex items-center justify-center">
              <div class="text-center text-white/30">
                <div class="text-8xl mb-3">🖼️</div>
                <p class="text-sm">{{ currentPhoto?.caption }}</p>
              </div>
            </div>
            <button @click="lightboxOpen = false" class="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors">✕</button>
            <button @click="prevPhoto" class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white">‹</button>
            <button @click="nextPhoto" class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white">›</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { galleryAlbums } from '@/data/index.js'
import { formatDate } from '@/utils/index.js'

const albums = galleryAlbums
const view = ref('grid')
const activeAlbum = ref(null)
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const gradients = [
  'from-primary-600 to-primary-800',
  'from-navy-600 to-navy-800',
  'from-primary-700 to-navy-700',
  'from-navy-700 to-primary-900',
  'from-primary-500 to-navy-800',
  'from-navy-800 to-primary-700'
]

const allPhotos = computed(() => albums.flatMap(a => a.photos))
const currentPhoto = computed(() => allPhotos.value[lightboxIndex.value])

function openLightbox(i) { lightboxIndex.value = i; lightboxOpen.value = true }
function nextPhoto() { lightboxIndex.value = (lightboxIndex.value + 1) % allPhotos.value.length }
function prevPhoto() { lightboxIndex.value = (lightboxIndex.value - 1 + allPhotos.value.length) % allPhotos.value.length }
</script>
