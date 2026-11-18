import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
<<<<<<< HEAD
import { installOfflineFetchGuard } from './services/offline'

import './styles/main.css'

installOfflineFetchGuard()

=======

import './styles/main.css'

>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
const app = createApp(App)

app.use(createPinia())
app.use(router)

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err, info)
}

// Mount app
<<<<<<< HEAD
app.mount('#app')
=======
app.mount('#app')
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
