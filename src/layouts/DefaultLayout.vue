<template>
  <div class="page-shell">
    <Navbar :over-hero="isHome" />
    <AppSidebar />

    <main>
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Navbar from '@/components/common/Navbar.vue'
import AppSidebar from '@/components/common/AppSidebar.vue'
import AppFooter from '@/components/common/AppFooter.vue'

const route = useRoute()
const isHome = computed(() => route.name === 'Home')
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 220ms ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>