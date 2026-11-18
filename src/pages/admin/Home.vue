<template>
  <div class="overflow-x-hidden bg-white">
    <HeroSlider />

    <!-- ── Welcome / Mission ─────────────────────────────────── WHITE ── -->
    <section class="section">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="text-center lg:text-left">
            <p class="section-tag mb-3">Welcome Home</p>
            <h2 class="section-heading mb-4">Growing Together in Christ</h2>
            <div class="divider-blue mb-6 mx-auto lg:mx-0"></div>
            <p class="text-lg text-gray-600 leading-relaxed mb-5 italic font-heading">
              "To make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit." — Matthew 28:19
            </p>
            <p class="text-gray-500 leading-relaxed mb-6">
              GolaniSDA is a vibrant Seventh-day Adventist congregation committed to sharing the everlasting gospel,
              building Christ-centred families, and transforming our community through love and service. We worship
              every Sabbath with joy, and we serve every day with purpose.
            </p>
            <div class="grid grid-cols-2 gap-3 mb-8">
              <div v-for="val in coreValues" :key="val" class="flex items-center gap-2 text-sm text-gray-600">
                <div class="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></div>
                {{ val }}
              </div>
            </div>
            <RouterLink to="/about" class="btn-primary">Discover Our Story</RouterLink>
          </div>
          <div>
            <div class="relative">
              <div class="h-80 lg:h-96 rounded-3xl flex items-center justify-center overflow-hidden relative"
                style="background: var(--gradient-page-hero)">
                <div class="absolute inset-0 bg-hero-pattern opacity-20"></div>
                <div class="text-center text-white p-8 relative z-10">
                  <p class="font-accent text-5xl mb-2">SDA</p>
                  <div class="w-14 h-1 rounded-full mx-auto mb-4" style="background: rgba(255,255,255,0.4)"></div>
                  <p class="text-blue-200 text-sm leading-relaxed">Seventh-day Adventists accept the Bible as the only
                    creed and hold certain fundamental beliefs to be the teaching of the Holy Scriptures.</p>
                </div>
              </div>
              <div class="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 border border-gray-100"
                style="box-shadow: 0 4px 20px rgba(0,0,0,0.10)">
                <p class="font-bold text-3xl text-blue-700">34+</p>
                <p class="text-xs text-gray-500">Years of Ministry</p>
              </div>
              <div class="absolute -top-4 -left-4 rounded-2xl p-4"
                style="background: var(--gradient-page-hero); box-shadow: 0 4px 20px rgba(13,33,55,0.3)">
                <p class="font-bold text-3xl text-white">500+</p>
                <p class="text-xs text-white/80">Members</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <StatsSection />

    <!-- ── Upcoming Events ──────────────────────────────────── WHITE ── -->
    <section class="section bg-gray-50">
      <div class="container-custom">
        <SectionTitle tag="Calendar" title="Upcoming Events"
          subtitle="Stay connected — join us for worship, fellowship and ministry." />

        <div v-if="eventsLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="n in 3" :key="n" class="card animate-pulse">
            <div class="h-44 bg-gray-100 rounded-t-2xl"></div>
            <div class="p-5 space-y-3">
              <div class="h-4 bg-gray-100 rounded w-3/4"></div>
              <div class="h-3 bg-gray-100 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        <div v-else-if="upcomingEvents.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EventCard v-for="e in upcomingEvents" :key="e.id" :event="e" />
        </div>

        <div v-else class="text-center py-16">
          <p class="text-5xl mb-4">📅</p>
          <h3 class="text-lg font-semibold text-gray-600 mb-2">No upcoming events</h3>
          <p class="text-gray-400 text-sm mb-6">Check back soon for new events.</p>
        </div>

        <div class="text-center mt-10">
          <RouterLink to="/events" class="btn-primary">View All Events →</RouterLink>
        </div>
      </div>
    </section>

    <!-- ── Latest Sermons ──────────────────────────────────── WHITE ── -->
    <section class="section">
      <div class="container-custom">
        <SectionTitle tag="Media" title="Latest Sermons"
          subtitle="Nourish your soul with anointed messages from God's Word." />

        <div v-if="sermonsLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="n in 3" :key="n" class="card animate-pulse">
            <div class="h-44 bg-gray-100 rounded-t-2xl"></div>
            <div class="p-5 space-y-3">
              <div class="h-4 bg-gray-100 rounded w-3/4"></div>
              <div class="h-3 bg-gray-100 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        <div v-else-if="latestSermons.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SermonCard v-for="s in latestSermons" :key="s.id" :sermon="s" />
        </div>

        <div v-else class="text-center py-16">
          <p class="text-5xl mb-4">🎙️</p>
          <h3 class="text-lg font-semibold text-gray-600 mb-2">No sermons yet</h3>
          <p class="text-gray-400 text-sm mb-6">Sermons will appear here once added by the admin.</p>
        </div>

        <div class="text-center mt-10">
          <RouterLink to="/sermons" class="btn-outline">All Sermons →</RouterLink>
        </div>
      </div>
    </section>

    <!-- ── Announcements ────────────────────────────────────── LIGHT GREY ── -->
    <section class="section bg-gray-50">
      <div class="container-custom">
        <SectionTitle tag="Church News" title="Announcements"
          subtitle="Stay informed about what's happening in our church family." />

        <div v-if="announcementsLoading" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div v-for="n in 4" :key="n" class="card animate-pulse flex" style="min-height:90px">
            <div class="w-1 flex-shrink-0 bg-gray-200 rounded-l-2xl"></div>
            <div class="flex-1 p-4 space-y-2">
              <div class="h-3 rounded w-1/3 bg-gray-100"></div>
              <div class="h-4 rounded w-2/3 bg-gray-100"></div>
              <div class="h-3 rounded w-full bg-gray-100"></div>
            </div>
          </div>
        </div>

        <template v-else-if="recentAnnouncements.length">
          <div v-if="pinnedAnnouncements.length" class="flex items-center gap-3 mb-3">
            <span class="text-xs font-bold tracking-widest uppercase text-blue-600">📌 Pinned</span>
            <div class="flex-1 h-px bg-blue-100"></div>
          </div>
          <div v-if="pinnedAnnouncements.length" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <AnnouncementCard
              v-for="ann in pinnedAnnouncements"
              :key="ann.id"
              :announcement="ann"
              @read-more="openAnnouncement"
            />
          </div>

          <div v-if="unpinnedAnnouncements.length" class="flex items-center gap-3 mb-3" :class="{ 'mt-6': pinnedAnnouncements.length }">
            <span class="text-xs font-bold tracking-widest uppercase text-gray-400">Recent</span>
            <div class="flex-1 h-px bg-gray-200"></div>
          </div>
          <div v-if="unpinnedAnnouncements.length" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <AnnouncementCard
              v-for="ann in unpinnedAnnouncements"
              :key="ann.id"
              :announcement="ann"
              @read-more="openAnnouncement"
            />
          </div>
        </template>

        <div v-else class="text-center py-12 mb-8">
          <p class="text-5xl mb-4">📢</p>
          <h3 class="text-lg font-semibold text-gray-600 mb-2">No announcements yet</h3>
          <p class="text-gray-400 text-sm">Announcements added in the admin will appear here.</p>
        </div>

        <div class="text-center mt-6">
          <RouterLink to="/announcements" class="btn-primary">View All Announcements →</RouterLink>
        </div>
      </div>
    </section>

    <!-- ── Donation CTA ──────────────────────────────────────── WHITE ── -->
    <section class="section">
      <div class="container-custom">
        <SectionTitle tag="Give" title="Support the Work of God"
          subtitle="Your giving helps us expand ministry, serve the community, and proclaim the Gospel." />
        <div v-if="donationsLoading" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div v-for="n in 3" :key="n" class="card p-5 animate-pulse space-y-3">
            <div class="h-5 bg-gray-100 rounded w-1/2"></div>
            <div class="h-3 bg-gray-100 rounded w-full"></div>
          </div>
        </div>
        <div v-else-if="campaigns.length" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DonationCard v-for="c in campaigns" :key="c.id" :campaign="c" />
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div v-for="def in defaultGiving" :key="def.title"
            class="card-light p-6 text-center">
            <div class="text-4xl mb-3">{{ def.icon }}</div>
            <h3 class="font-bold text-navy-800 text-base mb-2">{{ def.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ def.desc }}</p>
          </div>
        </div>
        <div class="text-center">
          <RouterLink to="/give" class="btn-primary btn-lg">Give Generously</RouterLink>
        </div>
      </div>
    </section>

    <!-- ── Our Ministries ────────────────────────────────── GREY ── -->
    <MinistriesPreview />

    <!-- ── Leadership Preview ───────────────────────────── WHITE ── -->
    <section class="section">
      <div class="container-custom">
        <SectionTitle tag="Our Team" title="Meet Our Leaders"
          subtitle="Faithful servants guiding our church family in faith and love." />

        <div v-if="leadersLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div v-for="n in 6" :key="n" class="card animate-pulse">
            <div class="h-36 bg-gray-100 rounded-t-2xl"></div>
            <div class="p-3 space-y-2">
              <div class="h-3 bg-gray-100 rounded w-3/4 mx-auto"></div>
              <div class="h-2 bg-gray-100 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>

        <div v-else-if="leaders.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <RouterLink
            v-for="leader in leaders"
            :key="leader.id"
            to="/leadership"
            class="card group text-center overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 no-underline"
          >
            <div class="relative h-36 overflow-hidden" style="background: var(--gradient-card-dark)">
              <img
                v-if="leader.photo_url"
                :src="leader.photo_url"
                :alt="leader.full_name"
                class="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                @error="$event.target.style.display='none'"
              />
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  <span class="text-xl font-bold text-white">
                    {{ leader.full_name.split(' ').slice(0,2).map(w=>w[0]).join('') }}
                  </span>
                </div>
              </div>
              <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent h-10"></div>
            </div>
            <div class="p-3">
              <p class="font-semibold text-xs text-navy-800 leading-tight line-clamp-2">{{ leader.full_name }}</p>
              <p class="text-xs text-blue-600 mt-0.5 font-medium">{{ leader.display_role }}</p>
            </div>
          </RouterLink>
        </div>

        <div v-else class="text-center py-12">
          <p class="text-5xl mb-4">✝️</p>
          <h3 class="text-lg font-semibold text-gray-600 mb-2">Leadership coming soon</h3>
          <p class="text-gray-400 text-sm mb-6">Our leadership team will be listed here.</p>
        </div>

        <div class="text-center mt-10">
          <RouterLink to="/leadership" class="btn-primary">Meet All Our Leaders →</RouterLink>
        </div>
      </div>
    </section>

    <TestimonialsSection />
    <NewsletterSection />

    <!-- Announcement detail Modal -->
    <Modal v-model="showModal" :title="selectedAnn ? selectedAnn.title : ''" size="md">
      <div v-if="selectedAnn">
        <div class="flex items-center gap-2 mb-4 flex-wrap">
          <span v-if="selectedAnn.is_pinned"
            class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            📌 Pinned
          </span>
          <span v-if="selectedAnn.priority === 'urgent'"
            class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
            🚨 Urgent
          </span>
          <span v-if="selectedAnn.priority === 'high'"
            class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
            ⚡ High Priority
          </span>
          <span class="text-xs text-gray-400 ml-auto">{{ modalDate }}</span>
        </div>

        <div class="text-gray-700 leading-relaxed text-sm whitespace-pre-line mb-4">
          {{ selectedAnn.content || 'No additional details provided.' }}
        </div>

        <div v-if="selectedAnn.pdf_file_url" class="mt-4 pt-4 border-t border-gray-100">
          <a :href="selectedAnn.pdf_file_url" target="_blank" rel="noopener"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-semibold text-sm hover:bg-blue-100 transition-colors">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Download PDF Attachment
          </a>
        </div>

        <div class="mt-5 pt-4 border-t border-gray-100 text-center">
          <RouterLink to="/announcements"
            class="text-sm text-blue-700 font-semibold hover:underline"
            @click="showModal = false">
            View all announcements →
          </RouterLink>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import eventService        from '@/services/eventService'
