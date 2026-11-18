# Golani SDA colour system

All colours live in **`variables.css`**. Change them there only.

| Role | Token | Hex |
|---|---|---|
| Main background | `--color-bg` | `#FAFBFC` |
| Primary brand (navy) | `--color-navy` | `#16324A` |
| Secondary background | `--color-bg-alt` | `#EFF4F7` |
| Accent (gold) | `--color-gold` | `#F4D03F` |
| Text | `--color-text-main` | `#1B2935` |
| Footer / deepest navy | `--color-navy-deep` | `#102638` |

Derived helpers: `--color-gold-dark` (gold hover), `--color-gold-ink` (gold used as text on light
surfaces; becomes plain gold in dark mode), `--color-surface` (cards), `--color-border`.

## Rules (same discipline as the TNC sample)
1. Colours come from tokens, never hard-coded hex values (brand colours of Facebook/Google etc. are the only exception).
2. Navy leads, gold is the accent: buttons, active markers, small highlights. Never large gold areas.
3. Text on navy is white; gold *text* is only used on navy. On light backgrounds use `--color-gold-ink`.
4. Page sections alternate `--color-bg` / `--color-bg-alt`; dark navy bands are used sparingly for emphasis.
5. Only two semantic hues exist besides the brand: a muted red (errors/destructive) and a muted green (success).
   Tailwind `yellow/amber/orange` map to gold and `purple` maps to navy, so no stray colours can appear.
6. Icons are monochrome (`currentColor`); no emoji in the UI chrome.
