<template>
<<<<<<< HEAD
  <main class="auth-shell">
    <section class="auth-card" aria-label="Golani SDA account access">
      <RouterLink to="/" class="auth-brand" aria-label="Golani SDA Church home">
        <img :src="logo" alt="" />
        <span>Golani SDA Church</span>
      </RouterLink>
      <div class="auth-content"><RouterView /></div>
      <p class="auth-copyright">© {{ new Date().getFullYear() }} Golani SDA Church</p>
    </section>
  </main>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import logo from '@/assets/logos/logo.png'
</script>

<style scoped>
.auth-shell { min-height:100vh; display:grid; place-items:center; padding:clamp(1rem,4vw,2.5rem); background:radial-gradient(ellipse at top,rgba(201,162,39,.1),transparent 42%),var(--color-bg); color:var(--color-text-main); }
.auth-card { width:min(100%,30rem); padding:clamp(1.25rem,4vw,2.25rem); border:1px solid var(--color-border); border-radius:1.25rem; background:var(--color-surface); box-shadow:var(--shadow-soft); }
.auth-brand { width:fit-content; display:flex; align-items:center; gap:.7rem; margin:0 auto 1.2rem; color:var(--color-heading); font:700 .95rem var(--font-display); text-decoration:none; }
.auth-brand img { width:2.5rem; height:2.5rem; border-radius:50%; object-fit:contain; padding:3px; background:#edf2ef; filter:invert(1); }
.auth-content { width:100%; }
.auth-copyright { margin:1rem 0 0; color:var(--color-text-faint); text-align:center; font-size:.7rem; }
:global(.dark) .auth-shell { background:radial-gradient(ellipse at top,rgba(244,208,63,.07),transparent 42%),var(--color-bg); }
:global(.dark) .auth-brand { color:#f2f6f8; }
:global(.dark) .auth-brand img { background:#16324a; filter:none; }
@media(max-width:480px) { .auth-shell { min-height:100svh; padding:.75rem; align-items:start; } .auth-card { margin-block:auto; padding:1rem; border-radius:1rem; } .auth-brand { margin-bottom:.4rem; } }
</style>
=======
  <div
    class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
    style="background: linear-gradient(135deg, #0d2137 0%, #163f5e 50%, #050f1c 100%)"
  >
    <!-- Background decorative pattern -->
    <div class="absolute inset-0 bg-hero-pattern opacity-10 pointer-events-none"></div>
    <!-- Yellow radial glow -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(ellipse at 70% 30%, rgba(244,208,63,0.07) 0%, transparent 60%)"
    ></div>
    <!-- Decorative rings -->
    <div
      class="absolute top-1/2 right-[10%] -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/5 hidden lg:block"
      style="animation: float 10s ease-in-out infinite"
    ></div>
    <div
      class="absolute top-1/2 right-[10%] -translate-y-1/2 w-[280px] h-[280px] rounded-full hidden lg:block"
      style="border: 1px solid rgba(244,208,63,0.10); animation: float 8s ease-in-out infinite reverse"
    ></div>

    <div class="w-full max-w-md relative z-10">
      <!-- Card only — no logo or text outside -->
      <div
        class="bg-white dark:bg-navy-800 rounded-3xl shadow-2xl overflow-hidden"
        style="border: 1px solid rgba(244,208,63,0.15)"
      >
        <RouterView />
      </div>

      <p class="text-center text-white/30 text-xs mt-6">
        © {{ new Date().getFullYear() }} GolaniSDA Church. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
