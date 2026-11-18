# Golani SDA re-theme

Palette: background #FAFBFC, navy #16324A, secondary background #EFF4F7, gold #F4D03F, text #1B2935, footer #102638.

- src/styles/variables.css: new light + dark tokens (change colours here only).
- src/styles/theme.css (new, loaded last): liquid hover buttons, wave edges, footer/page-header, light cards, dark-mode safety net.
- tailwind.config.js: navy / primary / gold ramps mapped to the palette.
- components/home/HeroSection.vue: SVG turbulent-dissolve hero. Local sample photos (worship-crowd + assets/gallery) are used when the gallery API returns nothing.
- components/common/AppSidebar.vue: modern sidebar (icons, gold active marker, light/dark switch).
- Cards (home + events EventCard, SermonCard, AnnouncementCard, LeaderCard, MinistryRow): light placeholders; dark-mode surfaces use --color-surface.
- Hard-coded navy text colours converted to --color-heading / --color-text-muted so nothing disappears in dark mode.

Not verified in a browser (node_modules in the zip are Windows-built). Run `npm install && npm run dev` to review.

## Second pass (theme + Home + home previews)
- Home.vue: removed the old dark photo footer override (it clashed with the new #102638 footer and wave); polished section headings, "All …" pills, preview-card hover, About cards, white Service Hours cards on the navy band, Explore links as light cards with gold fill hover; story/worship overlays now use brand navy.
- OurPillars, MinistriesPreview, StatsSection, NewsletterSection, TestimonialsSection/Slider, DonationCard: blue Tailwind classes replaced with navy/gold; added --gradient-page-hero.
