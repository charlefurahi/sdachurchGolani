<template>
  <header class="page-header">
    <div class="site-container page-header__inner">

      <div class="page-header__eyebrow">
        <span class="page-header__line"></span>
        <span>{{ eyebrow }}</span>
      </div>

      <div class="page-header__content">
        <h1>{{ title }}</h1>

        <p v-if="description">
          {{ description }}
        </p>
      </div>

    </div>
  </header>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: '',
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>

.page-header {
  position: relative;

  display: flex;
  align-items: flex-end;

  min-height: min(42vh, 460px);

  padding: clamp(6rem, 10vw, 8rem) 0 clamp(3.5rem, 6vw, 5rem);

  background: var(--color-navy-deep);
  color: var(--color-white);

  overflow: hidden;
}


/*
  A very subtle gold presence.
  No gradients, decorative blobs or artificial UI effects.
*/

.page-header::after {
  content: '';

  position: absolute;

  right: clamp(2rem, 8vw, 9rem);
  bottom: clamp(3rem, 8vw, 7rem);

  width: 1px;
  height: clamp(80px, 12vw, 150px);

  background: var(--color-gold);

  opacity: 0.8;
}


.page-header__inner {
  position: relative;
  z-index: 1;
}


.page-header__eyebrow {
  display: flex;
  align-items: center;

  gap: 0.75rem;

  margin-bottom: 1.5rem;

  color: var(--color-gold);

  font-size: 0.7rem;
  font-weight: 600;

  letter-spacing: 0.16em;
  text-transform: uppercase;
}


.page-header__line {
  width: 34px;
  height: 1px;

  background: var(--color-gold);
}


.page-header__content {
  max-width: 1050px;
}


.page-header h1 {
  margin: 0;

  font-size: clamp(2.75rem, 5.5vw, 4.75rem);

  font-weight: 600;

  line-height: 1;

  letter-spacing: -0.03em;
}


.page-header p {
  max-width: 560px;

  margin: 1.25rem 0 0;

  color: rgba(255, 255, 255, 0.68);

  font-size: clamp(0.95rem, 1.3vw, 1.1rem);

  line-height: 1.7;
}


@media (max-width: 700px) {

  .page-header {
    min-height: auto;

    padding-top: 7rem;
  }

  .page-header::after {
    display: none;
  }

  .page-header h1 {
    font-size: clamp(2.4rem, 11vw, 3.4rem);
  }

  .page-header p {
    margin-top: 1.1rem;
  }

}


@media (max-width: 480px) {

  .page-header {
    min-height: auto;
  }

  .page-header__eyebrow {
    margin-bottom: 1.25rem;
  }

  .page-header h1 {
    font-size: 2.3rem;
  }

}

</style>