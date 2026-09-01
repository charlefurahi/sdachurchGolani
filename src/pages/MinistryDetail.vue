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

        <div class="page-hero__context">
          <span>Ministries</span>
          <span aria-hidden="true">/</span>
          <span>{{ ministry?.name || 'Ministry' }}</span>
        </div>

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

        <div class="leader-first leader-first--loading">

          <div class="leader-first__intro">
            <div class="skeleton skeleton-tag"></div>
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-line skeleton-line--short"></div>
          </div>

          <div class="leader-card leader-card--featured">
            <div class="leader-profile">
              <div class="skeleton leader-skeleton-photo"></div>

              <div>
                <div class="skeleton leader-skeleton-label"></div>
                <div class="skeleton leader-skeleton-name"></div>
                <div class="skeleton leader-skeleton-role"></div>
              </div>
            </div>
          </div>

        </div>

        <div class="ministry-introduction ministry-introduction--loading">
          <div class="skeleton skeleton-title skeleton-title--medium"></div>

          <div class="ministry-introduction__body">
            <div class="skeleton detail-image-skeleton"></div>

            <div>
              <div class="skeleton skeleton-line"></div>
              <div class="skeleton skeleton-line"></div>
              <div class="skeleton skeleton-line"></div>
              <div class="skeleton skeleton-line skeleton-line--short"></div>
            </div>
          </div>
        </div>

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
             LEADER FIRST
        ================================================== -->
        <section class="leader-first">

          <div class="leader-first__intro">
            <p class="section-tag">Ministry Leadership</p>
            <h2>Meet the Ministry Leader</h2>
            <p>
              Get to know the person serving and guiding this ministry.
            </p>
          </div>

          <div class="leader-card leader-card--featured">

            <template v-if="leader">

              <RouterLink
                v-if="leader.id"
                :to="{
                  name: 'LeaderDetail',
                  params: { id: leader.id }
                }"
                class="leader-profile__link"
              >
                <div class="leader-profile">

                  <div class="leader-photo">
                    <img
                      v-if="leaderPhoto"
                      :src="leaderPhoto"
                      :alt="leaderName"
                      class="leader-photo__img"
                      @error="handleLeaderImageError"
                    />

                    <div
                      v-else
                      class="leader-photo__placeholder"
                    >
                      <span>{{ initials(leaderName) }}</span>
                    </div>
                  </div>

                  <div class="leader-profile__content">
                    <span class="leader-profile__eyebrow">Ministry Leader</span>

                    <h3>{{ leaderName || 'Ministry Leader' }}</h3>

                    <p class="leader-role">
                      {{
                        leader.display_role ||
                        leader.role_title ||
                        leader.roleTitle ||
                        leader.role ||
                        'Ministry Leader'
                      }}
                    </p>

                    <span class="leader-profile__details">
                      View leader profile
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>

                </div>
              </RouterLink>

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
                    @error="handleLeaderImageError"
                  />

                  <div
                    v-else
                    class="leader-photo__placeholder"
                  >
                    <span>{{ initials(leaderName) }}</span>
                  </div>
                </div>

                <div class="leader-profile__content">
                  <span class="leader-profile__eyebrow">Ministry Leader</span>

                  <h3>{{ leaderName || 'Ministry Leader' }}</h3>

                  <p class="leader-role">
                    {{
                      leader.display_role ||
                      leader.role_title ||
                      leader.roleTitle ||
                      leader.role ||
                      'Ministry Leader'
                    }}
                  </p>
                </div>
              </div>

            </template>

            <div
              v-else
              class="leader-empty"
            >
              <div class="leader-empty__icon" aria-hidden="true">
                👤
              </div>

              <h3>Leader information unavailable</h3>

              <p>
                The current ministry leader will appear here when the
                leadership record is connected to this ministry.
              </p>
            </div>

          </div>

        </section>


        <!-- =================================================
             MINISTRY TITLE + DESCRIPTION
        ================================================== -->
        <section class="ministry-introduction">

          <div class="ministry-introduction__heading">

            <p class="section-tag">
              About this ministry
            </p>

            <h2>
              {{ ministry.name }}
            </h2>

          </div>

          <div class="ministry-introduction__body">

            <div
              v-if="ministryImage"
              class="detail-image"
            >
              <img
                :src="ministryImage"
                :alt="ministry.name"
                class="detail-image__img"
                @error="handleImageError"
              />
            </div>

            <div
              v-else
              class="detail-image detail-image--placeholder"
            >
              <div class="detail-image__placeholder">
                <span>{{ initials(ministry.name) }}</span>
              </div>
            </div>

            <div class="detail-description">

              <p class="detail-description__lead">
                {{
                  ministry.long_description ||
                  ministry.description ||
                  'Learn more about this ministry and the work it does within the church and community.'
                }}
              </p>

              <div
                v-if="
                  ministry.description &&
                  ministry.long_description &&
                  ministry.description !== ministry.long_description
                "
                class="detail-description__body"
              >
                {{ ministry.long_description }}
              </div>

            </div>

          </div>

        </section>


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
import { resolveMedia } from '@/services/api'

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

