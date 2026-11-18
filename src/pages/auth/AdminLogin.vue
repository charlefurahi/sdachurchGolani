<template>
<<<<<<< HEAD
  <main class="admin-auth-page">
    <section class="admin-auth-card">
      <RouterLink to="/" class="admin-auth-brand" aria-label="Golani SDA Church home">
        <img src="@/assets/logos/logo.png" alt="" />
        <span>Golani SDA Church</span>
      </RouterLink>

      <header class="admin-auth-heading">
        <h1>Administrator sign in</h1>
        <p>Access church administration.</p>
      </header>

      <form @submit.prevent="handleLogin" class="admin-auth-form">
        <div>
          <label for="admin-email" class="label">Email address</label>
          <input id="admin-email" v-model="form.email" type="email" class="input" placeholder="admin@golanisda.org" required autocomplete="username" :disabled="loading" />
        </div>

        <div>
          <div class="admin-auth-password-label">
            <label for="admin-password" class="label">Password</label>
            <RouterLink to="/auth/forgot-password">Forgot password?</RouterLink>
          </div>
          <div class="admin-auth-password-field">
            <input id="admin-password" v-model="form.password" :type="showPw ? 'text' : 'password'" class="input" placeholder="Enter your password" required autocomplete="current-password" :disabled="loading" />
            <button type="button" @click="showPw = !showPw" :aria-label="showPw ? 'Hide password' : 'Show password'">
              <svg v-if="showPw" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.7 10.7 0 0 1 12 5c6 0 9.5 7 9.5 7a13.4 13.4 0 0 1-3.2 3.8M6.2 6.2C3.8 7.8 2.5 12 2.5 12s3.5 7 9.5 7a10 10 0 0 0 3-.5"/></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>

        <div v-if="error" class="admin-auth-error" role="alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" d="M12 8v5m0 3h.01"/></svg>
          <span>{{ error }}</span>
        </div>

        <button type="submit" :disabled="loading" class="btn-primary w-full">
          <span v-if="loading" class="admin-auth-spinner" aria-hidden="true"></span>
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>

      <footer class="admin-auth-footer">
        <RouterLink to="/">Back to website</RouterLink>
        <RouterLink to="/auth/login">Member sign in</RouterLink>
      </footer>
    </section>
  </main>
=======
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
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
</template>

<script setup>
import { ref } from 'vue'
<<<<<<< HEAD
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const form = ref({ email: '', password: '' })
const showPw = ref(false)
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''
  const result = await authStore.login({ email:form.value.email.toLowerCase().trim(), password:form.value.password })
  loading.value = false
  if (result?.success) {
    if (authStore.isAdmin) router.push('/admin/dashboard')
    else { error.value = 'Access denied. This portal is for administrators only.'; await authStore.logout() }
  } else error.value = result?.error || 'Invalid credentials. Please try again.'
}
</script>

<style scoped>
.admin-auth-page{min-height:100vh;display:grid;place-items:center;padding:1rem;background:radial-gradient(ellipse at top,rgba(201,162,39,.1),transparent 42%),var(--color-bg);color:var(--color-text-main)}
.admin-auth-card{width:min(100%,27rem);padding:clamp(1.35rem,5vw,2.25rem);border:1px solid var(--color-border);border-radius:1.25rem;background:var(--color-surface);box-shadow:var(--shadow-soft)}
.admin-auth-brand{display:flex;width:fit-content;align-items:center;gap:.7rem;margin:0 auto 1.5rem;color:var(--color-heading);font:700 .95rem var(--font-display);text-decoration:none}
.admin-auth-brand img{width:2.5rem;height:2.5rem;padding:3px;border-radius:50%;object-fit:contain;background:#edf2ef;filter:invert(1)}
.admin-auth-heading{margin-bottom:1.5rem;text-align:center}.admin-auth-heading h1{margin:0;color:var(--color-heading);font:700 1.65rem/1.2 var(--font-display)}.admin-auth-heading p{margin:.45rem 0 0;color:var(--color-text-muted);font-size:.88rem}
.admin-auth-form{display:grid;gap:1.1rem}.admin-auth-password-label{display:flex;align-items:center;justify-content:space-between}.admin-auth-password-label a{margin-bottom:.4rem;color:var(--color-gold-dark);font-size:.75rem}.admin-auth-password-field{position:relative}.admin-auth-password-field .input{padding-right:3rem}.admin-auth-password-field button{position:absolute;top:50%;right:.85rem;display:grid;width:1.5rem;height:1.5rem;place-items:center;transform:translateY(-50%);background:transparent;color:var(--color-text-faint)}.admin-auth-password-field svg{width:1.05rem;height:1.05rem}.admin-auth-error{display:flex;align-items:flex-start;gap:.6rem;padding:.75rem;border:1px solid rgba(185,65,65,.2);border-radius:.75rem;background:rgba(185,65,65,.07);color:#b94141;font-size:.82rem}.admin-auth-error svg{width:1rem;height:1rem;flex:none;margin-top:.1rem}.admin-auth-spinner{width:1rem;height:1rem;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:auth-spin .8s linear infinite}.admin-auth-footer{display:flex;justify-content:space-between;gap:.75rem;margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--color-border);font-size:.75rem;color:var(--color-text-muted)}.admin-auth-footer a:hover{color:var(--color-gold-dark)}
:global(.dark) .admin-auth-page{background:radial-gradient(ellipse at top,rgba(244,208,63,.07),transparent 42%),var(--color-bg)}:global(.dark) .admin-auth-brand,:global(.dark) .admin-auth-heading h1{color:#f2f6f8}:global(.dark) .admin-auth-brand img{background:#16324a;filter:none}:global(.dark) .admin-auth-password-label a{color:#f4d03f}:global(.dark) .admin-auth-error{color:#ffb4b4;background:rgba(185,65,65,.12)}
@keyframes auth-spin{to{transform:rotate(360deg)}}
</style>
=======
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
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
