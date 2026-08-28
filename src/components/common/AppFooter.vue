<template>
  <footer class="site-footer">
    <div class="site-footer__top">
      <div class="site-container site-footer__grid">
        <div>
          <img :src="logo" alt="" class="site-footer__logo" />
          <h2 class="site-footer__brand">Golani SDA Church</h2>
          <p class="site-footer__intro">
            Growing in Christ, serving with purpose, and sharing hope with our community.
          </p>
        </div>

        <div>
          <h3 class="site-footer__heading">Quick links</h3>
          <RouterLink v-for="item in mainNavigation.slice(0, 5)" :key="item.to" :to="item.to" class="site-footer__link">
            {{ item.label }}
          </RouterLink>
        </div>

        <div>
          <h3 class="site-footer__heading">Worship</h3>
          <div v-for="service in defaultServices.slice(0, 4)" :key="service.key" class="site-footer__service">
            <p class="site-footer__service-name">{{ service.name }}</p>
            <p class="site-footer__service-time">
              {{ service.day }} · {{ service.startTime }}
            </p>
          </div>
        </div>

        <div>
          <h3 class="site-footer__heading">Visit us</h3>
          <p class="site-footer__location">{{ church.location }}</p>
          <p v-if="churchLinks.phone" class="site-footer__contact">{{ churchLinks.phone }}</p>
          <p v-if="churchLinks.email" class="site-footer__contact">{{ churchLinks.email }}</p>
          <p class="site-footer__social">{{ church.socialHandle }}</p>
        </div>
      </div>
    </div>

    <div class="site-footer__bottom">
      <div class="site-container site-footer__bottom-inner">
        <span>© {{ year }} Golani SDA Church</span>
        <span>Seventh-day Adventist Church</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import logo from '@/assets/logos/logo.png'
import { church, churchLinks } from '@/constants/church'
import { defaultServices } from '@/constants/services'
import { mainNavigation } from '@/constants/navigation'

const year = computed(() => new Date().getFullYear())
</script>
