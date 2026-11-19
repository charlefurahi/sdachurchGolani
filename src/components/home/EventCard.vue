<template>
  <div
    class="ec"
    :style="{ '--ec-accent': accentColor, '--ec-bg': cardBg }"
    role="article"
    :aria-label="event.title"
  >
    <!-- ── Poster image area ────────────────────────────────────────── -->
    <div class="ec__poster">

      <!-- Admin-uploaded banner / thumbnail -->
      <img
        v-if="bannerUrl && !bannerFailed"
        :src="bannerUrl"
        :alt="event.title"
        class="ec__poster-img"
        @error="bannerFailed = true"
      />
      <!-- Poster-style gradient placeholder (matches poster blue) -->
      <div v-else class="ec__poster-placeholder" :style="{ background: placeholderGrad }">
        <svg class="ec__poster-cross" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path stroke-linecap="round" d="M12 3v18M5 9h14"/></svg>
      </div>

      <!-- Dark overlay so text on image stays readable -->
      <div class="ec__poster-overlay"></div>

      <!-- Badges: top-left -->
      <div class="ec__badges">
        <span
          v-if="categoryName"
          class="ec__badge ec__badge--cat"
          :style="{ background: categoryColor }"
        >{{ categoryName }}</span>
        <span v-if="event.is_featured" class="ec__badge ec__badge--star"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linejoin="round" d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3z"/></svg> Featured</span>
        <span v-if="event.is_online" class="ec__badge ec__badge--online"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg> Online</span>
      </div>

      <!-- Speaker photo bubble: bottom-left (matches poster speaker image) -->
      <div v-if="speakerUrl && !speakerFailed" class="ec__speaker-bubble">
        <img
          :src="speakerUrl"
          :alt="event.speaker_name"
          class="ec__speaker-img"
          @error="speakerFailed = true"
        />
      </div>

      <!-- Date chip: bottom-right -->
      <div class="ec__date-chip">
        <strong class="ec__date-day" :style="{ color: accentColor }">{{ day }}</strong>
        <span  class="ec__date-month">{{ month }}</span>
      </div>
    </div>

    <!-- ── Card body ─────────────────────────────────────────────────── -->
    <div class="ec__body">

      <!-- Subtitle (e.g. "Ibada ya Maombi") — italic like poster -->
      <p v-if="event.subtitle" class="ec__subtitle" :style="{ color: accentColor }">
        {{ event.subtitle }}
      </p>

      <!-- Title — bold, poster-style -->
      <h3 class="ec__title">{{ event.title }}</h3>

      <!-- Bible verse — italic small, like poster "Luka 11:1-4" -->
      <p v-if="event.bible_verse" class="ec__verse">
        <svg class="ec__inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 5h7a3 3 0 0 1 3 3v12a3 3 0 0 0-3-3H4zM20 5h-3a3 3 0 0 0-3 3v12a3 3 0 0 1 3-3h3z"/></svg> <em>{{ event.bible_verse }}</em>
      </p>

      <!-- Speaker — like poster "Na Mch. Godliven Ngessi" -->
      <div v-if="event.speaker_name" class="ec__speaker-row">
        <span class="ec__speaker-prefix">Na</span>
        <span class="ec__speaker-name" :style="{ color: accentColor }">{{ event.speaker_name }}</span>
        <span v-if="event.speaker_title" class="ec__speaker-title">· {{ event.speaker_title }}</span>
      </div>

      <!-- Date / Time / Location — like poster info box -->
      <div class="ec__info-box">
        <div class="ec__info-row">
          <svg class="ec__info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 6h16v15H4zM8 3v6m8-6v6M4 11h16"/></svg>
          <span class="ec__info-text">{{ formattedDate }}</span>
        </div>
        <div class="ec__info-row">
          <svg class="ec__info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" d="M12 7v5l3 2"/></svg>
          <span class="ec__info-text">{{ eventTime }}</span>
        </div>
        <div v-if="event.location || event.is_online" class="ec__info-row">
          <!-- Google Meet icon when online (matches poster) -->
          <svg class="ec__info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle v-if="event.is_online" cx="12" cy="12" r="9"/><path v-if="event.is_online" d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/><path v-else stroke-linecap="round" stroke-linejoin="round" d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0z"/><circle v-if="!event.is_online" cx="12" cy="10" r="2"/></svg>
          <span class="ec__info-text">{{ event.is_online ? (event.location || 'Google Meet') : event.location }}</span>
        </div>
      </div>

      <!-- Short description -->
      <p v-if="event.short_description || event.description" class="ec__desc">
        {{ event.short_description || event.description }}
      </p>

      <!-- Footer: capacity + RSVP button -->
      <div class="ec__footer">
        <div class="ec__capacity">
          <div v-if="event.max_attendees" class="ec__capacity-bar-wrap">
            <div class="ec__capacity-bar">
              <div
                class="ec__capacity-fill"
                :style="{ width: capacityPct + '%', background: accentColor }"
              ></div>
            </div>
            <span class="ec__capacity-label">{{ event.rsvp_count ?? 0 }} / {{ event.max_attendees }}</span>
          </div>
          <span v-else class="ec__capacity-label">{{ event.rsvp_count ?? 0 }} registered</span>
        </div>

        <RouterLink
          :to="`/events/${event.id}`"
          class="ec__rsvp-btn"
          :style="{ background: accentColor, color: darkAccent ? '#fff' : '#16324a' }"
          @click.stop
        >
          RSVP
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

