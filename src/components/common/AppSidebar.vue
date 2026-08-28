<template>
  <!-- Overlay (mobile) -->
  <Transition name="overlay-fade">
    <div
      v-if="appStore.isSidebarOpen && !appStore.isSidebarPinned"
      class="sidebar-overlay"
      @click="appStore.closeSidebar()"
    />
  </Transition>

  <!-- Sidebar panel -->
  <Transition name="sidebar-slide">
    <aside
      v-if="appStore.isSidebarOpen || appStore.isSidebarPinned"
      id="golani-sidebar"
      class="golani-sidebar"
      :class="{ 'golani-sidebar--pinned': appStore.isSidebarPinned }"
      aria-label="Navigation sidebar"
    >
      <!-- ── Header ──────────────────────────────────────────── -->
      <div class="sidebar__header">
        <div class="sidebar__brand">
          <img src="@/assets/logos/logo.png" alt="GolaniSDA" class="sidebar__logo" />
          <div>
            <p class="sidebar__brand-name">Golani</p>
            <p class="sidebar__brand-sub">Seventh-Day Adventist Church</p>
          </div>
        </div>
        <div class="sidebar__header-actions">
          <!-- Pin (desktop only) -->
          <button
            @click="appStore.toggleSidebarPin()"
            class="sidebar__pin-btn"
            :class="{ 'sidebar__pin-btn--active': appStore.isSidebarPinned }"
            title="Pin sidebar"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/>
            </svg>
          </button>
          <!-- Close -->
          <button @click="appStore.closeSidebar()" class="sidebar__close-btn" title="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- ── Scrollable body ─────────────────────────────────── -->
      <div class="sidebar__body">

        <!-- Navigation — flat plain list, no icons, no section labels -->
        <nav class="sidebar__nav">
          <RouterLink
            v-for="link in allLinks"
            :key="link.to"
            :to="link.to"
            class="sidebar__nav-item"
            active-class="sidebar__nav-item--active"
            @click="handleNavClick"
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <!-- Account -->
        <RouterLink to="/dashboard" class="sidebar__account-link" @click="handleNavClick">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>
          </svg>
        </RouterLink>
      </div>

      <!-- ── Footer ──────────────────────────────────────────── -->
      <div class="sidebar__footer">
        <!-- Contact Us -->
        <div class="sidebar__contact">
          <p class="sidebar__contact-label">Contact Us</p>
          <div class="sidebar__contact-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z"/>
              <circle cx="12" cy="10" r="2.5"/>
            </svg>
            <span>{{ church.location }}</span>
          </div>
          <a v-if="churchLinks.email" :href="`mailto:${churchLinks.email}`" class="sidebar__contact-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M2 6l10 7 10-7"/>
            </svg>
            <span>{{ churchLinks.email }}</span>
          </a>
          <a v-if="churchLinks.phone" :href="`tel:${churchLinks.phone}`" class="sidebar__contact-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 3a2 2 0 0 1-.5 2.1L8 10.1a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c1 .3 2 .5 3 .7a2 2 0 0 1 1.6 2z"/>
            </svg>
            <span>{{ churchLinks.phone }}</span>
          </a>
        </div>

        <div class="sidebar__footer-row">
          <!-- Social links -->
          <div class="sidebar__socials">
            <a
              v-if="churchLinks.facebook"
              :href="churchLinks.facebook"
              target="_blank"
              rel="noopener"
              class="sidebar__social"
              aria-label="Facebook"
            >
              <img src="@/assets/icons/facebook.png" alt="Facebook" />
            </a>
            <a
              v-if="churchLinks.instagram"
              :href="churchLinks.instagram"
              target="_blank"
              rel="noopener"
              class="sidebar__social"
              aria-label="Instagram"
            >
              <img src="@/assets/icons/instagram.png" alt="Instagram" />
            </a>
            <a
              v-if="churchLinks.youtube"
              :href="churchLinks.youtube"
              target="_blank"
              rel="noopener"
              class="sidebar__social"
              aria-label="YouTube"
            >
              <img src="@/assets/icons/youtube.png" alt="YouTube" />
            </a>
          </div>
          <!-- Theme toggle -->
          <button @click="appStore.toggleTheme()" class="sidebar__theme-btn" :title="appStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'">
            <svg v-if="appStore.isDark" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="4"/>
              <line x1="12" y1="2" x2="12" y2="4"/>
              <line x1="12" y1="20" x2="12" y2="22"/>
              <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/>
              <line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/>
              <line x1="2" y1="12" x2="4" y2="12"/>
              <line x1="20" y1="12" x2="22" y2="12"/>
              <line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/>
              <line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/>
            </svg>
            <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { churchLinks, church } from '@/constants/church'

const appStore = useAppStore()

// Flat, plain link list — no icons, no section headers, mirrors the
// navbar's primary + "More" links in one continuous list.
const allLinks = [
  { to: '/',              label: 'Home' },
  { to: '/about',         label: 'About' },
  { to: '/worship',       label: 'Worship' },
  { to: '/ministries',    label: 'Ministries' },
  { to: '/sermons',       label: 'Sermons' },
  { to: '/events',        label: 'Events' },
  { to: '/leadership',    label: 'Leadership' },
  { to: '/announcements', label: 'Announcements' },
  { to: '/gallery',       label: 'Gallery' },
  { to: '/give',          label: 'Give / Donate' },
  { to: '/contact',       label: 'Contact' },
]

