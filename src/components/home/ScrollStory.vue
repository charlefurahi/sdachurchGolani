<template>
  <section
    ref="storyRef"
    class="scroll-story"
    :style="{ '--story-image': `url(${image})` }"
  >
    <div class="scroll-story__stage">

      <!-- Real church image behind the story -->
      <div
        class="scroll-story__background"
        :style="backgroundStyle"
      ></div>

      <!-- Keeps text readable -->
      <div
        class="scroll-story__overlay"
        :style="overlayStyle"
      ></div>

      <!-- Story panels -->
      <div class="scroll-story__content">

        <div
          v-for="(panel, index) in panels"
          :key="index"
          class="scroll-story__panel"
          :class="{
            'is-active': activePanel === index,
            'is-past': activePanel > index,
            'is-future': activePanel < index
          }"
          :style="panelStyle(index)"
        >
          <div class="scroll-story__panel-inner">
            <slot :name="`panel-${index}`" />
          </div>
        </div>

      </div>

    </div>
  </section>
</template>


<script setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref
} from 'vue'


const props = defineProps({
  image: {
    type: String,
    required: true
  }
})


/*
|--------------------------------------------------------------------------
| Story structure
|--------------------------------------------------------------------------
|
| 0 = Welcome
| 1 = Church Life
| 2 = Worship / image reveal
|
| The actual content comes from Home.vue through named slots.
|
*/

const panels = [
  'welcome',
  'church-life',
  'worship'
]


const storyRef = ref(null)

const scrollProgress = ref(0)

const activePanel = ref(0)

let ticking = false


/*
|--------------------------------------------------------------------------
| Calculate scroll progress
|--------------------------------------------------------------------------
*/

function updateStory() {
  if (!storyRef.value) {
    ticking = false
    return
  }

  const rect = storyRef.value.getBoundingClientRect()

  const scrollableDistance =
    storyRef.value.offsetHeight - window.innerHeight


  if (scrollableDistance <= 0) {
    ticking = false
    return
  }


  const distancePassed = Math.min(
    Math.max(-rect.top, 0),
    scrollableDistance
  )


  const progress =
    distancePassed / scrollableDistance


  scrollProgress.value = progress


  /*
   * Divide the story into three meaningful stages.
   *
   * 0.00 → 0.32   Welcome
   * 0.32 → 0.66   Church Life
   * 0.66 → 1.00   Worship / image
   */

  if (progress < 0.32) {
    activePanel.value = 0
  } else if (progress < 0.66) {
    activePanel.value = 1
  } else {
    activePanel.value = 2
  }


  ticking = false
}


function handleScroll() {
  if (!ticking) {
    window.requestAnimationFrame(updateStory)

    ticking = true
  }
}


/*
|--------------------------------------------------------------------------
| Background image
|--------------------------------------------------------------------------
*/

const backgroundStyle = computed(() => {

  const progress = scrollProgress.value

  /*
   * Slightly enlarge the image at the beginning
   * and settle it naturally as the image becomes visible.
   */

  const scale =
    1.05 - (progress * 0.03)


  return {
    transform: `scale(${scale})`
  }
})


/*
|--------------------------------------------------------------------------
| Overlay
|--------------------------------------------------------------------------
|
| The final image stage becomes slightly clearer as the user reaches
| the end of the story.
|
*/

const overlayStyle = computed(() => {

  const progress = scrollProgress.value


  let opacity


  if (progress < 0.66) {
    opacity = 0.82
  } else {

    const imageProgress =
      (progress - 0.66) / 0.34

    opacity =
      0.82 - (imageProgress * 0.28)
  }


  return {
    opacity
  }
})


/*
|--------------------------------------------------------------------------
| Panel animation
|--------------------------------------------------------------------------
*/

function panelStyle(index) {

  const progress =
    scrollProgress.value


  /*
   * Each panel owns a section of the scroll.
   */

  const ranges = [
    {
      start: 0,
      end: 0.32
    },
    {
      start: 0.32,
      end: 0.66
    },
    {
      start: 0.66,
      end: 1
    }
  ]


  const range = ranges[index]


  /*
   * Before the panel's range.
   */

  if (progress < range.start) {

    return {
      opacity: 0,
      transform: 'translateY(5vh)',
      pointerEvents: 'none'
    }
  }


  /*
   * After the panel's range.
   */

  if (progress > range.end) {

    return {
      opacity: 0,
      transform: 'translateY(-5vh)',
      pointerEvents: 'none'
    }
  }


  /*
   * Progress inside this panel.
   */

  const localProgress =
    (progress - range.start) /
    (range.end - range.start)


  /*
   * Smooth entrance and exit.
   */

  const fadeIn =
    Math.min(localProgress / 0.18, 1)


  const fadeOut =
    Math.min(
      (1 - localProgress) / 0.18,
      1
    )


  const opacity =
    Math.min(fadeIn, fadeOut)


  /*
   * Very subtle movement.
   *
   * We don't want a dramatic animation.
   * It should feel like a natural editorial transition.
   */

  const translate =
    (1 - fadeIn) * 3 -
    (1 - fadeOut) * 3


  return {
    opacity,
    transform: `translateY(${translate}vh)`,
    pointerEvents: opacity > 0.5 ? 'auto' : 'none'
  }
}


