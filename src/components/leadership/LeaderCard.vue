<template>
<<<<<<< HEAD
  <article
    :class="['leader-profile group card-hover relative overflow-hidden p-5 text-center transition-all duration-300 hover:-translate-y-1', featured ? 'leader-profile--featured' : '']"
=======
  <div
    :class="['group card overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer', featured ? 'ring-2 ring-blue-500 dark:ring-blue-400' : '']"
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
    @click="goToDetail"
    role="button"
    :aria-label="'View profile of ' + leader.full_name"
  >
<<<<<<< HEAD
    <span :class="['leader-profile__role', roleColor]">{{ leader.display_role }}</span>
    <span v-if="featured" class="leader-profile__featured" aria-label="Featured leader">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3z"/></svg>
    </span>

    <div class="leader-profile__portrait">
=======
    <!-- Photo -->
    <div class="relative h-56 bg-gradient-to-br from-navy-700 to-primary-900 overflow-hidden">
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
      <img
        v-if="leader.photo_url && !photoFailed"
        :src="leader.photo_url"
        :alt="leader.full_name"
<<<<<<< HEAD
        loading="lazy"
        @error="photoFailed = true"
      />
      <span v-else class="leader-profile__initials">{{ initials }}</span>
    </div>

    <h3 class="leader-profile__name">{{ leader.full_name }}</h3>
    <p v-if="leader.bio" class="leader-profile__bio">{{ leader.bio }}</p>
    <div class="leader-profile__actions" @click.stop>
      <a v-if="leader.email" :href="'mailto:' + leader.email" class="leader-profile__action">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path stroke-linecap="round" stroke-linejoin="round" d="m4 7 8 6 8-6"/></svg>
        Email
      </a>
      <button type="button" class="leader-profile__action" @click="$emit('inquire', leader)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-3.7-.8L4 20l1.2-3.6A7.2 7.2 0 0 1 4 12c0-4.1 3.6-7.5 8-7.5s8 3.1 8 7z"/></svg>
        Contact
      </button>
    </div>
  </article>
=======
        class="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        @error="photoFailed = true"
      />
      <div v-else class="absolute inset-0 flex items-center justify-center">
        <div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
          <span class="text-3xl font-bold text-white">{{ initials }}</span>
        </div>
      </div>
      <!-- Hover "View Profile" pill -->
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
        <span class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-navy-800 text-xs font-bold px-3 py-1.5 rounded-full shadow">
          View Profile →
        </span>
      </div>
      <!-- Bottom gradient -->
      <div class="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/70 to-transparent"></div>
      <!-- Role badge -->
      <span :class="['absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-full', roleColor]">
        {{ leader.display_role }}
      </span>
      <span v-if="featured" class="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">⭐</span>
    </div>

    <!-- Body -->
    <div class="p-5 text-center">
      <h3 class="font-heading font-bold text-navy-800 dark:text-white text-base mb-1 leading-tight group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
        {{ leader.full_name }}
      </h3>
      <p v-if="leader.bio" class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mt-2">
        {{ leader.bio }}
      </p>
      <!-- Action buttons — stop propagation so card click doesn't fire -->
      <div class="mt-4 flex justify-center gap-2 flex-wrap" @click.stop>
        <a v-if="leader.email" :href="'mailto:' + leader.email"
          class="inline-flex items-center gap-1 text-xs text-primary-600 dark:text-blue-500 hover:underline">
          ✉️ Email
        </a>
        <button @click.stop="$emit('inquire', leader)"
          class="inline-flex items-center gap-1 text-xs bg-primary-50 dark:bg-navy-700 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full hover:bg-primary-100 dark:hover:bg-navy-600 transition-colors font-medium">
          💬 Inquire
        </button>
      </div>
    </div>
  </div>
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
<<<<<<< HEAD
  leader: { type: Object, required: true },
=======
  leader:   { type: Object,  required: true },
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  featured: { type: Boolean, default: false },
})

defineEmits(['inquire'])

