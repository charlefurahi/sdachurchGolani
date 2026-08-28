<template>
  <article
    class="event-card"
    :style="{ '--event-accent': accentColor }"
    role="article"
    :aria-label="event.title"
  >
    <!-- =========================================================
         MEDIA
    ========================================================== -->
    <RouterLink
      :to="`/events/${event.id}`"
      class="event-card__media"
      @click.stop
    >
      <img
        v-if="bannerUrl && !bannerFailed"
        :src="bannerUrl"
        :alt="event.title"
        @error="bannerFailed = true"
      />

      <div
        v-else
        class="event-card__placeholder"
        :style="{ background: placeholderGradient }"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.4"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="8" y1="14" x2="8" y2="14" />
          <line x1="12" y1="14" x2="12" y2="14" />
          <line x1="16" y1="14" x2="16" y2="14" />
        </svg>
      </div>

      <!-- Status -->
      <span
        v-if="isUpcoming"
        class="event-card__status"
      >
        Upcoming
      </span>

      <span
        v-else-if="event.is_featured"
        class="event-card__status event-card__status--featured"
      >
        Featured
      </span>

      <!-- Date -->
      <div class="event-card__date">
        <strong>{{ day }}</strong>
        <span>{{ month }}</span>
      </div>

      <!-- Online -->
      <span
        v-if="event.is_online"
        class="event-card__online"
      >
        Online
      </span>
    </RouterLink>

    <!-- =========================================================
         CONTENT
    ========================================================== -->
    <div class="event-card__content">

      <span class="event-card__category">
        {{ categoryName }}
      </span>

      <h3>
        {{ event.title }}
      </h3>

      <p
        v-if="event.subtitle"
        class="event-card__subtitle"
      >
        {{ event.subtitle }}
      </p>

      <p
        v-if="event.speaker_name"
        class="event-card__speaker"
      >
        {{ event.speaker_name }}
        <span v-if="event.speaker_title">
          · {{ event.speaker_title }}
        </span>
      </p>

      <p
        v-if="event.bible_verse"
        class="event-card__verse"
      >
        {{ event.bible_verse }}
      </p>

      <!-- Date -->
      <p class="event-card__date-text">
        {{ formattedDate }}
      </p>

      <!-- Time / location -->
      <div class="event-card__meta">

        <span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>

          {{ eventTime }}
        </span>

        <span v-if="event.location || event.is_online">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1116 0z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>

          {{ event.is_online ? 'Online' : event.location }}
        </span>

      </div>

      <!-- Description -->
      <p
        v-if="event.short_description || event.description"
        class="event-card__description"
      >
        {{ event.short_description || event.description }}
      </p>

      <!-- =======================================================
           FOOTER
      ======================================================== -->
      <div class="event-card__footer">

        <div
          v-if="event.max_attendees"
          class="event-card__capacity"
        >
          <div class="event-card__capacity-top">
            <span>Registration</span>
            <strong>
              {{ event.rsvp_count ?? 0 }}/{{ event.max_attendees }}
            </strong>
          </div>

          <div class="event-card__capacity-bar">
            <div
              :style="{ width: `${capacityPct}%` }"
            />
          </div>
        </div>

        <span
          v-else
          class="event-card__registered"
        >
          {{ event.rsvp_count ?? 0 }} registered
        </span>

        <RouterLink
          :to="`/events/${event.id}`"
          class="event-card__details"
          @click.stop
        >
          Details
        </RouterLink>

      </div>

    </div>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { CATEGORY_COLORS } from '@/data/index.js'
import { formatDate } from '@/utils/index.js'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') ||
  'http://127.0.0.1:8000'

const bannerFailed = ref(false)

function resolveUrl(src) {
  if (!src) return null
  if (src.startsWith('http')) return src
  return BASE_URL + src
}

const bannerUrl = computed(() => {
  if (bannerFailed.value) return null

  return resolveUrl(
    props.event.thumbnail_url ||
    props.event.banner_url ||
    props.event.thumbnail ||
    props.event.banner ||
    props.event.image ||
    null
  )
})

const categoryName = computed(() => {
  if (!props.event.category) return 'General'

  return typeof props.event.category === 'object'
    ? props.event.category?.name || 'General'
    : props.event.category
})

const categoryColor = computed(() => {
  if (
    typeof props.event.category === 'object' &&
    props.event.category?.color
  ) {
    return props.event.category.color
  }

  return CATEGORY_COLORS[categoryName.value] || '#c9a227'
})

