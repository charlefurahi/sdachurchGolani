<template>
  <section class="home-hero" aria-labelledby="hero-title">

    <!-- Hero photos dissolve into one another through an SVG turbulence mask.
         The photo underneath stays solid; the next photo is revealed through animated noise. -->
    <svg
      class="home-hero__image"
      viewBox="0 0 1600 800"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Worshippers gathered together at Golani SDA Church"
    >
      <defs>
        <filter id="hero-dissolve" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="4" result="noise" />
          <feColorMatrix in="noise" type="luminanceToAlpha" result="lum" />
          <feComponentTransfer in="lum" result="ramp">
            <feFuncA ref="rampFn" type="linear" slope="0" />
          </feComponentTransfer>
          <feComponentTransfer in="ramp" result="cut">
            <feFuncA type="discrete" tableValues="0 1" />
          </feComponentTransfer>
          <feGaussianBlur in="cut" stdDeviation="1.2" result="soft" />
          <feComposite in="SourceGraphic" in2="soft" operator="in" />
        </filter>
      </defs>
      <image :href="baseSrc" x="0" y="0" width="1600" height="800" preserveAspectRatio="xMidYMid slice" />
      <image
        v-if="overSrc"
        :href="overSrc"
        x="0"
        y="0"
        width="1600"
        height="800"
        preserveAspectRatio="xMidYMid slice"
        filter="url(#hero-dissolve)"
      />
    </svg>

    <div
      class="home-hero__shade"
      aria-hidden="true"
    ></div>

    <!-- Wave edge (same arrangement as the TNC site: gradient wave behind a page-coloured wave) -->
    <svg class="home-hero__wave" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="hero-wave-back" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stop-color="#16324a" />
          <stop offset="0.55" stop-color="#2c5d85" />
          <stop offset="1" stop-color="#f4d03f" />
        </linearGradient>
      </defs>
      <path fill="url(#hero-wave-back)" opacity="0.9" d="M0 58C190 6 400 0 640 44s520 78 800 10V140H0Z" />
      <path class="home-hero__wave-front" d="M0 96C230 30 450 30 700 76s500 52 740 0V140H0Z" />
    </svg>

    <div class="site-container home-hero__content">

      <!-- Church name removed -->

      <h1 id="hero-title" class="home-hero__title">
        <span class="home-hero__title-mark">{{ welcomeLine }}</span>
      </h1>

      <p class="home-hero__description">
        {{ church.description }}
      </p>

      <div class="home-hero__actions">

        <RouterLink to="/worship" class="btn-primary">
          Worship With Us
        </RouterLink>

        <RouterLink to="/about" class="home-hero__link">
          Discover Our Story
        </RouterLink>

      </div>

      <div
        v-if="nextService"
        class="home-hero__service"
      >
        <span
          class="home-hero__service-dot"
          aria-hidden="true"
        ></span>

        <span>
          {{ nextService.name }} ·
          {{ nextService.day }}
          {{ formattedTime(nextService.startTime) }}
        </span>
      </div>

    </div>

  </section>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'

import worshipCrowd from '@/assets/images/worship-crowd.png'
import { church } from '@/constants/church'

defineProps({
  nextService: {
    type: Object,
    default: null
  }
})


// ── Slides ────────────────────────────────────────────────────────────────
// Sample photos shipped with the project. They are used whenever the gallery
// API has no photos (or is offline), so the hero is never empty.
// Drop any number of images into  src/assets/images/hero/  and they appear here automatically
// (png, jpg, jpeg, webp, avif). Files are shown in alphabetical order, so name them 01-..., 02-... to control order.
const heroModules = import.meta.glob('@/assets/images/hero/*.{png,jpg,jpeg,webp,avif,PNG,JPG,JPEG,WEBP}', { eager: true, import: 'default' })
const heroPhotos = Object.keys(heroModules).sort().map((k) => heroModules[k])

// Sample photos are used only while the hero folder is empty.
const sampleModules = import.meta.glob('@/assets/gallery/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' })
const samplePhotos = [worshipCrowd, ...Object.values(sampleModules)]

const photos = ref(heroPhotos.length ? heroPhotos : samplePhotos)
const index = ref(0)
const overIndex = ref(-1)
const rampFn = ref(null)

const baseSrc = computed(() => photos.value[index.value % photos.value.length])
const overSrc = computed(() => (overIndex.value >= 0 ? photos.value[overIndex.value % photos.value.length] : ''))

const HOLD_MS = 6500
const DISSOLVE_MS = 2200
let holdTimer = null
let raf = 0

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function setSlope(v) {
  const el = rampFn.value
  if (el) el.setAttribute('slope', String(v))
}

