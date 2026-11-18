<template>
  <section class="pillars-section" aria-label="Church pillars">
    <div class="pillars-strip">
      <div class="pillars-strip__track">

        <!-- First set -->
        <div
          v-for="pillar in pillars"
          :key="`${pillar.key}-one`"
          class="pillar-logo"
        >
          <img
            :src="pillar.img"
            alt=""
            aria-hidden="true"
          />
        </div>

        <!-- Duplicate set (for seamless loop) -->
        <div
          v-for="pillar in pillars"
          :key="`${pillar.key}-two`"
          class="pillar-logo"
        >
          <img
            :src="pillar.img"
            alt=""
            aria-hidden="true"
          />
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
/*
  IMPORTANT: majina ya faili ni lowercase (.png),
  siyo .PNG. Kwenye Mac/Windows import ya .PNG
  inaweza "kufanya kazi" kwa bahati, lakini
  kwenye server nyingi za production (Linux,
  case-sensitive) build itavunjika. Tumia .png
  kila mahali.
*/
import iwillgo from '@/assets/gallery/IWILLGO.png'
import onevoice from '@/assets/gallery/ONEVOICE.png'
import grounded from '@/assets/gallery/GROUNDED.png'
import integrated from '@/assets/gallery/INTEGRATED.png'

const pillars = [
  { key: 'iwillgo', img: iwillgo },
  { key: 'onevoice', img: onevoice },
  { key: 'grounded', img: grounded },
  { key: 'integrated', img: integrated },
]
</script>

<style scoped>
/* =========================================================
   SECTION WRAPPER
   Hii sasa ni sehemu (section) ya kawaida kwenye mtiririko
   wa ukurasa (siyo tena absolute overlay juu ya hero) —
   inakaa mwishoni mwa Home page, kabla ya Footer.
========================================================= */

.pillars-section {
  background: var(--color-bg);

  border-top: 1px solid rgba(13, 33, 55, 0.08);
  margin-bottom: clamp(2.5rem, 6vw, 5rem);
}


.pillars-strip {
  width: 100%;

  padding-block: 1.75rem;

  overflow: hidden;

  display: flex;
  align-items: center;
}


/* =========================================================
   MOVING TRACK
========================================================= */

.pillars-strip__track {
  display: flex;
  align-items: center;

  width: max-content;

  gap: clamp(2.5rem, 5vw, 4.5rem);

  animation: pillars-scroll 26s linear infinite;

  will-change: transform;
}


/* =========================================================
   LOGO CONTAINER
   Picha zote 4 zimekatwa (cropped) ili kuondoa uwazi
   (transparent padding) unaozunguka kila mchoro, hivyo
   height moja inatoa "uzito" wa kuonekana ulio sawa kwa
   zote nne; width inabaki auto kutokana na uwiano wa kila
   logo (baadhi ni pana zaidi, ni kawaida).
========================================================= */

.pillar-logo {
  flex: 0 0 auto;

  height: 84px;

  display: flex;
  align-items: center;
  justify-content: center;
}


/* =========================================================
   IMAGE
========================================================= */

.pillar-logo img {
  display: block;
  /* white halo keeps dark logos visible on any background (no bar behind them) */
  filter: drop-shadow(0 0 1px #fff) drop-shadow(0 0 3px #fff) drop-shadow(0 0 10px rgba(255, 255, 255, 0.95));
  transform-origin: 50% 0;
  animation: pillar-hang 4.5s ease-in-out infinite alternate;

  height: 100%;
  width: auto;

  object-fit: contain;

  background: transparent;

  transition: transform 0.3s ease;
}


/* =========================================================
   HOVER
========================================================= */

.pillar-logo:nth-child(2n) img { animation-delay: -1.4s; }
.pillar-logo:nth-child(3n) img { animation-delay: -2.8s; }
.pillar-logo:hover img { animation-play-state: paused; transform: scale(1.08); }


/* =========================================================
   RIGHT → LEFT
========================================================= */

@keyframes pillar-hang {
  from { transform: rotate(-2.2deg) translateY(0); }
  to   { transform: rotate(2.2deg) translateY(4px); }
}

@keyframes pillars-scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 720px) {
  .pillars-strip {
    padding-block: 1.25rem;
  }

  .pillars-strip__track {
    gap: 1.8rem;
    animation-duration: 20s;
  }

  .pillar-logo {
    height: 58px;
  }
}


/* =========================================================
   REDUCED MOTION
========================================================= */

@media (prefers-reduced-motion: reduce) {
  .pillars-strip__track {
    animation: none;
    transform: translateX(0);
  }
  .pillar-logo img { animation: none; }
}
</style>
