<template>
  <div class="min-h-screen bg-white dark:bg-navy-950">

    <!-- =========================================================
         HERO
    ========================================================== -->
    <section class="page-hero">
      <div class="container-custom page-hero__inner text-center">
        <p class="section-tag text-blue-200 mb-3">
          Church Life
        </p>

        <h1
          class="font-heading text-3xl md:text-4xl font-bold text-white mb-3"
        >
          Our Ministries
        </h1>

        <div class="divider-blue-center mb-4"></div>

        <p class="max-w-2xl mx-auto text-blue-200 leading-relaxed">
          Explore the ministries serving our church family and community.
        </p>
      </div>
    </section>


    <!-- =========================================================
         MINISTRIES
    ========================================================== -->
    <section class="section">
      <div class="container-custom">

        <!-- =====================================================
             LOADING SKELETON
        ====================================================== -->
        <div
          v-if="loading"
          class="ministries-grid"
        >
          <div
            v-for="n in itemsPerPage"
            :key="n"
            class="ministry-card ministry-card--skeleton"
          >
            <div class="ministry-card__media skeleton"></div>

            <div class="ministry-card__content">
              <div class="h-3 skeleton w-24 mb-3"></div>
              <div class="h-5 skeleton w-3/4 mb-3"></div>
              <div class="h-3 skeleton w-full mb-2"></div>
              <div class="h-3 skeleton w-5/6 mb-4"></div>

              <div class="h-8 skeleton w-32 mt-auto"></div>
            </div>
          </div>
        </div>


        <!-- =====================================================
             MINISTRY CARDS
        ====================================================== -->
        <div
          v-else-if="paginatedMinistries.length"
          class="ministries-grid"
        >

          <article
            v-for="ministry in paginatedMinistries"
            :key="ministry.id || ministry.slug || ministry.name"
            class="ministry-card"
          >

            <!-- =================================================
                 MEDIA
            ================================================== -->
            <div class="ministry-card__media">

              <img
                v-if="ministryImage(ministry)"
                :src="ministryImage(ministry)"
                :alt="ministry.name"
                @error="handleImageError"
                loading="lazy"
              />

              <!-- Placeholder -->
              <div
                v-else
                class="ministry-card__placeholder"
              >
                <span>
                  {{ initials(ministry.name) }}
                </span>
              </div>

              <!-- Image overlay -->
              <div class="ministry-card__overlay"></div>


              <!-- =================================================
                   CHILD COUNT
              ================================================== -->
              <span
                v-if="childrenOf(ministry).length"
                class="ministry-card__children-count"
              >
                {{ childrenOf(ministry).length }}

                {{
                  childrenOf(ministry).length === 1
                    ? 'Program'
                    : 'Programs'
                }}
              </span>


              <!-- =================================================
                   HOVER DISCOVER EFFECT
              ================================================== -->
              <RouterLink
                :to="ministryRoute(ministry)"
                class="ministry-card__discover"
              >
              </RouterLink>

            </div>


            <!-- =================================================
                 CONTENT
            ================================================== -->
            <div class="ministry-card__content">

              <!-- Category -->
              <span class="ministry-card__category">
                {{
                  ministry.category_display ||
                  ministry.category_name ||
                  ministry.category ||
                  ministry.type ||
                  'Ministry'
                }}
              </span>


              <!-- Name -->
              <h2>
                {{ ministry.name }}
              </h2>


              <!-- Description -->
              <p class="ministry-card__description">
                {{
                  ministry.description ||
                  ministry.short_description ||
                  ministry.short ||
                  'Learn more about this ministry and its activities.'
                }}
              </p>


              <!-- =================================================
                   CHILDREN / SUB-MINISTRIES
              ================================================== -->
              <div
                v-if="childrenOf(ministry).length"
                class="ministry-card__children"
              >

                <span class="ministry-card__children-label">
                  Programs & Sub-Ministries
                </span>

                <div class="ministry-card__children-list">

                  <RouterLink
                    v-for="child in childrenOf(ministry).slice(0, 4)"
                    :key="child.id || child.slug || child.name"
                    :to="ministryRoute(child)"
                    class="ministry-card__child"
                  >
                    {{ child.name }}

                    <span class="ministry-card__child-arrow">
                      →
                    </span>
                  </RouterLink>


                  <!-- More indicator -->
                  <span
                    v-if="childrenOf(ministry).length > 4"
                    class="ministry-card__child ministry-card__child--more"
                  >
                    +{{ childrenOf(ministry).length - 4 }} more
                  </span>

                </div>
              </div>


              <!-- =================================================
                   FOOTER
              ================================================== -->
              <div class="ministry-card__footer">

                <!-- Leader -->
                <div class="ministry-card__leader-wrapper">

                  <span class="ministry-card__leader-label">
                    Leader
                  </span>

                  <span
                    class="ministry-card__leader"
                  >
                    {{
                      leaderName(ministry) ||
                      'Not assigned yet'
                    }}
                  </span>

                </div>


                <!-- Active Details Button -->
                <RouterLink
                  :to="ministryRoute(ministry)"
                  class="ministry-card__details"
                >
                  <span>
                    View Ministry
                  </span>

                  <span
                    class="ministry-card__details-arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </RouterLink>

              </div>

            </div>
          </article>

        </div>


        <!-- =====================================================
             EMPTY STATE
        ====================================================== -->
        <div
          v-else
          class="max-w-2xl mx-auto text-center py-16"
        >

          <div
            class="
              mx-auto mb-6 w-16 h-16 rounded-2xl
              bg-blue-50 dark:bg-blue-900/30
              text-blue-600 dark:text-blue-400
              grid place-items-center
            "
          >
            <svg
              class="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
            >
              <path
                d="M4 19.5V5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5m0-2a2.5 2.5 0 0 1 2.5-2.5H20"
              />
            </svg>
          </div>

          <h2
            class="
              font-heading text-3xl font-bold
              text-slate-900 dark:text-white
            "
          >
            Ministry information is not available yet
          </h2>

          <p
            class="
              mt-3 text-slate-600 dark:text-slate-400
              leading-7
            "
          >
            This page is ready for the ministry records
            that will be added to the church database.
          </p>

          <RouterLink
            to="/"
            class="btn-primary mt-7"
          >
            Back Home
          </RouterLink>

        </div>


        <!-- =====================================================
             PAGINATION
        ====================================================== -->
        <div
          v-if="totalPages > 1 && !loading"
          class="pagination"
        >

          <!-- Previous -->
          <button
            type="button"
            class="pagination__button"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
            aria-label="Previous page"
          >
            «
          </button>


          <!-- Page numbers -->
          <button
            v-for="page in visiblePages"
            :key="page"
            type="button"
            :class="[
              'pagination__button',
              {
                'pagination__button--active':
                  currentPage === page
              }
            ]"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>


          <!-- Next -->
          <button
            type="button"
            class="pagination__button"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
            aria-label="Next page"
          >
            »
          </button>

        </div>

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

