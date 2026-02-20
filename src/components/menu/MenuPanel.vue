<script setup lang="ts">
import type { MenuItem as MenuItemType } from '@/types/menu'
import containerBtnsBg from '@/assets/images/container-btns.png'
import { menuConfig } from '@/data/menuItems'
import GlitchTitle from './GlitchTitle.vue'
import MenuItem from './MenuItem.vue'

interface Props {
  items: MenuItemType[]
  activeId: string | null
}

defineProps<Props>()

const emit = defineEmits<{
  select: [item: MenuItemType]
}>()

</script>

<template>
  <aside class="panel-slide-in fixed left-0 top-0 h-full w-280px flex items-center justify-center z-100">
    <div
      class="mt-100px w-full h-400px bg-no-repeat bg-center bg-[length:100%_100%] flex flex-col justify-center items-center"
      :style="{ backgroundImage: `url(${containerBtnsBg})` }"
    >
      <!-- 标题区 - 故障艺术效果 -->
      <header class="h-60px mt-13px w-200px shrink-0 flex items-center justify-center">
        <GlitchTitle :text="menuConfig.title" />
      </header>

      <!-- 菜单列表 - 对应图片底部大矩形 -->
      <nav class="menu-nav w-150px relative flex-1 flex flex-col items-center m-[20px_35px_80px] overflow-y-auto overflow-x-hidden">
        <MenuItem
          v-for="(item, index) in items"
          :key="item.id"
          class="mb-10px"
          :item="item"
          :index="index"
          :is-active="item.id === activeId"
          @select="emit('select', $event)"
        />
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.panel-slide-in {
  animation: panelSlideIn 0.6s ease forwards;
}

@keyframes panelSlideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 静态扫描线纹理 */
.menu-nav::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 212, 170, 0.03) 2px,
    rgba(0, 212, 170, 0.03) 4px
  );
  pointer-events: none;
  z-index: 1;
}

/* 动画扫描线 */
.menu-nav::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0, 212, 170, 0.5), transparent);
  animation: navScan 3s linear infinite;
  pointer-events: none;
  z-index: 2;
}

@keyframes navScan {
  0% {
    top: 0;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}
</style>
