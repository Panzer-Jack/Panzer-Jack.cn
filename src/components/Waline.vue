<script setup>
import { Waline } from '@waline/client/component'
import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js'

const serverURL = 'https://comment.panzer-jack.cn'
const route = useRoute()
pageviewCount({
  serverURL: 'https://blog.panzer-jack.cn',
  path: '/',
})
</script>

<template>
  <div class="relative">
    <Waline
      :key="route.path"
      :server-u-r-l="serverURL"
      :path="route.path"
    />

    阅读量: <span
      class="waline-pageview-count"
    />
  </div>
</template>
