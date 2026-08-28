<template>
  <Transition name="preloader-fade">
    <div v-if="visible" class="app-preloader" role="status" aria-live="polite" aria-label="Loading">
      <div class="app-preloader__ring">
        <svg class="app-preloader__spinner" viewBox="0 0 100 100">
          <circle class="app-preloader__track" cx="50" cy="50" r="42" />
          <circle class="app-preloader__arc" cx="50" cy="50" r="42" />
        </svg>
        <img :src="logo" alt="Golani SDA Church" class="app-preloader__logo" />
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { useAppStore } from '@/stores/app'
import logo from '@/assets/logos/logo.png'

const appStore = useAppStore()
const visible = ref(appStore.isLoading)

// appStore.isLoading is already flipped true/false by the router guards on
// every navigation (see router/index.js beforeEach/afterEach) — nothing
// was listening to it before now. We keep the loader up for a minimum
// stretch so a fast, cached navigation doesn't just flash the logo for a
// single frame, which reads as a glitch rather than a loading state.
const MIN_VISIBLE_MS = 350
let shownAt = 0
let hideTimer = null

watch(
  () => appStore.isLoading,
  (loading) => {
    if (loading) {
      if (hideTimer) {
        clearTimeout(hideTimer)
        hideTimer = null
      }
      shownAt = Date.now()
      visible.value = true
      return
    }

    const elapsed = Date.now() - shownAt
    const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0)
    hideTimer = setTimeout(() => {
      visible.value = false
      hideTimer = null
    }, remaining)
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (hideTimer) clearTimeout(hideTimer)
})
</script>

<style scoped>
.app-preloader {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
}

.preloader-fade-enter-active,
.preloader-fade-leave-active {
  transition: opacity 0.25s ease;
}
.preloader-fade-enter-from,
.preloader-fade-leave-to {
  opacity: 0;
}

.app-preloader__ring {
  position: relative;
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-preloader__spinner {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: app-preloader-spin 1.1s linear infinite;
}

.app-preloader__track {
  fill: none;
  stroke: var(--color-border-strong);
  stroke-width: 6;
}

.app-preloader__arc {
  fill: none;
  /* Was --color-gold — switched to navy so the spinning arc reads as
     the brand's navy blue instead of gold. */
  stroke: var(--color-navy);
  stroke-width: 4;
  stroke-linecap: round;
  /* Circumference for r=42 is ~264. 66 draws roughly a quarter of the ring,
     matching the reference screenshot's partial-arc look. */
  stroke-dasharray: 30 100;
}

.app-preloader__logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  padding: 0px;
  object-fit: contain;
  border-radius: 50%;

  /* The logo artwork itself is white, so it needs a dark surface to be
     visible — a white circle here made it invisible, which is why only
     a flat colored square showed instead of the actual mark. */
  background: var(--color-navy);

  /* Removed: box-shadow was reading as a stroke/border ring around the
     logo. Logo now sits flat with no outline — only the SVG arc above
     it spins. */
}

@keyframes app-preloader-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
</style>