<script setup lang="ts">
import s场景1 from './prologue/stage1/index.vue'

const 路由 = useRoute()
const 老船长 = '老船长'

console.log(路由)
</script>

<template>
  {{ 老船长 }}
  <s场景1 />
</template>
