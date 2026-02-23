import { createHead } from '@unhead/vue/client'

import NProgress from 'nprogress'
import { createPinia } from 'pinia'
import { ViteSSG } from 'vite-ssg'

import { setupRouterScroller } from 'vue-router-better-scroller'

import { routes } from 'vue-router/auto-routes'

import App from './App.vue'
import '@waline/client/style'
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

  if (!import.meta.env.SSR) {
    const html = document.querySelector('html')!
    setupRouterScroller(router, {
      selectors: {
        'html': function (ctx) {
          if (ctx.savedPosition?.top || import.meta.hot)
            html.classList.add('no-sliding')
          else
            html.classList.remove('no-sliding')
          return true
        },
        '#main-content': true,
      },
      behavior: 'auto',
    })

    router.beforeEach(() => {
      NProgress.start()
    })
    router.afterEach(() => {
      NProgress.done()
    })
  }
})
