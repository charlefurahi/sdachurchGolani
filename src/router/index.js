import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'

// ─────────────────────────────────────────────────────────────────────────────
// Layouts
// ─────────────────────────────────────────────────────────────────────────────
const DefaultLayout = () => import('@/layouts/DefaultLayout.vue')
const AuthLayout = () => import('@/layouts/AuthLayout.vue')
const AdminLayout = () => import('@/layouts/AdminLayout.vue')

// ─────────────────────────────────────────────────────────────────────────────
// Public pages
// ─────────────────────────────────────────────────────────────────────────────
const Home = () => import('@/pages/Home.vue')
const About = () => import('@/pages/About.vue')
const Events = () => import('@/pages/Events.vue')
const EventDetail = () => import('@/pages/EventDetail.vue')
const Sermons = () => import('@/pages/Sermons.vue')
const SermonDetail = () => import('@/pages/SermonDetail.vue')
const Announcements = () => import('@/pages/Announcements.vue')
const AnnouncementDetail = () => import('@/pages/AnnouncementDetail.vue')
const Gallery = () => import('@/pages/Gallery.vue')
const Donations = () => import('@/pages/Donations.vue')
const Contact = () => import('@/pages/Contact.vue')
const Leadership = () => import('@/pages/Leadership.vue')
const LeaderDetail = () => import('@/pages/LeaderDetail.vue')
const Worship = () => import('@/pages/Worship.vue')

const Ministries = () => import('@/pages/Ministries.vue')
const MinistryDetail = () => import('@/pages/MinistryDetail.vue')

const NotFound = () => import('@/pages/NotFound.vue')

// ─────────────────────────────────────────────────────────────────────────────
// Auth pages
// ─────────────────────────────────────────────────────────────────────────────
const Login = () => import('@/pages/auth/Login.vue')
const Register = () => import('@/pages/auth/Register.vue')
const ForgotPassword = () => import('@/pages/auth/ForgotPassword.vue')
const ResetPassword = () => import('@/pages/auth/ResetPassword.vue')
const AdminLogin = () => import('@/pages/auth/AdminLogin.vue')

// ─────────────────────────────────────────────────────────────────────────────
// User pages
// ─────────────────────────────────────────────────────────────────────────────
const UserDashboard = () => import('@/pages/user/Dashboard.vue')

// ─────────────────────────────────────────────────────────────────────────────
// Admin pages
// ─────────────────────────────────────────────────────────────────────────────
const AdminDashboard = () => import('@/pages/admin/Dashboard.vue')
const AdminEvents = () => import('@/pages/admin/Events.vue')
const AdminSermons = () => import('@/pages/admin/Sermons.vue')
const AdminAnnouncements = () => import('@/pages/admin/Announcements.vue')
const AdminUsers = () => import('@/pages/admin/Users.vue')
const AdminSettings = () => import('@/pages/admin/Settings.vue')
const AdminLeadership = () => import('@/pages/admin/Leadership.vue')

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Validates a numeric ID.
 */
function isValidId(value) {
  const id = Number(value)

  return Number.isInteger(id) && id > 0
}

/**
 * Validates a slug.
 *
 * Examples:
 * youth-ministries
 * adventurers
 * pathfinders
 * women-ministries
 */
function isValidSlug(value) {
  if (!value) {
    return false
  }

  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(String(value))
}

/**
 * Validate a detail route that may contain either:
 *
 * /ministries/5
 *
 * OR
 *
 * /ministries/youth-ministries
 */
