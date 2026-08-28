<template>
  <div class="bg-white dark:bg-navy-800 border border-gray-100 dark:border-navy-700 rounded-2xl p-5">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-4">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-700 to-navy-900 flex items-center justify-center text-xl flex-shrink-0 shadow-md">🎵</div>
      <div class="flex-1 min-w-0">
        <p class="font-bold text-navy-800 dark:text-white text-sm leading-tight truncate">{{ title || 'Now Playing' }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ speaker || '' }}</p>
      </div>
    </div>

    <!-- Native audio (when URL present) -->
    <audio
      v-if="audioUrl"
      ref="audioEl"
      :src="audioUrl"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onMeta"
      class="hidden"
    ></audio>

    <!-- Progress bar -->
    <div class="mb-4">
      <input
        type="range" min="0" :max="dur" :value="cur"
        @input="seek"
        class="w-full h-1.5 rounded-full accent-gold-500 cursor-pointer block mb-2"
      />
      <div class="flex justify-between text-xs text-gray-400 dark:text-gray-500">
        <span>{{ fmt(cur) }}</span>
        <span>{{ fmt(dur) }}</span>
      </div>
    </div>

    <!-- Controls -->
    <div class="flex items-center justify-center gap-5 mb-3">
      <button @click="skip(-15)" class="text-gray-400 dark:text-gray-500 hover:text-navy-700 dark:hover:text-white text-xs font-semibold transition-colors">-15s</button>
      <button @click="toggle"
        class="w-12 h-12 rounded-full bg-navy-800 dark:bg-primary-700 text-white hover:bg-blue-700 hover:text-navy-900 dark:hover:bg-blue-700 dark:hover:text-navy-900 flex items-center justify-center text-xl shadow-md transition-colors">
        {{ playing ? '⏸' : '▶' }}
      </button>
      <button @click="skip(15)" class="text-gray-400 dark:text-gray-500 hover:text-navy-700 dark:hover:text-white text-xs font-semibold transition-colors">+15s</button>
    </div>

    <p class="text-center text-xs text-gray-400 dark:text-gray-500">
      {{ audioUrl ? '🎵 Audio ready' : 'Demo player — connect audio source' }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({ title: String, speaker: String, audioUrl: String })

const audioEl = ref(null)
const playing  = ref(false)
const cur      = ref(0)
const dur      = ref(0)

function toggle() {
  if (!audioEl.value) { playing.value = !playing.value; return }
  playing.value ? audioEl.value.pause() : audioEl.value.play()
  playing.value = !playing.value
}
function seek(e) {
  cur.value = Number(e.target.value)
  if (audioEl.value) audioEl.value.currentTime = cur.value
}
function skip(s) {
  cur.value = Math.max(0, Math.min(cur.value + s, dur.value))
  if (audioEl.value) audioEl.value.currentTime = cur.value
}
function onTimeUpdate() { if (audioEl.value) cur.value = audioEl.value.currentTime }
function onMeta()       { if (audioEl.value) dur.value = audioEl.value.duration }
const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
</script>
