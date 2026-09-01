<template>
  <article class="announcement-card group">
    <!-- Preview -->
    <div class="announcement-card__preview">
      <!-- Background decoration -->
      <div class="announcement-card__glow"></div>
      <div class="announcement-card__pattern"></div>

      <!-- Gold accent -->
      <div class="announcement-card__accent"></div>

      <!-- Badges -->
      <div class="announcement-card__badges">
        <span
          v-if="announcement.category"
          class="badge-primary"
        >
          {{ announcement.category }}
        </span>

        <span
          v-if="announcement.priority === 'urgent'"
          class="ad-badge ad-badge--urgent"
        >
          Urgent
        </span>

        <span
          v-if="announcement.is_pinned"
          class="ad-badge ad-badge--pinned"
        >
          Pinned
        </span>
      </div>


      <!-- Hover overlay -->
      <div class="announcement-card__overlay"></div>

      <!-- Hover action -->
      <button
        type="button"
        class="announcement-card__action"
        @click="$emit('read-more', announcement)"
      >
        <span>Read More</span>

        <span
          class="announcement-card__action-arrow"
          aria-hidden="true"
        >
          →
        </span>
      </button>
    </div>

    <!-- Content -->
    <div class="announcement-card__content">

      <!-- Date -->
      <p class="announcement-card__date">
        <svg
          class="announcement-card__date-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>

        {{ formatDate(
          announcement.announcement_date ||
          announcement.created_at
        ) }}
      </p>

      <!-- Title -->
      <h3 class="announcement-card__title">
        {{ announcement.title }}
      </h3>

      <!-- Description -->
      <p class="announcement-card__description">
        {{
          announcement.content ||
          announcement.summary ||
          'View the attached announcement for full details.'
        }}
      </p>

      <!-- Bottom button -->
      <div class="announcement-card__bottom-actions">
        <RouterLink
          v-if="props.linkTo"
          :to="props.linkTo"
          class="announcement-card__bottom-button"
        >
          <span>Read More</span>
          <span class="announcement-card__bottom-arrow" aria-hidden="true">→</span>
        </RouterLink>

        <button
          v-else
          type="button"
          class="announcement-card__bottom-button"
          @click="$emit('read-more', announcement)"
        >
          <span>Read More</span>
          <span class="announcement-card__bottom-arrow" aria-hidden="true">→</span>
        </button>

        <a
          v-if="props.pdfUrl"
          :href="props.pdfUrl"
          target="_blank"
          rel="noopener"
          class="announcement-card__pdf-button"
          aria-label="Open announcement PDF"
        >
          PDF ↗
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { formatDate } from '@/utils/index.js'

const props = defineProps({
  announcement: {
    type: Object,
    required: true,
  },
  linkTo: {
    type: [String, Object],
    default: null,
  },
  pdfUrl: {
    type: String,
    default: null,
  },
})

defineEmits(['read-more'])
</script>

<style scoped>
/* =========================================================
   GOLANI SDA BRAND
========================================================= */

.announcement-card {
  --navy: #0d2137;
  --navy-light: #16324a;
  --navy-dark: #0a1a2c;
  --navy-soft: #2c4a63;

  --gold: #f4d03f;
  --gold-dark: #d4af1f;
  --gold-soft: #f7dd6d;

  --white: #ffffff;

  position: relative;

  display: flex;
  flex-direction: column;

  height: 100%;
  min-height: 470px;
  overflow: hidden;

  background: var(--color-surface, #ffffff);

  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 1.2rem;

  box-shadow:
    0 8px 26px rgba(13, 33, 55, 0.06);

  transition:
    transform 350ms ease,
    box-shadow 350ms ease,
    border-color 250ms ease;
}


/* =========================================================
   CARD HOVER
========================================================= */

.announcement-card:hover {
  transform: translateY(-5px);

  border-color: rgba(244, 208, 63, 0.55);

  box-shadow:
    0 18px 42px rgba(13, 33, 55, 0.12);
}



.announcement-card__pdf-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 0.85rem;
  border: 1px solid rgba(13, 33, 55, 0.10);
  border-radius: 0.75rem;
  background: rgba(13, 33, 55, 0.035);
  color: var(--navy);
  font-size: 0.72rem;
  font-weight: 800;
  text-decoration: none;
  white-space: nowrap;
  transition: background 180ms ease, color 180ms ease, border-color 180ms ease;
}

