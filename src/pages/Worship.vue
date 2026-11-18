<template>
  <div>
    <div class="page-hero">
      <div class="container-custom page-hero__inner text-center">
        <p class="section-tag mb-3">Join Us</p>
        <h1 class="mb-3">Worship With Us</h1>
        <div class="divider-blue-center mb-4"></div>
        <p class="max-w-xl mx-auto">
          Our regular gatherings create space for Bible study, prayer, worship, and fellowship.
        </p>
      </div>
    </div>

    <section class="section">
      <div class="container-custom">
        <div class="worship-grid">
          <article
            v-for="service in defaultServices"
            :key="service.key"
            class="card worship-item"
          >
            <span class="worship-item__day">{{ service.day }}</span>
            <h3 class="worship-item__name">{{ service.name }}</h3>
            <p class="worship-item__time">
              {{ formatTime(service.startTime) }}
              <span v-if="service.endTime"> – {{ formatTime(service.endTime) }}</span>
            </p>
          </article>
        </div>

        <p class="worship-note">
          Service times are subject to change for special programs — check
          <RouterLink to="/announcements" class="worship-note__link">Announcements</RouterLink>
          or
          <RouterLink to="/events" class="worship-note__link">Events</RouterLink>
          for the latest schedule.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { defaultServices } from '@/constants/services'

function formatTime(value) {
  if (!value) return ''
  const [hourStr, minuteStr] = value.split(':')
  const hour = Number(hourStr)
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const displayHour = ((hour + 11) % 12) + 1
  return `${displayHour}:${minuteStr} ${suffix}`
}
</script>

<style scoped>
.worship-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.worship-item {
  padding: 1.5rem;
}

.worship-item__day {
  display: block;
  color: var(--color-gold-dark);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.dark .worship-item__day {
  color: var(--color-gold);
}

.worship-item__name {
  margin-top: 0.75rem;
  font-size: 1.05rem;
  font-weight: 600;
}

.worship-item__time {
  margin-top: 0.5rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.worship-note {
  margin-top: 2.5rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  text-align: center;
}

.worship-note__link {
  color: var(--color-gold-dark);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.dark .worship-note__link {
  color: var(--color-gold);
}
</style>
