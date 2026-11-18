/**
 * Data barrel.
 *
 * This file used to hold ~400 lines of demo content for every domain
 * (events, sermons, announcements, donations, gallery, leadership, etc.)
 * mixed together in one file. It has been split into one file per domain
 * — see the imports below — so a change to, say, announcement demo data
 * doesn't require opening a file that also defines donation campaigns.
 *
 * This barrel re-exports everything so existing imports like
 * `import { churchStats } from '@/data/index.js'` keep working unchanged.
 * New code should prefer importing directly from the domain file
 * (e.g. `import { churchStats } from '@/data/church-stats.js'`) since
 * that makes the dependency — and what's demo data vs. real content —
 * obvious at a glance.
 *
 * Every export here is API-fallback / seed data only: pages call the
 * matching `services/*Service.js` first and only fall back to this data
 * when the API has no records yet. See ARCHITECTURE conventions for the
 * "data/ is demo data only" rule.
 */

export { serviceTimes, eventCategories, events, CATEGORY_COLORS } from './events.js'
export { announcementCategories, announcements } from './announcements.js'
export { donationCampaigns } from './donations.js'
export { sermons } from './sermons.js'
// Was `ministryCategories, ministries` — neither exists in ministries.js
// (only `ministryCatalog` and `ministryFallbackLeaders` do), which broke
// this entire barrel file for every page that imports anything from it.
export { ministryCatalog, ministryFallbackLeaders } from './ministries.js'
export { testimonials } from './testimonials.js'
export { churchStats } from './church-stats.js'
export { galleryAlbums } from './gallery.js'
export { leadership } from './leadership.js'
export { faqs } from './faqs.js'