<template>
  <div class="bg-navy-900 rounded-2xl p-5 text-white">
    <div class="flex items-center gap-4 mb-4">
      <div class="w-14 h-14 bg-primary-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
        <span class="text-2xl">🎵</span>
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-white truncate">{{ title }}</p>
        <p class="text-sm text-gray-400">{{ speaker }}</p>
      </div>
    </div>
    <!-- Progress -->
    <div class="mb-4">
      <input type="range" min="0" :max="duration" :value="currentTime"
        @input="seek" class="w-full h-1.5 accent-gold-500 cursor-pointer audio-progress" />
      <div class="flex justify-between text-xs text-gray-400 mt-1">
        <span>{{ formatTime(currentTime) }}</span>
        <span>{{ formatTime(duration) }}</span>
      </div>
    </div>
    <!-- Controls -->
    <div class="flex items-center justify-center gap-4">
      <button @click="skip(-15)" class="text-gray-400 hover:text-white transition-colors text-xs">-15s</button>
      <button @click="togglePlay" class="w-12 h-12 bg-gold-500 hover:bg-gold-400 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-lg">
        <span class="text-xl">{{ isPlaying ? '⏸' : '▶' }}</span>
      </button>
      <button @click="skip(15)" class="text-gray-400 hover:text-white transition-colors text-xs">+15s</button>
    </div>
    <p class="text-center text-xs text-gray-500 mt-3">{{ audioUrl ? 'Audio available' : 'Demo player — connect audio source' }}</p>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({ title: String, speaker: String, audioUrl: String })
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(3134) // demo

const togglePlay = () => { isPlaying.value = !isPlaying.value }
const seek = (e) => { currentTime.value = Number(e.target.value) }
const skip = (s) => { currentTime.value = Math.max(0, Math.min(currentTime.value + s, duration.value)) }
const formatTime = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
</script>