function mediaValue(value) {

  if (!value) return ''

  if (typeof value === 'string') {
    return value.trim()
  }

  if (typeof value === 'object') {

    return (
      mediaValue(value.url) ||
      mediaValue(value.file) ||
      mediaValue(value.path) ||
      mediaValue(value.src)
    )

  }

  return ''

}


function getImage(record) {

  if (!record) return ''

  const candidates = [
    record.photo_url,
    record.photoUrl,
    record.image_url,
    record.imageUrl,
    record.profile_picture_url,
    record.profilePictureUrl,
    record.avatar_url,
    record.avatarUrl,
    record.photo,
    record.image,
    record.profile_picture,
    record.profilePicture,
  ]

  const value = candidates
    .map(mediaValue)
    .find(Boolean)

  return resolveMedia(value) || ''

}


function handleImageError(event) {

  event.target.style.display = 'none'

}


const leaderPhotoFailed = ref(false)


function handleLeaderImageError(event) {

  leaderPhotoFailed.value = true
  event.target.style.display = 'none'

}


/* =========================================================
   LEADER
========================================================= */

const leaderName = computed(() => {

  if (!leader.value) return ''

  if (typeof leader.value === 'string') {
    return leader.value
  }

  return (
    leader.value.full_name ||
    leader.value.fullName ||
    leader.value.name ||
    leader.value.display_name ||
    leader.value.displayName ||
    `${leader.value.first_name || ''} ${leader.value.last_name || ''}`.trim()
  )

})


const leaderPhoto = computed(() => {

  if (!leader.value || leaderPhotoFailed.value) return ''

  return getImage(leader.value)

})


function extractLeader(record) {

  if (!record) return null

  const candidates = [
    record.leader,
    record.leader_detail,
    record.leader_details,
    record.leader_data,
    record.leaderDetails,
    record.leader_profile,
    record.leaderProfile,
  ]

  for (const candidate of candidates) {

    if (candidate && typeof candidate === 'object') {
      return candidate
    }

  }

  return null

}


function leaderIdFrom(record) {

  if (!record) return null

  const direct =
    record.leader_id ??
    record.leaderId

  if (direct) return direct

  const leaderValue = record.leader

  if (
    typeof leaderValue === 'number' ||
    typeof leaderValue === 'string'
  ) {
    return leaderValue
  }

  return (
    record.leader_detail_id ??
    record.leaderDetailId ??
    null
  )

}


