# Golani SDA Website — Product & Design Specification

## 1. Direction

Golani should feel like a real local church website first and a software product second.

We are borrowing the **information architecture and content rhythm** of the Chuo Kikuu SDA reference site, not its visual implementation.

The supplied Golani poster is the visual source of truth for the brand palette:
- Navy: `#204361`
- Deep navy: `#111B24`
- Dark navy: `#163553`
- Soft navy: `#2A4D69`
- Gold: `#D1B22B`
- Soft gold: `#D5C890`
- White: `#FFFFFF`

No green, purple, red, cyan or unrelated accent colors should be introduced into the public brand system.

## 2. Experience principles

1. Human before technical.
2. Content before decoration.
3. Photography should carry emotion; UI should stay quiet.
4. Use spacing and typography to create hierarchy instead of cards everywhere.
5. One strong idea per section.
6. Animations should explain or reveal content, never compete with it.
7. Mobile is designed first.
8. Every API-driven section has loading, error and empty states.
9. Backend data is the source of truth when available.
10. Hardcoded content is limited to safe defaults, navigation and structural taxonomy.

## 3. Information architecture

### Main navigation

- Home
- About
- Worship
- Ministries
- Sermons
- Events
- Projects

### More

- Leadership
- Associations
- Announcements
- Gallery
- Media
- Contact

### Primary action

- Give

The navigation is intentionally close to the reference site's content architecture while remaining specific to Golani.

## 4. Homepage rhythm

Recommended order:

1. Hero — identity + invitation
2. Welcome / church story
3. Worship this week
4. Upcoming events
5. Latest sermons
6. About / mission / vision
7. Ministries / departments
8. Announcements
9. Projects
10. Previous events
11. Gallery
12. Final invitation
13. Footer

The homepage should not become a dashboard. It should read like a guided visit to the church.

## 5. About

The About area should eventually contain:

- Church history
- Church formation and growth
- Relationship with the wider SDA church family
- Mission
- Vision
- Core values
- Fundamental beliefs
- Leadership overview

Do not invent historical facts. Historical content must come from Golani church records.

## 6. Worship

Worship is a recurring weekly rhythm.

Service model:

```js
{
  id,
  name,
  day,
  startTime,
  endTime,
  location,
  description,
  type,
  onlineAvailable
}
```

Examples of service types:
- Worship
- Prayer
- Bible study
- Fellowship
- Youth

The current frontend defaults are placeholders and should be replaced by Django data when a backend service exists.

## 7. Ministries / Departments

The frontend taxonomy follows the breadth of departments visible on the Chuo Kikuu SDA reference site, but this is **not a claim that every department is currently active at Golani**.

Reference taxonomy:

- Education
- Children's Ministries
- Communication
- Health
- Family
- Music
- Public Affairs
- Possibility Ministry
- Resource Mobilization
- Women's Ministries
- DORCAS
- Sabbath School
- Stewardship
- Building
- AMR
- Publishing
- Personal Ministries
- Adventurers
- Pathfinders
- Adventist Youth
- PCM
- Ambassadors

Backend ministry model:

```js
{
  id,
  name,
  slug,
  description,
  image,
  category,
  leader,
  contact,
  meetingSchedule,
  socialLinks,
  isActive,
  order
}
```

The UI must render whatever departments the backend marks active.

## 8. Leadership

Leadership should be an organizational directory, not a wall of identical cards.

Reference groups:

- Pastoral Ministry
- Church Elders
- Church Clerks
- Treasurer's Office
- Deacon's Office
- Prayer Committee
- Department Heads
- Association Heads

Leader model:

```js
{
  id,
  name,
  position,
  department,
  photo,
  biography,
  email,
  phone,
  socialLinks,
  order
}
```

The page should group leaders naturally and support department filtering when the data grows.

## 9. Sermons

Sermon model:

```js
{
  id,
  title,
  slug,
  speaker,
  date,
  keyText,
  scripture,
  description,
  thumbnail,
  audioUrl,
  videoUrl,
  duration,
  series,
  category
}
```

Features:
- Search
- Topic filtering
- Speaker filtering
- Pagination
- Audio
- Video
- Scripture reference
- Related sermons
- Share
- SEO-friendly detail URLs

URL:

`/sermons/<slug>`

## 10. Events

Event model:

```js
{
  id,
  title,
  slug,
  description,
  startDate,
  endDate,
  startTime,
  endTime,
  location,
  image,
  organizer,
  category,
  registrationUrl,
  status
}
```

Features:
- Upcoming
- Past
- Featured
- Category filtering
- Date filtering
- Calendar representation
- Registration where applicable

URL:

`/events/<slug>`

## 11. Announcements

Announcements are intentionally separate from events.

Announcement model:

```js
{
  id,
  title,
  slug,
  excerpt,
  content,
  image,
  publishedAt,
  author,
  category,
  featured
}
```

URL:

`/announcements/<slug>`

## 12. Projects

Projects represent ministry and community work, not just image galleries.

Status:
- Planned
- Ongoing
- Completed

Project model:

```js
{
  id,
  title,
  slug,
  description,
  purpose,
  status,
  progress,
  startDate,
  expectedCompletionDate,
  image,
  gallery,
  achievements,
  remainingNeeds,
  supportUrl
}
```

Detail structure:
- Hero
- Purpose
- Description
- Progress
- Timeline
- Gallery
- Achievements
- Remaining needs
- Support CTA

Do not implement project API endpoints until the Django backend contract is confirmed.

## 13. Gallery

Gallery should feel editorial rather than like a generic image grid.

