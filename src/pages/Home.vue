<template>
  <div class="home-page">

    <!-- =====================================================
         GLOBAL HOME BACKGROUND
    ====================================================== -->
    <div
      class="home-page__bg"
      :style="{ '--home-bg-image': `url(${storyImage})` }"
      aria-hidden="true"
    ></div>

    <HeroSection />

    <!-- =====================================================
         LATEST SERMON
    ====================================================== -->
    <section id="welcome" class="site-section home-section">
      <div class="site-container">

        <div class="home-section__head">
          <div>
            <p class="section-tag">Latest Sermon</p>
            <h2 class="home-section__title">
              Recent Messages
            </h2>
          </div>

          <RouterLink
            to="/sermons"
            class="home-section__more"
          >
            All Sermons
            <span aria-hidden="true">→</span>
          </RouterLink>
        </div>

        <!-- Loading -->
        <div
          v-if="sermonsLoading"
          class="home-cards home-cards--sermon"
        >
          <div
            v-for="n in 3"
            :key="n"
            class="card home-skel"
          ></div>
        </div>

        <!-- Data -->
        <div
          v-else-if="sermons.length"
          class="home-cards home-cards--sermon"
        >
          <SermonCard
            v-for="sermon in sermons"
            :key="sermon.id"
            :sermon="sermon"
            @play="goToSermon"
          />
        </div>

        <!-- Empty -->
        <p
          v-else
          class="home-empty"
        >
          Sermons will appear here once posted.
        </p>

      </div>
    </section>


    <!-- =====================================================
         SCROLL STORY
         Worship panel removed from here because Worship With Us
         now appears AFTER Upcoming Events.
    ====================================================== -->
    <ScrollStory>

      <!-- PANEL 1 -->
      <template #panel-0>
        <section class="story-panel story-panel--light">

          <div class="site-container story-panel__inner">

            <p class="section-tag section-tag--light">
              Welcome to Golani
            </p>

            <h2
              class="story-panel__title story-panel__title--light"
            >
              A church family growing together
            </h2>

            <p
              class="story-panel__copy story-panel__copy--light"
            >
              {{ church.description }}
            </p>

            <div class="story-panel__actions">

              <RouterLink
                to="/about"
                class="btn-primary"
              >
                Our Story
                <span aria-hidden="true">→</span>
              </RouterLink>

              <RouterLink
                to="/contact"
                class="story-panel__link story-panel__link--light"
              >
                First time visiting?
              </RouterLink>

            </div>

          </div>

        </section>
      </template>


      <!-- PANEL 2 -->
      <template #panel-1>
        <section class="story-panel story-panel--navy">

          <div class="site-container story-panel__inner">

            <p class="section-tag section-tag--light">
              Church Life
            </p>

            <h2
              class="story-panel__title story-panel__title--light"
            >
              There is a place for you here
            </h2>

            <p
              class="story-panel__copy story-panel__copy--light"
            >
              Worship together, learn together, serve together —
              discover ministries, events, and a community where
              you belong.
            </p>

            <RouterLink
              to="/ministries"
              class="story-panel__cta"
            >
              <span>Explore Ministries</span>
              <span aria-hidden="true">→</span>
            </RouterLink>

          </div>

        </section>
      </template>

    </ScrollStory>


    <!-- =====================================================
         UPCOMING EVENTS
         WORSHIP WITH US COMES AFTER THIS SECTION
    ====================================================== -->
    <section
      class="site-section home-section home-section--alt"
    >

      <div class="site-container">

        <div class="home-section__head">

          <div>
            <p class="section-tag">
              Future Events
            </p>

            <h2 class="home-section__title">
              Upcoming Events
            </h2>
          </div>

          <RouterLink
            to="/events"
            class="home-section__more"
          >
            All Events
            <span aria-hidden="true">→</span>
          </RouterLink>

        </div>


        <!-- Loading -->
        <div
          v-if="eventsLoading"
          class="home-cards home-cards--event"
        >

          <div
            v-for="n in 3"
            :key="n"
            class="card home-skel home-skel--tall"
          ></div>

        </div>


        <!-- Data -->
        <div
          v-else-if="events.length"
          class="home-cards home-cards--event"
        >

          <EventCard
            v-for="event in events"
            :key="event.id"
            :event="event"
          />

        </div>


        <!-- Empty -->
        <p
          v-else
          class="home-empty"
        >
          Upcoming events will be listed here soon.
        </p>

      </div>

    </section>


    <!-- =====================================================
         WORSHIP WITH US
         NOW DIRECTLY AFTER EVENTS
    ====================================================== -->
    <section
      class="worship-with-us"
      aria-labelledby="worship-with-us-title"
    >

      <div class="worship-with-us__overlay"></div>

      <div class="site-container worship-with-us__content">

        <p class="section-tag section-tag--light">
          Worship With Us
        </p>

        <h2
          id="worship-with-us-title"
          class="worship-with-us__title"
        >
          Come as you are
        </h2>

        <p class="worship-with-us__copy">
          Join our church family as we gather to worship,
          study God's Word, pray, and fellowship together.
        </p>

        <RouterLink
          to="/worship"
          class="worship-with-us__link"
        >
          <span>Worship Schedule</span>
          <span aria-hidden="true">→</span>
        </RouterLink>

      </div>

    </section>


    <!-- =====================================================
         ABOUT / MISSION & VISION
    ====================================================== -->
    <section class="site-section home-section">

      <div class="site-container home-about">

        <div class="home-about__intro">

          <p class="section-tag">
            About Our Church
          </p>

          <h2 class="home-section__title">
            Brief From History
          </h2>

          <p class="home-about__text">
            We are a community of believers who take Jesus Christ
            to be our personal Lord and Savior.
          </p>

          <RouterLink
            to="/about"
            class="btn-primary home-about__cta"
          >
            Discover More
          </RouterLink>

        </div>


        <div class="home-about__values">

          <div class="home-value">

            <span
              class="home-value__icon"
              aria-hidden="true"
            >
              ◎
            </span>

            <div>

              <h3>Our Mission</h3>

              <p>
                To make disciples of Jesus Christ and unleash
                members' potential in proclaiming the gospel of
                the Three Angels' Messages and providing services
                to surrounding communities.
              </p>

            </div>

          </div>


          <div class="home-value">

            <span
              class="home-value__icon"
              aria-hidden="true"
            >
              ✦
            </span>

            <div>

              <h3>Our Vision</h3>

              <p>
                To become the center of excellence in making
                people disciples of Christ.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         ANNOUNCEMENTS
    ====================================================== -->
    <section
      class="site-section home-section home-section--alt"
    >

      <div class="site-container">

        <div class="home-section__head">

          <div>

            <p class="section-tag">
              Announcements
            </p>

            <h2 class="home-section__title">
              Our Church Announcements
            </h2>

          </div>

          <RouterLink
            to="/announcements"
            class="home-section__more"
          >
            All Announcements
            <span aria-hidden="true">→</span>
          </RouterLink>

        </div>


        <!-- Loading -->
        <div
          v-if="announcementsLoading"
          class="home-announcements"
        >

          <div
            v-for="n in 3"
            :key="n"
            class="card home-skel home-skel--tall"
          ></div>

        </div>


        <!-- Data -->
        <div
          v-else-if="announcements.length"
          class="home-announcements"
        >

          <AnnouncementCard
            v-for="item in announcements"
            :key="item.id"
            :announcement="item"
            @read-more="goToAnnouncement"
          />

        </div>


        <!-- Empty -->
        <p
          v-else
          class="home-empty"
        >
          No announcements posted right now.
        </p>

      </div>

    </section>


    <!-- =====================================================
         WORSHIP SERVICE HOURS
    ====================================================== -->
    <section
      class="site-section site-section--navy home-worship"
    >

      <div class="site-container">

        <div
          class="home-section__head home-section__head--light"
        >

          <div>

            <p class="section-tag section-tag--light">
              Gatherings
            </p>

            <h2
              class="home-section__title
                     home-section__title--light"
            >
              Service Hours
            </h2>

          </div>

        </div>


        <div class="home-worship__grid">

          <article
            v-for="service in services"
            :key="service.key"
            class="worship-card"
          >

            <span class="worship-card__day">
              {{ service.day }}
            </span>

            <h3 class="worship-card__title">
              {{ service.name }}
            </h3>

            <p class="worship-card__time">

              {{ service.startTime }}

              <span v-if="service.endTime">
                – {{ service.endTime }}
              </span>

            </p>

          </article>

        </div>


        <div class="home-worship__cta">

          <RouterLink
            to="/worship"
            class="story-panel__link story-panel__link--light"
          >
            Full Service Times & Directions
            <span aria-hidden="true">→</span>
          </RouterLink>

        </div>

      </div>

    </section>


    <!-- =====================================================
         EXPLORE & CONNECT
    ====================================================== -->
    <section class="site-section home-next">

      <div class="site-container home-next__grid">

        <div class="home-next__intro">

          <p class="section-tag">
            Explore Golani
          </p>

          <h2 class="home-section__title">
            Growing together. Serving together.
          </h2>

          <p class="home-about__text">
            Discover the ministries, team, events, and messages
            that make up our church family.
          </p>

        </div>


        <nav
          class="home-next__nav"
          aria-label="Explore Golani Links"
        >

          <RouterLink
            to="/ministries"
            class="next-link"
          >
            <span>Ministries</span>
            <span
              class="next-link__arrow"
              aria-hidden="true"
            >
              →
            </span>
          </RouterLink>


          <RouterLink
            to="/events"
            class="next-link"
          >
            <span>Events</span>
            <span
              class="next-link__arrow"
              aria-hidden="true"
            >
              →
            </span>
          </RouterLink>


          <RouterLink
            to="/sermons"
            class="next-link"
          >
            <span>Sermons</span>
            <span
              class="next-link__arrow"
              aria-hidden="true"
            >
              →
            </span>
          </RouterLink>


          <RouterLink
            to="/leadership"
            class="next-link"
          >
            <span>Leadership</span>
            <span
              class="next-link__arrow"
              aria-hidden="true"
            >
              →
            </span>
          </RouterLink>

        </nav>

      </div>

    </section>


    <!-- =====================================================
         CHURCH PILLARS
    ====================================================== -->
    <OurPillars />

  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import HeroSection from '@/components/home/HeroSection.vue'
