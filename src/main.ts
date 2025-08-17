import { createPinia } from 'pinia'
import { ViteSSG } from 'vite-ssg'

import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import 'uno.css'
import './assets/styles/main.css'

export const createApp = ViteSSG(App, {
  routes,
}, ({ router, app }) => {
  app.use(createPinia())
})