import { RouterLink } from 'vue-router'

import {
  ministryCatalog
} from '@/data/ministries.js'


/* =========================================================
   STATE
========================================================= */

const ministries = ref([])
const loading = ref(true)
const usingDemoData = ref(false)
const currentPage = ref(1)

const itemsPerPage = 6


/* =========================================================
   IMAGE
========================================================= */

function ministryImage(ministry) {
  if (!ministry) {
    return ''
  }

  // Backend images
  if (ministry.photo_url) {
    return ministry.photo_url
  }

  if (ministry.photoUrl) {
    return ministry.photoUrl
  }

  if (ministry.image_url) {
    return ministry.image_url
  }

  if (ministry.imageUrl) {
    return ministry.imageUrl
  }

  // Demo image
  if (ministry.image) {
    try {
      return new URL(
        `../assets/images/ministries/${ministry.image}`,
        import.meta.url
      ).href
    } catch {
      return ''
    }
  }

  return ''
}


/* =========================================================
   IMAGE ERROR
========================================================= */

function handleImageError(event) {
  event.currentTarget.style.display = 'none'
}


/* =========================================================
   INITIALS
========================================================= */

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
   NORMALISE VALUE
========================================================= */

function normalise(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
}


/* =========================================================
   MINISTRY ROUTE
========================================================= */

