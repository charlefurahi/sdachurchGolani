<template>
  <header class="page-header">
    <div class="site-container page-header__inner">

      <div v-if="eyebrow" class="page-header__eyebrow">
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
  overflow: hidden;

  padding: clamp(4.75rem, 8vw, 6.25rem) 0
    clamp(3rem, 5vw, 4rem);

  background: var(--color-navy-deep);
  color: var(--color-white);
}

/* Subtle brand accent */
.page-header::after {
  content: '';

  position: absolute;
  right: clamp(2rem, 7vw, 7rem);
  bottom: 0;

  width: 1px;
  height: clamp(55px, 8vw, 95px);

  background: var(--color-gold);
  opacity: 0.65;
}

.page-header__inner {
  position: relative;
  z-index: 1;
}

.page-header__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.7rem;

  margin-bottom: 1rem;

  color: var(--color-gold);

  font-size: 0.68rem;
  font-weight: 700;
  line-height: 1;

  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.page-header__line {
  display: block;

  width: 32px;
  height: 1px;

  flex-shrink: 0;

  background: var(--color-gold);
}

.page-header__content {
  max-width: 850px;
}

.page-header h1 {
  margin: 0;

  font-family: var(
    --font-heading,
    'Cormorant Garamond',
    Georgia,
    serif
  );

  font-size: clamp(2rem, 3.8vw, 3.25rem);
  font-weight: 700;
  line-height: 1.08;

  letter-spacing: -0.025em;
}

.page-header p {
  max-width: 680px;

  margin: 1.25rem 0 0;

  color: rgba(255, 255, 255, 0.7);

  font-size: clamp(0.95rem, 1.3vw, 1.1rem);
  font-weight: 400;
  line-height: 1.65;
}

@media (max-width: 700px) {
  .page-header {
    padding: 5rem 0 3rem;
  }

  .page-header::after {
    right: 1.5rem;
    height: 55px;
  }

  .page-header__eyebrow {
    margin-bottom: 0.9rem;
  }

  .page-header h1 {
    font-size: clamp(1.9rem, 8vw, 2.45rem);
    line-height: 1.12;
  }

  .page-header p {
    margin-top: 1rem;
    font-size: 0.95rem;
    line-height: 1.6;
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 4.5rem 0 2.75rem;
  }

  .page-header__eyebrow {
    gap: 0.6rem;

    font-size: 0.62rem;
    letter-spacing: 0.13em;
  }

  .page-header__line {
    width: 26px;
  }

  .page-header h1 {
    font-size: 1.9rem;
  }

  .page-header p {
    font-size: 0.92rem;
  }

  .page-header::after {
    display: none;
  }
}
</style>