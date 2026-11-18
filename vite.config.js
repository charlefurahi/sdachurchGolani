import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
<<<<<<< HEAD
=======

>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
<<<<<<< HEAD
  server: {
    hmr: {
      overlay: false
    }
  },
  build: {
=======

  // Expose all VITE_* variables from .env to the frontend.
  // This includes VITE_GOOGLE_MAPS_API_KEY and VITE_GOOGLE_OAUTH2_CLIENT_ID.
  // NEVER prefix secrets (GOOGLE_OAUTH2_CLIENT_SECRET) with VITE_ — those stay backend only.
  envPrefix: 'VITE_',

  server: {
    port: 5173,
    proxy: {
      // Proxy /api calls to Django backend in local dev
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/media': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      // Proxy Google social-auth routes to Django in local dev
      '/social-auth': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    }
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
<<<<<<< HEAD
          axios: ['axios']
=======
          axios:  ['axios'],
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
        }
      }
    }
  }
<<<<<<< HEAD
})
=======
})
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