import OurPillars from '@/components/home/OurPillars.vue'
import ScrollStory from '@/components/home/ScrollStory.vue'

import SermonCard from '@/components/sermons/SermonCard.vue'
import EventCard from '@/components/events/EventCard.vue'
import AnnouncementCard from '@/components/home/AnnouncementCard.vue'

import storyImage from '@/assets/images/worship-crowd.png'

import { church } from '@/constants/church'
import { defaultServices as services } from '@/constants/services'

import sermonService from '@/services/sermonService'
import eventService from '@/services/eventService'
import announcementService from '@/services/announcementService'

import { sermons as demoSermons } from '@/data/sermons.js'
import { events as demoEvents } from '@/data/events.js'
import { announcements as demoAnnouncements } from '@/data/announcements.js'


const router = useRouter()


// ============================================================
// SERMONS
// ============================================================

const sermons = ref([])
const sermonsLoading = ref(true)

async function loadSermons() {
  try {
    const res = await sermonService.getAll({
      page_size: 3,
      ordering: '-sermon_date'
    })

    const list = res?.results ?? res

    sermons.value =
      Array.isArray(list) && list.length
        ? list.slice(0, 3)
        : demoSermons.slice(0, 3)

  } catch {
    sermons.value = demoSermons.slice(0, 3)
  } finally {
    sermonsLoading.value = false
  }
}


