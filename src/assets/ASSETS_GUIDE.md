# GolaniSDA Assets Guide

## Directory Structure

```
src/assets/
├── images/         # General church photos
├── banners/        # Page headers and announcement banners
├── pastors/        # Leader / pastor portrait photos
├── events/         # Event-specific photos
├── sermons/        # Sermon thumbnail images
├── gallery/        # Gallery album photos
├── icons/          # Custom icon files (SVG preferred)
├── logos/          # Church and SDA logos
├── videos/         # Short video clips (use YouTube for full sermons)
└── audio/          # Sermon MP3 audio files
```

## Required Image Files

### images/
| Filename | Dimensions | Description |
|----------|-----------|-------------|
| church-hero.jpg | 1920x1080 | Main hero background |
| church-exterior.jpg | 1200x800 | Church building exterior |
| church-interior.jpg | 1200x800 | Church interior during worship |
| worship-crowd.jpg | 1200x800 | Congregation worshipping |
| community-service.jpg | 1200x800 | Outreach / service |
| baptism.jpg | 1200x800 | Baptism ceremony |
| choir.jpg | 1200x800 | Choir singing |
| youth-group.jpg | 1200x800 | Youth / Pathfinders |
| prayer-meeting.jpg | 1200x800 | Wednesday prayer meeting |
| about-team.jpg | 1600x900 | Leadership team photo |

### banners/
| Filename | Dimensions | Description |
|----------|-----------|-------------|
| home-banner-1.jpg | 1920x1080 | Hero slider slide 1 |
| home-banner-2.jpg | 1920x1080 | Hero slider slide 2 |
| home-banner-3.jpg | 1920x1080 | Hero slider slide 3 |
| donate-sanctuary.jpg | 800x500 | Sanctuary building campaign |
| donate-education.jpg | 800x500 | Education scholarship campaign |
| donate-food.jpg | 800x500 | Food pantry campaign |
| announcement-1.jpg | 1200x400 | Announcement header |

### pastors/
| Filename | Dimensions | Description |
|----------|-----------|-------------|
| pastor-main.jpg | 400x500 | Senior Pastor Emmanuel Kamba |
| elder-1.jpg | 400x500 | Elder Simon Makoye |
| elder-2.jpg | 400x500 | Elder Mike Ntimbwa |
| deaconess-1.jpg | 400x500 | Deaconess  |

### gallery/
| Filename | Dimensions | Description |
|----------|-----------|-------------|
| baptism-cover.jpg | 800x600 | Baptism album cover |
| baptism-1.jpg | 1200x800 | Baptism photo 1 |
| baptism-2.jpg | 1200x800 | Baptism photo 2 |
| pathfinder-cover.jpg | 800x600 | Pathfinder album cover |
| outreach-cover.jpg | 800x600 | Community outreach album cover |
| choir-cover.jpg | 800x600 | Choir & music album cover |

### logos/
| Filename | Format | Description |
|----------|--------|-------------|
| golanisda-logo.svg | SVG | Full church logo (horizontal) |
| golanisda-icon.svg | SVG | Icon/emblem only |
| sda-logo.png | PNG | Official SDA Church logo |
| golanisda-white.svg | SVG | White version for dark backgrounds |

## Image Optimization Tips

1. Use WebP format when possible (50-80% smaller than JPG at same quality)
2. Compress with https://squoosh.app (quality 80%)
3. Target sizes: hero <500KB, cards <100KB, thumbnails <30KB
4. Always provide width/height attributes to prevent layout shift
5. Implement lazy loading (already done in components via native browser)

## Audio Files

Place sermon MP3 files in audio/ directory:
- Format: MP3 (128kbps minimum, 192kbps recommended)
- Naming : sermon-YYYY-MM-DD.mp3
- Maximum: 100MB per file (consider cloud storage for large archives)

## Video

For full sermon recordings, use YouTube (free) or Vimeo.
Store only short clips (welcome video, testimonials <2min) locally in videos/.
