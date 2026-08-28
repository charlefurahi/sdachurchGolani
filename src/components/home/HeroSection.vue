<template>
  <section class="home-hero" aria-labelledby="hero-title">

    <img
      :src="image"
      alt="Worshippers gathered together at Golani SDA Church"
      class="home-hero__image"
      fetchpriority="high"
    />

    <div
      class="home-hero__shade"
      aria-hidden="true"
    ></div>

    <div class="site-container home-hero__content">

      <!-- Church name removed -->

      <h1 id="hero-title" class="home-hero__title">
        {{ welcomeLine }}
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
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import image from '@/assets/images/worship-crowd.png'
import { church } from '@/constants/church'

defineProps({
  nextService: {
    type: Object,
    default: null
  }
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

  background: linear-gradient(
    90deg,
    rgba(13, 33, 55, 0.82) 0%,
    rgba(13, 33, 55, 0.72) 45%,
    rgba(13, 33, 55, 0.42) 75%,
    rgba(13, 33, 55, 0.3) 100%
  );
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
  padding-bottom: clamp(4rem, 10vh, 5.8rem);

  text-align: left;
}


/* Main title */

.home-hero__title {
  max-width: 720px;

  margin: 0;

  font-size: clamp(2rem, 4.2vw, 3rem);

  font-weight: 700;
  line-height: 1.15;

  letter-spacing: -0.02em;
}


/* Description */

.home-hero__description {
  max-width: 560px;

  margin-top: 1rem;

  color: rgba(255, 255, 255, 0.82);

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
    padding-bottom: 4rem;
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

</style>