function goToSermon(sermon) {
  router.push({
    name: 'SermonDetail',
    params: {
      id: sermon.id
    }
  })
}


// ============================================================
// EVENTS
// ============================================================

const events = ref([])
const eventsLoading = ref(true)

async function loadEvents() {
  try {
    const res = await eventService.getUpcoming({
      page_size: 3
    })

    const list = res?.results ?? res

    events.value =
      Array.isArray(list) && list.length
        ? list.slice(0, 3)
        : demoEvents.slice(0, 3)

  } catch {
    events.value = demoEvents.slice(0, 3)
  } finally {
    eventsLoading.value = false
  }
}


// ============================================================
// ANNOUNCEMENTS
// ============================================================

const announcements = ref([])
const announcementsLoading = ref(true)

async function loadAnnouncements() {
  try {
    const res = await announcementService.getAll({
      page_size: 3
    })

    const list = res?.results ?? res

    announcements.value =
      Array.isArray(list) && list.length
        ? list.slice(0, 3)
        : demoAnnouncements.slice(0, 3)

  } catch {
    announcements.value = demoAnnouncements.slice(0, 3)
  } finally {
    announcementsLoading.value = false
  }
}


function goToAnnouncement(item) {
  router.push({
    name: 'AnnouncementDetail',
    params: {
      id: item.id
    }
  })
}


