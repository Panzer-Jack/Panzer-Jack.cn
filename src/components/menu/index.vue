<script setup lang="ts">
import { useMainMenu } from '@/composables/useMainMenu'

const { items, state, navigateTo, toggleDrawer, closeDrawer } = useMainMenu()

// 响应式断点
const isMobile = useMediaQuery('(max-width: 768px)')
</script>

<template>
  <div class="h-100vh w-100vw relative">

    <AuthorCard class="absolute right-30px w-300px" />
    <ContactCard class="absolute right-30px top-385px w-300px" />

    <!-- PC 端固定面板 -->
    <MenuPanel
      v-if="!isMobile"
      :items="items"
      :active-id="state.activeId"
      @select="navigateTo"
    /> 

    <!-- 移动端浮动按钮 -->
    <button
      v-if="isMobile"
      class="mobile-trigger fixed bottom-24px right-24px z-199 w-56px h-56px bg-tno-bg border-2 border-tno-border rounded-full color-tno-accent text-22px cursor-pointer tno-glow-box transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(0,212,170,0.6)] active:scale-95"
      :class="{ 'is-open': state.isDrawerOpen }"
      @click="toggleDrawer"
    >
      <span class="trigger-icon flex items-center justify-center transition-transform duration-300">
        {{ state.isDrawerOpen ? '✕' : '☰' }}
      </span>
    </button>

    <!-- 移动端抽屉 -->
    <MobileDrawer
      v-if="isMobile"
      :items="items"
      :active-id="state.activeId"
      :is-open="state.isDrawerOpen"
      @select="navigateTo"
      @close="closeDrawer"
    />
  </div>
</template>

<style scoped>
/* 打开状态样式 */
.mobile-trigger.is-open {
  @apply bg-[rgba(0,212,170,0.2)] border-tno-accent;
}

.mobile-trigger.is-open .trigger-icon {
  @apply rotate-90;
}
</style>
