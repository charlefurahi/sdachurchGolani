<template>
  <div>
    <!-- Loading state -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-700 animate-spin mx-auto mb-4"></div>
        <p class="text-gray-500 dark:text-gray-400">Loading profile…</p>
      </div>
    </div>

    <!-- Error / Not found -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center">
      <div class="text-center px-4">
        <p class="text-6xl mb-4">⚠️</p>
        <h2 class="text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">Profile not found</h2>
        <p class="text-gray-500 dark:text-gray-400 mb-6">{{ error }}</p>
        <RouterLink to="/leadership" class="btn-primary">← Back to Leadership</RouterLink>
      </div>
    </div>

    <!-- Profile content -->
    <template v-else-if="leader">
      <!-- Hero banner -->
      <div class="page-hero">
        <div class="page-hero__inner">
          <div class="container-custom text-center">
            <RouterLink to="/leadership"
              class="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm font-medium mb-4 transition-colors">
              ← All Leaders
            </RouterLink>
            <p class="section-tag text-blue-400 mb-2">{{ leader.display_role }}</p>
            <h1 class="font-heading text-4xl md:text-5xl font-bold text-white mb-3">{{ leader.full_name }}</h1>
            <div class="divider-blue-center mb-0"></div>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <section class="section bg-gray-50 dark:bg-navy-950">
        <div class="container-custom">
          <div class="max-w-4xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

              <!-- Left: Photo + quick info -->
              <div class="md:col-span-1">
                <div class="card overflow-hidden sticky top-24">
                  <!-- Photo -->
                  <div class="relative h-72 bg-gradient-to-br from-navy-700 to-primary-900 overflow-hidden">
                    <img
                      v-if="leader.photo_url && !photoFailed"
                      :src="leader.photo_url"
                      :alt="leader.full_name"
                      class="absolute inset-0 w-full h-full object-cover object-top"
                      @error="photoFailed = true"
                    />
                    <div v-else class="absolute inset-0 flex items-center justify-center">
                      <div class="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                        <span class="text-4xl font-bold text-white">{{ initials }}</span>
                      </div>
                    </div>
                    <!-- Role badge -->
                    <span :class="['absolute top-3 left-3 text-white text-xs font-bold px-3 py-1.5 rounded-full', roleColor]">
                      {{ leader.display_role }}
                    </span>
                  </div>

                  <!-- Contact quick links -->
                  <div class="p-5 space-y-3">
                    <h3 class="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-3">Contact</h3>

                    <a v-if="leader.email" :href="'mailto:' + leader.email"
                      class="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors group">
                      <span class="w-8 h-8 rounded-full bg-blue-50 dark:bg-navy-700 flex items-center justify-center text-base group-hover:bg-blue-100 transition-colors flex-shrink-0">✉️</span>
                      <span class="truncate">{{ leader.email }}</span>
                    </a>

                    <a v-if="leader.phone" :href="'tel:' + leader.phone"
                      class="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors group">
                      <span class="w-8 h-8 rounded-full bg-blue-50 dark:bg-navy-700 flex items-center justify-center text-base group-hover:bg-blue-100 transition-colors flex-shrink-0">📞</span>
                      <span>{{ leader.phone }}</span>
                    </a>

                    <div v-if="!leader.email && !leader.phone"
                      class="text-sm text-gray-400 dark:text-gray-500 italic">
                      Contact details not listed.
                    </div>

                    <div class="pt-2">
                      <button @click="showInquiry = true"
                        class="btn-primary w-full text-sm">
                        💬 Send a Message
                      </button>
                    </div>

                    <RouterLink to="/leadership"
                      class="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors pt-1">
                      ← All Leaders
                    </RouterLink>
                  </div>
                </div>
              </div>

              <!-- Right: Bio + details -->
              <div class="md:col-span-2 space-y-6">
                <!-- Name + role card -->
                <div class="card p-6">
                  <div class="flex items-start gap-4 mb-4">
                    <div class="flex-1">
                      <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white leading-tight">
                        {{ leader.full_name }}
                      </h2>
                      <p class="text-blue-700 dark:text-blue-400 font-semibold mt-1">{{ leader.display_role }}</p>
                    </div>
                  </div>
                  <div class="h-px bg-gray-100 dark:bg-navy-700 mb-4"></div>

                  <!-- Bio -->
                  <div v-if="leader.bio">
                    <h3 class="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-3">About</h3>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm">
                      {{ leader.bio }}
                    </p>
                  </div>
                  <div v-else class="text-gray-400 dark:text-gray-500 italic text-sm">
                    Bio coming soon.
                  </div>
                </div>

                <!-- Inquiry form card -->
                <div class="card p-6" id="inquiry">
                  <h3 class="font-heading font-bold text-navy-800 dark:text-white text-lg mb-1">
                    Get in Touch
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mb-5">
                    Send a message to {{ leader.full_name.split(' ')[0] }} and we'll get back to you.
                  </p>

                  <!-- Success -->
                  <div v-if="inquirySent" class="text-center py-6">
                    <div class="text-5xl mb-3">✅</div>
                    <h4 class="font-bold text-navy-800 dark:text-white mb-1">Message Sent!</h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400">We'll be in touch with you soon.</p>
                    <button @click="inquirySent = false" class="btn-outline mt-4 text-sm">Send another</button>
                  </div>

                  <!-- Form -->
                  <form v-else class="space-y-4" @submit.prevent="sendInquiry">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name *</label>
                        <input v-model="form.name" required class="input w-full" placeholder="Full name" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Email *</label>
                        <input v-model="form.email" type="email" required class="input w-full" placeholder="your@email.com" />
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone (optional)</label>
                      <input v-model="form.phone" class="input w-full" placeholder="+255 7xx xxx xxx" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message *</label>
                      <textarea v-model="form.message" rows="5" required class="textarea w-full"
                        :placeholder="`Write your message to ${leader.full_name.split(' ')[0]}…`"></textarea>
                    </div>
                    <p v-if="formError" class="text-sm text-red-500">{{ formError }}</p>
                    <div class="flex gap-3">
                      <button type="submit" :disabled="sending" class="btn-primary flex-1">
                        {{ sending ? 'Sending…' : 'Send Message' }}
                      </button>
                    </div>
                  </form>
                </div>

                <!-- Back nav -->
                <div class="text-center pb-4">
                  <RouterLink to="/leadership" class="btn-outline">
                    ← View All Leaders
                  </RouterLink>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <!-- Scripture footer -->
      <section class="section bg-primary-800 dark:bg-navy-900">
        <div class="container-custom text-center text-white">
          <p class="text-xl md:text-2xl font-heading italic text-blue-200 max-w-3xl mx-auto leading-relaxed mb-4">
            "The elders who direct the affairs of the church well are worthy of double honor, especially those whose work is preaching and teaching."
          </p>
          <p class="text-blue-500 font-semibold">— 1 Timothy 5:17</p>
        </div>
      </section>
    </template>

    <!-- Inquiry modal (mobile fallback from sidebar button) -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showInquiry"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          @click.self="showInquiry = false">
          <div class="bg-white dark:bg-navy-800 rounded-2xl shadow-2xl w-full max-w-md">
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-navy-700">
              <div>
                <h2 class="font-bold text-navy-800 dark:text-white">Send a Message</h2>
                <p v-if="leader" class="text-xs text-gray-400 mt-0.5">To: {{ leader.full_name }}</p>
              </div>
              <button @click="showInquiry = false"
                class="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors text-xl">✕</button>
            </div>
            <div class="p-6">
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Use the form below to reach {{ leader?.full_name?.split(' ')[0] }}.
              </p>
              <a href="#inquiry" @click="showInquiry = false"
                class="btn-primary w-full text-center block mt-3">
                Go to Contact Form ↓
              </a>
              <button @click="showInquiry = false" class="btn-outline w-full mt-2 text-sm">Cancel</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import leadershipService from '@/services/leadershipService'