const accentColor = computed(() =>
  props.event.theme_color ||
  categoryColor.value ||
  '#c9a227'
)

const placeholderGradient = computed(() => {
  return `linear-gradient(
    135deg,
    #0d2137 0%,
    #163f5e 100%
  )`
})

const dateObj = computed(() => {
  const value =
    props.event.start_date ||
    props.event.date

  if (!value) return null

  const date = new Date(value)

  return Number.isNaN(date.getTime())
    ? null
    : date
})

const day = computed(() => {
  return dateObj.value
    ? dateObj.value.getDate()
    : '--'
})

const month = computed(() => {
  return dateObj.value
    ? dateObj.value
        .toLocaleString('en', { month: 'short' })
        .toUpperCase()
    : '---'
})

const formattedDate = computed(() => {
  const value =
    props.event.start_date ||
    props.event.date

  if (!value) return 'Date TBA'

  try {
    return formatDate(value)
  } catch {
    return new Date(value).toLocaleDateString()
  }
})

const eventTime = computed(() => {
  if (props.event.time) {
    return props.event.time
  }

  if (!dateObj.value) {
    return 'Time TBA'
  }

  return dateObj.value.toLocaleTimeString('en', {
    hour: '2-digit',
    minute: '2-digit'
  })
})

const isUpcoming = computed(() => {
  if (props.event.status === 'upcoming') {
    return true
  }

  if (!dateObj.value) {
    return false
  }

  return dateObj.value >= new Date()
})

const capacityPct = computed(() => {
  const registered = Number(props.event.rsvp_count ?? 0)
  const capacity = Number(props.event.max_attendees ?? 0)

  if (!capacity) return 0

  return Math.min(
    Math.max((registered / capacity) * 100, 0),
    100
  )
})
</script>

<style scoped>
/* =========================================================
   EVENT CARD
   Visual language intentionally follows Sermons cards
========================================================= */

.event-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  background: #ffffff;
  border: 1px solid rgba(13, 33, 55, 0.08);

  box-shadow:
    0 3px 16px rgba(13, 33, 55, 0.06);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

.event-card:hover {
  transform: translateY(-4px);

  border-color:
    rgba(201, 162, 39, 0.28);

  box-shadow:
    0 14px 36px rgba(13, 33, 55, 0.12);
}

/* =========================================================
   MEDIA
========================================================= */

.event-card__media {
  position: relative;

  display: block;

  height: 220px;

  overflow: hidden;

  background: #0d2137;

  text-decoration: none;
}

.event-card__media img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  transition:
    transform 0.5s ease,
    opacity 0.3s ease;
}

.event-card:hover .event-card__media img {
  transform: scale(1.04);
}

.event-card__placeholder {
  width: 100%;
  height: 100%;

  display: grid;
  place-items: center;

  color: rgba(255, 255, 255, 0.18);
}

.event-card__placeholder svg {
  width: 68px;
  height: 68px;
}

/* =========================================================
   STATUS
========================================================= */

.event-card__status {
  position: absolute;

  top: 1rem;
  left: 1rem;

  z-index: 3;

  padding: 0.4rem 0.7rem;

  background: #c9a227;
  color: #0d2137;

  font-size: 0.65rem;
  font-weight: 700;

  letter-spacing: 0.07em;

  text-transform: uppercase;
}

.event-card__status--featured {
  background: #ffffff;
}

/* =========================================================
   ONLINE
========================================================= */

.event-card__online {
  position: absolute;

  right: 1rem;
  top: 1rem;

  z-index: 3;

  padding: 0.4rem 0.7rem;

  background: rgba(13, 33, 55, 0.9);
  color: #ffffff;

  font-size: 0.65rem;
  font-weight: 700;

  text-transform: uppercase;
  letter-spacing: 0.06em;
}

/* =========================================================
   DATE
========================================================= */

.event-card__date {
  position: absolute;

  right: 1rem;
  bottom: 1rem;

  z-index: 3;

  min-width: 54px;

  padding: 0.45rem 0.65rem;

  background: #ffffff;

  text-align: center;

  box-shadow:
    0 5px 18px rgba(0, 0, 0, 0.16);
}

.event-card__date strong {
  display: block;

  color: #0d2137;

  font-family:
    'Cormorant Garamond',
    Georgia,
    serif;

  font-size: 1.45rem;

  line-height: 1;
}

