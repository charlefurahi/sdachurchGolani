<template>
  <div class="min-h-screen flex bg-gray-950">
    <!-- Left panel — branding -->
    <div class="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden"
      style="background: linear-gradient(145deg, #0d2137 0%, #163f5e 60%, #050f1c 100%)">
      <!-- Decorative rings -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-blue-500/10"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-blue-400/15"></div>
        <div class="absolute inset-0" style="background: radial-gradient(ellipse at 60% 40%, rgba(244,208,63,0.07) 0%, transparent 60%)"></div>
      </div>

      <!-- Logo and title -->
      <div class="relative z-10 text-center">
        <div class="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-2xl">
          <img src="@/assets/logos/logo.png" alt="GolaniSDA" class="h-16 w-auto object-contain" />
        </div>
        <h1 class="text-3xl font-bold text-white mb-2 font-heading">Golani SDA Church</h1>
        <p class="text-blue-300 text-sm tracking-widest uppercase mb-1">Administration Portal</p>
        <div class="w-12 h-0.5 bg-blue-500/50 mx-auto my-6"></div>
        <p class="text-blue-200/60 text-sm max-w-xs leading-relaxed">
          Securely manage church data, content, events, and members.
        </p>
      </div>

      <!-- Feature pills -->
      <div class="relative z-10 mt-12 space-y-3 w-full max-w-xs">
        <div v-for="f in features" :key="f.text" class="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 backdrop-blur-sm">
          <span class="text-lg">{{ f.icon }}</span>
          <span class="text-white/70 text-sm">{{ f.text }}</span>
        </div>
      </div>
    </div>

    <!-- Right panel — login form -->
    <div class="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 bg-gray-950">
      <!-- Mobile logo -->
      <div class="lg:hidden flex items-center gap-3 mb-10">
        <img src="@/assets/logos/logo.png" alt="GolaniSDA" class="h-10 w-auto" />
        <div>
          <p class="text-white font-bold text-base">Golani SDA Church</p>
          <p class="text-blue-400 text-xs tracking-widest uppercase">Admin Portal</p>
        </div>
      </div>

      <div class="w-full max-w-sm">
        <!-- Header -->
        <div class="mb-8 text-center lg:text-left">
          <h2 class="text-2xl font-bold text-white mb-1 font-heading">Admin Sign In</h2>
          <p class="text-gray-400 text-sm">Enter your credentials to access the admin panel.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email -->
          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </span>
              <input
                v-model="form.email"
                type="email"
                placeholder="admin@golanisda.org"
                required
                autocomplete="email"
                :disabled="loading"
                class="w-full pl-11 pr-4 py-3 bg-gray-900 border border-gray-700 text-white text-sm rounded-xl placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-60"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
              <RouterLink to="/auth/forgot-password" class="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </RouterLink>
            </div>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </span>
              <input
                v-model="form.password"
                :type="showPw ? 'text' : 'password'"
                placeholder="••••••••"
                required
                autocomplete="current-password"
                :disabled="loading"
                class="w-full pl-11 pr-11 py-3 bg-gray-900 border border-gray-700 text-white text-sm rounded-xl placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-60"
              />
              <button type="button" @click="showPw = !showPw" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
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

          <!-- Error message -->
          <div v-if="error" class="flex items-start gap-3 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{{ error }}</span>
          </div>

          <!-- Submit button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/30 mt-2"
          >
            <span v-if="loading" class="flex items-center gap-2">
              <span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
              Signing in…
            </span>
            <span v-else class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              Sign In to Admin Panel
            </span>
          </button>
        </form>

        <!-- Footer links -->
        <div class="mt-8 pt-6 border-t border-gray-800 flex items-center justify-between text-xs text-gray-600">
          <RouterLink to="/" class="hover:text-gray-400 transition-colors flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back to Website
          </RouterLink>
          <RouterLink to="/auth/login" class="hover:text-gray-400 transition-colors">Member Login</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router    = useRouter()
const route     = useRoute()
const authStore = useAuthStore()

const form    = ref({ email: '', password: '' })
const showPw  = ref(false)
const loading = ref(false)
const error   = ref('')

const features = [
  { icon: '', text: 'Manage sermons & media library' },
  { icon: '', text: 'Create & publish church events' },
  { icon: '', text: 'Upload photos to gallery albums' },
  { icon: '', text: 'Manage leadership profiles' },
  { icon: '', text: 'Post announcements & updates' },
]

async function handleLogin() {
  loading.value = true
  error.value   = ''

  const result = await authStore.login({
    email:    form.value.email.toLowerCase().trim(),
    password: form.value.password,
  })

  loading.value = false

  if (result?.success) {
    if (authStore.isAdmin) {
      router.push('/admin/dashboard')
    } else {
      error.value = 'Access denied. This portal is for administrators only.'
      await authStore.logout()
    }
  } else {
    error.value = result?.error || 'Invalid credentials. Please try again.'
  }
}
</script>
