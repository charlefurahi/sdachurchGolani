<template>
  <div class="p-8 flex flex-col items-center">
    <!-- Page header -->
    <div class="w-full text-center mb-7">
      <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white mb-1">Register Page</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Join the GolaniSDA digital community</p>
    </div>

    <form @submit.prevent="submit" class="space-y-4 w-full">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="label">First Name</label>
          <input v-model="form.first_name" class="input" placeholder="John" required autocomplete="given-name" :disabled="loading" />
        </div>
        <div>
          <label class="label">Last Name</label>
          <input v-model="form.last_name" class="input" placeholder="Doe" required autocomplete="family-name" :disabled="loading" />
        </div>
      </div>
      <div>
        <label class="label">Email Address</label>
        <input v-model="form.email" type="email" class="input" placeholder="you@example.com" required autocomplete="email" :disabled="loading" />
      </div>
      <div>
        <label class="label">Phone <span class="text-gray-400 font-normal">(optional)</span></label>
        <input v-model="form.phone" type="tel" class="input" placeholder="+255 700 000 000" autocomplete="tel" :disabled="loading" />
      </div>
      <div>
        <label class="label">Password</label>
        <input v-model="form.password" type="password" class="input" placeholder="At least 8 characters" required autocomplete="new-password" minlength="8" :disabled="loading" />
      </div>
      <div>
        <label class="label">Confirm Password</label>
        <input v-model="form.confirmPassword" type="password" class="input" required autocomplete="new-password" :disabled="loading" />
        <p v-if="form.password && form.confirmPassword && form.password !== form.confirmPassword"
          class="text-xs text-red-500 mt-1">Passwords do not match</p>
      </div>

      <div v-if="error" class="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-3 flex items-start gap-2">
        <span class="flex-shrink-0 mt-0.5">⚠️</span>
        <span>{{ error }}</span>
      </div>

      <button
        type="submit"
        :disabled="loading || (form.password && form.confirmPassword && form.password !== form.confirmPassword)"
        class="btn-primary w-full btn-lg"
      >
        <span v-if="loading" class="flex items-center justify-center gap-2">
          <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          Creating account...
        </span>
        <span v-else>Create Account</span>
      </button>
    </form>

    <!-- Divider -->
    <div class="relative my-6 w-full">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200 dark:border-navy-700"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="bg-white dark:bg-navy-900 px-3 text-xs text-gray-400 dark:text-gray-500">or sign up with</span>
      </div>
    </div>

    <!-- Google Sign Up -->
    <button
      type="button"
      @click="handleGoogleSignup"
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
      Already have an account?
      <RouterLink to="/auth/login" class="text-primary-600 dark:text-blue-500 font-semibold hover:underline">Sign In</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const form = ref({ first_name: '', last_name: '', email: '', phone: '', password: '', confirmPassword: '' })
const loading = ref(false)
const googleLoading = ref(false)
const error = ref('')

async function submit() {
  if (form.value.password !== form.value.confirmPassword) return

  loading.value = true
  error.value = ''

  const result = await authStore.register({
    first_name: form.value.first_name,
    last_name:  form.value.last_name,
    email:      form.value.email,
    phone:      form.value.phone,
    password:   form.value.password,
  })

  if (result.success) {
    if (authStore.isAdmin) {
      router.push('/admin/dashboard')
    } else {
      router.push('/dashboard')
    }
  } else {
    error.value = result.error || 'Registration failed. Please try again.'
  }

  loading.value = false
}

async function handleGoogleSignup() {
  googleLoading.value = true
  error.value = ''
  try {
    const API = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1').replace(/\/api.*$/, '')
    const redirectUrl = encodeURIComponent(window.location.origin + '/auth/google/callback')
    window.location.href = `${API}/auth/google/?redirect_uri=${redirectUrl}`
  } catch {
    googleLoading.value = false
    error.value = 'Google sign-up is not available right now. Please use email and password.'
  }
}
</script>