import sermonService       from '@/services/sermonService'
import announcementService from '@/services/announcementService'
import donationService     from '@/services/donationService'
import leadershipService   from '@/services/leadershipService'

import HeroSlider          from '@/components/home/HeroSlider.vue'
import StatsSection        from '@/components/home/StatsSection.vue'
import MinistriesPreview   from '@/components/home/MinistriesPreview.vue'
import TestimonialsSection from '@/components/home/TestimonialsSection.vue'
import NewsletterSection   from '@/components/home/NewsletterSection.vue'
import SectionTitle        from '@/components/common/SectionTitle.vue'
import EventCard           from '@/components/home/EventCard.vue'
import SermonCard          from '@/components/home/SermonCard.vue'
import AnnouncementCard    from '@/components/home/AnnouncementCard.vue'
import DonationCard        from '@/components/home/DonationCard.vue'
import Modal               from '@/components/common/Modal.vue'

const upcomingEvents       = ref([])
const latestSermons        = ref([])
const recentAnnouncements  = ref([])
const campaigns            = ref([])
const leaders              = ref([])

const eventsLoading        = ref(true)
const sermonsLoading       = ref(true)
const announcementsLoading = ref(true)
const donationsLoading     = ref(true)
const leadersLoading       = ref(true)

const showModal   = ref(false)
const selectedAnn = ref(null)

