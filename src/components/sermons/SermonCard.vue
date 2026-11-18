<template>
  <article
    class="sermon-card"
    @click="$emit('play', sermon)"
  >
    <!-- Media -->
    <div class="sermon-card__media">
      <img
        v-if="sermon.thumbnail_url || sermon.thumbnail"
        :src="sermon.thumbnail_url || sermon.thumbnail"
        :alt="sermon.title"
      />

      <div
        v-else
        class="sermon-card__placeholder"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.4"
        >
          <rect
            x="9"
            y="3"
            width="6"
            height="12"
            rx="3"
          />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8" />
        </svg>
      </div>

      <span
        v-if="sermon.is_featured || sermon.featured"
        class="sermon-card__status"
      >
        Featured
      </span>

      <span
        v-if="sermon.duration_display || sermon.duration"
        class="sermon-card__duration"
      >
        {{ sermon.duration_display || sermon.duration }}
      </span>

      <span
        class="sermon-card__play"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </div>

    <!-- Content -->
    <div class="sermon-card__content">
      <span class="sermon-card__category">
        {{
          sermon.category_display ||
          sermon.topic ||
          (
            sermon.category &&
            typeof sermon.category === 'object'
              ? sermon.category.name
              : sermon.category
          ) ||
          'General'
        }}
      </span>

      <h3>
        {{ sermon.title }}
      </h3>

      <p class="sermon-card__speaker">
        {{ resolvedSpeaker }}
      </p>

      <p
        v-if="
          sermon.scripture_reference ||
          sermon.scripture
        "
        class="sermon-card__scripture"
      >
        {{
          sermon.scripture_reference ||
          sermon.scripture
        }}
      </p>

      <p class="sermon-card__date">
        {{
          formatDate(
            sermon.sermon_date ||
            sermon.preach_date ||
            sermon.date
          )
        }}
      </p>

      <div class="sermon-card__footer">
        <span class="sermon-card__views">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
            />
            <circle
              cx="12"
              cy="12"
              r="2.5"
            />
          </svg>

          {{
            Number(
              sermon.views ||
              sermon.views_count ||
              0
            ).toLocaleString()
          }}
        </span>

        <div class="sermon-card__actions">
          <button
            type="button"
            class="sermon-card__listen"
            @click.stop="$emit('play', sermon)"
          >
            Listen
          </button>

          <RouterLink
            :to="`/sermons/${sermon.id}`"
            class="sermon-card__details"
            @click.stop
          >
            Details
          </RouterLink>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  sermon: {
    type: Object,
    required: true
  }
})

defineEmits(['play'])

const resolvedSpeaker = computed(() => {
  const speaker = props.sermon.speaker

  if (!speaker) {
    return ''
  }

  if (typeof speaker === 'object') {
    return (
      speaker.full_name ||
      `${speaker.first_name || ''} ${speaker.last_name || ''}`.trim()
    )
  }

  return speaker
})

function formatDate(date) {
  if (!date) {
    return ''
  }

  const parsedDate = new Date(
    `${date}T00:00:00`
  )

  if (Number.isNaN(parsedDate.getTime())) {
    return ''
  }

  return parsedDate.toLocaleDateString(
    'en-GB',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  )
}
</script>

