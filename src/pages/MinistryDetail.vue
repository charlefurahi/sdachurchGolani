<template>
  <div class="min-h-screen bg-white dark:bg-navy-950">

    <!-- =====================================================
         HERO
    ====================================================== -->
    <section class="page-hero">

      <div class="container-custom page-hero__inner">

        <RouterLink
          to="/ministries"
          class="back-link"
        >
          ← All Ministries
        </RouterLink>


        <!-- HERO SKELETON -->
        <div
          v-if="loading"
          class="mt-8"
        >
          <div class="hero-skeleton hero-skeleton--small"></div>

          <div class="hero-skeleton hero-skeleton--title"></div>

          <div class="hero-skeleton hero-skeleton--text"></div>

          <div class="hero-skeleton hero-skeleton--text hero-skeleton--text-short"></div>
        </div>


        <!-- HERO CONTENT -->
        <template v-else-if="ministry">

          <p class="section-tag text-blue-200 mt-8">
            {{ parentLabel }}
          </p>

          <h1
            class="font-heading text-4xl md:text-6xl font-bold text-white mt-2"
          >
            {{ ministry.name }}
          </h1>

          <div class="divider-blue mt-5"></div>

          <p
            v-if="ministry.description"
            class="max-w-3xl mt-5 text-blue-100/85 leading-7"
          >
            {{ ministry.description }}
          </p>

        </template>

      </div>

    </section>


    <!-- =====================================================
         LOADING SKELETON
    ====================================================== -->
    <section
      v-if="loading"
      class="section"
    >

      <div class="container-custom">

        <div class="detail-layout">

          <!-- Main skeleton -->
          <div>

            <div class="detail-image-skeleton skeleton"></div>

            <div class="mt-8">

              <div class="skeleton skeleton-heading"></div>

              <div class="space-y-3 mt-5">
                <div class="skeleton skeleton-line"></div>
                <div class="skeleton skeleton-line"></div>
                <div class="skeleton skeleton-line"></div>
                <div class="skeleton skeleton-line skeleton-line--short"></div>
              </div>

            </div>

          </div>


          <!-- Leader skeleton -->
          <aside>

            <div class="leader-card">

              <div class="skeleton leader-skeleton-photo"></div>

              <div class="skeleton leader-skeleton-label"></div>

              <div class="skeleton leader-skeleton-name"></div>

              <div class="skeleton leader-skeleton-role"></div>

            </div>

          </aside>

        </div>


        <!-- Child skeletons -->
        <div class="mt-16">

          <div class="skeleton skeleton-subtitle"></div>

          <div class="children-grid">

            <div
              v-for="n in 3"
              :key="n"
              class="child-card"
            >

              <div class="skeleton child-skeleton-image"></div>

              <div class="child-card__content">

                <div class="skeleton child-skeleton-category"></div>

                <div class="skeleton child-skeleton-title"></div>

                <div class="skeleton child-skeleton-line"></div>

                <div class="skeleton child-skeleton-line child-skeleton-line--short"></div>

                <div class="skeleton child-skeleton-button"></div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         ACTUAL MINISTRY
    ====================================================== -->
    <section
      v-else-if="ministry"
      class="section"
    >

      <div class="container-custom">


        <!-- =================================================
             MINISTRY CONTENT
        ================================================== -->
        <div class="detail-layout">


          <!-- =================================================
               LEFT
          ================================================== -->
          <div>

            <!-- Image -->
            <div class="detail-image">

              <img
                v-if="ministryImage"
                :src="ministryImage"
                :alt="ministry.name"
                class="detail-image__img"
                @error="handleImageError"
              />

              <div
                v-else
                class="detail-image__placeholder"
              >
                <span>
                  {{ initials(ministry.name) }}
                </span>
              </div>

            </div>


            <!-- Description -->
            <article class="detail-description">

              <p class="section-tag">
                About this ministry
              </p>

              <h2>
                {{ ministry.name }}
              </h2>

              <div class="detail-description__body">

                {{
                  ministry.description ||
                  ministry.long_description ||
                  'The ministry description will be available from the church database.'
                }}

              </div>

            </article>

          </div>


          <!-- =================================================
               RIGHT: LEADER
          ================================================== -->
          <aside>

            <div class="leader-card">

              <p class="section-tag">
                Ministry Leader
              </p>


              <!-- Leader exists -->
              <div
                v-if="leader"
                class="leader-profile"
              >

                <RouterLink
                  v-if="leader.id"
                  :to="{
                    name: 'LeaderDetail',
                    params: { id: leader.id }
                  }"
                  class="leader-profile__link"
                >

                  <div class="leader-photo">

                    <img
                      v-if="leaderPhoto"
                      :src="leaderPhoto"
                      :alt="leaderName"
                      class="leader-photo__img"
                    />

                    <div
                      v-else
                      class="leader-photo__placeholder"
                    >
                      <span>
                        {{ initials(leaderName) }}
                      </span>
                    </div>

                  </div>


                  <h3>
                    {{ leaderName }}
                  </h3>


                  <p class="leader-role">
                    {{
                      leader.display_role ||
                      leader.role_title ||
                      leader.role ||
                      'Ministry Leader'
                    }}
                  </p>


                  <span class="leader-profile__details">
                    View leader profile →
                  </span>

                </RouterLink>


                <!-- Leader without profile route -->
                <div
                  v-else
                  class="leader-profile"
                >

                  <div class="leader-photo">

                    <img
                      v-if="leaderPhoto"
                      :src="leaderPhoto"
                      :alt="leaderName"
                      class="leader-photo__img"
                    />

                    <div
                      v-else
                      class="leader-photo__placeholder"
                    >
                      <span>
                        {{ initials(leaderName) }}
                      </span>
                    </div>

                  </div>

                  <h3>
                    {{ leaderName }}
                  </h3>

                  <p class="leader-role">
                    {{
                      leader.display_role ||
                      leader.role_title ||
                      leader.role ||
                      'Ministry Leader'
                    }}
                  </p>

                </div>

              </div>


              <!-- No leader -->
              <div
                v-else
                class="leader-empty"
              >

                <div class="leader-empty__icon">
                  👤
                </div>

                <p>
                  The current ministry leader will appear here when
                  the ministry and leadership records are connected
                  in the database.
                </p>

              </div>

            </div>

          </aside>

        </div>


        <!-- =====================================================
             SUB-MINISTRIES
        ====================================================== -->
        <section
          v-if="children.length"
          class="children-section"
        >

          <div class="children-heading">

            <div>

              <p class="section-tag">
                Ministry Areas
              </p>

              <h2>
                {{ childrenTitle }}
              </h2>

            </div>

            <p class="children-count">
              {{ children.length }}
              {{ children.length === 1 ? 'area' : 'areas' }}
            </p>

          </div>


          <!-- =================================================
               CHILDREN GRID
          ================================================== -->
          <div class="children-grid">

            <RouterLink
              v-for="child in children"
              :key="child.id || child.slug"
              :to="ministryRoute(child)"
              class="child-card group"
            >

              <!-- Image -->
              <div class="child-card__media">

                <img
                  v-if="getImage(child)"
                  :src="getImage(child)"
                  :alt="child.name"
                  class="child-card__image"
                  loading="lazy"
                />

                <div
                  v-else
                  class="child-card__placeholder"
                >
                  <span>
                    {{ initials(child.name) }}
                  </span>
                </div>


                <!-- Overlay -->
                <div class="child-card__overlay"></div>


                <!-- Discover -->
                <div class="child-card__discover">

                  <span>
                    Discover More
                  </span>

                  <span class="child-card__arrow">
                    →
                  </span>

                </div>

              </div>


              <!-- Content -->
              <div class="child-card__content">

                <span class="child-card__category">
                  {{ childCategory(child) }}
                </span>


                <h3>
                  {{ child.name }}
                </h3>


                <p>
                  {{
                    child.description ||
                    child.short ||
                    child.short_description ||
                    'Learn more about this ministry.'
                  }}
                </p>


                <!-- Leader -->
                <div
                  v-if="childLeader(child)"
                  class="child-card__leader"
                >

                  <span>
                    Leader
                  </span>

                  <strong>
                    {{ childLeader(child) }}
                  </strong>

                </div>


                <div class="child-card__footer">

                  <span>
                    Explore ministry
                  </span>

                  <span class="child-card__footer-arrow">
                    →
                  </span>

                </div>

              </div>

            </RouterLink>

          </div>

        </section>


        <!-- =====================================================
             NO CHILDREN
        ====================================================== -->
        <section
          v-else-if="isParentMinistry"
          class="children-empty"
        >

          <div class="children-empty__icon">
            +
          </div>

          <h2>
            Ministry areas
          </h2>

          <p>
            Additional ministry areas will appear here when they
            are added to the church database.
          </p>

        </section>

      </div>

    </section>


    <!-- =====================================================
         NOT FOUND
    ====================================================== -->
    <section
      v-else
      class="section"
    >

      <div class="container-custom text-center">

        <div class="not-found-icon">
          !
        </div>

        <h1>
          Ministry not found
        </h1>

        <p>
          The ministry may have been removed or is not available yet.
        </p>

        <RouterLink
          to="/ministries"
          class="btn-primary mt-7"
        >
          Back to Ministries
        </RouterLink>

      </div>

    </section>

  </div>
