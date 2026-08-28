<template>
  <div>
    <div class="page-hero">
      <div class="page-hero__inner">
        <div class="container-custom text-center">
          <p class="section-tag text-blue-400 mb-3">Get in Touch</p>
          <h1 class="font-heading text-4xl md:text-5xl font-bold text-white mb-3">Contact Us</h1>
          <div class="divider-blue-center mb-4"></div>
          <p class="text-blue-200 max-w-xl mx-auto">We'd love to hear from you. Reach out for prayer, information, or to connect with our church family.</p>
        </div>
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
              <div class="flex flex-wrap gap-3">
                <a v-for="social in socials" :key="social.name" :href="social.href" target="_blank" rel="noopener"
                  class="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-gray-100 dark:border-navy-700 bg-white dark:bg-navy-800 hover:border-yellow-400 dark:hover:border-yellow-500 hover:shadow-md transition-all duration-200">
                  <!-- Social logo SVG — unified brand yellow -->
                  <span class="w-5 h-5 flex-shrink-0 flex items-center justify-center text-yellow-500">
                    <!-- Facebook -->
                    <svg v-if="social.icon === 'facebook'" viewBox="0 0 24 24" fill="none" class="w-5 h-5">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor"/>
                    </svg>
                    <!-- YouTube -->
                    <svg v-else-if="social.icon === 'youtube'" viewBox="0 0 24 24" fill="none" class="w-5 h-5">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor"/>
                    </svg>
                    <!-- WhatsApp -->
                    <svg v-else-if="social.icon === 'whatsapp'" viewBox="0 0 24 24" fill="none" class="w-5 h-5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" fill="currentColor"/>
                    </svg>
                    <!-- Instagram -->
                    <svg v-else-if="social.icon === 'instagram'" viewBox="0 0 24 24" fill="none" class="w-5 h-5">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" fill="currentColor"/>
                    </svg>
                    <!-- TikTok -->
                    <svg v-else-if="social.icon === 'tiktok'" viewBox="0 0 24 24" fill="none" class="w-5 h-5">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" fill="currentColor"/>
                    </svg>
                    <!-- Twitter/X -->
                    <svg v-else-if="social.icon === 'twitter'" viewBox="0 0 24 24" fill="none" class="w-5 h-5">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
                    </svg>
                  </span>
                  <span class="text-sm font-semibold text-navy-800 dark:text-white">{{ social.name }}</span>
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
import contactService from '@/services/contactService.js'

const openFaq = ref(null)
const sending = ref(false)
const sent = ref(false)
const error = ref(null)
const form = ref({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '', prayerRequest: false })

function toggle(id) { openFaq.value = openFaq.value === id ? null : id }

async function submitForm() {
  sending.value = true
  error.value = null
  try {
    await contactService.send({
      first_name:      form.value.firstName,
      last_name:       form.value.lastName,
      email:           form.value.email,
      phone:           form.value.phone,
      subject:         form.value.subject,
      message:         form.value.message,
      is_prayer_request: form.value.prayerRequest,
    })
    sent.value = true
    form.value = { firstName: '', lastName: '', email: '', phone: '', subject: '', message: '', prayerRequest: false }
    setTimeout(() => sent.value = false, 5000)
  } catch (err) {
    error.value = 'Failed to send message. Please try again.'
  } finally {
    sending.value = false
  }
}

const contactInfo = [
  { icon: '📍', label: 'Address', value: 'Golani Road, off Uhuru Highway<br>P.O. Box 1234, Nairobi, Kenya' },
  { icon: '📞', label: 'Phone', value: '+254 700 000 100' },
  { icon: '✉️', label: 'Email', value: 'info@golanisda.org' },
  { icon: '🕐', label: 'Office Hours', value: 'Mon–Fri: 8:00 AM – 5:00 PM<br>Saturday: 8:00 AM – 2:00 PM' }
]

const socials = [
  { name: 'Facebook',  icon: 'facebook',  href: '#' },
  { name: 'YouTube',   icon: 'youtube',   href: '#' },
  { name: 'WhatsApp',  icon: 'whatsapp',  href: '#' },
  { name: 'Instagram', icon: 'instagram', href: '#' },
  { name: 'TikTok',    icon: 'tiktok',    href: '#' },
  { name: 'Twitter/X', icon: 'twitter',   href: '#' },
]
</script>
