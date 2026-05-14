<template>
  <div class="p-8">
    <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white mb-1">Reset Password</h2>
    <p class="text-sm text-gray-500 mb-7">Enter your email and we'll send a reset link.</p>
    <form v-if="!sent" @submit.prevent="submit" class="space-y-4">
      <div><label class="label">Email Address</label><input v-model="email" type="email" class="input" required /></div>
      <button type="submit" :disabled="loading" class="btn-primary w-full btn-lg">{{ loading ? 'Sending...' : 'Send Reset Link' }}</button>
    </form>
    <div v-else class="text-center py-4">
      <div class="text-4xl mb-3">✉️</div>
      <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">Check your email for a password reset link.</p>
      <RouterLink to="/auth/login" class="btn-outline btn-sm">Back to Login</RouterLink>
    </div>
    <p class="text-center text-sm text-gray-500 mt-5"><RouterLink to="/auth/login" class="text-primary-600 dark:text-gold-400 hover:underline">← Back to Login</RouterLink></p>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const email = ref(''); const loading = ref(false); const sent = ref(false)
async function submit() { loading.value = true; await new Promise(r => setTimeout(r, 1200)); loading.value = false; sent.value = true }
</script>
