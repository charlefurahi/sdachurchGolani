<template>
  <section ref="target" class="py-12 relative overflow-hidden" style="background: var(--gradient-page-hero)">
    <div class="absolute inset-0 bg-hero-pattern opacity-10"></div>
    <div class="container-custom relative">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <div class="text-3xl mb-1">{{ stat.icon }}</div>
          <div class="font-heading text-3xl md:text-4xl font-bold text-white mb-1">
            <span ref="countRef">{{ stat.value }}</span>{{ stat.suffix }}
          </div>
          <p class="text-xs text-white/70 tracking-wide">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { onMounted, watch, ref } from 'vue'
import { churchStats } from '@/data/index.js'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'

const stats = churchStats

// `countRef` was already in the template with nothing behind it — Vue
// auto-collects one array entry per v-for iteration here because this
// binding matches a ref initialised as an array. This is what actually
// lets us reach each number's DOM node to animate it.
const countRef = ref([])

// Only start counting once the section is actually visible, and only once.
const { isVisible, target } = useIntersectionObserver({ once: true })

const DURATION = 1400

function animateCount(el, targetValue) {
  if (!el) return

  const start = performance.now()

  function tick(now) {
    const progress = Math.min((now - start) / DURATION, 1)
    // Ease-out so the count settles into place instead of stopping abruptly.
    const eased = 1 - Math.pow(1 - progress, 3)

    el.textContent = Math.round(targetValue * eased)

    if (progress < 1) {
      requestAnimationFrame(tick)
    } else {
      // Land exactly on the real value in case rounding drifted.
      el.textContent = targetValue
    }
  }

  requestAnimationFrame(tick)
}

onMounted(() => {
  // Start every counter at 0 so nothing flashes the final number before
  // the section has scrolled into view and the animation has run.
  countRef.value.forEach(el => {
    if (el) el.textContent = '0'
  })
})

watch(isVisible, (visible) => {
  if (!visible) return

  stats.forEach((stat, index) => {
    const el = countRef.value[index]
    const targetValue = Number(stat.value)

    if (!el || Number.isNaN(targetValue)) return

    animateCount(el, targetValue)
  })
})
</script>