import contactService    from '@/services/contactService'

const route      = useRoute()
const leader     = ref(null)
const loading    = ref(true)
const error      = ref(null)
const photoFailed = ref(false)
const showInquiry = ref(false)

// ── Computed helpers ─────────────────────────────────────────────────────
const initials = computed(() => {
  if (!leader.value) return '?'
  return leader.value.full_name
    .split(' ').slice(0, 2)
    .map(w => w[0]).join('').toUpperCase()
})

const roleColor = computed(() => {
  const map = {
    pastor:         'bg-yellow-500 !text-navy-900',
    elder:          'bg-navy-800',
    treasurer:      'bg-navy-700',
    secretary:      'bg-navy-600',
    deacon:         'bg-navy-800',
    deaconess:      'bg-navy-700',
    head_deacon:    'bg-navy-800',
    youth_leader:   'bg-yellow-600 !text-navy-900',
    women_ministry: 'bg-navy-700',
    other:          'bg-navy-600',
  }
  return map[leader.value?.role] || 'bg-navy-600'
})

// ── Fetch ────────────────────────────────────────────────────────────────
async function loadLeader() {
  loading.value = true
  error.value   = null
  try {
    const res  = await leadershipService.getById(route.params.id)
    leader.value = res?.data ?? res
    if (!leader.value?.id) throw new Error('Not found')
  } catch (e) {
    error.value = e?.response?.status === 404
      ? 'This leader profile does not exist.'
      : 'Unable to load profile. Please try again.'
    console.error('LeaderDetail fetch error:', e)
  } finally {
    loading.value = false
  }
}

// ── Inquiry form ─────────────────────────────────────────────────────────
const form      = ref({ name: '', email: '', phone: '', message: '' })
const sending   = ref(false)
const inquirySent = ref(false)
const formError = ref(null)

async function sendInquiry() {
  sending.value = true
  formError.value = null
  try {
    await contactService.send({
      name:    form.value.name,
      email:   form.value.email,
      phone:   form.value.phone,
      subject: `Message for ${leader.value?.full_name || 'Church Leader'}`,
      message: form.value.message,
    })
    inquirySent.value = true
    form.value = { name: '', email: '', phone: '', message: '' }
  } catch (e) {
    formError.value = e?.detail || e?.message || 'Failed to send. Please try again.'
  } finally {
    sending.value = false
  }
}

onMounted(loadLeader)
</script>
