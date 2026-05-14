import { ref, onMounted, onUnmounted } from 'vue'

export function useScroll() {
  const scrollY = ref(0)
  const isScrolled = ref(false)

  const handleScroll = () => {
    scrollY.value = window.scrollY
    isScrolled.value = window.scrollY > 60
  }

  onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))

  return { scrollY, isScrolled }
}
