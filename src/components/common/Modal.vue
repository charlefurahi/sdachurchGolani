<template>
  <Teleport to="body">
    <Transition name="scale">
      <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4">

        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-navy-900/70 backdrop-blur-sm"
          @click="$emit('update:modelValue', false)"
        />

        <!-- Panel -->
        <div :class="['relative bg-white dark:bg-navy-800 rounded-3xl shadow-2xl w-full overflow-hidden border border-gray-100 dark:border-navy-700', sizeClass]">

          <!-- Header -->
          <div class="relative flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-navy-700">
            <!-- Gold left accent -->
            <span class="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-gradient-to-b from-gold-400 to-gold-600" />

            <h3 class="font-heading text-xl font-semibold text-navy-900 dark:text-white pl-3">
              {{ title }}
            </h3>

            <button
              @click="$emit('update:modelValue', false)"
              class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-navy-700 text-gray-400 dark:text-gray-500 hover:text-navy-700 dark:hover:text-white transition-all duration-200 hover:rotate-90"
              aria-label="Close modal"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 overflow-y-auto max-h-[80vh]">
            <slot />
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  title:      { type: String, default: '' },
  size:       { type: String, default: 'md' }
})

defineEmits(['update:modelValue'])

const sizeClass = computed(() => (
  { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl', xl: 'max-w-6xl' }[props.size] || 'max-w-2xl'
))
</script>