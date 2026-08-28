/*
 * Public navigation is intentionally small.
 * The reference church site uses a simple main menu and places deeper
 * sections under "More". We keep that information architecture without
 * copying its visual design.
 *
 * Note: "Projects", "Media", and "Associations" were removed from here —
 * Projects.vue/Media.vue and their services are empty stubs with no
 * implementation yet, and there is no Associations page at all. Re-add them
 * once those are actually built so we don't ship dead links.
 */

export const mainNavigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Worship', to: '/worship' },
  { label: 'Ministries', to: '/ministries' },
  { label: 'Sermons', to: '/sermons' },
  { label: 'Events', to: '/events' },
]

export const moreNavigation = [
  { label: 'Leadership', to: '/leadership' },
  { label: 'Announcements', to: '/announcements' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

export const mobileNavigation = [
  ...mainNavigation,
  ...moreNavigation,
  { label: 'Give', to: '/give' },
]
