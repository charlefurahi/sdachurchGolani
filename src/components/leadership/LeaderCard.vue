<template>
  <div
    :class="['group card overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer', featured ? 'ring-2 ring-blue-500 dark:ring-blue-400' : '']"
    @click="goToDetail"
    role="button"
    :aria-label="'View profile of ' + leader.full_name"
  >
    <!-- Photo -->
    <div class="relative h-56 bg-gradient-to-br from-navy-700 to-primary-900 overflow-hidden">
      <img
        v-if="leader.photo_url && !photoFailed"
        :src="leader.photo_url"
        :alt="leader.full_name"
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
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  leader:   { type: Object,  required: true },
  featured: { type: Boolean, default: false },
})

defineEmits(['inquire'])

const router = useRouter()
const photoFailed = ref(false)

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
})

function goToDetail() {
  router.push({ name: 'LeaderDetail', params: { id: props.leader.id } })
}
</script>