function handleNavClick() {
  // On mobile, close after navigation
  if (window.innerWidth < 1024) {
    appStore.closeSidebar()
  }
}

// Pinning is a desktop-only concept (the pin button itself is hidden below
// 960px via CSS). If the window is resized down to mobile while pinned —
// or the page loads there with a pin preference restored from a previous
// session — unpin so we don't end up with a permanent rail eating half a
// phone screen.
function enforceMobilePin() {
  if (appStore.isSidebarPinned && window.innerWidth <= 960) {
    appStore.toggleSidebarPin()
  }
}

onMounted(() => {
  enforceMobilePin()
  window.addEventListener('resize', enforceMobilePin)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', enforceMobilePin)
})
</script>

<style scoped>
/* ─── Overlay ──────────────────────────────────────────────── */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  z-index: 150;
  background: rgba(0, 0, 0, 0.60);
  backdrop-filter: blur(3px);
}
.overlay-fade-enter-active, .overlay-fade-leave-active { transition: opacity 0.3s; }
.overlay-fade-enter-from, .overlay-fade-leave-to { opacity: 0; }

/* ─── Sidebar panel ────────────────────────────────────────── */
.golani-sidebar {
  position: fixed;
  top: var(--nav-height); /* sits below the navbar, whatever its height is at this breakpoint */
  right: 0;
  bottom: 0;
  width: 280px;
  z-index: 151;
  background: #0a0a0a;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.40);
}
.golani-sidebar--pinned {
  z-index: 50; /* behind navbar and overlays */
}

@media (max-width: 960px) {
  /* Pinning only makes sense on wide screens with room to spare. */
  .sidebar__pin-btn {
    display: none;
  }
}

/* Slide transition (from the right, since the panel now docks on the right edge) */
.sidebar-slide-enter-active, .sidebar-slide-leave-active { transition: transform 0.3s cubic-bezier(0.4,0,0.2,1); }
.sidebar-slide-enter-from, .sidebar-slide-leave-to { transform: translateX(100%); }

/* ─── Header ───────────────────────────────────────────────── */
.sidebar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 14px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  flex-shrink: 0;
}
.sidebar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
}
.sidebar__logo {
  width: 36px;
  height: 36px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}
.sidebar__brand-name {
  font-size: 0.9rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.1;
  font-family: 'Poppins', sans-serif;
}
.sidebar__brand-sub {
  font-size: 0.65rem;
  color: #f4d03f;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-family: 'Poppins', sans-serif;
}
.sidebar__header-actions { display: flex; align-items: center; gap: 4px; }

.sidebar__pin-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.45);
  cursor: pointer;
  transition: color 0.2s;
}
.sidebar__pin-btn--active {
  color: #f4d03f;
}
.sidebar__pin-btn:hover { color: #f4d03f; }

.sidebar__close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.6);
  cursor: pointer;
  transition: color 0.2s;
}
.sidebar__close-btn:hover { color: #ffffff; }

/* ─── Body ─────────────────────────────────────────────────── */
.sidebar__body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 20px 12px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.2) transparent;
}
.sidebar__body::-webkit-scrollbar { width: 4px; }
.sidebar__body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 2px; }

/* ─── Nav section — flat plain list, no icons, no labels ─────── */
.sidebar__nav {
  display: flex;
  flex-direction: column;
  margin-bottom: 28px;
}
.sidebar__nav-item {
  padding: 11px 0;
  text-decoration: none;
  color: #ffffff;
  font-size: 1.05rem;
  font-weight: 500;
  transition: color 0.15s;
  font-family: 'Poppins', sans-serif;
}
.sidebar__nav-item:hover {
  color: rgba(255,255,255,0.65);
}
.sidebar__nav-item--active {
  color: #f4d03f !important;
  font-weight: 700;
}

/* ─── Account icon ─────────────────────────────────────────── */
.sidebar__account-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.65);
  text-decoration: none;
  margin-bottom: 24px;
  transition: color 0.2s;
}
.sidebar__account-link:hover { color: #ffffff; }


/* ─── Footer ───────────────────────────────────────────────── */
.sidebar__footer {
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 12px 20px 20px;
  flex-shrink: 0;
}

/* ─── Contact Us ───────────────────────────────────────────── */
.sidebar__contact {
  padding: 4px 0 16px;
  margin-bottom: 4px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.sidebar__contact-label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  margin-bottom: 12px;
  font-family: 'Poppins', sans-serif;
}
.sidebar__contact-row {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 6px 0;
  color: #ffffff;
  font-size: 0.82rem;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  transition: opacity 0.2s;
}
.sidebar__contact-row svg { flex-shrink: 0; color: rgba(255,255,255,0.55); }
a.sidebar__contact-row:hover { opacity: 0.75; }

.sidebar__footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0 2px;
}
.sidebar__socials {
  display: flex;
  gap: 16px;
}
.sidebar__social {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}
.sidebar__social img { width: 16px; height: 16px; object-fit: contain; filter: brightness(0) invert(1); opacity: 0.7; }
.sidebar__social:hover img { opacity: 1; }

.sidebar__theme-btn {
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}
.sidebar__theme-btn:hover { color: #ffffff; }
</style>