<template>
  <div class="ministry-directory">

    <!-- Filters -->
    <div
      class="ministry-directory__filters"
      aria-label="Filter ministries by category"
    >

      <button
        type="button"
        :class="{ active: selectedCategory === 'all' }"
        @click="selectedCategory = 'all'"
      >
        All
      </button>

      <button
        v-for="category in categories"
        :key="category.key"
        type="button"
        :class="{ active: selectedCategory === category.key }"
        @click="selectedCategory = category.key"
      >
        {{ category.title }}
      </button>

    </div>


    <!-- Ministries -->
    <div class="ministry-grid">

      <MinistryRow
        v-for="ministry in paginatedMinistries"
        :key="ministry.id"
        :ministry="ministry"
        :leader="findLeader(ministry)"
        :category-title="getCategoryTitle(ministry.category)"
      />

    </div>


    <!-- Pagination -->
    <nav
      v-if="totalPages > 1"
      class="ministry-directory__pagination"
      aria-label="Ministries pages"
    >

      <button
        type="button"
        class="ministry-directory__page-btn"
        :disabled="currentPage === 1"
        aria-label="Previous page"
        @click="goToPage(currentPage - 1)"
      >
        «
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        type="button"
        class="ministry-directory__page-btn"
        :class="{ active: page === currentPage }"
        :aria-current="page === currentPage ? 'page' : null"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>

      <button
        type="button"
        class="ministry-directory__page-btn"
        :disabled="currentPage === totalPages"
        aria-label="Next page"
        @click="goToPage(currentPage + 1)"
      >
        »
      </button>

    </nav>

  </div>
</template>


<script setup>
import { computed, ref, watch } from 'vue'

import MinistryRow from './MinistryRow.vue'

import { ministryCatalog } from '@/data/ministries.js'


const props = defineProps({
  apiMinistries: {
    type: Array,
    default: () => [],
  },
})


/*
 * ministries.js only exports `ministryCatalog` — a nested tree of
 * top-level ministries, some with a `children` array of sub-ministries
 * (e.g. Adventist Youth Ministries -> Pathfinders, Adventurers, ...).
 * There's no flat `ministries` list or separate `ministryCategories`
 * array anymore, so we derive both from the catalog itself:
 *  - each top-level ministry becomes a filter tab/category
 *  - the grid shows the children where they exist, otherwise the
 *    top-level ministry itself, tagged with its parent's id so the
 *    category filter and MinistryRow's categoryTitle keep working.
 */
const ministries = ministryCatalog.flatMap((ministry) => {
  if (Array.isArray(ministry.children) && ministry.children.length) {
    return ministry.children.map((child) => ({
      ...child,
      category: ministry.id,
    }))
  }

  return [{ ...ministry, category: ministry.id }]
})

const categories = ministryCatalog.map((ministry) => ({
  key: ministry.id,
  title: ministry.name,
}))

const selectedCategory = ref('all')

const PAGE_SIZE = 6

const currentPage = ref(1)


const filteredMinistries = computed(() => {

  if (selectedCategory.value === 'all') {
    return ministries
  }

  return ministries.filter(
    (ministry) =>
      ministry.category === selectedCategory.value,
  )
})


const totalPages = computed(() =>
  Math.max(
    1,
    Math.ceil(
      filteredMinistries.value.length / PAGE_SIZE,
    ),
  ),
)


const paginatedMinistries = computed(() => {

  const start =
    (currentPage.value - 1) * PAGE_SIZE

  return filteredMinistries.value.slice(
    start,
    start + PAGE_SIZE,
  )
})


watch(selectedCategory, () => {
  currentPage.value = 1
})


const goToPage = (page) => {

  if (
    page < 1 ||
    page > totalPages.value
  ) return

  currentPage.value = page

  document
    .querySelector('.ministry-grid')
    ?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
}


const getCategoryTitle = (categoryKey) => {

  const category = categories.find(
    (item) => item.key === categoryKey,
  )

  return category?.title || ''
}


const findLeader = (ministry) => {

  const apiMinistry =
    props.apiMinistries.find(
      (item) =>
        normalize(item.name) ===
        normalize(ministry.name),
    )

  if (!apiMinistry) {
    return null
  }

  return (
    apiMinistry.leader ||
    apiMinistry.leader_details ||
    apiMinistry.leaderDetails ||
    null
  )
}


const normalize = (value) => {

  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[’']/g, '')
    .replace(/\s+/g, ' ')
}
</script>


<style scoped>

.ministry-directory {
  display: grid;

  gap: clamp(2rem, 5vw, 3.5rem);
}


/* =========================================
   FILTERS
========================================= */

.ministry-directory__filters {
  display: flex;

  flex-wrap: wrap;

  gap: 0.55rem;

  padding-bottom: 1.5rem;

  border-bottom: 1px solid var(--color-border);
}

.ministry-directory__filters button {
  min-height: 38px;

  padding: 0.55rem 1rem;

  background: transparent;

  color: var(--color-text-muted);

  border: 1px solid var(--color-border);

  border-radius: var(--radius-sm);

  font: inherit;

  font-size: 0.7rem;

  font-weight: 600;

  letter-spacing: 0.01em;

  cursor: pointer;

  transition:
    background-color var(--duration-fast) var(--ease-standard),
    color var(--duration-fast) var(--ease-standard),
    border-color var(--duration-fast) var(--ease-standard),
    transform var(--duration-fast) var(--ease-standard);
}

.ministry-directory__filters button:hover {
  color: var(--color-text-main);

  border-color: var(--color-gold-dark);

  transform: translateY(-1px);
}

.ministry-directory__filters button.active {
  background: var(--color-navy-deep);

  border-color: var(--color-navy-deep);

  color: var(--color-white);
}


/* =========================================
   GRID
========================================= */

.ministry-grid {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 1.5rem;
}


/* =========================================
   PAGINATION
========================================= */

.ministry-directory__pagination {
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 0.6rem;

  padding-top: 0.5rem;
}

.ministry-directory__page-btn {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;

  background: var(--color-surface);

  color: var(--color-text-main);

  border: 1px solid var(--color-border);

  border-radius: 50%;

  font: inherit;

  font-size: 0.85rem;

  font-weight: 700;

  cursor: pointer;

  transition:
    background-color var(--duration-fast) var(--ease-standard),
    color var(--duration-fast) var(--ease-standard),
    border-color var(--duration-fast) var(--ease-standard),
    transform var(--duration-fast) var(--ease-standard);
}

.ministry-directory__page-btn:hover:not(:disabled):not(.active) {
  background: var(--color-navy-05);

  border-color: var(--color-border-strong);

  transform: translateY(-1px);
}

.ministry-directory__page-btn.active {
  background: var(--color-navy-deep);

  border-color: var(--color-navy-deep);

  color: var(--color-white);
}

.ministry-directory__page-btn:disabled {
  opacity: 0.4;

  cursor: not-allowed;
}


/* =========================================
   TABLET
========================================= */

@media (max-width: 900px) {

  .ministry-grid {
    gap: 1rem;
  }

}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 680px) {

  .ministry-grid {
    grid-template-columns: 1fr;
  }

}


@media (max-width: 560px) {

  .ministry-directory__filters {
    flex-wrap: nowrap;

    overflow-x: auto;

    padding-bottom: 1rem;

    scrollbar-width: thin;
  }

  .ministry-directory__filters button {
    flex: 0 0 auto;
  }

  .ministry-directory__page-btn {
    width: 36px;
    height: 36px;

    font-size: 0.78rem;
  }

}

</style>