Each image can eventually contain:
- Album
- Category
- Event
- Date
- Caption
- Photographer
- Alt text

Required behavior:
- Responsive layout
- Lazy loading
- Lightbox
- Keyboard navigation
- Mobile swipe
- Optimized images

## 14. Contact

Contact should contain:
- Church location
- Service times
- Phone
- Email
- Social links
- Map
- Directions
- Contact form

Form states:
- Idle
- Submitting
- Success
- Error
- Validation

Do not invent contact information. Use backend/configuration values.

## 15. Giving

Giving should explain:
- Why we give
- Giving methods
- Current projects
- Offering information
- Help/contact

Payment secrets must never enter the Vue application.

## 16. Visual system

### Typography

Poppins is the primary typeface for:
- Navigation
- Body
- Headings
- Buttons
- Metadata

Avoid decorative font combinations. The supplied poster already establishes a clean, modern typographic language.

### Layout

Use:
- Wide editorial sections
- Strong left/right alignment
- Large photography
- Quiet backgrounds
- Restrained borders
- Occasional full-width navy sections
- Gold only as an accent

Avoid:
- Excessive rounded cards
- Excessive gradients
- Emoji navigation
- Random icon systems
- Glassmorphism
- Corporate dashboard styling
- Constant floating animations

## 17. Header

Desktop:
- Golani logo
- Main navigation
- More
- Give

Mobile:
- Logo
- Menu button
- Full-height navigation drawer

Behavior:
- Sticky
- Transparent only when explicitly placed over a hero
- Solid navy when scrolled
- Active route indicator
- Escape closes mobile menu
- Body scroll lock
- Keyboard accessible

## 18. Footer

Footer should contain:
- Church identity
- Quick links
- Worship rhythm
- Location/contact
- Social handle
- Short Bible-centered statement
- Copyright

It should feel like the closing of the church experience, not a sitemap dump.

## 19. Technical architecture

Public page flow:

Component
→ composable/store when state is needed
→ domain service
→ `api.js`
→ Django REST API

Components must not scatter raw Axios calls throughout templates.

Existing authentication/admin functionality remains separate from the public presentation layer.

## 20. Existing project migration rules

Keep:
- Vue 3
- Vite
- Pinia
- Vue Router
- Axios
- Django REST API integration
- Admin/auth layouts and pages

Retire gradually:
- Public sidebar navigation
- Duplicate `Navbar` / `TheNavbar`
- Duplicate footer implementations
- Emoji-based navigation
- Duplicate sermon/event card implementations
- Placeholder pages that are not connected to a backend contract

Before deleting anything, verify references.

## 21. API boundaries

Current confirmed frontend services include:
- Auth
- Events
- Sermons
- Announcements
- Leadership
- Ministries
- Gallery
- Donations
- Contact

Currently empty service files should not be filled with guessed endpoints:
- givingService
- mediaService
- projectService

Confirm the Django API contract first.

## 22. Loading / error / empty states

Every remote section needs all three.

Loading:
- Skeleton that resembles the final content shape.

Error:
- Short human message.
- Retry action.

Empty:
- Explain what is missing.
- Never leave a blank section.

Avoid emoji error/empty states.

## 23. Accessibility

Target WCAG 2.2 AA principles.

Required:
- Semantic HTML
- Keyboard navigation
- Visible focus
- Correct heading order
- Meaningful alt text
- Accessible forms
- Accessible dialogs
- Reduced motion
- Sufficient contrast
- No information conveyed by color alone

## 24. Performance

Build for:
- Lazy images
- Responsive images
- WebP/AVIF where available
- Route-level code splitting
- Small shared components
- API caching where appropriate
- Minimal client-side JavaScript
- No huge hero video by default

## 25. SEO

Every public page should eventually have:
- Title
- Description
- Canonical URL
- Open Graph metadata
- Social preview
- Structured data where appropriate
- Breadcrumbs for deep pages

Potential structured data:
- Organization
- LocalBusiness / religious organization
- Event
- Article
- BreadcrumbList

## 26. URLs

Prefer:

- `/about`
- `/worship`
- `/ministries`
- `/ministries/<slug>`
- `/sermons`
- `/sermons/<slug>`
- `/events`
- `/events/<slug>`
- `/announcements`
- `/announcements/<slug>`
- `/projects`
- `/projects/<slug>`
- `/leadership`
- `/gallery`
- `/contact`
- `/give`

Avoid ID-only public URLs when the backend can provide stable slugs.

## 27. Future-ready, not now

Leave architectural room for:
- Prayer requests
- Bible studies
- Devotionals
- Livestream
- Online giving
- Church calendar
- Volunteer registration
- Newsletter
- WhatsApp contact
- PWA
- Member portal
- Multi-language support

Do not build these until the core public site is stable.

## 28. Development order

1. Design tokens
2. Typography
3. Global CSS
4. Public layout
5. Navbar
6. Mobile menu
7. Footer
8. Page header
9. Router/content contracts
10. Homepage shell
11. Hero
12. Welcome/story
13. Worship
14. Events
15. Sermons
16. Ministries
17. Announcements
18. Projects
19. Gallery
20. About
21. Leadership
22. Contact
23. Giving
24. SEO/accessibility/performance pass

Every component should be built and tested before the next one replaces it.

## 29. Current foundation status

This foundation introduces the new Golani brand tokens, navigation architecture, public layout, mobile menu, footer, page header and department taxonomy.

It deliberately does **not** rewrite the existing API layer or invent backend endpoints.

The next implementation step is the homepage shell and hero using the supplied Golani poster as the visual reference.
