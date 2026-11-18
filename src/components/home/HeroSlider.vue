<template>
  <section
    class="hero"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <!-- ── Full-bleed slides track ─────────────────────────────────────── -->
    <div class="hero__track" :style="trackStyle">
      <div
        v-for="(slide, i) in slides"
        :key="i"
        class="hero__slide"
      >
        <div
          class="hero__bg"
          :class="i === current ? 'hero__bg--zoom' : ''"
          :style="slide.photo
            ? { backgroundImage: `url(${slide.photo})` }
            : { background: slide.gradient }"
        ></div>
        <!-- Deep overlay for legibility -->
        <div class="hero__overlay"></div>
      </div>
    </div>

    <!-- ── Framed center content panel ───────────────────────────────── -->
    <div class="hero__stage">
      <Transition name="panel" mode="out-in">
        <div :key="current" class="hero__panel">
          <!-- top rule decoration -->
          <div class="hero__rule">
            <span class="hero__rule-line"></span>
            <span class="hero__rule-cross">✦</span>
            <span class="hero__rule-line"></span>
          </div>

          <!-- eyebrow -->
          <p class="hero__eyebrow">{{ slides[current].tag }}</p>

          <!-- main title -->
          <h1 class="hero__title">
            <span class="hero__title-plain">{{ titleParts(slides[current].title).prefix }}</span>
            <span v-if="titleParts(slides[current].title).prefix"> </span>
            <span class="hero__title-accent">{{ titleParts(slides[current].title).accent }}</span>
          </h1>

          <!-- subtitle -->
          <p class="hero__sub">{{ slides[current].subtitle }}</p>

          <!-- bottom rule decoration -->
          <div class="hero__rule hero__rule--bottom">
            <span class="hero__rule-line"></span>
            <span class="hero__rule-cross">✦</span>
            <span class="hero__rule-line"></span>
          </div>

          <!-- CTAs -->
          <div class="hero__actions">
            <RouterLink to="/sermons" class="hero__cta hero__cta--fill">
              Watch Sermons
            </RouterLink>
            <RouterLink to="/events" class="hero__cta hero__cta--outline">
              Join Us This Sabbath
            </RouterLink>
          </div>
        </div>
      </Transition>
    </div>

    <!-- ── Prev / Next arrows ─────────────────────────────────────────── -->
    <button class="hero__arrow hero__arrow--prev" @click="prev" aria-label="Previous">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>
    <button class="hero__arrow hero__arrow--next" @click="next" aria-label="Next">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>

    <!-- ── Dot indicators + progress bar ─────────────────────────────── -->
    <div class="hero__dots">
      <button
        v-for="(_, i) in slides"
        :key="i"
        :class="['hero__dot', i === current ? 'hero__dot--active' : '']"
        @click="goTo(i)"
        :aria-label="`Slide ${i + 1}`"
      >
        <span v-if="i === current" class="hero__dot-fill" :style="{ animationDuration: `${INTERVAL}ms` }"></span>
      </button>
    </div>

    <!-- ── Slide counter ───────────────────────────────────────────────── -->
    <div class="hero__counter" aria-hidden="true">
      <span class="hero__counter-n">{{ String(current + 1).padStart(2,'0') }}</span>
      <span class="hero__counter-sep">/</span>
      <span class="hero__counter-t">{{ String(slides.length).padStart(2,'0') }}</span>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import galleryService from '@/services/galleryService'
import { resolveMedia } from '@/services/api.js'

const INTERVAL = 6000

// ── Slide definitions ──────────────────────────────────────────────────
const CONTENT = [
  {
    tag:      'Golani Seventh-day Adventist Church',
    title:    'Faith Hope Love',
    subtitle: 'Rooted in the Word of God, driven by purpose, united in Christ. Join us every Sabbath as we sing, grow, and serve together.',
<<<<<<< HEAD
    gradient: 'linear-gradient(160deg,#16324a 0%,#163f5e 60%,#16324a 100%)',
=======
    gradient: 'linear-gradient(160deg,#0d2137 0%,#163f5e 60%,#0d2137 100%)',
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  },
  {
    tag:      'Sabbath Worship Service',
    title:    'Come and Worship God',
    subtitle: 'Experience the presence of God in our Sabbath services — solid teaching, powerful praise, and genuine community.',
    gradient: 'linear-gradient(160deg,#050f1c 0%,#235477 60%,#050f1c 100%)',
  },
  {
    tag:      'Serving Our Community',
    title:    'Faith in Action',
    subtitle: 'True Christianity extends beyond these walls. Join us as we serve our neighbours and share the Good News of Christ.',
<<<<<<< HEAD
    gradient: 'linear-gradient(160deg,#08182a 0%,#163f5e 55%,#16324a 100%)',
=======
    gradient: 'linear-gradient(160deg,#08182a 0%,#163f5e 55%,#0d2137 100%)',
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  },
]

