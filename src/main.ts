import { createHead } from '@unhead/vue/client'
import { createPinia } from 'pinia'

import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'

import App from './App.vue'

import 'uno:components.css'
import 'uno.css'
import 'uno:utilities.css'

import './assets/styles/main.css'
import 'prismjs/themes/prism-tomorrow.min.css'

export const createApp = ViteSSG(App, {
  routes,
}, ({ router, app }) => {
  app.use(createPinia())
  const head = createHead()
  head.push({
    titleTemplate: (title) => {
      return title ? `${title} | 老船长PZ_Jack の 博客` : '老船长PZ_Jack の 博客'
    },
  })
  app.use(head)
})
