import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Lazy loaded page components
const Home = () => import('@/pages/Home.vue')
const About = () => import('@/pages/About.vue')
const Events = () => import('@/pages/Events.vue')
const EventDetail = () => import('@/pages/EventDetail.vue')
const Sermons = () => import('@/pages/Sermons.vue')
const SermonDetail = () => import('@/pages/SermonDetail.vue')
const Announcements = () => import('@/pages/Announcements.vue')
const Gallery = () => import('@/pages/Gallery.vue')
const Donations = () => import('@/pages/Donations.vue')
const Contact = () => import('@/pages/Contact.vue')
const Login = () => import('@/pages/auth/Login.vue')
const Register = () => import('@/pages/auth/Register.vue')
const ForgotPassword = () => import('@/pages/auth/ForgotPassword.vue')
const ResetPassword = () => import('@/pages/auth/ResetPassword.vue')
const NotFound = () => import('@/pages/NotFound.vue')

// Admin pages
const AdminDashboard = () => import('@/pages/admin/Dashboard.vue')
const AdminEvents = () => import('@/pages/admin/Events.vue')
const AdminSermons = () => import('@/pages/admin/Sermons.vue')
const AdminGallery = () => import('@/pages/admin/Gallery.vue')
const AdminAnnouncements = () => import('@/pages/admin/Announcements.vue')
const AdminUsers = () => import('@/pages/admin/Users.vue')
const AdminSettings = () => import('@/pages/admin/Settings.vue')

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      { path: '', name: 'Home', component: Home, meta: { title: 'Home' } },
      { path: 'about', name: 'About', component: About, meta: { title: 'About Us' } },
      { path: 'events', name: 'Events', component: Events, meta: { title: 'Events' } },
      { path: 'events/:id', name: 'EventDetail', component: EventDetail, meta: { title: 'Event Details' } },
      { path: 'sermons', name: 'Sermons', component: Sermons, meta: { title: 'Sermons' } },
      { path: 'sermons/:id', name: 'SermonDetail', component: SermonDetail, meta: { title: 'Sermon' } },
      { path: 'announcements', name: 'Announcements', component: Announcements, meta: { title: 'Announcements' } },
      { path: 'gallery', name: 'Gallery', component: Gallery, meta: { title: 'Gallery' } },
      { path: 'give', name: 'Donations', component: Donations, meta: { title: 'Give / Donate' } },
      { path: 'contact', name: 'Contact', component: Contact, meta: { title: 'Contact Us' } }
    ]
  },
  {
    path: '/auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      { path: 'login', name: 'Login', component: Login, meta: { title: 'Sign In', guest: true } },
      { path: 'register', name: 'Register', component: Register, meta: { title: 'Create Account', guest: true } },
      { path: 'forgot-password', name: 'ForgotPassword', component: ForgotPassword, meta: { title: 'Forgot Password', guest: true } },
      { path: 'reset-password', name: 'ResetPassword', component: ResetPassword, meta: { title: 'Reset Password', guest: true } }
    ]
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: '', redirect: '/admin/dashboard' },
      { path: 'dashboard', name: 'AdminDashboard', component: AdminDashboard, meta: { title: 'Dashboard' } },
      { path: 'events', name: 'AdminEvents', component: AdminEvents, meta: { title: 'Manage Events' } },
      { path: 'sermons', name: 'AdminSermons', component: AdminSermons, meta: { title: 'Manage Sermons' } },
      { path: 'gallery', name: 'AdminGallery', component: AdminGallery, meta: { title: 'Manage Gallery' } },
      { path: 'announcements', name: 'AdminAnnouncements', component: AdminAnnouncements, meta: { title: 'Manage Announcements' } },
      { path: 'users', name: 'AdminUsers', component: AdminUsers, meta: { title: 'Manage Users' } },
      { path: 'settings', name: 'AdminSettings', component: AdminSettings, meta: { title: 'Settings' } }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: '404 - Page Not Found' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  }
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // Update page title
  const title = to.meta.title
  document.title = title ? `${title} — GolaniSDA` : 'GolaniSDA Church'

  let auth = null
  try {
    auth = useAuthStore()
  } catch {
    return next()
  }

  const isLoggedIn = auth?.isLoggedIn ?? false
  const isAdmin    = auth?.isAdmin    ?? false

  // 1. Requires authentication
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  // 2. Requires admin role
  if (to.meta.requiresAdmin && !isAdmin) {
    return next({ name: 'Home' })
  }

  // 3. Guest-only routes — redirect already logged-in users
  if (to.meta.guest && isLoggedIn) {
    return next({ name: 'Home' })
  }

  next()
})

export default router