function ministryRoute(ministry) {
  if (!ministry) {
    return {
      name: 'NotFound'
    }
  }

  const identifier =
    ministry.id ??
    ministry.slug

  if (!identifier) {
    return {
      name: 'NotFound'
    }
  }

  return {
    name: 'MinistryDetail',
    params: {
      id: String(identifier)
    }
  }
}


/* =========================================================
   LEADER
========================================================= */

function leaderName(ministry) {
  if (!ministry) {
    return ''
  }


  /* Nested leader object */
  if (ministry.leader) {

    if (typeof ministry.leader === 'string') {
      return ministry.leader
    }

    if (typeof ministry.leader === 'object') {
      return (
        ministry.leader.full_name ||
        ministry.leader.fullName ||
        ministry.leader.name ||
        (
          `${ministry.leader.first_name || ''}
           ${ministry.leader.last_name || ''}`
        ).trim() ||
        ''
      )
    }
  }


  /* Other possible backend structures */
  return (
    ministry.leader_name ||
    ministry.leaderName ||
    ministry.leader_full_name ||
    ministry.leader_display_name ||
    ''
  )
}


/* =========================================================
   GET PARENT ID
========================================================= */

function parentIdOf(ministry) {
  if (!ministry) {
    return null
  }

  if (ministry.parent_id) {
    return ministry.parent_id
  }

  if (ministry.parentId) {
    return ministry.parentId
  }

  if (
    ministry.parent &&
    typeof ministry.parent === 'object'
  ) {
    return (
      ministry.parent.id ||
      ministry.parent.pk ||
      ministry.parent.slug ||
      null
    )
  }

  if (
    ministry.parent &&
    typeof ministry.parent !== 'object'
  ) {
    return ministry.parent
  }

  if (ministry.parent_ministry_id) {
    return ministry.parent_ministry_id
  }

  return null
}


/* =========================================================
   CHILDREN / SUB-MINISTRIES
========================================================= */

function childrenOf(ministry) {
  if (!ministry) {
    return []
  }


  /*
   * Backend may directly provide children.
   */
  const possibleChildren = [
    ministry.children,
    ministry.subministries,
    ministry.sub_ministries,
    ministry.subMinistries,
    ministry.child_ministries,
    ministry.childMinistries,
    ministry.programs
  ]


  const directChildren = possibleChildren.find(
    value => Array.isArray(value)
  )


  if (directChildren) {
    return directChildren
  }


  /*
   * Some APIs return a flat list:

   * Youth Ministries
   * Adventurers
   * Pathfinders
   * Adventist Youth

   * where each child has parent_id.
   */
  const ministryId = ministry.id

  const ministrySlug = normalise(ministry.slug)
  const ministryName = normalise(ministry.name)


  if (!ministryId && !ministrySlug && !ministryName) {
    return []
  }


  return ministries.value.filter(child => {

    if (!child || child === ministry) {
      return false
    }


    const parentId = parentIdOf(child)

    if (
      parentId &&
      ministryId &&
      String(parentId) === String(ministryId)
    ) {
      return true
    }


    /*
     * Support parent slug/name.
     */
    if (
      child.parent_slug &&
      ministrySlug &&
      normalise(child.parent_slug) === ministrySlug
    ) {
      return true
    }


    if (
      child.parent_name &&
      ministryName &&
      normalise(child.parent_name) === ministryName
    ) {
      return true
    }


    return false
  })
}


/* =========================================================
   BUILD HIERARCHY
========================================================= */

