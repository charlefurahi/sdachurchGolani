import { ref, onMounted, onUnmounted } from 'vue'

export function useIntersection(threshold = 0.15) {
  const elements = ref([])

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold })

  onMounted(() => {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      observer.observe(el)
    })
  })

  onUnmounted(() => observer.disconnect())

  return { observer }
}
