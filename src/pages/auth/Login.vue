<template>
  <div class="p-6 sm:p-8 flex flex-col items-center">
    <!-- Page header -->
    <div class="w-full text-center mb-7">
      <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white mb-1">Welcome back</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Sign in to stay connected with your church family.</p>
    </div>

    <form @submit.prevent="handleLogin" class="space-y-5 w-full">
      <div>
        <label class="label">Email Address</label>
        <input
          v-model="form.email"
          type="email"
          class="input"
          placeholder="you@example.com"
          required
          autocomplete="email"
          :disabled="loading"
        />
      </div>

      <div>
        <div class="flex justify-between mb-1.5">
          <label class="label mb-0">Password</label>
          <RouterLink to="/auth/forgot-password" class="text-xs text-primary-600 dark:text-blue-400 hover:underline">
            Forgot password?
          </RouterLink>
        </div>
        <div class="relative">
          <input
            v-model="form.password"
            :type="showPw ? 'text' : 'password'"
            class="input pr-11"
            placeholder="••••••••"
            required
            autocomplete="current-password"
            :disabled="loading"
          />
          <button
            type="button"
            @click="showPw = !showPw"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            :aria-label="showPw ? 'Hide password' : 'Show password'"
          >
            <svg v-if="showPw" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </button>
        </div>
      </div>

      <div v-if="error" class="flex items-start gap-2 rounded-xl bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800">
        <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>{{ error }}</span>
      </div>

      <div v-if="successMsg" class="flex items-center gap-2 rounded-xl bg-yellow-50 dark:bg-yellow-500/10 px-4 py-3 text-sm text-yellow-800 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-600/40">
        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span>{{ successMsg }}</span>
      </div>

      <button type="submit" :disabled="loading" class="btn-primary w-full btn-lg mt-2">
        <span v-if="loading" class="flex items-center justify-center gap-2">
          <span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
          Signing in…
        </span>
        <span v-else>Sign In</span>
      </button>
    </form>

    <!-- Divider -->
    <div class="relative my-6 w-full">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200 dark:border-navy-700"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="bg-white dark:bg-navy-900 px-3 text-xs text-gray-400 dark:text-gray-500">or continue with</span>
      </div>
    </div>

    <!-- Google Sign In -->
    <button
      type="button"
      @click="handleGoogleLogin"
      :disabled="googleLoading"
      class="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-50 dark:hover:bg-navy-700 hover:border-gray-300 dark:hover:border-navy-600 transition-all duration-200 shadow-sm"
    >
      <span v-if="googleLoading" class="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-primary-500"></span>
      <svg v-else class="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      <span>{{ googleLoading ? 'Redirecting…' : 'Continue with Google' }}</span>
    </button>

    <p class="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
      Don't have an account?
      <RouterLink to="/auth/register" class="font-semibold text-primary-600 dark:text-blue-400 hover:underline">Create one</RouterLink>
    </p>

  </div>
</template>

<script setup>
import { API_ORIGIN } from '@/services/api'
import { ref } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router    = useRouter()
const route     = useRoute()
const authStore = useAuthStore()

const form        = ref({ email: '', password: '' })
const showPw      = ref(false)
const loading     = ref(false)
const googleLoading = ref(false)
const error       = ref('')
const successMsg  = ref('')

if (route.query.registered) {
  successMsg.value = 'Account created successfully! Please sign in.'
}

async function handleLogin() {
  loading.value    = true
  error.value      = ''
  successMsg.value = ''

  const result = await authStore.login({
    email:    form.value.email.toLowerCase().trim(),
    password: form.value.password,
  })

  loading.value = false

  if (result?.success) {
    const dest = authStore.isAdmin
      ? '/admin/dashboard'
      : (typeof route.query.redirect === 'string' ? route.query.redirect : '/dashboard')
    router.push(dest)
  } else {
    error.value = result?.error || 'Invalid email or password. Please try again.'
  }
}

async function handleGoogleLogin() {
  googleLoading.value = true
  error.value = ''
  try {
    // Django social-auth is hosted with the backend, not the Vercel frontend.
    window.location.href = `${API_ORIGIN}/social-auth/login/google-oauth2/`
  } catch {
    googleLoading.value = false
    error.value = 'Google sign-in is not available right now. Please use email and password.'
  }
}
</script>
