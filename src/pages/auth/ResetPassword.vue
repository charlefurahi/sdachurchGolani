<template>
  <div class="p-8 flex flex-col items-center">
    <!-- Page header -->
    <div class="w-full text-center mb-7">
      <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white mb-1">Reset Password Page</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Choose a strong new password for your account.</p>
    </div>

    <form @submit.prevent="submit" class="space-y-4 w-full">
      <div>
        <label class="label">New Password</label>
        <div class="relative">
          <input
            v-model="form.password"
            :type="showPw ? 'text' : 'password'"
            class="input pr-11"
            placeholder="At least 8 characters"
            required
            minlength="8"
            autocomplete="new-password"
            :disabled="loading"
          />
          <button type="button" @click="showPw = !showPw" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
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
      <div>
        <label class="label">Confirm Password</label>
        <input
          v-model="form.confirm"
          type="password"
          class="input"
          required
          autocomplete="new-password"
          :disabled="loading"
        />
        <p v-if="form.password && form.confirm && form.password !== form.confirm" class="text-xs text-red-500 mt-1">
          Passwords do not match
        </p>
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

      <button
        type="submit"
        :disabled="loading || (form.password && form.confirm && form.password !== form.confirm)"
        class="btn-primary w-full btn-lg"
      >
        <span v-if="loading" class="flex items-center justify-center gap-2">
          <span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
          Updating…
        </span>
        <span v-else>Update Password</span>
      </button>
    </form>

    <p class="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
      <RouterLink to="/auth/login" class="text-primary-600 dark:text-blue-500 font-semibold hover:underline">← Back to Login</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router    = useRouter()
const route     = useRoute()
const authStore = useAuthStore()

const form       = ref({ password: '', confirm: '' })
const showPw     = ref(false)
const loading    = ref(false)
const error      = ref('')
const successMsg = ref('')

async function submit() {
  if (form.value.password !== form.value.confirm) return
  loading.value = true
  error.value = ''
  successMsg.value = ''

  const result = await authStore.resetPassword({
    uid:       route.params.uid || route.query.uid,
    token:     route.params.token || route.query.token,
    password:  form.value.password,
    password2: form.value.confirm,
  })

  loading.value = false

  if (result.success) {
    successMsg.value = 'Password updated! Redirecting to login…'
    setTimeout(() => router.push('/auth/login'), 1800)
  } else {
    error.value = result.error || 'Failed to update password. The link may have expired.'
  }
}
</script>