import { API_ORIGIN } from '@/services/api'
const BASE_URL = API_ORIGIN

// Fallback category colours (keep same palette as before)
// All categories share the single brand yellow — distinction comes
// from the label text, keeping the site to its 3-color palette.
const CAT_COLORS = {
  'Worship Service':    '#f4d03f',
  'Youth Program':      '#f4d03f',
  'Community Outreach': '#f4d03f',
  'Bible Study':        '#f4d03f',
  'Sabbath School':     '#f4d03f',
  'Evangelism':         '#f4d03f',
  'Prayer Meeting':     '#f4d03f',
  'Maombi':             '#f4d03f',
  'Ibada':              '#f4d03f',
  'Vijana':             '#f4d03f',
  'Huduma':             '#f4d03f',
  'Camp Meeting':       '#f4d03f',
  'Social':             '#f4d03f',
  'Family':             '#f4d03f',
}

const props = defineProps({ event: { type: Object, required: true } })

const bannerFailed  = ref(false)
const speakerFailed = ref(false)

function resolveUrl(src) {
  if (!src) return null
  return src.startsWith('http') ? src : BASE_URL + src
}

const bannerUrl = computed(() =>
  bannerFailed.value ? null : resolveUrl(
    props.event.thumbnail_url ||
    props.event.banner_url    ||
    props.event.thumbnail     ||
    props.event.banner        ||
    props.event.image         || null
  )
)

const speakerUrl = computed(() =>
  speakerFailed.value ? null : resolveUrl(
    props.event.speaker_image_url ||
    props.event.speaker_image     || null
  )
)

// Category
const categoryName = computed(() => {
  if (!props.event.category) return ''
  return typeof props.event.category === 'object'
    ? props.event.category.name
    : props.event.category
})

const categoryColor = computed(() => {
  if (typeof props.event.category === 'object' && props.event.category?.color)
    return props.event.category.color
  return CAT_COLORS[categoryName.value] || '#16324a'
})

// Poster accent: admin theme_color → category color → poster yellow
const accentColor = computed(() =>
  props.event.theme_color || categoryColor.value || '#f4d03f'
)

// Card bg: admin theme_color darkened, or default poster navy
const cardBg = computed(() =>
  props.event.theme_color ? props.event.theme_color : '#16324a'
)

// Check if accent is dark (use white text on RSVP btn)
const darkAccent = computed(() => {
  const c = accentColor.value.replace('#', '')
  if (c.length < 6) return true
  const r = parseInt(c.slice(0,2),16)
  const g = parseInt(c.slice(2,4),16)
  const b = parseInt(c.slice(4,6),16)
  return (0.299*r + 0.587*g + 0.114*b) < 140
})

const placeholderGrad = computed(() => {
  const base = props.event.theme_color || '#16324a'
  return `linear-gradient(135deg, #f4f8fb 0%, color-mix(in srgb, ${base} 22%, #dde8ef) 100%)`
})

// Dates
const dateObj = computed(() => {
  const d = props.event.start_date || props.event.date
  return d ? new Date(d) : null
})
const day   = computed(() => dateObj.value ? dateObj.value.getDate() : '--')
const month = computed(() => dateObj.value
  ? dateObj.value.toLocaleString('en', { month: 'short' }).toUpperCase() : '---')
const formattedDate = computed(() => dateObj.value
  ? dateObj.value.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' }) : '')
const eventTime = computed(() => {
  if (props.event.time) return props.event.time
  return dateObj.value
    ? dateObj.value.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }) : ''
})

// Capacity
const capacityPct = computed(() => {
  const reg = props.event.rsvp_count ?? 0
  const cap = props.event.max_attendees || 1
  return Math.min((reg / cap) * 100, 100)
})
</script>

<style scoped>
/* ── Shell ───────────────────────────────────────────────────────────── */
.ec {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(226,232,240,0.7);
  box-shadow: 0 2px 16px rgba(13,33,55,0.08);
  transition: box-shadow 0.3s, transform 0.3s;
  cursor: pointer;
  position: relative;
}
.dark .ec {
  background: var(--color-surface);
  border-color: rgba(255,255,255,0.07);
}
.ec:hover {
  box-shadow: 0 12px 40px rgba(13,33,55,0.18);
  transform: translateY(-4px);
}

/* ── Poster image ────────────────────────────────────────────────────── */
.ec__poster {
  position: relative;
  height: 200px;
  flex-shrink: 0;
  overflow: hidden;
  background: var(--color-bg-alt);  /* light fallback */
}

.ec__poster-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.ec:hover .ec__poster-img { transform: scale(1.06); }

.ec__poster-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ec__poster-cross {
  font-size: 52px;
  color: var(--color-heading);
  opacity: 0.18;
}