/*
|--------------------------------------------------------------------------
| Lifecycle
|--------------------------------------------------------------------------
*/

onMounted(() => {

  updateStory()

  window.addEventListener(
    'scroll',
    handleScroll,
    {
      passive: true
    }
  )

  window.addEventListener(
    'resize',
    updateStory,
    {
      passive: true
    }
  )
})


onBeforeUnmount(() => {

  window.removeEventListener(
    'scroll',
    handleScroll
  )

  window.removeEventListener(
    'resize',
    updateStory
  )
})
</script>


<style scoped>

/* =========================================================
   STORY CONTAINER
========================================================= */

.scroll-story {
  position: relative;

  width: 100%;

  /*
   * Three viewport stages.
   *
   * This creates the actual scroll distance.
   */
  min-height: 300svh;

  background:
    var(--color-white);
}


/* =========================================================
   STICKY VIEWPORT
========================================================= */

.scroll-story__stage {
  position: sticky;

  top: 0;

  width: 100%;

  height: 100svh;

  min-height: 620px;

  overflow: hidden;

  isolation: isolate;

  background:
    var(--color-white);
}


/* =========================================================
   BACKGROUND
========================================================= */

.scroll-story__background {
  position: absolute;

  inset: -3%;

  z-index: 0;

  background-image:
    var(--story-image);

  background-size: cover;

  background-position: center;

  background-repeat: no-repeat;

  will-change: transform;

  transition:
    transform 120ms linear;
}


/* =========================================================
   IMAGE OVERLAY
========================================================= */

.scroll-story__overlay {
  position: absolute;

  inset: 0;

  z-index: 1;

  pointer-events: none;

  background:
    linear-gradient(
      90deg,
      rgba(13, 31, 45, 0.84) 0%,
      rgba(13, 31, 45, 0.58) 52%,
      rgba(13, 31, 45, 0.28) 100%
    );

  transition:
    opacity 160ms linear;
}


/* =========================================================
   PANELS CONTAINER
========================================================= */

.scroll-story__content {
  position: relative;

  z-index: 2;

  width: 100%;

  height: 100%;
}


/* =========================================================
   INDIVIDUAL PANEL
========================================================= */

.scroll-story__panel {
  position: absolute;

  inset: 0;

  width: 100%;

  height: 100%;

  display: flex;

  align-items: center;

  overflow: hidden;

  opacity: 0;

  will-change:
    opacity,
    transform;

  transition:
    opacity 180ms ease-out,
    transform 220ms ease-out;
}


/*
 * The actual content inside each panel.
 */

.scroll-story__panel-inner {
  width: 100%;
}


/* =========================================================
   PANEL COLORS
========================================================= */

/*
 * The first two panels are opaque.
 * The last panel is transparent so the photograph can show.
 *
 * The classes below are supplied by Home.vue.
 */

.scroll-story__panel :deep(.story-panel--light) {
  background:
    var(--color-white);
}

.scroll-story__panel :deep(.story-panel--navy) {
  background:
    var(--color-navy);
}

.scroll-story__panel :deep(.story-panel--image) {
  background:
    transparent;
}


/*
 * The panel itself needs to be transparent.
 * Home's actual story panel provides the visual surface.
 */

.scroll-story__panel {
  background: transparent;
}


/* =========================================================
   ACCESSIBILITY
========================================================= */

@media (prefers-reduced-motion: reduce) {

  .scroll-story {
    min-height: auto;
  }

  .scroll-story__stage {
    position: relative;

    height: auto;

    min-height: auto;
  }

  .scroll-story__content {
    height: auto;
  }

  .scroll-story__panel {
    position: relative;

    inset: auto;

    min-height: 70svh;

    opacity: 1 !important;

    transform: none !important;

    pointer-events: auto !important;
  }

}


/* =========================================================
   TABLET
========================================================= */

@media (max-width: 900px) {

  .scroll-story {
    min-height: 300svh;
  }

  .scroll-story__stage {
    min-height: 560px;
  }

  .scroll-story__overlay {
    background:
      linear-gradient(
        90deg,
        rgba(13, 31, 45, 0.82),
        rgba(13, 31, 45, 0.46)
      );
  }

}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 600px) {

  .scroll-story {
    min-height: 300svh;
  }

  .scroll-story__stage {
    height: 100svh;

    min-height: 560px;
  }

  .scroll-story__background {
    background-position:
      58%
      center;
  }

  .scroll-story__overlay {
    background:
      linear-gradient(
        90deg,
        rgba(13, 31, 45, 0.84),
        rgba(13, 31, 45, 0.48)
      );
  }

}
</style>