<template>
  <footer class="bg-navy-900 text-gray-300">
    <!-- Main Footer -->
    <div class="container-custom py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center">
              <span class="font-accent text-white text-xl font-bold">G</span>
            </div>
            <div>
              <p class="font-heading text-white text-lg font-bold">GolaniSDA</p>
              <p class="font-accent text-gold-400 text-[10px] tracking-widest uppercase">House of Faith</p>
            </div>
          </div>
          <p class="text-sm leading-relaxed text-gray-400 mb-6">
            A community rooted in the Word of God, inspired by the Spirit, and united in mission to share the everlasting gospel.
          </p>
          <div class="flex gap-3">
            <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank"
              class="w-9 h-9 bg-navy-800 hover:bg-primary-500 rounded-lg flex items-center justify-center text-sm transition-all duration-200 hover:-translate-y-0.5">
              {{ social.icon }}
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-heading text-white text-lg font-semibold mb-5">Quick Links</h3>
          <ul class="space-y-2.5">
            <li v-for="link in quickLinks" :key="link.to">
              <RouterLink :to="link.to" class="text-sm text-gray-400 hover:text-gold-400 transition-colors flex items-center gap-2">
                <span class="text-gold-500 text-xs">›</span> {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Service Times -->
        <div>
          <h3 class="font-heading text-white text-lg font-semibold mb-5">Service Times</h3>
          <div class="space-y-4">
            <div v-for="service in serviceTimes" :key="service.name">
              <p class="text-sm font-semibold text-gold-400">{{ service.name }}</p>
              <p class="text-sm text-gray-400">{{ service.time }}</p>
            </div>
          </div>
          <div class="mt-6 p-4 bg-navy-800 rounded-xl">
            <p class="text-xs text-gray-400 mb-1">📍 Location</p>
            <p class="text-sm text-white">Golani Road, Nakuru</p>
            <p class="text-sm text-gray-400">Kenya</p>
          </div>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="font-heading text-white text-lg font-semibold mb-5">Stay Connected</h3>
          <p class="text-sm text-gray-400 mb-4">Receive our weekly devotional and church updates.</p>
          <form @submit.prevent="subscribe" class="flex flex-col gap-3">
            <input v-model="email" type="email" placeholder="Your email address"
              class="input bg-navy-800 border-navy-700 text-white placeholder-gray-500 text-sm" required />
            <button type="submit" class="btn btn-gold text-sm justify-center">
              Subscribe ✉️
            </button>
          </form>
          <p v-if="subscribed" class="text-green-400 text-xs mt-2">✓ Thank you for subscribing!</p>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-navy-800">
      <div class="container-custom py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p class="text-xs text-gray-500">
          © {{ new Date().getFullYear() }} GolaniSDA Church. All rights reserved.
        </p>
        <p class="text-xs text-gray-500 flex items-center gap-1">
          A proud member of the
          <a href="https://adventist.org" target="_blank" class="text-gold-400 hover:text-gold-300 transition-colors ml-1">
            Seventh-day Adventist Church
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const email = ref('')
const subscribed = ref(false)

const subscribe = () => { subscribed.value = true; email.value = '' }

const socials = [
  { name: 'Facebook', icon: 'f', url: '#' },
  { name: 'YouTube', icon: '▶', url: '#' },
  { name: 'WhatsApp', icon: '✆', url: '#' },
  { name: 'Twitter', icon: '𝕏', url: '#' }
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

const serviceTimes = [
  { name: 'Sabbath School', time: 'Saturday · 9:00 AM' },
  { name: 'Divine Worship', time: 'Saturday · 11:00 AM' },
  { name: 'Adventist Youth', time: 'Saturday · 4:30 PM' },
  { name: 'Prayer Meeting', time: 'Wednesday · 6:00 PM' }
]
</script>
