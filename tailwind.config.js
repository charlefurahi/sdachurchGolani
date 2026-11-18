<<<<<<< HEAD
=======
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

>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
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
<<<<<<< HEAD
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#2c5d85',
          600: '#24507a',
          700: '#1d4268',
          800: '#16324a',
          900: '#102638',
          950: '#0c1d2b'
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#f4d03f',
          500: '#d4af1f',
          600: '#a67c00',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03'
        },
        navy: {
          50: '#eff4f7',
          100: '#dde8ef',
          200: '#bcd0de',
          300: '#8fb0c8',
          400: '#5a86a8',
          500: '#2c5d85',
          600: '#1d4268',
          700: '#16324a',
          800: '#16324a',
          900: '#102638',
          950: '#0c1d2b'
        }
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        accent: ['"Cinzel"', 'serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite'
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-40px)' },
          to: { opacity: '1', transform: 'translateX(0)' }
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(40px)' },
          to: { opacity: '1', transform: 'translateX(0)' }
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(200, 151, 26, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(200, 151, 26, 0)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      screens: {
        'xs': '480px'
      }
    }
  },
  plugins: []
=======
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
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
}
