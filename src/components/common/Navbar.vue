<template>
  <header :class="['fixed top-0 inset-x-0 z-40 transition-all duration-500', isScrolled ? 'bg-white/95 dark:bg-navy-900/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5']">
    <div class="container-custom flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-3 group" @click="closeMenu">
        <div class="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-gold-400/50 transition-shadow">
          <span class="text-white font-accent font-bold text-xl">G</span>
        </div>
        <div>
          <p :class="['font-accent font-bold text-lg leading-none tracking-wide transition-colors', isScrolled ? 'text-navy-900 dark:text-white' : 'text-white']">GolaniSDA</p>
          <p :class="['text-xs leading-none mt-0.5 transition-colors', isScrolled ? 'text-gold-600 dark:text-gold-400' : 'text-gold-300']">House of Faith</p>
        </div>
      </RouterLink>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-1">
        <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to"
          :class="['px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200', isScrolled ? 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-gold-400 hover:bg-primary-50 dark:hover:bg-navy-800' : 'text-white/90 hover:text-white hover:bg-white/10']"
          active-class="!text-gold-500 dark:!text-gold-400 font-semibold">
          {{ link.label }}
        </RouterLink>
      </nav>

      <!-- Actions -->
      <div class="hidden lg:flex items-center gap-3">
        <ThemeToggle :light="!isScrolled" />
        <RouterLink to="/give" class="btn-gold btn-sm">Give Now</RouterLink>
      </div>

      <!-- Mobile Hamburger -->
      <div class="flex items-center gap-3 lg:hidden">
        <ThemeToggle :light="!isScrolled" />
        <button @click="toggleMenu" :class="['p-2 rounded-lg transition-colors', isScrolled ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-navy-800' : 'text-white hover:bg-white/10']" aria-label="Toggle menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="fade-up">
      <div v-if="isMenuOpen" class="lg:hidden bg-white dark:bg-navy-900 border-t border-gray-100 dark:border-navy-700 shadow-xl">
        <div class="container-custom py-4 space-y-1">
          <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to" @click="closeMenu"
            class="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-navy-800 hover:text-primary-600 dark:hover:text-gold-400 transition-colors"
            active-class="bg-primary-50 dark:bg-navy-800 !text-primary-600 dark:!text-gold-400">
            {{ link.label }}
          </RouterLink>
          <div class="pt-2 border-t border-gray-100 dark:border-navy-700">
            <RouterLink to="/give" @click="closeMenu" class="block btn-gold w-full text-center mt-2">Give Now</RouterLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import { useScroll } from '@/composables/useScroll'
import ThemeToggle from './ThemeToggle.vue'

const appStore = useAppStore()
const { isMenuOpen } = storeToRefs(appStore)
const { toggleMenu, closeMenu } = appStore
const { isScrolled } = useScroll()

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
  { to: '/sermons', label: 'Sermons' },
  { to: '/announcements', label: 'Announcements' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' }
]
</script>
