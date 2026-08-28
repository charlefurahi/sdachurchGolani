<!--
  PhotoSection.vue
  ─────────────────────────────────────────────────────────────────────────
  A full-bleed photo with text sitting on it — the pattern used across
  chuokikuusda.org (their "Service Hours" block, page headers, etc).
  Simpler than ScrollStory: nothing pins or scrolls, it's just one static
  section. Use this for page headers, "Service Hours", quote/verse
  breaks, or any moment that should feel photographic rather than
  card-based.

  Two content modes:

  1. mode="full" (default) — text sits directly on the photo, full width,
     with a dark scrim across the whole section for legibility. Use for
     short headlines / page headers.

  2. mode="card" — the photo stays fully visible, UNCOVERED, everywhere.
     The slot content floats in a glass card with margin around it, so
     the raw photo shows on every side of the card. Use this for content
     with more text (like Service Hours) where you don't want the whole
     photo drowned in an overlay — only THIS card should float; other
     sections stay whatever they already are.

  USAGE
  -----
    <PhotoSection :image="img" mode="card" align="center" shape="corner">
      <p class="ps__tag">Service Hours</p>
      <h2 class="ps__title">Join Us in Worship</h2>
      ...
    </PhotoSection>

  Props:
    image  — imported photo. Falls back to the brand gradient if omitted.
    align  — 'center' | 'left' — horizontal placement of the card/content.
    shape  — 'none' | 'corner' — one subtle brand-blue decorative blob.
    mode   — 'full' | 'card' — see above.
-->
<template>
  <section class="ps" :class="`ps--${mode}`" :style="bgStyle">
    <div v-if="mode === 'full'" class="ps__scrim"></div>
    <div v-if="shape === 'corner'" class="ps__shape" aria-hidden="true"></div>

    <div v-if="mode === 'full'" class="container-custom ps__content" :class="align === 'center' ? 'text-center mx-auto' : 'text-left'">
      <slot />
    </div>

    <!-- card mode: photo stays fully uncovered, content floats in its
         own glass card with margin on every side -->
    <div v-else class="container-custom ps__card-wrap" :class="align === 'center' ? 'flex justify-center' : 'flex justify-start'">
      <div class="ps__card">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  image: { type: String, default: '' },
  align: { type: String, default: 'center' },   // 'center' | 'left'
  shape: { type: String, default: 'none' },      // 'none' | 'corner'
  mode:  { type: String, default: 'full' },      // 'full' | 'card'
})

const bgStyle = computed(() =>
  props.image
    ? { backgroundImage: `url(${props.image})` }
    : { background: 'var(--gradient-page-hero)' }
)
</script>

<style scoped>
.ps {
  position: relative;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}
.ps--full { padding: 5rem 1.5rem; }
.ps--card { padding: 4rem 1.5rem; }

.ps__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(13,33,55,0.75) 0%, rgba(13,33,55,0.55) 100%);
}
/* one subtle on-brand accent blob, echoes the chuokikuusda corner shape
   without introducing a new color */
.ps__shape {
  position: absolute;
  right: -6rem;
  bottom: -6rem;
  width: 18rem;
  height: 18rem;
  border-radius: 9999px;
  background: #f4d03f;
  opacity: 0.12;
}

.ps__content {
  position: relative;
  z-index: 1;
  color: #fff;
  max-width: 42rem;
}

/* ── card mode: photo is left fully visible; only the card itself
     is glass, with margin around it showing the raw photo ── */
.ps__card-wrap {
  position: relative;
  z-index: 1;
}
.ps__card {
  background: rgba(13,33,55,0.62);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  max-width: 34rem;
  width: 100%;
  color: #fff;
  box-shadow: 0 20px 60px rgba(13,33,55,0.35);
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .ps__card { background: rgba(13,33,55,0.9); }
}

:deep(.ps__tag) {
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 0.8rem;
  font-weight: 700;
  color: #f4d03f;
  margin-bottom: 0.75rem;
}
:deep(.ps__title) {
  font-family: var(--font-heading, inherit);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.5rem;
}
</style>