</template>


<script setup>

import {
  computed,
  onMounted,
  ref,
  watch
} from 'vue'

import {
  RouterLink,
  useRoute
} from 'vue-router'

import ministryService from '@/services/ministryService'
import leadershipService from '@/services/leadershipService'

import {
  ministryCatalog
} from '@/data/ministries.js'


/* =========================================================
   ROUTE
========================================================= */

const route = useRoute()


/* =========================================================
   STATE
========================================================= */

const ministry = ref(null)

const leader = ref(null)

const children = ref([])

const loading = ref(true)

const usingDemoData = ref(false)

const backendAvailable = ref(false)


/* =========================================================
   HELPERS
========================================================= */

function normalise(value) {

  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

}


function initials(name = '') {

  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase()

}


/* =========================================================
   IMAGE
========================================================= */

function getImage(record) {

  if (!record) return ''

  return (
    record.photo_url ||
    record.image_url ||
    record.image ||
    record.photo ||
    ''
  )

}


function handleImageError(event) {

  event.target.style.display = 'none'

}


/* =========================================================
   LEADER
========================================================= */

const leaderName = computed(() => {

  if (!leader.value) return ''

  return (
    leader.value.full_name ||
    leader.value.name ||
    `${leader.value.first_name || ''} ${leader.value.last_name || ''}`.trim()
  )

})


