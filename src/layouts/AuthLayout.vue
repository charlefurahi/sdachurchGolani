<template>
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