const defaultGiving = [
  { icon: '🏛️', title: 'Tithe', desc: 'Support the global mission of the Seventh-day Adventist Church through your faithful tithe.' },
  { icon: '❤️', title: 'Local Church Budget', desc: 'Help cover church operational needs and local ministry programs.' },
  { icon: '🌍', title: 'Community Outreach', desc: 'Fund community service, health programs, and evangelism initiatives.' },
]

async function loadEvents() {
  eventsLoading.value = true
  try {
    // Try upcoming first; if empty, fall back to all events so admin-created content always shows
    let res = await eventService.getUpcoming({ page_size: 3 })
    let list = res.results ?? res
    if (!Array.isArray(list) || list.length === 0) {
      res = await eventService.getAll({ page_size: 3, ordering: '-start_date' })
      list = res.results ?? res
    }
    upcomingEvents.value = Array.isArray(list) ? list.slice(0, 3) : []
  } catch (e) {
    console.warn('Events fetch failed:', e?.detail || e)
    upcomingEvents.value = []
  } finally {
    eventsLoading.value = false
  }
}

async function loadSermons() {
  sermonsLoading.value = true
  try {
    const res = await sermonService.getAll({ page_size: 3, ordering: '-preach_date' })
    const list = res.results ?? res
    latestSermons.value = Array.isArray(list) ? list.slice(0, 3) : []
  } catch (e) {
    console.warn('Sermons fetch failed:', e?.detail || e)
    latestSermons.value = []
  } finally {
    sermonsLoading.value = false
  }
}

