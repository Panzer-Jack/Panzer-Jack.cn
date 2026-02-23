<script setup>
import { Waline } from '@waline/client/component'

const serverURL = 'https://comment.panzer-jack.cn'
const route = useRoute()
</script>

<template>
  <div class="relative">
    <Waline
      :key="route.path"
      :server-u-r-l="serverURL"
      :path="route.path"
    />

    <span id="busuanzi_container_site_pv">本站总访问量<span id="busuanzi_value_site_pv" />次</span>
  </div>
</template>
