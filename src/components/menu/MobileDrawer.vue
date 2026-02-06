<script setup lang="ts">
import type { MenuItem as MenuItemType } from '@/types/menu'
import { menuConfig } from '@/data/menuItems'

interface Props {
  items: MenuItemType[]
  activeId: string | null
  isOpen: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  select: [item: MenuItemType]
  close: []
}>()
</script>

<template>
  <!-- 遮罩层 -->
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="drawer-overlay fixed inset-0 z-200"
      @click="emit('close')"
    />
  </Transition>

  <!-- 抽屉面板 -->
  <Transition name="slide-up">
    <div v-if="isOpen" class="drawer-panel fixed bottom-0 left-0 right-0 z-201">
      <!-- 拖拽指示器 -->
      <div class="drag-handle flex justify-center pt-12px pb-8px">
        <span class="handle-bar" />
      </div>

      <!-- 标题 -->
      <header class="drawer-header px-24px pb-16px">
        <h2 class="text-16px font-bold tracking-3px">
          {{ menuConfig.title }}
        </h2>
        <p class="text-10px tracking-2px mt-2px uppercase">
          {{ menuConfig.subtitle }}
        </p>
        <div class="header-line mt-12px" />
      </header>

      <!-- 菜单列表 -->
      <nav class="flex flex-col justify-center items-center px-30px pb-32px">
        <MenuItem
          class="mt-10px"
          v-for="(item, index) in items"
          :key="item.id"
          :item="item"
          :index="index"
          :is-active="item.id === activeId"
          @select="emit('select', $event)"
        />
      </nav>

      <!-- 角落装饰 -->
      <span class="corner-decor corner-tl" />
      <span class="corner-decor corner-tr" />
    </div>
  </Transition>
</template>

<style scoped>
.drawer-overlay {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.drawer-panel {
  background: rgba(10, 18, 26, 0.98);
  border-top: 2px solid #00d4aa;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.5);
  max-height: 70vh;
  overflow-y: auto;
}

/* 扫描线纹理 */
.drawer-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(0, 212, 170, 0.02) 3px,
    rgba(0, 212, 170, 0.02) 6px
  );
  pointer-events: none;
  border-radius: inherit;
}

.drag-handle .handle-bar {
  width: 40px;
  height: 4px;
  background: #006b55;
  border-radius: 2px;
}

.drawer-header h2 {
  color: #00ffcc;
  text-shadow: 0 0 8px rgba(0, 255, 204, 0.4);
}

.drawer-header p {
  color: #8ba8a8;
}

.header-line {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    #00d4aa,
    transparent
  );
}

/* 角落装饰 */
.corner-decor {
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid #00d4aa;
}

.corner-tl { top: 8px; left: 8px; border-right: none; border-bottom: none; }
.corner-tr { top: 8px; right: 8px; border-left: none; border-bottom: none; }

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