const slides  = ref(CONTENT.map(s => ({ ...s, photo: null })))
const current = ref(0)
let timer     = null
let touchX    = 0

// ── Computed ───────────────────────────────────────────────────────────
const trackStyle = computed(() => ({
  transform:  `translateX(-${current.value * 100}%)`,
  transition: 'transform 0.85s cubic-bezier(0.77,0,0.175,1)',
}))

function titleParts(t) {
  const w = t.trim().split(/\s+/)
  const a = w.pop()
  return { prefix: w.join(' '), accent: a }
}

// ── Navigation ─────────────────────────────────────────────────────────
function goTo(i)     { current.value = i; reset() }
function next()      { current.value = (current.value + 1) % slides.value.length; reset() }
function prev()      { current.value = (current.value - 1 + slides.value.length) % slides.value.length; reset() }
function start()     { timer = setInterval(next, INTERVAL) }
function reset()     { clearInterval(timer); start() }

// ── Swipe ──────────────────────────────────────────────────────────────
function onTouchStart(e) { touchX = e.changedTouches[0].clientX }
function onTouchEnd(e)   { const d = touchX - e.changedTouches[0].clientX; if (Math.abs(d) > 48) d > 0 ? next() : prev() }

// ── Gallery photos ─────────────────────────────────────────────────────
function resolveUrl(p) {
  if (!p) return null
  if (p.image_url) return p.image_url
  if (p.image)     return resolveMedia(p.image)
  if (p.url)       return p.url
  return null
}
function shuffle(a) {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[b[i], b[j]] = [b[j], b[i]] }
  return b
}
async function loadPhotos() {
  try {
    const res   = await galleryService.getPhotos({ page_size: 20 })
    const list  = res?.results ?? res
    if (!Array.isArray(list) || !list.length) return
    const urls  = shuffle(list.map(resolveUrl).filter(Boolean))
    if (!urls.length) return
    slides.value = slides.value.map((s, i) => ({ ...s, photo: urls[i % urls.length] }))
  } catch (e) { console.warn('Hero photos failed:', e?.message || e) }
}

onMounted(() => { start(); loadPhotos() })
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
/* ─── Shell ──────────────────────────────────────────────────────────── */
.hero {
  /* sticky (not fixed/relative): the hero stays pinned in the viewport
     while the content shell below scrolls up and covers it — the
     "reveal" effect used on bethanychurchlax.org / chuokikuu wa sda.org */
  position: sticky;
  top: 0;
  z-index: 0;
  width: 100%;
  height: 100svh;
  min-height: 600px;
  overflow: hidden;
  background: #050d1a;
}

/* ─── Slide track ────────────────────────────────────────────────────── */
.hero__track {
  position: absolute;
  inset: 0;
  display: flex;
  width: 100%;
  height: 100%;
  will-change: transform;
}
.hero__slide {
  flex: 0 0 100%;
  position: relative;
  overflow: hidden;
}

/* ─── Background image ───────────────────────────────────────────────── */
.hero__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}
.hero__bg--zoom {
  animation: kenBurns 8s ease-out forwards;
}
@keyframes kenBurns {
  from { transform: scale(1);    }
  to   { transform: scale(1.07); }
}

/* ─── Dark overlay ───────────────────────────────────────────────────── */
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(4,12,28,0.52) 0%,
    rgba(4,12,28,0.68) 50%,
    rgba(4,12,28,0.78) 100%
  );
}

/* ─── Center stage ───────────────────────────────────────────────────── */
.hero__stage {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
}

/* ─── The frame / panel ──────────────────────────────────────────────── */
.hero__panel {
  text-align: center;
  max-width: 760px;
  width: 100%;
  /* the "frame": a translucent bordered card */
  padding: 52px 56px;
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(5,14,32,0.38);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-radius: 4px;
  /* subtle inner glow */
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,0.06),
    0 32px 80px rgba(0,0,0,0.55);
}

/* ─── Panel transition ───────────────────────────────────────────────── */
.panel-enter-active { transition: opacity 0.5s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1); }
.panel-leave-active { transition: opacity 0.28s ease; }
.panel-enter-from   { opacity: 0; transform: translateY(20px) scale(0.98); }
.panel-leave-to     { opacity: 0; }

/* ─── Decorative rule ────────────────────────────────────────────────── */
.hero__rule {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
}
.hero__rule--bottom { margin-bottom: 32px; margin-top: 22px; }
.hero__rule-line {
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,0.25);
}
.hero__rule-cross {
  color: rgba(255,255,255,0.45);
  font-size: 11px;
  flex-shrink: 0;
}

/* ─── Eyebrow / tag ──────────────────────────────────────────────────── */
.hero__eyebrow {
  font-family: 'Poppins', system-ui, sans-serif;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.58);
  margin-bottom: 18px;
}