.announcement-card__pdf-button:hover {
  border-color: var(--gold-dark);
  background: var(--gold);
  color: var(--navy);
}

:global(.dark) .announcement-card__pdf-button {
  border-color: rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
}

/* =========================================================
   DARK MODE
========================================================= */

:global(.dark) .announcement-card {
  background: #0a1622;

  border-color: rgba(255, 255, 255, 0.07);

  box-shadow:
    0 10px 32px rgba(0, 0, 0, 0.22);
}

:global(.dark) .announcement-card:hover {
  border-color: rgba(244, 208, 63, 0.35);

  box-shadow:
    0 18px 42px rgba(0, 0, 0, 0.35);
}


/* =========================================================
   PREVIEW
========================================================= */

.announcement-card__preview {
  position: relative;

  height: 190px;
  flex: 0 0 190px;

  display: grid;
  place-items: center;

  overflow: hidden;

  background:
    linear-gradient(
      135deg,
      #16324a 0%,
      #0d2137 55%,
      #0a1a2c 100%
    );
}


/* =========================================================
   GOLD ACCENT
========================================================= */

.announcement-card__accent {
  position: absolute;

  left: 0;
  bottom: 0;

  width: 100%;
  height: 3px;

  background:
    linear-gradient(
      90deg,
      transparent,
      var(--gold),
      transparent
    );

  opacity: 0.9;

  z-index: 2;
}


/* =========================================================
   DECORATIVE GLOW
========================================================= */

.announcement-card__glow {
  position: absolute;

  width: 230px;
  height: 230px;

  top: -115px;
  right: -75px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(244, 208, 63, 0.26),
      rgba(244, 208, 63, 0) 68%
    );

  transition:
    transform 500ms ease,
    opacity 400ms ease;
}

.announcement-card:hover .announcement-card__glow {
  transform: scale(1.25);
}


/* =========================================================
   SUBTLE PATTERN
========================================================= */

.announcement-card__pattern {
  position: absolute;

  inset: 0;

  opacity: 0.055;

  background-image:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.45) 1px,
      transparent 1px
    );

  background-size: 24px 24px;
}


/* =========================================================
   BADGES
========================================================= */

.announcement-card__badges {
  position: absolute;

  z-index: 6;

  top: 0.85rem;
  left: 0.85rem;
  right: 0.85rem;

  display: flex;
  flex-wrap: wrap;

  gap: 0.4rem;
}


/* =========================================================
   BRAND BADGE
========================================================= */

:global(.badge-primary) {
  display: inline-flex;

  align-items: center;

  padding: 0.3rem 0.65rem;

  border-radius: 999px;

  background: rgba(244, 208, 63, 0.13);

  border: 1px solid rgba(244, 208, 63, 0.35);

  color: var(--gold-soft);

  font-size: 0.62rem;

  font-weight: 700;

  letter-spacing: 0.06em;

  text-transform: uppercase;
}


/* =========================================================
   STATUS BADGES
========================================================= */

.ad-badge {
  display: inline-flex;

  align-items: center;

  padding: 0.3rem 0.65rem;

  border-radius: 999px;

  font-size: 0.62rem;

  font-weight: 700;

  letter-spacing: 0.06em;

  text-transform: uppercase;
}


.ad-badge--urgent {
  background: rgba(255, 255, 255, 0.12);

  border: 1px solid rgba(255, 255, 255, 0.22);

  color: #ffffff;
}


.ad-badge--pinned {
  background: rgba(244, 208, 63, 0.16);

  border: 1px solid rgba(244, 208, 63, 0.3);

  color: var(--gold-soft);
}


