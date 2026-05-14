<template>
  <div class="p-8">
    <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white mb-1">Welcome Back</h2>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-7">Sign in to your GolaniSDA account</p>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label class="label">Email Address</label>
        <input v-model="form.email" type="email" class="input" placeholder="you@example.com" required />
      </div>
      <div>
        <div class="flex justify-between mb-1.5">
          <label class="label mb-0">Password</label>
          <RouterLink to="/auth/forgot-password" class="text-xs text-primary-600 dark:text-gold-400 hover:underline">Forgot password?</RouterLink>
        </div>
        <div class="relative">
          <input v-model="form.password" :type="showPw ? 'text' : 'password'" class="input pr-11" placeholder="••••••••" required />
          <button type="button" @click="showPw = !showPw" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{{ showPw ? '🙈' : '👁' }}</button>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <input v-model="form.remember" type="checkbox" id="remember" class="w-4 h-4 accent-primary-600" />
        <label for="remember" class="text-sm text-gray-600 dark:text-gray-300">Remember me</label>
      </div>
      <p v-if="error" class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
      <button type="submit" :disabled="loading" class="btn-primary w-full btn-lg">
        {{ loading ? 'Signing in...' : 'Sign In' }}
      </button>
    </form>
    <div class="mt-6 text-center">
      <p class="text-sm text-gray-500 dark:text-gray-400">Don't have an account?
        <RouterLink to="/auth/register" class="text-primary-600 dark:text-gold-400 font-semibold hover:underline">Create one</RouterLink>
      </p>
    </div>
    <div class="mt-4 pt-4 border-t border-gray-100 dark:border-navy-700 text-center">
      <RouterLink to="/admin/dashboard" class="text-xs text-gray-400 hover:text-primary-600 dark:hover:text-gold-400 transition-colors">
        → Enter Admin Demo (no login required)
      </RouterLink>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const router = useRouter()
const authStore = useAuthStore()
const form = ref({ email: '', password: '', remember: false })
const showPw = ref(false)
const loading = ref(false)
const error = ref('')
async function handleLogin() {
  loading.value = true; error.value = ''
  const result = await authStore.login(form.value)
  if (result.success) router.push('/admin/dashboard')
  else error.value = result.error || 'Invalid credentials'
  loading.value = false
}
</script>