/* ─── Title ──────────────────────────────────────────────────────────── */
.hero__title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(36px, 5.5vw, 72px);
  font-weight: 900;
  line-height: 1.07;
  margin-bottom: 18px;
  text-shadow: 0 2px 24px rgba(0,0,0,0.5);
}
.hero__title-plain  { color: #fff; }
.hero__title-accent {
  /* on-brand: white + navy + the single brand yellow accent */
  color: #f4d03f;
  text-shadow: 0 0 60px rgba(244,208,63,0.30), 0 2px 20px rgba(0,0,0,0.5);
}

/* ─── Subtitle ───────────────────────────────────────────────────────── */
.hero__sub {
  font-family: 'Poppins', system-ui, sans-serif;
  font-size: clamp(13.5px, 1.5vw, 16px);
  color: rgba(255,255,255,0.68);
  line-height: 1.9;
  max-width: 540px;
  margin: 0 auto;
}

/* ─── CTA buttons ────────────────────────────────────────────────────── */
.hero__actions {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}
.hero__cta {
  font-family: 'Poppins', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 13px 32px;
  border-radius: 2px;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: all 0.22s;
  white-space: nowrap;
}
.hero__cta--fill {
  background: rgba(255,255,255,0.92);
<<<<<<< HEAD
  color: #16324a;
=======
  color: #0d2137;
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  border-color: transparent;
}
.hero__cta--fill:hover {
  background: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}
.hero__cta--outline {
  background: transparent;
  color: #fff;
  border-color: rgba(255,255,255,0.5);
}
.hero__cta--outline:hover {
  background: rgba(255,255,255,0.1);
  border-color: #fff;
  transform: translateY(-2px);
}

/* ─── Arrows ─────────────────────────────────────────────────────────── */
.hero__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
.hero__arrow:hover {
  background: rgba(255,255,255,0.18);
  border-color: rgba(255,255,255,0.6);
  transform: translateY(-50%) scale(1.07);
}
.hero__arrow--prev { left: 28px; }
.hero__arrow--next { right: 28px; }

/* ─── Dot indicators ─────────────────────────────────────────────────── */
.hero__dots {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  gap: 10px;
  align-items: center;
}
.hero__dot {
  position: relative;
  width: 30px;
  height: 3px;
  border-radius: 2px;
  background: rgba(255,255,255,0.25);
  border: none;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  transition: background 0.3s, width 0.3s;
}
.hero__dot--active {
  width: 52px;
  background: rgba(255,255,255,0.35);
}
.hero__dot-fill {
  position: absolute;
  top: 0; left: 0; bottom: 0;
  width: 0%;
  background: #fff;
  border-radius: 2px;
  animation: dotFill linear forwards;
}
@keyframes dotFill {
  from { width: 0%; }
  to   { width: 100%; }
}

/* ─── Counter ────────────────────────────────────────────────────────── */
.hero__counter {
  position: absolute;
  bottom: 28px;
  right: 32px;
  z-index: 20;
  display: flex;
  align-items: baseline;
  gap: 5px;
  font-family: 'Poppins', system-ui, sans-serif;
}
.hero__counter-n {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 8px rgba(0,0,0,0.5);
}
.hero__counter-sep {
  font-size: 13px;
  color: rgba(255,255,255,0.3);
}
.hero__counter-t {
  font-size: 13px;
  color: rgba(255,255,255,0.35);
}

/* ─── Tablet ─────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .hero__panel {
    padding: 36px 28px;
  }
  .hero__arrow--prev { left: 12px; }
  .hero__arrow--next { right: 12px; }
  .hero__arrow { width: 40px; height: 40px; }
  .hero__counter { right: 16px; bottom: 20px; }
  .hero__dots    { bottom: 24px; }
}

/* ─── Phone ──────────────────────────────────────────────────────────── */
@media (max-width: 480px) {
  .hero { min-height: 100svh; }
  .hero__panel {
    padding: 28px 20px;
    border-radius: 3px;
  }
  .hero__rule { gap: 10px; margin-bottom: 16px; }
  .hero__rule--bottom { margin-bottom: 24px; margin-top: 16px; }
  .hero__eyebrow { font-size: 9.5px; margin-bottom: 12px; }
  .hero__sub { font-size: 13.5px; line-height: 1.8; }
  .hero__actions { gap: 10px; }
  .hero__cta {
    padding: 11px 22px;
    font-size: 12px;
    flex: 1 1 calc(50% - 10px);
    text-align: center;
  }
  .hero__arrow   { display: none; } /* swipe on mobile */
  .hero__counter { display: none; }
  .hero__dots    { bottom: 18px; }
  .hero__dot     { width: 22px; }
  .hero__dot--active { width: 40px; }
}

/* ─── Reduced motion ─────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .hero__bg--zoom    { animation: none; }
  .hero__track       { transition: none; }
  .hero__dot-fill    { animation: none; width: 100%; }
}
</style>