/* =========================================================
   PDF DOCUMENT
========================================================= */

.announcement-card__document {
  position: relative;

  z-index: 2;

  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 0.55rem;

  color: rgba(255, 255, 255, 0.86);

  font-size: 0.62rem;

  font-weight: 700;

  letter-spacing: 0.14em;

  text-transform: uppercase;

  transition:
    transform 450ms ease,
    opacity 350ms ease;
}


/* =========================================================
   PDF ICON
========================================================= */



.announcement-card__pdf-icon img {
  width: 38px;
  height: 38px;

  object-fit: contain;
}


.announcement-card:hover .announcement-card__document {
  transform:
    translateY(-8px)
    scale(0.95);
}


.announcement-card:hover .announcement-card__pdf-icon {
  transform: scale(1.08);

  background:
    rgba(244, 208, 63, 0.12);

  border-color:
    rgba(244, 208, 63, 0.55);
}


/* =========================================================
   HOVER OVERLAY
========================================================= */

.announcement-card__overlay {
  position: absolute;

  z-index: 3;

  inset: 0;

  background:
    linear-gradient(
      135deg,
      rgba(13, 33, 55, 0.97),
      rgba(22, 50, 74, 0.97)
    );

  transform: scaleX(0);

  transform-origin: left center;

  transition:
    transform 500ms
    cubic-bezier(0.65, 0, 0.35, 1);
}


.announcement-card:hover .announcement-card__overlay {
  transform: scaleX(1);
}


/* =========================================================
   HOVER ACTION
========================================================= */

.announcement-card__action {
  position: absolute;

  z-index: 5;

  left: 50%;
  top: 50%;

  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 0.6rem;

  min-height: 42px;

  padding: 0.7rem 1.1rem;

  color: var(--navy);

  background: var(--gold);

  border:
    1px solid var(--gold);

  border-radius: 0.65rem;

  font: inherit;

  font-size: 0.7rem;

  font-weight: 700;

  cursor: pointer;

  opacity: 0;

  transform:
    translate(-50%, -40%)
    scale(0.95);

  transition:
    opacity 300ms ease 100ms,
    transform 350ms ease 100ms,
    background 250ms ease,
    box-shadow 250ms ease;
}


.announcement-card:hover .announcement-card__action {
  opacity: 1;

  transform:
    translate(-50%, -50%)
    scale(1);
}


.announcement-card__action:hover {
  background: var(--gold-soft);

  box-shadow:
    0 8px 22px rgba(244, 208, 63, 0.22);
}


.announcement-card__action-arrow {
  transition:
    transform 250ms ease;
}


.announcement-card__action:hover
.announcement-card__action-arrow {
  transform: translateX(4px);
}


/* =========================================================
   CONTENT
========================================================= */

.announcement-card__content {
  display: flex;

  flex-direction: column;

  flex: 1;

  padding: 1.3rem;
}


/* =========================================================
   DATE
========================================================= */

