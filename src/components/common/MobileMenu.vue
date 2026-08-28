<template>
  <Transition name="mobile-menu">
    <div v-if="open" class="mobile-menu" role="dialog" aria-modal="true" aria-label="Website navigation">
      <nav aria-label="Mobile navigation">
        <RouterLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="mobile-menu__link"
          @click="close"
        >
          {{ item.label }}
        </RouterLink>

        <div class="mobile-menu__group">Give</div>
        <RouterLink to="/give" class="button button--primary mobile-menu__cta" @click="close">
          Support the ministry
        </RouterLink>
      </nav>
    </div>
  </Transition>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { mobileNavigation } from '@/constants/navigation'

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>
