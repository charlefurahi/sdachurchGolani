<template>
  <header
    class="site-header"
    :class="{
      'site-header--over-hero': overHero,
      'site-header--scrolled': scrolled,
    }"
  >
    <div class="site-header__inner">
      <RouterLink to="/" class="site-brand" aria-label="Golani SDA Church home">
        <span class="site-brand__mark" aria-hidden="true">
          <img :src="logo" alt="" class="site-brand__logo" />
        </span>
        <span>
          <span class="site-brand__name">GOLANI </span>
          <span class="site-brand__sub">Seventh-day Adventist Church</span>
        </span>
      </RouterLink>

      <nav class="site-nav" aria-label="Main navigation">
        <RouterLink
          v-for="item in mainNavigation"
          :key="item.to"
          :to="item.to"
          class="site-nav__link"
        >
          {{ item.label }}
        </RouterLink>

        <div
          class="site-nav__more"
          @mouseenter="openMoreOnHover"
          @mouseleave="closeMoreOnHover"
        >
          <button
            type="button"
            class="site-nav__link site-nav__more-button"
            :aria-expanded="moreOpen"
            aria-haspopup="true"
            @click="moreOpen = !moreOpen"
          >
            More
            <svg aria-hidden="true" class="site-nav__more-caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          <div v-if="moreOpen" class="site-nav__dropdown" role="menu">
            <RouterLink
              v-for="item in moreNavigation"
              :key="item.to"
              :to="item.to"
              class="site-nav__dropdown-link"
              role="menuitem"
              @click="moreOpen = false"
            >
              {{ item.label }}
            </RouterLink>
          </div>
        </div>

        <RouterLink to="/give" class="button button--primary">
          Donate
        </RouterLink>
      </nav>

      <button
        ref="menuButton"
        type="button"
        class="site-menu-button"
        :aria-expanded="menuOpen"
        aria-controls="golani-sidebar"
        aria-label="Open navigation menu"
        @click="toggleMenu"
      >
        <span aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { mainNavigation, moreNavigation } from '@/constants/navigation'
import logo from '@/assets/logos/logo.png'

defineProps({
  overHero: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
const appStore = useAppStore()
const menuButton = ref(null)
const moreOpen = ref(false)
const scrolled = ref(false)
let closeTimer = null

const menuOpen = computed(() => appStore.isSidebarOpen)

// Desktop-only hover behaviour: the dropdown opens on hover and stays open
// while the pointer moves from the "More" button into the panel itself. A
// short close delay absorbs the gap between the button and the dropdown so
// it doesn't snap shut mid-move. Touch/mobile still uses the click handler
// on the button above, since there is no real hover there.
function isDesktop() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function openMoreOnHover() {
  if (!isDesktop()) return
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
  moreOpen.value = true
}

function closeMoreOnHover() {
  if (!isDesktop()) return
  closeTimer = setTimeout(() => {
    moreOpen.value = false
  }, 150)
}

function toggleMenu() {
  appStore.toggleSidebar()
}

function closeMenu() {
  appStore.closeSidebar()
}

function onScroll() {
  scrolled.value = window.scrollY > 24
}

function onKeydown(event) {
  if (event.key === 'Escape') {
    moreOpen.value = false
    closeMenu()
    menuButton.value?.focus()
  }
}

watch(() => route.fullPath, () => {
  moreOpen.value = false
  closeMenu()
})

watch(menuOpen, value => {
  document.body.classList.toggle('menu-open', value)
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.body.classList.remove('menu-open')
  if (closeTimer) clearTimeout(closeTimer)
})
</script>

<style scoped>
.site-nav__more {
  position: relative;
}

.site-nav__more-button {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: transparent;
  cursor: pointer;
}

.site-nav__more-caret {
  transition: transform var(--duration-fast) var(--ease-standard);
}

.site-nav__more[aria-expanded="true"] .site-nav__more-caret,
.site-nav__more:has(.site-nav__dropdown) .site-nav__more-caret {
  transform: rotate(180deg);
}

.site-nav__dropdown {
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  min-width: 210px;
  padding: 0.45rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-lift);
}

.site-nav__dropdown-link {
  display: block;
  padding: 0.65rem 0.75rem;
  border-radius: var(--radius-sm);
  color: var(--color-text-main);
  font-size: 0.82rem;
}

.site-nav__dropdown-link:hover,
.site-nav__dropdown-link.router-link-active {
  background: var(--color-bg-alt);
  color: var(--color-heading);
}
:global(.dark) .site-nav__dropdown-link:hover,
:global(.dark) .site-nav__dropdown-link.router-link-active { background:var(--color-surface-alt); color:#fff; }
</style>
