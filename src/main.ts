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

  // const html = document.querySelector('html')!
  // setupRouterScroller(router, {
  //   selectors: {
  //     html(ctx) {
  //       // only do the sliding transition when the scroll position is not 0
  //       // Disable sliding transition on Dev Mode
  //       if (ctx.savedPosition?.top || import.meta.hot)
  //         html.classList.add('no-sliding')
  //       else
  //         html.classList.remove('no-sliding')
  //       return true
  //     },
  //   },
  //   behavior: 'auto',
  // })
})