function buildMinistryHierarchy(records) {
  if (!Array.isArray(records)) {
    return []
  }


  /*
   * Keep backend records exactly as the source.
   * We only create the frontend relationship between
   * parent and child records.
   */
  const result = [...records]


  for (const parent of result) {

    const existingChildren = [
      parent.children,
      parent.subministries,
      parent.sub_ministries,
      parent.subMinistries,
      parent.child_ministries,
      parent.childMinistries,
      parent.programs
    ].find(
      value => Array.isArray(value)
    )


    if (existingChildren) {
      continue
    }


    const parentId = parent.id
    const parentSlug = normalise(parent.slug)
    const parentName = normalise(parent.name)


    if (!parentId && !parentSlug && !parentName) {
      continue
    }


    const children = result.filter(child => {

      if (child === parent) {
        return false
      }


      const childParentId = parentIdOf(child)


      if (
        childParentId &&
        parentId &&
        String(childParentId) === String(parentId)
      ) {
        return true
      }


      if (
        child.parent_slug &&
        parentSlug &&
        normalise(child.parent_slug) === parentSlug
      ) {
        return true
      }


      if (
        child.parent_name &&
        parentName &&
        normalise(child.parent_name) === parentName
      ) {
        return true
      }


      return false
    })


    if (children.length) {
      parent.children = children
    }
  }


  /*
   * Only display top-level ministries on the main page.
   *
   * Children will appear inside their parent ministry.
   */
  return result.filter(ministry => {
    const parentId = parentIdOf(ministry)

    return !parentId
  })
}


/* =========================================================
   PAGINATION
========================================================= */

const totalPages = computed(() => {
  return Math.ceil(
    ministries.value.length / itemsPerPage
  )
})


const paginatedMinistries = computed(() => {

  const start =
    (currentPage.value - 1) *
    itemsPerPage

  const end =
    start + itemsPerPage

  return ministries.value.slice(
    start,
    end
  )
})


/* =========================================================
   VISIBLE PAGE NUMBERS
========================================================= */

const visiblePages = computed(() => {

  const pages = []

  const total = totalPages.value

  if (total <= 5) {

    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }

    return pages
  }


  let start = Math.max(
    1,
    currentPage.value - 2
  )

  let end = Math.min(
    total,
    start + 4
  )


  if (end - start < 4) {
    start = Math.max(
      1,
      end - 4
    )
  }


  for (
    let i = start;
    i <= end;
    i++
  ) {
    pages.push(i)
  }


  return pages
})


/* =========================================================
   GO TO PAGE
========================================================= */

function goToPage(page) {

  if (
    page < 1 ||
    page > totalPages.value
  ) {
    return
  }


  currentPage.value = page


  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}


/* =========================================================
   KEEP PAGE VALID
========================================================= */

watch(
  () => ministries.value.length,
  () => {

    if (
      currentPage.value >
      totalPages.value
    ) {
      currentPage.value =
        Math.max(
          1,
          totalPages.value
        )
    }
  }
)


/* =========================================================
   LOAD MINISTRIES
========================================================= */

async function loadMinistries() {

  loading.value = true
  usingDemoData.value = false
  currentPage.value = 1


  try {

    const module = await import(
      '@/services/ministryService'
    )


    const service = module.default


    if (
      !service ||
      typeof service.getAll !== 'function'
    ) {
      throw new Error(
        'ministryService.getAll() is not available'
      )
    }


    /*
     * BACKEND REQUEST
     */
    const response = await service.getAll({
      page_size: 100
    })


    /*
     * Support:

     * [...]

     * OR

     * {
     *   results: [...]
     * }
     */
    const backendData =
      response?.results ?? response


    if (!Array.isArray(backendData)) {
      throw new Error(
        'Invalid ministry response'
      )
    }


    /*
     * BACKEND IS SOURCE OF TRUTH.
     *
     * We do NOT mix demo data with backend data.
     */
    ministries.value =
      buildMinistryHierarchy(
        backendData
      )


    usingDemoData.value = false

  } catch (error) {

    console.warn(
      'Ministry backend unavailable. Using demo data.',
      error
    )


    /*
     * BACKEND FAILED.
     *
     * Use ONLY demo data.
     */
    ministries.value =
      buildMinistryHierarchy(
        Array.isArray(ministryCatalog)
          ? [...ministryCatalog]
          : []
      )


    usingDemoData.value = true

  } finally {

    loading.value = false

  }
}