<style scoped>
.sermon-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
<<<<<<< HEAD
  background: var(--color-surface, #ffffff);
=======
  background: var(--color-white, #ffffff);
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  border: 1px solid var(
    --color-border,
    rgba(13, 33, 55, 0.1)
  );
  cursor: pointer;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

.sermon-card:hover {
  transform: translateY(-4px);
  border-color: rgba(201, 162, 39, 0.45);
  box-shadow:
    0 16px 38px rgba(13, 33, 55, 0.1);
}

.sermon-card__media {
  position: relative;
  height: 220px;
  overflow: hidden;
  background:
<<<<<<< HEAD
    linear-gradient(135deg, #f4f8fb, #dde8ef);
=======
    linear-gradient(
      135deg,
      var(--color-navy, #15324e),
      var(--color-navy-deep, #0d2137)
    );
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
}

.sermon-card__media > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    transform 0.45s ease,
    filter 0.45s ease;
}

.sermon-card:hover .sermon-card__media > img {
  transform: scale(1.045);
  filter: brightness(0.86);
}

.sermon-card__media::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      180deg,
      rgba(13, 33, 55, 0.03),
      rgba(13, 33, 55, 0.45)
    );
  pointer-events: none;
}

.sermon-card__placeholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
<<<<<<< HEAD
  color: var(--color-text-faint);
=======
  color: rgba(255, 255, 255, 0.17);
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
}

.sermon-card__placeholder svg {
  width: 70px;
  height: 70px;
}

.sermon-card__status {
  position: absolute;
  top: 0.9rem;
  left: 0.9rem;
  z-index: 2;
  padding: 0.38rem 0.62rem;
  background: var(--color-gold, #c9a227);
<<<<<<< HEAD
  color: var(--color-navy-deep, #16324a);
=======
  color: var(--color-navy-deep, #0d2137);
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  font-size: 0.63rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.sermon-card__duration {
  position: absolute;
  right: 0.9rem;
  bottom: 0.9rem;
  z-index: 2;
  padding: 0.34rem 0.58rem;
<<<<<<< HEAD
  background: rgba(255, 255, 255, 0.92);
  color: var(--color-heading);
=======
  background: rgba(13, 33, 55, 0.88);
  color: #ffffff;
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  font-size: 0.67rem;
  font-weight: 600;
}

.sermon-card__play {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 3;
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  transform:
    translate(-50%, -50%)
    scale(0.82);
  opacity: 0;
  border-radius: 50%;
  background: var(--color-gold, #c9a227);
<<<<<<< HEAD
  color: var(--color-navy-deep, #16324a);
=======
  color: var(--color-navy-deep, #0d2137);
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.sermon-card__play svg {
  width: 18px;
  height: 18px;
  margin-left: 2px;
}

.sermon-card:hover .sermon-card__play {
  opacity: 1;
  transform:
    translate(-50%, -50%)
    scale(1);
}

.sermon-card__content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.3rem;
}

.sermon-card__category {
  display: inline-block;
  width: fit-content;
  margin-bottom: 0.75rem;
  color: var(
    --color-gold-dark,
    #a67c00
  );
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.sermon-card h3 {
  margin: 0;
<<<<<<< HEAD
  color: var(--color-heading);
=======
  color: var(
    --color-navy-deep,
    #0d2137
  );
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.45;

  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.sermon-card__speaker {
  margin: 0.75rem 0 0;
  color: var(
    --color-text-muted,
    rgba(13, 33, 55, 0.62)
  );
  font-size: 0.8rem;
}

.sermon-card__scripture {
  margin: 0.45rem 0 0;
  color: var(
    --color-gold-dark,
    #a67c00
  );
  font-size: 0.76rem;
  font-style: italic;
  line-height: 1.5;
}

.sermon-card__date {
  margin: 0.55rem 0 1.1rem;
<<<<<<< HEAD
  color: var(--color-text-faint);
=======
  color: rgba(13, 33, 55, 0.45);
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  font-size: 0.7rem;
}

.sermon-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(
    --color-border,
    rgba(13, 33, 55, 0.1)
  );
}

.sermon-card__views {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
<<<<<<< HEAD
  color: var(--color-text-faint);
=======
  color: rgba(13, 33, 55, 0.45);
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  font-size: 0.7rem;
}

.sermon-card__views svg {
  width: 15px;
  height: 15px;
}

.sermon-card__actions {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.sermon-card__listen,
.sermon-card__details {
  min-height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.72rem;
  border: 1px solid transparent;
  font-family: inherit;
  font-size: 0.68rem;
  font-weight: 700;
  text-decoration: none;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.sermon-card__listen {
  background: var(
    --color-navy-deep,
<<<<<<< HEAD
    #16324a
=======
    #0d2137
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  );
  color: #ffffff;
  cursor: pointer;
}

.sermon-card__listen:hover {
  background: var(
    --color-gold,
    #c9a227
  );
  color: var(
    --color-navy-deep,
<<<<<<< HEAD
    #16324a
=======
    #0d2137
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  );
}

.sermon-card__details {
  border-color: var(
    --color-border,
    rgba(13, 33, 55, 0.1)
  );
<<<<<<< HEAD
  color: var(--color-heading);
=======
  color: var(
    --color-navy-deep,
    #0d2137
  );
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
}

.sermon-card__details:hover {
  border-color: var(
    --color-gold,
    #c9a227
  );
  color: var(
    --color-gold-dark,
    #a67c00
  );
}

@media (max-width: 600px) {
  .sermon-card__media {
    height: 230px;
  }

  .sermon-card__footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .sermon-card__actions {
    width: 100%;
  }

  .sermon-card__listen,
  .sermon-card__details {
    flex: 1;
  }
}
</style>