// ============================================================
// INITIAL LOAD
// ============================================================

onMounted(() => {
  loadSermons()
  loadEvents()
  loadAnnouncements()
})
</script>


<style scoped>

/* =========================================================
   HOME PAGE
========================================================= */

.home-page {
  position: relative;
  z-index: 0;
  min-height: 100%;
  background: var(--color-white);
}


/* =========================================================
   FIXED BACKGROUND IMAGE
========================================================= */

.home-page__bg {
  position: fixed;
  inset: 0;
  z-index: -10;
  pointer-events: none;

  background-image:
    linear-gradient(
      180deg,
      rgba(9, 29, 43, 0.74),
      rgba(9, 29, 43, 0.88)
    ),
    var(--home-bg-image);

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  transform: translateZ(0);
}


/* =========================================================
   SECTIONS
========================================================= */

.home-section {
  background: var(--color-white);
}

.home-section--alt {
  background: var(--color-bg-alt);
}

.home-section__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.home-section__title {
  margin-top: 0.4rem;
  font-size: clamp(1.4rem, 2.6vw, 1.9rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-text-main);
}

.home-section__title--light {
  color: var(--color-white);
}

.home-section__head--light {
  border-bottom: none;
}

.home-section__more {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;

  color: var(--color-navy-deep);

  font-size: 0.86rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;

  transition:
    color 0.2s ease,
    gap 0.2s ease;
}

.home-section__more:hover {
  color: var(--color-gold-dark);
  gap: 0.6rem;
}

.home-empty {
  color: var(--color-text-muted);
  font-size: 0.92rem;
}


/* =========================================================
   CARD GRIDS
========================================================= */

.home-cards {
  display: grid;
  gap: 1.5rem;
}

.home-cards--sermon,
.home-cards--event {
  grid-template-columns:
    repeat(auto-fit, minmax(260px, 1fr));
}

.home-announcements {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
}


/* =========================================================
   SKELETON
========================================================= */

.home-skel {
  height: 320px;

  background:
    linear-gradient(
      90deg,
      var(--color-surface-alt) 25%,
      var(--color-border) 37%,
      var(--color-surface-alt) 63%
    );

  background-size: 400% 100%;

  animation:
    home-skel-shimmer 1.4s ease infinite;
}

.home-skel--tall {
  height: 360px;
}

@keyframes home-skel-shimmer {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}


/* =========================================================
   SCROLL STORY
========================================================= */

.story-panel {
  width: 100%;
  padding: clamp(3.25rem, 7vw, 6rem) 0;
  background: transparent;
}

.story-panel__inner {
  max-width: 680px;
}

.story-panel--navy .story-panel__inner {
  max-width: 620px;
}

.story-panel__title {
  margin-top: 0.55rem;

  font-size: clamp(1.8rem, 4vw, 3rem);
  line-height: 1.08;
  font-weight: 750;
  letter-spacing: -0.025em;

  color: var(--color-text-main);
  max-width: 12ch;
}

.story-panel__title--light {
  color: var(--color-white);
}

.story-panel__copy {
  max-width: 62ch;
  margin-top: 1rem;

  color: var(--color-text-muted);

  font-size: 1rem;
  line-height: 1.75;
}

.story-panel__copy--light {
  color: rgba(255, 255, 255, 0.8);
}

.story-panel__actions {
  display: flex;
  align-items: center;
  gap: 1.4rem;
  margin-top: 1.8rem;
  flex-wrap: wrap;
}

.story-panel__link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;

  color: var(--color-text-main);

  font-size: 0.92rem;
  font-weight: 650;

  text-decoration: underline;
  text-underline-offset: 4px;

  transition:
    color 0.2s ease,
    gap 0.2s ease;
}

.story-panel__link:hover {
  color: var(--color-gold-dark);
  gap: 0.65rem;
}

.story-panel__link--light {
  color: var(--color-white);
}

