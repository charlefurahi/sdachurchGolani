<template>
  <div>
    <div class="relative pt-24 pb-16 bg-gradient-to-br from-navy-900 via-primary-800 to-navy-900 overflow-hidden">
      <div class="absolute inset-0 bg-hero-pattern opacity-20"></div>
      <div class="container-custom relative z-10 text-center">
        <p class="section-tag text-gold-300 mb-3">Get in Touch</p>
        <h1 class="font-heading text-4xl md:text-5xl font-bold text-white mb-3">Contact Us</h1>
        <div class="divider-gold-center mb-4"></div>
        <p class="text-blue-200 max-w-xl mx-auto">We'd love to hear from you. Reach out for prayer, information, or to connect with our church family.</p>
      </div>
    </div>

    <section class="section bg-white dark:bg-navy-900">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Contact Form -->
          <div class="lg:col-span-2">
            <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white mb-6">Send Us a Message</h2>
            <form @submit.prevent="submitForm" class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label class="label">First Name *</label><input v-model="form.firstName" class="input" required /></div>
                <div><label class="label">Last Name *</label><input v-model="form.lastName" class="input" required /></div>
              </div>
              <div><label class="label">Email Address *</label><input v-model="form.email" type="email" class="input" required /></div>
              <div><label class="label">Phone Number</label><input v-model="form.phone" type="tel" class="input" /></div>
              <div>
                <label class="label">Subject *</label>
                <select v-model="form.subject" class="select" required>
                  <option value="">Select a subject...</option>
                  <option>General Inquiry</option>
                  <option>Prayer Request</option>
                  <option>Baptismal Classes</option>
                  <option>Pastoral Appointment</option>
                  <option>Event Information</option>
                  <option>Membership Transfer</option>
                  <option>Volunteer / Ministry</option>
                </select>
              </div>
              <div><label class="label">Message *</label><textarea v-model="form.message" class="textarea" rows="5" required placeholder="How can we help you?"></textarea></div>
              <div class="flex items-center gap-3">
                <input v-model="form.prayerRequest" type="checkbox" id="prayer" class="w-4 h-4 accent-primary-600" />
                <label for="prayer" class="text-sm text-gray-600 dark:text-gray-300">This is a prayer request (handled with confidentiality)</label>
              </div>
              <button type="submit" :disabled="sending" class="btn-primary btn-lg w-full sm:w-auto">
                {{ sending ? 'Sending...' : sent ? 'Message Sent! 🙏' : 'Send Message' }}
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="space-y-6">
            <div>
              <h3 class="font-heading text-xl font-bold text-navy-800 dark:text-white mb-5">Contact Information</h3>
              <div class="space-y-4">
                <div v-for="info in contactInfo" :key="info.label" class="flex items-start gap-4 p-4 bg-gray-50 dark:bg-navy-800 rounded-xl">
                  <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{{ info.icon }}</div>
                  <div>
                    <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">{{ info.label }}</p>
                    <p class="text-sm text-navy-800 dark:text-white" v-html="info.value"></p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Social -->
            <div>
              <h3 class="font-semibold text-navy-800 dark:text-white mb-3 text-sm">Follow Us</h3>
              <div class="flex flex-wrap gap-2">
                <a v-for="social in socials" :key="social.name" :href="social.href"
                  class="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-navy-800 hover:bg-primary-50 dark:hover:bg-navy-700 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-gold-400 transition-colors">
                  <span>{{ social.icon }}</span> {{ social.name }}
                </a>
              </div>
            </div>

            <!-- Map -->
            <div>
              <h3 class="font-semibold text-navy-800 dark:text-white mb-3 text-sm">Location</h3>
              <div class="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-navy-800 dark:to-navy-700 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-navy-600">
                <div class="text-center text-gray-400">
                  <div class="text-3xl mb-2">🗺️</div>
                  <p class="text-xs">Map — Add Google Maps API key</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQs -->
    <section class="section bg-gray-50 dark:bg-navy-950">
      <div class="container-custom max-w-3xl">
        <SectionTitle tag="FAQs" title="Frequently Asked Questions" />
        <div class="space-y-3">
          <div v-for="faq in faqs" :key="faq.id" class="card overflow-hidden">
            <button @click="toggle(faq.id)" class="w-full text-left px-6 py-4 flex items-center justify-between gap-4">
              <span class="font-medium text-navy-800 dark:text-white text-sm">{{ faq.question }}</span>
              <span :class="['text-gray-400 transition-transform duration-200 flex-shrink-0', openFaq === faq.id ? 'rotate-180' : '']">▾</span>
            </button>
            <Transition name="fade-up">
              <div v-if="openFaq === faq.id" class="px-6 pb-4">
                <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{{ faq.answer }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { faqs } from '@/data/index.js'
import SectionTitle from '@/components/common/SectionTitle.vue'

const openFaq = ref(null)
const sending = ref(false)
const sent = ref(false)
const form = ref({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '', prayerRequest: false })

function toggle(id) { openFaq.value = openFaq.value === id ? null : id }

async function submitForm() {
  sending.value = true
  await new Promise(r => setTimeout(r, 1500))
  sending.value = false
  sent.value = true
  setTimeout(() => sent.value = false, 5000)
}

const contactInfo = [
  { icon: '📍', label: 'Address', value: 'Golani Road, off Uhuru Highway<br>P.O. Box 1234, Nairobi, Kenya' },
  { icon: '📞', label: 'Phone', value: '+254 700 000 100' },
  { icon: '✉️', label: 'Email', value: 'info@golanisda.org' },
  { icon: '🕐', label: 'Office Hours', value: 'Mon–Fri: 8:00 AM – 5:00 PM<br>Saturday: 8:00 AM – 2:00 PM' }
]

const socials = [
  { name: 'Facebook', icon: 'f', href: '#' },
  { name: 'YouTube', icon: '▶', href: '#' },
  { name: 'WhatsApp', icon: '💬', href: '#' },
  { name: 'Instagram', icon: '◎', href: '#' }
]
</script>
