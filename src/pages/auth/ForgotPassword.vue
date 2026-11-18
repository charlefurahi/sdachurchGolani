<template>
  <div class="p-6 sm:p-8 flex flex-col items-center">
    <!-- Page header -->
    <div class="w-full text-center mb-7">
      <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white mb-1">Reset your password</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Enter your email and we'll send a reset link.</p>
    </div>

    <form v-if="!sent" @submit.prevent="submit" class="space-y-4 w-full">
      <div>
        <label class="label">Email Address</label>
        <input
          v-model="email"
          type="email"
          class="input"
          placeholder="you@example.com"
          required
          autocomplete="email"
          :disabled="loading"
        />
      </div>

      <div v-if="error" class="flex items-start gap-2 rounded-xl bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800">
        <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>{{ error }}</span>
      </div>

      <button type="submit" :disabled="loading" class="btn-primary w-full btn-lg">
        <span v-if="loading" class="flex items-center justify-center gap-2">
          <span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
          Sending…
        </span>
        <span v-else>Send Reset Link</span>
      </button>
    </form>

    <!-- Success state -->
    <div v-else class="text-center py-4 w-full">
      <div class="w-16 h-16 bg-yellow-100 dark:bg-yellow-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-yellow-700 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      </div>
      <h3 class="font-semibold text-navy-800 dark:text-white mb-2">Check your email</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-5">
        We sent a password reset link to <strong class="text-gray-700 dark:text-gray-300">{{ email }}</strong>
      </p>
      <RouterLink to="/auth/login" class="btn-primary btn-sm">Back to Login</RouterLink>
    </div>

    <p class="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
      Remember your password?
      <RouterLink to="/auth/login" class="text-primary-600 dark:text-blue-500 font-semibold hover:underline">Sign In</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const email   = ref('')
const loading = ref(false)
const sent    = ref(false)
const error   = ref('')

async function submit() {
  loading.value = true
  error.value = ''
  const result = await authStore.forgotPassword({ email: email.value.toLowerCase().trim() })
  loading.value = false
  if (result.success) {
    sent.value = true
  } else {
    error.value = result.error || 'Failed to send reset link. Please try again.'
  }
}
</script>
