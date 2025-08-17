<script setup lang="ts">
import Stage1 from './prologue/stage1/index.vue'

const route = useRoute()

console.log(route)
</script>

<template>
  <Stage1 />
  <RouterView />
</template>
