<template>
  <div>
    <!-- Hero Banner -->
    <div class="page-hero">
      <div class="page-hero__inner">
        <div class="container-custom text-center">
          <p class="section-tag text-blue-400 mb-3">Our Team</p>
          <h1 class="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Church Leadership</h1>
          <div class="divider-blue-center mb-6"></div>
          <p class="text-lg text-blue-200 max-w-2xl mx-auto leading-relaxed">
            Dedicated servants called to shepherd, serve, and guide the GolaniSDA family in faith and love.
          </p>
        </div>
      </div>
    </div>

    <!-- Leaders Grid -->
    <section class="section bg-gray-50 dark:bg-navy-950">
      <div class="container-custom">

        <!-- Loading skeleton -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="n in 8" :key="n" class="card animate-pulse">
            <div class="h-56 bg-gray-200 dark:bg-navy-700 rounded-t-2xl"></div>
            <div class="p-5 space-y-3">
              <div class="h-4 bg-gray-200 dark:bg-navy-700 rounded w-3/4 mx-auto"></div>
              <div class="h-3 bg-gray-200 dark:bg-navy-700 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="text-center py-16">
          <svg class="mx-auto mb-4 h-10 w-10 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" d="M12 8v5m0 3h.01"/></svg>
          <p class="text-gray-500 dark:text-gray-400">{{ error }}</p>
          <button @click="loadLeaders" class="btn-primary mt-6">Try Again</button>
        </div>

        <!-- Empty state -->
        <div v-else-if="!leaders.length" class="text-center py-16">
          <svg class="mx-auto mb-4 h-10 w-10 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path stroke-linecap="round" d="M12 3v18M5 9h14"/></svg>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Coming Soon</h3>
          <p class="text-gray-500 dark:text-gray-400">Leadership information will be added soon.</p>
        </div>

        <!-- Leaders grouped by role category -->
        <div v-else>
          <!-- Pastoral Ministry -->
          <div v-if="pastors.length" class="mb-14">
            <div class="flex items-center gap-4 mb-6">
              <div class="h-px bg-blue-600/40 flex-1"></div>
              <h2 class="text-2xl font-heading font-bold text-navy-800 dark:text-white px-4">Pastoral Ministry</h2>
              <div class="h-px bg-blue-600/40 flex-1"></div>
            </div>
            <div class="flex justify-center">
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl w-full">
                <LeaderCard v-for="leader in pastors" :key="leader.id" :leader="leader" featured @inquire="openInquiry" />
              </div>
            </div>
          </div>

          <!-- Board of Elders -->
          <div v-if="elders.length" class="mb-14">
            <div class="flex items-center gap-4 mb-6">
              <div class="h-px bg-gray-300 dark:bg-navy-600 flex-1"></div>
              <h2 class="text-2xl font-heading font-bold text-navy-800 dark:text-white px-4">Board of Elders</h2>
              <div class="h-px bg-gray-300 dark:bg-navy-600 flex-1"></div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <LeaderCard v-for="leader in elders" :key="leader.id" :leader="leader" @inquire="openInquiry" />
            </div>
          </div>

          <!-- Administrative Officers -->
          <div v-if="admins.length" class="mb-14">
            <div class="flex items-center gap-4 mb-6">
              <div class="h-px bg-gray-300 dark:bg-navy-600 flex-1"></div>
              <h2 class="text-2xl font-heading font-bold text-navy-800 dark:text-white px-4">Administrative Officers</h2>
              <div class="h-px bg-gray-300 dark:bg-navy-600 flex-1"></div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <LeaderCard v-for="leader in admins" :key="leader.id" :leader="leader" @inquire="openInquiry" />
            </div>
          </div>

          <!-- Deacons & Deaconesses -->
          <div v-if="deacons.length" class="mb-14">
            <div class="flex items-center gap-4 mb-6">
              <div class="h-px bg-gray-300 dark:bg-navy-600 flex-1"></div>
              <h2 class="text-2xl font-heading font-bold text-navy-800 dark:text-white px-4">Deacons &amp; Deaconesses</h2>
              <div class="h-px bg-gray-300 dark:bg-navy-600 flex-1"></div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <LeaderCard v-for="leader in deacons" :key="leader.id" :leader="leader" @inquire="openInquiry" />
            </div>
          </div>

          <!-- Youth & Ministry Leaders -->
          <div v-if="ministryLeaders.length" class="mb-14">
            <div class="flex items-center gap-4 mb-6">
              <div class="h-px bg-gray-300 dark:bg-navy-600 flex-1"></div>
              <h2 class="text-2xl font-heading font-bold text-navy-800 dark:text-white px-4">Ministry Leaders</h2>
              <div class="h-px bg-gray-300 dark:bg-navy-600 flex-1"></div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <LeaderCard v-for="leader in ministryLeaders" :key="leader.id" :leader="leader" @inquire="openInquiry" />
            </div>
          </div>

          <!-- Other Leaders -->
          <div v-if="others.length" class="mb-14">
            <div class="flex items-center gap-4 mb-6">
              <div class="h-px bg-gray-300 dark:bg-navy-600 flex-1"></div>
              <h2 class="text-2xl font-heading font-bold text-navy-800 dark:text-white px-4">Other Officers</h2>
              <div class="h-px bg-gray-300 dark:bg-navy-600 flex-1"></div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <LeaderCard v-for="leader in others" :key="leader.id" :leader="leader" @inquire="openInquiry" />
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Scripture Quote -->
    <section class="section leadership-quote">
      <div class="container-custom text-center text-white">
        <p class="text-xl md:text-2xl font-heading italic text-blue-200 max-w-3xl mx-auto leading-relaxed mb-4">
          "The elders who direct the affairs of the church well are worthy of double honor, especially those whose work is preaching and teaching."
        </p>
        <p class="text-blue-500 font-semibold">— 1 Timothy 5:17</p>
      </div>
    </section>

    <!-- ── Inquiry / Contact Modal ───────────────────────────────────────── -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showInquiry" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" @click.self="closeInquiry">
          <div class="bg-white dark:bg-navy-800 rounded-2xl shadow-2xl w-full max-w-md">
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-navy-700">
              <div>
                <h2 class="font-bold text-navy-800 dark:text-white">Contact Leader</h2>
                <p v-if="inquiryTarget" class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Sending to: {{ inquiryTarget.full_name }} ({{ inquiryTarget.display_role }})</p>
              </div>
              <button @click="closeInquiry" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors">✕</button>
            </div>

            <!-- Success state -->
            <div v-if="inquirySent" class="p-8 text-center">
              <svg class="mx-auto mb-3 h-10 w-10 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" stroke-linejoin="round" d="m8 12 2.5 2.5L16 9"/></svg>
              <h3 class="font-bold text-navy-800 dark:text-white mb-2">Message Sent!</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Your message has been sent. We'll get back to you soon.</p>
              <button @click="closeInquiry" class="btn-primary mt-6">Close</button>
            </div>

            <!-- Form -->
            <form v-else class="p-6 space-y-4" @submit.prevent="sendInquiry">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name *</label>
                <input v-model="inquiryForm.name" required class="input w-full" placeholder="Full name" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Email *</label>
                <input v-model="inquiryForm.email" type="email" required class="input w-full" placeholder="your@email.com" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone (optional)</label>
                <input v-model="inquiryForm.phone" class="input w-full" placeholder="+255 7xx xxx xxx" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message *</label>
                <textarea v-model="inquiryForm.message" rows="4" required class="textarea w-full" placeholder="How can we help you?"></textarea>
              </div>
              <p v-if="inquiryError" class="text-sm text-red-500">{{ inquiryError }}</p>
              <div class="flex gap-3">
                <button type="submit" :disabled="sendingInquiry" class="btn-primary flex-1">
                  {{ sendingInquiry ? 'Sending…' : 'Send Message' }}
                </button>
                <button type="button" @click="closeInquiry" class="btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import leadershipService from '@/services/leadershipService'
