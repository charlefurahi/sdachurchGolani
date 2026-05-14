import { ref, onMounted, onUnmounted } from 'vue'

export function useIntersectionObserver(options = {}) {
  const isVisible = ref(false)
  const target = ref(null)
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        if (options.once !== false) observer.disconnect()
      }
    }, { threshold: 0.15, ...options })

    if (target.value) observer.observe(target.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { isVisible, target }
}
