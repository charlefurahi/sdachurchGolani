<template>
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
