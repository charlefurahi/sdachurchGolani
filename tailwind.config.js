/*
 * Golani SDA brand ramp — anchored on the canonical 3-color system:
 * navy #0d2137, gold/yellow #f4d03f, white. navy-950 and gold-500 are the
 * exact brand hexes; the rest of the ramp is derived for tints/shades.
 */
const navyRamp = {
  "50": "#edf0f2",
  "100": "#d7dde3",
  "200": "#bcc7d0",
  "300": "#9baab8",
  "400": "#6e8598",
  "500": "#16324a",
  "600": "#122940",
  "700": "#0f2136",
  "800": "#0d2137",
  "900": "#0a1a2c",
  "950": "#081420"
}
const goldRamp = {
  "50": "#fdf9ec",
  "100": "#fbf1cc",
  "200": "#f8e79f",
  "300": "#f6dd72",
  "400": "#f5d658",
  "500": "#f4d03f",
  "600": "#d4af1f",
  "700": "#b0901a",
  "800": "#8c7215",
  "900": "#6f5a11",
  "950": "#4a3c0b"
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: navyRamp,
        navy: navyRamp,
        blue: navyRamp,
        gold: goldRamp,
        yellow: goldRamp,
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        accent: ['Poppins', 'system-ui', 'sans-serif'],
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}
