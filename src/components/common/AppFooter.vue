<template>
  <footer class="bg-navy-900 text-gray-300">
    <!-- Main Footer -->
    <div class="container-custom py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-11 h-11 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center">
              <span class="text-white font-accent font-bold text-xl">G</span>
            </div>
            <div>
              <p class="font-accent font-bold text-white text-lg">GolaniSDA</p>
              <p class="text-gold-400 text-xs">House of Faith</p>
            </div>
          </div>
          <p class="text-sm text-gray-400 leading-relaxed mb-5">"To make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit." — Matthew 28:19</p>
          <div class="flex gap-3">
            <a v-for="social in socials" :key="social.name" :href="social.href" :aria-label="social.name"
              class="w-9 h-9 rounded-lg bg-navy-800 hover:bg-gold-500 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200">
              <span class="text-base">{{ social.icon }}</span>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-white mb-5 text-sm tracking-wider uppercase">Quick Links</h4>
          <ul class="space-y-2.5">
            <li v-for="link in quickLinks" :key="link.to">
              <RouterLink :to="link.to" class="text-sm text-gray-400 hover:text-gold-400 transition-colors flex items-center gap-2">
                <span class="text-gold-500 text-xs">›</span>{{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Service Times -->
        <div>
          <h4 class="font-semibold text-white mb-5 text-sm tracking-wider uppercase">Service Times</h4>
          <ul class="space-y-3">
            <li v-for="svc in services" :key="svc.name" class="text-sm">
              <p class="text-white font-medium">{{ svc.name }}</p>
              <p class="text-gray-400">{{ svc.time }}</p>
            </li>
          </ul>
          <div class="mt-5 pt-5 border-t border-navy-700">
            <p class="text-xs text-gray-500 uppercase tracking-wide mb-2">Location</p>
            <p class="text-sm text-gray-300">Golani Road, off Uhuru Highway</p>
            <p class="text-sm text-gray-400">P.O. Box 1234, Nairobi, Kenya</p>
          </div>
        </div>

        <!-- Contact & Newsletter -->
        <div>
          <h4 class="font-semibold text-white mb-5 text-sm tracking-wider uppercase">Stay Connected</h4>
          <div class="space-y-2 mb-6 text-sm">
            <p class="text-gray-400"><span class="text-gold-400">📞</span> +254 700 000 100</p>
            <p class="text-gray-400"><span class="text-gold-400">✉️</span> info@golanisda.org</p>
          </div>
          <p class="text-sm text-gray-400 mb-3">Subscribe to our newsletter for weekly updates.</p>
          <form @submit.prevent="subscribe" class="flex gap-2">
            <input v-model="email" type="email" placeholder="Your email" required
              class="flex-1 px-3 py-2.5 rounded-xl bg-navy-800 border border-navy-600 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors" />
            <button type="submit" class="px-4 py-2.5 bg-gold-500 hover:bg-gold-600 text-white rounded-xl text-sm font-medium transition-colors">→</button>
          </form>
          <p v-if="subscribed" class="text-gold-400 text-xs mt-2">Thank you for subscribing!</p>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-navy-800">
      <div class="container-custom py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <p>© {{ new Date().getFullYear() }} GolaniSDA Church. All rights reserved.</p>
        <p>Affiliated with the <span class="text-gold-400">Seventh-day Adventist Church</span></p>
        <div class="flex gap-4">
          <RouterLink to="/about" class="hover:text-gray-300 transition-colors">Privacy Policy</RouterLink>
          <RouterLink to="/about" class="hover:text-gray-300 transition-colors">Terms of Use</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const email = ref('')
const subscribed = ref(false)

function subscribe() {
  if (email.value) {
    subscribed.value = true
    email.value = ''
    setTimeout(() => subscribed.value = false, 5000)
  }
}

const socials = [
  { name: 'Facebook', href: '#', icon: 'f' },
  { name: 'YouTube', href: '#', icon: '▶' },
  { name: 'WhatsApp', href: '#', icon: 'w' },
  { name: 'Instagram', href: '#', icon: '◎' }
]

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/sermons', label: 'Sermons' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/give', label: 'Give / Donate' },
  { to: '/contact', label: 'Contact' },
  { to: '/auth/login', label: 'Member Login' }
]

const services = [
  { name: 'Sabbath School', time: 'Saturday, 9:00 AM' },
  { name: 'Divine Worship', time: 'Saturday, 11:00 AM' },
  { name: 'Adventist Youth', time: 'Saturday, 4:30 PM' },
  { name: 'Prayer Meeting', time: 'Wednesday, 6:00 PM' }
]
</script>
