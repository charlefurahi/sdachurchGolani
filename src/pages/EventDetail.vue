<template>
  <div class="pt-24 pb-16">
    <div class="container-custom">
      <Breadcrumbs :crumbs="[{ to: '/events', label: 'Events' }, { label: event?.title || 'Event' }]" />
      <div v-if="event" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="h-64 bg-gradient-to-br from-primary-600 to-navy-900 rounded-2xl flex items-center justify-center mb-6">
            <div class="text-center text-white/30 text-8xl">📅</div>
          </div>
          <span class="badge-primary mb-3 inline-block">{{ event.category }}</span>
          <h1 class="font-heading text-3xl md:text-4xl font-bold text-navy-800 dark:text-white mb-4">{{ event.title }}</h1>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{{ event.description }}</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in event.tags" :key="tag" class="badge-primary text-xs">#{{ tag }}</span>
          </div>
        </div>
        <div class="space-y-4">
          <div class="card p-5">
            <h3 class="font-semibold text-navy-800 dark:text-white mb-4">Event Details</h3>
            <div class="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <div class="flex gap-3"><span>📅</span><div><p class="font-medium text-navy-800 dark:text-white">Date</p><p>{{ formatDate(event.date) }}</p></div></div>
              <div class="flex gap-3"><span>🕐</span><div><p class="font-medium text-navy-800 dark:text-white">Time</p><p>{{ event.time }}</p></div></div>
              <div class="flex gap-3"><span>📍</span><div><p class="font-medium text-navy-800 dark:text-white">Location</p><p>{{ event.location }}</p></div></div>
              <div class="flex gap-3"><span>👤</span><div><p class="font-medium text-navy-800 dark:text-white">Organizer</p><p>{{ event.organizer }}</p></div></div>
            </div>
            <button @click="showRSVP = true" class="btn-gold w-full mt-5">Register / RSVP</button>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="showRSVP" title="Register for Event" size="md">
      <form @submit.prevent="submit" class="space-y-4">
        <div><label class="label">Full Name *</label><input v-model="form.name" class="input" required /></div>
        <div><label class="label">Phone *</label><input v-model="form.phone" type="tel" class="input" required /></div>
        <div><label class="label">Email</label><input v-model="form.email" type="email" class="input" /></div>
        <button type="submit" class="btn-primary w-full">{{ done ? 'Registered! God Bless 🙏' : 'Confirm' }}</button>
      </form>
    </Modal>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { events } from '@/data/index.js'
import { formatDate } from '@/utils/index.js'
import Breadcrumbs from '@/components/common/Breadcrumbs.vue'
import Modal from '@/components/common/Modal.vue'
const route = useRoute()
const event = computed(() => events.find(e => e.id === Number(route.params.id)))
const showRSVP = ref(false)
const done = ref(false)
const form = ref({ name: '', phone: '', email: '' })
function submit() { done.value = true; setTimeout(() => { showRSVP.value = false; done.value = false }, 2000) }
</script>
