<template>
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
</template>

<script setup>
import { ref } from 'vue'
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