import contactService from '@/services/contactService'
import LeaderCard from '@/components/leadership/LeaderCard.vue'
import { leadership } from '@/data/leadership'

// ── Data ─────────────────────────────────────────────────────────────────
const leaders  = ref([])
const loading  = ref(true)
const error    = ref(null)

const pastors         = computed(() => leaders.value.filter(l => l.role === 'pastor'))
const elders          = computed(() => leaders.value.filter(l => l.role === 'elder'))
const admins          = computed(() => leaders.value.filter(l => ['treasurer','secretary'].includes(l.role)))
const deacons         = computed(() => leaders.value.filter(l => ['deacon','deaconess','head_deacon'].includes(l.role)))
const ministryLeaders = computed(() => leaders.value.filter(l => ['youth_leader','women_ministry'].includes(l.role)))
// Catch-all: role === 'other' AND any leader whose role doesn't match one of
// the known categories above (so nobody silently disappears from the page).
const others          = computed(() => leaders.value.filter(l =>
  !['pastor','elder','treasurer','secretary','deacon','deaconess','head_deacon','youth_leader','women_ministry'].includes(l.role)
))

// removed: const error = ref(null)

async function loadLeaders() {
  loading.value = true
  try {
    const res = await leadershipService.getAll()
    const list = res.results ?? res
    const results = Array.isArray(list) ? list : []
    leaders.value = results
  } catch (e) {
    console.warn('Unable to load leadership from API. Using demo data.', e)
    leaders.value = leadership
  } finally {
    loading.value = false
  }
}

// ── Inquiry modal ─────────────────────────────────────────────────────────
const showInquiry   = ref(false)
const inquiryTarget = ref(null)
const inquirySent   = ref(false)
const sendingInquiry = ref(false)
const inquiryError  = ref(null)

const inquiryForm = ref({ name: '', email: '', phone: '', message: '' })

function openInquiry(leader) {
  inquiryTarget.value = leader
  inquirySent.value   = false
  inquiryError.value  = null
  inquiryForm.value   = { name: '', email: '', phone: '', message: '' }
  showInquiry.value   = true
}

function closeInquiry() {
  showInquiry.value = false
  inquiryTarget.value = null
}

async function sendInquiry() {
  sendingInquiry.value = true
  inquiryError.value = null
  try {
    const payload = {
      name:    inquiryForm.value.name,
      email:   inquiryForm.value.email,
      phone:   inquiryForm.value.phone,
      subject: `Inquiry for ${inquiryTarget.value?.full_name || 'Church Leader'}`,
      message: inquiryForm.value.message,
    }
    await contactService.send(payload)
    inquirySent.value = true
  } catch (e) {
    inquiryError.value = e?.detail || e?.message || 'Failed to send message. Please try again.'
  } finally {
    sendingInquiry.value = false
  }
}

onMounted(loadLeaders)
</script>

<style scoped>
.leadership-quote { background: #edf3f3; color: var(--color-text-main); }
.leadership-quote p:first-child { color: var(--color-footer); }
.leadership-quote p:last-child { color: #98700f; }
:global(.dark) .leadership-quote { background:var(--color-bg-alt); }
:global(.dark) .leadership-quote p:first-child { color:#f2f6f8; }
:global(.dark) .leadership-quote p:last-child { color:#f4d03f; }
</style>
