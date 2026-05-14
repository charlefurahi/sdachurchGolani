<template>
  <div class="relative">
    <div class="overflow-hidden rounded-2xl">
      <Transition name="fade" mode="out-in">
        <div :key="current" class="bg-white dark:bg-navy-800 p-8 md:p-10 rounded-2xl shadow-lg">
          <div class="flex gap-1 mb-6">
            <span v-for="n in 5" :key="n" class="text-gold-400 text-lg">★</span>
          </div>
          <blockquote class="font-heading text-xl md:text-2xl text-navy-800 dark:text-white italic leading-relaxed mb-8">
            "{{ testimonials[current].text }}"
          </blockquote>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-heading font-bold text-lg">
              {{ testimonials[current].name.charAt(0) }}
            </div>
            <div>
              <p class="font-semibold text-navy-800 dark:text-white">{{ testimonials[current].name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ testimonials[current].role }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </div>
    <div class="flex items-center justify-center gap-3 mt-6">
      <button @click="prev" class="btn-ghost p-2 rounded-xl">←</button>
      <div class="flex gap-2">
        <button v-for="(_, i) in testimonials" :key="i" @click="current = i"
          :class="['w-2 h-2 rounded-full transition-all', i === current ? 'w-6 bg-gold-500' : 'bg-gray-300 dark:bg-navy-600']" />
      </div>
      <button @click="next" class="btn-ghost p-2 rounded-xl">→</button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { testimonials } from '@/data/index'
const current = ref(0)
let timer = null
const next = () => { current.value = (current.value + 1) % testimonials.length }
const prev = () => { current.value = (current.value - 1 + testimonials.length) % testimonials.length }
onMounted(() => { timer = setInterval(next, 7000) })
onUnmounted(() => clearInterval(timer))
</script>
