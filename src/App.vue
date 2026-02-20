<script setup lang="ts">
import main from '@/assets/images/main.png'
import { usePrologueStore } from '@/stores/prologue'
import PrologueContainer from './prologue/PrologueContainer.vue'
import { useMenuStore } from './stores/menu'

const prologueStore = usePrologueStore()
const menuStore = useMenuStore()
prologueStore.isComplete = true
</script>

<template>
  <!-- 开场动画 -->
  <PrologueContainer v-if="prologueStore.shouldShowPrologue" />

  <div
    class="bg-gothic-bg w-100vw h-100vh fixed z--1"
    :style="{ backgroundImage: `url(${main})`, backgroundSize: 'cover', backgroundPosition: '80%' }"
  />

  <Menu v-if="prologueStore.isComplete" />

  <!-- 主内容 -->
  <Transition name="main-fade">
    <Layout v-if="prologueStore.isComplete && menuStore.state.activeId">
      <RouterView />
    </Layout>
  </Transition>
</template>

<style scoped>
.main-fade-enter-active {
  transition-property: all;
  transition-duration: 500ms;
  transition-timing-function: ease;
}

.main-fade-enter-from {
  opacity: 0;
  transform: translateY(-1.25rem);
}
</style>