async function loadAnnouncements() {
  announcementsLoading.value = true
  try {
    const res = await announcementService.getAll({ page_size: 6 })
    const list = res?.results ?? res
    recentAnnouncements.value = Array.isArray(list) ? list : []
  } catch (e) {
    console.warn('Announcements fetch failed:', e?.detail || e?.message || e)
    recentAnnouncements.value = []
  } finally {
    announcementsLoading.value = false
  }
}

const pinnedAnnouncements = computed(() =>
  recentAnnouncements.value.filter(a => a.is_pinned).slice(0, 2)
)
const unpinnedAnnouncements = computed(() =>
  recentAnnouncements.value.filter(a => !a.is_pinned).slice(0, 4)
)

const modalDate = computed(() => {
  if (!selectedAnn.value) return ''
  const raw = selectedAnn.value.announcement_date
    || selectedAnn.value.created_at
    || selectedAnn.value.publish_date
  if (!raw) return ''
  try {
    return new Date(raw).toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    })
  } catch { return '' }
})

async function loadCampaigns() {
  donationsLoading.value = true
  try {
    const res = await donationService.getCampaigns()
    const list = res.results ?? res
    campaigns.value = Array.isArray(list) ? list.slice(0, 3) : []
  } catch (e) {
    console.warn('Campaigns fetch failed:', e?.detail || e)
    campaigns.value = []
  } finally {
    donationsLoading.value = false
  }
}

async function loadLeaders() {
  leadersLoading.value = true
  try {
    const res = await leadershipService.getAll({ page_size: 6 })
    const list = res.results ?? res
    leaders.value = Array.isArray(list) ? list.slice(0, 6) : []
  } catch (e) {
    console.warn('Leaders fetch failed:', e?.detail || e)
    leaders.value = []
  } finally {
    leadersLoading.value = false
  }
}

onMounted(() => {
  loadEvents()
  loadSermons()
  loadAnnouncements()
  loadCampaigns()
  loadLeaders()
})

function openAnnouncement(ann) {
  selectedAnn.value = ann
  showModal.value   = true
}

const coreValues = [
  'Biblical Truth', 'Sabbath Worship',
  'Whole-Person Health', 'Community Service',
  'Global Mission', 'Family Ministry',
]
</script>