const leaderPhoto = computed(() => {

  if (!leader.value) return ''

  return (
    leader.value.photo_url ||
    leader.value.photoUrl ||
    leader.value.photo ||
    leader.value.image ||
    ''
  )

})


function extractLeader(record) {

  if (!record) return null

  if (
    record.leader &&
    typeof record.leader === 'object'
  ) {
    return record.leader
  }

  if (
    record.leader_detail &&
    typeof record.leader_detail === 'object'
  ) {
    return record.leader_detail
  }

  if (
    record.leader_data &&
    typeof record.leader_data === 'object'
  ) {
    return record.leader_data
  }

  return null

}


/* =========================================================
   CHILDREN
========================================================= */

function extractChildren(record) {

  if (!record) return []

  /*
   * Preferred backend structure:
   *
   * {
   *   children: [...]
   * }
   */

  if (Array.isArray(record.children)) {
    return record.children
  }


  /*
   * Other possible API names.
   */

  if (Array.isArray(record.subministries)) {
    return record.subministries
  }

  if (Array.isArray(record.sub_ministries)) {
    return record.sub_ministries
  }

  if (Array.isArray(record.child_ministries)) {
    return record.child_ministries
  }

  return []

}


/* =========================================================
   CHILD LEADER
========================================================= */

function childLeader(child) {

  const childLeaderRecord = extractLeader(child)

  if (childLeaderRecord) {

    return (
      childLeaderRecord.full_name ||
      childLeaderRecord.name ||
      `${childLeaderRecord.first_name || ''} ${childLeaderRecord.last_name || ''}`.trim()
    )

  }

  return (
    child.leader_name ||
    child.leader_full_name ||
    child.leader_display_name ||
    ''
  )

}


/* =========================================================
   CATEGORY
========================================================= */

function childCategory(child) {

  if (child.category_display) {
    return child.category_display
  }

  if (child.category) {

    if (typeof child.category === 'object') {
      return child.category.name || 'Ministry'
    }

    return child.category
  }

  return 'Ministry area'

}


/* =========================================================
   ROUTING
========================================================= */

function ministryRoute(record) {

  /*
   * Prefer slug because it produces readable URLs.
   *
   * If your router currently expects id,
   * replace this with:
   *
   * { name: 'MinistryDetail', params: { id: record.id } }
   */

  if (record.slug) {

    return {
      name: 'MinistryDetail',
      params: {
        id: record.slug
      }
    }

  }

  return {
    name: 'MinistryDetail',
    params: {
      id: record.id
    }
  }

}


/* =========================================================
   DEMO MINISTRY FINDER
========================================================= */

function findDemoMinistry(identifier) {

  const wanted = normalise(identifier)

  return ministryCatalog.find(item => {

    return (
      String(item.id) === String(identifier) ||
      normalise(item.slug) === wanted ||
      normalise(item.name) === wanted
    )

  })

}


/* =========================================================
   DEMO CHILDREN
========================================================= */