.story-panel__link--light:hover {
  color: var(--color-gold);
}

.story-panel__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;

  margin-top: 1.8rem;
  padding: 0.78rem 1.35rem;

  background: var(--color-gold);
  color: var(--color-navy-deep);

  border-radius: var(--radius-sm);

  font-size: 0.9rem;
  font-weight: 700;

  text-decoration: none;

  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
}

.story-panel__cta:hover {
  transform: translateY(-2px);
  background: var(--color-gold-soft);
}

.section-tag--light {
  color: var(--color-gold);
}


/* =========================================================
   WORSHIP WITH US
   This is now AFTER EVENTS
========================================================= */

.worship-with-us {
  position: relative;
  isolation: isolate;
  overflow: hidden;

  min-height: clamp(300px, 36vw, 430px);

  display: flex;
  align-items: center;

  background:
    linear-gradient(
      135deg,
      rgba(9, 29, 43, 0.88),
      rgba(9, 29, 43, 0.68)
    ),
    var(--home-bg-image);

  background-size: cover;
  background-position: center;
}

.worship-with-us__overlay {
  position: absolute;
  inset: 0;
  z-index: -1;

  background:
    linear-gradient(
      90deg,
      rgba(9, 29, 43, 0.92),
      rgba(9, 29, 43, 0.58)
    );
}

.worship-with-us__content {
  position: relative;
  z-index: 2;

  max-width: 760px;
  padding-block: clamp(4rem, 8vw, 6rem);
}

.worship-with-us__title {
  margin-top: 0.5rem;

  color: var(--color-white);

  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  font-weight: 750;
}

.worship-with-us__copy {
  max-width: 58ch;
  margin-top: 1rem;

  color: rgba(255, 255, 255, 0.8);

  font-size: 1rem;
  line-height: 1.75;
}

.worship-with-us__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  margin-top: 1.5rem;

  color: var(--color-white);

  font-size: 0.92rem;
  font-weight: 700;

  text-decoration: underline;
  text-underline-offset: 5px;

  transition:
    color 0.2s ease,
    gap 0.2s ease;
}

.worship-with-us__link:hover {
  color: var(--color-gold);
  gap: 0.75rem;
}


/* =========================================================
   ABOUT
========================================================= */

.home-about {
  display: grid;

  grid-template-columns:
    minmax(0, 0.9fr)
    minmax(0, 1.1fr);

  gap: clamp(2.5rem, 5vw, 4.5rem);

  align-items: start;
}

.home-about__intro {
  max-width: 420px;
}

.home-about__text {
  margin-top: 1rem;

  color: var(--color-text-muted);

  font-size: 0.96rem;
  line-height: 1.75;
}

.home-about__cta {
  margin-top: 1.75rem;
}

.home-about__values {
  display: grid;
  gap: 1.75rem;
}

.home-value {
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
}

.home-value__icon {
  flex-shrink: 0;

  width: 44px;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: var(--color-gold-10);
  color: var(--color-gold-dark);

  font-size: 1.1rem;
}

.home-value h3 {
  margin-bottom: 0.4rem;

  color: var(--color-text-main);

  font-size: 1.05rem;
  font-weight: 700;
}

.home-value p {
  color: var(--color-text-muted);

  font-size: 0.92rem;
  line-height: 1.7;
}


/* =========================================================
   SERVICE HOURS
========================================================= */

.home-worship {
  padding-block: clamp(3.5rem, 7vw, 5.5rem);
}

.home-worship .home-section__head {
  margin-bottom: 2rem;
}

.home-worship__grid {
  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(180px, 1fr));

  gap: 1px;

  background: rgba(255, 255, 255, 0.12);

  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-md);

  overflow: hidden;

  margin-bottom: 2rem;
}

.worship-card {
  background: var(--color-navy-dark);

  padding: 1.5rem 1.25rem;

  display: flex;
  flex-direction: column;

  transition: background-color 0.25s ease;
}

.worship-card:hover {
  background: rgba(255, 255, 255, 0.05);
}

.worship-card__day {
  color: var(--color-gold);

  font-size: 0.7rem;
  font-weight: 700;

  letter-spacing: 0.1em;
  text-transform: uppercase;

  margin-bottom: 0.9rem;
}

