<template>
  <div>
    <HeroSlider />

    <!-- Welcome / Mission -->
    <section class="section bg-white dark:bg-navy-900">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="reveal">
            <p class="section-tag mb-3">Welcome Home</p>
            <h2 class="section-heading mb-4">Growing Together in Christ</h2>
            <div class="divider-gold mb-6"></div>
            <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-5 italic font-heading">
              "To make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit." — Matthew 28:19
            </p>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              GolaniSDA is a vibrant Seventh-day Adventist congregation committed to sharing the everlasting gospel, building Christ-centred families, and transforming our community through love and service. We worship every Sabbath with joy, and we serve every day with purpose.
            </p>
            <div class="grid grid-cols-2 gap-3 mb-8">
              <div v-for="val in coreValues" :key="val" class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <div class="w-1.5 h-1.5 bg-gold-500 rounded-full flex-shrink-0"></div>
                {{ val }}
              </div>
            </div>
            <RouterLink to="/about" class="btn-primary">Discover Our Story</RouterLink>
          </div>
          <div class="reveal-right">
            <div class="relative">
              <div class="h-80 lg:h-96 bg-gradient-to-br from-primary-700 to-navy-900 rounded-3xl flex items-center justify-center overflow-hidden relative">
                <div class="absolute inset-0 bg-hero-pattern opacity-20"></div>
                <div class="text-center text-white p-8 relative z-10">
                  <p class="font-accent text-5xl mb-2">SDA</p>
                  <div class="divider-gold-center mb-4"></div>
                  <p class="text-blue-200 text-sm leading-relaxed">Seventh-day Adventists accept the Bible as the only creed and hold certain fundamental beliefs to be the teaching of the Holy Scriptures. These beliefs constitute the church's understanding of Scripture.</p>
                </div>
              </div>
              <div class="absolute -bottom-4 -right-4 bg-white dark:bg-navy-800 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-navy-700">
                <p class="font-bold text-3xl text-primary-600 dark:text-gold-400">34+</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Years of Ministry</p>
              </div>
              <div class="absolute -top-4 -left-4 bg-gold-500 rounded-2xl p-4 shadow-xl">
                <p class="font-bold text-3xl text-white">847+</p>
                <p class="text-xs text-white/80">Members</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <StatsSection />

    <!-- Upcoming Events -->
    <section class="section bg-gray-50 dark:bg-navy-950">
      <div class="container-custom">
        <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <SectionTitle tag="Calendar" title="Upcoming Events" />
          <RouterLink to="/events" class="btn-outline flex-shrink-0">View All</RouterLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EventCard v-for="e in upcomingEvents" :key="e.id" :event="e" />
        </div>
      </div>
    </section>

    <!-- Latest Sermons -->
    <section class="section bg-white dark:bg-navy-900">
      <div class="container-custom">
        <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <SectionTitle tag="Media" title="Latest Sermons" />
          <RouterLink to="/sermons" class="btn-outline flex-shrink-0">All Sermons</RouterLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SermonCard v-for="s in latestSermons" :key="s.id" :sermon="s" />
        </div>
      </div>
    </section>

    <!-- Announcements -->
    <section class="section bg-gray-50 dark:bg-navy-950">
      <div class="container-custom">
        <SectionTitle
          tag="Church News"
          title="Announcements"
          subtitle="Stay informed about what's happening in our church family."
        />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <AnnouncementCard
            v-for="ann in recentAnnouncements"
            :key="ann.id"
            :announcement="ann"
            @read-more="openAnnouncement"
          />
        </div>
        <div class="text-center">
          <RouterLink to="/announcements" class="btn-outline">View All Announcements</RouterLink>
        </div>
      </div>
    </section>

    <!-- Donation CTA -->
    <section class="section bg-white dark:bg-navy-900">
      <div class="container-custom">
        <SectionTitle
          tag="Give"
          title="Support the Work of God"
          subtitle="Your giving helps us expand ministry, serve the community, and proclaim the Gospel."
        />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DonationCard v-for="c in campaigns" :key="c.id" :campaign="c" />
        </div>
        <div class="text-center">
          <RouterLink to="/give" class="btn-gold btn-lg">Give Generously</RouterLink>
        </div>
      </div>
    </section>

    <MinistriesPreview />
    <TestimonialsSection />
    <NewsletterSection />

    <!-- Announcement Modal -->
    <Modal v-model="showModal" :title="selectedAnn ? selectedAnn.title : ''" size="md">
      <div v-if="selectedAnn">
        <p class="text-xs text-gray-400 mb-4">
          {{ formatDate(selectedAnn.date) }} · {{ selectedAnn.category }}
        </p>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {{ selectedAnn.body }}
        </p>
        <div
          v-if="selectedAnn.attachments && selectedAnn.attachments.length"
          class="mt-5 pt-4 border-t border-gray-100 dark:border-navy-700"
        >
          <p class="text-xs font-semibold text-gray-500 uppercase mb-2">Attachments</p>
          <div v-for="att in selectedAnn.attachments" :key="att.name" class="mb-1">
            <a :href="att.url" class="text-sm text-primary-600 dark:text-gold-400 hover:underline">
              {{ att.name }}
            </a>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useIntersection } from '@/composables/useIntersection'
import { events, sermons, announcements, donationCampaigns } from '@/data/index.js'
import { formatDate } from '@/utils/index.js'
import HeroSlider from '@/components/home/HeroSlider.vue'
import StatsSection from '@/components/home/StatsSection.vue'
import MinistriesPreview from '@/components/home/MinistriesPreview.vue'
import TestimonialsSection from '@/components/home/TestimonialsSection.vue'
import NewsletterSection from '@/components/home/NewsletterSection.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import EventCard from '@/components/home/EventCard.vue'
import SermonCard from '@/components/home/SermonCard.vue'
import AnnouncementCard from '@/components/home/AnnouncementCard.vue'
import DonationCard from '@/components/home/DonationCard.vue'
import Modal from '@/components/common/Modal.vue'

onMounted(() => useIntersection())

const upcomingEvents = computed(() => events.slice(0, 3))
const latestSermons = computed(() => sermons.slice(0, 3))
const recentAnnouncements = computed(() => announcements.slice(0, 4))
const campaigns = donationCampaigns

const showModal = ref(false)
const selectedAnn = ref(null)

function openAnnouncement(ann) {
  selectedAnn.value = ann
  showModal.value = true
}

const coreValues = [
  'Biblical Truth',
  'Sabbath Worship',
  'Whole-Person Health',
  'Community Service',
  'Global Mission',
  'Family Ministry'
]
</script>