function matchesMinistry(candidate, ministryRecord) {

  if (!candidate || !ministryRecord) return false

  const ministryId = String(ministryRecord.id ?? '')
  const ministrySlug = normalise(ministryRecord.slug)
  const ministryName = normalise(ministryRecord.name)

  const relation = [
    candidate.ministry,
    candidate.ministry_detail,
    candidate.ministry_details,
    candidate.department,
    candidate.department_detail,
  ]

  for (const item of relation) {

    if (!item) continue

    if (typeof item === 'object') {

      if (
        ministryId &&
        String(item.id ?? '') === ministryId
      ) {
        return true
      }

      if (
        ministrySlug &&
        normalise(item.slug) === ministrySlug
      ) {
        return true
      }

      if (
        ministryName &&
        normalise(item.name) === ministryName
      ) {
        return true
      }

    } else if (
      ministryId &&
      String(item) === ministryId
    ) {
      return true
    }

  }

  const candidateMinistryId =
    candidate.ministry_id ??
    candidate.ministryId ??
    candidate.department_id ??
    candidate.departmentId

  if (
    candidateMinistryId &&
    ministryId &&
    String(candidateMinistryId) === ministryId
  ) {
    return true
  }

  return false

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

  leaderPhotoFailed.value = false

  const embeddedLeader = extractLeader(record)

  if (embeddedLeader) {
    leader.value = embeddedLeader
    return
  }

  const leaderId = leaderIdFrom(record)

  if (leaderId) {

    try {

      const response =
        await leadershipService.getById(leaderId)

      leader.value =
        response?.data ??
        response ??
        null

      if (leader.value) return

    } catch (error) {

      console.warn(
        'Could not load ministry leader by ID.',
        error
      )

    }

  }


  /*
   * Some backend serializers expose only the ministry relation on
   * the leader record. If the ministry has no embedded leader/ID,
   * search the leadership endpoint and match that relation.
   */
  try {

    if (typeof leadershipService.getAll !== 'function') {
      leader.value = null
      return
    }

    const response =
      await leadershipService.getAll({
        page_size: 100
      })

    const list =
      response?.results ??
      response?.data?.results ??
      response?.data ??
      response

    if (!Array.isArray(list)) {
      leader.value = null
      return
    }

    const match = list.find(
      (candidate) =>
        matchesMinistry(candidate, record)
    )

    leader.value = match || null

  } catch (error) {

    console.warn(
      'Could not find ministry leader from leadership records.',
      error
    )

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

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255,255,255,0.82);
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.back-link:hover {
  color: #ffffff;
  transform: translateX(-3px);
}


/* =========================================================
   PAGE HERO CONTEXT
========================================================= */

.page-hero__context {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.25rem;
  color: rgba(255,255,255,0.68);
  font-size: 0.68rem;
  font-weight: 600;
}

.page-hero__context span:last-child {
  color: rgba(255,255,255,0.95);
}


/* =========================================================
   LOADING
========================================================= */

.skeleton-tag {
  width: 105px;
  height: 10px;
}

.skeleton-title {
  width: min(330px, 80%);
  height: 34px;
  margin-top: 0.8rem;
}

.skeleton-title--medium {
  width: 250px;
}

.leader-first--loading,
.ministry-introduction--loading {
  pointer-events: none;
}

/* =========================================================
   LEADER FIRST
========================================================= */

.leader-first {
  display: grid;
  grid-template-columns: minmax(0, 0.72fr) minmax(320px, 1.28fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
  margin-bottom: clamp(4rem, 8vw, 6rem);
}

.leader-first__intro {
  max-width: 420px;
}

.leader-first__intro h2 {
  margin: 0.55rem 0 0;
  color: var(--color-navy-deep, #0d2137);
  font-family: var(--font-heading, inherit);
  font-size: clamp(1.7rem, 3vw, 2.35rem);
  line-height: 1.12;
  font-weight: 700;
}

.leader-first__intro > p:last-child {
  margin: 1rem 0 0;
  color: var(--color-text-muted, rgba(13,33,55,0.68));
  font-size: 0.88rem;
  line-height: 1.8;
}


/* =========================================================
   LEADER CARD
========================================================= */

.leader-card {
  padding: clamp(1.2rem, 3vw, 1.65rem);
  background: var(--color-surface, #ffffff);
  border: 1px solid var(--color-border, rgba(13,33,55,0.1));
  border-radius: var(--radius-lg, 1rem);
  box-shadow: 0 14px 40px rgba(13,33,55,0.07);
}

.leader-card--featured {
  min-width: 0;
}

.leader-profile__link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.leader-profile {
  display: grid;
  grid-template-columns: minmax(150px, 230px) minmax(0, 1fr);
  gap: clamp(1.25rem, 3vw, 2rem);
  align-items: center;
}

.leader-photo {
  overflow: hidden;
  width: 100%;
  aspect-ratio: 1;
  background: var(--color-navy, #15324e);
  border-radius: var(--radius-md, 0.85rem);
}

.leader-photo__img,
.leader-photo__placeholder {
  display: block;
  width: 100%;
  height: 100%;
}

.leader-photo__img {
  object-fit: cover;
  object-position: center top;
  transition: transform 0.45s ease;
}

.leader-profile__link:hover .leader-photo__img {
  transform: scale(1.045);
}

.leader-photo__placeholder {
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #15324e, #0d2137);
}

.leader-photo__placeholder span {
  color: #ffffff;
  font-size: 3rem;
  font-weight: 700;
}

.leader-profile__content {
  min-width: 0;
}

.leader-profile__eyebrow {
  display: inline-block;
  color: var(--color-gold-dark, #a67c00);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.leader-profile h3 {
  margin: 0.45rem 0 0;
  color: var(--color-navy-deep, #0d2137);
  font-size: clamp(1.2rem, 2.2vw, 1.55rem);
  line-height: 1.2;
  font-weight: 700;
}

.leader-profile__link:hover h3 {
  color: var(--color-gold-dark, #a67c00);
}

.leader-role {
  margin: 0.5rem 0 0;
  color: var(--color-text-muted, rgba(13,33,55,0.65));
  font-size: 0.78rem;
  line-height: 1.6;
  font-weight: 600;
}

.leader-profile__details {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 1.15rem;
  color: var(--color-navy-deep, #0d2137);
  font-size: 0.7rem;
  font-weight: 700;
}

.leader-profile__details span {
  transition: transform 0.2s ease;
}

.leader-profile__link:hover .leader-profile__details span {
  transform: translateX(4px);
}

.leader-empty {
  display: grid;
  place-items: center;
  padding: 1.5rem;
  text-align: center;
  background: var(--color-navy-05, rgba(13,33,55,0.03));
  border: 1px solid var(--color-border, rgba(13,33,55,0.1));
  border-radius: var(--radius-md, 0.85rem);
}

.leader-empty__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: 0.8rem;
  border-radius: 50%;
  background: var(--color-navy-deep, #0d2137);
  font-size: 1.15rem;
}

.leader-empty h3 {
  margin: 0;
  color: var(--color-text-main, #0d2137);
  font-size: 0.95rem;
}

.leader-empty p {
  max-width: 430px;
  margin: 0.65rem auto 0;
  color: var(--color-text-muted, rgba(13,33,55,0.65));
  font-size: 0.76rem;
  line-height: 1.7;
}


/* =========================================================
   MINISTRY INTRODUCTION
========================================================= */

.ministry-introduction {
  padding-top: clamp(3rem, 6vw, 4.5rem);
  border-top: 1px solid var(--color-border, rgba(13,33,55,0.1));
}

.ministry-introduction__heading h2 {
  margin: 0.55rem 0 0;
  color: var(--color-navy-deep, #0d2137);
  font-family: var(--font-heading, inherit);
  font-size: clamp(1.75rem, 3.4vw, 2.6rem);
  line-height: 1.12;
  font-weight: 700;
}

.ministry-introduction__body {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;
  margin-top: 2rem;
}

.detail-image {
  position: relative;
  overflow: hidden;
  background: var(--color-navy, #15324e);
  border: 1px solid var(--color-border, rgba(13,33,55,0.1));
  border-radius: var(--radius-lg, 1rem);
  box-shadow: 0 12px 32px rgba(13,33,55,0.06);
}

.detail-image__img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}

.detail-image__placeholder {
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 10;
  background: linear-gradient(135deg, var(--color-navy, #15324e), var(--color-navy-deep, #0d2137));
}

.detail-image__placeholder span {
  color: rgba(255,255,255,0.9);
  font-size: 4rem;
  font-weight: 700;
}

.detail-description {
  padding-top: 0.25rem;
}

.detail-description__lead,
.detail-description__body {
  color: var(--color-text-muted, rgba(13,33,55,0.68));
  font-size: 0.9rem;
  line-height: 1.9;
  white-space: pre-line;
}

.detail-description__lead {
  margin: 0;
}

.detail-description__body {
  margin-top: 1.25rem;
}


/* =========================================================
   CHILDREN
========================================================= */

.children-section {
  margin-top: clamp(4rem, 8vw, 6rem);
  padding-top: clamp(3rem, 6vw, 4rem);
  border-top: 1px solid var(--color-border);
}

.children-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.children-heading h2 {
  margin: 0.55rem 0 0;
  color: var(--color-navy-deep, #0d2137);
  font-family: var(--font-heading, inherit);
  font-size: clamp(1.45rem, 3vw, 2rem);
  font-weight: 700;
}

.children-count {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.7rem;
  font-weight: 700;
}

.children-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.child-card {
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md, 0.85rem);
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(13,33,55,0.04);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.child-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-border-strong);
  box-shadow: 0 16px 34px rgba(13,33,55,0.09);
}

.child-card__media {
  position: relative;
  height: 210px;
  overflow: hidden;
  background: var(--color-navy);
}

.child-card__image,
.child-card__placeholder {
  width: 100%;
  height: 100%;
}

.child-card__image {
  display: block;
  object-fit: cover;
  transition: transform 0.45s ease;
}

.child-card:hover .child-card__image {
  transform: scale(1.045);
}

.child-card__placeholder {
  display: grid;
  place-items: center;
  background: var(--gradient-card-dark, linear-gradient(135deg, #15324e, #0d2137));
}

.child-card__placeholder span {
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
}

.child-card__overlay,
.child-card__discover {
  position: absolute;
  inset: 0;
}

.child-card__overlay {
  background: linear-gradient(to top, rgba(13,33,55,0.82), rgba(13,33,55,0.02) 70%);
}

.child-card__discover {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 1rem;
  color: #ffffff;
  font-size: 0.68rem;
  font-weight: 700;
  opacity: 0;
  transform: translateY(7px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.child-card:hover .child-card__discover {
  opacity: 1;
  transform: translateY(0);
}

.child-card__arrow,
.child-card__footer-arrow {
  transition: transform 0.2s ease;
}

.child-card:hover .child-card__arrow {
  transform: translateX(4px);
}

.child-card__content {
  padding: 1.1rem;
}

.child-card__category {
  color: var(--color-gold-dark);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.child-card h3 {
  margin: 0.45rem 0 0;
  color: var(--color-text-main);
  font-size: 1rem;
  line-height: 1.25;
}

.child-card p {
  margin: 0.65rem 0 0;
  color: var(--color-text-muted);
  font-size: 0.73rem;
  line-height: 1.7;
}

.child-card__leader {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: 0.9rem;
  padding-top: 0.8rem;
  border-top: 1px solid var(--color-border);
}

.child-card__leader span {
  color: var(--color-text-muted);
  font-size: 0.58rem;
  font-weight: 600;
  text-transform: uppercase;
}

.child-card__leader strong {
  color: var(--color-text-main);
  font-size: 0.72rem;
}

.child-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 0.9rem;
  border-top: 1px solid var(--color-border);
  color: var(--color-text-main);
  font-size: 0.65rem;
  font-weight: 700;
}

.child-card:hover .child-card__footer-arrow {
  transform: translateX(4px);
}

.children-empty {
  margin-top: clamp(4rem, 8vw, 6rem);
  padding: 3rem 1.5rem;
  text-align: center;
  background: var(--color-navy-05, rgba(13,33,55,0.03));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg, 1rem);
}

.children-empty__icon,
.not-found-icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  background: var(--color-navy-deep, #0d2137);
  color: #ffffff;
  font-weight: 700;
}

.children-empty h2 {
  margin: 0;
  color: var(--color-navy-deep);
  font-size: 1.25rem;
}

.children-empty p {
  max-width: 520px;
  margin: 0.65rem auto 0;
  color: var(--color-text-muted);
  font-size: 0.78rem;
  line-height: 1.7;
}


/* =========================================================
   SKELETONS
========================================================= */

.detail-image-skeleton {
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: var(--radius-lg, 1rem);
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

.leader-skeleton-photo {
  width: 190px;
  height: 190px;
  margin: 1.5rem auto;
  border-radius: var(--radius-md, 0.85rem);
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

.skeleton-subtitle {
  width: 210px;
  height: 28px;
  margin-bottom: 1.5rem;
}

.child-skeleton-image {
  width: 100%;
  height: 210px;
  border-radius: var(--radius-md, 0.85rem) var(--radius-md, 0.85rem) 0 0;
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

.not-found-icon {
  font-size: 1rem;
}

.container-custom h1 {
  color: var(--color-navy-deep, #0d2137);
}


/* =========================================================
   DARK MODE
========================================================= */

.dark .leader-first__intro h2,
.dark .ministry-introduction__heading h2,
.dark .children-heading h2,
.dark .child-card h3,
.dark .child-card__leader strong,
.dark .child-card__footer,
.dark .leader-profile h3,
.dark .leader-empty h3,
.dark .children-empty h2,
.dark .container-custom h1 {
  color: #ffffff;
}

.dark .leader-first__intro > p:last-child,
.dark .detail-description__lead,
.dark .detail-description__body,
.dark .child-card p,
.dark .leader-role,
.dark .leader-empty p,
.dark .children-empty p {
  color: rgba(255,255,255,0.62);
}

.dark .leader-card,
.dark .child-card {
  background: var(--color-navy-900, #122b43);
  border-color: rgba(255,255,255,0.08);
}

.dark .children-section,
.dark .ministry-introduction {
  border-color: rgba(255,255,255,0.08);
}

.dark .child-card__leader,
.dark .child-card__footer,
.dark .leader-empty {
  border-color: rgba(255,255,255,0.08);
}


/* =========================================================
   TABLET
========================================================= */

@media (max-width: 900px) {

  .leader-first {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .leader-first__intro {
    max-width: 650px;
  }

  .ministry-introduction__body {
    grid-template-columns: 1fr;
  }

  .children-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 600px) {

  .leader-first {
    gap: 1.5rem;
  }

  .leader-profile {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .leader-photo {
    max-width: 220px;
    margin: 0 auto;
  }

  .leader-profile__details {
    justify-content: center;
  }

  .children-grid {
    grid-template-columns: 1fr;
  }

  .children-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .child-card__media {
    height: 230px;
  }

}

</style>
