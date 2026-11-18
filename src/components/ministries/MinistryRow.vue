<template>
  <article class="ministry-item">

    <div class="ministry-item__media">

      <img
        v-if="leaderPhoto"
        :src="leaderPhoto"
        :alt="
          leaderName
            ? `${leaderName}, leader of ${ministry.name}`
            : ministry.name
        "
        loading="lazy"
      />

      <div
        v-else
        class="ministry-item__placeholder"
      >
        <span>
          {{ initials(ministry.name) }}
        </span>
      </div>

    </div>


    <div class="ministry-item__content">

      <p class="ministry-item__category">
        {{ categoryTitle }}
      </p>

      <h3>
        {{ ministry.name }}
      </h3>

      <p class="ministry-item__description">
        {{ ministry.description }}
      </p>

      <RouterLink
        :to="`/ministries/${ministry.slug}`"
        class="ministry-item__button"
      >
        <span>Discover More</span>

        <span
          class="ministry-item__button-arrow"
          aria-hidden="true"
        >
          →
        </span>
      </RouterLink>

    </div>

  </article>
</template>


<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'


const props = defineProps({
  ministry: {
    type: Object,
    required: true,
  },

  leader: {
    type: Object,
    default: null,
  },

  categoryTitle: {
    type: String,
    default: '',
  },
})


const leaderName = computed(() => {

  if (!props.leader) return ''

  return (
    props.leader.name ||
    props.leader.full_name ||
    props.leader.fullName ||
    ''
  )
})


const leaderPhoto = computed(() => {

  if (!props.leader) return ''

  return (
    props.leader.photo_url ||
    props.leader.photoUrl ||
    props.leader.photo ||
    props.leader.image ||
    ''
  )
})


function initials(name = '') {

  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}
</script>


<style scoped>

.ministry-item {
  display: grid;

  grid-template-columns:
    170px minmax(0, 1fr);

  min-height: 195px;

  overflow: hidden;

  background: var(--color-surface);

  border: 1px solid var(--color-border);

  box-shadow: none;

  transition:
    transform var(--duration-standard) var(--ease-standard),
    box-shadow var(--duration-standard) var(--ease-standard),
    border-color var(--duration-fast) var(--ease-standard);
}

.ministry-item:hover {
  transform: translateY(-3px);

  border-color: var(--color-border-strong);

  box-shadow: var(--shadow-soft);
}


/* =========================================
   IMAGE
========================================= */

.ministry-item__media {
  position: relative;

  min-height: 195px;

  overflow: hidden;

<<<<<<< HEAD
  background: var(--color-bg-alt);
=======
  background: var(--color-navy);
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
}

.ministry-item__media img,
.ministry-item__placeholder {
  width: 100%;
  height: 100%;

  min-height: 195px;

  object-fit: cover;
}

.ministry-item__media img {
  display: block;

  transition:
    transform 500ms var(--ease-standard);
}

.ministry-item:hover .ministry-item__media img {
  transform: scale(1.04);
}


/* =========================================
   PLACEHOLDER
========================================= */

.ministry-item__placeholder {
  display: flex;

  align-items: center;
  justify-content: center;

  background: var(--gradient-card-dark);
}

.ministry-item__placeholder span {
  color: var(--color-white);

  font-size: 1.9rem;

  font-weight: 700;

  letter-spacing: 0.03em;

  opacity: 0.92;
}


/* =========================================
   CONTENT
========================================= */

.ministry-item__content {
  display: flex;

  flex-direction: column;

  align-items: flex-start;

  padding: 1.25rem;
}

.ministry-item__category {
  margin: 0 0 0.4rem;

  color: var(--color-gold-dark);

  font-size: 0.6rem;

  font-weight: 700;

  letter-spacing: 0.12em;

  text-transform: uppercase;
}

.ministry-item h3 {
  margin: 0;

  color: var(--color-text-main);

  font-size: 1rem;

  font-weight: 700;

  line-height: 1.2;

  letter-spacing: -0.015em;

  text-transform: uppercase;
}

.ministry-item__description {
  display: -webkit-box;

  margin: 0.7rem 0 0;

  color: var(--color-text-muted);

  font-size: 0.74rem;

  line-height: 1.65;

  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;

  overflow: hidden;
}


/* =========================================
   BUTTON
========================================= */

.ministry-item__button {
  display: inline-flex;

  align-items: center;

  gap: 0.45rem;

  min-height: 34px;

  margin-top: auto;

  padding: 0.55rem 0.85rem;

  background: var(--color-navy-05);

  color: var(--color-text-main);

  border: 1px solid var(--color-border);

  border-radius: var(--radius-sm);

  font-size: 0.64rem;

  font-weight: 600;

  text-decoration: none;

  transition:
    background-color var(--duration-fast) var(--ease-standard),
    color var(--duration-fast) var(--ease-standard),
    border-color var(--duration-fast) var(--ease-standard);
}

.ministry-item__button-arrow {
  display: inline-block;

  transition:
    transform var(--duration-fast) var(--ease-standard);
}

.ministry-item__button:hover {
  background: var(--color-navy-deep);

  border-color: var(--color-navy-deep);

  color: var(--color-white);
}

.ministry-item__button:hover
.ministry-item__button-arrow {
  transform: translateX(3px);
}


/* =========================================
   TABLET
========================================= */

@media (max-width: 900px) {

  .ministry-item {
    grid-template-columns:
      145px minmax(0, 1fr);
  }

  .ministry-item,
  .ministry-item__media,
  .ministry-item__media img,
  .ministry-item__placeholder {
    min-height: 180px;
  }

}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 560px) {

  .ministry-item {
    grid-template-columns:
      120px minmax(0, 1fr);

    min-height: 170px;
  }

  .ministry-item__media,
  .ministry-item__media img,
  .ministry-item__placeholder {
    min-height: 170px;
  }

  .ministry-item__content {
    padding: 1rem;
  }

  .ministry-item h3 {
    font-size: 0.88rem;
  }

  .ministry-item__placeholder span {
    font-size: 1.4rem;
  }

  .ministry-item__description {
    font-size: 0.68rem;

    -webkit-line-clamp: 3;
  }

  .ministry-item__button {
    min-height: 30px;

    padding: 0.45rem 0.7rem;

    font-size: 0.58rem;
  }

}

</style>