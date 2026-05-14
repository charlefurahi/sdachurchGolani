import { ref, computed } from 'vue'

export function useSearch(items, fields = ['title']) {
  const query = ref('')

  const filtered = computed(() => {
    if (!query.value.trim()) return items.value
    const q = query.value.toLowerCase()
    return items.value.filter(item =>
      fields.some(f => item[f]?.toLowerCase().includes(q))
    )
  })

  return { query, filtered }
}
