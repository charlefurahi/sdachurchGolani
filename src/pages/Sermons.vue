<template>
  <div>
    <div class="relative pt-24 pb-16 bg-gradient-to-br from-navy-900 via-primary-800 to-navy-900 overflow-hidden">
      <div class="absolute inset-0 bg-hero-pattern opacity-20"></div>
      <div class="container-custom relative z-10 text-center">
        <p class="section-tag text-gold-300 mb-3">Media</p>
        <h1 class="font-heading text-4xl md:text-5xl font-bold text-white mb-3">Sermons & Messages</h1>
        <div class="divider-gold-center mb-4"></div>
        <p class="text-blue-200 max-w-xl mx-auto">Nourish your soul with anointed messages. Listen, download, and share the Word of God.</p>
      </div>
    </div>

    <!-- Featured Sermon -->
    <section v-if="featuredSermon" class="section-sm bg-white dark:bg-navy-900">
      <div class="container-custom">
        <p class="section-tag mb-4">Featured Message</p>
        <div class="bg-gradient-to-br from-primary-700 to-navy-900 rounded-3xl overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-2">
            <div class="p-8 lg:p-12 flex flex-col justify-center">
              <span class="badge bg-gold-500 text-white mb-4 self-start">Featured</span>
              <span class="text-gold-300 text-xs font-accent tracking-widest uppercase mb-2">{{ featuredSermon.topic }}</span>
              <h2 class="font-heading text-3xl md:text-4xl font-bold text-white mb-3">{{ featuredSermon.title }}</h2>
              <p class="text-blue-200 text-sm italic mb-1">{{ featuredSermon.scripture }}</p>
              <p class="text-gray-300 text-sm mb-2">{{ featuredSermon.speaker }} · {{ formatDate(featuredSermon.date) }}</p>
              <p class="text-blue-100 text-sm leading-relaxed mb-6 line-clamp-3">{{ featuredSermon.description }}</p>
              <div class="flex flex-wrap gap-3">
                <button @click="playSermon(featuredSermon)" class="btn-gold">▶ Listen Now</button>
                <button @click="watchSermon(featuredSermon)" class="btn-outline-white">📺 Watch Video</button>
              </div>
            </div>
            <div class="bg-navy-800/50 flex items-center justify-center p-8 min-h-48">
              <div class="text-center text-white/30 text-9xl">🎙️</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters & Search -->
    <section class="section bg-gray-50 dark:bg-navy-950">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row gap-4 mb-8">
          <SearchBar v-model="search" placeholder="Search sermons..." class="flex-1" />
          <select v-model="filterTopic" class="select md:w-48"><option v-for="t in topics" :key="t" :value="t">{{ t }}</option></select>
          <select v-model="filterSpeaker" class="select md:w-52"><option v-for="s in speakers" :key="s" :value="s">{{ s }}</option></select>
        </div>

        <div v-if="filtered.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="sermon in filtered" :key="sermon.id" class="card-hover group">
            <div class="relative h-44 bg-gradient-to-br from-navy-700 to-primary-900 overflow-hidden">
              <div class="absolute inset-0 flex items-center justify-center text-7xl opacity-10">🎙️</div>
              <div v-if="sermon.featured" class="absolute top-3 left-3"><span class="badge bg-gold-500 text-white text-xs">Featured</span></div>
              <div class="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-lg">{{ sermon.duration }}</div>
              <button @click="playSermon(sermon)" class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div class="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                  <span class="text-primary-600 text-xl ml-1">▶</span>
                </div>
              </button>
            </div>
            <div class="p-5">
              <span class="badge-primary text-xs mb-2 inline-block">{{ sermon.topic }}</span>
              <h3 class="font-heading text-lg font-semibold text-navy-800 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-gold-400 transition-colors line-clamp-2">{{ sermon.title }}</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">{{ sermon.speaker }}</p>
              <p class="text-xs text-gold-600 dark:text-gold-400 italic mb-3">{{ sermon.scripture }}</p>
              <p class="text-xs text-gray-400 mb-4">{{ formatDate(sermon.date) }}</p>
              <div class="flex items-center justify-between">
                <div class="flex gap-3 text-xs text-gray-400">
                  <span>👁 {{ sermon.views.toLocaleString() }}</span>
                  <span>⬇ {{ sermon.downloads }}</span>
                </div>
                <div class="flex gap-2">
                  <button @click="playSermon(sermon)" class="btn-primary btn-sm">▶ Listen</button>
                  <button @click="watchSermon(sermon)" class="btn-outline btn-sm">📺</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-20">
          <div class="text-5xl mb-3">🎙️</div>
          <p class="text-gray-400">No sermons found matching your search.</p>
        </div>
      </div>
    </section>

    <!-- Audio Player Modal -->
    <Modal v-model="showPlayer" :title="currentSermon?.title || 'Now Playing'" size="md">
      <div v-if="currentSermon" class="text-center">
        <div class="w-24 h-24 bg-gradient-to-br from-primary-500 to-navy-700 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">🎙️</div>
        <h3 class="font-heading text-xl font-bold text-navy-800 dark:text-white mb-1">{{ currentSermon.title }}</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ currentSermon.speaker }}</p>
        <p class="text-xs text-gold-600 dark:text-gold-400 italic mb-6">{{ currentSermon.scripture }}</p>
        <div class="bg-gray-50 dark:bg-navy-800 rounded-2xl p-5 mb-4">
          <div class="flex items-center gap-4 mb-4">
            <span class="text-xs text-gray-400 w-10 text-right">0:00</span>
            <input type="range" min="0" max="100" value="0" class="flex-1 audio-progress h-1 accent-gold-500 cursor-pointer" />
            <span class="text-xs text-gray-400 w-10">{{ currentSermon.duration }}</span>
          </div>
          <div class="flex items-center justify-center gap-5">
            <button class="text-gray-400 hover:text-primary-600 text-xl transition-colors">⏮</button>
            <button class="w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center text-xl shadow-lg transition-all hover:scale-105">
              {{ isPlaying ? '⏸' : '▶' }}
            </button>
            <button class="text-gray-400 hover:text-primary-600 text-xl transition-colors">⏭</button>
          </div>
        </div>
        <div class="flex gap-3 justify-center">
          <a :href="currentSermon.audioUrl" download class="btn-outline btn-sm">⬇ Download Audio</a>
          <button @click="showPlayer = false; showVideo = true" class="btn-outline btn-sm">📺 Watch Video</button>
        </div>
        <p class="text-xs text-gray-400 mt-4 italic">Note: Audio playback requires backend integration.</p>
      </div>
    </Modal>

    <!-- Video Modal -->
    <Modal v-model="showVideo" :title="currentSermon?.title || ''" size="lg">
      <div v-if="currentSermon" class="aspect-video bg-navy-900 rounded-xl flex items-center justify-center">
        <div class="text-center text-white/40">
          <div class="text-6xl mb-3">📺</div>
          <p>Video player — YouTube/Vimeo integration ready</p>
          <p class="text-xs mt-1">{{ currentSermon.videoUrl }}</p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { sermons, sermonTopics, sermonSpeakers } from '@/data/sermons.js'
import { formatDate } from '@/utils/index.js'
import SearchBar from '@/components/common/SearchBar.vue'
import Modal from '@/components/common/Modal.vue'

const search = ref('')
const filterTopic = ref('All Topics')
const filterSpeaker = ref('All Speakers')
const showPlayer = ref(false)
const showVideo = ref(false)
const currentSermon = ref(null)
const isPlaying = ref(false)

const topics = sermonTopics
const speakers = sermonSpeakers
const featuredSermon = computed(() => sermons.find(s => s.featured))

const filtered = computed(() => sermons.filter(s => {
  const matchSearch = !search.value || s.title.toLowerCase().includes(search.value.toLowerCase()) || s.speaker.toLowerCase().includes(search.value.toLowerCase())
  const matchTopic = filterTopic.value === 'All Topics' || s.topic === filterTopic.value
  const matchSpeaker = filterSpeaker.value === 'All Speakers' || s.speaker === filterSpeaker.value
  return matchSearch && matchTopic && matchSpeaker
}))

function playSermon(sermon) { currentSermon.value = sermon; showPlayer.value = true; isPlaying.value = true }
function watchSermon(sermon) { currentSermon.value = sermon; showVideo.value = true }
</script>
