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
  </div>
</template>
