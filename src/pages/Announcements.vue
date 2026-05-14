<template>
  <div>
    <div class="relative pt-24 pb-16 bg-gradient-to-br from-navy-900 via-primary-800 to-navy-900 overflow-hidden">
      <div class="absolute inset-0 bg-hero-pattern opacity-20"></div>
      <div class="container-custom relative z-10 text-center">
        <p class="section-tag text-gold-300 mb-3">Church News</p>
        <h1 class="font-heading text-4xl md:text-5xl font-bold text-white mb-3">Announcements</h1>
        <div class="divider-gold-center mb-4"></div>
        <p class="text-blue-200 max-w-xl mx-auto">Stay informed and connected with your church family.</p>
      </div>
    </div>
    <section class="section bg-white dark:bg-navy-900">
      <div class="container-custom">
        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <SearchBar v-model="search" placeholder="Search announcements..." class="flex-1" />
          <div class="flex gap-2 flex-wrap">
            <button v-for="cat in categories" :key="cat" @click="activeCategory = cat"
              :class="['px-4 py-2 rounded-xl text-sm font-medium transition-all', activeCategory === cat ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-navy-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-navy-700']">
              {{ cat }}
            </button>
          </div>
        </div>
        <!-- Pinned -->
        <div v-if="pinned.length" class="mb-8">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">📌 Pinned</p>
          <div class="space-y-4">
            <div v-for="ann in pinned" :key="ann.id" class="card p-5 border-l-4 border-gold-500 cursor-pointer hover:shadow-md transition-shadow" @click="open(ann)">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <div class="flex gap-2 mb-1">
                    <span v-if="ann.isUrgent" class="badge bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 text-xs">Urgent</span>
                    <span class="badge-gold text-xs">{{ ann.category }}</span>
                  </div>
                  <h3 class="font-semibold text-navy-800 dark:text-white mb-1">{{ ann.title }}</h3>
                  <p class="text-xs text-gray-400 mb-2">{{ formatDate(ann.date) }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-300">{{ ann.summary }}</p>
                </div>
                <span class="text-primary-600 dark:text-gold-400 text-sm font-medium flex-shrink-0">Read →</span>
              </div>
            </div>
          </div>
        </div>
        <!-- All -->
        <div>
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">All Announcements</p>
          <div class="space-y-4">
            <div v-for="ann in filteredUnpinned" :key="ann.id" class="card p-5 cursor-pointer hover:shadow-md transition-shadow" @click="open(ann)">
              <div class="flex items-start justify-between gap-3">
                <div class="flex-1">
                  <div class="flex gap-2 mb-1">
                    <span v-if="ann.isUrgent" class="badge bg-red-100 text-red-700 text-xs">Urgent</span>
                    <span class="badge-primary text-xs">{{ ann.category }}</span>
                  </div>
                  <h3 class="font-semibold text-navy-800 dark:text-white mb-1">{{ ann.title }}</h3>
                  <p class="text-xs text-gray-400 mb-2">{{ formatDate(ann.date) }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{{ ann.summary }}</p>
                </div>
                <span class="text-primary-600 dark:text-gold-400 text-sm font-medium flex-shrink-0">Read →</span>
              </div>
            </div>
          </div>
          <div v-if="!filteredUnpinned.length" class="text-center py-16 text-gray-400">
            <div class="text-4xl mb-3">📢</div><p>No announcements found.</p>
          </div>
        </div>
      </div>
    </section>
    <Modal v-model="showModal" :title="selectedAnn?.title || ''" size="md">
      <div v-if="selectedAnn">
        <div class="flex gap-2 mb-4">
          <span v-if="selectedAnn.isUrgent" class="badge bg-red-100 text-red-700 text-xs">Urgent</span>
          <span class="badge-primary text-xs">{{ selectedAnn.category }}</span>
          <span class="text-xs text-gray-400 ml-auto">{{ formatDate(selectedAnn.date) }}</span>
        </div>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ selectedAnn.body }}</p>
        <div v-if="selectedAnn.attachments?.length" class="mt-5 pt-4 border-t border-gray-100 dark:border-navy-700 space-y-2">
          <p class="text-xs font-semibold text-gray-500 uppercase mb-2">Attachments</p>
          <a v-for="att in selectedAnn.attachments" :key="att.name" :href="att.url" class="flex items-center gap-2 text-sm text-primary-600 dark:text-gold-400 hover:underline">📎 {{ att.name }}</a>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { announcements, announcementCategories } from '@/data/index.js'
import { formatDate } from '@/utils/index.js'
import SearchBar from '@/components/common/SearchBar.vue'
import Modal from '@/components/common/Modal.vue'
const search = ref('')
const activeCategory = ref('All')
const categories = announcementCategories
const showModal = ref(false)
const selectedAnn = ref(null)
const pinned = computed(() => announcements.filter(a => a.isPinned))
const filteredUnpinned = computed(() => announcements.filter(a => {
  if (a.isPinned) return false
  const matchCat = activeCategory.value === 'All' || a.category === activeCategory.value
  const matchSearch = !search.value || a.title.toLowerCase().includes(search.value.toLowerCase())
  return matchCat && matchSearch
}))
function open(ann) { selectedAnn.value = ann; showModal.value = true }
</script>
