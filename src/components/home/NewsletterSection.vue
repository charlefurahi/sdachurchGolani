<template>
  <section class="section-sm relative overflow-hidden" style="background: var(--gradient-page-hero)">
    <div class="absolute inset-0 bg-hero-pattern opacity-15"></div>
    <div class="container-custom relative">
      <div class="max-w-2xl mx-auto text-center">
<<<<<<< HEAD
        <p class="section-tag !text-gold-400 mb-3">Stay Updated</p>
        <h2 class="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Join Our Weekly Newsletter</h2>
        <p class="text-white/70 mb-8">Receive sermon summaries, upcoming events, prayer requests, and church news delivered to your inbox every week.</p>
        <form @submit.prevent="subscribe" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input v-model="email" type="email" placeholder="Enter your email address" required
            class="flex-1 px-5 py-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-gold-400 transition-colors" />
          <button type="submit" :disabled="loading"
            class="px-6 py-3.5 bg-white text-navy-800 font-semibold rounded-xl transition-all duration-200 disabled:opacity-60 flex-shrink-0 hover:bg-navy-50">
            {{ loading ? 'Subscribing...' : 'Subscribe' }}
          </button>
        </form>
        <p v-if="success" class="text-white/70 mt-4 text-sm">You're subscribed! God bless you. 🙏</p>
        <p class="text-gold-400 text-xs mt-4">No spam. Unsubscribe anytime. We respect your privacy.</p>
=======
        <p class="section-tag !text-blue-300 mb-3">Stay Updated</p>
        <h2 class="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Join Our Weekly Newsletter</h2>
        <p class="text-blue-200 mb-8">Receive sermon summaries, upcoming events, prayer requests, and church news delivered to your inbox every week.</p>
        <form @submit.prevent="subscribe" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input v-model="email" type="email" placeholder="Enter your email address" required
            class="flex-1 px-5 py-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:border-blue-300 transition-colors" />
          <button type="submit" :disabled="loading"
            class="px-6 py-3.5 bg-white text-blue-900 font-semibold rounded-xl transition-all duration-200 disabled:opacity-60 flex-shrink-0 hover:bg-blue-50">
            {{ loading ? 'Subscribing...' : 'Subscribe' }}
          </button>
        </form>
        <p v-if="success" class="text-blue-200 mt-4 text-sm">You're subscribed! God bless you. 🙏</p>
        <p class="text-blue-300 text-xs mt-4">No spam. Unsubscribe anytime. We respect your privacy.</p>
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from 'vue'
const email = ref('')
const loading = ref(false)
const success = ref(false)
async function subscribe() {
  loading.value = true
  await new Promise(r => setTimeout(r, 1000))
  success.value = true
  email.value = ''
  loading.value = false
  setTimeout(() => success.value = false, 5000)
}
</script>
