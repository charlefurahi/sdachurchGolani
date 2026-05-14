import { ref, computed } from 'vue'

export function usePagination(items, perPage = 6) {
  const currentPage = ref(1)

  const totalPages = computed(() => Math.ceil(items.value.length / perPage))
  const paginated = computed(() => {
    const start = (currentPage.value - 1) * perPage
    return items.value.slice(start, start + perPage)
  })

  function goTo(page) {
    currentPage.value = Math.max(1, Math.min(page, totalPages.value))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return { currentPage, totalPages, paginated, goTo }
}
