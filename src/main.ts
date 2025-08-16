import { createPinia } from 'pinia'
import { ViteSSG } from 'vite-ssg'
import { setupRouterScroller } from 'vue-router-better-scroller'

import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import 'uno.css'

export const createApp = ViteSSG(App, {
  routes,
}, ({ router, app }) => {
  app.use(createPinia())
})
