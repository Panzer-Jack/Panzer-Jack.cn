<script setup lang="ts">
import readingTime from 'reading-time/lib/reading-time'
import PrologueContainer from './prologue/PrologueContainer.vue'
import { usePrologueStore } from '@/stores/prologue'
import w from './w.md?raw'
import main from '@/assets/images/main.png'

const store = usePrologueStore()

// 响应式断点
const isMobile = useMediaQuery('(max-width: 768px)')

// 读取原始的md
onMounted(async () => {
  console.log('文章阅读时间估算:', readingTime(w))
})

</script>

<template>
  <!-- 开场动画 -->
  <PrologueContainer v-if="store.shouldShowPrologue" />

  <div 
    class="bg-gothic-bg w-100vw h-100vh fixed z--1"
    :style="{ backgroundImage: `url(${main})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
  />

  <!-- TNO 主菜单 (开场完成后显示) -->
  <Transition name="menu-fade">
    <Menu v-if="store.isComplete" />
  </Transition>

  <!-- 主内容 -->
  <!-- <main
    class="min-h-screen text-text-primary transition-all duration-300"
    :class="{ 'ml-280px': store.isComplete && !isMobile }"
  >
    <RouterView />
  </main> -->
</template>

<style scoped>
.menu-fade-enter-active {
  @apply transition-all duration-500 ease;
}

.menu-fade-enter-from {
  @apply opacity-0 -translate-x-5;
}
</style>
