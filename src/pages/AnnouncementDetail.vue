```vue
<template>
  <div class="announcement-detail">
    <!-- =====================================================
         HERO
    ====================================================== -->
    <div class="page-hero">
      <div class="page-hero__inner">
        <div class="container-custom">
          <Breadcrumbs
            :crumbs="[
              {
                to: '/announcements',
                label: 'Announcements'
              },
              {
                label: announcement?.title || 'Announcement'
              }
            ]"
          />
        </div>
      </div>
    </div>

    <main class="container-custom announcement-detail__main">

      <!-- LOADING -->
      <div
        v-if="loading"
        class="announcement-detail__loading"
      >
        <div class="loading-line loading-line--small"></div>
        <div class="loading-line loading-line--title"></div>
        <div class="loading-document"></div>
      </div>

      <!-- NOT FOUND -->
      <div
        v-else-if="!announcement"
        class="announcement-detail__empty"
      >
        <div class="announcement-detail__empty-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 5.5A2.5 2.5 0 016.5 3H20v16H6.5A2.5 2.5 0 014 21.5v-16z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 19a2.5 2.5 0 012.5-2.5H20"
            />
          </svg>
        </div>

        <h2>Announcement Not Found</h2>

        <p>
          This announcement may have been removed or is no longer available.
        </p>

        <RouterLink
          to="/announcements"
          class="gradient-button"
        >
          <span>Back to Announcements</span>
          <span aria-hidden="true">←</span>
        </RouterLink>
      </div>

      <!-- CONTENT -->
      <article
        v-else
        class="announcement-detail__article"
      >

        <!-- HEADER -->
        <header class="announcement-detail__header">

          <div class="announcement-detail__badges">

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

          <h1 class="announcement-detail__title">
            {{ announcement.title }}
          </h1>

          <div class="announcement-detail__meta">

            <svg
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

            <span>
              {{
                formatDate(
                  announcement.announcement_date ||
                  announcement.created_at
                )
              }}
            </span>

          </div>

        </header>

        <!-- DOCUMENT -->
        <section
          v-if="pdfUrl"
          class="announcement-document"
        >

          <div class="announcement-document__glow"></div>

          <div class="announcement-document__icon">
            <img
              :src="pdfLogo"
              alt=""
            />
          </div>

          <div class="announcement-document__info">

            <p class="announcement-document__label">
              PDF Document
            </p>

            <h2 class="announcement-document__filename">
              {{ announcement.title }}.pdf
            </h2>

            <p class="announcement-document__description">
              Open or download the official announcement document.
            </p>

          </div>

          <div class="announcement-document__actions">

            <a
              :href="pdfUrl"
              target="_blank"
              rel="noopener"
              class="gradient-button"
            >
              <span>Open PDF</span>
              <span aria-hidden="true">↗</span>
            </a>

            <a
              :href="pdfUrl"
              :download="`${announcement.title}.pdf`"
              class="outline-button"
            >
              <span>Download</span>
              <span aria-hidden="true">↓</span>
            </a>

          </div>

        </section>

        <!-- PDF PREVIEW -->
        <section
          v-if="pdfUrl"
          class="announcement-preview"
        >

          <div class="announcement-preview__header">

            <div>
              <p class="announcement-preview__eyebrow">
                Document
              </p>

              <h2>Preview</h2>
            </div>

            <a
              :href="pdfUrl"
              target="_blank"
              rel="noopener"
              class="preview-link"
            >
              Open separately
              <span aria-hidden="true">↗</span>
            </a>

          </div>

          <div class="announcement-preview__frame-wrapper">

            <iframe
              :src="pdfUrl"
              class="announcement-preview__frame"
              title="Announcement PDF preview"
            ></iframe>

          </div>

          <p class="announcement-preview__hint">
            If the document does not appear correctly,
            open the PDF directly using the button above.
          </p>

        </section>

        <!-- TEXT FALLBACK -->
        <section
          v-else
          class="announcement-text"
        >

          <div class="announcement-text__icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 4h14v16H5z"
              />

              <path
                stroke-linecap="round"
                d="M8 8h8M8 12h8M8 16h5"
              />
            </svg>
          </div>

          <p>
            {{
              announcement.content ||
              announcement.summary ||
              'No further details were provided for this announcement.'
            }}
          </p>

        </section>

        <!-- BACK -->
        <div class="announcement-detail__footer">

          <RouterLink
            to="/announcements"
            class="back-link"
          >
            <span aria-hidden="true">←</span>
            <span>All Announcements</span>
          </RouterLink>

        </div>

      </article>

    </main>
  </div>
</template>


<script setup>
import {
  ref,
  computed,
  onMounted,
} from 'vue'

import {
  useRoute,
  RouterLink,
} from 'vue-router'

import {
  formatDate,
} from '@/utils/index.js'

import announcementService from '@/services/announcementService'

import {
  announcements as demoAnnouncements,
} from '@/data/announcements.js'

import Breadcrumbs from '@/components/common/Breadcrumbs.vue'

import pdfLogo from '@/assets/logos/pdf.png'


/* =========================================================
   API BASE URL
========================================================= */

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL
    ?.replace('/api/v1', '') ||
  'http://127.0.0.1:8000'


const route = useRoute()

const announcement = ref(null)

const loading = ref(false)


/* =========================================================
   LOAD ANNOUNCEMENT
========================================================= */

onMounted(async () => {
  loading.value = true

  try {
    announcement.value =
      await announcementService.getById(
        route.params.id
      )
  } catch {
    /*
     * Backend unavailable or announcement
     * doesn't exist in the API yet.
     *
     * Keep demo data fallback.
     */
    announcement.value =
      demoAnnouncements.find(
        (item) =>
          String(item.id) ===
          String(route.params.id)
      ) || null
  } finally {
    loading.value = false
  }
})


/* =========================================================
   PDF URL
========================================================= */

const pdfUrl = computed(() => {
  const src =
    announcement.value?.pdf_file_url

  if (!src) {
    return null
  }

  return src.startsWith('http')
    ? src
    : BASE_URL + src
})
</script>


<style scoped>

/* =========================================================
   GOLANI SDA BRAND
<<<<<<< HEAD
   Navy: #16324a
=======
   Navy: #0d2137
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
   Navy Dark: #0a1a2c
   Navy Soft: #2c4a63
   Gold: #f4d03f
   Gold Dark: #d4af1f
   Gold Soft: #f7dd6d
   White: #ffffff
========================================================= */


/* =========================================================
   PAGE
========================================================= */

.announcement-detail {
  min-height: 100vh;

  background:
    var(--color-bg, #ffffff);

  color:
<<<<<<< HEAD
    var(--color-text-main, #16324a);
=======
    var(--color-text-main, #0d2137);
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
}

:global(.dark) .announcement-detail {
  background: #0a1622;
}


/* =========================================================
   MAIN
========================================================= */

.announcement-detail__main {
  padding-top: 3.5rem;
  padding-bottom: 4rem;
}


/* =========================================================
   ARTICLE
========================================================= */

.announcement-detail__article {
  width: 100%;
  max-width: 900px;

  margin: 0 auto;
}


/* =========================================================
   HEADER
========================================================= */

.announcement-detail__header {
  margin-bottom: 2rem;
}

.announcement-detail__badges {
  display: flex;

  flex-wrap: wrap;

  align-items: center;

  gap: 0.45rem;

  margin-bottom: 0.9rem;
}


/* Category badge */

.badge-primary {
  display: inline-flex;

  align-items: center;

  padding: 0.3rem 0.7rem;

  border-radius: 999px;

  background:
    rgba(244, 208, 63, 0.16);

  border:
    1px solid rgba(212, 175, 31, 0.35);

  color:
    #8d7414;

  font-size: 0.62rem;

  font-weight: 700;

  letter-spacing: 0.06em;

  text-transform: uppercase;
}

:global(.dark) .badge-primary {
  background:
    rgba(244, 208, 63, 0.12);

  border-color:
    rgba(244, 208, 63, 0.3);

  color:
    #f7dd6d;
}


/* Title */

.announcement-detail__title {
  max-width: 850px;

  margin: 0;

  color:
<<<<<<< HEAD
    var(--color-text-main, #16324a);
=======
    var(--color-text-main, #0d2137);
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7

  font-family:
    var(--font-heading, inherit);

  font-size:
    clamp(1.8rem, 4vw, 2.8rem);

  font-weight: 750;

  line-height: 1.12;

  letter-spacing: -0.035em;
}

:global(.dark) .announcement-detail__title {
  color: #ffffff;
}


/* =========================================================
   META
========================================================= */

.announcement-detail__meta {
  display: flex;

  align-items: center;

  gap: 0.5rem;

  margin-top: 1rem;

  color:
    var(--color-text-muted, #64748b);

  font-size: 0.72rem;

  font-weight: 600;
}

.announcement-detail__meta svg {
  width: 16px;
  height: 16px;

  color:
    var(--color-gold-dark, #d4af1f);
}


/* =========================================================
   BADGES
========================================================= */

.ad-badge {
  display: inline-flex;

  align-items: center;

  padding: 0.3rem 0.7rem;

  border-radius: 999px;

  font-size: 0.62rem;

  font-weight: 700;

  letter-spacing: 0.06em;

  text-transform: uppercase;
}


/* Urgent */

.ad-badge--urgent {
  background:
    rgba(13, 33, 55, 0.08);

  border:
    1px solid rgba(13, 33, 55, 0.15);

<<<<<<< HEAD
  color: var(--color-heading);
=======
  color:
    #0d2137;
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
}

:global(.dark) .ad-badge--urgent {
  background:
    rgba(255, 255, 255, 0.08);

  border-color:
    rgba(255, 255, 255, 0.14);

  color:
    #ffffff;
}


/* Pinned */

.ad-badge--pinned {
  background:
    rgba(244, 208, 63, 0.16);

  border:
    1px solid rgba(212, 175, 31, 0.3);

  color:
    #8d7414;
}

:global(.dark) .ad-badge--pinned {
  background:
    rgba(244, 208, 63, 0.12);

  border-color:
    rgba(244, 208, 63, 0.3);

  color:
    #f7dd6d;
}


/* =========================================================
   DOCUMENT PANEL
========================================================= */

.announcement-document {
  position: relative;

  display: flex;

  align-items: center;

  gap: 1.2rem;

  overflow: hidden;

  margin-bottom: 2rem;

  padding: 1.35rem;

  background:
    linear-gradient(
      135deg,
      #16324a,
<<<<<<< HEAD
      #16324a
=======
      #0d2137
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
    );

  border:
    1px solid rgba(244, 208, 63, 0.12);

  border-radius: 1.3rem;

  box-shadow:
    0 14px 35px rgba(13, 33, 55, 0.14);
}


/* Gold glow */

.announcement-document__glow {
  position: absolute;

  width: 260px;
  height: 260px;

  top: -140px;
  right: -80px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(244, 208, 63, 0.22),
      transparent 65%
    );
}


/* PDF icon */

.announcement-document__icon {
  position: relative;

  z-index: 1;

  flex-shrink: 0;

  display: grid;

  place-items: center;

  width: 64px;
  height: 64px;

  border-radius: 1rem;

  background:
    rgba(255, 255, 255, 0.08);

  border:
    1px solid rgba(244, 208, 63, 0.22);

  backdrop-filter: blur(8px);
}

.announcement-document__icon img {
  width: 38px;
  height: 38px;

  object-fit: contain;
}


/* Document information */

.announcement-document__info {
  position: relative;

  z-index: 1;

  flex: 1;

  min-width: 0;
}

.announcement-document__label {
  margin: 0 0 0.25rem;

  color:
    #f4d03f;

  font-size: 0.6rem;

  font-weight: 700;

  letter-spacing: 0.14em;

  text-transform: uppercase;
}

.announcement-document__filename {
  margin: 0;

  color:
    #ffffff;

  font-size: 0.95rem;

  font-weight: 700;

  line-height: 1.4;

  word-break: break-word;
}

.announcement-document__description {
  margin: 0.3rem 0 0;

  color:
    rgba(255, 255, 255, 0.68);

  font-size: 0.7rem;

  line-height: 1.55;
}


/* =========================================================
   ACTIONS
========================================================= */

.announcement-document__actions {
  position: relative;

  z-index: 2;

  display: flex;

  flex-wrap: wrap;

  gap: 0.55rem;

  flex-shrink: 0;
}


/* =========================================================
   GOLD PRIMARY BUTTON
========================================================= */

.gradient-button {
  position: relative;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 0.5rem;

  min-height: 38px;

  padding: 0.6rem 0.9rem;

  overflow: hidden;

  color:
<<<<<<< HEAD
    #16324a;
=======
    #0d2137;
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7

  background:
    #f4d03f;

  border:
    1px solid #f4d03f;

  border-radius: 0.65rem;

  font-size: 0.65rem;

  font-weight: 750;

  text-decoration: none;

  cursor: pointer;

  transition:
    transform 250ms ease,
    background 250ms ease,
    border-color 250ms ease,
    box-shadow 250ms ease;
}

.gradient-button span {
  position: relative;

  z-index: 1;
}

.gradient-button:hover {
  transform: translateY(-2px);

  background:
    #f7dd6d;

  border-color:
    #f7dd6d;

  box-shadow:
    0 8px 20px rgba(244, 208, 63, 0.22);
}


/* =========================================================
   OUTLINE BUTTON
========================================================= */

.outline-button {
  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 0.5rem;

  min-height: 38px;

  padding: 0.6rem 0.9rem;

  color:
    #ffffff;

  background:
    rgba(255, 255, 255, 0.05);

  border:
    1px solid rgba(244, 208, 63, 0.45);

  border-radius: 0.65rem;

  font-size: 0.65rem;

  font-weight: 700;

  text-decoration: none;

  transition:
    background 250ms ease,
    border-color 250ms ease,
    color 250ms ease,
    transform 250ms ease;
}

.outline-button:hover {
  background:
    rgba(244, 208, 63, 0.12);

  border-color:
    #f4d03f;

  color:
    #f7dd6d;

  transform:
    translateY(-2px);
}


/* =========================================================
   PDF PREVIEW
========================================================= */

.announcement-preview {
  overflow: hidden;

  margin-bottom: 2rem;

  background:
    var(--color-surface, #ffffff);

  border:
    1px solid var(--color-border, #e5e7eb);

  border-radius: 1.3rem;

  box-shadow:
    0 8px 28px rgba(13, 33, 55, 0.06);
}

:global(.dark) .announcement-preview {
  background:
    #0f2233;

  border-color:
    rgba(255, 255, 255, 0.07);
}


.announcement-preview__header {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 1rem;

  padding: 1rem 1.2rem;

  border-bottom:
    1px solid var(--color-border, #e5e7eb);
}

:global(.dark) .announcement-preview__header {
  border-color:
    rgba(255, 255, 255, 0.07);
}


.announcement-preview__eyebrow {
  margin: 0 0 0.2rem;

  color:
    #d4af1f;

  font-size: 0.58rem;

  font-weight: 700;

  letter-spacing: 0.14em;

  text-transform: uppercase;
}

:global(.dark) .announcement-preview__eyebrow {
  color:
    #f4d03f;
}


.announcement-preview__header h2 {
  margin: 0;

  color:
<<<<<<< HEAD
    var(--color-text-main, #16324a);
=======
    var(--color-text-main, #0d2137);
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7

  font-family:
    var(--font-heading, inherit);

  font-size: 0.95rem;

  font-weight: 700;
}

:global(.dark) .announcement-preview__header h2 {
  color:
    #ffffff;
}


/* Open separately */

.preview-link {
  display: inline-flex;

  align-items: center;

  gap: 0.35rem;

<<<<<<< HEAD
  color: var(--color-heading);
=======
  color:
    #0d2137;
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7

  font-size: 0.65rem;

  font-weight: 700;

  text-decoration: none;

  transition:
    color 250ms ease,
    transform 250ms ease;
}

.preview-link:hover {
  color:
    #d4af1f;

  transform:
    translateX(2px);
}

:global(.dark) .preview-link {
  color:
    #ffffff;
}

:global(.dark) .preview-link:hover {
  color:
    #f4d03f;
}


/* PDF frame */

.announcement-preview__frame-wrapper {
  padding: 0.75rem;

  background:
    #f1f4f6;
}

:global(.dark) .announcement-preview__frame-wrapper {
  background:
    #091927;
}

.announcement-preview__frame {
  display: block;

  width: 100%;

  height: 70vh;

  min-height: 460px;

  border: 0;

  border-radius: 0.8rem;

  background:
    #ffffff;
}

.announcement-preview__hint {
  margin: 0;

  padding: 0.8rem 1rem;

  color:
    var(--color-text-muted, #64748b);

  font-size: 0.67rem;

  text-align: center;
}


/* =========================================================
   TEXT FALLBACK
========================================================= */

.announcement-text {
  padding: 1.5rem;

  background:
    var(--color-surface, #ffffff);

  border:
    1px solid var(--color-border, #e5e7eb);

  border-radius: 1.2rem;

  box-shadow:
    0 8px 28px rgba(13, 33, 55, 0.05);
}

:global(.dark) .announcement-text {
  background:
    #0f2233;

  border-color:
    rgba(255, 255, 255, 0.07);
}


.announcement-text__icon {
  display: grid;

  place-items: center;

  width: 44px;
  height: 44px;

  margin-bottom: 1rem;

  border-radius: 0.8rem;

  background:
    rgba(244, 208, 63, 0.14);

  color:
    #b38f1f;

  border:
    1px solid rgba(212, 175, 31, 0.2);
}

:global(.dark) .announcement-text__icon {
  background:
    rgba(244, 208, 63, 0.1);

  color:
    #f4d03f;
}


.announcement-text__icon svg {
  width: 22px;
  height: 22px;
}

.announcement-text p {
  margin: 0;

  color:
    var(--color-text-main, #334155);

  font-size: 0.85rem;

  line-height: 1.8;

  white-space: pre-line;
}

:global(.dark) .announcement-text p {
  color:
    #cbd5e1;
}


/* =========================================================
   FOOTER
========================================================= */

.announcement-detail__footer {
  margin-top: 1.5rem;
}

.back-link {
  display: inline-flex;

  align-items: center;

  gap: 0.5rem;

  color:
    var(--color-text-muted, #64748b);

  font-size: 0.7rem;

  font-weight: 700;

  text-decoration: none;

  transition:
    color 250ms ease,
    transform 250ms ease;
}

.back-link:hover {
  color:
    #d4af1f;

  transform:
    translateX(-2px);
}

:global(.dark) .back-link:hover {
  color:
    #f4d03f;
}


/* =========================================================
   LOADING
========================================================= */

.announcement-detail__loading {
  max-width: 900px;

  margin: 0 auto;
}

.loading-line,
.loading-document {
  background:
    linear-gradient(
      90deg,
      rgba(13, 33, 55, 0.06),
      rgba(244, 208, 63, 0.16),
      rgba(13, 33, 55, 0.06)
    );

  background-size:
    200% 100%;

  animation:
    loading 1.5s infinite;
}

:global(.dark) .loading-line,
:global(.dark) .loading-document {
  background:
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.04),
      rgba(244, 208, 63, 0.1),
      rgba(255, 255, 255, 0.04)
    );

  background-size:
    200% 100%;
}

.loading-line {
  height: 14px;

  border-radius: 999px;

  margin-bottom: 1rem;
}

.loading-line--small {
  width: 30%;
}

.loading-line--title {
  width: 70%;

  height: 40px;
}

.loading-document {
  height: 220px;

  margin-top: 2rem;

  border-radius: 1.2rem;
}

@keyframes loading {
  0% {
    background-position:
      200% 0;
  }

  100% {
    background-position:
      -200% 0;
  }
}


/* =========================================================
   EMPTY
========================================================= */

.announcement-detail__empty {
  max-width: 600px;

  margin: 0 auto;

  padding: 5rem 1rem;

  text-align: center;
}

.announcement-detail__empty-icon {
  display: grid;

  place-items: center;

  width: 68px;
  height: 68px;

  margin: 0 auto 1.2rem;

  border-radius: 1.1rem;

  background:
    linear-gradient(
      135deg,
      #16324a,
<<<<<<< HEAD
      #16324a
=======
      #0d2137
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
    );

  color:
    #ffffff;

  box-shadow:
    0 10px 25px rgba(13, 33, 55, 0.14);
}

.announcement-detail__empty-icon svg {
  width: 30px;
  height: 30px;

  color:
    #f4d03f;
}


.announcement-detail__empty h2 {
  margin: 0;

  color:
<<<<<<< HEAD
    var(--color-text-main, #16324a);
=======
    var(--color-text-main, #0d2137);
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7

  font-family:
    var(--font-heading, inherit);

  font-size: 1.4rem;

  font-weight: 700;
}

:global(.dark) .announcement-detail__empty h2 {
  color:
    #ffffff;
}

.announcement-detail__empty p {
  margin: 0.6rem auto 1.5rem;

  max-width: 420px;

  color:
    var(--color-text-muted, #6b7280);

  font-size: 0.78rem;

  line-height: 1.7;
}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 700px) {

  .announcement-detail__main {
    padding-top: 2rem;

    padding-bottom: 3rem;
  }

  .announcement-document {
    align-items: flex-start;

    flex-wrap: wrap;
  }

  .announcement-document__info {
    flex-basis:
      calc(100% - 84px);
  }

  .announcement-document__actions {
    width: 100%;

    padding-top: 0.3rem;
  }

  .announcement-document__actions > * {
    flex: 1;
  }

  .announcement-preview__frame {
    height: 65vh;

    min-height: 400px;
  }
}


/* =========================================================
   SMALL MOBILE
========================================================= */

@media (max-width: 480px) {

  .announcement-detail__title {
    font-size: 1.65rem;
  }

  .announcement-document {
    padding: 1rem;
  }

  .announcement-document__icon {
    width: 54px;
    height: 54px;
  }

  .announcement-document__icon img {
    width: 32px;
    height: 32px;
  }

  .announcement-document__filename {
    font-size: 0.82rem;
  }

  .announcement-document__description {
    font-size: 0.64rem;
  }

  .announcement-document__actions {
    flex-direction: column;
  }

  .announcement-preview__header {
    align-items: flex-start;

    flex-direction: column;
  }

  .preview-link {
    font-size: 0.62rem;
  }

  .announcement-preview__frame {
    height: 60vh;

    min-height: 360px;
  }
}


/* =========================================================
   TOUCH DEVICES
========================================================= */

@media (hover: none) {

  .announcement-card:hover {
    transform: none;
  }

  .announcement-card__bottom-button {
    margin-top: 1rem;
  }
}

</style>
```
