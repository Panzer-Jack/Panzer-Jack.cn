<script setup lang="ts">
import { useMobile } from '@/composables/useMobile'
import { useMenuStore } from '@/stores/menu'

const { items, state, navigateTo, toggleDrawer, closeDrawer } = useMenuStore()

// 响应式断点
const { isMobile } = useMobile()
const cardClass = computed(() => isMobile.value ? 'flex justify-center items-center relative' : 'absolute right-30px w-300px')
</script>

<template>
  <div class="h-100vh w-100vw relative">
    <Transition name="menu-fade">
      <div v-show="!state.activeId">
        <AuthorCard :class="cardClass" />
        <ContactCard :class="[cardClass, !isMobile ? 'top-385px' : 'top--20px']" />
      </div>
    </Transition>

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
.menu-fade-enter-active {
  transition-property: all;
  transition-duration: 500ms;
  transition-timing-function: ease;
}

.menu-fade-enter-from {
  opacity: 0;
  transform: translateX(-1.25rem);
}
</style>