function dissolveToNext() {
  if (photos.value.length < 2) return
  const target = (index.value + 1) % photos.value.length
  if (reduceMotion()) {
    index.value = target
    return
  }
  overIndex.value = target
  setSlope(0.4)
  const t0 = performance.now()
  const tick = (now) => {
    const k = Math.min(1, (now - t0) / DISSOLVE_MS)
    const eased = k * k * (3 - 2 * k)
    setSlope((0.4 + eased * 3.4).toFixed(3))
    if (k < 1) {
      raf = requestAnimationFrame(tick)
    } else {
      index.value = target
      overIndex.value = -1
    }
  }
  raf = requestAnimationFrame(tick)
}

function schedule() {
  clearTimeout(holdTimer)
  holdTimer = setTimeout(() => {
    dissolveToNext()
    schedule()
  }, HOLD_MS + DISSOLVE_MS)
}

onMounted(() => {
  schedule()
})
onBeforeUnmount(() => {
  clearTimeout(holdTimer)
  cancelAnimationFrame(raf)
})

const welcomeLine = computed(
  () => 'Growing in Christ. Serving with purpose.'
)

function formattedTime(t) {
  if (!t) return ''

  const [h, m] = t.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12

  return `${hour12}:${String(m).padStart(2, '0')} ${period}`
}
</script>

<style scoped>

.home-hero {
  position: relative;
  min-height: min(620px, 92svh);

  display: flex;
  align-items: flex-start;

  overflow: hidden;
  isolation: isolate;

  background: var(--color-navy-deep);
  color: var(--color-white);
}


/* Background */

.home-hero__image,
.home-hero__shade {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;
}


.home-hero__image {
  z-index: -2;

  object-fit: cover;
  object-position: center;
}


.home-hero__shade {
  z-index: -1;

  background: linear-gradient(90deg, rgba(16, 38, 56, 0.56) 0%, rgba(16, 38, 56, 0.34) 38%, rgba(16, 38, 56, 0.05) 76%),
    linear-gradient(0deg, rgba(16, 38, 56, 0.22) 0%, rgba(16, 38, 56, 0) 48%);
}


/*
 * CONTENT POSITION
 *
 * Kept similar to your original position.
 * It starts from the left and lower area
 * instead of being vertically centered.
 */

.home-hero__content {
  width: min(
    calc(100% - (var(--gutter) * 2)),
    780px
  );

  min-height: min(620px, 92svh);

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  padding-top: 7rem;
  padding-bottom: clamp(2rem, 6vh, 3.5rem);

  text-align: left;
}


/* Main title */

.home-hero__title {
  max-width: 720px;

  margin: 0;

  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);

  font-weight: 700;
  line-height: 1.15;

  letter-spacing: -0.02em;
}


/* Description */

.home-hero__description {
  max-width: 470px;

  margin-top: 1rem;

  color: rgba(255, 255, 255, 0.96);

  font-size: clamp(0.95rem, 1.2vw, 1.05rem);

  line-height: 1.7;
}


/* Buttons */

.home-hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  gap: 1.4rem;

  margin-top: 1.7rem;
}


.home-hero__link {
  display: inline-flex;
  align-items: center;

  padding-bottom: 2px;

  color: var(--color-white);

  font-size: 0.9rem;
  font-weight: 600;

  text-decoration: none;

  border-bottom: 1px solid rgba(255, 255, 255, 0.4);

  transition:
    color 0.2s ease,
    border-color 0.2s ease;
}


.home-hero__link:hover {
  color: var(--color-gold);

  border-color: var(--color-gold);
}


/* Service information */

.home-hero__service {
  display: flex;
  align-items: center;

  gap: 0.6rem;

  margin-top: 2rem;

  color: rgba(255, 255, 255, 0.7);

  font-size: 0.78rem;
}


.home-hero__service-dot {
  width: 6px;
  height: 6px;

  flex-shrink: 0;

  border-radius: 50%;

  background: var(--color-gold);
}


/* Mobile */

@media (max-width: 640px) {

  .home-hero {
    min-height: 560px;
  }

  .home-hero__content {
    min-height: 560px;

    padding-top: 6.5rem;
    padding-bottom: 1.5rem;
  }

  .home-hero__title {
    font-size: clamp(1.9rem, 8vw, 2.5rem);
  }

  .home-hero__description {
    font-size: 0.92rem;
  }

  .home-hero__actions {
    gap: 1rem;
  }

}


/* Wave edge into the page */
.home-hero {
  padding-bottom: clamp(70px, 10vw, 140px);
}
.home-hero__wave {
  position: absolute;
  z-index: 2;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: clamp(56px, 9vw, 130px);
  pointer-events: none;
}
.home-hero__wave-front {
  fill: var(--color-bg);
}

/* Hero titles use the footer's light navy as a solid highlight, so the white words stay sharp on any photo */
.home-hero__title-mark {
  display: inline;
  padding: 0;
  background: transparent;
  color: #fff;
  text-shadow: 0 2px 18px rgba(10, 28, 40, .48);
  -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
  line-height: 1.38;
}
.home-hero__title { text-shadow: none; }
</style>