function validateDetailParam(to, _from, next) {
  const value = String(to.params.id || '').trim()

  if (isValidId(value) || isValidSlug(value)) {
    return next()
  }

  return next({
    name: 'NotFound'
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────────────────────────────────────
const routes = [

  // ═══════════════════════════════════════════════════════════════════════════
  // PUBLIC
  // ═══════════════════════════════════════════════════════════════════════════
  {
    path: '/',
    component: DefaultLayout,

    children: [

      // Home
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          title: 'Home'
        }
      },

      // About
      {
        path: 'about',
        name: 'About',
        component: About,
        meta: {
          title: 'About Us'
        }
      },

      // Worship
      {
        path: 'worship',
        name: 'Worship',
        component: Worship,
        meta: {
          title: 'Worship'
        }
      },

      // ─────────────────────────────────────────────────────────────────────
      // EVENTS
      // ─────────────────────────────────────────────────────────────────────
      {
        path: 'events',
        name: 'Events',
        component: Events,
        meta: {
          title: 'Church Events'
        }
      },

      {
        path: 'events/:id',
        name: 'EventDetail',
        component: EventDetail,
        meta: {
          title: 'Event Details'
        },
        beforeEnter(to, _from, next) {
          if (isValidId(to.params.id)) {
            return next()
          }

          return next({
            name: 'NotFound'
          })
        }
      },

      // ─────────────────────────────────────────────────────────────────────
      // SERMONS
      // ─────────────────────────────────────────────────────────────────────
      {
        path: 'sermons',
        name: 'Sermons',
        component: Sermons,
        meta: {
          title: 'Sermons'
        }
      },

      {
        path: 'sermons/:id',
        name: 'SermonDetail',
        component: SermonDetail,
        meta: {
          title: 'Sermon'
        },
        beforeEnter(to, _from, next) {
          if (isValidId(to.params.id)) {
            return next()
          }

          return next({
            name: 'NotFound'
          })
        }
      },

      // ─────────────────────────────────────────────────────────────────────
      // ANNOUNCEMENTS
      // ─────────────────────────────────────────────────────────────────────
      {
        path: 'announcements',
        name: 'Announcements',
        component: Announcements,
        meta: {
          title: 'Announcements'
        }
      },

      {
        path: 'announcements/:id',
        name: 'AnnouncementDetail',
        component: AnnouncementDetail,
        meta: {
          title: 'Announcement'
        },
        beforeEnter(to, _from, next) {
          if (isValidId(to.params.id)) {
            return next()
          }

          return next({
            name: 'NotFound'
          })
        }
      },

      // ─────────────────────────────────────────────────────────────────────
      // GALLERY
      // ─────────────────────────────────────────────────────────────────────
      {
        path: 'gallery',
        name: 'Gallery',
        component: Gallery,
        meta: {
          title: 'Photo Gallery'
        }
      },

      // ─────────────────────────────────────────────────────────────────────
      // DONATIONS
      // ─────────────────────────────────────────────────────────────────────
      {
        path: 'give',
        name: 'Donations',
        component: Donations,
        meta: {
          title: 'Give / Donate'
        }
      },

      {
        path: 'donate',
        redirect: {
          name: 'Donations'
        }
      },

      // ─────────────────────────────────────────────────────────────────────
      // CONTACT
      // ─────────────────────────────────────────────────────────────────────
      {
        path: 'contact',
        name: 'Contact',
        component: Contact,
        meta: {
          title: 'Contact Us'
        }
      },

      // ─────────────────────────────────────────────────────────────────────
      // LEADERSHIP
      // ─────────────────────────────────────────────────────────────────────
      {
        path: 'leadership',
        name: 'Leadership',
        component: Leadership,
        meta: {
          title: 'Church Leadership'
        }
      },

      {
        path: 'leadership/:id',
        name: 'LeaderDetail',
        component: LeaderDetail,
        meta: {
          title: 'Leader Profile'
        },
        beforeEnter(to, _from, next) {
          if (isValidId(to.params.id)) {
            return next()
          }

          return next({
            name: 'NotFound'
          })
        }
      },

      // ═══════════════════════════════════════════════════════════════════════
      // MINISTRIES
      // ═══════════════════════════════════════════════════════════════════════

      {
        path: 'ministries',
        name: 'Ministries',
        component: Ministries,
        meta: {
          title: 'Church Ministries'
        }
      },

      /**
       * IMPORTANT:
       *
       * This route supports BOTH:
       *
       * /ministries/5
       *
       * and
       *
       * /ministries/youth-ministries
       *
       * This fixes the 404 problem caused by Number(slug) => NaN.
       */
      {
        path: 'ministries/:id',
        name: 'MinistryDetail',
        component: MinistryDetail,
        meta: {
          title: 'Ministry Details'
        },
        beforeEnter: validateDetailParam
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AUTH
  // ═══════════════════════════════════════════════════════════════════════════
  {
    path: '/auth',
    component: AuthLayout,
    meta: {
      guest: true
    },

    children: [

      {
        path: '',
        redirect: {
          name: 'Login'
        }
      },

      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: {
          title: 'Sign In',
          guest: true
        }
      },

      {
        path: 'register',
        name: 'Register',
        component: Register,
        meta: {
          title: 'Create Account',
          guest: true
        }
      },

      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword,
        meta: {
          title: 'Forgot Password',
          guest: true
        }
      },

      {
        path: 'reset-password',
        name: 'ResetPassword',
        component: ResetPassword,
        meta: {
          title: 'Reset Password',
          guest: true
        }
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADMIN LOGIN
  // ═══════════════════════════════════════════════════════════════════════════
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
    meta: {
      title: 'Admin Sign In',
      guest: true
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // USER DASHBOARD
  // ═══════════════════════════════════════════════════════════════════════════
  {
    path: '/dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: {
      title: 'My Dashboard',
      requiresAuth: true
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADMIN
  // ═══════════════════════════════════════════════════════════════════════════
  {
    path: '/admin',
    component: AdminLayout,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    },

    children: [

      {
        path: '',
        redirect: {
          name: 'AdminDashboard'
        }
      },

      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: {
          title: 'Dashboard',
          requiresAuth: true,
          requiresAdmin: true
        }
      },

      {
        path: 'events',
        name: 'AdminEvents',
        component: AdminEvents,
        meta: {
          title: 'Manage Events',
          requiresAuth: true,
          requiresAdmin: true
        }
      },

      {
        path: 'sermons',
        name: 'AdminSermons',
        component: AdminSermons,
        meta: {
          title: 'Manage Sermons',
          requiresAuth: true,
          requiresAdmin: true
        }
      },

      {
        path: 'gallery',
        name: 'AdminGallery',
        redirect: {
          name: 'AdminDashboard'
        }
      },

      {
        path: 'announcements',
        name: 'AdminAnnouncements',
        component: AdminAnnouncements,
        meta: {
          title: 'Manage Announcements',
          requiresAuth: true,
          requiresAdmin: true
        }
      },

      {
        path: 'leadership',
        name: 'AdminLeadership',
        component: AdminLeadership,
        meta: {
          title: 'Manage Leadership',
          requiresAuth: true,
          requiresAdmin: true
        }
      },

      {
        path: 'users',
        name: 'AdminUsers',
        component: AdminUsers,
        meta: {
          title: 'Manage Users',
          requiresAuth: true,
          requiresAdmin: true
        }
      },

      {
        path: 'settings',
        name: 'AdminSettings',
        component: AdminSettings,
        meta: {
          title: 'Settings',
          requiresAuth: true,
          requiresAdmin: true
        }
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 404
  // ═══════════════════════════════════════════════════════════════════════════
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: 'Page Not Found'
    }
  }
]

// ─────────────────────────────────────────────────────────────────────────────
// Router
// ─────────────────────────────────────────────────────────────────────────────
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,

  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80
      }
    }

    return {
      top: 0,
      behavior: 'smooth'
    }
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// Navigation Guard
// ─────────────────────────────────────────────────────────────────────────────
router.beforeEach((to, _from, next) => {

  // Page title
  document.title = to.meta.title
    ? `${to.meta.title} — GolaniSDA`
    : 'Golani SDA Church'

  // Loading state
  try {
    const app = useAppStore()
    app.setLoading(true)
  } catch {
    // Store may not be ready.
  }

  // Auth
  let auth = null

  try {
    auth = useAuthStore()
  } catch {
    return next()
  }

  const isLoggedIn = auth?.isLoggedIn ?? false
  const isAdmin = auth?.isAdmin ?? false

  // ─────────────────────────────────────────────────────────────────────────
  // Authentication required
  // ─────────────────────────────────────────────────────────────────────────
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({
      name: 'Login',
      query: {
        redirect: to.fullPath
      }
    })
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Admin required
  // ─────────────────────────────────────────────────────────────────────────
  if (to.meta.requiresAdmin && !isAdmin) {
    return next({
      name: 'AdminLogin'
    })
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Guest only
  // ─────────────────────────────────────────────────────────────────────────
  if (to.meta.guest && isLoggedIn) {

    const redirect = to.query?.redirect

    return next(
      typeof redirect === 'string'
        ? redirect
        : { name: 'Home' }
    )
  }

  next()
})

// ─────────────────────────────────────────────────────────────────────────────
// After navigation
// ─────────────────────────────────────────────────────────────────────────────
router.afterEach(() => {

  try {
    const app = useAppStore()
    app.setLoading(false)
  } catch {
    // Ignore loading-store errors.
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// Dynamic import errors
// ─────────────────────────────────────────────────────────────────────────────
router.onError((err) => {

  const message = err?.message || ''

  if (
    message.includes(
      'Failed to fetch dynamically imported module'
    ) ||
    message.includes('Loading chunk') ||
    message.includes(
      'Importing a module script failed'
    )
  ) {

    console.warn(
      '[router] Chunk load error — reloading page',
      err
    )

    window.location.reload()
  }
})

export default router