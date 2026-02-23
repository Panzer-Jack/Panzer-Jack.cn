<script setup>
import { Waline } from '@waline/client/component'
import { COMMENT_SERVER_URL } from '@/constants/severURL'

const route = useRoute()
</script>

<template>
  <div class="relative">
    <Waline
      :key="route.path"
      :server-u-r-l="COMMENT_SERVER_URL"
      :path="route.path"
    />
  </div>
</template>
