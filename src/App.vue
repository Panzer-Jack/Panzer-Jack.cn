<script setup lang="ts">
import PrologueContainer from './prologue/PrologueContainer.vue'
import { usePrologueStore } from '@/stores/prologue'

const store = usePrologueStore()
</script>

<template>
  <!-- 开场动画 -->
  <PrologueContainer v-if="store.shouldShowPrologue" />

  <!-- 主内容 -->
  <div class="bg-gothic-bg min-h-screen text-text-primary">
    <RouterView />
  </div>
</template>