.announcement-card__date {
  display: flex;

  align-items: center;

  gap: 0.4rem;

  margin: 0 0 0.55rem;

  color: var(--color-text-muted, #64748b);

  font-size: 0.65rem;

  font-weight: 600;

  letter-spacing: 0.02em;
}


.announcement-card__date-icon {
  width: 14px;
  height: 14px;

  flex-shrink: 0;

  color: var(--gold-dark, #d4af1f);
}


/* =========================================================
   TITLE
========================================================= */

.announcement-card__title {
  margin: 0;

  color:
    var(--color-text-main, #0d2137);

  font-family:
    var(--font-heading, inherit);

  font-size: 1rem;

  font-weight: 700;

  line-height: 1.35;

  letter-spacing: -0.015em;

  display: -webkit-box;

  -webkit-line-clamp: 2;

  -webkit-box-orient: vertical;

  overflow: hidden;
}


:global(.dark) .announcement-card__title {
  color: #ffffff;
}


/* =========================================================
   DESCRIPTION
========================================================= */

.announcement-card__description {
  display: -webkit-box;

  flex: 1;

  margin: 0.7rem 0 0;

  color:
    var(--color-text-muted, #64748b);

  font-size: 0.73rem;

  line-height: 1.7;

  -webkit-line-clamp: 3;

  -webkit-box-orient: vertical;

  overflow: hidden;
}


:global(.dark) .announcement-card__description {
  color: #aebdca;
}


/* =========================================================
   BOTTOM BUTTON
========================================================= */

.announcement-card__bottom-actions {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: 1.1rem;
}

.announcement-card__bottom-button {
  position: relative;

  flex: 1;
  display: inline-flex;

  align-items: center;

  align-self: flex-start;

  gap: 0.5rem;

  min-height: 44px;

  padding: 0.55rem 0.85rem;

  overflow: hidden;

  background:
    rgba(13, 33, 55, 0.045);

  color:
    var(--color-text-main, #0d2137);

  border:
    1px solid var(--color-border, #e5e7eb);

  border-radius: 0.6rem;

  font: inherit;

  font-size: 0.63rem;

  font-weight: 700;

  cursor: pointer;

  transition:
    color 300ms ease,
    border-color 300ms ease,
    transform 300ms ease,
    background 300ms ease;
}


/* Gold hover layer */

.announcement-card__bottom-button::before {
  content: '';

  position: absolute;

  inset: 0;

  background:
    linear-gradient(
      100deg,
      var(--gold-dark),
      var(--gold),
      var(--gold-soft)
    );

  transform: scaleX(0);

  transform-origin: left;

  transition:
    transform 400ms
    cubic-bezier(0.65, 0, 0.35, 1);
}


.announcement-card__bottom-button span {
  position: relative;

  z-index: 1;
}


.announcement-card__bottom-button:hover {
  color: var(--navy);

  border-color:
    transparent;

  transform:
    translateY(-1px);
}


.announcement-card__bottom-button:hover::before {
  transform: scaleX(1);
}


.announcement-card__bottom-arrow {
  transition:
    transform 250ms ease;
}


.announcement-card__bottom-button:hover
.announcement-card__bottom-arrow {
  transform: translateX(4px);
}


/* =========================================================
   DARK MODE BUTTON
========================================================= */

:global(.dark)
.announcement-card__bottom-button {
  background:
    rgba(255, 255, 255, 0.04);

  border-color:
    rgba(255, 255, 255, 0.08);

  color: #ffffff;
}


:global(.dark)
.announcement-card__bottom-button:hover {
  color: var(--navy);
}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 640px) {

  .announcement-card {
    min-height: 450px;
  }

  .announcement-card__preview {
    height: 165px;
    flex-basis: 165px;
  }


  .announcement-card__content {
    padding: 1.05rem;
  }


  .announcement-card__title {
    font-size: 0.92rem;
  }


  .announcement-card__description {
    font-size: 0.69rem;
  }


  /*
   * Hover action is hidden on touch devices.
   * The bottom Read More button remains available.
   */

  .announcement-card__action {
    display: none;
  }
}


/* =========================================================
   SMALL PHONES
========================================================= */

@media (max-width: 400px) {

  .announcement-card {
    border-radius: 1rem;
  }


  .announcement-card__preview {
    height: 155px;
    flex-basis: 155px;
  }


  .announcement-card__content {
    padding: 0.95rem;
  }


  .announcement-card__pdf-icon {
    width: 60px;
    height: 60px;
  }


  .announcement-card__pdf-icon img {
    width: 34px;
    height: 34px;
  }


  .announcement-card__title {
    font-size: 0.88rem;
  }


  .announcement-card__description {
    font-size: 0.67rem;
  }
}


/* =========================================================
   TOUCH DEVICES
========================================================= */

@media (hover: none) {

  .announcement-card:hover {
    transform: none;
  }

  .announcement-card:hover .announcement-card__glow {
    transform: none;
  }

  .announcement-card:hover .announcement-card__document {
    transform: none;
  }

  .announcement-card:hover .announcement-card__pdf-icon {
    transform: none;
  }
}
</style>