/* gradient overlay so badges always readable */
.ec__poster-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 40%, rgba(0,0,0,0.3) 100%);
  pointer-events: none;
}

/* ── Badges ──────────────────────────────────────────────────────────── */
.ec__badges {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}
.ec__badge {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  padding: 3px 9px;
  border-radius: 100px;
  color: #fff;
  backdrop-filter: blur(4px);
}
.ec__badge--star  { background: #f4d03f; color: #16324a !important; }
.ec__badge--online { background: rgba(255,255,255,0.92); color: var(--color-heading) !important; }

/* ── Speaker bubble (matches poster speaker photo) ───────────────────── */
.ec__speaker-bubble {
  position: absolute;
  bottom: -18px;
  left: 14px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 3px solid var(--ec-accent, #f4d03f);
  overflow: hidden;
  box-shadow: 0 3px 12px rgba(0,0,0,0.35);
  background: var(--color-bg-alt);
  z-index: 3;
}
.ec__speaker-img { width: 100%; height: 100%; object-fit: cover; }

/* ── Date chip ───────────────────────────────────────────────────────── */
.ec__date-chip {
  position: absolute;
  bottom: 10px;
  right: 12px;
  z-index: 2;
  background: rgba(255,255,255,0.95);
  border-radius: 12px;
  padding: 6px 12px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  border-left: 3px solid var(--ec-accent, #f4d03f);
}
.dark .ec__date-chip { background: rgba(23,47,69,0.95); }
.ec__date-day {
  display: block;
  font-size: 22px;
  font-weight: 900;
  line-height: 1;
  font-family: 'Cinzel', serif;
}
.ec__date-month {
  display: block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #718096;
  margin-top: 2px;
}
.dark .ec__date-month { color: #9baac0; }

/* ── Body ────────────────────────────────────────────────────────────── */
.ec__body {
  padding: 26px 16px 16px;  /* extra top = clear speaker bubble */
  display: flex;
  flex-direction: column;
  gap: 7px;
  flex: 1;
}

/* Subtitle — italic, like "Ibada ya Maombi" */
.ec__subtitle {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-style: italic;
  margin: 0;
}

/* Title — bold poster-style */
.ec__title {
  font-family: 'Cinzel', serif;
  font-size: clamp(14px, 2vw, 17px);
  font-weight: 700;
  color: var(--color-heading);
  margin: 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s;
}
.dark .ec__title { color: #ffffff; }
.ec:hover .ec__title { color: var(--ec-accent, #f4d03f); }

/* Bible verse — italic, like "Luka 11:1-4" */
.ec__verse {
  font-size: 11px;
  color: #718096;
  margin: 0;
  line-height: 1.5;
}
.dark .ec__verse { color: #8faabf; }

/* Speaker — like "Na Mch. Godliven Ngessi" */
.ec__speaker-row {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  flex-wrap: wrap;
}
.ec__speaker-prefix { color: #718096; font-style: italic; }
.ec__speaker-name   { font-weight: 700; }
.ec__speaker-title  { color: #a0aec0; font-size: 11px; }

/* Info box — matches poster white rounded box with date/time/platform */
.ec__info-box {
  background: #f7fafc;
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.dark .ec__info-box { background: rgba(255,255,255,0.04); }
.ec__info-row { display: flex; align-items: center; gap: 8px; font-size: 11px; }
.ec__info-icon { width:15px; height:15px; flex-shrink:0; }
.ec__inline-icon { display:inline-block; width:14px; height:14px; vertical-align:-2px; }
.ec__badge svg { width:13px; height:13px; flex:none; }
.ec__info-text { color: #4a5568; font-weight: 500; }
.dark .ec__info-text { color: #9baac0; }

/* Short description */
.ec__desc {
  font-size: 12px;
  color: #718096;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}
.dark .ec__desc { color: #8faabf; }

/* ── Footer ──────────────────────────────────────────────────────────── */
.ec__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid #e2e8f0;
}
.dark .ec__footer { border-color: rgba(255,255,255,0.06); }

.ec__capacity { flex: 1; min-width: 0; }
.ec__capacity-bar-wrap { display: flex; flex-direction: column; gap: 4px; }
.ec__capacity-bar { height: 4px; background: #e2e8f0; border-radius: 2px; overflow: hidden; }
.dark .ec__capacity-bar { background: rgba(255,255,255,0.08); }
.ec__capacity-fill { height: 100%; border-radius: 2px; transition: width 0.8s ease; }
.ec__capacity-label { font-size: 10px; color: #a0aec0; font-weight: 600; }

/* RSVP button */
.ec__rsvp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 20px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
}
.ec__rsvp-btn:hover { opacity: 0.88; transform: translateY(-1px); }

/* ── List mode ───────────────────────────────────────────────────────── */
.card-list-mode { flex-direction: row !important; }
.card-list-mode .ec__poster { width: 220px !important; height: auto !important; flex-shrink: 0; }
.card-list-mode .ec__body { flex: 1; }
@media (max-width: 640px) {
  .card-list-mode { flex-direction: column !important; }
  .card-list-mode .ec__poster { width: 100% !important; height: 200px !important; }
}
</style>
