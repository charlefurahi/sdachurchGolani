<template>
  <section class="relative h-screen min-h-[600px] overflow-hidden">
    <!-- Slides -->
    <div v-for="(slide, index) in slides" :key="index"
      :class="['hero-slide', index === current ? 'active' : 'inactive']"
      :style="{ background: slide.gradient }">
      <!-- Pattern overlay -->
      <div class="absolute inset-0 bg-hero-pattern opacity-20"></div>
      <!-- Dark gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-navy-900/30 to-navy-900/80"></div>

      <!-- Decorative circle -->
      <div class="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full border border-white/5 hidden lg:block animate-float"></div>
      <div class="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 rounded-full border border-gold-500/10 hidden lg:block" style="animation: float 8s ease-in-out infinite reverse"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 h-full flex items-center">
      <div class="container-custom w-full">
        <Transition name="fade-up" mode="out-in">
          <div :key="current" class="max-w-3xl">
            <p class="section-tag text-gold-300 mb-4">{{ slides[current].tag }}</p>
            <h1 class="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-shadow">
              {{ slides[current].title }}
            </h1>
            <p class="text-lg md:text-xl text-gray-200 leading-relaxed mb-8 max-w-xl text-shadow-sm">
              {{ slides[current].subtitle }}
            </p>
            <div class="flex flex-wrap gap-4">
              <RouterLink to="/sermons" class="btn-gold btn-lg">Watch Sermons</RouterLink>
              <RouterLink to="/events" class="btn-outline-white btn-lg">Join Us This Sabbath</RouterLink>
              <RouterLink to="/give" class="btn-ghost btn-lg text-white border-white/30">Give Now</RouterLink>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Slide Indicators -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
      <button v-for="(_, i) in slides" :key="i" @click="goTo(i)" :aria-label="`Slide ${i + 1}`"
        :class="['transition-all duration-300', i === current ? 'w-8 h-2 bg-gold-500 rounded-full' : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/80']">
      </button>
    </div>

    <!-- Arrow Controls -->
    <button @click="prev" class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white transition-all border border-white/20">‹</button>
    <button @click="next" class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white transition-all border border-white/20">›</button>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-2 text-white/50">
      <span class="text-xs tracking-widest uppercase">Scroll</span>
      <div class="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const slides = [
  {
    tag: 'Welcome to GolaniSDA',
    title: 'A Community of Faith, Hope & Love',
    subtitle: 'Rooted in Scripture, driven by mission, united in Christ. Join us every Sabbath as we worship, grow, and serve together.',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)'
  },
  {
    tag: 'Sabbath Worship',
    title: 'Come and Worship the Living God',
    subtitle: 'Experience the presence of God in our Sabbath services — anointed preaching, spirit-filled worship, and authentic community.',
    gradient: 'linear-gradient(135deg, #1e2e6f 0%, #0f4c81 50%, #1a2a6c 100%)'
  },
  {
    tag: 'Serving Our Community',
    title: 'Faith in Action, Love in Motion',
    subtitle: 'We believe that genuine Christianity extends beyond the church walls. Join us as we serve our neighbors and share the Good News.',
    gradient: 'linear-gradient(135deg, #0a1022 0%, #1e3a8a 40%, #c8971a30 100%)'
  }
]

const current = ref(0)
let timer = null

function goTo(i) { current.value = i; resetTimer() }
function next() { current.value = (current.value + 1) % slides.length; resetTimer() }
function prev() { current.value = (current.value - 1 + slides.length) % slides.length; resetTimer() }
function startTimer() { timer = setInterval(next, 6000) }
function resetTimer() { clearInterval(timer); startTimer() }

onMounted(startTimer)
onUnmounted(() => clearInterval(timer))
</script>