/* =========================================================
   INITIAL LOAD
========================================================= */

onMounted(() => {
  loadMinistries()
})
</script>


<style scoped>

/* =========================================================
   GRID
========================================================= */

.ministries-grid {
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 1.5rem;
}


/* =========================================================
   CARD
========================================================= */

.ministry-card {
  display: flex;
  flex-direction: column;

  overflow: hidden;

  background:
    var(--color-white, #ffffff);

  border:
    1px solid
    var(
      --color-border,
      rgba(13, 33, 55, 0.1)
    );

  cursor: default;

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;

  position: relative;
}


/* =========================================================
   CARD HOVER
========================================================= */

.ministry-card:hover {
  transform:
    translateY(-6px);

  border-color:
    rgba(201, 162, 39, 0.5);

  box-shadow:
    0 20px 45px
    rgba(13, 33, 55, 0.13);
}


/* =========================================================
   MEDIA
========================================================= */

.ministry-card__media {
  position: relative;

  height: 220px;

  overflow: hidden;

  background:
    linear-gradient(
      135deg,
      var(--color-navy, #16324a),
      var(--color-navy-deep, #16324a)
    );
}


/*
 * Slide-up color fill on the image area only: a full-size layer
 * starts translated below the box and slides up to cover it on
 * hover — the same technique as the icon-button example, just
 * scoped to the media block instead of the whole card.
 */
.ministry-card__media::before {
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


.ministry-card:hover
.ministry-card__media::before {
  transform:
    translateY(0);
}


/* =========================================================
   IMAGE
========================================================= */

.ministry-card__media img {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;

  transition:
    transform 0.6s cubic-bezier(
      0.2,
      0.7,
      0.2,
      1
    ),
    filter 0.45s ease;
}


.ministry-card:hover
.ministry-card__media img {
  transform:
    scale(1.08);

  filter:
    brightness(0.72);
}


/* =========================================================
   IMAGE OVERLAY
========================================================= */

.ministry-card__overlay {
  position: absolute;

  inset: 0;

  z-index: 2;

  background:
    linear-gradient(
      180deg,
      rgba(13, 33, 55, 0.02),
      rgba(13, 33, 55, 0.72)
    );

  pointer-events: none;

  transition:
    background 0.4s ease;
}


.ministry-card:hover
.ministry-card__overlay {
  background:
    linear-gradient(
      180deg,
      rgba(13, 33, 55, 0.15),
      rgba(13, 33, 55, 0.82)
    );
}


/* =========================================================
   PLACEHOLDER
========================================================= */

.ministry-card__placeholder {
  width: 100%;
  height: 100%;

  display: grid;
  place-items: center;

  background:
    linear-gradient(
      135deg,
      var(--color-navy, #16324a),
      var(--color-navy-deep, #16324a)
    );

  color:
    rgba(255, 255, 255, 0.82);

  transition:
    transform 0.5s ease;
}


.ministry-card:hover
.ministry-card__placeholder {
  transform: scale(1.05);
}


.ministry-card__placeholder span {
  font-size: 4rem;
  font-weight: 700;
}


/* =========================================================
   CHILD COUNT
========================================================= */

.ministry-card__children-count {
  position: absolute;

  top: 0.9rem;
  right: 0.9rem;

  z-index: 4;

  padding:
    0.38rem
    0.62rem;

  background:
    var(--color-gold, #c9a227);

  color:
    var(--color-navy-deep, #16324a);

  font-size: 0.63rem;
  font-weight: 700;

  letter-spacing: 0.07em;

  text-transform: uppercase;
}


/* =========================================================
   DISCOVER MORE HOVER BUTTON
========================================================= */

.ministry-card__discover {
  position: absolute;

  left: 0;
  bottom: 0;

  z-index: 5;

  width: 100%;

  height: 58px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;

  overflow: hidden;

  color: white;

  text-decoration: none;

  font-size: 0.82rem;
  font-weight: 700;

  letter-spacing: 0.02em;

  opacity: 0;

  transform:
    translateY(12px);

  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}


/*.ministry-card:hover
.ministry-card__discover {
  opacity: 1;

  transform:
    translateY(0);
}

*/
/*
 * Diagonal line effect similar to
 * the design you showed.
 */
.ministry-card__discover::before {
  content: "";

  position: absolute;

  width: 150px;
  height: 2px;

  background:
    var(--color-gold, #c9a227);

  transform:
    rotate(-45deg)
    translateY(-12px);

  opacity: 0.9;

  transition:
    width 0.35s ease,
    transform 0.35s ease;
}


.ministry-card__discover:hover::before {
  width: 190px;

  transform:
    rotate(-45deg)
    translateY(-12px);
}


.ministry-card__discover span {
  position: relative;
  z-index: 2;
}


.ministry-card__discover-arrow {
  transition:
    transform 0.25s ease;
}


.ministry-card__discover:hover
.ministry-card__discover-arrow {
  transform:
    translateX(4px);
}


/* =========================================================
   CONTENT
========================================================= */

.ministry-card__content {
  display: flex;

  flex-direction: column;

  flex: 1;

  padding: 1.3rem;
}


/* =========================================================
   CATEGORY
========================================================= */

.ministry-card__category {
  display: inline-block;

  width: fit-content;

  margin-bottom: 0.75rem;

  color:
    var(
      --color-gold-dark,
      #a67c00
    );

  font-size: 0.64rem;

  font-weight: 700;

  letter-spacing: 0.08em;

  text-transform: uppercase;
}


/* =========================================================
   TITLE
========================================================= */

.ministry-card h2 {
  margin: 0;

  color: var(--color-heading);

  font-size: 1rem;

  font-weight: 700;

  line-height: 1.45;

  display: -webkit-box;

  overflow: hidden;

  -webkit-box-orient: vertical;

  -webkit-line-clamp: 2;

  line-clamp: 2;
}


.ministry-card:hover h2 {
  color:
    var(
      --color-gold-dark,
      #a67c00
    );
}


/* =========================================================
   DESCRIPTION
========================================================= */

.ministry-card__description {
  margin:
    0.75rem
    0
    1.1rem;

  color:
    var(
      --color-text-muted,
      rgba(13, 33, 55, 0.62)
    );

  font-size: 0.8rem;

  line-height: 1.65;

  display: -webkit-box;

  overflow: hidden;

  -webkit-box-orient: vertical;

  -webkit-line-clamp: 3;

  line-clamp: 3;
}


/* =========================================================
   CHILDREN
========================================================= */

.ministry-card__children {
  margin-bottom: 1rem;
}


.ministry-card__children-label {
  display: block;

  margin-bottom: 0.45rem;

  color: var(--color-text-faint);

  font-size: 0.62rem;

  font-weight: 700;

  letter-spacing: 0.08em;

  text-transform: uppercase;
}


.ministry-card__children-list {
  display: flex;

  flex-wrap: wrap;

  gap: 0.35rem;
}


/* =========================================================
   CHILD LINK
========================================================= */

.ministry-card__child {
  display: inline-flex;

  align-items: center;

  gap: 0.3rem;

  padding:
    0.3rem
    0.5rem;

  background:
    rgba(13, 33, 55, 0.045);

  border:
    1px solid
    rgba(13, 33, 55, 0.08);

  color: var(--color-heading);

  font-size: 0.62rem;

  font-weight: 600;

  text-decoration: none;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}


.ministry-card__child:hover {
  background:
    var(
      --color-navy-deep,
      #16324a
    );

  color: white;

  border-color:
    var(
      --color-navy-deep,
      #16324a
    );

  transform:
    translateY(-2px);
}


.ministry-card__child-arrow {
  opacity: 0;

  transform:
    translateX(-3px);

  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}


.ministry-card__child:hover
.ministry-card__child-arrow {
  opacity: 1;

  transform:
    translateX(0);
}


.ministry-card__child--more {
  color:
    var(
      --color-gold-dark,
      #a67c00
    );

  cursor: default;
}


.ministry-card__child--more:hover {
  background:
    rgba(13, 33, 55, 0.045);

  color:
    var(
      --color-gold-dark,
      #a67c00
    );

  border-color:
    rgba(13, 33, 55, 0.08);

  transform: none;
}


/* =========================================================
   FOOTER
========================================================= */

.ministry-card__footer {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 0.7rem;

  margin-top: auto;

  padding-top: 1rem;

  border-top:
    1px solid
    var(
      --color-border,
      rgba(13, 33, 55, 0.1)
    );
}


/* =========================================================
   LEADER
========================================================= */

.ministry-card__leader-wrapper {
  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 0.15rem;
}


.ministry-card__leader-label {
  color: var(--color-text-faint);

  font-size: 0.58rem;

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 0.08em;
}


.ministry-card__leader {
  color: var(--color-text-muted);

  font-size: 0.7rem;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;
}


/* =========================================================
   VIEW MINISTRY BUTTON
========================================================= */

.ministry-card__details {
  min-height: 36px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 0.4rem;

  flex-shrink: 0;

  padding:
    0
    0.8rem;

  background:
    var(
      --color-navy-deep,
      #16324a
    );

  color: #ffffff;

  border:
    1px solid
    transparent;

  font-family: inherit;

  font-size: 0.67rem;

  font-weight: 700;

  text-decoration: none;

  transition:
    background 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}


.ministry-card__details:hover {
  background:
    var(
      --color-gold,
      #c9a227
    );

  color:
    var(
      --color-navy-deep,
      #16324a
    );

  transform:
    translateY(-2px);

  box-shadow:
    0 8px 20px
    rgba(201, 162, 39, 0.22);
}


.ministry-card__details-arrow {
  transition:
    transform 0.2s ease;
}


.ministry-card__details:hover
.ministry-card__details-arrow {
  transform:
    translateX(4px);
}


/* =========================================================
   PAGINATION
========================================================= */

.pagination {
  display: flex;

  align-items: center;

  justify-content: center;

  gap: 0.7rem;

  margin-top: 3rem;
}


.pagination__button {
  width: 60px;
  height: 60px;

  display: grid;

  place-items: center;

  border: none;

  border-radius: 50%;

  background:
    #f1f5f5;

  color: var(--color-heading);

  font-size: 1rem;

  font-weight: 700;

  cursor: pointer;

  transition:
    background 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}


.pagination__button:hover:not(:disabled) {
  background:
    var(
      --color-gold,
      #c9a227
    );

  color:
    var(
      --color-navy-deep,
      #16324a
    );

  transform:
    translateY(-3px);

  box-shadow:
    0 8px 18px
    rgba(13, 33, 55, 0.12);
}


.pagination__button--active {
  background:
    #203d3d;

  color:
    #ffffff;

  box-shadow:
    0 8px 20px
    rgba(32, 61, 61, 0.2);
}


.pagination__button--active:hover {
  background:
    #203d3d;

  color:
    #ffffff;

  transform:
    translateY(-2px);
}


.pagination__button:disabled {
  opacity: 0.35;

  cursor: not-allowed;
}


/* =========================================================
   SKELETON
========================================================= */

.ministry-card--skeleton {
  pointer-events: none;
}


.ministry-card--skeleton
.ministry-card__media {
  height: 220px;
}


/* =========================================================
   TABLET
========================================================= */

@media (max-width: 900px) {

  .ministries-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 600px) {

  .ministries-grid {
    grid-template-columns: 1fr;
  }


  .ministry-card__media {
    height: 230px;
  }


  /*
   * On mobile, don't depend on hover.
   * Keep Discover More visible.
   */
  .ministry-card__discover {
    opacity: 1;

    transform:
      translateY(0);

    background:
      linear-gradient(
        transparent,
        rgba(13, 33, 55, 0.45)
      );
  }


  .ministry-card__footer {
    align-items: flex-start;

    flex-direction: column;
  }


  .ministry-card__details {
    width: 100%;
  }


  .pagination {
    gap: 0.4rem;
  }


  .pagination__button {
    width: 46px;
    height: 46px;
  }

}

</style>