.event-card__date span {
  display: block;

  margin-top: 0.2rem;

  color: #a67c00;

  font-size: 0.62rem;
  font-weight: 800;

  letter-spacing: 0.08em;
}

/* =========================================================
   CONTENT
========================================================= */

.event-card__content {
  display: flex;
  flex-direction: column;

  flex: 1;

  padding: 1.35rem;
}

.event-card__category {
  display: inline-block;

  width: fit-content;

  margin-bottom: 0.8rem;

  color: #a67c00;

  font-size: 0.66rem;
  font-weight: 700;

  letter-spacing: 0.08em;

  text-transform: uppercase;
}

.event-card h3 {
  margin: 0;

  color: #0d2137;

  font-family:
    'Cormorant Garamond',
    Georgia,
    serif;

  font-size: 1.25rem;
  font-weight: 700;

  line-height: 1.3;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  overflow: hidden;
}

.event-card__subtitle {
  margin: 0.55rem 0 0;

  color: rgba(13, 33, 55, 0.55);

  font-size: 0.78rem;
}

.event-card__speaker {
  margin: 0.7rem 0 0;

  color: rgba(13, 33, 55, 0.65);

  font-size: 0.82rem;
  font-weight: 600;
}

.event-card__speaker span {
  font-weight: 400;
  color: rgba(13, 33, 55, 0.45);
}

.event-card__verse {
  margin: 0.45rem 0 0;

  color: #a67c00;

  font-size: 0.78rem;

  font-style: italic;

  line-height: 1.5;
}

.event-card__date-text {
  margin: 0.65rem 0 0;

  color: rgba(13, 33, 55, 0.45);

  font-size: 0.72rem;
}

/* =========================================================
   META
========================================================= */

.event-card__meta {
  display: flex;
  flex-wrap: wrap;

  gap: 0.8rem;

  margin-top: 0.8rem;

  color: rgba(13, 33, 55, 0.55);

  font-size: 0.72rem;
}

.event-card__meta span {
  display: inline-flex;
  align-items: center;

  gap: 0.35rem;
}

.event-card__meta svg {
  width: 14px;
  height: 14px;

  flex-shrink: 0;
}

/* =========================================================
   DESCRIPTION
========================================================= */

.event-card__description {
  margin: 0.8rem 0 0;

  color: rgba(13, 33, 55, 0.58);

  font-size: 0.78rem;

  line-height: 1.6;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  overflow: hidden;
}

/* =========================================================
   FOOTER
========================================================= */

.event-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 0.75rem;

  margin-top: auto;
  padding-top: 1rem;

  border-top:
    1px solid rgba(13, 33, 55, 0.08);
}

.event-card__registered {
  color: rgba(13, 33, 55, 0.45);

  font-size: 0.7rem;
}

.event-card__capacity {
  flex: 1;
}

.event-card__capacity-top {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 0.3rem;

  color: rgba(13, 33, 55, 0.45);

  font-size: 0.65rem;
}

.event-card__capacity-top strong {
  color: #0d2137;
}

.event-card__capacity-bar {
  width: 100%;
  height: 4px;

  overflow: hidden;

  background: #eceae4;
}

.event-card__capacity-bar div {
  height: 100%;

  background: var(--event-accent, #c9a227);

  transition: width 0.4s ease;
}

.event-card__details {
  min-height: 34px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0 0.85rem;

  background: #0d2137;
  color: #ffffff;

  font-size: 0.7rem;
  font-weight: 700;

  text-decoration: none;

  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.event-card__details:hover {
  background: #c9a227;
  color: #0d2137;
}

/* =========================================================
   DARK MODE
========================================================= */

:global(.dark) .event-card {
  background: #101f30;
  border-color: rgba(255, 255, 255, 0.08);
}

:global(.dark) .event-card h3 {
  color: #ffffff;
}

:global(.dark) .event-card__speaker,
:global(.dark) .event-card__meta,
:global(.dark) .event-card__description {
  color: rgba(255, 255, 255, 0.62);
}

:global(.dark) .event-card__date-text {
  color: rgba(255, 255, 255, 0.4);
}

:global(.dark) .event-card__footer {
  border-color: rgba(255, 255, 255, 0.08);
}

:global(.dark) .event-card__capacity-top strong {
  color: #ffffff;
}

@media (max-width: 640px) {
  .event-card__media {
    height: 200px;
  }
}
</style>