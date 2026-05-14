<template>
  <header :class="['fixed top-0 inset-x-0 z-50 transition-all duration-300',
    isScrolled ? 'bg-white/95 dark:bg-navy-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent']">
    <div class="container-custom">
      <nav class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-3 flex-shrink-0" @click="closeMenu">
          <div class="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-gold">
            <span class="font-accent text-white text-lg md:text-xl font-bold">G</span>
          </div>
          <div class="hidden xs:block">
            <p :class="['font-heading font-bold text-lg leading-tight transition-colors',
              isScrolled || !isHomePage ? 'text-navy-900 dark:text-white' : 'text-white text-shadow']">
              GolaniSDA
            </p>
            <p :class="['font-accent text-[10px] tracking-[0.2em] uppercase transition-colors',
              isScrolled || !isHomePage ? 'text-gold-600 dark:text-gold-400' : 'text-gold-300']">
              House of Faith
            </p>
          </div>
        </RouterLink>

        <!-- Desktop Nav -->
        <ul class="hidden lg:flex items-center gap-1">
          <li v-for="link in navLinks" :key="link.to">
            <RouterLink :to="link.to"
              :class="['nav-link px-3 py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-navy-800 transition-all',
                isScrolled || !isHomePage ? '' : 'text-white/90 hover:text-white hover:bg-white/10 dark:text-white/90']">
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>

        <!-- Right side -->
        <div class="flex items-center gap-2 md:gap-3">
          <ThemeToggle :light="!isScrolled && isHomePage" />
          <RouterLink to="/give" class="hidden md:flex btn btn-gold btn-sm animate-pulse-gold">
            Give Now
          </RouterLink>
          <!-- Mobile hamburger -->
          <button @click="toggleMenu" class="lg:hidden p-2 rounded-lg transition-colors"
            :class="isScrolled || !isHomePage ? 'text-navy-800 dark:text-white hover:bg-gray-100 dark:hover:bg-navy-800' : 'text-white hover:bg-white/10'"
            aria-label="Toggle menu">
            <div class="w-6 flex flex-col gap-1.5">
              <span :class="['h-0.5 bg-current transition-all duration-300 origin-center', isMenuOpen ? 'rotate-45 translate-y-2' : '']" />
              <span :class="['h-0.5 bg-current transition-all duration-300', isMenuOpen ? 'opacity-0 scale-x-0' : '']" />
              <span :class="['h-0.5 bg-current transition-all duration-300 origin-center', isMenuOpen ? '-rotate-45 -translate-y-2' : '']" />
            </div>
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile Menu -->
    <Transition name="slide-left">
      <div v-if="isMenuOpen" class="lg:hidden fixed inset-0 top-16 bg-white dark:bg-navy-900 z-50 overflow-y-auto">
        <div class="container-custom py-6">
          <ul class="flex flex-col gap-1">
            <li v-for="link in navLinks" :key="link.to">
              <RouterLink :to="link.to" @click="closeMenu"
                class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-navy-800 font-medium transition-colors">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
          <div class="mt-6 pt-6 border-t border-gray-100 dark:border-navy-700 flex flex-col gap-3">
            <RouterLink to="/give" @click="closeMenu" class="btn btn-gold w-full justify-center">Give Now</RouterLink>
            <RouterLink to="/auth/login" @click="closeMenu" class="btn btn-outline w-full justify-center">Sign In</RouterLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { isMenuOpen } = storeToRefs(appStore)
const { toggleMenu, closeMenu } = appStore

const route = useRoute()
const isScrolled = ref(false)
const isHomePage = computed(() => route.path === '/')

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
  { to: '/sermons', label: 'Sermons' },
  { to: '/announcements', label: 'Announcements' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' }
]

const handleScroll = () => { isScrolled.value = window.scrollY > 50 }
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