function findDemoChildren(record) {

  if (!record) return []

  /*
   * First use children already defined inside
   * ministryCatalog.
   */

  const embedded = extractChildren(record)

  if (embedded.length) {
    return embedded
  }


  /*
   * Otherwise find children in the complete catalog
   * using parent_id / parent_slug / parent reference.
   */

  return ministryCatalog.filter(item => {

    const parentId =
      item.parent_id ??
      item.parentId

    const parentSlug =
      item.parent_slug ??
      item.parentSlug

    const parent =
      item.parent

    return (
      String(parentId) === String(record.id) ||
      normalise(parentSlug) === normalise(record.slug) ||
      normalise(parent) === normalise(record.slug) ||
      normalise(parent) === normalise(record.name)
    )

  })

}


/* =========================================================
   LOAD LEADER
========================================================= */

async function loadLeader(record) {

  const embeddedLeader = extractLeader(record)

  if (embeddedLeader) {

    leader.value = embeddedLeader

    return

  }


  const leaderId =
    record?.leader_id ||
    record?.leaderId


  if (!leaderId) {

    leader.value = null

    return

  }


  try {

    const response =
      await leadershipService.getById(leaderId)

    leader.value =
      response?.data ??
      response ??
      null

  } catch {

    leader.value = null

  }

}


/* =========================================================
   LOAD CHILDREN FROM BACKEND
========================================================= */

async function loadBackendChildren(record) {

  /*
   * If backend already embeds children,
   * use them directly.
   */

  const embedded =
    extractChildren(record)

  if (embedded.length) {

    children.value = embedded

    return

  }


  /*
   * If getAll exists, retrieve the ministry records
   * and identify records belonging to this parent.
   *
   * This does NOT replace backend data with demo data.
   */

  if (
    typeof ministryService.getAll !== 'function'
  ) {

    children.value = []

    return

  }


  try {

    const response =
      await ministryService.getAll({
        page_size: 100
      })


    const list =
      response?.results ??
      response


    if (!Array.isArray(list)) {

      children.value = []

      return

    }


    const parentId =
      record.id

    const parentSlug =
      normalise(record.slug)

    children.value =
      list.filter(item => {

        const itemParentId =
          item.parent_id ??
          item.parentId ??
          item.parent?.id

        const itemParentSlug =
          normalise(
            item.parent_slug ??
            item.parentSlug ??
            item.parent?.slug
          )


        return (
          String(itemParentId) === String(parentId) ||
          (
            parentSlug &&
            itemParentSlug === parentSlug
          )
        )

      })

  } catch {

    children.value = []

  }

}


/* =========================================================
   LOAD MINISTRY
========================================================= */

async function loadMinistry() {

  loading.value = true

  ministry.value = null
  leader.value = null
  children.value = []

  usingDemoData.value = false
  backendAvailable.value = false


  const identifier =
    route.params.id


  // Everything below is wrapped in try/finally so `loading` always gets
  // turned off — on backend success, on demo fallback, and on "not found".
  // Before this, the function could `return` early (backend success) or
  // fall through (demo/not-found) without ever flipping loading back to
  // false, which is why the skeleton stayed on screen forever.
  try {

    /* =======================================================
       1. BACKEND FIRST
    ====================================================== */

    try {

      const response =
        await ministryService.getById(identifier)


      const backendRecord =
        response?.data ??
        response


      if (!backendRecord) {

        throw new Error(
          'Ministry not found'
        )

      }


      ministry.value =
        backendRecord

      backendAvailable.value =
        true


      /*
       * Backend is authoritative.
       */

      await loadLeader(
        backendRecord
      )

      await loadBackendChildren(
        backendRecord
      )


      return

    } catch (error) {

      console.warn(
        'Ministry backend unavailable. Falling back to demo data.',
        error
      )

    }


    /* =======================================================
       2. DEMO FALLBACK
    ====================================================== */

    const demo =
      findDemoMinistry(identifier)


    if (!demo) {

      ministry.value = null

      return

    }


    ministry.value =
      demo

    usingDemoData.value =
      true


    /*
     * Demo leader.
     *
     * If your ministryCatalog already contains
     * a leader object, use it.
     */

    const demoLeader =
      extractLeader(demo)


    if (demoLeader) {

      leader.value =
        demoLeader

    } else if (
      demo.leader
    ) {

      leader.value = {
        full_name:
          typeof demo.leader === 'string'
            ? demo.leader
            : demo.leader.name
      }

    }


    /*
     * Demo children.
     */

    children.value =
      findDemoChildren(demo)

  } finally {

    loading.value = false

  }

}