const router = useRouter()
const photoFailed = ref(false)
<<<<<<< HEAD
const initials = computed(() => props.leader.full_name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase())
const roleColor = computed(() => {
  const map = {
    pastor: 'leader-profile__role--pastor', elder: 'leader-profile__role--elder',
    treasurer: 'leader-profile__role--staff', secretary: 'leader-profile__role--staff',
    deacon: 'leader-profile__role--staff', deaconess: 'leader-profile__role--staff',
    head_deacon: 'leader-profile__role--staff', youth_leader: 'leader-profile__role--pastor',
    women_ministry: 'leader-profile__role--staff', other: 'leader-profile__role--staff',
  }
  return map[props.leader.role] || 'leader-profile__role--staff'
=======

const initials = computed(() =>
  props.leader.full_name
    .split(' ').slice(0, 2)
    .map(w => w[0]).join('').toUpperCase()
)

const roleColor = computed(() => {
  const map = {
    pastor:         'bg-yellow-500 !text-navy-900',
    elder:          'bg-navy-800',
    treasurer:      'bg-navy-700',
    secretary:      'bg-navy-600',
    deacon:         'bg-navy-800',
    deaconess:      'bg-navy-700',
    head_deacon:    'bg-navy-800',
    youth_leader:   'bg-yellow-600 !text-navy-900',
    women_ministry: 'bg-navy-700',
    other:          'bg-navy-600',
  }
  return map[props.leader.role] || 'bg-navy-600'
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
})

function goToDetail() {
  router.push({ name: 'LeaderDetail', params: { id: props.leader.id } })
}
</script>
<<<<<<< HEAD

<style scoped>
.leader-profile { min-height: 20rem; border-radius: 1.1rem; background: var(--color-surface); border-color: var(--color-border); cursor: pointer; }
.leader-profile--featured { border-color: rgba(201,162,39,.5); }
.leader-profile__role { position:absolute; top:.85rem; left:.85rem; padding:.35rem .65rem; border-radius:999px; font-size:.62rem; font-weight:700; letter-spacing:.03em; }
.leader-profile__role--pastor { background:rgba(201,162,39,.18); color:#725300; }
.leader-profile__role--elder { background:rgba(22,50,74,.1); color:var(--color-footer); }
.leader-profile__role--staff { background:var(--color-bg-alt); color:var(--color-text-main); }
.leader-profile__featured { position:absolute; top:.85rem; right:.85rem; display:grid; width:2rem; height:2rem; place-items:center; border:1px solid var(--color-border); border-radius:50%; background:var(--color-surface); color:#a67c00; }
.leader-profile__featured svg { width:1rem; height:1rem; }
.leader-profile__portrait { display:grid; width:9.5rem; aspect-ratio:1; place-items:center; overflow:hidden; margin:1.5rem auto 1rem; border:6px solid var(--color-bg-alt); border-radius:50%; background:linear-gradient(135deg,#e7efed,#f7ecd0); transition:border-color .2s ease,transform .3s ease; }
.leader-profile:hover .leader-profile__portrait { border-color:rgba(201,162,39,.45); transform:scale(1.025); }
.leader-profile__portrait img { width:100%; height:100%; object-fit:cover; object-position:top; }
.leader-profile__initials { color:var(--color-footer); font:700 3rem var(--font-display); }
.leader-profile__name { margin:0; color:var(--color-heading); font:700 1.05rem var(--font-display); }
.leader-profile__bio { display:-webkit-box; max-width:24rem; margin:.55rem auto 0; overflow:hidden; color:var(--color-text-muted); font-size:.77rem; line-height:1.6; -webkit-box-orient:vertical; -webkit-line-clamp:2; }
.leader-profile__actions { display:flex; justify-content:center; gap:.6rem; margin-top:1rem; }
.leader-profile__action { display:inline-flex; align-items:center; justify-content:center; gap:.4rem; min-height:2.1rem; padding:.35rem .7rem; border:1px solid var(--color-border); border-radius:999px; background:var(--color-surface); color:var(--color-text-main); font:600 .72rem var(--font-sans); text-decoration:none; cursor:pointer; transition:background .2s ease,color .2s ease,border-color .2s ease; }
.leader-profile__action svg { width:.9rem; height:.9rem; }
.leader-profile__action:hover { border-color:var(--color-gold-dark); background:rgba(201,162,39,.12); color:var(--color-footer); }
:global(.dark) .leader-profile__role--pastor { color:#f3d97a; }
:global(.dark) .leader-profile__role--elder { color:#e5edf2; background:rgba(255,255,255,.1); }
:global(.dark) .leader-profile__initials { color:#f2f6f8; }
:global(.dark) .leader-profile__portrait { border-color:#2b4657; }
:global(.dark) .leader-profile__featured { color:#f4d03f; }
</style>
=======
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