.worship-card__title {
  color: var(--color-white);

  font-size: 1rem;
  font-weight: 600;
  line-height: 1.3;
}

.worship-card__time {
  margin-top: auto;
  padding-top: 0.6rem;

  color: rgba(255, 255, 255, 0.65);

  font-size: 0.84rem;
}

.home-worship__cta {
  display: flex;
  justify-content: flex-start;
}


/* =========================================================
   EXPLORE
========================================================= */

.home-next {
  background-color: var(--color-bg-alt);

  padding-block:
    clamp(3.5rem, 7vw, 5.5rem);
}

.home-next__grid {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: clamp(2.5rem, 6vw, 5rem);

  align-items: center;
}

.home-next__nav {
  display: flex;
  flex-direction: column;

  border-top: 1px solid var(--color-border);
}

.next-link {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1.1rem 0.4rem;

  border-bottom: 1px solid var(--color-border);

  color: var(--color-text-main);

  font-size: 1rem;
  font-weight: 600;

  text-decoration: none;

  transition:
    color 0.2s ease,
    padding 0.2s ease;
}

.next-link__arrow {
  color: var(--color-gold-dark);

  transition: transform 0.2s ease;
}

.next-link:hover {
  color: var(--color-gold-dark);
  padding-left: 0.75rem;
}

.next-link:hover .next-link__arrow {
  transform: translateX(6px);
}


/* =========================================================
   FOOTER
   IMPORTANT:
   Footer is rendered by DefaultLayout OUTSIDE Home.vue.
   Therefore we target it globally here.
========================================================= */

:global(.app-footer),
:global(.site-footer),
:global(footer.app-footer),
:global(footer.site-footer) {
  position: relative;
  isolation: isolate;

  background:
    linear-gradient(
      180deg,
      rgba(5, 20, 30, 0.88),
      rgba(5, 20, 30, 0.95)
    ),
    url('@/assets/images/worship-crowd.png');

  background-size: cover;
  background-position: center;

  color: var(--color-white);
}


/* Footer overlay */

:global(.app-footer::before),
:global(.site-footer::before),
:global(footer.app-footer::before),
:global(footer.site-footer::before) {
  content: '';

  position: absolute;
  inset: 0;

  z-index: -1;

  background:
    linear-gradient(
      180deg,
      rgba(9, 29, 43, 0.35),
      rgba(5, 20, 30, 0.7)
    );

  pointer-events: none;
}


/* Make footer contents stay above overlay */

:global(.app-footer > *),
:global(.site-footer > *),
:global(footer.app-footer > *),
:global(footer.site-footer > *) {
  position: relative;
  z-index: 2;
}


/* Footer text */

:global(.app-footer h1),
:global(.app-footer h2),
:global(.app-footer h3),
:global(.app-footer h4),
:global(.site-footer h1),
:global(.site-footer h2),
:global(.site-footer h3),
:global(.site-footer h4) {
  color: var(--color-white);
}

:global(.app-footer p),
:global(.site-footer p) {
  color: rgba(255, 255, 255, 0.72);
}

:global(.app-footer a),
:global(.site-footer a) {
  color: rgba(255, 255, 255, 0.82);

  transition:
    color 0.2s ease,
    opacity 0.2s ease;
}

:global(.app-footer a:hover),
:global(.site-footer a:hover) {
  color: var(--color-gold);
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 900px) {

  .home-about {
    grid-template-columns: 1fr;
  }

  .home-about__intro {
    max-width: 100%;
  }

  .home-next__grid {
    grid-template-columns: 1fr;
  }

}


@media (max-width: 600px) {

  .home-section__head {
    align-items: flex-start;
  }

  .story-panel {
    padding: 3rem 0;
  }

  .story-panel__title {
    max-width: none;

    font-size:
      clamp(1.7rem, 8vw, 2.25rem);
  }

  .story-panel__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .worship-with-us {
    min-height: 340px;
  }

  .worship-with-us__content {
    padding-block: 3.5rem;
  }

  .worship-with-us__title {
    font-size:
      clamp(2rem, 10vw, 2.7rem);
  }

}


/* =========================================================
   REDUCED MOTION
========================================================= */

@media (prefers-reduced-motion: reduce) {

  .home-skel {
    animation: none;
  }

}
</style>