/* =========================================================
   COMPUTED
========================================================= */

const ministryImage =
  computed(() =>
    getImage(ministry.value)
  )


const isParentMinistry =
  computed(() => {

    if (!ministry.value) {
      return false
    }

    return (
      children.value.length > 0 ||
      ministry.value.has_children === true ||
      ministry.value.is_parent === true
    )

  })


const parentLabel =
  computed(() => {

    if (
      ministry.value?.parent_name
    ) {
      return ministry.value.parent_name
    }

    if (
      ministry.value?.parent?.name
    ) {
      return ministry.value.parent.name
    }

    return 'Ministry'

  })


const childrenTitle =
  computed(() => {

    /*
     * Special handling for Youth Ministries.
     */

    const name =
      normalise(ministry.value?.name)


    if (
      name.includes('youth')
    ) {
      return 'Youth Ministries'
    }


    return 'Ministry Areas'

  })


/* =========================================================
   WATCH ROUTE
========================================================= */

watch(
  () => route.params.id,
  () => {

    loadMinistry()

  }
)


/* =========================================================
   INITIAL LOAD
========================================================= */

onMounted(() => {

  loadMinistry()

})

</script>


<style scoped>

/* =========================================================
   BACK LINK
========================================================= */

.back-link {

  display: inline-flex;

  align-items: center;

  gap: 0.5rem;

  color: rgba(255,255,255,0.82);

  font-size: 0.78rem;

  font-weight: 600;

  text-decoration: none;

  transition:
    color 0.2s ease,
    transform 0.2s ease;

}

.back-link:hover {

  color: #ffffff;

  transform: translateX(-3px);

}


/* =========================================================
   DETAIL LAYOUT
========================================================= */

.detail-layout {

  display: grid;

  grid-template-columns:
    minmax(0, 2fr)
    minmax(280px, 1fr);

  gap: 3rem;

  align-items: start;

}


/* =========================================================
   IMAGE
========================================================= */

