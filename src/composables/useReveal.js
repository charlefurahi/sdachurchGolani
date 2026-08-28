import { onMounted, onUnmounted } from 'vue'

export function useReveal() {
  let observer = null

  onMounted(() => {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.12 })

    elements.forEach(el => observer.observe(el))
  })

  onUnmounted(() => observer?.disconnect())
}
