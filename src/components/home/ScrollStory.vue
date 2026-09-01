```vue
<template>
  <section
    ref="storyRef"
    class="scroll-story"
    aria-label="Golani church story"
  >
    <div class="scroll-story__sequence">
      <article
        v-for="panel in visiblePanels"
        :key="panel.key"
        class="scroll-story__item"
        :class="`scroll-story__item--${panel.index}`"
      >
        <div class="scroll-story__item-inner">

          <!-- Small editorial panel number -->
          <span
            class="scroll-story__index"
            aria-hidden="true"
          >
            {{ String(panel.index + 1).padStart(2, '0') }}
          </span>

          <!-- Panel content -->
          <div class="scroll-story__slot">
            <slot :name="panel.slot"></slot>
          </div>

        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  useSlots
} from 'vue'

const slots = useSlots()

/*
|--------------------------------------------------------------------------
| Scroll Story Panels
|--------------------------------------------------------------------------
| IMPORTANT:
| Worship With Us / panel-2 has been removed.
|
| The homepage flow is now:
|
| Hero
| ↓
| Latest Sermons
| ↓
| Scroll Story
|   ├── Welcome to Golani
|   └── There is a place for you here
| ↓
| Upcoming Events
| ↓
| Worship With Us
| ↓
| About
| ↓
| Announcements
| ↓
| Service Hours
| ↓
| Explore Golani
|--------------------------------------------------------------------------
*/

const panels = [
  {
    key: 'welcome',
    index: 0,
    slot: 'panel-0'
  },
  {
    key: 'church-life',
    index: 1,
    slot: 'panel-1'
  }
]

/*
|--------------------------------------------------------------------------
| Only render panels that actually exist in the parent component.
|--------------------------------------------------------------------------
*/
const visiblePanels = computed(() => {
  return panels.filter(panel => Boolean(slots[panel.slot]))
})

const storyRef = ref(null)

let observer = null

onMounted(() => {
  if (!storyRef.value) return

  const items = storyRef.value.querySelectorAll(
    '.scroll-story__item'
  )

  /*
  |--------------------------------------------------------------------------
  | Fallback for browsers without IntersectionObserver
  |--------------------------------------------------------------------------
  */
  if (typeof IntersectionObserver === 'undefined') {
    items.forEach(item => {
      item.classList.add('is-visible')
    })

    return
  }

  /*
  |--------------------------------------------------------------------------
  | Reveal panels when they enter the viewport.
  |--------------------------------------------------------------------------
  */
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return

        entry.target.classList.add('is-visible')

        /*
        | Once revealed, stop observing this panel.
        | This prevents unnecessary observer work.
        */
        observer?.unobserve(entry.target)
      })
    },
    {
      threshold: 0.14,
      rootMargin: '0px 0px -8% 0px'
    }
  )

  items.forEach(item => {
    observer.observe(item)
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<style scoped>

/* =========================================================
   SCROLL STORY
   =========================================================

   The component intentionally has NO background image.

   The page-wide background is controlled by Home.vue:

   .home-page__bg

   Therefore these panels remain transparent and allow the
   existing page background behavior to continue.
========================================================= */

.scroll-story {
  --story-gutter: clamp(1.25rem, 4vw, 4rem);
  --story-max: 1240px;

  position: relative;
  width: 100%;

  overflow: clip;

  background: transparent;
}

/* =========================================================
   SEQUENCE
========================================================= */

.scroll-story__sequence {
  width: 100%;
}

/* =========================================================
   STORY ITEM
========================================================= */

.scroll-story__item {
  position: relative;
  width: 100%;

  isolation: isolate;
}

.scroll-story__item-inner {
  position: relative;

  width: min(100%, var(--story-max));

  margin-inline: auto;
}

.scroll-story__slot {
  width: 100%;
}

/* =========================================================
   PANEL NUMBER
========================================================= */

.scroll-story__index {
  position: absolute;

  top: clamp(1.25rem, 3vw, 2rem);
  right: var(--story-gutter);

  z-index: 4;

  color: var(--color-white);

  font-size: 0.68rem;
  line-height: 1;
  font-weight: 800;

  letter-spacing: 0.16em;

  opacity: 0.5;

  pointer-events: none;
  user-select: none;
}

/* =========================================================
   STORY PANELS
========================================================= */

.scroll-story__item :deep(.story-panel) {
  min-height: 0;
  width: 100%;

  background: transparent;
}

/* =========================================================
   REVEAL ANIMATION
========================================================= */

.scroll-story__item .story-panel__inner {
  opacity: 0;

  transform: translateY(22px);

  transition:
    opacity 650ms ease,
    transform 650ms cubic-bezier(0.22, 1, 0.36, 1);

  will-change: opacity, transform;
}

/*
|--------------------------------------------------------------------------
| Revealed panel
|--------------------------------------------------------------------------
*/

.scroll-story__item.is-visible .story-panel__inner {
  opacity: 1;
  transform: translateY(0);
}

/*
|--------------------------------------------------------------------------
| First panel is visible immediately.
|--------------------------------------------------------------------------
*/

.scroll-story__item:first-child .story-panel__inner {
  opacity: 1;
  transform: translateY(0);
}

/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 900px) {
  .scroll-story__index {
    right: 1.25rem;
  }
}

@media (max-width: 600px) {
  .scroll-story__index {
    top: 1.1rem;
    right: 1rem;

    font-size: 0.62rem;
  }
}

/* =========================================================
   ACCESSIBILITY
========================================================= */

@media (prefers-reduced-motion: reduce) {
  .scroll-story__item .story-panel__inner {
    opacity: 1;

    transform: none;

    transition: none;

    will-change: auto;
  }
}

</style>
```