.detail-image {

  position: relative;

  overflow: hidden;

  background:
    var(--color-navy, #15324e);

  border:
    1px solid
    var(
      --color-border,
      rgba(13,33,55,0.1)
    );

}


.detail-image__img {

  display: block;

  width: 100%;

  aspect-ratio: 16 / 10;

  object-fit: cover;

}


.detail-image__placeholder {

  aspect-ratio: 16 / 10;

  display: grid;

  place-items: center;

  background:
    linear-gradient(
      135deg,
      var(--color-navy, #15324e),
      var(--color-navy-deep, #0d2137)
    );

}


.detail-image__placeholder span {

  color: rgba(255,255,255,0.9);

  font-size: 4rem;

  font-weight: 700;

}


/* =========================================================
   DESCRIPTION
========================================================= */

.detail-description {

  margin-top: 2.5rem;

}


.detail-description h2 {

  margin:
    0.55rem 0 0;

  color:
    var(
      --color-navy-deep,
      #0d2137
    );

  font-family:
    var(
      --font-heading,
      inherit
    );

  font-size: 1.5rem;

  font-weight: 700;

}


.detail-description__body {

  margin-top: 1.2rem;

  color:
    var(
      --color-text-muted,
      rgba(13,33,55,0.68)
    );

  font-size: 0.9rem;

  line-height: 1.9;

  white-space: pre-line;

}


/* =========================================================
   LEADER CARD
========================================================= */

.leader-card {

  padding: 1.5rem;

  background:
    var(
      --color-white,
      #ffffff
    );

  border:
    1px solid
    var(
      --color-border,
      rgba(13,33,55,0.1)
    );

  box-shadow:
    0 8px 25px
    rgba(13,33,55,0.05);

}


.leader-profile {

  margin-top: 1.3rem;

}


.leader-profile__link {

  display: block;

  color: inherit;

  text-decoration: none;

}


.leader-photo {

  overflow: hidden;

  width: 100%;

  max-width: 270px;

  margin: 0 auto;

  aspect-ratio: 1;

  background:
    var(
      --color-navy,
      #15324e
    );

}


.leader-photo__img {

  width: 100%;

  height: 100%;

  object-fit: cover;

  object-position: top;

  transition:
    transform 0.45s ease;

}


.leader-profile__link:hover
.leader-photo__img {

  transform: scale(1.045);

}


.leader-photo__placeholder {

  width: 100%;

  height: 100%;

  display: grid;

  place-items: center;

  background:
    linear-gradient(
      135deg,
      #15324e,
      #0d2137
    );

}


.leader-photo__placeholder span {

  color: #ffffff;

  font-size: 3rem;

  font-weight: 700;

}


.leader-profile h3 {

  margin-top: 1.2rem;

  color:
    var(
      --color-navy-deep,
      #0d2137
    );

  font-size: 1.25rem;

  font-weight: 700;

}


.leader-profile__link:hover h3 {

  color:
    var(
      --color-gold-dark,
      #a67c00
    );

}


.leader-role {

  margin-top: 0.3rem;

  color:
    var(
      --color-gold-dark,
      #a67c00
    );

  font-size: 0.75rem;

  font-weight: 700;

}


.leader-profile__details {

  display: inline-block;

  margin-top: 1rem;

  color:
    var(
      --color-text-muted,
      rgba(13,33,55,0.62)
    );

  font-size: 0.7rem;

  font-weight: 700;

}


.leader-empty {

  margin-top: 1.3rem;

  padding: 1.2rem;

  background:
    var(
      --color-navy-05,
      rgba(13,33,55,0.03)
    );

  border:
    1px solid
    var(
      --color-border,
      rgba(13,33,55,0.1)
    );

}


.leader-empty__icon {

  margin-bottom: 0.7rem;

  font-size: 1.5rem;

}


.leader-empty p {

  color:
    var(
      --color-text-muted,
      rgba(13,33,55,0.62)
    );

  font-size: 0.75rem;

  line-height: 1.6;

}


/* =========================================================
   CHILDREN SECTION
========================================================= */

.children-section {

  margin-top: 5rem;

  padding-top: 3rem;

  border-top:
    1px solid
    var(
      --color-border,
      rgba(13,33,55,0.1)
    );

}


.children-heading {

  display: flex;

  align-items: flex-end;

  justify-content: space-between;

  gap: 1rem;

  margin-bottom: 1.8rem;

}


.children-heading h2 {

  margin-top: 0.35rem;

  color:
    var(
      --color-navy-deep,
      #0d2137
    );

  font-size: 1.7rem;

  font-weight: 700;

}


.children-count {

  color:
    var(
      --color-text-muted,
      rgba(13,33,55,0.5)
    );

  font-size: 0.7rem;

  font-weight: 700;

}


/* =========================================================
   CHILDREN GRID
========================================================= */

.children-grid {

  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 1.5rem;

}


/* =========================================================
   CHILD CARD
   Inspired by SermonCard visual system
========================================================= */

.child-card {

  display: flex;

  flex-direction: column;

  overflow: hidden;

  background:
    var(
      --color-white,
      #ffffff
    );

  border:
    1px solid
    var(
      --color-border,
      rgba(13,33,55,0.1)
    );

  color: inherit;

  text-decoration: none;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;

}


.child-card:hover {

  transform:
    translateY(-4px);

  border-color:
    rgba(201,162,39,0.45);

  box-shadow:
    0 16px 38px
    rgba(13,33,55,0.1);

}


/* =========================================================
   CHILD MEDIA
========================================================= */

.child-card__media {

  position: relative;

  height: 210px;

  overflow: hidden;

  background:
    linear-gradient(
      135deg,
      var(--color-navy, #15324e),
      var(--color-navy-deep, #0d2137)
    );

}


/*
 * Slide-up color fill on the image area only, same technique as
 * the icon-button example: a full-size layer starts translated
 * below the box and slides up to cover it on hover.
 */
.child-card__media::before {

  content: "";

  position: absolute;

  inset: 0;

  z-index: 1;

  background:
    linear-gradient(
      160deg,
      rgba(21, 50, 78, 0.85),
      rgba(13, 33, 55, 0.92)
    );

  transform:
    translateY(100%);

  transition:
    transform 0.5s
    cubic-bezier(0.2, 0.7, 0.2, 1);

  pointer-events: none;

}


.child-card:hover
.child-card__media::before {

  transform:
    translateY(0);

}


.child-card__image {

  width: 100%;

  height: 100%;

  object-fit: cover;

  transition:
    transform 0.45s ease,
    filter 0.45s ease;

}


.child-card:hover
.child-card__image {

  transform:
    scale(1.045);

  filter:
    brightness(0.86);

}


.child-card__placeholder {

  width: 100%;

  height: 100%;

  display: grid;

  place-items: center;

  background:
    linear-gradient(
      135deg,
      #15324e,
      #0d2137
    );

}


.child-card__placeholder span {

  color:
    rgba(255,255,255,0.9);

  font-size: 3rem;

  font-weight: 700;

}


/* =========================================================
   IMAGE OVERLAY
========================================================= */

.child-card__overlay {

  position: absolute;

  inset: 0;

  z-index: 2;

  background:
    linear-gradient(
      180deg,
      rgba(13,33,55,0.03),
      rgba(13,33,55,0.48)
    );

}


/* =========================================================
   DISCOVER MORE
========================================================= */

.child-card__discover {

  position: absolute;

  left: 1rem;

  right: 1rem;

  bottom: 1rem;

  z-index: 2;

  display: flex;

  align-items: center;

  justify-content: space-between;

  color: #ffffff;

  font-size: 0.7rem;

  font-weight: 700;

}


.child-card__arrow {

  font-size: 1rem;

  transition:
    transform 0.2s ease;

}


.child-card:hover
.child-card__arrow {

  transform:
    translateX(4px);

}


/*
 * Diagonal gold accent behind "Discover More", mirroring the
 * ministry-card treatment (same rotate/translate technique),
 * scaled down for the smaller child-card row. Widens slightly
 * on hover as the same kind of "opening" cue.
 */
.child-card__discover::before {

  content: "";

  position: absolute;

  width: 110px;
  height: 2px;

  background:
    var(--color-gold, #c9a227);

  transform:
    rotate(-45deg)
    translateY(-9px);

  opacity: 0.9;

  transition:
    width 0.35s ease;

}


.child-card:hover
.child-card__discover::before {

  width: 150px;

}


.child-card__discover span {

  position: relative;

  z-index: 2;

}


/* =========================================================
   CHILD CONTENT
========================================================= */

.child-card__content {

  display: flex;

  flex-direction: column;

  flex: 1;

  padding: 1.25rem;

}


.child-card__category {

  display: inline-block;

  width: fit-content;

  margin-bottom: 0.65rem;

  color:
    var(
      --color-gold-dark,
      #a67c00
    );

  font-size: 0.62rem;

  font-weight: 700;

  letter-spacing: 0.08em;

  text-transform: uppercase;

}


.child-card h3 {

  margin: 0;

  color:
    var(
      --color-navy-deep,
      #0d2137
    );

  font-size: 1rem;

  font-weight: 700;

  line-height: 1.45;

  display: -webkit-box;

  overflow: hidden;

  -webkit-box-orient: vertical;

  -webkit-line-clamp: 2;

}


.child-card p {

  margin-top: 0.7rem;

  color:
    var(
      --color-text-muted,
      rgba(13,33,55,0.62)
    );

  font-size: 0.76rem;

  line-height: 1.65;

  display: -webkit-box;

  overflow: hidden;

  -webkit-box-orient: vertical;

  -webkit-line-clamp: 3;

}


/* =========================================================
   CHILD LEADER
========================================================= */

.child-card__leader {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 0.5rem;

  margin-top: 1rem;

  padding-top: 0.8rem;

  border-top:
    1px solid
    var(
      --color-border,
      rgba(13,33,55,0.1)
    );

}


.child-card__leader span {

  color:
    rgba(13,33,55,0.45);

  font-size: 0.63rem;

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 0.06em;

}


.child-card__leader strong {

  color:
    var(
      --color-navy-deep,
      #0d2137
    );

  font-size: 0.68rem;

}


/* =========================================================
   CHILD FOOTER
========================================================= */

.child-card__footer {

  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-top: auto;

  padding-top: 1rem;

  color:
    var(
      --color-navy-deep,
      #0d2137
    );

  font-size: 0.68rem;

  font-weight: 700;

  border-top:
    1px solid
    var(
      --color-border,
      rgba(13,33,55,0.1)
    );

}


.child-card__footer-arrow {

  transition:
    transform 0.2s ease;

}


.child-card:hover
.child-card__footer-arrow {

  transform:
    translateX(4px);

}


/* =========================================================
   EMPTY CHILDREN
========================================================= */

.children-empty {

  margin-top: 4rem;

  padding:
    3rem 1.5rem;

  text-align: center;

  border-top:
    1px solid
    var(
      --color-border,
      rgba(13,33,55,0.1)
    );

}


.children-empty__icon {

  width: 45px;

  height: 45px;

  display: grid;

  place-items: center;

  margin: 0 auto 1rem;

  background:
    rgba(13,33,55,0.05);

  color:
    var(
      --color-navy-deep,
      #0d2137
    );

  font-size: 1.4rem;

}


.children-empty h2 {

  color:
    var(
      --color-navy-deep,
      #0d2137
    );

  font-size: 1.2rem;

  font-weight: 700;

}


.children-empty p {

  max-width: 500px;

  margin:
    0.6rem auto 0;

  color:
    var(
      --color-text-muted,
      rgba(13,33,55,0.62)
    );

  font-size: 0.78rem;

  line-height: 1.7;

}


/* =========================================================
   SKELETON
========================================================= */

.skeleton {

  position: relative;

  overflow: hidden;

  background:
    rgba(13,33,55,0.08);

}


.skeleton::after,
.hero-skeleton::after {

  content: "";

  position: absolute;

  inset: 0;

  transform:
    translateX(-100%);

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.45),
      transparent
    );

  animation:
    skeleton-shimmer 1.5s infinite;

}


@keyframes skeleton-shimmer {

  100% {

    transform:
      translateX(100%);

  }

}


/* =========================================================
   HERO SKELETON
========================================================= */

.hero-skeleton {

  position: relative;

  overflow: hidden;

  background:
    rgba(255,255,255,0.1);

}


.hero-skeleton--small {

  width: 100px;

  height: 11px;

  margin-top: 2rem;

}


.hero-skeleton--title {

  width: min(550px,80%);

  height: 44px;

  margin-top: 1rem;

}


.hero-skeleton--text {

  width: min(600px,90%);

  height: 13px;

  margin-top: 1.4rem;

}


.hero-skeleton--text-short {

  width: min(430px,70%);

  margin-top: 0.6rem;

}


/* =========================================================
   DETAIL SKELETON
========================================================= */

.detail-image-skeleton {

  width: 100%;

  aspect-ratio: 16 / 10;

}


.skeleton-heading {

  width: 180px;

  height: 25px;

}


.skeleton-line {

  width: 100%;

  height: 13px;

}


.skeleton-line--short {

  width: 65%;

}


/* =========================================================
   LEADER SKELETON
========================================================= */

.leader-skeleton-photo {

  width: 190px;

  height: 190px;

  margin:
    1.5rem auto;

}


.leader-skeleton-label {

  width: 80px;

  height: 10px;

}


.leader-skeleton-name {

  width: 160px;

  height: 20px;

  margin-top: 1rem;

}


.leader-skeleton-role {

  width: 110px;

  height: 12px;

  margin-top: 0.6rem;

}


/* =========================================================
   CHILD SKELETON
========================================================= */

.skeleton-subtitle {

  width: 210px;

  height: 28px;

  margin-bottom: 1.5rem;

}


.child-skeleton-image {

  width: 100%;

  height: 210px;

}


.child-skeleton-category {

  width: 80px;

  height: 9px;

}


.child-skeleton-title {

  width: 75%;

  height: 18px;

  margin-top: 0.7rem;

}


.child-skeleton-line {

  width: 100%;

  height: 10px;

  margin-top: 0.7rem;

}


.child-skeleton-line--short {

  width: 65%;

}


.child-skeleton-button {

  width: 110px;

  height: 32px;

  margin-top: 1rem;

}


/* =========================================================
   NOT FOUND
========================================================= */

.not-found-icon {

  width: 55px;

  height: 55px;

  display: grid;

  place-items: center;

  margin: 0 auto 1rem;

  background:
    rgba(13,33,55,0.06);

  font-weight: 700;

}


.container-custom
h1 {

  color:
    var(
      --color-navy-deep,
      #0d2137
    );

}


/* =========================================================
   DARK MODE
========================================================= */

.dark .detail-description h2,
.dark .children-heading h2,
.dark .child-card h3,
.dark .child-card__leader strong,
.dark .child-card__footer,
.dark .leader-profile h3,
.dark .children-empty h2,
.dark .container-custom h1 {

  color: #ffffff;

}


.dark .detail-description__body,
.dark .child-card p,
.dark .leader-empty p,
.dark .children-empty p {

  color:
    rgba(255,255,255,0.62);

}


.dark .child-card,
.dark .leader-card {

  background:
    var(
      --color-navy-900,
      #122b43
    );

  border-color:
    rgba(255,255,255,0.08);

}


.dark .child-card__leader,
.dark .child-card__footer,
.dark .children-section {

  border-color:
    rgba(255,255,255,0.08);

}


/* =========================================================
   TABLET
========================================================= */

@media (max-width: 900px) {

  .detail-layout {

    grid-template-columns: 1fr;

  }

  .children-grid {

    grid-template-columns:
      repeat(2, minmax(0, 1fr));

  }

}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 600px) {

  .children-grid {

    grid-template-columns: 1fr;

  }

  .detail-image__img,
  .detail-image__placeholder {

    aspect-ratio: 16 / 11;

  }

  .children-heading {

    align-items: flex-start;

    flex-direction: column;

  }

  .child-card__media {

    height: 230px;

  }

  .leader-card {

    padding: 1.25rem;

  }

}

</style>